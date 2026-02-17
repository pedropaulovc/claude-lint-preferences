function extractNumbers(input: string): number | null {
  const match = /\d+/.exec(input);
  if (!match) {
    return null;
  }
  return parseInt(match[0], 10);
}

function extractEmail(input: string): string | null {
  const match = /[^\s@]+@[^\s@]+\.[^\s@]+/.exec(input);
  if (!match) {
    return null;
  }
  return match[0];
}
