"use strict";
var hierarchy_1 = require("./hierarchy");
/**
 * Returns a subset of quueue that matches filter.
 */
function queueFilter(queue, queueManagerStats, filter) {
    var target;
    var result;
    var originalTotItCount = queueManagerStats.totIts;
    var count = 0;
    if (!filter || !filter.length) {
        return queue;
    }
    // find the item whose id matches the filter and push it onto the hierarchy
    queue.some(function (item) {
        if (item.id === filter) {
            target = item;
            return true;
        }
    });
    // find descendants
    result = hierarchy_1.descendantHierarchy(queue, target);
    // set the queue's total its count
    queueManagerStats.totIts = result.reduce(function (prev, curr) {
        return curr.isA === "It" && prev + 1 || prev;
    }, 0);
    // set the queue's excluded count
    queueManagerStats.totExcIts = result.reduce(function (prev, curr) {
        return curr.isA === "It" && curr.excluded && prev + 1 || prev;
    }, 0);
    // set the queue's filtered count
    queueManagerStats.totFiltered = originalTotItCount - queueManagerStats.totIts;
    return hierarchy_1.descendantHierarchy(queue, target);
}
exports.queueFilter = queueFilter;
//# sourceMappingURL=queueFilter.js.map