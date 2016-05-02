import { mix } from "./mix";
import { QueueManagerStats } from "./QueueManager";
/**
 * Returns a subset of quueue that matches filter.
 */
export declare function queueFilter(queue: mix[], queueManagerStats: QueueManagerStats, filter: string): mix[];
