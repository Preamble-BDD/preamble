/* globals describe, beforeEach, afterEach, it */
(function() {
    "use strict";
    describe("#1 describes a suite", function(){
        beforeEach(function(){});
        afterEach(function(){});
        it("#1 it should", function(){});
        describe("#1.1 a nested suite", function(){
            beforeEach(function(){});
            afterEach(function(){});
            it("#1.1 it should", function(){});
            describe("#1.1.1 a nested suite", function(){
                beforeEach(function(){});
                afterEach(function(){});
                it("#1.1.1 it should", function(){});
            });
        });
        describe("#1.2 a nested suite", function(){
            beforeEach(function(){});
            afterEach(function(){});
            it("#1.2 it should", function(){});
            describe("#1.2.1 a nested suite", function(){
                beforeEach(function(){});
                afterEach(function(){});
                it("#1.2.1 it should", function(){});
            });
        });
    });
    describe("#4 describes a suite", function(){
        beforeEach(function(){});
        afterEach(function(){});
        it("#4 it should", function(){});
    });
}());
