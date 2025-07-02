/*

    The Promise.all() accepts an array of promises and returns a promise
    that resolves when all of the promises in the array are fulfilled or when
    the iterable contains no promises. It rejects with the reason of the first
    promise that rejects.
    After reading the definition of Promise.all() we can break down the
    problem in sub-problem and tackle it one by one.
        ● It will return a promise.
        ● The promise will resolve with the result of all the passed
        promises or reject with the error message of the first failed
        promise.
        ● The results are returned in the same order as the promises are in
        the given array.
*/
function myPromiseAll(tasks) {
  const result = [];
  let tasksCompleted = 0;
  return new Promise((resolve, reject) => {
    tasks.forEach((task, index) => {
      task.then(
        (res) => {
          result[index] = res;
          tasksCompleted++;
          if (tasksCompleted === tasks.length) resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
}

function task(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}
const taskList = [task(1000), task(5000), task(3000)];
//run promise.all
myPromiseAll(taskList)
  .then((results) => {
    console.log("got results", results);
  })
  .catch(console.error);
