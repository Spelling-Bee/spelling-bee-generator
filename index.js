const { hideBin } = require("yargs/helpers");
const yargs = require("yargs/yargs");
const argv = yargs(hideBin(process.argv))
  .option("letters", {
    alias: "l",
    describe: "specify the letters for the game",
    type: "array",
  })
  .option("pivotLetter", {
    alias: "p",
    describe: "specify a pivot letter for the game",
    type: "string",
  })
  .option("minimum", {
    alias: "min",
    describe: "specify the number of letters for a valid word",
    type: "number",
  })
  .option("bound", {
    alias: "b",
    describe: "specify the number of words to be considered a valid game",
    default: 1,
    type: "number",
  })
  .demandOption(["letters"]).argv;

console.log(argv);
if (argv.minimum) {
}
if (argv.pivotLetter) {
}
/*
const main = require("./dist/index.js");

main();
*/
