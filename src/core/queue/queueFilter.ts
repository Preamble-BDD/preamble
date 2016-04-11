import {mix} from "./mix";
import {descendantHierarchy} from "./hierarchy";
import {QueueManagerStats} from "./QueueManager";

/**
 * Returns a subset of quueue that matches filter.
 */
export function queueFilter(queue: mix[], queueManagerStats: QueueManagerStats, filter: string): mix[] {
    let target: mix;
    let result: mix[];
    let originalTotItCount = queueManagerStats.totIts;
    let count: number = 0;

    if (!filter.length) {
        return queue;
    }
    // find the item whose id matches the filter and push it onto the hierarchy
    queue.some((item: mix) => {
        if (item.id === filter) {
            target = item;
            return true;
        }
    });
    // find descendants
    result = descendantHierarchy(queue, target);
    // set the queue's total its count
    queueManagerStats.totIts = result.reduce((prev, curr) => {
        return curr.isA === "It" && prev + 1 || prev;
    }, 0);
    // set the queue's excluded count
    queueManagerStats.totExcIts = result.reduce((prev, curr) => {
        return curr.isA === "It" && curr.excluded && prev + 1 || prev;
    }, 0);
    // set the queue's filtered count
    queueManagerStats.totFiltered = originalTotItCount - queueManagerStats.totIts;
    return descendantHierarchy(queue, target);
}
