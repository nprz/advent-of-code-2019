import input from "./input";

function increasePointer(opcode) {
  const increaseFour = [1, 2, 7, 8];
  const increaseTwo = [3, 4, 9];
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

function determineOperandValue(mode, operand, input, base) {
  if (mode === 0 || mode == undefined) {
    // position
    return input[operand] || 0;
  } else if (mode === 1) {
    // immediate
    return operand;
  } else if (mode === 2) {
    // relative
    return input[operand + base] || 0;
  }
}

function getAddress(operand, mode, base) {
  if (mode === 2) {
    return operand + base;
  }

  return operand;
}

export default function intCode(input) {
  const opcode3Input = 2;
  let pointer = 0;
  let relativeBase = 0;
  let pointerJump;

  while (input[pointer] !== 99) {
    const [opcode, pointerPosition] = getOpcode(input[pointer]);
    const modes = getModes(input[pointer]);
    if (opcode === 1) {
      const operand1 = input[pointer + 1];
      const leftInput = determineOperandValue(
        modes[0],
        operand1,
        input,
        relativeBase
      );
      const operand2 = input[pointer + 2];
      const rightInput = determineOperandValue(
        modes[1],
        operand2,
        input,
        relativeBase
      );
      const address = getAddress(input[pointer + 3], modes[2], relativeBase);
      input[address] = leftInput + rightInput;
    } else if (opcode === 2) {
      const operand1 = input[pointer + 1];
      const leftInput = determineOperandValue(
        modes[0],
        operand1,
        input,
        relativeBase
      );
      const operand2 = input[pointer + 2];
      const rightInput = determineOperandValue(
        modes[1],
        operand2,
        input,
        relativeBase
      );
      const address = getAddress(input[pointer + 3], modes[2], relativeBase);
      input[address] = leftInput * rightInput;
    } else if (opcode === 3) {
      const operand = input[pointer + 1];
      const address = getAddress(operand, modes[0], relativeBase);
      input[address] = opcode3Input;
    } else if (opcode === 4) {
      const operand = input[pointer + 1];
      const output = determineOperandValue(
        modes[0],
        operand,
        input,
        relativeBase
      );

      console.log(output);
    } else if (opcode === 5) {
      const immediate = input[pointer + 1];
      const operand = determineOperandValue(
        modes[0],
        immediate,
        input,
        relativeBase
      );
      const immediateTwo = input[pointer + 2];
      const operandTwo = determineOperandValue(
        modes[1],
        immediateTwo,
        input,
        relativeBase
      );
      if (operand !== 0) {
        pointerJump = operandTwo;
      }
    } else if (opcode === 6) {
      const immediate = input[pointer + 1];
      const operand = determineOperandValue(
        modes[0],
        immediate,
        input,
        relativeBase
      );
      const immediateTwo = input[pointer + 2];
      const operandTwo = determineOperandValue(
        modes[1],
        immediateTwo,
        input,
        relativeBase
      );
      if (operand === 0) {
        pointerJump = operandTwo;
      }
    } else if (opcode === 7) {
      const immediateLeft = input[pointer + 1];
      const leftOperand = determineOperandValue(
        modes[0],
        immediateLeft,
        input,
        relativeBase
      );
      const immediateRight = input[pointer + 2];
      const rightOperand = determineOperandValue(
        modes[1],
        immediateRight,
        input,
        relativeBase
      );
      const address = getAddress(input[pointer + 3], modes[2], relativeBase);
      if (leftOperand < rightOperand) {
        input[address] = 1;
      } else {
        input[address] = 0;
      }
    } else if (opcode === 8) {
      const immediateLeft = input[pointer + 1];
      const leftOperand = determineOperandValue(
        modes[0],
        immediateLeft,
        input,
        relativeBase
      );
      const immediateRight = input[pointer + 2];
      const rightOperand = determineOperandValue(
        modes[1],
        immediateRight,
        input,
        relativeBase
      );
      const address = getAddress(input[pointer + 3], modes[2], relativeBase);

      if (leftOperand === rightOperand) {
        input[address] = 1;
      } else {
        input[address] = 0;
      }
    } else if (opcode === 9) {
      const immediate = input[pointer + 1];
      const operand = determineOperandValue(
        modes[0],
        immediate,
        input,
        relativeBase
      );
      relativeBase += operand;
    }
    //console.log({ pointer });
    if (pointerJump !== undefined) {
      pointer = pointerJump;
      pointerJump = undefined;
    } else {
      pointer += pointerPosition;
    }
  }
}

intCode(input);
