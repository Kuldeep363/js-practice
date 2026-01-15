/*
    Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

    Example 1:
    Input: n = 3
    Output: ["((()))","(()())","(())()","()(())","()()()"]

    Example 2:
    Input: n = 1
    Output: ["()"]
*/

// SOLUTION::1
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    if(n === 1) return ["()"];
  const result = [];
  const pMap = {
    "(":n-1,
    ")":n-1
  }
  const generate = (pMap,curr, result)=>{
    if(pMap["("] === 0 && pMap[")"] === 0){
        result.push("("+curr+")");
        return;
    }
    if(pMap["("]>0) generate({...pMap,"(":pMap["("]-1},curr+"(",result)
    if(pMap[")"]>0 && pMap["("]<=pMap[")"]) generate({...pMap,")":pMap[")"]-1},curr+")",result)
  }  
  generate(pMap,"",result);
  return result;
};

//SOLUTION::2
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    if(n === 1) return ["()"];
  const result = [];
  const generate = (open, close,str)=>{
    if(str.length === 2*n){
        result.push(str);
        return;
    }
    if(open<n) generate(open+1,close,str+"(");
    if(close<open) generate(open, close+1,str+")")
  }  
  generate(0,0,"");
  return result;
};