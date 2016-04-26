export interface ApiIt {
    (label: string, callback: (done?: () => void) => void, timeoutInterval: number): void;
}
export declare let it: ApiIt;
