import IPrePostTest = require("./ipreposttest");

class AfterEach implements IPrePostTest {
    scope: {};
    constructor(public id: string, public label: string, public callback: () => any){
        this.scope = [];
    }
}

export = AfterEach;
