function extractNumbers(input: string): number | null {
    const match = input.match(/\d+/);
    if (!match) return null;
    return parseInt(match[0], 10);
}

function extractEmail(input: string): string | null {
    const match = input.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (!match) return null;
    return match[0];
}
