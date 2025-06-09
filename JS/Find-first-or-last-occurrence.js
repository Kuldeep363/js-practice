/*
    Problem Statement -
        Given a sorted array with duplicate values we have to create two
        different algorithms which will find the first and last occurrence of the
        given element.
*/

function firstOccurrence(arr, target) {
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    let mid = Math.floor((right + left) / 2);
    if (arr[[mid]] === target) right = mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return left;
}
function lastOccurrence(arr, target) {
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    let mid = Math.ceil((right + left) / 2);
    if (arr[[mid]] === target) left = mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return left;
}

const arr = [1, 2, 3, 4, 5, 5, 6, 6, 7, 8, 9, 10];
console.log(firstOccurrence(arr, 5));
console.log(firstOccurrence(arr, 6));

console.log(lastOccurrence(arr, 5));
console.log(lastOccurrence(arr, 6));