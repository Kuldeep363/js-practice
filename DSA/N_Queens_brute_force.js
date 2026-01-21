/*
    The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
    Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.
    Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate
     a queen and an empty space, respectively.

    Example 1:
    Input: n = 4
    Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
    Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above

    Example 2:
    Input: n = 1
    Output: [["Q"]]
*/

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const result = [];
    const canFill = (row,col,board)=>{
        for(let i=0;i<col;i++){
            if(board[row][i] === "Q") return false;
        }
        for(let i=row-1,j=col-1;i>=0 && j>=0;i--,j--){
            if(board[i][j] === "Q") return false;
        }
        for(let i=row+1,j=col-1;i<n && j>=0;i++,j--){
            if(board[i][j] === "Q") return false;
        }
        return true;
    }
    const board = Array.from({length:n}, ()=>Array(n).fill("."))
    const find = (col,board)=>{
        if(col === n){
            const temp = board.map(b=> b.join(""))
            result.push(temp);
            return ;
        }
        for(let row=0; row< n;row++){
            if(canFill(row,col,board)){
                board[row][col] = "Q";
                find(col+1, board);
                board[row][col] = ".";
            }
        }
    }
    find(0,board);
    return result;
};