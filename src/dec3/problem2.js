import input from "./input";
import crossingPoints from "./input2";

const wire1 = input[0];
const wire2 = input[1];

function findSteps(point, wire, name) {
  const { x, y } = point;
  const currentPosition = { x: 0, y: 0 };
  let steps = 0;

  wire.some(directionAndDistance => {
    const { direction, distance } = directionAndDistance;
    const xDirection = direction === "R" ? 1 : direction === "L" ? -1 : 0;
    const yDirection = direction === "U" ? 1 : direction === "D" ? -1 : 0;
    let distanceTraveled = 0;

    while (
      !!(currentPosition.x !== x || currentPosition.y !== y) &&
      distanceTraveled < distance
    ) {
      currentPosition.x += xDirection;
      currentPosition.y += yDirection;

      distanceTraveled++;
      steps++;
    }
    return currentPosition.x === x && currentPosition.y === y;
  });

  return {
    ...point,
    [name]: steps
  };
}

let sortedPoints = crossingPoints
  .map(point => {
    // find steps and attach to point object
    return findSteps(point, wire1, "wire1");
  })
  .map(point2 => findSteps(point2, wire2, "wire2"))
  .map(point3 => point3.wire1 + point3.wire2)
  .sort((a, b) => a - b);
