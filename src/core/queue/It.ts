import IIt = require("./IIt");

class It implements IIt{
    scope: {};
    expectations: any[];
    constructor(public id: string, public label: string, public callback, public excluded = false){
        this.expectations = [];
        this.scope = {};
    }
}

export = It;
