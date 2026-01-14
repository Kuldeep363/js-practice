/*
    Given a stack of integers st[]. Sort the stack in ascending order (smallest element at the bottom and largest at the top).
    Input: st[] = [1, 2, 3]
    Output: [3, 2, 1]

    Input: st[] = [41, 3, 32, 2, 11]
    Output: [41, 32, 11, 3, 2]

*/

/**
 * @param {number[]} st
 * @returns {void}
 */
class Solution {
    sortNum(num,st){
        if(st.length === 0 || st[st.length-1]<=num) {
            st.push(num);
            return;
        }
        const temp = st.pop();
        this.sortNum(num,st)
        st.push(temp);
    }
    sortStack(st) {
        // code here
        if(st.length > 0){
            const temp = st.pop();
            this.sortStack(st);
            this.sortNum(temp,st);
        }
    }
}