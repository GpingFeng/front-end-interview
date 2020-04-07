function TreeNode (val) {
  this.val = val
  this.left = null
  this.right = null
}

function visit (root) {
  if (root) {
    visit(root.right)
    visit(root.left)
    console.log(root.val)
  }
}