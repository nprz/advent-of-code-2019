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
    .map((code, i, a) => a[a.length - 1 - i]);
}

console.log(getOpcode(2));
console.log(getModes(1002));
// export default function intCode(input) {
//   const opcode3Input = 1;

//   // this is not updating by four every code.
//   for (let i = 0; i < input.length; i += 4) {
//     if (input[i] === 1) {
//       // needs to be in immediate mode too
//       const operand1 = input[i + 1];
//       const operand2 = input[i + 2];
//       const address = input[i + 3];
//       input[address] = input[operand1] + input[operand2];
//     } else if (input[i] === 2) {
//       // needs to be in immediate mode too
//       const operand1 = input[i + 1];
//       const operand2 = input[i + 2];
//       const address = input[i + 3];
//       input[address] = input[operand1] * input[operand2];
//     } else if (input[i] === 3) {

//     } else if (input[i] === 4) {

//     } else if (input[i] === 99) {
//       break;
//     }
//   }

//   return input[0];
// }
