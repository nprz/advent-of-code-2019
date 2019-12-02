import input from "./input";

// restore 1202 program alarm to original state;
const updatedInput = [...input];
updatedInput[1] = 12;
updatedInput[2] = 2;

export default function intCode(input) {
  for (let i = 0; i < input.length; i += 4) {
    if (input[i] === 1) {
      const operand1 = input[i + 1];
      const operand2 = input[i + 2];
      const address = input[i + 3];
      input[address] = input[operand1] + input[operand2];
    } else if (input[i] === 2) {
      const operand1 = input[i + 1];
      const operand2 = input[i + 2];
      const address = input[i + 3];
      input[address] = input[operand1] * input[operand2];
    } else if (input[i] === 99) {
      break;
    }
  }

  return input[0];
}
