"use strict";
var Describe = (function () {
    function Describe(id, label, callback, parent, excluded) {
        if (excluded === void 0) { excluded = false; }
        this.id = id;
        this.label = label;
        this.callback = callback;
        this.parent = parent;
        this.excluded = excluded;
        this.context = {};
        this.beforeEach = null;
        this.afterEach = null;
        this.isA = "Describe";
    }
    return Describe;
}());
exports.Describe = Describe;
