function getNestedValue(obj: { user?: { profile?: { address?: { city?: string } } } }): string | undefined {
  return obj.user?.profile?.address?.city;
}

function getFirstItemName(data: { data?: { items?: Array<{ name: string }> } }): string | undefined {
  return data.data?.items?.[0]?.name;
}
