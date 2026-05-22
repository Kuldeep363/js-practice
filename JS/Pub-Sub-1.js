/*
    Observer design pattern in JavaScript, Also known as pub/sub pattern short for publication/subscription. 
    It is clear from the name itself that if you are subscribed to the publication and if something is published 
    in the publication it will notify the subscriber.A subscription model in which an object subscribes to a host and 
    the host notifies the object whenever an event occurs is known as the observer pattern. It is one of the important 
    pillars of event-driven programming and JavaScript is one of the most popular event-driven programming languages. 
    This pattern promotes loose coupling facilitating good object-oriented design.JavaScript is the most avid user 
    follower observer pattern and we use it almost regularly while building web apps. We write event handlers by creating 
    event listeners that listen to an event and notify them every time the event is fired with some additional details of 
    the event.For example, when a click event is triggered you can access the event object to get all the event details 
    about the click like its position on the screen, etc.You can also remove the listener (unsubscribe) to stop listening 
    if you want.
*/
function Move() {
  this.handlers = [];
  this.subscribe = (handler) => {
    if (!this.handlers.includes(handler)) {
      this.handlers.push(handler);
    }
  };
  this.unsubscribe = (handler) => {
    this.handlers = this.handlers.filter(h => h !== handler);
  };
  this.fire = (data) => {
    [...this.handlers].forEach(handler => handler(data)); // If a handler unsubscribes itself during fire, it can break iteration.
  };
}

// 1st observer
const moveHandler = function (item) {
  console.log("fired: " + item);
};

// 2nd observer
const moveHandler2 = function (item) {
  console.log("Moved: " + item);
};

const move = new Move();

// subscribe 1st observer
move.subscribe(moveHandler);
move.fire('event #1');

// unsubscribe 1st observer
move.unsubscribe(moveHandler);
move.fire('event #2');

// subscribe 1st & 2nd observer
move.subscribe(moveHandler);
move.subscribe(moveHandler2);
move.fire('event #3');