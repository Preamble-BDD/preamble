import it = require("./It");
import BeforeEach = require("./BeforeEach");
import AfterEach = require("./AfterEach");

interface IDescribe {
    path: string;
    callback: () => void;
    setups: BeforeEach[];
    teardowns: AfterEach[];
    its: it[];
    scope: {};
}

export = IDescribe;
