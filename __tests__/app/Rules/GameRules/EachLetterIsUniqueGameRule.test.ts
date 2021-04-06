import GameRule from "@app/Rules/GameRules/GameRule";
import EachLetterIsUniqueGameRule from "@app/Rules/GameRules/EachLetterIsUniqueGameRule";

describe("EachLetterIsUniqueGameRule", () => {
  const letters = ["a", "b"];
  it("can be instantiated", () => {
    const rule = new EachLetterIsUniqueGameRule(letters);

    expect(rule).toBeInstanceOf(EachLetterIsUniqueGameRule);
    expect(rule).toBeInstanceOf(GameRule);
  });

  it("can validate if the given letters are unique", () => {
    const rule = new EachLetterIsUniqueGameRule(letters);

    expect(rule.isValid()).toBeTruthy();
    expect(new EachLetterIsUniqueGameRule(["a", "a"]).isValid()).toBeFalsy();
    expect(new EachLetterIsUniqueGameRule([]).isValid()).toBeTruthy();
  });
});
