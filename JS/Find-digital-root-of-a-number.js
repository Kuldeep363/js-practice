/*

    Write an algorithm to find the digital root of a given number. Digital root is the sum of the all 
    the digits of the number till there is only digit left.
    Input:
    5674
    493193

    Output:
    4 // 5 + 6 + 7 + 4 = 22 = 2 + 2 = 4
    2 // 4 + 9 + 3 + 1 + 9 + 3 = 29 = 2 + 9 = 11 = 1 + 1 = 2

*/

function findDigitalRoot(number){
    const solve = (digit)=>{
        if(digit<10) return digit;
        let sum = 0;
        while(digit){
            sum += digit%10;
            digit = Math.floor(digit/10);
        }
        return sum<10?sum:solve(sum);
    }
    return solve(number);
}
console.log(findDigitalRoot(34758))