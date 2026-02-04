/**
    Given an array of integers arr, find the sum of min(b), where b ranges over every (contiguous) subarray of arr. Since the answer may be large, return the answer modulo 109 + 7.

    Example 1:
    Input: arr = [3,1,2,4]
    Output: 17
    Explanation: 
    Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
    Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
    Sum is 17.

    Example 2:
    Input: arr = [11,81,94,43,3]
    Output: 444

 */

    /**
 * @param {number[]} arr
 * @return {number}
 */
var sumSubarrayMins = function(arr) {
    const n = arr.length;
    const nse = ()=>{
        const st = [], result = Array(n).fill(0);
        for(let i=n-1;i>=0;i--){
            while(st.length && arr[st[st.length-1]]>arr[i]){
                st.pop();
            }
            result[i] = st.length ? st[st.length-1] : n;
            st.push(i);
        }
        return result;
    }
    const pse = ()=>{
        const st = [], result = Array(n).fill(0);
        for(let i=0;i<n;i++){
            while(st.length && arr[st[st.length-1]]>=arr[i]){
                st.pop();
            }
            result[i] = st.length ? st[st.length-1] : -1;
            st.push(i);
        }
        return result;
    }

    const nseSt = nse(), pseSt = pse(), mod = 10**9+7;
    let sum = 0;
    for(let i=0;i<n;i++){
        const n = nseSt[i] - i, p = i - pseSt[i];
        sum = (sum+n*p*arr[i])%mod;
    }
    return sum;
};