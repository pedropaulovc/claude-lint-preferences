class Box<T> {
  constructor(public value: T) {}
}

const stringToNumber: Map<string, number> = new Map();
stringToNumber.set('count', 42);

const stringSet: Set<string> = new Set();
stringSet.add('hello');

const numberArray: number[] = [1, 2, 3];

const box: Box<string> = new Box('content');
