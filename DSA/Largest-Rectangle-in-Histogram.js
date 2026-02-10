/**
    Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, 
    return the area of the largest rectangle in the histogram.

    Input: heights = [2,1,5,6,2,3]
    Output: 10
    Explanation: The above is a histogram where width of each bar is 1.
    The largest rectangle is shown in the red area, which has an area = 10 units.

    Input: heights = [2,4]
    Output: 4

 */

    /**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    let max = -1,st = [],n=heights.length;
    for(let i=0;i<=n;i++){
        const currHeight = i<n ?heights[i]:0;
        while(st.length && heights[st[st.length-1]] >= currHeight){
            const height = heights[st.pop()];
            let width = 0;
            if(st.length === 0){
                width = i
            }else{
                width = i - (st[st.length-1] + 1)
            }
            console.log(i,width, height)
            max = Math.max(max, width*height);
        }
        st.push(i);
    }
    return max;
};