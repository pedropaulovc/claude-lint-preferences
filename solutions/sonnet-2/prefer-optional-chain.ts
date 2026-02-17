function getNestedValue(obj: { user?: { profile?: { address?: { city?: string } } } }): string | undefined {
  if (obj.user && obj.user.profile && obj.user.profile.address) {
    return obj.user.profile.address.city;
  }
  return undefined;
}

function getFirstItemName(obj: { data?: { items?: Array<{ name: string }> } }): string | undefined {
  if (obj.data && obj.data.items && obj.data.items.length > 0) {
    return obj.data.items[0].name;
  }
  return undefined;
}
