export interface IMatcher {
    evalueator (expectedValue: any, actualValue?: any): boolean;
    negator? (expectedValue: any, actualValue?: any): boolean;
    apiName: string;
}
