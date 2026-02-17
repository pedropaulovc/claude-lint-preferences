function getFirstElement(map: Map<string, number[]>, key: string): number {
  const array = map.get(key)!;
  return array[0];
}

function findItemName(items: Array<{ name: string }>, predicate: (item: { name: string }) => boolean): string {
  const item = items.find(predicate)!;
  return item.name;
}
