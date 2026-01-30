/*
    You are given an integer array arr[ ]. For every element in the array, your task is to determine its Next Smaller Element (NSE).
    The Next Smaller Element (NSE) of an element x is the first element that appears to the right of x in the array and is strictly smaller than x.
    If no such element exists, assign -1 as the NSE for that position.

    Examples:
    Input: arr[] = [4, 8, 5, 2, 25]
    Output: [2, 5, 2, -1, -1]
    Explanation: 
    The first element smaller than 4 having index > 0 is 2.
    The first element smaller than 8 having index > 1 is 5.
    The first element smaller than 5 having index > 2 is 2.
    There are no elements smaller than 4 having index > 3.
    There are no elements smaller than 4 having index > 4.

    Input: arr[] = [13, 7, 6, 12]
    Output: [7, 6, -1, -1]
    Explanation:
    The first element smaller than 13 having index > 0 is 7.
    The first element smaller than 7 having index > 1 is 6.
    There are no elements smaller than 6 having index > 2.
    There are no elements smaller than 12 having index > 3.
*/
/**
 * @param {number[]} arr
 * @returns {number[]}
 */
class Solution {
    nextSmallerEle(arr) {
        // code here
        const len = arr.length, res = Array(len).fill(-1), st = [];
        for(let i = len-1;i>=0;i--){
            const el = arr[i];
            while(st.length && el<= st[st.length-1]){
                st.pop();
            }
            if(st.length) res[i] = st[st.length-1]
            st.push(el);
        }
        return res;
    }
}