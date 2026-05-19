/*
    Create a function in JavaScript that accepts a function as input and a count 
    and executes that input function once for a given count of calls. Known as sampling function.
*/

function message(name){
  console.log("hello: ",name);
}
const sampler = (fn,count)=>{
  let iteration = 0;
  return (...args)=>{
    iteration++;
    if(iteration%count === 0) {
      fn.apply(this,args)
    }
  }
}
const sample = sampler(message, 4);
sample("k");
sample("kr");
sample("kr1");
sample("kr12"); // this will be executed
sample("kr123");
sample("kr1234");
sample("kr12345");
sample("kr123456"); // this will be executed