/*
    Consider a rat placed at position (0, 0) in an n x n square matrix maze[][]. The rat's goal is to reach the destination at position (n-1, n-1). The rat can move in four possible directions: 'U'(up), 'D'(down), 'L' (left), 'R' (right).

    The matrix contains only two possible values:

    0: A blocked cell through which the rat cannot travel.
    1: A free cell that the rat can pass through.
    Your task is to find all possible paths the rat can take to reach the destination, starting from (0, 0) and ending at (n-1, n-1), under the condition that the rat cannot revisit any cell along the same path. Furthermore, the rat can only move to adjacent cells that are within the bounds of the matrix and not blocked.
    If no path exists, return an empty list.

    Note: Return the final result vector in lexicographically smallest order.

    Examples:

    Input: maze[][] = [[1, 0, 0, 0], [1, 1, 0, 1], [1, 1, 0, 0], [0, 1, 1, 1]]
    Output: ["DDRDRR", "DRDDRR"]
    Explanation: The rat can reach the destination at (3, 3) from (0, 0) by two paths - DRDDRR and DDRDRR, when printed in sorted order we get DDRDRR DRDDRR.
    
    Input: maze[][] = [[1, 0], [1, 0]]
    Output: []
    Explanation: No path exists as the destination cell (1, 1) is blocked.
    
    Input: maze[][] = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
    Output: ["DDRR", "RRDD"]
    Explanation: The rat has two possible paths to reach the destination: DDRR and RRDD.
*/
/**
 * @param {number[][]} mat
 * @returns {string[]}
 */
class Solution {
    ratInMaze(maze) {
        // code here
        const result = [];
        const find = (row,col,curr)=>{
            if(row === maze.length-1 && col === maze[0].length-1){
                result.push(curr);
                return;
            }
            maze[row][col] = 0;
            if(row < maze.length-1 && maze[row+1][col] === 1) find(row+1,col,curr+"D")
            if(col>0 && maze[row][col-1] === 1) find(row,col-1,curr+"L")
            if(col< maze[0].length-1 && maze[row][col+1] === 1) find(row,col+1,curr+"R")
            if(row>0 && maze[row-1][col] === 1) find(row-1,col,curr+"U")
            maze[row][col] = 1;
        }
        find(0,0,"");
        return result;
    }
}

// Time Complexity:
// 👉 O(4^(n²)) (exponential due to backtracking)

// Space Complexity:
// 👉 O(n²) auxiliary space (recursion stack)
// 👉 O(k × n²) including result storage