type EventHandler = (eventName: string, data: unknown, timestamp: number) => void;

function createLogger(): EventHandler {
    return (eventName: string, data: unknown, timestamp: number) => {
        console.log(`[${timestamp}] ${eventName}:`, data);
    };
}

function createCounter(): EventHandler {
    const counts: { [key: string]: number } = {};
    return (eventName: string, data: unknown, timestamp: number) => {
        counts[eventName] = (counts[eventName] || 0) + 1;
        console.log(`Event "${eventName}" count:`, counts[eventName]);
    };
}
