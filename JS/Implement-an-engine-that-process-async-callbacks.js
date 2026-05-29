/*
    The problem statement reads as – Implement an engine that process async callbacks using JavaScript. 
    Your task is to provide implementation of the class QueueCallbacks to meet all the condition:Constructor 
    requirements. You should provide the implementation of the constructor and process  methods, Do not change 
    the names of these methods or the number of  arguments they receive.The constructor method should receive an 
    optional string., The value of the string will be responsible for the order in which callbacks stored in the queue 
    are processes.The only non-empty value it can receive in the string LIFO(Last in first out). the default order 
    of processing callbacks in the queue will be FIFO(First in first out).Process method requirementsThe process method 
    receive a single async function that should be executes by following the algorithm described below: If there 
    is currently no async function being executed by the class, the received callback method should be executed 
    immediately.If there is currently only one async function currently being executed the callback method should be 
    executed immediately as well.If there are two async function currently being executed the next callback method should 
    be put into the queue.After one of the currently executing async function is finished.When there were no argument 
    passed to the constructor the first callback method that was pushed into the queue should be executed (First in first out).
    When the argument passed to the constructor was LIFO, the last callback in the queue should be executed.If there are 
    more than 6 callbacks in the queue discard any extra callbacks.If there are more than 3 callbacks in the queue, 
    follow FIFO if no argument is passed to constructor.
*/

class QueueCallbacks{
  constructor(order){
    this.order = order;
    this.callbacks = [];
    this.callbacksExecuting = 0;
  }
  executeFn = (fn)=>{
    this.callbacksExecuting++;
    fn
    .then((val)=>{
      console.log(val)
      this.callbacksExecuting--;
      const currFn = this.order ? this.callbacks.pop() : this.callbacks.shift();
      this.executeFn(currFn)
    })
  }
  process = (fn)=>{
    if(this.callbacks.length === 6) return;
    if(this.callbacksExecuting<2){
      this.executeFn(fn);
    }else{
      this.callbacks = [...this.callbacks, fn];
    }
  }
}

let dummyApi = (index) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(index);
    }, index * 1000);
  })
};

// const asyncCallbacks = new QueueCallbacks();
// asyncCallbacks.process(dummyApi(1));
// asyncCallbacks.process(dummyApi(2));
// asyncCallbacks.process(dummyApi(6));
// asyncCallbacks.process(dummyApi(4));
// asyncCallbacks.process(dummyApi(5));
// asyncCallbacks.process(dummyApi(6));
// asyncCallbacks.process(dummyApi(7));
// asyncCallbacks.process(dummyApi(8));
// asyncCallbacks.process(dummyApi(9));
// asyncCallbacks.process(dummyApi(10));
const asyncCallbacks = new QueueCallbacks('LIFO');
asyncCallbacks.process(dummyApi(1));
asyncCallbacks.process(dummyApi(2));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(4));
asyncCallbacks.process(dummyApi(5));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(7));
asyncCallbacks.process(dummyApi(8));
asyncCallbacks.process(dummyApi(9));
asyncCallbacks.process(dummyApi(10));