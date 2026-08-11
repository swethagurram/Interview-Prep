type UserEvent = {
    userId: string;
    timestampMs: number; // Unix timestamp in milliseconds
};

const queue: UserEvent[] = [];

function consumeEvents(event: UserEvent) {
    queue.push(event);
}
  
/**
 * returns the number of unique users who have sent at least one event 
 * in the last 5 minutes from any given point in time
 * @param events 
 * @param now 
 */
function activeUsers(now: number): number {
    const lowerBound = now - (5 * 60 * 1000);

    // Remove stale events from front
    while(queue[0].timestampMs < lowerBound)
        queue.shift();

    //Rebuild set
    return queue.map(({userId}) => userId).length;
}