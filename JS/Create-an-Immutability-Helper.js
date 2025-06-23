/*
    Problem Statement -
        Implement a simple immutability helper that allows a certain set of
        actions to update the frozen input object . The input object can only be
        updated through this function and the returned value is also frozen.

    Actions:
        _push_
            const inputArr = [ 1 , 2 , 3 , 4 ]
            const outputArr = update(inputArr, {_push_: [ 5 , 6 , 7 ]});
            console .log(outputArr); // [1,2,3,4,5,6,7]

        _replace_
            const state = {
                a: {
                    b: {
                        c: 1
                        }
                    },
                d: 2
            };
            const newState = update(state,{a: {b: { c: {_replace_: 3 }}}});
            console .log(newState);
            {
                "a": {
                    "b": {
                        "c": 3
                    }
                },
                "d": 2
            }
            
            ----------------------

            const inputArr = [ 1 , 2 , 3 , 4 ]
            const outputArr = update(inputArr,{ 1 : {_replace_: 10 }});
            console .log(outputArr); // [1,10,3,4]
        
        _merge_ 
            const state = {
                a: {
                    b: {
                        c: 1
                    }
                },
                d: 2
            };
            const newState = update(state,{a: {b: { _merge_: {e: 5 }}}});
            console .log(newState);
            {
                "a": {
                    "b": {
                        "c": 1,
                        "e": 5
                    }
                },
                "d": 2
            }   
            
        _transform_
            const inputArr = {a: { b: 2 }};
            const outputArr = update(inputArr, {a: { b: {_transform_: ( item ) => item *2 }}});
            console .log(outputArr);
            {
                "a": {
                    "b": 4
                }
            }
*/

function deepFreeze(obj) {
  const keys = Object.getOwnPropertyNames(obj);
  for (const key of keys) {
    const value = obj[key];
    if (value && typeof value === "object") obj[key] = deepFreeze(value);
  }
  return Object.freeze(obj);
}

function update(input, action) {
  function helper(inputObj, action) {
    console.log("i/p:", inputObj, "   action:", action);
    for (const [key, value] of Object.entries(action)) {
      console.log("------ key:", key, "   value:", value);
      switch (key) {
        case "_push_":
          return [...inputObj, ...value];
        case "_replace_":
          return value;
        case "_merge_":
          return {
            ...inputObj,
            ...value,
          };
        case "_transform_":
          return value(inputObj);
        default:
          const returned = helper(inputObj[key], value);
          if (Array.isArray(inputObj)) return (inputObj[key] = returned);
          return {
            ...inputObj,
            [key]: returned,
          };
      }
    }
  }
  const obj = helper(input, action);
  return deepFreeze(obj);
}

// Test case 1

// const inputArr = [1, 2, 3, 4];
// // deep freeze object
// deepFreeze(inputArr);
// const outputArr = update(inputArr, { _push_: [5, 6, 7] });
// // won't update as output is deep freezed
// outputArr[0] = 10;
// console.log(outputArr);

// Test case 2

// const state = {
//   a: {
//     b: {
//       c: 1,
//     },
//   },
//   d: 2,
// };
// // freeze the object
// deepFreeze(state);
// const newState = update(state, { a: { b: { c: { _replace_: 3 } } } });
// newState.a.b.c = 10;
// console.log(newState);

// Test case 3

// const state = {
//     a: {
//         b: {
//             c: 1
//             }
//         },
//     d: 2
// };
// // freeze the object
// deepFreeze(state);
// const newState = update(state,{a: {b: { _merge_: {e: 5 }}}});
// // does not updates
// // as output is frozen
// newState.a.b.e = 10 ;
// console .log(newState);

// Test case 4

const state = { a: { b: 2 } };
// freeze the object
deepFreeze(state);
const newState = update(state, {
  a: { b: { _transform_: (item) => item * 2 } },
});
// does not updates
// as output is frozen
newState.a.b = 10;
console.log(newState);
