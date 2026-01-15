/*
    You are given a stack st[]. You have to reverse the stack.
    Input: st[] = [1, 2, 3, 4]
    Output: [4, 3, 2, 1]
*/


/**
 * @param {number[]} st
 * @returns {void}
 */
class Solution {
    reverseStack(st) {
        // code here
        if(st.length > 0){
            const temp = st.pop();
            this.reverseStack(st);
            st.unshift(temp)
        }
    }
}
