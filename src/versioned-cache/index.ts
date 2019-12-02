export class VersionedCache<TItem> {
  private map: Map<string, Array<Wrapper<TItem>>> = new Map();

  public put(key: string, value: TItem): number {
    const items = this.map.get(key);
    if (items) {
      const updatedItems = [new Wrapper<TItem>(value, false), ...items];
      if (updatedItems.length > 1) {
        updatedItems[1].isOld = true;
      }

      this.map.set(key, updatedItems);
      return updatedItems.length;
    } else {
      this.map.set(key, [new Wrapper<TItem>(value, false)]);
      return 1;
    }
  }

  public get(key: string): Wrapper<TItem> | undefined {
    const items = this.map.get(key);
    return items ? items[0] : undefined;
  }

  public keys(): IterableIterator<string> {
    return this.map.keys();
  }

  public values(): IterableIterator<Wrapper<TItem>[]> {
    return this.map.values()
  }

  public clearOldVersions(): void {
    for (const [key, items] of this.map) {
      this.map.set(key, [items[0]]);
    }
  }

  public clear(): void {
    this.map.clear();
  }

  *[Symbol.iterator](): Iterator<Wrapper<TItem>> {
    for (const [key, items] of this.map) {
      for (const item of items) {
        yield item;
      }
    }
  }
}

class Wrapper<TItem> {
  constructor(public data: TItem, public isOld: boolean, ) { }
}