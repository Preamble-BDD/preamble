import {IPrePostTest} from "./ipreposttest";

export class AfterEach implements IPrePostTest {
    scope: {};
    constructor(public id: string, public label: string, public callback: () => any) {
        this.scope = [];
    }
}
