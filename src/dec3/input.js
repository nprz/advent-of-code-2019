let fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
const splitLine = input.split("\n");
const processedInput = splitLine
  .map(line => {
    return line.split(",");
  })
  .map(wires => {
    return wires.map(wireDirection => {
      return {
        direction: wireDirection.slice(0, 1),
        distance: parseInt(wireDirection.slice(1))
      };
    });
  });
export default processedInput;
