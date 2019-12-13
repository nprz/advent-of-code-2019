let fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
export default input.split("").map(string => parseInt(string));
