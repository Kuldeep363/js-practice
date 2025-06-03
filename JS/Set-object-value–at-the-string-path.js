/*
    Problem Statement -
        Given an object, a path in the string or array of strings format, and a
        value, update the value at the given path in the object.
*/

function setValue(obj, path, value) {
  if (path.length === 1) {
    obj[path[0]] = value;
    return obj;
  }
  obj[path[0]] = setValue(
    obj[path[0]] ? obj[path[0]] : `${+path[0]}` === path[0] ? [] : {},
    path.slice(1),
    value
  );
  return obj;
}

function set(obj, path, val) {
  let keyPath = path;
  if (!Array.isArray(path)) {
    keyPath = path.replace("[",".").replace("]","")
      .split(".")
      ?.filter((key) => key !== "." && key !== "[" && key !== "]");
  }
  setValue(obj, keyPath, val);
}

// Input:
const abc = {
  a: {
    b: {
      c: [1, 2, 3],
    },
    d: {
      a: "hello",
    },
  },
};
const instance1 = JSON.parse(JSON.stringify(abc));
set(instance1, "a.b.c", "learnersbucket");
console.log(instance1.a.b.c);

const instance2 = JSON.parse(JSON.stringify(abc));
set(instance2, "a.b.c.0", "learnersbucket");
console.log(instance2.a.b.c[0]);

const instance3 = JSON.parse(JSON.stringify(abc));
set(instance3, "a.b.c[1]", "learnersbucket");
console.log(instance3.a.b.c[1]);

const instance4 = JSON.parse(JSON.stringify(abc));
set(instance4, ["a", "b", "c", "2"], "learnersbucket");
console.log(instance4.a.b.c[2]);

const instance5 = JSON.parse(JSON.stringify(abc));
set(instance5, "a.b.c[3]", "learnersbucket");
console.log(instance5.a.b.c[3]);

const instance6 = JSON.parse(JSON.stringify(abc));
set(instance6, "a.c.d[0]", "learnersbucket");
// valid digits treated as array elements
console.log(instance6.a.c.d[0]);

const instance7 = JSON.parse(JSON.stringify(abc));
set(instance7, "a.d.01", "learnersbucket");
// invalid digits treated as property string
console.log(instance7.a.d["01"]);

const object = { a: [{ b: { c: 3 } }] };
set(object, "a[0].b.c", 4);
console.log(object.a[0].b.c);

set(object, ["x", "0", "y", "z"], 5);
console.log(object.x[0].y.z);
