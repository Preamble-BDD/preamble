import {IDescribe} from "./IDescribe";
import {BeforeEach} from "./BeforeEach";
import {AfterEach} from "./AfterEach";
import {It} from "./It";
import {mix} from "./mix";

export class Describe {
    scope: {};
    items: (mix)[];
    beforeEach: BeforeEach;
    afterEach: AfterEach;
    constructor(public id: string, public label: string,
        public callback: () => any, public excluded: boolean = false) {
        this.scope = {};
        this.items = [];
        this.beforeEach = null;
        this.afterEach = null;
    }
}
