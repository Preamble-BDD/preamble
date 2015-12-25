interface IPrePostTest {
    id: string;
    label: string;
    scope: {};
    callback: (done: () => void) => void;
}

export = IPrePostTest;
