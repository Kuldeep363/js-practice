/**
    Given an integer array nums and an integer k, return the number of good subarrays of nums.

    A good array is an array where the number of different integers in that array is exactly k.

    For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.
    A subarray is a contiguous part of an array.

    

    Example 1:

    Input: nums = [1,2,1,2,3], k = 2
    Output: 7
    Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]
    Example 2:

    Input: nums = [1,2,1,3,4], k = 3
    Output: 3
    Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].
    

    Constraints:

    1 <= nums.length <= 2 * 104
    1 <= nums[i], k <= nums.length
 */

var subarraysWithKDistinct = function(nums, k) {
    return atMost(nums, k) - atMost(nums, k-1);
};

function atMost(nums, k) {
    let left = 0;
    let count = 0;
    let freq = new Map();

    for (let right = 0; right < nums.length; right++) {

        freq.set(nums[right], (freq.get(nums[right]) || 0) + 1);

        if (freq.get(nums[right]) === 1) {
            k--;
        }

        while (k < 0) {
            freq.set(nums[left], freq.get(nums[left]) - 1);

            if (freq.get(nums[left]) === 0) {
                k++;
            }

            left++;
        }

        count += right - left + 1;
    }

    return count;
}