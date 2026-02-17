function extractNumbers(text: string): number | null {
  const match = /\d+/.exec(text);
  return match ? parseInt(match[0], 10) : null;
}

function extractEmail(text: string): string | null {
  const match = /\w+@\w+\.\w+/.exec(text);
  return match ? match[0] : null;
}
