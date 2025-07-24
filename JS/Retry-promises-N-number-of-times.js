/*
    Problem Statement -
        Implement a function in JavaScript that retries promises N number of
        times with a delay between each call.

    Example:
        retry(asyncFn, retries = 3 , delay = 50 , finalError ='Failed' );
        Output:
        ... attempt 1 -> failed
        ... attempt 2 -> retry after 50 ms -> failed
        ... attempt 3 -> retry after 50 ms -> failed
        ... Failed.
*/

const wait = async (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

async function executeWithRetry(
  asyncFn,
  retries = 3,
  delay = 50,
  finalError = "Failed"
) {
  try {
    await asyncFn();
  } catch (err) {
    retries--;
    console.log("failed:::", retries);
    if (retries > 0) {
      await wait();
      await executeWithRetry(asyncFn, retries, delay, finalError);
    } else {
      //   console.log(finalError);
      return Promise.reject(finalError);
    }
  }
}

const getTestFunc = () => {
  let callCounter = 0;
  return async () => {
    callCounter += 1;
    // if called less than 5 times
    // throw error
    if (callCounter < 5) {
      throw new Error("Not yet");
    }
  };
};
// Test the code
const test = async () => {
  await executeWithRetry(getTestFunc(), 10);
  console.log("success");
  await executeWithRetry(getTestFunc(), 3);
  console.log("will fail before getting here");
};
// Print the result
test().catch(console.error);
