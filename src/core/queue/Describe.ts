import IQueueItem = require("./iqueueitem");
import It = require("./It");
import BeforeEach = require("./BeforeEach");
import AfterEach = require("./AfterEach");

class Describe implements IQueueItem {
    befores: BeforeEach[];
    afters: AfterEach[];
    its: It[];
    scope: {};
    constructor(public path: string, public callback: () => any){
        this.befores = [];
        this.afters = [];
        this.its = [];
        this.scope = {};
    }
}

export = Describe;
