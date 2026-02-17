type Dictionary = Record<string, number>;

type CacheEntry = { value: unknown; expiry: number };
type Cache = Record<string, CacheEntry>;

function countTrueValues(mapping: Record<string, boolean>): number {
  let count = 0;
  for (const key in mapping) {
    if (mapping[key]) {
      count++;
    }
  }
  return count;
}

const dict: Dictionary = { a: 1, b: 2 };
const cache: Cache = { key1: { value: 'test', expiry: 1000 } };
