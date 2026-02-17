function getFirstElement(map: Map<string, number[]>, key: string): number {
  const arr = map.get(key) as number[];
  return arr[0];
}

function getItemName(items: Array<{ name: string }>, predicate: (item: { name: string }) => boolean): string {
  const found = items.find(predicate) as { name: string };
  return found.name;
}
