/**
 * environment
 */

 let windows: boolean = typeof(window) !== "undefined" && true || false;

interface IEnvironment { windows: boolean }

let environment: IEnvironment = {
    windows: windows
}

export = environment;
