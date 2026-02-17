interface DisplayNameInput {
  firstName?: string;
  lastName?: string;
  nickname?: string | null;
  fallbackName: string;
}

function getDisplayName(input: DisplayNameInput): string {
  if (input.nickname) {
    return input.nickname;
  }

  if (input.firstName && input.lastName) {
    return `${input.firstName} ${input.lastName}`;
  }

  if (input.firstName) {
    return input.firstName;
  }

  return input.fallbackName;
}

function getValueOrDefault(value?: number): number {
  return value ?? 0;
}
