import {IDescribe} from "./IDescribe";
import {IIsA} from "./IIsA";
import {BeforeEach} from "./BeforeEach";
import {AfterEach} from "./AfterEach";
import {It} from "./It";
import {mix} from "./mix";

export class Describe implements IDescribe {
    context: {};
    beforeEach: BeforeEach;
    afterEach: AfterEach;
    isA: string;
    passed: boolean;
    constructor(public id: string, public label: string,
        public callback: () => any, public parent: IDescribe,
        public excluded: boolean = false) {
        this.context = {};
        this.beforeEach = null;
        this.afterEach = null;
        this.isA = "Describe";
        this.passed = true;
    }
}
