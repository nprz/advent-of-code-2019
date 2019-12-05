const fs = require("fs");

let input = fs.readFileSync(`${__dirname}/problem2input.txt`, "utf8");

input = input.split(",");
const possibleCodes = [];

input.forEach(code => {
  const current = code.toString();
  const currentSplit = current.split("");
  let isDouble;
  // console.log(code);
  for (let i = 0; i < current.length - 1; i++) {
    const doublePresent = currentSplit[i] === currentSplit[i + 1];
    const leftIsDifferent =
      i === 0 ? true : currentSplit[i - 1] !== currentSplit[i];
    const rightIsDifferent =
      i === current.length - 2 ? true : currentSplit[i + 2] !== current[i + 1];

    isDouble = doublePresent && leftIsDifferent && rightIsDifferent;

    if (isDouble) {
      possibleCodes.push(code);
      break;
    }
  }
});

console.log(possibleCodes.length);
