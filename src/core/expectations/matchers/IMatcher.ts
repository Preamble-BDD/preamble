export interface IMatcher {
    apiName: string;
    api (...args): any;
    evalueator (expectedValue: any, actualValue?: any): boolean;
    negator?: boolean;
    minArgs: number;
    maxArgs: number;
}
