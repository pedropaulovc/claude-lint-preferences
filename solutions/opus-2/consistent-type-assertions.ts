interface ParsedResponse {
  status: number;
  data: string;
}

function parseResponse(input: unknown): ParsedResponse | null {
  if (typeof input !== "object" || input === null) {
    return null;
  }

  const response = input as ParsedResponse;

  if (typeof response.status !== "number" || typeof response.data !== "string") {
    return null;
  }

  return response;
}

interface DomNode {
  nodeType: number;
  textContent: string | null;
}

interface TextNode {
  nodeType: 3;
  textContent: string;
}

function asTextNode(node: DomNode): TextNode {
  return node as TextNode;
}
