/**
 * environment
 */

 let windows: boolean = typeof(window) !== "undefined" && window.document && true || false;

interface IEnvironment { windows: boolean }

let environment: IEnvironment = {
    windows: windows
}

export = environment;
