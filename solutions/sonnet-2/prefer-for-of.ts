function sumArray(numbers: number[]): number {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

function findMax(numbers: number[]): number {
  let max = -Infinity;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}

function collectStrings(items: Array<{ label: string }>): string[] {
  const result: string[] = [];
  for (let i = 0; i < items.length; i++) {
    result.push(items[i].label);
  }
  return result;
}
