/*
    You are given a string s representing an infix expression. Convert this infix expression to a prefix expression.

    Infix expression: The expression of the form a op b. When an operator is in between every pair of operands.
    Prefix expression: The expression of the form op a b. When an operator comes before its two operands.

    Note: The precedence order is as follows: (^) has the highest precedence and is evaluated from right to left. (* and /) come next with left to right associativity, and (+ and -) have the lowest precedence with left to right associativity.

    Input: s = "a*(b+c)/d"
    Output: /*a+bcd
    Explaination: The infix expression is a*(b+c)/d. First, inside the brackets, b + c becomes +bc. Now the expression looks like a*(+bc)/d. Next, multiply a with (+bc), so it becomes *a+bc. Finally, divide this result by d, so it becomes /*a+bcd.

    Input: s = "(a-b/c)*(a/k-l)"
    Output: *-a/bc-/akl
    Explaination: The infix expression is (a-b/c)*(a/k-l). First, inside the brackets, b/c becomes /bc and a/k becomes /ak.Now the expression looks like (a-/bc) * (/ak-l).Next, handle the subtractions: a-/bc becomes -a/bc, and /ak-l becomes -/akl. Finally, multiply the two results: (-a/bc * -/akl) becomes *-a/bc-/akl.

*/

/**
 * @param {string} s
 * @returns {string}
 */
class Solution {
    infixToPrefix(s) {
        // code here
        const pre = (c)=>{
            if(c === "^") return 3;
            else if(c === "*" || c === "/") return 2;
            else if(c === "+" || c === "-") return 1;
            return -1;
        }
        let result = "";
        const stack = [];
        for(let i=s.length-1;i>=0;i--){
            const c = s[i];
            if(/[a-zA-Z0-9]/.test(c)) result = c + result;
            else if(c === ")") stack.push(c);
            else if(c === "("){
                while(stack.length > 0 && stack[stack.length-1] !== ")"){
                    result = stack.pop() + result;
                }
                stack.pop();
            }else{
                while(stack.length > 0 && (pre(c)<pre(stack[stack.length-1]) || (pre(c) === pre(stack[stack.length-1]) && c === "^"))){
                    result = stack.pop() + result;
                }
                stack.push(c)
            }
        }
        while(stack.length>0){
            result = stack.pop() + result;
        }
        return result;
    }
}