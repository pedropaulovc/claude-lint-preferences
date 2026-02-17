function getDisplayName(params: {
  firstName?: string;
  lastName?: string;
  nickname?: string | null;
  fallbackName: string;
}): string {
  if (params.nickname) {
    return params.nickname;
  }

  if (params.firstName || params.lastName) {
    return `${params.firstName || ''} ${params.lastName || ''}`.trim();
  }

  return params.fallbackName;
}

function getNumberOrDefault(value?: number): number {
  return value !== undefined ? value : 0;
}
