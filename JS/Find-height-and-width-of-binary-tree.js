/*
    Problem Statement -
        Given a binary tree, write two programs to find each height and width
        of it.
        Height of a binary tree is the maximum depth of the tree.
        The width of a binary tree is the max number of nodes present at the given
        level.
*/

function height(root) {
  let treeHeight = 0;
  function calculateHeight(node, currHeight) {
    if (node === null) {
      treeHeight = Math.max(treeHeight, currHeight);
      return;
    }
    calculateHeight(node.left, currHeight + 1);
    calculateHeight(node.right, currHeight + 1);
  }
  calculateHeight(root, 0);
  return treeHeight;
}
// BFS way
function width(root) {
  function findWidth(node, level) {
    if (node === null) return 0;
    if (level === 1) return 1;
    if (level > 1)
      return findWidth(node.left, level - 1) + findWidth(node.right, level - 1);
    return 0;
  }
  let treeWidth = 0;
  let treeHeight = height(root);
  for (let i = 1; i <= treeHeight; i++) {
    treeWidth = Math.max(treeWidth, findWidth(root, i));
  }
  return treeWidth;
}

// DFS way, using extra space
function findWidth(root) {
  const widthMap = new Map();
  function treeTrav(node, level) {
    if (node === null) return;
    widthMap.set(level, (widthMap.get(level) || 0) + 1);
    treeTrav(node.left, level + 1);
    treeTrav(node.right, level + 1);
  }
  treeTrav(root, 1);
  return Math.max(...widthMap.values());
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
tree.right.right = new Node(70);
tree.right.left = new Node(60);
console.log(findWidth(tree));
