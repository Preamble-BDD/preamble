import IPrePostTest = require("./ipreposttest");

class BeforeEach implements IPrePostTest {
    scope: {};
    constructor(public id: string, public label: string, public callback: () => any){
        this.scope = {};
    }
}

export = BeforeEach;
