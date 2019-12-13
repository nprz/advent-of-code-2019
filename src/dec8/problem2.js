const fs = require("fs");
import input, { HEIGHT, WIDTH, PIXELS } from "./problem1";

let stackedPixels = [];
let formattedImage = [];

for (let i = 0; i < PIXELS; i++) {
  stackedPixels[i] = input.map(layer => layer[i]);
}

const decodedImage = stackedPixels.map(pixelLayer => {
  return pixelLayer.find(pixel => pixel !== 2);
});

for (let i = 0; i < PIXELS; i += WIDTH) {
  formattedImage.push(decodedImage.slice(i, i + WIDTH));
}

const test = formattedImage.map(row =>
  row.map(pixel => (pixel === 1 ? 1 : " "))
);
test.forEach(row => row.push(`\n`));
fs.writeFileSync(`${__dirname}/output.txt`, test, err => {
  if (err) throw err;
});
