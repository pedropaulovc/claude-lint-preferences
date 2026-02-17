type EventHandler = (eventName: string, data: unknown, timestamp: number) => void;

function createLogger(): EventHandler {
  return (eventName: string, data: unknown, timestamp: number): void => {
    console.log(`[${timestamp}] ${eventName}:`, data);
  };
}

function createCounter(): EventHandler {
  const counts = new Map<string, number>();

  return (eventName: string, _data: unknown, _timestamp: number): void => {
    const current = counts.get(eventName) ?? 0;
    counts.set(eventName, current + 1);
  };
}
