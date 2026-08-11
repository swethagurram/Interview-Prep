class TreeNode {
    value: any;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(value: any, left = null, right = null) {
      this.value = value;
      this.left = left;
      this.right = right;
    }
}

/**
 * In-Order traversal of binary tree
 * left -> root -> right
 * @param root 
 */
function inOrderTraversal(root: TreeNode | null): number[] {
    let values: number[] = [];
    if(!root) return values;
    return [
        ...inOrderTraversal(root.left),
        root.value,
        ...inOrderTraversal(root.right)
    ];
}

/**
 * Pre-Order traversal of binary tree
 * Root -> left -> right
 * @param root 
 */
function preOrderTraversal(root: TreeNode | null): number[] {
    let values: number[] = [];
    if(!root) return values;
    return [
            root.value,
            ...preOrderTraversal(root.left),
            ...preOrderTraversal(root.right)
        ];
}

/**
 * Post-Order traversal of binary tree
 * left -> right -> root
 * @param root 
 */
function postOrderTraversal(root: TreeNode | null): number[] {
    let values: number[] = [];
    if(!root) return values;
    return [
            ...postOrderTraversal(root.left),
            ...postOrderTraversal(root.right),
            root.value
        ];
}

/**
 * In-Order traversal of binary tree
 * left -> root -> right 
 * @param root 
 */
function inOrderWithoutRecursion(root: TreeNode|null): number[] {
    const result: number[] = [];
    const stack: TreeNode[] = [];
    let curr: TreeNode | null = root;

    while (curr !== null || stack.length > 0) {
        if(curr) {
            // Step 1: if current isn't null, push it and move left
            stack.push(curr);
            curr = curr.left;
        } else {
            // Step 2: if current IS null, pop from stack, record its value, move to its right child
            let tempNode = stack.pop() as TreeNode;
            result.push(tempNode.value);
            curr = tempNode.right;
        }
    }

    return result;
}

/**
 * BFS: level-order traversal using a queue
 * @param root 
 * @returns 
 */
function levelOrder(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    if (!root) return result;

    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const levelSize = queue.length; // ??? why capture this now specifically - to loop through nodes in that level
        const currentLevel: number[] = [];

        for (let i = 0; i < levelSize; i++) {
            // pop from front, record value, push its children
            const tempNode = queue.shift() as TreeNode;
            currentLevel.push(tempNode.value);
            if(tempNode.left) queue.push(tempNode.left);
            if(tempNode.right) queue.push(tempNode.right);
        }

        result.push(currentLevel);
    }

    return result;
}

/**
 * Maximum Depth of Binary Tree (LeetCode #104)
 * @param root 
 */
function maxDepthOfBinaryTree(root: TreeNode|null): number {
    let depth = 0;
    if(!root) return depth;

    let queue: TreeNode[] = [root];
    while(queue.length > 0) {
        let level = queue.length;
        depth++;

        for(let i=0; i<level; i++) {
            let tempNode = queue.shift() as TreeNode;
            if(tempNode.left) queue.push(tempNode.left);
            if(tempNode.right) queue.push(tempNode.right);
        }
    }

    return depth;
}

/**
 * Maximum Depth of Binary Tree (LeetCode #104) - Recursive version
 * @param root 
 */
function maxDepthOfBTRecursive(root: TreeNode|null): number {
    if(!root) return 0;
    return (1 + Math.max(maxDepthOfBTRecursive(root.left), maxDepthOfBTRecursive(root.right)));
}

/**
 * Balanced Binary Tree (#110) — check balance while computing height, 
 * don't do two separate passes
 * @param root 
 * @returns 
 */
function isBalanced(root: TreeNode | null): boolean {
    function height(node: TreeNode | null): number {
        if (!node) return 0;

        const leftHeight = height(node.left);
        const rightHeight = height(node.right);

        // if leftHeight is already -1 (unbalanced found below), what should happen?
        // same question for rightHeight
        // now check: is THIS node balanced? if not, return -1
        // otherwise, return this node's real height

        if(leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1)
            return -1; // not balanced
        return 1 + Math.max(leftHeight, rightHeight);
    }

    return height(root) !== -1;
}

/**
 * Path Sum (LeetCode #112) - if the tree has a root-to-leaf path 
 * such that adding up all the values along that path equals targetSum.
 * @param root 
 * @param targetSum 
 * @returns 
 */
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (!root) return false;

    // is this a true leaf (both children null)?
    // if so, does root.value === targetSum?
    if(!root.left && !root.right)
        return root.value === targetSum;

    // otherwise, recurse into children with an updated remaining target
    let newTarget = targetSum - root.value;
    return hasPathSum(root.left, newTarget) || hasPathSum(root.right, newTarget);
}

/**
 * Path Sum II (#113) — return all root-to-leaf paths that sum to the target, 
 * as a list of lists
 * @param root 
 * @param targetSum 
 * @returns 
 */
function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    const result: number[][] = [];
    const currentPath: number[] = [];

    function dfs(node: TreeNode | null, remaining: number): void {
        if (!node) return;

        currentPath.push(node.value);
        // ... check leaf + remaining, recurse into children ...
        // then: what needs to happen to currentPath before this call returns?
        if(!node.left && !node.right && node.value === remaining)
            result.push([...currentPath]);

        dfs(node.left, remaining - node.value);
        dfs(node.right, remaining - node.value);
        
        currentPath.pop();
    }

    dfs(root, targetSum);
    return result;
}

export default {
    inOrderTraversal,
    preOrderTraversal,
    postOrderTraversal,
    inOrderWithoutRecursion,
    levelOrder,
    maxDepthOfBinaryTree,
    maxDepthOfBTRecursive,
    isBalanced
}