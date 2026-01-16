/*
    Given an array nums and an integer k.Return the number of non-empty subsequences of nums such that the sum of all elements in the subsequence is equal to k.

    Example 1
    Input : nums = [4, 9, 2, 5, 1] , k = 10
    Output : 2
    Explanation : The possible subsets with sum k are [9, 1] , [4, 5, 1].

    Example 2
    Input : nums = [4, 2, 10, 5, 1, 3] , k = 5
    Output : 3
    Explanation : The possible subsets with sum k are [4, 1] , [2, 3] , [5].

*/

class Solution {
    countSubsequenceWithTargetSum(nums, k) {
        //your code goes here
        const result = [];
        function find(i,curr, sum){
            if(sum === k) {
                result.push(curr);
                return;
            }
            if(i === nums.length || sum>k) return;
            find(i+1, [...curr, nums[i]], sum+nums[i])
            find(i+1, [...curr], sum)

        }
        find(0,[],0)
        return result.length;
    }
    countSubsequenceWithTargetSum2(nums, k) {
        //your code goes here
        function find(i, sum){
            if(sum === k) return 1;
            if(i === nums.length || sum>k) return 0;
            return find(i+1, [...curr, nums[i]], sum+nums[i]) + find(i+1, [...curr], sum)
        }
        return (find(0,[],0))
    }
}