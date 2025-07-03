/*
    The Promise.race() method returns a promise that fulfills or rejects as
    soon as one of the promises in an iterable fulfills or rejects, with the
    value or reason from that promise.
        Reading the definition, we can break the problem statement into
        sub-problems to implement the Promise.race() method.
            ● It returns a promise.
            ● The returned promise fulfills or rejects as soon as any one of
            the input promises fulfills or rejects.
            ● Returned promise resolves with the value of the input
            promise or rejects with the reason of the input promise.
*/

function race(tasks) {
  return new Promise((resolve, reject) => {
    tasks.forEach((task) => {
      task.then(
        (res) => {
          resolve(res);
        },
        (res) => {
          reject(res);
        }
      );
    });
  });
}

// test case 1
// const test1 = new Promise(function (resolve, reject) {
//   setTimeout(resolve, 500, "one");
// });
// const test2 = new Promise(function (resolve, reject) {
//   setTimeout(resolve, 100, "two");
// });
// const test3 = new Promise(function (resolve, reject) {
//   setTimeout(reject, 200, "three");
// });
// race([test1, test2, test3])
//   .then(function (value) {
//     // first two resolve, 3rd fails, but promise2 is faster
//     console.log(value);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// test case 2

const test1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, "one");
});
const test2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, "two");
});
const test3 = new Promise(function (resolve, reject) {
  setTimeout(reject, 40, "three");
});
race([test1, test2, test3])
  .then(function (value) {
    // first two resolve, 3rd fails, but promise3 is faster
    console.log(value);
  })
  .catch(function (err) {
    console.log(err);
  });
