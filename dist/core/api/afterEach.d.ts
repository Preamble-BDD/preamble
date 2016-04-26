export interface ApiAfterEach {
    (callback: (done?: () => void) => void, timeoutInterval: number): void;
}
export declare let afterEach: ApiAfterEach;
