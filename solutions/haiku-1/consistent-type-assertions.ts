function parseResponse(input: unknown) {
  const response = input as { status: number; data: string };
  return response;
}

function handleDomNode(node: unknown) {
  const domNode = node as { nodeType: number; textContent: string | null };
  return domNode;
}
