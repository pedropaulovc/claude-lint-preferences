function processData(items: Array<{ id: number; value: string; metadata: string }>): Array<{ identifier: number; content: string }> {
  const totalCount = items.length;
  const filtered = items.filter(item => item.value.length > 0);
  const mapped = filtered.map(item => ({
    identifier: item.id,
    content: item.value
  }));

  if (totalCount > 0) {
    console.log(`Processed ${totalCount} items`);
  }

  return mapped;
}
