import {IPrePostTest} from "./ipreposttest";

export class AfterEach implements IPrePostTest {
    constructor(public id: string, public callback: () => any, public timeoutInterval: number) {}
}
