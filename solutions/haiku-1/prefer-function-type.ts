type SimpleCallback = (input: string) => void;

type Comparator = (a: number, b: number) => number;

type Predicate = (value: unknown) => boolean;

type AsyncFetcher = (url: string) => Promise<unknown>;
