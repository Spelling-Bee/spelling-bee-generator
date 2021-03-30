import BasicMode from "@app/Modes/BasicMode";
import TextReaderBuilder from "@library/services/Builders/TextReaderBuilder";
import TextWriterBuilder from "@library/services/Builders/TextWriterBuilder";
import { SpellingBeeSettings } from "@app/types";
import path from "path";
import fs from "fs";

describe("BasicMode", () => {
  const letters = ["r", "c", "a"];
  const settings: SpellingBeeSettings = { letters };

  const dictionary = path.join("__tests__", "stubs", "sample.txt");
  const target = path.join("output");

  it("can be instantiated", () => {
    const game = new BasicMode(letters);

    expect(game).toBeInstanceOf(BasicMode);
  });

  it("can create an id using the static method", () => {
    expect(BasicMode.createId(settings)).toBe("acr");
  });
  it("can create an id using the instance method", () => {
    const game = new BasicMode(letters);
    expect(game.createId()).toBe("acr");
  });

  it("can create a game of spelling bee", () => {
    const game = new BasicMode(letters);

    const filePath = path.join(target, game.createId() + ".txt");

    expect(fs.existsSync(filePath)).toBeFalsy();
    const reader = new TextReaderBuilder(dictionary).build();
    const writer = new TextWriterBuilder(filePath).build();
    game.createGame(reader, writer);
    expect(fs.existsSync(filePath)).toBeTruthy();

    const gameReader = new TextReaderBuilder(filePath).build();

    expect(gameReader.readLine()).toBe("ar");
    expect(gameReader.readLine()).toBe("car");
    expect(gameReader.readLine()).toBe(null);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    if (fs.existsSync(target)) {
      fs.rmdirSync(target);
    }
  });
});
