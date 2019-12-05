// 138307-654504

const potentialCodes = [];
for (let i = 138307; i <= 654504; i++) {
  const current = i.toString();
  const currentSplit = current.split("");

  const potential = currentSplit.every((num, index) => {
    return index < currentSplit.length - 1
      ? num <= currentSplit[index + 1]
      : true;
  });

  if (potential) {
    potentialCodes.push(currentSplit);
  }
}

const codesWithDuplicates = [];

potentialCodes.forEach(code => {
  const hasDupe = code.some((num, index) => {
    return index < code.length - 1 ? num === code[index + 1] : false;
  });

  if (hasDupe) {
    codesWithDuplicates.push(code.join(""));
  }
});

console.log(codesWithDuplicates);
