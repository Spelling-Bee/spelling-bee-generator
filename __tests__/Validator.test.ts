import Validator from "../src/Validator";
import OnlyValidCharacters from "../src/Rules/WordRules/OnlyValidCharacters";
import HasEnoughWords from "../src/Rules/GameRules/HasEnoughWords";
describe("Validator", () => {
  const letters = ["a", "b", "c"];
  it("can be instantiated", () => {
    const validator = new Validator();

    expect(validator).toBeInstanceOf(Validator);
  });

  it("can add rules for words", () => {
    const validator = new Validator();
    expect(
      validator.addWordRule(new OnlyValidCharacters(letters))
    ).toBeTruthy();
  });

  it("can add rules for games", () => {
    const validator = new Validator();
    expect(validator.addGameRule(new HasEnoughWords())).toBeTruthy();
  });

  it("can validate words based on the added word rules", () => {
    const validator = new Validator();
    //A validator without any rules always return true
    expect(validator.isWordValid("word")).toBeTruthy();

    validator.addWordRule(new OnlyValidCharacters(letters));
    expect(validator.isWordValid("word")).toBeFalsy();
    expect(validator.isWordValid("abc")).toBeTruthy();
  });

  it("can validate games based on the added game rules", () => {
    const validator = new Validator();
    //A validator without any rules always return true
    expect(validator.isGameValid([])).toBeTruthy();

    validator.addGameRule(new HasEnoughWords(2));
    expect(validator.isGameValid([])).toBeFalsy();
    expect(validator.isGameValid(["word"])).toBeFalsy();
    expect(validator.isGameValid(["word", "abc"])).toBeTruthy();
  });
});
