import IPrePostTest = require("./ipreposttest");

class AfterEach implements IPrePostTest {
    scope: {};
    constructor(public callback: () => any){
        this.scope = [];
    }
}

export = AfterEach;
