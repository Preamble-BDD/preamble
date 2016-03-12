import {IIt} from "./IIt";
import {IIsA} from "./IIsA";
import {IDescribe} from "./IDescribe";

export class It implements IIt {
    scope: {};
    expectations: any[];
    isA: string;
    constructor(public parent: IDescribe, public id: string, public label: string, public callback, public excluded = false, public timeoutInterval: number) {
        this.expectations = [];
        this.scope = {};
        this.isA = "It";
    }
}
