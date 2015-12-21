/**
 * environment
 */

 let windows: boolean = window && true || false;

interface IEnvironment { windows: boolean }

let environment: IEnvironment = {
    windows: windows
}

export = environment;
