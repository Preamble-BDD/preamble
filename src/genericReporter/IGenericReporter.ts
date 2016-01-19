/**
 * Basic generic type definitions for reporter implementations.
 */
import {Describe} from "../core/queue/Describe";

export interface IReportData {
    suiteTitle: string; // default or user configured
    preambleVersion: string; // e.g. vmajor.minor.point/v4.0.5
    completedTime?: number; // in miliseconds
    totalPassedSpecs?: number;
    totalFailedSpecs?: number;
    totalExcludedSpecs?: number; // via xdescribe
    totalPassedTests?: number;
    totalFailedTests?: number;
    totalExludedTests?: number; // via xit
    spec?: Describe; // parent Describe object
}

export interface IGenericReporter {
    report(data: IReportData): void;
}
