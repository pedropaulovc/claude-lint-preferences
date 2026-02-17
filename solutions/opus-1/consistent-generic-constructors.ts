class Box<T> {
  constructor(public value: T) {}
}

const scores: Map<string, number> = new Map<string, number>();
const tags: Set<string> = new Set<string>();
const items: Array<string> = new Array<string>();
const box: Box<number> = new Box<number>(42);
