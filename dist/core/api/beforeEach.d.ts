export interface ApiBeforeEach {
    (callback: (done?: () => void) => void, timeoutInterval: number): void;
}
export declare let beforeEach: ApiBeforeEach;
