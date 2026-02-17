type NestedBooleans = boolean[][];

function processItems(numbers: number[], strings: string[]): { doubled: number[]; uppercased: string[] } {
  return {
    doubled: numbers.map((n) => n * 2),
    uppercased: strings.map((s) => s.toUpperCase()),
  };
}
