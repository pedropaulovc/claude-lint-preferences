function getDisplayName(params: { firstName?: string; lastName?: string; nickname?: string | null; fallbackName: string }): string {
  return params.nickname ?? (`${params.firstName ?? ''} ${params.lastName ?? ''}`.trim() || params.fallbackName);
}

function getNumberOrDefault(value?: number): number {
  return value ?? 0;
}
