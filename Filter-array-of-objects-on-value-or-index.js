const arr = [
    { name: "Amir", id: "1" },
    { name: "Samlan", id: "2" },
    { name: "Shahrukh", id: "0" },
];
console.log(filterObject(arr, 0)); // { name: "Amir", id: "1" }
console.log(filterObject(arr, "Amir")); // { name: "Amir", id: "1" }
console.log(filterObject(arr, "0")); // { name: "Shahrukh", id: "0" }

function filterObject(array, filterParam) {
    if (typeof filterParam === "number") return array[filterParam];
    else if (typeof filterParam === "string") {
        for (const obj of array) {
            for (const val of Object.values(obj)) {
                if (val === filterParam) return obj;
            }
        }
    }
}