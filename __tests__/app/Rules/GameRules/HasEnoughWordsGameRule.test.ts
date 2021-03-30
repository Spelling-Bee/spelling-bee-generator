import HasEnoughWordsGameRule from "@app/Rules/GameRules/HasEnoughWordsGameRule";
import GameRule from "@app/Rules/GameRules/GameRule";

describe("HasEnoughWordsGameRule", () => {
  it("can be instantiated", () => {
    const rule = new HasEnoughWordsGameRule();

    expect(rule).toBeInstanceOf(GameRule);
    expect(rule).toBeInstanceOf(HasEnoughWordsGameRule);
  });

  it("validates if a given game has enough words", () => {
    expect(new HasEnoughWordsGameRule().isValid([])).toBeTruthy();
    expect(new HasEnoughWordsGameRule().isValid(["a"])).toBeTruthy();
    expect(new HasEnoughWordsGameRule(2).isValid(["a"])).toBeFalsy();
    expect(new HasEnoughWordsGameRule(2).isValid(["a", "b"])).toBeTruthy();
  });
});
