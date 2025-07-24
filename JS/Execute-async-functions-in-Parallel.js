/*
    Problem Statement -
        Implement a function that takes a list of async functions as input and a
        callback function and executes the input tasks in parallel i.e all at once
        and invokes the callback after every task is finished.

        Example:
            Input:
            executeParallel(
                [asyncTask( 3 ), asyncTask( 1 ), asyncTask( 2 )],
                (result) => { console .log(result);});
            Output:
            // output in the order of execution
            [ 2 , 1 , 3 ]
*/

function asyncTasksInParallel(promises, cb) {
  let numberOfCompletedTasks = 0;
  const result = [];
  promises.forEach((task) => {
    task.then((res) => {
      numberOfCompletedTasks++;
      result.push(res);
      if (numberOfCompletedTasks >= promises.length) cb(result);
    });
  });
}


function createAsyncTask() {
  const value = Math.floor(Math.random() * 10);
    return new Promise((resolve) => {
      {
        setTimeout(() => {
          resolve(value);
        }, value * 1000);
      }
  });
}

const taskList = [
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
];

asyncTasksInParallel(taskList, (result) => {
  console.log("results", result);
});
