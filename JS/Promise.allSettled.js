/*
    The Promise.allSettled() method returns a promise that fulfills after all
    of the given promises have either fulfilled or rejected, with an array of
    objects that each describes the outcome of each promise.
    Promise.allSettled() takes an array of promises as input and
    returns an array with the result of all the promises whether they
    are rejected or resolved.
        Reading the problem statement we can break it down into
        sub-problems and tackle them individually.
            ● Map the array of promises to return an object with status
            and value/error depending upon the promised settlement.
            ● Pass this map to the Promise.all to run them at once and
            return the result.

*/

function allSettled(tasks) {
    const result = [];
    let tasksCompleted = 0;
    return new Promise((resolve, reject) => {
        tasks.forEach((task, index) => {
            task.then(
              (res) => {
                result[index] = {
                  status: "fulfilled",
                  value: res,
                };
                tasksCompleted++;
                if (tasksCompleted >= tasks.length) resolve(result);
              },
              (res) => {
                  result[index] = {
                      status: "rejected",
                      value: res
                };
                tasksCompleted++;
                if (tasksCompleted >= tasks.length) resolve(result);
              }
            );
        })
    })
}

const a = new Promise((resolve) =>
  setTimeout(() => {
    resolve(3);
  }, 200)
);
const b = new Promise((resolve, reject) => reject(9));
const c = new Promise((resolve) => resolve(5));
allSettled([a, b, c]).then((val) => {
  console.log(val);
});