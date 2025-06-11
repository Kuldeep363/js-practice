/*
    Problem Statement -
        Create a function that accepts multiple functions as an argument and a
        value and run this value through each function and return the final
        output.
*/

const double = x => x * 2;
const square = x => x * x;

const composed = compose(square, double); // square(double(x))
console.log(composed(3)); // (3 * 2)^2 = 36


function compose(...funcs) {
  return (val) => {
    return funcs.reduceRight((prev, curr) => {
      return curr(prev);
    }, val);
  };
}
