class Box<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }
}

const stringToNumberMap: Map<string, number> = new Map([
  ['a', 1],
  ['b', 2]
]);

const stringSet: Set<string> = new Set(['hello', 'world']);

const numberArray: number[] = [1, 2, 3];

const box: Box<string> = new Box('test');
