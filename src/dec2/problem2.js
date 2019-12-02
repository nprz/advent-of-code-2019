import input from "./input";
import intCode from "./index";

// BRUTE FORCE!!
function bruteForce(input) {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const updatedInput = [...input];
      updatedInput[1] = noun;
      updatedInput[2] = verb;
      if (intCode(updatedInput) === 19690720) {
        return { noun, verb };
      }
    }
  }
}

console.log(bruteForce(input));
