import { IMatcher } from "./matchers/IMatcher";
import { SpyOnStatic } from "./spy/spy";
import { IIt } from "../../queue/IIt";
import { StackTrace } from "../../stacktrace/StackTrace";
import { DeepRecursiveCompare } from "./comparators/deeprecursiveequal";
export interface Expect {
    (ev: any): {};
}
export interface RegisterMatcher {
    (matcher: IMatcher): void;
}
export interface RegisterMatcherHelpers {
    deepRecursiveCompare: DeepRecursiveCompare;
}
export interface RegisterMatchers {
    (registerMatcher: RegisterMatcher, helpers: RegisterMatcherHelpers): void;
}
export interface Configure {
    (_shortCircuit: boolean, _getCurrentIt: () => IIt, _spyOn: SpyOnStatic, _stackTrace: StackTrace): void;
}
export interface ExpectAPI {
    expect: Expect;
    registerMatcher: RegisterMatcher;
    getMatchersCount: () => number;
    configure: Configure;
}
export declare let expectApi: ExpectAPI;
