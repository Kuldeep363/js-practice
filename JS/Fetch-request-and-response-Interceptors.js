/*
    Problem Statement -
        Add a request and response interceptor method to fetch that can be
        used to monitor each request and response.
*/

// request interceptor -> will intercept the request before calling actual API
const requestInterceptor = (requestArguments) => {
  console.log("Before request");
  return requestArguments;
};
// response interceptor -> will intercept the API later, called after getting response from API
const responseInterceptor = (response) => {
  console.log("After response", response);
  if (response.status === 200) console.log("Data fetched successfully");
  return response;
};
const myFetch = window.fetch;

window.fetch = async (args) => {
  console.log("1111");
  const newArgs = requestInterceptor(args);
  const response = await myFetch(newArgs).then((res) => {
    const newRes = responseInterceptor(res);
    return newRes;
  });
  return response;
};

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json));

