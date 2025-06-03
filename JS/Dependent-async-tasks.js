/*
  Problem Statement
    Here is a sample dependency graph, where each node is a async task:
    Each node is a async job, illustrated by setTimeout.

    A, B, and C can run at the same time.
    D, needs to wait for A and B to be done.
    E needs to wait for C and D to be done.

*/

function taskA(done) {
  console.log("Task A Completed");
  done();
}
function taskB(done) {
  setTimeout(function () {
    console.log("Task B Completed");
    done();
  }, 2000);
}
function taskC(done) {
  setTimeout(function () {
    console.log("Task C Completed");
    done();
  }, 200);
}
function taskD(done) {
  // setTimeout(function () {
  console.log("Task D Completed");
  done();
  // }, 300);
}
function taskE(done) {
  console.log("Task E Completed");
  done();
}

const asyncGraph = {
  a: {
    task: taskA,
  },
  b: {
    task: taskB,
  },
  c: {
    dependency: ["b"],
    task: taskC,
  },
  d: {
    dependency: ["a", "b"],
    task: taskD,
  },
  e: {
    dependency: ["c", "d"],
    task: taskE,
  },
};

// example asyncGraph1

// const asyncGraph3 = {
//   a: {
//     task: taskA,
//     depLength: 0,
//     subs:["d"]
//   },
//   b: {
//     task: taskB,
//     depLength: 0,
//     subs:["d","c"]
//   },
//   c: {
//     dependency: ["b"],
//     task: taskC,
//     depLength: 1,
//     subs:["e"]
//   },
//   d: {
//     dependency: ["a", "b"],
//     task: taskD,
//     depLength: 2,
//     subs:["e"]
//   },
//   e: {
//     dependency: ["c", "d"],
//     task: taskE,
//     depLength: 2,
//     subs:[]
//   },
// };

const asyncGraph1 = {};
for (const key in asyncGraph) {
  const { task, dependency = [] } = asyncGraph[key];
  asyncGraph1[key] = {
    task,
    dependency,
    subs: [],
    depLength: dependency.length,
  };
}
for (const key in asyncGraph) {
  const { dependency = [] } = asyncGraph[key];
  dependency.forEach((dep) => {
    if (asyncGraph1[dep]) {
      asyncGraph1[dep].subs.push(key);
    }
  });
}

async function runTasks(tasks, callback) {
  const resolveMap = new Map();
  function doneTask(key, task) {
    const done = resolveMap.get(key);
    if (done) done();
    task.subs.forEach((sub) => {
      asyncGraph1[sub].depLength -= 1;
      if (asyncGraph1[sub].depLength === 0)
        asyncGraph1[sub].task(() => {
          doneTask(sub, asyncGraph1[sub]);
        });
    });
  }
  function run(task, key, resolve) {
    resolveMap.set(key, resolve);
    if (task.depLength === 0) {
      task.task(() => {
        doneTask(key, task);
      });
    }
  }

  const promises = tasks.map((key) => {
    return new Promise((resolve) => {
      run(asyncGraph1[key], key, resolve);
    });
  });
  await Promise.all(promises);
  callback();
}

runTasks(Object.keys(asyncGraph1), () => console.log("All done:::"));
