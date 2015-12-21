import IQueueItem = require("./iqueueitem");

class It implements IQueueItem{
    public scope;
    public expectations;
    constructor(path, callback){
        this.expectations = [];
        this.scope = {};
    }
}

export = It;
