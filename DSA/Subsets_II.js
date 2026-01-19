/*
    Given an integer array nums that may contain duplicates, return all possible subsets (the power set).
    The solution set must not contain duplicate subsets. Return the solution in any order.

    Example 1:
    Input: nums = [1,2,2]
    Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

    Example 2:
    Input: nums = [0]
    Output: [[],[0]]

*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    const result = [];
    const find = (ind, curr)=>{
        result.push([...curr]);
        for(let i=ind;i<nums.length;i++){
            
            if(i>ind && nums[i-1] === nums[i]) continue;
            curr.push(nums[i]);
            find(i+1,curr);
            curr.pop();
        }
    }
    find(0,[]);
    return result;
};