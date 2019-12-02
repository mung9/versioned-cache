import { VersionedCache } from './versioned-cache';

class Filter {
  constructor(public versionName: string) { }
}

const cache = new VersionedCache<Filter>();

cache.put("AAA", new Filter("1.0"));
cache.put("AAA", new Filter("1.1"));
cache.put("AAA", new Filter("1.2"));
cache.put("BBB", new Filter("2.0"));
cache.put("CCC", new Filter("3.0"));

for (const item of cache) {
  console.log("data:", item.data)
  console.log("isOld:", item.isOld)
}

console.log('------------')
cache.clearOldVersions();

for (const item of cache) {
  console.log("data:", item.data)
  console.log("isOld:", item.isOld)
}

console.log(cache.values());
console.log(cache.keys());