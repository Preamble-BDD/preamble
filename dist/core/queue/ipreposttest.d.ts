export interface IPrePostTest {
    id: string;
    callback: (done: () => void) => void;
    timeoutInterval: number;
    callStack: string[];
}
