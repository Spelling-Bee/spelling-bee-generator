import HasEnoughWords from "@app/Rules/GameRules/HasEnoughWords";
import GameRule from "@app/Rules/GameRules/GameRule";

describe("HasEnoughWords", () => {
  it("can be instantiated", () => {
    const rule = new HasEnoughWords();

    expect(rule).toBeInstanceOf(GameRule);
    expect(rule).toBeInstanceOf(HasEnoughWords);
  });

  it("validates if a given game has enough words", () => {
    expect(new HasEnoughWords().isValid([])).toBeTruthy();
    expect(new HasEnoughWords().isValid(["a"])).toBeTruthy();
    expect(new HasEnoughWords(2).isValid(["a"])).toBeFalsy();
    expect(new HasEnoughWords(2).isValid(["a", "b"])).toBeTruthy();
  });
});
