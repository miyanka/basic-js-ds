const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = data instanceof Node ? data : new Node(data);

    if (!this.root()) {
      this.rootNode = newNode;
    } else {
      const parentNode = findParentNode(this.root());
      if (parentNode.data > newNode.data) {
        parentNode.left = newNode;
      } else {
        parentNode.right = newNode;
      }
    }

    function findParentNode(node) {
      if (node.data > newNode.data) {
        if (!node.left) return node;
        return findParentNode(node.left);
      } else {
        if (!node.right) return node;
        return findParentNode(node.right);
      }
    }
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  find(data) {
    return this.findExactNode(data, this.root()).dataNode;
  }

  findExactNode(data, currentNode, prevNode = null) {
    if (!currentNode || currentNode.data === data) {
      return { prevNode, dataNode: currentNode };
    }

    prevNode = currentNode;
    if (currentNode.data > data) {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }
    return this.findExactNode(data, currentNode, prevNode);
  }

  remove(data) {
    const { prevNode, dataNode } = this.findExactNode(data, this.root());

    if (!prevNode) {
      this.rootNode = dataNode.left;
    } else {
      if (prevNode.left === dataNode) {
        prevNode.left = dataNode.left;
      } else {
        prevNode.right = dataNode.left;
      }
    }
    this.add(dataNode.right);
  }

  min() {
    let currentNode = this.root();
    if (!currentNode) return null;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    let currentNode = this.root();
    if (!currentNode) return null;

    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
