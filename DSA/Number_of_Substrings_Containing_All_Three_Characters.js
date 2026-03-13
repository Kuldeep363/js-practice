/**
    Given a string s consisting only of characters a, b and c.

    Return the number of substrings containing at least one occurrence of all these characters a, b and c.
    
    Example 1:
    Input: s = "abcabc"
    Output: 10
    Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again). 
    
    Example 2:
    Input: s = "aaacb"
    Output: 3
    Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb". 
    
    Example 3:
    Input: s = "abc"
    Output: 1
    
    Constraints:
    3 <= s.length <= 5 x 10^4
    s only consists of a, b or c characters.
 */

    /**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function(s) {
    let start = 0, count = 0, map = [0,0,0];
    for(let right = 0;right<s.length;right++){
        map[s.charCodeAt(right) - 97] += 1;
        while(!map.includes(0)){
            count += s.length - right;
            map[s.charCodeAt(start)-97] -= 1;
            start++;
        }
    }
    return count;
};