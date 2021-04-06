import BasicMode from "@app/Modes/BasicMode";
import TextReader from "@library/Readers/TextReader";
import { SpellingBeeBasicSetting } from "@app/types";
import path from "path";
import fs from "fs";
import createDirectoryRecursively from "@helpers/createDirectoryRecursively";
import deleteDirectoryRecursively from "@helpers/deleteDirectoryRecursively";

const alphabet = Array.from(
  { length: "z".charCodeAt(0) - "a".charCodeAt(0) + 1 },
  (_, i) => String.fromCharCode("a".charCodeAt(0) + i)
);

describe("BasicMode", () => {
  const letters = ["r", "c", "a"];

  const dictionary = path.join("__tests__", "stubs", "sample.txt");
  const target = path.join("output");

  const settings: SpellingBeeBasicSetting = {
    bound: 1,
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
    const game = new BasicMode(letters, settings);

    expect(game).toBeInstanceOf(BasicMode);
  });

  it("can create an id using the static method", () => {
    expect(BasicMode.createId(letters, settings)).toBe("acr");
  });

  it("can create an id using the instance method", () => {
    const game = new BasicMode(letters, settings);
    expect(game.createId()).toBe("acr");
  });

  it("can create a game of spelling bee", () => {
    const game = new BasicMode(letters, settings);

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
    const game = new BasicMode(letters, { ...settings, bound: 3 });

    const filePath = path.join(target, game.createId() + ".txt");

    expect(fs.existsSync(filePath)).toBeFalsy();
    game.createGame();
    expect(fs.existsSync(filePath)).toBeFalsy();
  });

  it("can generate a game using the static method", () => {
    const filePath = path.join(
      target,
      BasicMode.createId(letters, settings) + ".txt"
    );

    expect(fs.existsSync(filePath)).toBeFalsy();
    BasicMode.generateGame(letters, settings);
    expect(fs.existsSync(filePath)).toBeTruthy();

    const gameReader = new TextReader(filePath);

    expect(gameReader.readLine()).toBe("ar");
    expect(gameReader.readLine()).toBe("car");
    expect(gameReader.readLine()).toBe(null);
  });

  it("can generate all games from the dictionary", () => {
    const filePath = path.join(
      target,
      BasicMode.createId(letters, settings) + ".txt"
    );

    expect(fs.existsSync(filePath)).toBeFalsy();

    BasicMode.generate(settings, 3, alphabet);

    expect(fs.existsSync(filePath)).toBeTruthy();
  });
});
