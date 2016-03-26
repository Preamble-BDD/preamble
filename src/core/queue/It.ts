import {IIt} from "./IIt";
import {IIsA} from "./IIsA";
import {IDescribe} from "./IDescribe";
import {INote} from "../expectations/INote";

export class It implements IIt {
    scope: {};
    expectations: INote[];
    isA: string;
    passed: boolean;
    constructor(public parent: IDescribe, public id: string, public label: string, public callback, public excluded = false, public timeoutInterval: number) {
        this.expectations = [];
        this.scope = {};
        this.isA = "It";
        this.passed = true;
    }
}
