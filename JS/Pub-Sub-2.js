/*
    Implement the pub-sub pattern in JavaScript that has following methods: subscribe, subscribeOnce, 
    and subscribeOnceAsync.subscribe(name, callback): Will take the name of the event and assign a callback to it. 
    This callback will be invoked when the event is published. It returns a remove() method to unsubscribe the 
    event.subscribeOnce(name, callback): Will take the name of the event and assign a callback to it. 
    This event will be published only once.subscribeOnceAsync(name): Will take the name of the event and returns a 
    promise that is settled or fullfilled when the event is published.publish(name, data): Publish a single event and 
    pass the data to the callback of each events. If the event is subscribed only once, it should not invoke 
    twice.publishAll(name): Publishes all events and passes the data to the callback of each events. 
    If the event is subscribed only once, it should not invoke twice.

*/

function Events(){
  this.handlers = {};
  this.subscribe = (eventName, eventFn)=>{
    this.handlers = {
      ...this.handlers,
      [eventName]: [...(this.handlers[eventName] || []),eventFn]
    }
    return {
    remove: ()=>{
      this.handlers = {
        ...this.handlers,
        [eventName]: this.handlers[eventName].filter(h=>h !== eventFn)
      }
    }
  }
  }
  this.publish = (eventName,data)=>{
    [...(this.handlers[eventName] || [])].forEach(e=>{
      if(Array.isArray(e)) {
        e[0](data);
        this.handlers = {
        ...this.handlers,
        [eventName]: this.handlers[eventName].filter(h=>h !== e)
      }
      }
      else e(data);
    })
  }
  this.publishAll = (data)=>{
    Object.entries(this.handlers).forEach(([_,events])=>{
      events.forEach(e=>{
        if(Array.isArray(e)){ 
          e[0](data);
          this.handlers = {
            ...this.handlers,
            [eventName]: this.handlers[eventName].filter(h=>h !== e)
        }
      }
        else e(data);
      })
    })
  }
  this.subscribeOnce = (eventName,eventFn)=>{
    this.handlers = {
      ...this.handlers,
      [eventName]: [...(this.handlers[eventName] || []),[eventFn]]
    }
  }
  this.subscribeOnceAsync = (eventName)=>{
    return new Promise((res)=>{
      this.handlers = {
        ...this.handlers,
        [eventName]: [...(this.handlers[eventName] || []),[res]]
      }
    })
  }
}


// Test cases
const events = new Events();

const newUserNewsSubscription = events.subscribe("new-user", function (payload) {
  console.log(`Sending Q1 News to: ${payload}`);
});

events.publish("new-user", "Jhon");

//output: "Sending Q1 News to: Jhon"

const newUserNewsSubscription2 = events.subscribe("new-user", function (payload) {
  console.log(`Sending Q2 News to: ${payload}`);
});

events.publish("new-user", "Doe");

//output: "Sending Q1 News to: Doe"
//output: "Sending Q2 News to: Doe"

newUserNewsSubscription.remove(); // Q1 news is removed

events.publish("new-user", "Foo");
//output: "Sending Q2 News to: Foo"

events.publishAll("FooBar");
//output: "Sending Q2 News to: FooBar"

events.subscribeOnce("new-user", function (payload) {
  console.log(`I am invoked once ${payload}`);
});

events.publish("new-user", "Foo Once");
//output: "Sending Q2 News to: Foo Once" - normal event
//output: "I am invoked once Foo Once" - once event

events.publish("new-user", "Foo Twice");
//output: "Sending Q2 News to: Foo Twice" - normal event
// once event should not invoke for second time


events.subscribeOnceAsync("new-user").then(function (payload) {
  console.log(`I am invoked once ${payload}`);
});

events.publish("new-user", "Foo Once Async");
//output: "Sending Q2 News to: Foo Once Async"
//output: "I am invoked once Foo Once Async"