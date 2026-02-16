/**
    Given a string s, find the length of the longest substring without duplicate characters.

    Example 1:
    Input: s = "abcabcbb"
    Output: 3
    Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
   
    Example 2:
    Input: s = "bbbbb"
    Output: 1
    Explanation: The answer is "b", with the length of 1.
    
    Example 3:
    Input: s = "pwwkew"
    Output: 3
    Explanation: The answer is "wke", with the length of 3.
    Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const freqMap = new Map();
    let left = 0, max = 0;
    for(let i=0;i<s.length;i++){
        const word = s[i];
        if(freqMap.has(word) && freqMap.get(word) >= left){
            max = Math.max(max,i-left);
            left = freqMap.get(word)+1;
        }
        freqMap.set(word,i);
    }
    max = Math.max(max,s.length-left)
    return max;
};