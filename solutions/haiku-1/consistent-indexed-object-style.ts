type NumberDictionary = {
  [key: string]: number;
};

type Cache = {
  [key: string]: {
    value: unknown;
    expiry: number;
  };
};

function countTrueValues(mappings: { [key: string]: boolean }): number {
  let count = 0;
  for (const key in mappings) {
    if (mappings[key]) {
      count++;
    }
  }
  return count;
}
