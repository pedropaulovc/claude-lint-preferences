type Dictionary = { [key: string]: number };

type Cache = { [key: string]: { value: unknown; expiry: number } };

function countTrueValues(mapping: { [key: string]: boolean }): number {
  return Object.values(mapping).filter(v => v).length;
}
