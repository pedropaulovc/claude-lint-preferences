function hasPermission(permissions: string[], target: string): boolean {
  return permissions.includes(target);
}

function containsSubstring(source: string, substring: string): boolean {
  return source.includes(substring);
}

function isValidStatus(statusCodes: number[], status: number): boolean {
  return statusCodes.includes(status);
}
