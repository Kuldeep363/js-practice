/*
    Problem Statement -
        Given a string, write a program to decode the string which is encoded
        in a pattern where a substring is wrapped in square brackets led by a
        number.
*/

function getFromStack(str, strStack) {
  while (strStack.length > 0) {
    const currStr = strStack.pop();
    if (String(+currStr) === currStr)
      // checking for number
      str = str.repeat(currStr);
  }
}

function decodeString(str) {
  const strStack = [];
  for (let i = 0; i < str.length; i++) {
    const currStr = str[i];
    if (currStr !== "]")
      // pop from stack
      strStack.push(currStr);
    else {
      let k = "";
      while (strStack[strStack.length - 1] !== "[") {
        k = strStack.pop() + k;
      }
      strStack.pop(); // remove '['
      let dig = "";
      while (/\d/.test(strStack[strStack.length - 1])) {
        dig = strStack.pop() + dig;
      }
      strStack.push(k.repeat(dig));
    }
  }
  return strStack.join("");
}

const testCases = [
  { input: "2[a2[b]]", expected: "abbabb" },
  { input: "3[b2[ca]]", expected: "bcacabcacabcaca" },
  { input: "3[a]", expected: "aaa" },
  { input: "2[abc]3[cd]ef", expected: "abcabccdcdcdef" },
  { input: "10[a]", expected: "aaaaaaaaaa" },
  { input: "3[a2[c]]", expected: "accaccacc" },
  { input: "2[3[a]b]", expected: "aaabaaab" },
  { input: "100[leetcode]", expected: "leetcode".repeat(100) },
];

testCases.forEach(({ input, expected }, idx) => {
  const output = decodeString(input);
  const passed = output === expected;
  console.log(`Test ${idx + 1}: ${passed ? "✅ PASSED" : "❌ FAILED"}`);
  if (!passed) {
    console.log(`   Input:    ${input}`);
    console.log(`   Output:   ${output}`);
    console.log(`   Expected: ${expected}`);
  }
});
