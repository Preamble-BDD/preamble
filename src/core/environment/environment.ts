/**
 * environment
 */

let windows: boolean = typeof (window) !== "undefined" && window.document && true || false;

export let environment = {
    windows: windows
};
