export interface IIt {
    id: string;
    label: string;
    excluded: boolean;
    scope: {};
    callback: () => void;
    timeoutInterval: number;
}
