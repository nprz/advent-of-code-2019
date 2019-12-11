import input from "./input";

function findPath(begin) {
  const beginIndex = input.findIndex(orbit => orbit.child === begin);
  const startNode = input[beginIndex];
  const path = [startNode.parent];

  while (path[path.length - 1] !== "COM") {
    const found = input.find(orbit => orbit.child === path[path.length - 1]);
    path.push(found.parent);
  }

  return path;
}

const path1 = findPath("YOU");
const path2 = findPath("SAN");

const minSharedElem = path1.find(item => path2.includes(item));
const path1MinIndex = path1.findIndex(elem => minSharedElem === elem);
const path2MinIndex = path2.findIndex(elem => minSharedElem === elem);
console.log(path1MinIndex + path2MinIndex);
