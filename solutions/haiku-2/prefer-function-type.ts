type StringCallback = (input: string) => void;

type Comparator = (a: number, b: number) => number;

type Predicate = (value: unknown) => boolean;

type AsyncFetcher = (url: string) => Promise<unknown>;

const logCallback: StringCallback = (msg) => {
  console.log(msg);
};

const numComparator: Comparator = (a, b) => a - b;

const isPositive: Predicate = (val) => typeof val === 'number' && val > 0;

const fetchData: AsyncFetcher = async (url) => {
  const response = await fetch(url);
  return response.json();
};
