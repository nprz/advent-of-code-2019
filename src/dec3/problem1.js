let fs = require("fs");

function makeCoordinates() {}

let processedInput;
fs.readFile(`${__dirname}/input.txt`, "utf8", function(err, text) {
  if (err) {
    throw err;
  }

  let textByLine = text.split("\n");
  processedInput = textByLine.map(line => {
    return line.split(",");
  });
});
