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
import {mix} from "./mix";

export interface TimeKeeper {
    startTime: number;
    endTime: number;
    totTime: number;
};

export interface QueueManagerStats {
    totDescribes: number;
    totExcDescribes: number;
    totIts: number;
    totExcIts: number;
    totFailedIts: number;
    timeKeeper: TimeKeeper;
    totFiltered?: number;
};

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

export class QueueManager implements IQueueManager {
    static queue: mix[] = [];
    static queueManagerStats: QueueManagerStats = {
        totDescribes: 0,
        totExcDescribes: 0,
        totIts: 0,
        totExcIts: 0,
        totFailedIts: 0,
        timeKeeper: {
            startTime: 0,
            endTime: 0,
            totTime: 0
        }
    };
    constructor(private timerInterval: number, private stableRetryCount: number,
        private Q: typeof q /** see Note above */) { }
    run(): Q.Promise<string | Error> {
        let deferred = this.Q.defer<string | Error>();
        let retryCount: number = 0;
        let prevCount: number = 0;
        let intervalId = setInterval(() => {
            console.log("QueueManager checking queue length stability");
            if (QueueManager.queue.length === prevCount) {
                retryCount++;
                if (retryCount > this.stableRetryCount) {
                    clearInterval(intervalId);
                    if (QueueManager.queue.length === 0) {
                        deferred.reject(new Error("Nothing to test!"));
                    } else {
                        console.log("QueueManager queue stable.");
                        deferred.resolve("QueueManager.queue loaded. Count = " + QueueManager.queue.length + ".");
                    }
                }
            } else if (QueueManager.queue.length > prevCount) {
                prevCount = QueueManager.queue.length;
            }
        }, this.timerInterval);
        return deferred.promise;
    }
    static startTimer(): void {
        QueueManager.queueManagerStats.timeKeeper.startTime = Date.now();
    }
    static stopTimer(): void {
        QueueManager.queueManagerStats.timeKeeper.endTime = Date.now();
        QueueManager.queueManagerStats.timeKeeper.totTime =
            QueueManager.queueManagerStats.timeKeeper.endTime -
            QueueManager.queueManagerStats.timeKeeper.startTime;
    }
    static bumpTotDescribesCount(): void {
        QueueManager.queueManagerStats.totDescribes++;
    }
    static bumpTotExcDescribesCount(): void {
        QueueManager.queueManagerStats.totExcDescribes++;
    }
    static bumpTotItsCount(): void {
        QueueManager.queueManagerStats.totIts++;
    }
    static bumpTotExcItsCount(): void {
        QueueManager.queueManagerStats.totExcIts++;
    }
    static bumpTotFailedItsCount(): void {
        QueueManager.queueManagerStats.totFailedIts++;
    }
}
