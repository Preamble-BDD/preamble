import {IPrePostTest} from "./ipreposttest";

export class BeforeEach implements IPrePostTest {
    scope: {};
    constructor(public id: string, public label: string, public callback: () => any){
        this.scope = {};
    }
}
