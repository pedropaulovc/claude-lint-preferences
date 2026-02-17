type BooleanGrid = boolean[][];

function processItems(numbers: number[], strings: string[]) {
  const doubled = numbers.map(n => n * 2);
  const uppercased = strings.map(s => s.toUpperCase());
  return { doubled, uppercased };
}
