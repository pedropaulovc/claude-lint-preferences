type BooleanMatrix = boolean[][];

function processItems(numbers: number[], strings: string[]) {
  return {
    doubled: numbers.map(n => n * 2),
    uppercased: strings.map(s => s.toUpperCase())
  };
}

const matrix: BooleanMatrix = [[true, false], [false, true]];
