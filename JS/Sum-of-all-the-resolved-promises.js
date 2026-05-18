/*  
    The problem statement read as: An array of promises will be given that will either resolve (with number) or reject, 
    If all the promises reject -> reject, else resolve with the sum of all resolved promises.
    // ✅ Mix of resolved and rejected → sum of resolved
    const p1 = [
    Promise.resolve(10),
    Promise.reject("error"),
    Promise.resolve(20),
    Promise.reject("fail"),
    Promise.resolve(5),
    ];
    sumResolvedPromises(p1).then(console.log).catch(console.error);
    // → 35

    // ✅ All resolve → sum of all
    const p2 = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
    ];
    sumResolvedPromises(p2).then(console.log).catch(console.error);
    // → 6

    // ❌ All reject → triggers catch
    const p3 = [
    Promise.reject("err1"),
    Promise.reject("err2"),
    Promise.reject("err3"),
    ];
    sumResolvedPromises(p3).then(console.log).catch(console.error);
    // → "All promises rejected"

    // ✅ Single resolve among many rejections
    const p4 = [
    Promise.reject("x"),
    Promise.resolve(42),
    Promise.reject("y"),
    ];
    sumResolvedPromises(p4).then(console.log).catch(console.error);
    // → 42

*/

function sumResolvedPromises(promises){
  return new Promise((res,rej)=>{
    let sum = 0, count = 0;
    promises.forEach((task)=>{
      task
      .then((val)=>{
        sum += val;
      })
      .finally(()=>{
        count++;
        if(count>=promises.length){
          if( sum > 0) res(sum);
          else rej("All rejected");
        } 
        
      })
    })
  })
}
const p1 = [
  Promise.resolve(10),
  Promise.reject("error"),
  Promise.resolve(20),
  Promise.reject("fail"),
  Promise.resolve(5),
];
sumResolvedPromises(p1).then(console.log).catch((err)=>{
  console.log("errorr:::::",JSON.stringify(err));
});

const p2 = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
];
sumResolvedPromises(p2).then(console.log).catch(console.error);

const p3 = [
  Promise.reject("err1"),
  Promise.reject("err2"),
  Promise.reject("err3"),
];
sumResolvedPromises(p3).then(console.log).catch(console.error);
// → "All promises rejected"

// ✅ Single resolve among many rejections
const p4 = [
  Promise.reject("x"),
  Promise.resolve(42),
  Promise.reject("y"),
];
sumResolvedPromises(p4).then(console.log).catch(console.error);