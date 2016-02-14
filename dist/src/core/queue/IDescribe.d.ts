import { mix } from "../queue/mix";
export interface IDescribe {
    id: string;
    label: string;
    excluded: boolean;
    scope: {};
    callback: () => void;
    items: (mix)[];
}
