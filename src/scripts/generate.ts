require("module-alias/register");
// @ts-ignore
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import path from "path";

import BasicMode from "@app/Modes/BasicMode";

const argv = yargs(hideBin(process.argv))
  .option("letters", {
    alias: "l",
    describe: "specify the letters for the game",
    type: "string",
  })
  .option("dictionary", {
    alias: "d",
    describe: "specify the dictionary for the game",
    type: "string",
  })
  .option("bound", {
    alias: "b",
    describe: "specify the number of words to be considered a valid game",
    default: 1,
    type: "number",
  })
  .option("target", {
    alias: "t",
    describe: "specify the target",
    default: path.join("output", "games"),
    type: "string",
  })
  .option("storage", {
    alias: "s",
    describe: "specify the storage",
    default: "txt",
    type: "string",
    choices: ["json", "txt", "mysql"],
  })
  .demandOption(["letters", "dictionary"]).argv;

const { letters, bound, dictionary, target, storage } = argv;

const game = new BasicMode({
  letters: letters.split(""),
  bound,
  dictionary,
  target,
  storage,
});

game.createGame();
