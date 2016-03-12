import {IDescribe} from "../queue/IDescribe";

export interface ICallStack {
    pushDescribe (IDescribe): number;
    popDescribe (): IDescribe;
    clear(): void;
    length: number;
    uniqueId: number;
    stack: IDescribe[];
    getTopOfStack (): IDescribe;
}
