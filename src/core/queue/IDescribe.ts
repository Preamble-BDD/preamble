import Describe = require("./Describe")
import BeforeEach = require("./BeforeEach")
import AfterEach = require("./AfterEach")
import It = require("./It")
import mix = require("../queue/mix");

interface IDescribe {
    id: string;
    label: string;
    excluded: boolean;
    scope: {};
    callback: () => void;
    items: (mix)[];
}

export = IDescribe;
