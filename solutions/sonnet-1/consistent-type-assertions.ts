function parseResponse(input: unknown): { status: number; data: string } {
    const response = input as { status: number; data: string };
    return response;
}

type TextNode = { nodeType: number; textContent: string };

function getTextContent(node: { nodeType: number; textContent: string | null }): string {
    const textNode = node as TextNode;
    return textNode.textContent;
}
