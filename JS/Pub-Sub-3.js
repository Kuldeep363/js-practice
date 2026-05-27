/*
    Create a simple Observable class that implements the observer pattern. The class should:Allow subscribing to 
    data changes via a subscribe methodNotify all subscribers when data changes via a notify methodAllow unsubscribing 
    from updatesMaintain a list of subscriber callbacks
*/

class Observable{
  constructor(){
    this.handlers = [];
  }
  subscribe(fn){
    this.handlers = [...this.handlers,fn];
    return {
      unsubscribe: ()=>{
        this.handlers = this.handlers.filter(f=> f!==fn);
      }
    }
  }
  notify(msg){
    this.handlers.forEach(fn=>{
      fn(msg);
    })
  }
  clear(){
    this.handlers = [];
  }
  getObserverCount(){
    return this.handlers.length;
  }
}


const observable = new Observable();

// Multiple subscribers
const sub1 = observable.subscribe(function(data) { 
  console.log('Sub1:', data); 
});

const sub2 = observable.subscribe(function(data) { 
  console.log('Sub2:', data); 
});

const sub3 = observable.subscribe(function(data) { 
  console.log('Sub3:', data); 
});

console.log('Observer count:', observable.getObserverCount()); // 3

observable.notify('Broadcast message');
// Logs:
// Sub1: Broadcast message
// Sub2: Broadcast message
// Sub3: Broadcast message

// Unsubscribe one
sub2.unsubscribe();

observable.notify('Another message');
// Logs:
// Sub1: Another message
// Sub3: Another message

// Clear all observers
observable.clear();
observable.notify('No one listening'); // Nothing logged