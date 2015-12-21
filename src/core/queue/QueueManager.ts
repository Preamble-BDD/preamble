/**
 * Queue
 * Periodically checks the length of the queue.
 * If it remains stable over a period of time it
 * signals that the queue is ready to be processed.
 */

class QueueManager {
    static queue: {}[] = [];
    constructor(private timerInterval: number, private stableRetryCount: number, private Q) {}
    run(): Q.Promise<string> {
        let deferred = this.Q.defer()
        let retryCount: number = 0;
        let prevCount: number = 0;
        let intervalId = setInterval(() => {
            console.log("checking queue length stability");
            if(QueueManager.queue.length === prevCount){
                retryCount++;
                if(retryCount > this.stableRetryCount){
                    clearInterval(intervalId);
                    if(QueueManager.queue.length === 0){
                        deferred.reject(new Error("Nothing to test!"));
                    }
                    deferred.resolve("QueueManager.queue count = " + QueueManager.queue.length);
                }
            } else if(QueueManager.queue.length > prevCount){
                prevCount = QueueManager.queue.length;
            }
        }, this.timerInterval);
        return deferred.promise;
    }
}

export = QueueManager;
