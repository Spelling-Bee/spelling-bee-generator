import SpellingBeeValidator from "@app/SpellingBeeValidator";
import OnlyValidCharactersWordRule from "@app/Rules/WordRules/OnlyValidCharactersWordRule";
import HasEnoughWordsGameRule from "@app/Rules/GameRules/HasEnoughWordsGameRule";

describe("SpellingBeeValidator", () => {
  const letters = ["a", "b", "c"];
  it("can be instantiated", () => {
    const validator = new SpellingBeeValidator();

    expect(validator).toBeInstanceOf(SpellingBeeValidator);
  });

  it("can add rules for words", () => {
    const validator = new SpellingBeeValidator();
    expect(
      validator.addWordRule(new OnlyValidCharactersWordRule(letters))
    ).toBeTruthy();
  });

  it("can add rules for games", () => {
    const validator = new SpellingBeeValidator();
    expect(validator.addGameRule(new HasEnoughWordsGameRule())).toBeTruthy();
  });

  it("can validate words based on the added word rules", () => {
    const validator = new SpellingBeeValidator();
    // A validator without any rules always return true
    expect(validator.isWordValid("word")).toBeTruthy();

    validator.addWordRule(new OnlyValidCharactersWordRule(letters));
    expect(validator.isWordValid("word")).toBeFalsy();
    expect(validator.isWordValid("abc")).toBeTruthy();
  });

  it("can validate games based on the added game rules", () => {
    const validator = new SpellingBeeValidator();
    // A validator without any rules always return true
    expect(validator.isGameValid([])).toBeTruthy();

    validator.addGameRule(new HasEnoughWordsGameRule(2));
    expect(validator.isGameValid([])).toBeFalsy();
    expect(validator.isGameValid(["word"])).toBeFalsy();
    expect(validator.isGameValid(["word", "abc"])).toBeTruthy();
  });
});
