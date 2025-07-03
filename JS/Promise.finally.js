/*
    The finally() method of a Promise schedules a function, the callback function, to
    be called when the promise is settled. Like then() and catch(), it immediately
    returns an equivalent Promise object, allowing you to chain calls to another
    promise method, an operation called composition.
    Same as the try … catch … finally block where no matter whether code
    runs in a try block or catch block, the finally block will always be
    executed at the end, which can be used for cleanup operations.
    The same way for Promises we have .then() for when promise resolves
    and .catch() for when promise rejects and .finally() block which will
    always run after any of those.
*/

Promise.prototype.finally = (onFinally) => {
  const P = this.contructor || Promise;
  return this.then(
    (val) => P.resolve(onFinally()).then(() => val),
    (err) =>
      P.resolve(onFinally()).then(() => {
        throw err;
      })
  );
};
