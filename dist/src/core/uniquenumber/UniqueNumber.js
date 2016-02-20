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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5pcXVlTnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvdW5pcXVlbnVtYmVyL1VuaXF1ZU51bWJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBU0E7SUFFSTtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxzQkFBSSw4QkFBSTthQUFSO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFSWSxvQkFBWSxlQVF4QixDQUFBIn0=