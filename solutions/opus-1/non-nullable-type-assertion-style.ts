function getFirstElement(map: Map<string, number[]>, key: string): number {
  const arr = map.get(key)!;
  return arr[0];
}

interface Named {
  name: string;
  id: number;
}

function findName(items: Named[], targetId: number): string {
  const item = items.find((i) => i.id === targetId)!;
  return item.name;
}
