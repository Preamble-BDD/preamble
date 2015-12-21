import IPrePostTest = require("./ipreposttest");

class BeforeEach implements IPrePostTest {
    scope: {};
    constructor(public callback: () => any){
        this.scope = {};
    }
}

export = BeforeEach;
