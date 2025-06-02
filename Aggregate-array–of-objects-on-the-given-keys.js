/* Problem Statement -
Given an array of objects and two keys “on” and “who”, aggregate the “who” values on the “on” values.
*/
// Input:
const endorsements = [
  { skill: "css", user: "Bill" },
  { skill: "javascript", user: "Chad" },
  { skill: "javascript", user: "Bill" },
  { skill: "css", user: "Sue" },
  { skill: "javascript", user: "Sue" },
  { skill: "html", user: "Sue" },
];
console.log(aggregate(endorsements, "user", "skill"));
// Output: [
//   {
//     user: "Bill",
//     skill: ["css", "javascript"],
//   },
//   {
//     user: "Chad",
//     skill: ["javascript"],
//   },
//   {
//     user: "Sue",
//     skill: ["css", , "javascript", "html"],
//   },
// ];

function aggregate(arr, who, on) {
  const result = {};
  for (const val of arr) {
    const myWho = val[who];
    if (!result[myWho]) {
      result[myWho] = {
        [who]: myWho,
        [on]: [],
      };
    }
    result[myWho][on] = [...result[myWho][on], val[on]];
  }
  return Object.values(result);
}
