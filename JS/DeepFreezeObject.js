/*
    Problem:
        Deep freeze the object
*/

function deepFreeze(obj) {
  const keys = Object.getOwnPropertyNames(obj);
  for (const key of keys) {
    const value = obj[key];
    obj[key] = value && typeof value === "object" ? deepFreeze(value) : value;
  }
  return Object.freeze(obj);
}

const person = {
  name: "Kuldeep",
  age: 30,
};
console.log(deepFreeze(person));
