interface ApiResponse {
  status: number;
  data: string;
}

interface DomNode {
  nodeType: number;
  textContent: string | null;
}

interface TextNode {
  nodeType: 3;
  textContent: string;
}

function parseResponse(input: unknown): ApiResponse {
  const response = input as ApiResponse;
  return response;
}

function asTextNode(node: DomNode): TextNode {
  return node as TextNode;
}
