import fs from "fs";
import SpellingBee from "../src/SpellingBee";
import Validator from "../src/Validator";
import ReadTextFile from "../src/ReadTextFile";
import WriteTextFile from "../src/WriteTextFile";
import path from "path";
import OnlyValidCharacters from "../src/Rules/WordRules/OnlyValidCharacters";
import HasEnoughWords from "../src/Rules/GameRules/HasEnoughWords";

describe("SpellingBee", () => {
  const dictionarySource = path.join(__dirname, "stubs", "sample.txt");
  const letters = ["a", "c", "r"];
  const id = "acdr";

  const root = path.dirname(__dirname);
  const target = path.join(root, "output");
  const fileName = id + ".txt";
  const filePath = path.join(target, fileName);

  let validator: Validator;
  let dictionary: ReadTextFile;
  let output: WriteTextFile;

  beforeEach(() => {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target);
    }
    validator = new Validator();
    dictionary = new ReadTextFile(dictionarySource);
    output = new WriteTextFile(filePath);
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
    spellingBee.generateToBeGuessedWords(dictionary);
    expect(spellingBee.getToBeGuessedWords()).toEqual([
      "ar",
      "car",
      "card",
      "cd",
    ]);

    addWordRules();
    spellingBee.generateToBeGuessedWords(dictionary);
    expect(spellingBee.getToBeGuessedWords()).toEqual(["ar", "car"]);
  });

  it("can save the toBeGuessedWords to a textFile", () => {
    const spellingBee = new SpellingBee(validator);
    spellingBee.generateToBeGuessedWords(dictionary);
    expect(spellingBee.getToBeGuessedWords()).toEqual([
      "ar",
      "car",
      "card",
      "cd",
    ]);

    expect(fs.existsSync(filePath)).toBeFalsy();
    spellingBee.writeToBeGuessedWords(output);
    expect(fs.existsSync(filePath)).toBeTruthy();

    const reader = new ReadTextFile(filePath);
    expect(reader.readWord()).toBe("ar");
    expect(reader.readWord()).toBe("car");
    expect(reader.readWord()).toBe("card");
    expect(reader.readWord()).toBe("cd");
    expect(reader.readWord()).toBe(null);
  });

  it("will not save the toBeGuessedWords to a textFile if it does not pass the rules", () => {
    const spellingBee = new SpellingBee(validator);
    addGameRules();
    addWordRules();
    spellingBee.generateToBeGuessedWords(dictionary);
    expect(spellingBee.getToBeGuessedWords()).toEqual(["ar", "car"]);

    expect(fs.existsSync(filePath)).toBeFalsy();
    spellingBee.writeToBeGuessedWords(output);
    expect(fs.existsSync(filePath)).toBeFalsy();
  });
});
