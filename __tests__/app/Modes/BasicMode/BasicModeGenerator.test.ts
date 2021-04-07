import BasicModeGenerator from "@app/Modes/BasicMode/BasicModeGenerator";
import TextReader from "@library/Readers/TextReader";
import path from "path";
import fs from "fs";
import createDirectoryRecursively from "@helpers/createDirectoryRecursively";
import deleteDirectoryRecursively from "@helpers/deleteDirectoryRecursively";
import {
  SpellingBeeGameSettings,
  SpellingBeeGeneratorSettings,
} from "@app/types";

const alphabet = Array.from(
  { length: "z".charCodeAt(0) - "a".charCodeAt(0) + 1 },
  (_, i) => String.fromCharCode("a".charCodeAt(0) + i)
);

describe("BasicModeGenerator", () => {
  const letters = ["r", "c", "a"];

  const dictionary = path.join("__tests__", "stubs", "sample.txt");
  const target = path.join("output");

  const gameSettings: SpellingBeeGameSettings = {
    letters,
    bound: 1,
  };

  const generatorSettings: SpellingBeeGeneratorSettings = {
    dictionary,
    target,
    storage: "txt",
  };

  beforeEach(() => {
    createDirectoryRecursively(target);
  });

  afterEach(() => {
    deleteDirectoryRecursively(target);
  });

  it("can be instantiated", () => {
    const game = new BasicModeGenerator(gameSettings, generatorSettings);

    expect(game).toBeInstanceOf(BasicModeGenerator);
  });

  it("can create an id using the static method", () => {
    expect(BasicModeGenerator.createId(gameSettings)).toBe("acr");
  });

  it("can create an id using the instance method", () => {
    const game = new BasicModeGenerator(gameSettings, generatorSettings);
    expect(game.createId()).toBe("acr");
  });

  it("can create a game of spelling bee", () => {
    const game = new BasicModeGenerator(gameSettings, generatorSettings);

    const filePath = path.join(target, game.createId() + ".txt");

    expect(fs.existsSync(filePath)).toBeFalsy();
    game.createGame();
    expect(fs.existsSync(filePath)).toBeTruthy();

    const gameReader = new TextReader(filePath);

    expect(gameReader.readLine()).toBe("ar");
    expect(gameReader.readLine()).toBe("car");
    expect(gameReader.readLine()).toBe(null);
  });

  it("can create a game of spelling bee with a lower bound of words to be valid", () => {
    const game = new BasicModeGenerator(
      { ...gameSettings, bound: 3 },
      generatorSettings
    );

    const filePath = path.join(target, game.createId() + ".txt");

    expect(fs.existsSync(filePath)).toBeFalsy();
    game.createGame();
    expect(fs.existsSync(filePath)).toBeFalsy();
  });

  it("can generate a game using the static method", () => {
    const filePath = path.join(
      target,
      BasicModeGenerator.createId(gameSettings) + ".txt"
    );

    expect(fs.existsSync(filePath)).toBeFalsy();
    BasicModeGenerator.generateGame(gameSettings, generatorSettings);
    expect(fs.existsSync(filePath)).toBeTruthy();

    const gameReader = new TextReader(filePath);

    expect(gameReader.readLine()).toBe("ar");
    expect(gameReader.readLine()).toBe("car");
    expect(gameReader.readLine()).toBe(null);
  });

  it("can generate all games from the dictionary", () => {
    const filePath = path.join(
      target,
      BasicModeGenerator.createId(gameSettings) + ".txt"
    );

    expect(fs.existsSync(filePath)).toBeFalsy();

    BasicModeGenerator.generateAllGames(
      gameSettings,
      generatorSettings,
      3,
      alphabet
    );

    expect(fs.existsSync(filePath)).toBeTruthy();
  });
});
