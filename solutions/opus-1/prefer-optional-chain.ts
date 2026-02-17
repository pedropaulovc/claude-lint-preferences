function getNestedValue(obj: {
  user?: { profile?: { address?: { city?: string } } };
}): string | undefined {
  return obj.user?.profile?.address?.city;
}

function getFirstItemName(obj: {
  data?: { items?: Array<{ name: string }> };
}): string | undefined {
  return obj.data?.items?.[0]?.name;
}
