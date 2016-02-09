import { BeforeEach } from "./BeforeEach";
import { AfterEach } from "./AfterEach";
import { mix } from "./mix";
export declare class Describe {
    id: string;
    label: string;
    callback: () => any;
    excluded: boolean;
    scope: {};
    items: (mix)[];
    beforeEach: BeforeEach;
    afterEach: AfterEach;
    constructor(id: string, label: string, callback: () => any, excluded?: boolean);
}
