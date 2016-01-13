import {Describe} from "./Describe";
import {BeforeEach} from "./BeforeEach";
import {AfterEach} from "./AfterEach";
import {It} from "./It";
import {mix} from "../queue/mix";

export interface IDescribe {
    id: string;
    label: string;
    excluded: boolean;
    scope: {};
    callback: () => void;
    items: (mix)[];
}
