type NumberDictionary = { [key: string]: number };

type CacheEntry = {
  value: unknown;
  expiry: number;
};

type Cache = { [key: string]: CacheEntry };

function countTrueValues(mapping: { [key: string]: boolean }): number {
  let count = 0;
  for (const key of Object.keys(mapping)) {
    if (mapping[key]) {
      count++;
    }
  }
  return count;
}
