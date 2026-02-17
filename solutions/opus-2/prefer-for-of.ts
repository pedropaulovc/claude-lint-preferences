function sumArray(numbers: number[]): number {
  let total = 0;
  for (const num of numbers) {
    total += num;
  }
  return total;
}

function findMax(numbers: number[]): number | undefined {
  if (numbers.length === 0) {
    return undefined;
  }

  let max = numbers[0];
  for (const num of numbers) {
    if (num > max) {
      max = num;
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
