/*
    Problem Statement -
        Implement a method in Javascript that will take an object and a string
        or array of strings as a path and return the value at that path. If
        nothing is found, return undefined .

*/

const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};


console.log(get(obj, "a.b.c")); // [1,2,3]
console.log(get(obj, "a.b.c.0")); // 1
console.log(get(obj, "a.b.c[1]")); // 2
console.log(get(obj, ["a", "b", "c","2"])); // 3
console.log(get(obj, "a.b.c[3]")); // undefined
console.log(get(obj, "a.c")); // undefined

function get(obj, keyPath) {
  let path = keyPath;
  let result = obj;
  // if keyPath is an array of string
  if (Array.isArray(path)) path = path.join(".");
  for (const key of path) {
    if (key !== "." && key !== "[" && key !== "]") {
      result = result[key];
    }
  }
  return result || undefined;
}
