import { PreambleConfiguration } from "../configuration/PreambleConfiguration";
import { ApiDescribe } from "../api/describe";
import { ApiXDescribe } from "../api/xdescribe";
import { ApiIt } from "../api/it";
import { ApiXIt } from "../api/xit";
import { ApiBeforeEach } from "../api/beforeEach";
import { ApiAfterEach } from "../api/afterEach";
import { Expect } from "../expectations/expect";
import { SpyOnStatic } from "../expectations/spy/spy";
import { SpyOnN } from "../expectations/spy/spy";
import { MockStatic } from "../expectations/mock";
import { Reporter } from "../reporters/Reporter";
import { RegisterMatcher } from "../expectations/expect";
import { RegisterMatchers } from "../expectations/expect";
export interface PreambleGlobal {
    preambleConfig: PreambleConfiguration;
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
        reporters: Reporter[];
        registerMatcher: RegisterMatcher;
        registerMatchers: RegisterMatchers[];
        Q: typeof Q;
    };
}
export declare let pGlobal: PreambleGlobal;
