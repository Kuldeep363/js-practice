/*

  You are given an array of task objects. Each task contains:

  - A function `task` that returns a Promise
  - A numeric `priority` value

  All tasks must be executed **concurrently**, and each task may either **resolve** or **reject** after an unpredictable delay.

  Your goal is to implement a function `resolvePromisesWithPriority` that:

  - Executes all tasks in parallel
  - Tracks their completion (resolve/reject)
  - Determines the final result based on **priority rules**

  ---

  ## 🎯 Objective

  Return the **priority value of the highest-priority task that successfully resolves**, where:

  - A **lower numeric value indicates higher priority**
  - A task is considered valid only if it resolves successfully

  ---

  ## ⚙️ Functional Requirements

  1. **Parallel Execution**
      - All tasks must be started immediately (no sequential execution)
  2. **Priority Evaluation**
      - Tasks should be logically evaluated in order of priority (ascending)
      - Even if a lower-priority task resolves earlier, it should not be selected if a higher-priority task is still pending
  3. **Resolution Logic**
      - If a task with the **highest priority** resolves → immediately resolve the main Promise with its priority
      - If it rejects → move to the next highest-priority task
      - Continue this process until a successful task is found
  4. **Failure Handling**
      - If all tasks reject → reject the main Promise with:
          
          ```jsx
          "All promises rejected"
          ```
          

  ## ⚠️ Edge Cases to Consider

  - Multiple tasks with the same priority
  - Tasks resolving out of order due to different delays
  - All tasks rejecting
  - Empty input array
  - Tasks throwing synchronous errors instead of returning rejected Promises

  ## 🚫 Constraints

  - Do not execute tasks sequentially
  - Do not block the event loop
  - Avoid race condition bugs
  - Ensure deterministic behavior regardless of execution timing


*/

function resolvePromisesWithPriority(promises){
    return new Promise((res,rej)=>{
        const sortedPromises = promises.sort((a,b)=> a.priority-b.priority);
        console.log(sortedPromises);
        const tasksCompleted = [];
        let mostPriority = 0, completed = 0; 
        sortedPromises.forEach(promise=>{
            promise.task()
            .then((val)=>{
                if(promise.priority === sortedPromises[mostPriority].priority) return res(promise.priority);
                tasksCompleted.push(promise);
                completed++;
            })
            .catch((err)=>{
                console.log("priority::::", promise.priority, sortedPromises[mostPriority])
                if(promise.priority === sortedPromises[mostPriority].priority){
                    mostPriority++;
                    console.log(mostPriority, tasksCompleted.includes(sortedPromises[mostPriority]), sortedPromises[mostPriority])
                    if(tasksCompleted.includes(sortedPromises[mostPriority])) return res(sortedPromises[mostPriority].priority);
                }
                completed++;
                if(completed >= promises.length) rej("All promises rejected")
            })
        })
    })
}

function createAsyncTask(val) {
  return function(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(val > 5){
          reject(val);
        }else{
          resolve(val);
        }
      }, val * 1000);
    });
  };
};

const promises = [
  {task: createAsyncTask(6), priority: 1}, 
  {task: createAsyncTask(3), priority: 4}, 
  {task: createAsyncTask(3), priority: 3}, 
  {task: createAsyncTask(5), priority: 2}
];

resolvePromisesWithPriority(promises).then((result)=>{
  console.log(result);
}, (error) => {
  console.log(error);
});