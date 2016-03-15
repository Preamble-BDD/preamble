export let deepRecursiveCompare = (a: any, b: any): boolean => {
    if (typeof (a) === "object" && typeof (b) === "object") {
        return compareObjects(a, b) && compareObjects(b, a);
    }
    if (typeof (a) === "object" || typeof (b) === "object") {
        return false;
    }
    return a === b;
};

let compareObjects = (a: any, b: any): boolean => {
    let prop;
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
        } else {
            return false;
        }
    }
    return true;
};

let compareArrays = (a: any, b: any): boolean => {
    let i;
    let len;
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }
        for (i = 0, len = a.length; i < len; i++) {
            if (typeof a[i] === "object" && typeof b[i] === "object") {
                if (!deepRecursiveCompare(a[i], b[i])) {
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
