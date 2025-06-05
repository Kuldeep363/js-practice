/*
    Problem Statement -
        Implement a function in JavaScript that caches the API response for
        the given amount of time. If a new call is made between that time, the
        response from the cache will be returned, else a fresh API call will be
        made.
*/

const generateKey = (url, payload) => {
  const keys = Object.keys(payload).sort((a, b) => a.localeCompare(b));
  const payloadString = keys.reduce((prev, curr) => {
    prev = `${prev}&${curr}:${payload[curr]}`;
    return prev;
  }, "");
  return `${url}${payloadString}`;
};

function cachedApiCall(cacheTime) {
  const responseCache = new Map();
  const fetchData = async (url, payload, key) => {
    try {
      const res = await fetch(url, payload);
      const response = await res.json();
      responseCache.set(key, { response, endTime: Date.now() + cacheTime });
      return response;
    } catch (err) {
      console.log(err);
      return "Error while fetching data!";
    }
  };
  return async (url, payload) => {
    /*
            Have to check if given arguments data is present in cahce and valid, 
        If yes return it, else fetch fresh data
        TODO:
            - create a unique key for given url and payload
            - check if it present in cache
            - if yes check is it valid by end time stored with the response
            - if no fetch fresh data and store response and end time in cache
    */
    const key = generateKey(url, payload);
    if (responseCache.has(key)) {
      const data = responseCache.get(key);
      // check for validation of data
      const currTime = Date.now();
        if (data && currTime <= data.endTime) {
            console.log("data from cache:::");
            return data.response;
      }
    }
    const res = await fetchData(url, payload, key);
    return res;
  };
}

const call = cachedApiCall(1500);
// first call
// an API call will be made and its response will be cached
call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
  console.log(a)
);
//"making new api call"
/*
{
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
}
*/

// cached response will be returned
// it will be quick

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
    console.log(a)
  );
}, 700);

/*
{
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
}
*/
// a fresh API call is made
// as time for cached entry is expired

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
    console.log(a)
  );
}, 5000);
//"making new api call"
/*
{
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
}
*/
