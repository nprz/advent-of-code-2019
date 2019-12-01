import input from "./input";

function calculateFuelForFuel(moduleFuel) {
  let nextValue = Math.floor(moduleFuel / 3) - 2;

  if (nextValue > 0) {
    return nextValue + calculateFuelForFuel(nextValue);
  } else {
    return 0;
  }
}

function calculateModuleFuel(modules) {
  let totalFuel = 0;

  modules.forEach(module => {
    const fuelWeight = Math.floor(module / 3) - 2;
    // remove `+ calculateFuelForFuel(fuelWeight);` for solution to question 1
    totalFuel += fuelWeight + calculateFuelForFuel(fuelWeight);
  });

  return totalFuel;
}

const moduleFuel = calculateModuleFuel(input);
console.log({ moduleFuel });
