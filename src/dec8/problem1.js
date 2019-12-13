import input from "./input";

export const HEIGHT = 6;
export const WIDTH = 25;
export const PIXELS = HEIGHT * WIDTH;
const layers = [];

for (let i = 0; i < input.length; i += PIXELS) {
  layers.push(input.slice(i, i + PIXELS));
}

const zeroCount = layers.map(layer => {
  return layer.reduce((acc, cur) => {
    if (cur === 0) {
      return acc + 1;
    }

    return acc;
  }, 0);
});

const minZeroNum = Math.min(...zeroCount);
const minZeroLayerIndex = zeroCount.findIndex(count => count === minZeroNum);
const minZeroLayer = layers[minZeroLayerIndex];
const oneCount = minZeroLayer.reduce((acc, cur) => {
  if (cur === 1) {
    return acc + 1;
  }

  return acc;
}, 0);
const twoCount = minZeroLayer.reduce((acc, cur) => {
  if (cur === 2) {
    return acc + 1;
  }

  return acc;
}, 0);

export default layers;
