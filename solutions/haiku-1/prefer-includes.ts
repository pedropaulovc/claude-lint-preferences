function hasPermission(permissions: string[], target: string): boolean {
  return permissions.includes(target);
}

function containsSubstring(text: string, substring: string): boolean {
  return text.includes(substring);
}

function isValidStatus(status: number, validStatuses: number[]): boolean {
  return validStatuses.includes(status);
}
