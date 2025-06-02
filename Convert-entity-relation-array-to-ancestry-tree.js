/*
    Problem Statement -
        Given an array with two entries, parent and child relation, convert the
        array to a relation string (parent -> child -> grandchild).
        The input array will contain relations for many ancestries in random
        order, We must return the array of strings representing different
        relationships.

    
    Input:
    [
        ["lion", "cat"],
        ["dog", "mammal"],
        ["fish", "shark"],
        ["cat", "mammal"],
        ["mammal", "animal"],
        ["animal", "fish"],
    ];
    Output:
    [
        "animal -> mammal -> cat -> lion",
        "animal -> mammal -> cat",
        "animal -> mammal -> dog",
        "animal -> mammal",
        ,
        "animal -> fish",
        "animal -> fish -> shark",
    ];
*/

function createString(relation, entity, lastString = "") {
  const parent = relation[entity];
  lastString = `${parent}->${lastString}`;
  if (relation[parent]) return createString(relation, parent, lastString);
  return lastString;
}

function toRealtionString(arr) {
  const relations = {};
  for (const val of arr) {
    relations[val[0]] = val[1];
  }
  const result = [];
  for (let entity of Object.keys(relations)) {
    let string = entity;
    const stringEntity = createString(relations, entity, string);
    result.push(stringEntity);
  }
  return result;
}
const data = [
  ["lion", "cat"],
  ["cat", "mammal"],
  ["dog", "mammal"],
  ["mammal", "animal"],
  ["fish", "animal"],
  ["shark", "fish"],
];
console.log(toRealtionString(data))
