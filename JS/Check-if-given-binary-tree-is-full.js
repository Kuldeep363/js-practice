/*
    Problem Statement -
        Given a binary tree, check whether it is a full binary tree or not.
        A full B-tree is defined as a binary tree in which all nodes have either
        zero or two child nodes.
        Alternatively we can say there is no node in a full B-tree, which has
        only one child node.
*/

function checkTree(root) {
  if (root === null) return 1;
  let left = root.left;
  let right = root.right;
  return checkTree(left) ^ checkTree(right);
}
function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

let tree = new Node(10);
tree.left = new Node(20);
tree.right = new Node(30);
tree.left.right = new Node(40);
tree.left.left = new Node(50);
console.log(!!checkTree(tree));
