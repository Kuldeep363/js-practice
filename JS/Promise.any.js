/*
    Promise.any() takes an iterable of Promise objects. It returns a single
    promise that fulfills as soon as any of the promises in the iterable
    fulfills, with the value of the fulfilled promise. If no promises in the
    iterable fulfill (if all of the given promises are rejected), then the
    returned promise is rejected with an AggregateError, a new subclass of
    Error that groups together individual errors.
    In simple terms Promise.any() is just opposite of Promise.all() .
        Reading the definition we can break the problem statement into
        multiple sub-problems and then tackle them individually to
        implement the polyfill.
            ● Function takes an array of promises as input and returns a new
            promise.
            ● The returned promise is resolved as soon as any of the input
            promises resolves.
            ● Else if all of the input promises are rejected then the returned
            promise is rejected with the array of all the input promises
            reasons.
*/

function any(tasks) {
  let result = [];
  let tasksCompleted = 0;
  return new Promise((resolve, reject) => {
    tasks.forEach((task, index) => {
      task
        .then((res) => {
          resolve(res);
        })
        .catch((val) => {
          result[index] = val;
          tasksCompleted++;
          if (tasksCompleted === tasks.length) reject(result);
        });
    });
  });
}

const test1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, "one");
});
const test2 = new Promise(function (resolve, reject) {
  setTimeout(reject, 600, "two");
});
const test3 = new Promise(function (resolve, reject) {
  setTimeout(reject, 200, "three");
});
any([test1, test2, test3])
  .then(function (value) {
    console.log(value);
  })
  .catch(function (err) {
    // all three fails
    console.log(err);
  });
