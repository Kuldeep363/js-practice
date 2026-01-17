/*
    Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

    Each number in candidates may only be used once in the combination.

    Note: The solution set must not contain duplicate combinations.

    

    Example 1:
    Input: candidates = [10,1,2,7,6,1,5], target = 8
    Output: 
    [
    [1,1,6],
    [1,2,5],
    [1,7],
    [2,6]
    ]

    Example 2:

    Input: candidates = [2,5,2,1,2], target = 5
    Output: 
    [
    [1,2,2],
    [5]
    ]
*/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    const result = [], len = candidates.length;
    candidates = candidates.sort((a,b)=>a-b);
    const find = (i, curr, target)=>{
        if(target === 0 ){
            result.push([...curr]);
            return;
        }
        if(i >= len || target < candidates[i]) return;
        for(let index = i;index<len;index++) {
            if(index>i && candidates[index-1] === candidates[index]) continue;
            curr.push(candidates[index])
            find(index+1, curr, target - candidates[index]);
            curr.pop();
        }
    }
    find(0,[],target)
    return result;
};