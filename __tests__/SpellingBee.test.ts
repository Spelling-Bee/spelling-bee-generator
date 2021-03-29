import fs from "fs";
import SpellingBee from "../src/SpellingBee";
import Validator from "../src/Validator";
import TextReader from "../src/Readers/TextReader";
import TextWriter from "../src/Writers/TextWriter";
import path from "path";
import OnlyValidCharacters from "../src/Rules/WordRules/OnlyValidCharacters";
import HasEnoughWords from "../src/Rules/GameRules/HasEnoughWords";

describe("SpellingBee", () => {
  const dictionary = path.join(__dirname, "stubs", "sample.txt");
  const letters = ["a", "c", "r"];
  const id = "acdr";

  const root = path.dirname(__dirname);
  const target = path.join(root, "output");
  const fileName = id + ".txt";
  const filePath = path.join(target, fileName);

  let validator: Validator;
  let reader: TextReader;
  let writer: TextWriter;

  beforeEach(() => {
    /*
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target);
    }
    */
    validator = new Validator();
    reader = new TextReader(dictionary);
    writer = new TextWriter(filePath);
  });

  afterEach(() => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      fs.rmdirSync(target);
    }
  });

  function addWordRules() {
    validator.addWordRule(new OnlyValidCharacters(letters));
  }

  function addGameRules() {
    validator.addGameRule(new HasEnoughWords(3));
  }

  it("can be initiated with a validator, a dictionary, and a target for the toBeGuessedWords", () => {
    const spellingBee = new SpellingBee(validator);
    expect(spellingBee).toBeInstanceOf(SpellingBee);
  });

  it("can generate toBeGuessedWords from the dictionary", () => {
    const spellingBee = new SpellingBee(validator);
    spellingBee.generateToBeGuessedWords(reader);
    expect(spellingBee.getToBeGuessedWords()).toEqual([
      "ar",
      "car",
      "card",
      "cd",
    ]);

    addWordRules();
    spellingBee.generateToBeGuessedWords(reader);
    expect(spellingBee.getToBeGuessedWords()).toEqual(["ar", "car"]);
  });

  it("can save the toBeGuessedWords to a textFile", () => {
    const spellingBee = new SpellingBee(validator);
    spellingBee.generateToBeGuessedWords(reader);
    expect(spellingBee.getToBeGuessedWords()).toEqual([
      "ar",
      "car",
      "card",
      "cd",
    ]);

    expect(fs.existsSync(filePath)).toBeFalsy();
    spellingBee.writeToBeGuessedWords(writer);
    expect(fs.existsSync(filePath)).toBeTruthy();

    const gameReader = new TextReader(filePath);
    expect(gameReader.readLine()).toBe("ar");
    expect(gameReader.readLine()).toBe("car");
    expect(gameReader.readLine()).toBe("card");
    expect(gameReader.readLine()).toBe("cd");
    expect(gameReader.readLine()).toBe(null);
  });

  it("will not save the toBeGuessedWords to a textFile if it does not pass the rules", () => {
    const spellingBee = new SpellingBee(validator);
    addGameRules();
    addWordRules();
    spellingBee.generateToBeGuessedWords(reader);
    expect(spellingBee.getToBeGuessedWords()).toEqual(["ar", "car"]);

    expect(fs.existsSync(filePath)).toBeFalsy();
    spellingBee.writeToBeGuessedWords(writer);
    expect(fs.existsSync(filePath)).toBeFalsy();
  });
});
