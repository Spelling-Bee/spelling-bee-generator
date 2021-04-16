import path from "path";
import fs from "fs";
import createDirectoryRecursively from "@helpers/createDirectoryRecursively";
import deleteDirectoryRecursively from "@helpers/deleteDirectoryRecursively";
import TextReader from "@library/Readers/TextReader";
import NYTModeGenerator from "@app/Modes/NYTMode/NYTModeGenerator";
import BasicModeGenerator from "@app/Modes/BasicMode/BasicModeGenerator";
import {
  SpellingBeeGeneratorSettings,
  SpellingBeeNYTGameSettings,
} from "@app/types";

describe("NYTMode", () => {
  const letters = ["r", "c", "a"];

  const dictionary = path.join("__tests__", "stubs", "sample.txt");
  const target = path.join("output");

  const gameSettings: SpellingBeeNYTGameSettings = {
    letters,
    bound: 1,
    pivot: "r",
    minimum: 2,
    points: 7,
  };

  const generatorSettings: SpellingBeeGeneratorSettings = {
    dictionary,
    target,
    storage: "txt",
  };

  beforeAll(() => {
    deleteDirectoryRecursively(target);
  });

  beforeEach(() => {
    createDirectoryRecursively(target);
  });

  afterEach(() => {
    deleteDirectoryRecursively(target);
  });

  it("can be instantiated and is child of BasicMode", () => {
    const game = new NYTModeGenerator(gameSettings, generatorSettings);

    expect(game).toBeInstanceOf(NYTModeGenerator);
    expect(game).toBeInstanceOf(BasicModeGenerator);
  });

  it("can create an id using the static method", () => {
    expect(NYTModeGenerator.createId(gameSettings)).toBe("rac");
  });

  it("can create an id using the instance method", () => {
    const game = new NYTModeGenerator(gameSettings, generatorSettings);
    expect(game.createId()).toBe("rac");
  });

  it("can calculate the points for a word", () => {
    const game = new NYTModeGenerator(gameSettings, generatorSettings);
    expect(game.getPointForWord("cr")).toBe(1);
    expect(game.getPointForWord("crr")).toBe(3);
    expect(game.getPointForWord("car")).toBe(6);
  });

  it("can create a game of spelling bee", () => {
    const game = new NYTModeGenerator(gameSettings, generatorSettings);

    const filePath = path.join(target, game.createId() + ".txt");

    expect(fs.existsSync(filePath)).toBeFalsy();
    game.createGame();
    expect(fs.existsSync(filePath)).toBeTruthy();

    const gameReader = new TextReader(filePath);

    expect(gameReader.readLine()).toBe("ar");
    expect(gameReader.readLine()).toBe("car");
    expect(gameReader.readLine()).toBe(null);
  });

  it("points are not enough", () => {
    const game = new NYTModeGenerator(
      { ...gameSettings, points: 9 },
      generatorSettings
    );

    const filePath = path.join(target, game.createId() + ".txt");

    expect(fs.existsSync(filePath)).toBeFalsy();
    game.createGame();
    expect(fs.existsSync(filePath)).toBeFalsy();
  });

  it("cannot create a game of spelling bee with wrong pivot", () => {
    const game = new NYTModeGenerator(
      { ...gameSettings, pivot: "d" },
      generatorSettings
    );

    const filePath = path.join(target, game.createId() + ".txt");

    expect(fs.existsSync(filePath)).toBeFalsy();
    game.createGame();
    expect(fs.existsSync(filePath)).toBeFalsy();
  });

  it("cannot create a game of spelling bee with too high of a minimum", () => {
    const game = new NYTModeGenerator(
      { ...gameSettings, minimum: 4 },
      generatorSettings
    );

    const filePath = path.join(target, game.createId() + ".txt");

    expect(fs.existsSync(filePath)).toBeFalsy();
    game.createGame();
    expect(fs.existsSync(filePath)).toBeFalsy();
  });
});
