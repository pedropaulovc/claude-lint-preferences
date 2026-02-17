type EventHandler = (eventName: string, data: unknown, timestamp: number) => void;

function createLogger(): EventHandler {
  return (eventName: string, data: unknown, timestamp: number) => {
    console.log(`[${timestamp}] ${eventName}:`, data);
  };
}

function createCounter(): EventHandler {
  const counts: { [event: string]: number } = {};

  return (eventName: string, data: unknown, timestamp: number) => {
    counts[eventName] = (counts[eventName] || 0) + 1;
    console.log(`Event "${eventName}" occurred ${counts[eventName]} times`);
  };
}
