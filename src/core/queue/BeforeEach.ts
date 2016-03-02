import {IPrePostTest} from "./ipreposttest";

export class BeforeEach implements IPrePostTest {
    constructor(public id: string, public callback: () => any, public timeoutInterval: number) {}
}
