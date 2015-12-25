import IDescribe = require("./IDescribe")
import BeforeEach = require("./BeforeEach")
import AfterEach = require("./AfterEach")
import It = require("./It")
import mix = require("./mix");

class Describe implements IDescribe {
    scope: {};
    items: (mix)[];
    constructor(public id: string, public label: string, public callback: () => any){
        this.scope = {};
        this.items = [];
    } 
}

export = Describe;
