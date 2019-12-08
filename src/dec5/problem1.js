import input from "./input";

function getOpcode(num) {
  const numString = num.toString();

  if (numString.length === 1) {
    return num;
  }
  return parseInt(numString.slice(numString.length - 1));
}

function getModes(num) {
  const numString = num.toString();

  if (numString.length === 1) {
    return [];
  }

  return numString
    .slice(0, numString.length - 2)
    .split("")
    .map((code, i, a) => parseInt(a[a.length - 1 - i]));
}

function increasePointer(opcode) {
  if (opcode === 1 || opcode === 2) {
    return 4;
  }

  return 2;
}

export default function intCode(input) {
  const opcode3Input = 1;
  let pointer = 0;

  while (input[pointer] !== 99) {
    const opcode = getOpcode(input[pointer]);
    const modes = getModes(input[pointer]);

    if (opcode === 1) {
      const operand1 = input[pointer + 1];
      const leftInput = modes[0] === 1 ? operand1 : input[operand1];
      const operand2 = input[pointer + 2];
      const rightInput = modes[1] === 1 ? operand2 : input[operand2];
      const address = input[pointer + 3];
      input[address] = leftInput + rightInput;
    } else if (opcode === 2) {
      const operand1 = input[pointer + 1];
      const leftInput = modes[0] === 1 ? operand1 : input[operand1];
      const operand2 = input[pointer + 2];
      const rightInput = modes[1] === 1 ? operand2 : input[operand2];
      const address = input[pointer + 3];
      input[address] = leftInput * rightInput;
    } else if (opcode === 3) {
      const address = input[pointer + 1];
      input[address] = opcode3Input;
    } else if (opcode === 4) {
      const operand = input[pointer + 1];
      const output = modes[0] === 1 ? operand : input[operand];
      console.log(output);
    }

    pointer += increasePointer(opcode);
  }

  return { final: input[0] };
}

// let test = [1101, 100, -1, 4, 0];
intCode(input);
