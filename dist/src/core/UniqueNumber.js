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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5pcXVlTnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvVW5pcXVlTnVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQTtJQUVJO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUNELHNCQUFJLDhCQUFJO2FBQVI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQVJZLG9CQUFZLGVBUXhCLENBQUEifQ==