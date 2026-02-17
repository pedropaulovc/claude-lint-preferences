function hasPermission(permissions: string[], target: string): boolean {
  return permissions.includes(target);
}

function containsSubstring(text: string, substring: string): boolean {
  return text.includes(substring);
}

function isValidStatus(code: number, validCodes: number[]): boolean {
  return validCodes.includes(code);
}
