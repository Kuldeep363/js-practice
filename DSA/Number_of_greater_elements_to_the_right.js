/**
    Given an array of arr[] and Q queries of indices. For each query indices[i], determine the count of elements in arr that are strictly greater than arr[indices[i]] to its right (after the position indices[i]).

    Examples :
    Input: arr[] = [3, 4, 2, 7, 5, 8, 10, 6], queries = 2, indices[] = [0, 5]
    Output:  [6, 1]
    Explanation: The next greater elements to the right of 3(index 0) are 4,7,5,8,10,6. The next greater elements to the right of 8(index 5) is only 10.

    Input: arr[] = [1, 2, 3, 4, 1], queries = 2, indices[] = [0, 3]
    Output:  [3, 0]
    Explanation: The count of numbers to the right of index 0 which are greater than arr[0] is 3 i.e. (2, 3, 4). Similarly, the count of numbers to the right of index 3 which are greater than arr[3] is 0, since there are no greater elements than 4 to the right of the array.
 */


/**
 * @param {number} N
 * @param {number[]} arr
 * @param {number} queries
 * @param {number[]} indices
 * @returns {number[]}
 */

class Solution {
    count_NGE(arr, indices) {
        // code here
        const result = [];

        for (let q of indices) {
            let count = 0;
            for (let i = q + 1; i < arr.length; i++) {
                if (arr[i] > arr[q]) count++;
            }
            result.push(count);
        }

        return result;
    }
}