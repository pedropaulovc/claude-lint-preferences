function getDisplayName(input: { firstName?: string; lastName?: string; nickname?: string | null; fallbackName: string }): string {
  return input.nickname ?? `${input.firstName} ${input.lastName}` ?? input.fallbackName;
}

function getNumberOrDefault(value?: number): number {
  return value ?? 0;
}
