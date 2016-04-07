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

export interface IQueueManager {
    run: () => Q.Promise<string | Error>;
}

export class QueueManager implements IQueueManager {
    static queue: mix[] = [];
    static totDescribes: number = 0;
    static totExcDescribes: number = 0;
    static totIts: number = 0;
    static totExclIts: number = 0;
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
}
