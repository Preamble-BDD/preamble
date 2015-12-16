/* globals describe, it */
(function() {
    "use strict";
    describe("#1 describes a suite", function(){
        // console.log("#1 describe callback called");
        // console.log("#1 describe context =", this);
        // it("#2 it should", function(){
        //     console.log("#2 it callback called");
        //     console.log("#2 it context =", this);
        // });
        describe("#3 a nested suite", function(){
            // console.log("#3 nested describe callback called");
            // console.log("#3 describe context =", this);
        });
    });
    describe("#4 describes a suite", function(){
        // console.log("#4 describe callback called");
        // console.log("#4 describe context =", this);
    });
}());
