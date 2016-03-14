export interface IMatcher {
    evalueator (expectedValue: any, actualValue?: any): boolean;
    negator?: boolean;
    apiName: string;
    minArgs: number;
    maxArgs: number;
}
