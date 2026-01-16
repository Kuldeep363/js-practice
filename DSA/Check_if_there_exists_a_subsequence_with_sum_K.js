/*
    Given an array arr and target sum k, check whether there exists a subsequence such that 
    the sum of all elements in the subsequence equals the given target sum(k).

    Input:  arr = [10,1,2,7,6,1,5], k = 8.
    Output:  Yes
    Explanation:  Subsequences like [2, 6], [1, 7] sum upto 8

    Input:  arr = [2,3,5,7,9], k = 100. 
    Output:  No
    Explanation:  No subsequence can sum upto 100

*/

class Solution {
    checkSubsequenceWithTargetSum(nums,k){
        const find = (i, sum)=>{
            if(sum === k) return true;
            if(i===nums.length || sum > k) return false;
            return find(i+1, sum+nums[i]) || find(i+1, sum);
        }
        return find(0,0)
    }
}