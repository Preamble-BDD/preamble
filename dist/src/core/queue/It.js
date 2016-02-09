"use strict";
var It = (function () {
    function It(id, label, callback, excluded) {
        if (excluded === void 0) { excluded = false; }
        this.id = id;
        this.label = label;
        this.callback = callback;
        this.excluded = excluded;
        this.expectations = [];
        this.scope = {};
    }
    return It;
}());
exports.It = It;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS9xdWV1ZS9JdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7SUFHSSxZQUFtQixFQUFVLEVBQVMsS0FBYSxFQUFTLFFBQVEsRUFBUyxRQUFnQjtRQUF2Qix3QkFBdUIsR0FBdkIsZ0JBQXVCO1FBQTFFLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBQTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDekYsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNMLFNBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQVBZLFVBQUUsS0FPZCxDQUFBIn0=