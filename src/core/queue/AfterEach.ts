import {IPrePostTest} from "./ipreposttest";
import {IDescribe} from "./IDescribe";

export class AfterEach implements IPrePostTest {
    constructor(public parent: IDescribe, public id: string, public callback: () => any, public timeoutInterval: number) {}
}
