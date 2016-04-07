import {mix} from "./mix";
import {descendantHierarchy} from "./hierarchy";

/**
 * Returns a subset of quueue that matches filter.
 */
export function queueFilter(queue: mix[], filter: string): mix[] {
    let hierarchy: mix[] = [];

    if (!filter.length) {
        return queue;
    }
    // find the item whose id matches the filter and push it onto the hierarchy
    queue.some((item: mix) => {
        if (item.id === filter) {
            hierarchy.push(item);
            return true;
        }
    });
    // find descendants and add them to the bottom of the hierarchy
    [].push.apply(hierarchy, descendantHierarchy(queue, hierarchy[0]));
    return hierarchy;
}
