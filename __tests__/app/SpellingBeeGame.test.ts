import BasicModeValidator from "@app/Modes/BasicMode/BasicModeValidator";
import SpellingBeeGame from "@app/SpellingBeeGame";
import TextReader from "@library/Readers/TextReader";
import TextWriter from "@library/Writers/TextWriter";
import path from "path";
import deleteDirectoryRecursively from "@helpers/deleteDirectoryRecursively";

describe("SpellingBeeGame", () => {
  const letters = ["a", "c", "r"];
  const gameSettings = {
    letters,
    bound: 1,
  };

  const validator = new BasicModeValidator(gameSettings);

  const source = new TextReader(
    path.join("__tests__", "stubs", "gameSource.txt")
  );
  let storage = new TextWriter(path.join("storage", "acr.txt"));

  beforeAll(() => {
    deleteDirectoryRecursively(path.join("storage"));
  });

  beforeEach(() => {
    storage = new TextWriter(path.join("storage", "acr.txt"));
  });

  afterEach(() => {
    deleteDirectoryRecursively(path.join("storage"));
  });

  it("can be instantiated", () => {
    const game = new SpellingBeeGame(validator, source, storage);

    expect(game).toBeInstanceOf(SpellingBeeGame);
  });

  it("can check a guess", () => {
    const game = new SpellingBeeGame(validator, source, storage);

    expect(() => game.checkGuess("card")).toThrowError();
    expect(() => game.checkGuess("crr")).toThrowError();

    expect(game.checkGuess("car")).toBeTruthy();
  });

  it("can make a guess", () => {
    const game = new SpellingBeeGame(validator, source, storage);

    expect(game.checkGuess("car")).toBeTruthy();
    expect(game.makeGuess("car")).toBeTruthy();

    expect(() => game.checkGuess("car")).toThrowError();
    expect(() => game.makeGuess("car")).toThrowError();
  });

  it("can retrieve guessed words", () => {
    const game = new SpellingBeeGame(validator, source, storage);
    expect(game.getGuessedWords()).toEqual([]);
    game.makeGuess("car");

    expect(game.getGuessedWords()).toEqual(["car"]);
  });

  it("can retrieve the solution", () => {
    const game = new SpellingBeeGame(validator, source, storage);
    expect(game.getSolution()).toEqual(["ar", "car"]);
  });

  it("can retrieve to be guessed words", () => {
    const game = new SpellingBeeGame(validator, source, storage);
    expect(game.getToBeGuessedWords()).toEqual(game.getSolution());
    game.makeGuess("car");
    expect(game.getToBeGuessedWords()).toEqual(["ar"]);
  });
});
