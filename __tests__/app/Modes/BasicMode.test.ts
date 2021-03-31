import BasicMode from "@app/Modes/BasicMode";
import TextReader from "@library/Readers/TextReader";
import { SpellingBeeSettings } from "@app/types";
import path from "path";
import fs from "fs";
import createDirectoryRecursively from "@helpers/createDirectoryRecursively";
import deleteDirectoryRecursively from "@helpers/deleteDirectoryRecursively";

describe("BasicMode", () => {
  const letters = ["r", "c", "a"];

  const dictionary = path.join("__tests__", "stubs", "sample.txt");
  const target = path.join("output");

  const settings: SpellingBeeSettings = {
    letters,
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
    const game = new BasicMode(settings);

    expect(game).toBeInstanceOf(BasicMode);
  });

  it("can create an id using the static method", () => {
    expect(BasicMode.createId(settings)).toBe("acr");
  });

  it("can create an id using the instance method", () => {
    const game = new BasicMode(settings);
    expect(game.createId()).toBe("acr");
  });

  it("can create a game of spelling bee", () => {
    const game = new BasicMode(settings);

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
    const game = new BasicMode({ ...settings, bound: 3 });

    const filePath = path.join(target, game.createId() + ".txt");

    expect(fs.existsSync(filePath)).toBeFalsy();
    game.createGame();
    expect(fs.existsSync(filePath)).toBeFalsy();
  });
});
