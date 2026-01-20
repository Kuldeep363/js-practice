/*
    Given an m x n grid of characters board and a string word, return true if word exists in the grid.

    The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or 
    vertically neighboring. The same letter cell may not be used more than once.

    Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
    Output: true
*/

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const rows = board.length, cols = board[0].length;
    const find = (i,j,ind)=>{
        if(ind === word.length) return true;
        if(i<0 || j<0 || i>= rows || j>= cols || board[i][j] !== word[ind] || board[i][j] === "#") return false;
        const temp = board[i][j];
        board[i][j] = "#";
        const found = find(i+1,j,ind+1) || find(i,j+1,ind+1) || find(i-1,j,ind+1) || find(i,j-1,ind+1)
        board[i][j] = temp;
        return found;
    }
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            if(board[i][j] === word[0]){
                if(find(i,j,0)) return true;
            }
        }
    }
    return false;
};