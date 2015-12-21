/**
 * IQueueItem
 * describes the shape of the items placed into the queue
 */

import Describe = require("./Describe");
import It = require("./It");
import BeforeEach = require("./BeforeEach");
import AfterEach = require("./AfterEach");

interface IQueueItem {
    describe?: Describe;
    it?: It;
    BeforeEach?: BeforeEach;
    AfterEach?: AfterEach
}

export = IQueueItem;
