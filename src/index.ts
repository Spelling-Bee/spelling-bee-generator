import SpellingBee from "./SpellingBee";
import Validator from "./Validator";
import HasEnoughWords from "./Rules/GameRules/HasEnoughWords";
import OnlyValidCharacters from "./Rules/WordRules/OnlyValidCharacters";
import path from "path";
import fs from "fs";
import TextReader from "./Readers/TextReader";
import TextWriter from "./Writers/TextWriter";
import JsonWriter from "./Writers/JsonWriter";
function code() {
  const letters = ["a", "b"];
  const validator = new Validator();
  validator.addGameRule(new HasEnoughWords(2));
  validator.addWordRule(new OnlyValidCharacters(letters));

  const spellingBee = new SpellingBee(validator);

  const id = "ab";

  // THESE LINES ARE SPECIFIC FOR USING A TEXT SYSTEM, USE AN ADAPTER TO GET RID OF IT
  const target = path.join(path.dirname(__dirname), "output", "games");
  const fileName = id + ".txt";
  const filePath = path.join(target, fileName);

  const dictionary = new TextReader("source");
  const game = new TextWriter(filePath);

  spellingBee.generateToBeGuessedWords(dictionary);
  spellingBee.writeToBeGuessedWords(game);
}

function transformWordNet() {
  const source = path.join(path.dirname(__dirname), "dictionaries", "en.txt");
  const target = path.join(path.dirname(source), "en.json");
  const reader = new TextReader(source);
  const writer = new JsonWriter(target);
  let line: string;
  const words: string[] = [];
  while ((line = reader.readLine())) {
    const regExp = /(?<=\[).+?(?=\])/g;
    const word = line.match(regExp)[1];
    if (!words.includes(word)) {
      words.push(word);
    }
  }
  words.forEach(writer.writeLine.bind(writer));
}

// function generateJSON() {}

module.exports = transformWordNet;
