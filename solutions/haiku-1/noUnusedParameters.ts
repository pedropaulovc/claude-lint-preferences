type EventHandler = (eventName: string, data: unknown, timestamp: number) => void;

function createLogger(): EventHandler {
  return (eventName: string, data: unknown, _timestamp: number) => {
    console.log(`Event: ${eventName}`, data);
  };
}

function createCounter(): EventHandler {
  const counts: Record<string, number> = {};

  return (eventName: string, _data: unknown, _timestamp: number) => {
    counts[eventName] = (counts[eventName] ?? 0) + 1;
  };
}
