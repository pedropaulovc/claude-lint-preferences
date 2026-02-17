function parseResponse(input: unknown): { status: number; data: string } | null {
  if (typeof input === 'object' && input !== null) {
    const obj = input as { status?: unknown; data?: unknown };
    if (typeof obj.status === 'number' && typeof obj.data === 'string') {
      return input as { status: number; data: string };
    }
  }
  return null;
}

function assertNodeType(node: { nodeType: number; textContent: string | null }): string {
  if (node.nodeType === 3) {
    return node.textContent as string;
  }
  return '';
}
