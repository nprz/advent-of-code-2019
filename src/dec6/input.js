let fs = require("fs");

const input = fs.readFileSync(`${__dirname}/testInput.txt`, "utf8");
export default input.split("\n").map(orbit => {
  const planets = orbit.split(")");
  return {
    parent: planets[0],
    child: planets[1]
  };
});
