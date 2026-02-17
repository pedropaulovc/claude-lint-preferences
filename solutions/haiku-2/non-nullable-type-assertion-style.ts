function getFirstElement(map: Map<string, number[]>, key: string): number {
  const array = map.get(key)!;
  return array[0]!;
}

function getItemName(items: Array<{ name: string }>): string {
  const item = items.find(i => i.name === 'target')!;
  return item.name;
}
