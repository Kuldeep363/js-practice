/*
    Given a array arr of integers, return the sums of all subsets in the list.  Return the sums in any order.

    Input: arr[] = [2, 3]
    Output: [0, 2, 3, 5]
    Explanation: When no elements are taken then Sum = 0. When only 2 is taken then Sum = 2. 
    When only 3 is taken then Sum = 3. When elements 2 and 3 are taken then Sum = 2+3 = 5.

    Input: arr[] = [1, 2, 1]
    Output: [0, 1, 1, 2, 2, 3, 3, 4]
    Explanation: The possible subset sums are 0 (no elements), 1 (either of the 1's), 2 (the element 2), 
    and their combinations.

*/

// User function Template for javascript

/**
 * @param {number[]} arr
 * @return {number[]}
 */

class Solution {
    subsetSums(arr) {
        // code here
        const result = [];
        const find = (ind,sum)=>{
            if(ind >= arr.length){
                result.push(sum);
                return;
            }
            find(ind+1, sum+arr[ind]);
            find(ind+1, sum);
        }
        find(0,0);
        return result;
    }
}
