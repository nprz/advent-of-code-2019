import input from "./input";

function findRoot() {
  let currentRoot = {
    root: input[0],
    index: 0
  };

  let index = 0;

  while (index < input.length) {
    if (currentRoot.root.parent === input[index].child) {
      currentRoot.root = input[index];
      currentRoot.index = index;
      index = 0;
    } else {
      index++;
    }
  }
  return currentRoot;
}

class PlanetNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

function addOrbit(parentNode, list) {
  // create list of ALL children here
  const nodeChildren = [];
  list.forEach((orbit, index) => {
    if (orbit.parent === parentNode.value) {
      nodeChildren.push({
        node: orbit,
        index
      });
    }
  });

  nodeChildren.forEach((child, i) => {
    const { node, index } = child;

    parentNode.children.push(new PlanetNode(node.child));

    addOrbit(parentNode.children[i], list);
  });
}

function createOrbitGraph() {
  let orbitPairs = [...input];

  // create root
  const { root, index } = findRoot();
  const graph = new PlanetNode(root.parent);
  graph.children.push(new PlanetNode(root.child));

  // recursively add elements
  addOrbit(graph.children[0], orbitPairs);
  return graph;
}

function traverseGraph(parentNode, currentLevel, orbitTotal) {
  const childrenCount = parentNode.children.length;

  if (!childrenCount) {
    return currentLevel;
  }

  for (let i = 0; i < childrenCount; i++) {
    orbitTotal.push(
      traverseGraph(parentNode.children[i], currentLevel + 1, orbitTotal)
    );
  }
  return currentLevel;
}

const orbitGraph = createOrbitGraph();
const orbitTotal = [];
traverseGraph(orbitGraph, 0, orbitTotal);
const total = orbitTotal.reduce((acc, cur) => acc + cur);

export default orbitGraph;
/* 
  B - 1
  G - 2
  H - 3
  C - 2
  D - 3
  I - 4
  E - 4
  J - 5
  K - 6
  L - 7
  F - 5
/*

/*
Graph Data Structure

{
  value: COM
  child: [{ value: B, child: [{ value: G, child: [...] }, { value: C, child: [...] }] }, ]
}
*/
