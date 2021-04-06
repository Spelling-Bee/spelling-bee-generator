require("module-alias/register");
// @ts-ignore
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import path from "path";

import BasicMode from "@app/Modes/BasicMode";
import NYTMode from "@app/Modes/NYTMode";

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
  .option("mode", {
    alias: "m",
    describe: "specify the mode",
    default: "basic",
    type: "string",
    choices: ["basic", "nyt"],
  })
  .option("pivot", {
    alias: "p",
    describe: "specify the pivot",
    type: "string",
  })
  .option("minimum", {
    describe: "specify the minimum",
    type: "number",
  })
  .option("points", {
    describe: "specify the points",
    type: "number",
  })
  .demandOption(["letters", "dictionary"]).argv;

const {
  letters,
  bound,
  dictionary,
  target,
  storage,
  mode,
  pivot,
  minimum,
  points,
} = argv;

if (mode === "basic" || (Array.isArray(mode) && mode[0] === "basic")) {
  const game = new BasicMode({
    letters: letters.split(""),
    bound,
    dictionary,
    target,
    storage,
  });
  game.createGame();
}

if (mode === "nyt" || (Array.isArray(mode) && mode[0] === "nyt")) {
  const game = new NYTMode({
    letters: letters.split(""),
    bound,
    dictionary,
    target,
    storage,
    pivot,
    minimum,
    points,
  });
  game.createGame();
}
