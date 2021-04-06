import path from "path";
import { SpellingBeeNYTSetting } from "@app/types";
import NYTMode from "@app/Modes/NYTMode";
import BasicMode from "@app/Modes/BasicMode";
import fs from "fs";
import createDirectoryRecursively from "@helpers/createDirectoryRecursively";
import deleteDirectoryRecursively from "@helpers/deleteDirectoryRecursively";
import TextReader from "@library/Readers/TextReader";

describe("NYTMode", () => {
  const letters = ["r", "c", "a"];

  const dictionary = path.join("__tests__", "stubs", "sample.txt");
  const target = path.join("output");

  const settings: SpellingBeeNYTSetting = {
    letters,
    bound: 1,
    dictionary,
    target,
    storage: "txt",
    pivot: "r",
    minimum: 2,
    points: 7,
  };

  beforeEach(() => {
    createDirectoryRecursively(target);
  });

  afterEach(() => {
    deleteDirectoryRecursively(target);
  });

  it("can be instantiated and is child of BasicMode", () => {
    const game = new NYTMode(settings);

    expect(game).toBeInstanceOf(NYTMode);
    expect(game).toBeInstanceOf(BasicMode);
  });

  it("can create an id using the static method", () => {
    expect(NYTMode.createId(settings)).toBe("rac");
  });

  it("can create an id using the instance method", () => {
    const game = new NYTMode(settings);
    expect(game.createId()).toBe("rac");
  });

  it("can calculate the points for a word", () => {
    const game = new NYTMode(settings);
    expect(game.getPointForWord("cr")).toBe(1);
    expect(game.getPointForWord("crr")).toBe(3);
    expect(game.getPointForWord("car")).toBe(6);
  });

  it("can create a game of spelling bee", () => {
    const game = new NYTMode(settings);

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
    const game = new NYTMode({ ...settings, points: 8 });

    const filePath = path.join(target, game.createId() + ".txt");

    expect(fs.existsSync(filePath)).toBeFalsy();
    game.createGame();
    expect(fs.existsSync(filePath)).toBeFalsy();
  });

  it("cannot create a game of spelling bee with wrong pivot", () => {
    const game = new NYTMode({ ...settings, pivot: "d" });

    const filePath = path.join(target, game.createId() + ".txt");

    expect(fs.existsSync(filePath)).toBeFalsy();
    game.createGame();
    expect(fs.existsSync(filePath)).toBeFalsy();
  });

  it("cannot create a game of spelling bee with too high of a minimum", () => {
    const game = new NYTMode({ ...settings, minimum: 4 });

    const filePath = path.join(target, game.createId() + ".txt");

    expect(fs.existsSync(filePath)).toBeFalsy();
    game.createGame();
    expect(fs.existsSync(filePath)).toBeFalsy();
  });

  /*
  it("can create a game of spelling bee with a lower bound of words to be valid", () => {
    const game = new BasicMode({ ...settings, bound: 3 });

    const filePath = path.join(target, game.createId() + ".txt");

    expect(fs.existsSync(filePath)).toBeFalsy();
    game.createGame();
    expect(fs.existsSync(filePath)).toBeFalsy();
  });
  */
});