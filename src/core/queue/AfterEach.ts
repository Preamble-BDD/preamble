import {IPrePostTest} from "./ipreposttest";

export class AfterEach implements IPrePostTest {
    context: {};
    constructor(public id: string, public callback: () => any, public timeoutInterval: number) {
        this.context = {};
    }
}
