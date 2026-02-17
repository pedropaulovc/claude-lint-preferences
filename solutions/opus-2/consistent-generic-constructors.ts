class Box<T> {
  constructor(public value: T) {}
}

const scores: Map<string, number> = new Map<string, number>();
const names: Set<string> = new Set<string>();
const items: Array<number> = new Array<number>(10);
const box: Box<string> = new Box<string>("hello");
