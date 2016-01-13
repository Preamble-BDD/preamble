/**
 * IQueueItem
 * describes the shape of the items placed into the queue
 */

import {Describe} from "./Describe";
import {It} from "./It";
import {BeforeEach} from "./BeforeEach";
import {AfterEach} from "./AfterEach";

export interface IQueueItem {
    describe?: Describe;
    it?: It;
    BeforeEach?: BeforeEach;
    AfterEach?: AfterEach;
}
