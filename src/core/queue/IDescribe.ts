import {IIsA} from "./IIsA";
import {Describe} from "./Describe";
import {BeforeEach} from "./BeforeEach";
import {AfterEach} from "./AfterEach";
import {It} from "./It";
import {mix} from "../queue/mix";

export interface IDescribe extends IIsA {
    id: string;
    label: string;
    excluded: boolean;
    context: {};
    callback: () => void;
    beforeEach: BeforeEach;
    afterEach: AfterEach;
    parent: IDescribe;
}
