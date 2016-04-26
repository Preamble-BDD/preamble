/**
 * QueueManager
 * Periodically checks the length of the queue.
 * If it remains stable over a period of time it
 * signals that the queue is ready to be processed.
 */
/**
 * Note: ts compiler will elide this import because q is only being
 * used as a type guard. See QueueManager construcor, particularly its
 * declaration of Q.
 */
import q = require("q");
import { mix } from "./mix";
export interface TimeKeeper {
    startTime: number;
    endTime: number;
    totTime: number;
}
export interface QueueManagerStats {
    totDescribes: number;
    totExcDescribes: number;
    totIts: number;
    totExcIts: number;
    totFailedIts: number;
    timeKeeper: TimeKeeper;
    totFiltered?: number;
}
export interface IQueueManager {
    run: () => Q.Promise<string | Error>;
}
export interface IQueueManagerStatic extends IQueueManager {
    quue: mix[];
    queueManagerStats: QueueManagerStats;
    bumpTotDescribes: () => void;
    bumpTotExcDescribes: () => void;
    bumpTotIts: () => void;
    bumpTotExcIts: () => void;
    bumpTotFailedIts: () => void;
    startTimer: () => void;
    stopTimer: () => void;
}
export declare class QueueManager implements IQueueManager {
    private timerInterval;
    private stableRetryCount;
    private Q;
    static queue: mix[];
    static queueManagerStats: QueueManagerStats;
    constructor(timerInterval: number, stableRetryCount: number, Q: typeof q);
    run(): Q.Promise<string | Error>;
    static startTimer(): void;
    static stopTimer(): void;
    static bumpTotDescribesCount(): void;
    static bumpTotExcDescribesCount(): void;
    static bumpTotItsCount(): void;
    static bumpTotExcItsCount(): void;
    static bumpTotFailedItsCount(): void;
}
