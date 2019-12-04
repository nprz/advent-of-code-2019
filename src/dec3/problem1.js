import input from "./input";

// map to points
const wire1 = input[0];
const wire2 = input[1];

function createPoints(wire) {
  let points = [{ x: 0, y: 0 }];

  wire.forEach((line, index) => {
    const { distance, direction } = line;
    const linePoints = [];
    // this works but it shouldn't
    let lastPoint = points[points.length - 1];
    const xDirection = direction === "R" ? 1 : direction === "L" ? -1 : 0;
    const yDirection = direction === "U" ? 1 : direction === "D" ? -1 : 0;

    for (let i = 1; i <= distance; i++) {
      const newPoint = {
        x: (lastPoint.x += xDirection),
        y: (lastPoint.y += yDirection)
      };

      lastPoint = newPoint;
      linePoints.push(newPoint);
    }

    points = [...points, ...linePoints];
  });

  return points;
}

const wire1Points = createPoints(wire1);
const wire2Points = createPoints(wire2);

const crossingPoints = wire1Points.filter(point => {
  return wire2Points.some(
    point2 => point2.x === point.x && point2.y === point.y
  );
});
const distances = crossingPoints.map(point => {
  return Math.abs(point.x) + Math.abs(point.y);
});
const sortedDistances = distances.sort((a, b) => a - b);
