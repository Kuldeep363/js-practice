/*
    Problem Statement -
        Create a function that accepts multiple functions as an argument and a
        value and run this value through each function and return the final
        output.
*/

const val = { salary: 10000 };

const getSalary = (person) => person.salary;
const addBonus = (netSalary) => netSalary + 1000;
const deductTax = (grossSalary) => grossSalary - grossSalary * 0.3;
console.log(pipe(getSalary, addBonus, deductTax)(val));

function pipe(...funcs) {
  return (val) => {
    return funcs.reduce((prev, curr) => {
      return curr(prev);
    }, val);
  };
}
