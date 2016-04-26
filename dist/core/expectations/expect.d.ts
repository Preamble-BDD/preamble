import { IMatcher } from "./matchers/IMatcher";
import { DeepRecursiveCompare } from "./comparators/deeprecursiveequal";
export interface Expect {
    (ev: any): {};
}
export declare let expect: Expect;
export interface RegisterMatcher {
    (matcher: IMatcher): void;
}
export interface RegisterMatcherHelpers {
    deepRecursiveCompare: DeepRecursiveCompare;
}
export interface RegisterMatchers {
    (registerMatcher: RegisterMatcher, helpers: RegisterMatcherHelpers): void;
}
export declare let registerMatcher: RegisterMatcher;
export declare let matchersCount: () => number;
