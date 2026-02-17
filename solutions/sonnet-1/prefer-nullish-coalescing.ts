function getDisplayName(user: {
    firstName?: string;
    lastName?: string;
    nickname?: string | null;
    fallbackName: string;
}): string {
    if (user.nickname != null) {
        return user.nickname;
    }

    if (user.firstName || user.lastName) {
        return `${user.firstName || ''} ${user.lastName || ''}`.trim();
    }

    return user.fallbackName;
}

function getNumberOrDefault(value?: number): number {
    return value !== undefined ? value : 0;
}
