interface IIt {
    id: string;
    label: string;
    excluded: boolean;
    scope: {};
    callback: () => void;
}

export = IIt;