function sumArray(numbers: number[]): number {
  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  return sum;
}

function findMax(numbers: number[]): number {
  let max = -Infinity;
  for (const num of numbers) {
    if (num > max) {
      max = num;
    }
  }
  return max;
}

function collectStrings(objects: Array<{ label: string }>): string[] {
  const labels: string[] = [];
  for (const obj of objects) {
    labels.push(obj.label);
  }
  return labels;
}
