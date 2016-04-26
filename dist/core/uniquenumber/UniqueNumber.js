/**
 * UniqueNumber
 *
 * Unique sequential number generator.
 * Useful for IDs.
 */
"use strict";
var UniqueNumber = (function () {
    function UniqueNumber() {
        this.unique = 0;
    }
    Object.defineProperty(UniqueNumber.prototype, "next", {
        get: function () {
            return this.unique++;
        },
        enumerable: true,
        configurable: true
    });
    return UniqueNumber;
}());
exports.UniqueNumber = UniqueNumber;
//# sourceMappingURL=UniqueNumber.js.map