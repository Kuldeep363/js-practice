/*
    You are given a string s representing an infix expression. Convert this infix expression to a postfix expression.

    Infix expression: The expression of the form a op b. When an operator is in between every pair of operands.
    Postfix expression: The expression of the form a b op. When an operator is followed for every pair of operands.
    Note: The precedence order is as follows: (^) has the highest precedence and is evaluated from right to left, (* and /) come next with left to right associativity, and (+ and -) have the lowest precedence with left to right associativity.

    Input: s = "a*(b+c)/d"
    Output: abc+*d/
    Explanation: The expression is a*(b+c)/d. First, inside the brackets, b+c becomes bc+. Now the expression looks like a*(bc+)/d. Next, multiply a with (bc+), so it becomes abc+* . Finally, divide this result by d, so it becomes abc+*d/.

    Input: s = "a+b*c+d"
    Output: abc*+d+
    Explanation: The expression a+b*c+d is converted by first doing b*c -> bc*, then adding a -> abc*+, and finally adding d -> abc*+d+.

    Input: s = "(a+b)*(c+d)"
    Output: ab+cd+*
    Explanation: The expression (a+b)*(c+d) is converted by first doing (a+b) -> ab+, then doing (c+d) -> cd+, and finally the expression ab+*cd+ becomes ab+cd+*. 
*/

/**
 * @param {string} s
 * @returns {string}
 */

class Solution {
    infixToPostfix(s) {
        // code here
        const precedence = (c)=>{
            if(c === "^") return 3;
            else if(c === "*" || c === "/") return 2;
            else if(c === "+" || c === "-") return 1;
            return -1
        }
        let result = "";
        const stack = [];
        for(let c of s){
            if(/[a-zA-Z0-9]/.test(c)) result += c;
            else if(c === "(") stack.push(c);
            else if( c === ")"){
                while(stack.length > 0 && stack[stack.length-1] !== "("){
                    result += stack.pop();
                }
                stack.pop();
            }else{
                while(stack.length > 0 && (precedence(c) < precedence(stack[stack.length-1]) || (precedence(c)===precedence(stack[stack.length-1]) && c !== "^"))){
                    result += stack.pop();
                }
                stack.push(c);
            }
        }
        while(stack.length > 0){
            result += stack.pop();
        }
        return result;
    }
}