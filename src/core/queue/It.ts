import {IIt} from "./IIt";

export class It implements IIt {
    scope: {};
    expectations: any[];
    constructor(public id: string, public label: string, public callback, public excluded = false, public timeoutInterval: number) {
        this.expectations = [];
        this.scope = {};
    }
}
