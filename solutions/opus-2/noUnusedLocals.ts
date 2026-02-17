interface DataItem {
  id: number;
  value: string;
  metadata: string;
}

interface TransformedItem {
  identifier: number;
  content: string;
}

function processData(items: DataItem[]): TransformedItem[] {
  const totalCount = items.length;

  const nonEmpty = items.filter((item) => item.value.length > 0);

  const result = nonEmpty.map((item) => ({
    identifier: item.id,
    content: item.value,
  }));

  return result;
}
