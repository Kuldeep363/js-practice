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
function runAsyncGraph(graph, callback) {
  //TODO: complete this function
  const result = new Map();
  const resolves = new Map();

  function callSubscriber(task, done) {
    graph[task].subscriber.forEach((sub) => {
      graph[sub]["count"] = graph[sub]["count"] - 1;
      if (graph[sub]["count"] === 0) {
        graph[sub].task(() => {
          doneTask(sub);
        });
      }
    });
  }

  function doneTask(key) {
    result.set(key, true);
    const done = resolves.get(key);
    done();
    if (graph[key]["subscriber"]) callSubscriber(key);
  }

  function executeTask(key, done) {
    /* if(result.has(key)){
    done();
    return;
  } */
    resolves.set(key, done);
    if (!graph[key].count || graph[key].count === 0) {
      graph[key].task(() => {
        doneTask(key);
      });
    }
  }
  //tasksKey
  const tasksKey = Object.keys(graph);
  console.log("tasksKey :::", tasksKey);
  tasksKey.forEach((key) => {
    if (graph[key].dependency) {
      graph[key].dependency.map((task) => {
        graph[task]["subscriber"] = [...(graph[task]["subscriber"] || []), key];
      });
      console.log("");
      graph[key]["count"] = graph[key].dependency.length;
    }
  });

  console.log("graph :::", graph);
  const tasks = tasksKey.map((key) => {
    return new Promise((resolve) => {
      executeTask(key, resolve);
    });
  });
  Promise.all(tasks).then(() => {
    callback();
  });
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

runAsyncGraph(asyncGraph, () => console.log("Async Graph Completed"));
