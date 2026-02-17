type InputItem = { id: number; value: string; metadata: string };
type OutputItem = { identifier: number; content: string };

function processData(items: InputItem[]): OutputItem[] {
    const total = items.length;
    const filtered = items.filter(item => item.value !== '');
    const result = filtered.map(item => ({
        identifier: item.id,
        content: item.value,
    }));

    console.log(`Processed ${filtered.length} of ${total} items`);

    return result;
}
