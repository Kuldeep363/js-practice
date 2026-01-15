/*
    Given an integer n. You need to generate all the binary strings of n characters representing bits.

    Note: Return the strings in  ascending order.
    Input: n = 2
    Output: [00, 01, 10, 11]
    Explanation: As each position can be either 0 or 1, the total possible combinations are 4.
*/

/**
 * @param {number} n
 * @returns {string[]}
 */

class Solution {
    binstr(n) {
        const result = [];
        // code here
        function allBin(i, curr, result){
            if(i===0) {
                result.push(curr);
                return;
            }
            allBin(i-1,curr+"0", result);
            allBin(i-1,curr+"1", result)
        }
        allBin(n,"",result);
        return result;
    }
}