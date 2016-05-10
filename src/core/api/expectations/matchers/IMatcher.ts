export interface IMatcher {
    apiName: string;
    api (...args): any;
    evaluator (expectedValue: any, matcherValue?: any): boolean;
    negator?: boolean;
    minArgs: number;
    maxArgs: number;
}
