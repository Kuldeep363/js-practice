/*
    Problem Statement -
        Implement a function that takes a list of async functions as input and
        executes them in a series that is one at a time. The next task is
        executed only when the previous task is completed.

    Example:
        Input:
        [
            asyncTask( 3 ),
            asyncTask( 1 ),
            asyncTask( 2 )
        ]
        Output:
        3
        1
        2
*/

async function asyncTasksInSeries(promises) {
    // Method 1: For Loop
    // for (let task of promises) {
    //     const res = await task;
    //     console.log(res)
    // }


    /* Method 2: Recursion */
    const promise = promises.shift();
    promise.then((res) => {
        console.log(res);
        if(promises.length) asyncTasksInSeries(promises)
    })
}
const asyncTask = function (i) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`Completing ${i}`), 100 * i);
  });
};
const promises = [asyncTask(3), asyncTask(1), asyncTask(2)];

asyncTasksInSeries(promises)