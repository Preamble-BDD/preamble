import { BeforeEach } from "./BeforeEach";
import { AfterEach } from "./AfterEach";
import { mix } from "../queue/mix";
export interface IDescribe {
    id: string;
    label: string;
    excluded: boolean;
    context: {};
    callback: () => void;
    items: (mix)[];
    beforeEach: BeforeEach;
    afterEach: AfterEach;
}
