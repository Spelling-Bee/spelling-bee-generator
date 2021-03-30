import Generator from "@app/SpellingBeeGenerator";
import Validator from "./app/SpellingBeeValidator";
import HasEnoughWordsGameRule from "./app/Rules/GameRules/HasEnoughWordsGameRule";
import OnlyValidCharactersWordRule from "./app/Rules/WordRules/OnlyValidCharactersWordRule";
import path from "path";
import fs from "fs";
import TextReader from "./library/services/Readers/TextReader";
import TextWriter from "./library/services/Writers/TextWriter";
import JsonWriter from "./library/services/Writers/JsonWriter";
import BasicMode from "@app/Modes/BasicMode";
function code() {
  const letters = ["a", "b"];

  const game = new BasicMode(letters);
  const id = game.createId();

  // THESE LINES ARE SPECIFIC FOR USING A TEXT SYSTEM, USE AN ADAPTER TO GET RID OF IT
  const target = path.join(path.dirname(__dirname), "output", "games");
  const fileName = id + ".txt";
  const filePath = path.join(target, fileName);

  const dictionary = new TextReader("source");
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

const alphabet = Array.from(
  { length: "z".charCodeAt(0) - "a".charCodeAt(0) + 1 },
  (_, i) => String.fromCharCode("a".charCodeAt(0) + i)
);

function createId(letters: string[], pivotLetter: string) {}

/*
function generateGameOfGenerator(letters: string[], index: number) {
  for (let letter of alphabet) {
    letters[index] = letter;
  }

  const validator = new Validator();
  const sb = new Generator(validator);

  const reader = new TextReader(dictionary);
  const writer = new TextWriter(target);

  validator.addGameRule(new HasEnoughWordsGameRule(10));
  validator.addWordRule(new OnlyValidCharactersWordRule(letters));

  sb.generateToBeGuessedWords(reader);
  sb.writeToBeGuessedWords(writer);
}
*/

module.exports = transformWordNet;
