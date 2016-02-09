"use strict";
var Describe = (function () {
    function Describe(id, label, callback, excluded) {
        if (excluded === void 0) { excluded = false; }
        this.id = id;
        this.label = label;
        this.callback = callback;
        this.excluded = excluded;
        this.scope = {};
        this.items = [];
        this.beforeEach = null;
        this.afterEach = null;
    }
    return Describe;
}());
exports.Describe = Describe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVzY3JpYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS9xdWV1ZS9EZXNjcmliZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUE7SUFLSSxrQkFBbUIsRUFBVSxFQUFTLEtBQWEsRUFDeEMsUUFBbUIsRUFBUyxRQUF5QjtRQUFoQyx3QkFBZ0MsR0FBaEMsZ0JBQWdDO1FBRDdDLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ3hDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUM1RCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBWlksZ0JBQVEsV0FZcEIsQ0FBQSJ9