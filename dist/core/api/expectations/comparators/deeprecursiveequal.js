"use strict";
exports.deepRecursiveCompare = function (a, b) {
    if (typeof (a) === "object" && typeof (b) === "object") {
        if (a === b) {
            // return true if a and b are the same object
            return true;
        }
        return compareObjects(a, b) && compareObjects(b, a);
    }
    return a === b;
};
var compareObjects = function (a, b) {
    var prop;
    if (compareArrays(a, b)) {
        return true;
    }
    for (prop in a) {
        if (a.hasOwnProperty(prop) && b.hasOwnProperty(prop)) {
            if (typeof a[prop] === "object" && typeof b[prop] === "object") {
                if (!compareObjects(a[prop], b[prop])) {
                    return false;
                }
                continue;
            }
            if (typeof a[prop] === "object" || typeof b[prop] === "object") {
                return false;
            }
            if (a[prop] !== b[prop]) {
                return false;
            }
        }
        else {
            return false;
        }
    }
    return true;
};
var compareArrays = function (a, b) {
    var i;
    var len;
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }
        for (i = 0, len = a.length; i < len; i++) {
            if (typeof a[i] === "object" && typeof b[i] === "object") {
                if (!exports.deepRecursiveCompare(a[i], b[i])) {
                    return false;
                }
                continue;
            }
            if (typeof a[i] === "object" || typeof b[i] === "object") {
                return false;
            }
            if (Array.isArray(a[i]) && Array.isArray(b[i])) {
                if (!compareArrays(a[i], b[i])) {
                    return false;
                }
                continue;
            }
            if (Array.isArray(a[i]) || Array.isArray(b[i])) {
                return false;
            }
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
    return false;
};
