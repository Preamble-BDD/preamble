/**
* returns an ancestor hierarchy
*/
import {mix} from "./mix";

export function ancestorHierarchy(item: mix): mix[] {
    let parent = item;
    let hierarchy: mix[] = [];

    // build ancestor hierarchy adding parent to the top of the hierarcy
    while (parent) {
        hierarchy.unshift(parent);
        parent = parent.parent;
    }

    // return ancestor hierarchy
    return hierarchy;
};

export function descendantHierarchy(queue: mix[], item: mix): mix[] {
    let child: mix;
    let hierarchy: mix[] = [];

    // returns an array of all queue items whose parent is aChild
    let searchQueueForChidren = (aChild): mix[] => {
        let t: mix[] = [];
        queue.forEach((item) => {
            if (item.parent && item.parent.id === aChild.id) {
                t.push(item);
            }
        });
        return t;
    };

    // buid descendant hierarchy adding children to the bottom of the hierarch
    let buildHierarchy = (item: mix) => {
        hierarchy.push(item);
        searchQueueForChidren(item).forEach(child => buildHierarchy(child));
    };

    buildHierarchy(item);
    return hierarchy;
}
