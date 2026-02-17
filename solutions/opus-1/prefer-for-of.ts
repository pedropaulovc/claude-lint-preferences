function sumArray(numbers: number[]): number {
  let sum = 0;
  for (const n of numbers) {
    sum += n;
  }
  return sum;
}

function findMax(numbers: number[]): number | undefined {
  if (numbers.length === 0) {
    return undefined;
  }
  let max = numbers[0];
  for (const n of numbers) {
    if (n > max) {
      max = n;
    }
  }
  return max;
}

function collectStrings(items: { label: string }[]): string[] {
  const result: string[] = [];
  for (const item of items) {
    result.push(item.label);
  }
  return result;
}
