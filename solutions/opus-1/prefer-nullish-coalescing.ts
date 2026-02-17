function getDisplayName(user: {
  firstName?: string;
  lastName?: string;
  nickname?: string | null;
  fallbackName: string;
}): string {
  if (user.nickname) {
    return user.nickname;
  }

  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }

  return user.fallbackName;
}

function getValueOrDefault(value?: number): number {
  return value ?? 0;
}
