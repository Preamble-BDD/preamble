import {PreambleConfiguration} from "../configuration/PreambleConfiguration";
import {ApiDescribe} from "../api/describe";
import {ApiXDescribe} from "../api/xdescribe";
import {ApiIt} from "../api/it";
import {ApiXIt} from "../api/xit";
import {ApiBeforeEach} from "../api/beforeEach";
import {ApiAfterEach} from "../api/afterEach";
import {Expect} from "../api/expectations/expect";
import {SpyOnStatic} from "../api/expectations/spy/spy";
import {SpyOnN} from "../api/expectations/spy/spy";
import {MockStatic} from "../api/expectations/mock";
import {Reporter} from "../reporters/Reporter";
import {RegisterMatcher} from "../api/expectations/expect";
import {RegisterMatchers} from "../api/expectations/expect";
import {IMatcher} from "../api/expectations/matchers/IMatcher";

export interface PreambleGlobal {
    describe: ApiDescribe;
    xdescribe: ApiXDescribe;
    it: ApiIt;
    xit: ApiXIt;
    beforeEach: ApiBeforeEach;
    afterEach: ApiAfterEach;
    expect: Expect;
    spyOn: SpyOnStatic;
    spyOnN: SpyOnN;
    mock: MockStatic;
    preamble: {
        run: () => void;
        preambleConfig: PreambleConfiguration;
        reporters: Reporter[];
        registerMatcher: RegisterMatcher;
        registerMatchers: RegisterMatchers[];
        Q: typeof Q;
    };
}

let preambleGlobal = require("@jeffreyschwartz/environment");
export let pGlobal = <PreambleGlobal>preambleGlobal;
