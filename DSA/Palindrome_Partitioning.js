/*
    Given a string s, partition s such that every substring of the partition is a palindrome. 
    Return all possible palindrome partitioning of s.

    Example 1:
    Input: s = "aab"
    Output: [["a","a","b"],["aa","b"]]

    Example 2:
    Input: s = "a"
    Output: [["a"]]
*/

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    if(s.length === 1) return [[s]]
    const result = [];
    const isPalindrome = (s,start,end)=>{
        while(start<=end){
            if(s[start++] !== s[end--]) return false;
        }
        return true;
    }
    const find = (s,i,curr)=>{
        if(i===s.length){
            result.push([...curr]);
            return;
        }
        for(let ind=i;ind<s.length;ind++){
            if(isPalindrome(s,i,ind)){
                find(s,ind+1,[...curr,s.substring(i,ind+1)])
            }
        }
    }
    find(s,0,[]);
    return result;
};