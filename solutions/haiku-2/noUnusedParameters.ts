type EventHandler = (eventName: string, data: unknown, timestamp: number) => void;

function createLogger(): EventHandler {
  return (eventName, data) => {
    console.log(`[Event: ${eventName}]`, data);
  };
}

function createCounter(): EventHandler {
  const counts: Record<string, number> = {};

  return (eventName) => {
    counts[eventName] = (counts[eventName] ?? 0) + 1;
  };
}
