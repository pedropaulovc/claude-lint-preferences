function getFirstElement(map: Map<string, number[]>, key: string): number {
    const arr = map.get(key) as number[];
    return arr[0];
}

type NamedItem = { name: string };

function getFoundItemName(items: NamedItem[], predicate: (item: NamedItem) => boolean): string {
    const found = items.find(predicate) as NamedItem;
    return found.name;
}
