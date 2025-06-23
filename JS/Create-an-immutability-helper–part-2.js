/*
    Problem Statement -
        Create an immutability helper like Immer produce() that allows
        modifications of the restricted objects.
        const obj = {
                a: {
                    b: {
                        c: 2
                    }
                }
            };
        // object is frozen
        // its properties cannot be updated
        deepFreeze(obj);
        // obj can only be updated through the produce function
        const newState = produce(obj, draft => {
        draft.a.b.c = 3 ;
        draft.a.b.d = 4 ;
        });
        console .log(newState);
        {
            "a": {
                "b": {
                    "c": 3,
                    "d": 4
                }
            }
        }
        // newState will also be frozen
        // it cannot be updated
        delete newState.a.b.c;
*/

function deepFreeze(obj) {
  const keys = Object.getOwnPropertyNames(obj);
  for (const key of keys) {
    const value = obj[key];
    if (value && typeof value === "object") obj[key] = deepFreeze(value);
  }
  return Object.freeze(obj);
}

function produce(input, func) {
  const copyObj = JSON.parse(JSON.stringify(input));
  func(copyObj);
  return deepFreeze(copyObj);
}

const obj = {
  a: {
    b: {
      c: 2,
    },
  },
};
// object is frozen
// its properties cannot be updated
deepFreeze(obj);
// obj can only be updated through the produce function
const newState = produce(obj, (draft) => {
  draft.a.b.c = 3;
  draft.a.b.d = 4;
});
console.log(newState);
delete newState.a.b.c;
console.log(newState);
