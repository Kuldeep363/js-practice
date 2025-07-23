/*
    Write a function in JavaScript that works similar to the original
    promise.

    Promises in JavaScript allow you to execute non-blocking
    (asynchronous) code and produce a value if the operation is successful
    or throws an error when the process fails.

    In short, the eventual success (or failure) of an asynchronous
    operation and its associated value are represented by the Promise
    object.
*/

class MyPromise {
  constructor(executor) {
    this.status = "pending"; // initial state: 'pending' | 'fulfilled' | 'rejected'
    this.value = undefined; // resolved value
    this.reason = undefined; // rejection reason

    // Queue for storing callbacks to execute when promise is resolved/rejected
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    // `resolve` changes state from pending to fulfilled
    const resolve = (value) => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;

        // Execute all stored .then(onFulfilled) callbacks
        this.onFulfilledCallbacks.forEach((fn) => fn(value));
      }
    };

    // `reject` changes state from pending to rejected
    const reject = (reason) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;

        // Execute all stored .then(_, onRejected) callbacks
        this.onRejectedCallbacks.forEach((fn) => fn(reason));
      }
    };

    // Immediately call the executor with resolve and reject
    try {
      executor(resolve, reject);
    } catch (err) {
      // If executor throws error, reject the promise
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    // If onFulfilled or onRejected is not a function, set default
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason; // So that catch can catch it
          };

    // Return a new promise to enable chaining
    return new MyPromise((resolve, reject) => {
      // Wrap onFulfilled in a try-catch to safely resolve
      const fulfilledFunc = () => {
        try {
          const result = onFulfilled(this.value);

          // If the result is a MyPromise, wait for it
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      // Wrap onRejected in try-catch
      const rejectedFunc = () => {
        try {
          const result = onRejected(this.reason);

          // If the result is a MyPromise, wait for it
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            reject(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      // Execute appropriate callback based on current status
      if (this.status === "fulfilled") {
        fulfilledFunc();
      } else if (this.status === "rejected") {
        rejectedFunc();
      } else {
        // If still pending, queue the callbacks
        this.onFulfilledCallbacks.push(fulfilledFunc);
        this.onRejectedCallbacks.push(rejectedFunc);
      }
    });
  }

  catch(onRejected) {
    // Syntactic sugar for .then(null, onRejected)
    return this.then(null, onRejected);
  }

  finally(callback) {
    // `finally` is called regardless of resolve or reject
    return this.then(
      (val) => {
        // If resolved, wait for callback (even if it's a promise), then return the same value
        return MyPromise.resolve(callback()).then(() => val);
      },
      (reason) => {
        // If rejected, wait for callback, then rethrow the same error
        return MyPromise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  }

  static resolve(value) {
    // Utility to wrap any value into a MyPromise that resolves
    return new MyPromise((resolve) => resolve(value));
  }
}


const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    //   resolve("Success!");
    resolve("Error occurred!");
  }, 1000);
});
p.then((data) => {
  console.log("Resolved with:", data);
  return 1;
})
  .then((data) => {
    console.log("Resolved with 1:", data);
    return 2;
  })
  .then((data) => {
    console.log("Resolved with 2:", data);
    return 3;
  })
  .catch((error) => {
    console.error("Caught error:", error);
  })
  .finally(() => {
    console.log("Done!");
  });
