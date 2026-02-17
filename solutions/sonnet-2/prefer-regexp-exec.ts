function extractNumbers(input: string): number | null {
  const match = input.match(/\d+/);
  if (!match) {
    return null;
  }
  return parseInt(match[0], 10);
}

function extractEmail(input: string): string | null {
  const match = input.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
  if (!match) {
    return null;
  }
  return match[0];
}
