import Describe = require("./Describe")
import BeforeEach = require("./BeforeEach")
import AfterEach = require("./AfterEach")
import It = require("./It")
import mix = require("../queue/mix");

interface IDescribe {
    id: string;
    label: string;
    scope: {};
    callback: () => void;
    items: (Describe | BeforeEach | AfterEach | It)[];
}

export = IDescribe;
