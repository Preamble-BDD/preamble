import {IPrePostTest} from "./ipreposttest";
import {IDescribe} from "./IDescribe";

export class BeforeEach implements IPrePostTest {
    constructor(public parent: IDescribe, public id: string,
        public callback: () => any, public timeoutInterval: number, public callStack: string[]) {}
}
