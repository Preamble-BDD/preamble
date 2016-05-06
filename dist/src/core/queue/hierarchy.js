"use strict";
function ancestorHierarchy(item) {
    var parent = item;
    var hierarchy = [];
    // build ancestor hierarchy adding parent to the top of the hierarcy
    while (parent) {
        hierarchy.unshift(parent);
        parent = parent.parent;
    }
    // return ancestor hierarchy
    return hierarchy;
}
exports.ancestorHierarchy = ancestorHierarchy;
;
function descendantHierarchy(queue, item) {
    var child;
    var hierarchy = [];
    // returns an array of all queue items whose parent is aChild
    var searchQueueForChidren = function (aChild) {
        var t = [];
        queue.forEach(function (item) {
            if (item.parent && item.parent.id === aChild.id) {
                t.push(item);
            }
        });
        return t;
    };
    // buid descendant hierarchy adding children to the bottom of the hierarch
    var buildHierarchy = function (item) {
        hierarchy.push(item);
        searchQueueForChidren(item).forEach(function (child) { return buildHierarchy(child); });
    };
    buildHierarchy(item);
    return hierarchy;
}
exports.descendantHierarchy = descendantHierarchy;
//# sourceMappingURL=hierarchy.js.map