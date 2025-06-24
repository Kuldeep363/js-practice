/*
    Problem Statement -
        Design a concurrent history tracking system where an entity and its
        different services can be registered and changes being made to them
        can be tracked.

        const historyTracking = HistoryTracking();
        historyTracking.registerEntity( "document" );
        historyTracking.registerService( "document",'JavaScript Ultimate Guide' );
        historyTracking.track( "document",'JavaScript Ultimate Guide',"Problem 1" );
        historyTracking.track( "document",'JavaScript Ultimate Guide',"Problem 1,Problem 2" );
        historyTracking.track( "document",'JavaScript Ultimate Guide',"Problem 3" );
        console .log(historyTracking.getHistory( "document",'JavaScript Ultimate Guide' ));
        // ["Problem 1","Problem 1, Problem 2","Problem 3"]
*/

class HistoryTrackingHelper {
  constructor() {
    this.history = new Map();
  }
  registerEntity(entity) {
    const entityData = this.history.get(entity);
    if (!entityData) {
      this.history.set(entity, {});
      return {};
    }
    return entityData;
  }
  registerService(entity, service) {
    const entityData = this.registerEntity(entity); // if there is no entity, it will register a one
    const serviceData = entityData[service];
    if (!serviceData) {
      this.history.set(entity, { [service]: [] });
      return [];
    }
    return serviceData;
  }
  track(entity, service, newData) {
    const serviceData = this.registerService(entity, service);
    const lastData = serviceData[serviceData.length - 1];
    if (!lastData) {
      this.history.set(entity, { [service]: [newData] });
      return;
    }
    const lastDataString = JSON.stringify(lastData);
    const newDataString = JSON.stringify(newData);
    if (lastDataString !== newDataString) {
      this.history.set(entity, { [service]: [...serviceData, newData] });
    }
    return;
  }
  getHistory(entity, service) {
    const entityData = this.history.get(entity);
    if (!entityData) return null;
    return entityData[service];
  }
}

const HistoryTracking = (function () {
  let instance;
  return function () {
    if (!instance) {
      instance = new HistoryTrackingHelper();
    }
    return instance;
  };
})();

const historyTracking = HistoryTracking();
historyTracking.registerEntity("document");
historyTracking.registerService("document", "JavaScript Ultimate Guide");
historyTracking.track("document", "JavaScript Ultimate Guide", "Problem 1");
historyTracking.track(
  "document",
  "JavaScript Ultimate Guide",
  "Problem 1, Problem 2"
);
historyTracking.track("document", "JavaScript Ultimate Guide", "Problem 3");
console.log(
  historyTracking.getHistory("document", "JavaScript Ultimate Guide")
);
