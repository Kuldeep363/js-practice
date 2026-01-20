/*
    Given a string containing digits from 2-9 inclusive, return all possible letter combinations that 
    the number could represent. Return the answer in any order.

    A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
    
    Example 1:
    Input: digits = "23"
    Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

    Example 2:
    Input: digits = "2"
    Output: ["a","b","c"]
*/
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const alphaMap = {
        "2": ["a","b","c"],
        "3": ["d","e","f"],
        "4": ["g","h","i"],
        "5": ["j","k","l"],
        "6": ["m","n","o"],
        "7": ["p","q","r","s"],
        "8": ["t","u","v"],
        "9": ["w","x","y","z"]
    }
    const result = [];
    const find = (i,curr)=>{
        if(curr.length === digits.length) {
            result.push(curr);
            return;
        }
        if(i=== digits.length) return;
        for(let d = 0;d<alphaMap[digits[i]].length;d++){
            find(i+1,curr+alphaMap[digits[i]][d]);
        }
    }
    find(0,"");
    return result;
};