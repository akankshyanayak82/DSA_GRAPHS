//Que - 1 Breadth First Traversal for a Graph ========================================
// define the graph as an adjacency list
const graph = {
    0: [2, 3, 1],
    1: [0, 4, 5],
    2: [0],
    3: [0],
    4: [1],
    5: [1],
  };
  
  // breadth-first traversal function
  function breadthFirstTraversal(graph, start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);
  
    while (queue.length > 0) {
      const current = queue.shift();
      document.write(current + " ");
  
      for (const neighbor of graph[current]) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          visited.add(neighbor);
        }
      }
    }
  }
  
  // test the function
  document.write("Breadth First Traversal: ");
  breadthFirstTraversal(graph, 0);

  //Que - 2 Depth First Traversal for a Graph ========================================

  const airports = 'PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM'.split(' ');

const routes = [    ['PHX', 'LAX'],
    ['PHX', 'JFK'],
    ['JFK', 'OKC'],
    ['JFK', 'HEL'],
    ['JFK', 'LOS'],
    ['MEX', 'LAX'],
    ['MEX', 'BKK'],
    ['MEX', 'LIM'],
    ['MEX', 'EZE'],
    ['LIM', 'BKK'],
];

// The graph
const adjacencyList = new Map();

// Add node
function addNode(airport) {
    adjacencyList.set(airport, []);
}

// Add edge, undirected
function addEdge(origin, destination) {
    adjacencyList.get(origin).push(destination);
    adjacencyList.get(destination).push(origin);
}

// Create the Graph
airports.forEach(addNode);
routes.forEach(route => addEdge(...route))

// Depth First Traversal
function dft(start, visited = new Set()) {

    console.log(start);
    visited.add(start);

    const destinations = adjacencyList.get(start);

    for (const destination of destinations) {
        if (!visited.has(destination)) {
            dft(destination, visited);
        }
    }
}

dft('PHX');


//Q3-Count the number of nodes at given level in a tree using BFS


class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  // Function to count the number of nodes at a given level using BFS
  function countNodesAtLevel(root, level) {
    if (!root) {
      return 0;
    }
  
    let queue = [root];
    let currentLevel = 0;
    let count = 0;
  
    while (queue.length > 0) {
      const size = queue.length;
  
      for (let i = 0; i < size; i++) {
        const node = queue.shift();
  
        if (currentLevel === level) {
          count++;
        }
  
        if (node.left) {
          queue.push(node.left);
        }
  
        if (node.right) {
          queue.push(node.right);
        }
      }
  
      currentLevel++;
  
      if (currentLevel > level) {
        break;
      }
    }
  
    return count;
  }
  
  // Example usage
  const root = new Node(1);
  root.left = new Node(2);
  root.right = new Node(3);
  root.left.left = new Node(4);
  root.left.right = new Node(5);
  root.right.left = new Node(6);
  root.right.right = new Node(7);
  
  console.log(countNodesAtLevel(root, 2)); // Output: 4 (nodes at level 2: 4, 5, 6, 7)

  //Q 4- Count number of trees in a forest

  class Node1 {
    constructor(data) {
      this.data = data;
      this.children = [];
    }
  }
  
  // Function to count the number of trees in a forest using DFS
  function countTreesInForest(forest) {
    if (!forest || forest.length === 0) {
      return 0;
    }
  
    let count = 0;
    let visited = new Set();
  
    for (let i = 0; i < forest.length; i++) {
      const root = forest[i];
  
      if (!visited.has(root)) {
        count++;
        dfs(root, visited);
      }
    }
  
    return count;
  }
  
  function dfs(node, visited) {
    visited.add(node);
  
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
  
      if (!visited.has(child)) {
        dfs(child, visited);
      }
    }
  }
  
  // Example usage
  const node1 = new Node1(1);
  const node2 = new Node1(2);
  const node3 = new Node1(3);
  const node4 = new Node1(4);
  const node5 = new Node1(5);
  
  node1.children.push(node2, node3);
  node4.children.push(node5);
  
  const forest = [node1, node4];
  
  console.log(countTreesInForest(forest)); // Output: 2 (two trees: {1,2,3} and {4,5})

// Q 5-  Detect Cycle in a Directed Graph

class Graph {
    constructor(numVertices) {
      this.numVertices = numVertices;
      this.adjList = new Map();
    }
  
    addVertex(v) {
      this.adjList.set(v, []);
    }
  
    addEdge(src, dest) {
      this.adjList.get(src).push(dest);
    }
  
    hasCycle() {
      const visited = new Set();
      const recStack = new Set();
  
      for (const vertex of this.adjList.keys()) {
        if (!visited.has(vertex)) {
          if (this.hasCycleUtil(vertex, visited, recStack)) {
            console.log("The graph has a cycle");
            return true;
          }
        }
      }
  
      console.log("The graph does not have a cycle");
      return false;
    }
  
    hasCycleUtil(vertex, visited, recStack) {
      visited.add(vertex);
      recStack.add(vertex);
  
      for (const neighbour of this.adjList.get(vertex)) {
        if (!visited.has(neighbour) && this.hasCycleUtil(neighbour, visited, recStack)) {
          return true;
        } else if (recStack.has(neighbour)) {
          return true;
        }
      }
  
      recStack.delete(vertex);
      return false;
    }
  }
  
  // Example usage
  const graph1 = new Graph(4);
  
  graph1.addVertex(0);
  graph1.addVertex(1);
  graph1.addVertex(2);
  graph1.addVertex(3);
  
  graph1.addEdge(0, 1);
  graph1.addEdge(0, 2);
  graph1.addEdge(1, 2);
  graph1.addEdge(2, 0);
  graph1.addEdge(2, 3);
  graph1.addEdge(3, 3);
  
  graph1.hasCycle(); // Output: The graph has a cycle
  
  
  
  //Optional:

  //Implement n-Queen’s Problem

  function solveNQueens(n) {
    // create empty chess board
    const board = new Array(n).fill(null).map(() => new Array(n).fill('.'));
  
    // keep track of solutions
    const solutions = [];
  
    // recursive helper function to find solutions
    function solve(row) {
      // base case: all queens are placed
      if (row === n) {
        // add solution to list of solutions
        solutions.push(board.map(row => row.join('')));
        return;
      }
  
      // try placing queen in each column of current row
      for (let col = 0; col < n; col++) {
        // check if queen can be placed in this column
        if (isValidMove(row, col)) {
          // place queen in this column
          board[row][col] = 'Q';
          // recurse to next row
          solve(row + 1);
          // backtrack by removing queen from this column
          board[row][col] = '.';
        }
      }
    }
  
    // helper function to check if a queen can be placed at row, col
    function isValidMove(row, col) {
      // check same column
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 'Q') {
          return false;
        }
      }
  
      // check upper-left diagonal
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 'Q') {
          return false;
        }
      }
  
      // check upper-right diagonal
      for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 'Q') {
          return false;
        }
      }
  
      // queen can be placed at row, col
      return true;
    }
  
    // start recursive search from first row
    solve(0);
  
    // return solutions
    return solutions;
  }
  
  // example usage:
  console.log(solveNQueens(4)); // prints [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
  
  