/*
    Problem Statement -
        Implement an analytics SDK that exposes log events, it takes in events
        and queues them and then starts sending the events.
            ● Send each event after a delay of 1 second and this logging fails
            every n % 5 times.
            ● Send the next event only after the previous one resolves.
            ● When the failure occurs, attempt a retry.
*/

class analyticsSDK {
  constructor() {
    this.queue = [];
    this.count = 1;
  }
  wait = (retrying) =>
    new Promise((resolve, reject) => {
      if (this.count % 5 === 0 && !retrying) reject();
      else resolve();
    });
  logEvent(event) {
    this.queue.push(event);
  }
  send = async (retrying = false) => {
    if (this.queue.length === 0) return;
    const event = this.queue.shift();
    try {
      await this.wait(retrying);
      console.log("Analytics sent", event);
      this.count++;
      this.send();
    } catch (err) {
      console.log("-----------------------");
      console.log("Failed to send", event);
      console.log("Retrying sending", event);
      console.log("-----------------------");
      this.queue.unshift(event);
      this.send(true);
    }
  };
}
const sdk = new analyticsSDK();
sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7");
sdk.logEvent("event 8");
sdk.logEvent("event 9");
sdk.logEvent("event 10");
sdk.logEvent("event 11");
sdk.logEvent("event 12");
sdk.logEvent("event 13");
sdk.logEvent("event 14");
sdk.logEvent("event 15");
sdk.logEvent("event 16");
sdk.logEvent("event 17");
sdk.logEvent("event 18");
sdk.logEvent("event 19");
sdk.logEvent("event 20");
sdk.send();
