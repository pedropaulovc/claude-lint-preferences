class Box<T> {
  constructor(public value: T) {}
}

const scores: Map<string, number> = new Map();
const tags: Set<string> = new Set();
const items: Array<string> = new Array();
const box: Box<number> = new Box(42);
