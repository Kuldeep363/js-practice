/*
    Problem Statement -
        Implement a throttler that executes an array of tasks. When the
        throttler is passed a number, only executes that number of the tasks
        and passes the other tasks into a queue.
*/

btn.addEventListener(
  "click",
  throttle(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    2,
    (task) => {
      console.log(task);
    },
    2000
  )
);

function throttle(tasks, count = tasks.length, callback, delay = 1000) {
    let executed = false;;
    let queue = [];
    return () => {
        if (!executed) {
            queue = [...queue, tasks];
            const tasksToExecute = queue.slice(0, count);
            callback(tasksToExecute);
            executed = true;
            setTimeout(() => {
                executed = false;
            },delay)
        }
    }
    
}