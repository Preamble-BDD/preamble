import {IIt} from "./IIt";
import {Reason} from "./IIt";
import {IIsA} from "./IIsA";
import {IDescribe} from "./IDescribe";
import {INote} from "../api/expectations/INote";
import {ancestorHierarchy} from "./hierarchy";

/**
* returns an It ancestor hierarchy
*/
export class It implements IIt {
    scope: {};
    expectations: INote[];
    isA: string;
    passed: boolean;
    reasons: Reason[];
    hierarchy: IDescribe[];
    constructor(public parent: IDescribe, public id: string, public label: string, public callback, public excluded = false, public timeoutInterval: number, public callStack: string[]) {
        this.expectations = [];
        this.scope = {};
        this.isA = "It";
        this.passed = true;
        this.hierarchy = <IDescribe[]> ancestorHierarchy(parent);
        this.reasons = [];
    }
}
