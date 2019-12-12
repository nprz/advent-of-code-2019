import input from "./input";

// Helpers

// From: https://initjs.org/all-permutations-of-a-set-f1be174c79f8
function getAllPermutations(string) {
  let results = [];

  if (string.length === 1) {
    results.push(string);
    return results;
  }

  for (let i = 0; i < string.length; i++) {
    let firstChar = string[i];
    let charsLeft = string.substring(0, i) + string.substring(i + 1);
    let innerPermutations = getAllPermutations(charsLeft);
    for (let j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

function increasePointer(opcode) {
  const increaseFour = [1, 2, 7, 8];
  const increaseTwo = [3, 4];
  const increaseOther = [5, 6];

  if (increaseFour.some(value => value === opcode)) {
    return 4;
  } else if (increaseTwo.some(value => value === opcode)) {
    return 2;
  } else if (increaseOther.some(value => value === opcode)) {
    return 3;
  }
}

function getOpcode(num) {
  const numString = num.toString();
  let opcode;

  if (numString.length === 1) {
    opcode = num;
  } else {
    opcode = parseInt(numString.slice(numString.length - 1));
  }

  // place logic for next pointer position in here for extra coolness
  return [opcode, increasePointer(opcode)];
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

export default function intCode(input, phaseSetting, inputSignal) {
  let pointer = 0;
  let opcode3Ran = false;
  let pointerJump;

  while (input[pointer] !== 99) {
    const [opcode, pointerPosition] = getOpcode(input[pointer]);
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
      input[address] = opcode3Ran ? inputSignal : phaseSetting;
      opcode3Ran = true;
    } else if (opcode === 4) {
      const operand = input[pointer + 1];
      const output = modes[0] === 1 ? operand : input[operand];
      return output;
    } else if (opcode === 5) {
      const immediate = input[pointer + 1];
      const operand = modes[0] === 1 ? immediate : input[immediate];
      const immediateTwo = input[pointer + 2];
      const operandTwo = modes[1] === 1 ? immediateTwo : input[immediateTwo];
      if (operand !== 0) {
        pointerJump = operandTwo;
      }
    } else if (opcode === 6) {
      const immediate = input[pointer + 1];
      const operand = modes[0] === 1 ? immediate : input[immediate];
      const immediateTwo = input[pointer + 2];
      const operandTwo = modes[1] === 1 ? immediateTwo : input[immediateTwo];

      if (operand === 0) {
        pointerJump = operandTwo;
      }
    } else if (opcode === 7) {
      /* the address, the 3rd parameter, may read in immediate or position mode 
        but that has yet to be implemented. so if it's breaking, that might be why
      */
      const immediateLeft = input[pointer + 1];
      const immediateRight = input[pointer + 2];
      const leftOperand = modes[0] === 1 ? immediateLeft : input[immediateLeft];
      const rightOperand =
        modes[1] === 1 ? immediateRight : input[immediateRight];
      const address = input[pointer + 3];
      if (leftOperand < rightOperand) {
        input[address] = 1;
      } else {
        input[address] = 0;
      }
    } else if (opcode === 8) {
      /* the address, the 3rd parameter, may read in immediate or position mode 
        but that has yet to be implemented. so if it's breaking, that might be why
      */
      const immediateLeft = input[pointer + 1];
      const immediateRight = input[pointer + 2];
      const leftOperand = modes[0] === 1 ? immediateLeft : input[immediateLeft];
      const rightOperand =
        modes[1] === 1 ? immediateRight : input[immediateRight];
      const address = input[pointer + 3];
      if (leftOperand === rightOperand) {
        input[address] = 1;
      } else {
        input[address] = 0;
      }
    }

    if (pointerJump) {
      pointer = pointerJump;
      pointerJump = null;
    } else {
      pointer += pointerPosition;
    }
  }
}

const allPhasePermutations = getAllPermutations("01234").map(perm =>
  perm.split("").map(stringNum => parseInt(stringNum))
);

const thrusterInput = [];
allPhasePermutations.forEach(phaseSettingPerm => {
  const inputSignal = [0];
  phaseSettingPerm.forEach((phaseSetting, index) => {
    //returns input signal for next amp/input
    if (index < phaseSettingPerm.length - 1) {
      inputSignal.push(intCode(input, phaseSetting, inputSignal[index]));
    } else {
      thrusterInput.push(intCode(input, phaseSetting, inputSignal[index]));
    }
  });
});

const sortedInput = thrusterInput.sort((a, b) => b - a);
console.log(sortedInput[0]);
