import {IIt} from "./IIt";
import {IIsA} from "./IIsA";
import {IDescribe} from "./IDescribe";
import {INote} from "../expectations/INote";

/**
* returns an It ancestor hierarchy
*/
let getAncestorHierarchy = (describe: IDescribe): IDescribe[] => {
    let parent = describe;
    let hierarchy: IDescribe[] = [];

    // build ancestor hierarchy adding parent to the top of the hierarcy
    while (parent) {
        hierarchy.unshift(parent);
        parent = parent.parent;
    }

    // return ancestor hierarchy
    return hierarchy;
};

export class It implements IIt {
    scope: {};
    expectations: INote[];
    isA: string;
    passed: boolean;
    timeoutInfo: {reason: string , stackTrace: string[]};
    hierarchy: IDescribe[];
    constructor(public parent: IDescribe, public id: string, public label: string, public callback, public excluded = false, public timeoutInterval: number, public callStack: string[]) {
        this.expectations = [];
        this.scope = {};
        this.isA = "It";
        this.passed = true;
        this.hierarchy = getAncestorHierarchy(parent);
    }
}
