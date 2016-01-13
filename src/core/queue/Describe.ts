import {IDescribe} from "./IDescribe";
import {BeforeEach} from "./BeforeEach";
import {AfterEach} from "./AfterEach";
import {It} from "./It";
import {mix} from "./mix";

export class Describe implements IDescribe {
    scope: {};
    items: (mix)[];
    constructor(public id: string, public label: string, public callback: () => any, public excluded = false) {
        this.scope = {};
        this.items = [];
    }
}
