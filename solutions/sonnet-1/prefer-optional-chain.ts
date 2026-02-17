function getNestedValue(obj: { user?: { profile?: { address?: { city?: string } } } }): string | undefined {
    if (!obj.user) return undefined;
    if (!obj.user.profile) return undefined;
    if (!obj.user.profile.address) return undefined;
    return obj.user.profile.address.city;
}

function getFirstItemName(obj: { data?: { items?: Array<{ name: string }> } }): string | undefined {
    if (!obj.data) return undefined;
    if (!obj.data.items || obj.data.items.length === 0) return undefined;
    return obj.data.items[0].name;
}
