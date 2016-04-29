import { IIt } from "../../queue/IIt";
export interface INote {
    it: IIt;
    apiName: string;
    expectedValue: any;
    matcherValue: any;
    result: boolean;
    exception?: Error;
    stackTrace: string[];
}
