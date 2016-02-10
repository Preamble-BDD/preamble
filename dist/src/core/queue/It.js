"use strict";
var It = (function () {
    function It(id, label, callback, excluded, timeoutInterval) {
        if (excluded === void 0) { excluded = false; }
        this.id = id;
        this.label = label;
        this.callback = callback;
        this.excluded = excluded;
        this.timeoutInterval = timeoutInterval;
        this.expectations = [];
        this.scope = {};
    }
    return It;
}());
exports.It = It;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS9xdWV1ZS9JdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7SUFHSSxZQUFtQixFQUFVLEVBQVMsS0FBYSxFQUFTLFFBQVEsRUFBUyxRQUFnQixFQUFTLGVBQXVCO1FBQXZELHdCQUF1QixHQUF2QixnQkFBdUI7UUFBMUUsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFBO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUFTLG9CQUFlLEdBQWYsZUFBZSxDQUFRO1FBQ3pILElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDTCxTQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFQWSxVQUFFLEtBT2QsQ0FBQSJ9