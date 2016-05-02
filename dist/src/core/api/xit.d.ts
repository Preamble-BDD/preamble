export interface ApiXIt {
    (label: string, callback: (done?: () => void) => void, timeoutInterval: number): void;
}
export declare let xit: ApiXIt;
