function hasPermission(permissions: string[], target: string): boolean {
  return permissions.indexOf(target) !== -1;
}

function containsSubstring(str: string, substring: string): boolean {
  return str.indexOf(substring) !== -1;
}

function isValidStatus(statusCodes: number[], status: number): boolean {
  return statusCodes.indexOf(status) !== -1;
}
