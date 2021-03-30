import fs from "fs";
import SpellingBeeGenerator from "@app/SpellingBeeGenerator";
import SpellingBeeValidator from "@app/SpellingBeeValidator";
import TextReader from "@library/services/Readers/TextReader";
import TextWriter from "@library/services/Writers/TextWriter";
import path from "path";
import OnlyValidCharacters from "@app/Rules/WordRules/OnlyValidCharacters";
import HasEnoughWords from "@app/Rules/GameRules/HasEnoughWords";

describe("SpellingBeeGenerator", () => {
  const dictionary = path.join("__tests__", "stubs", "sample.txt");
  const letters = ["a", "c", "r"];
  const id = "acdr";

  const target = path.join("output");
  const fileName = id + ".txt";
  const filePath = path.join(target, fileName);

  let validator: SpellingBeeValidator;
  let reader: TextReader;
  let writer: TextWriter;

  beforeEach(() => {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target);
    }

    validator = new SpellingBeeValidator();
    reader = new TextReader(dictionary);
    writer = new TextWriter(filePath);
  });

  afterEach(() => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    if (fs.existsSync(target)) {
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
    const generator = new SpellingBeeGenerator(validator);
    expect(generator).toBeInstanceOf(SpellingBeeGenerator);
  });

  it("can read toBeGuessedWords from the dictionary", () => {
    const generator = new SpellingBeeGenerator(validator);

    expect(generator.readToBeGuessedWords(reader)).toEqual([
      "ar",
      "car",
      "card",
      "cd",
    ]);

    addWordRules();
    expect(generator.readToBeGuessedWords(reader)).toEqual(["ar", "car"]);
  });

  it("can write the toBeGuessedWords to a textFile", () => {
    const generator = new SpellingBeeGenerator(validator);
    const toBeGuessedWords = generator.readToBeGuessedWords(reader);
    expect(toBeGuessedWords).toEqual(["ar", "car", "card", "cd"]);

    expect(fs.existsSync(filePath)).toBeFalsy();
    generator.writeToBeGuessedWords(toBeGuessedWords, writer);
    expect(fs.existsSync(filePath)).toBeTruthy();

    const gameReader = new TextReader(filePath);
    expect(gameReader.readLine()).toBe("ar");
    expect(gameReader.readLine()).toBe("car");
    expect(gameReader.readLine()).toBe("card");
    expect(gameReader.readLine()).toBe("cd");
    expect(gameReader.readLine()).toBe(null);
  });

  it("will not save the toBeGuessedWords to a textFile if it does not pass the rules", () => {
    const generator = new SpellingBeeGenerator(validator);
    addGameRules();
    addWordRules();
    const toBeGuessedWords = generator.readToBeGuessedWords(reader);
    expect(toBeGuessedWords).toEqual(["ar", "car"]);

    expect(fs.existsSync(filePath)).toBeFalsy();
    generator.writeToBeGuessedWords(toBeGuessedWords, writer);
    expect(fs.existsSync(filePath)).toBeFalsy();
  });

  it("can read and write the toBeGuessedWords at once", () => {
    const generator = new SpellingBeeGenerator(validator);

    expect(fs.existsSync(filePath)).toBeFalsy();
    generator.generate(reader, writer);
    expect(fs.existsSync(filePath)).toBeTruthy();

    const gameReader = new TextReader(filePath);
    expect(gameReader.readLine()).toBe("ar");
    expect(gameReader.readLine()).toBe("car");
    expect(gameReader.readLine()).toBe("card");
    expect(gameReader.readLine()).toBe("cd");
    expect(gameReader.readLine()).toBe(null);
  });
});
