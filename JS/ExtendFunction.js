/*
    Problem Statement -
        Write a simple polyfill for the extends method. Create a simple
        function that will accept the two functions parent and child and extend
        the child function to have all parent properties.
*/

function extend(parent, child) {
  child.prototype.__proto__ = parent.prototype;
  // Object.setPrototypeOf(child.prototype.__proto__, parent.prototype)

  child.__proto__ = parent;
  // Object.setPrototypeOf(child.__proto__, parent)
  child.constructor = child;
}

function Parent() {
  this.name = "abc";
}
Parent.prototype.walk = function () {
  console.log(this.name + ", I am walking!");
};
function Child() {
  this.name = "pqr";
}
Child.prototype.sayHello = function () {
  console.log("hi, I am a student");
};
// function to extend
extend(Parent, Child);
const child = new Child();
child.sayHello();
child.walk();
console.log(child instanceof Parent);
console.log(child instanceof Child);

// 1. child.prototype.__proto__ = parent.prototype
//    ↓
//    This sets up the inheritance chain so that:
//    - Instances of `child` can access methods defined on `parent.prototype`.

// 2. child.__proto__ = parent
//    ↓
//    This makes the `child` constructor itself inherit static methods from `parent`.

// 3. child.prototype.constructor = child
//    ↓
//    This ensures the `constructor` property on `child.prototype` correctly points back to `child`,
//    instead of `parent`, after the prototype chain was changed in step 1.
