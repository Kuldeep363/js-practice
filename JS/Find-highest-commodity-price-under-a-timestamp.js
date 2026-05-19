/*
    Given a list of timestamps and commodity prices, find out highest commodity price at given timestamp. 
    timestamps are not necessarily in sorted order, there can be multiple entries for a timestamp as well.
    Followup: after each timestamp, commodity price entry, we are putting a checkpoint, given a timestamp 
    and checkpoint find maximum commodity prices till then. 
*/


class Store{
  constructor(){
    this.store = new Map();
  }
  add(timestamp, price){
    const prices = [price,...(this.store.get(timestamp) || [])];
    this.store.set(timestamp,prices);
  }
  highestPrice(timestamp){
    return Math.max(...this.store.get(timestamp));
  }
}

const s = new Store();
s.add(1, 1);
s.add(1, 4);
s.add(1, 2);
console.log(s.highestPrice(1));


// Follow up
class Store{
  constructor(){
    this.store = new Map();
  }
  add(timestamp, price,checkpoint){
    let prices = [price,...(this.store.get(timestamp) || [])];
    if(checkpoint) prices = [...prices, checkpoint];
    this.store.set(timestamp,prices);

  }
  highestPrice(timestamp, checkpoint){
    if(!checkpoint) return Math.max(...this.store.get(timestamp));
    const data = this.store.get(timestamp);
    const index = data.indexOf(checkpoint);
    const arr = data.slice(index);
    console.log(arr)
  }
  
}

const s1 = new Store();
s1.add(1, 1);
s1.add(1, 4);
s1.add(1, 2);
s1.add(1, 3, 'a');
s1.add(1, 6);
s1.add(1, 7);
s1.add(1, 8, 'b');

console.log(s1.highestPrice(1, 'a')); // 4
console.log(s1.highestPrice(1, 'b')); // 8