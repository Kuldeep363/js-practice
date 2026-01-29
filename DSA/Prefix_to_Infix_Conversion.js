/*
    You are given a string S of size N that represents the prefix form of a valid mathematical expression. The string S contains only lowercase and uppercase alphabets as operands and the operators are +, -, *, /, %, and ^.Convert it to its infix form.

    Input: 
    *-A/BC-/AKL
    Output: 
    ((A-(B/C))*((A/K)-L))
    Explanation: 
    The above output is its valid infix form.
*/
// User function Template for javascript
/**
 * @param {string} pre_exp
 * @returns {string}
 */

class Solution {
    // Function to covert prefix expression to infix expression.
    preToInfix(pre_exp) {
        // your code here
        const stack = [];
        for(let i=pre_exp.length-1;i>=0;i--){
            const c = pre_exp[i];
            if(/[a-zA-Z0-9]/.test(c)) stack.push(c);
            else{
                const r = "(" + stack.pop() + c+ stack.pop()  + ")"
                stack.push(r);
            }
        }
        return stack.pop();
    }
}