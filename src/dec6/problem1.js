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

function deleteElement(index = null, list) {
  delete list[index];
  return list.filter(elem => typeof elem !== undefined);
}

function addOrbit(node, list) {
  // create list of ALL children here
  const nodeChildren = list.filter((orbit, index) => {
    // return object with index attached
    orbit.parent === node.value;
  });

  nodeChildren.forEach(child => {
    node.child.push();
  });
  // if (index !== -1) {
  //   node.children.push(list[index]);
  //   list = deleteElement(index, list);

  //   // need to repeat to make parent
  //   // contains no more children
  // }
}

function createOrbitGraph() {
  let orbitPairs = [...input];

  // create root
  const { root, index } = findRoot();
  const graph = new PlanetNode(root.parent);
  graph.children.push(new PlanetNode(root.child));

  // remove node from list of available nodes
  orbitPairs = deleteElement(index, orbitPairs);
  console.log(graph);
  //addOrbit();
}

createOrbitGraph();

/*
{
  value: COM
  child: [{ value: B, child: [{ value: G, child: [...] }, { value: C, child: [...] }] }, ]
}
*/
