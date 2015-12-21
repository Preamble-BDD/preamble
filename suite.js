/* globals describe, beforeEach, afterEach, it */
(function() {
    "use strict";
    describe("#1 describes a suite", function(){
        beforeEach(function(){});
        afterEach(function(){});
        it("#2 it should", function(){});
        describe("#3 a nested suite", function(){
            beforeEach(function(){});
            afterEach(function(){});
            it("#2 it should", function(){});
        });
    });
    describe("#4 describes a suite", function(){
    });
}());
