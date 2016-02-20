export interface IPrePostTest {
    id: string;
    context: {};
    callback: (done: () => void) => void;
    timeoutInterval: number;
}
