import GameRule from "@app/Rules/GameRules/GameRule";
import HasEnoughPointsGameRule from "@app/Rules/GameRules/HasEnoughPointsGameRule";

describe("HasEnoughPointsGameRule", () => {
  const points = 5;
  it("can be instantiated and is child of GameRule", () => {
    const rule = new HasEnoughPointsGameRule(points, (word) => word.length);

    expect(rule).toBeInstanceOf(HasEnoughPointsGameRule);
    expect(rule).toBeInstanceOf(GameRule);
  });

  it("validates if game has enough points", () => {
    const rule = new HasEnoughPointsGameRule(points, (word) => word.length);

    expect(rule.isValid(["a", "b", "c", "d"])).toBeFalsy();
    expect(rule.isValid(["a", "b", "c", "d", "e"])).toBeTruthy();
    expect(rule.isValid(["abcde"])).toBeTruthy();
    expect(rule.isValid(["ab", "cd"])).toBeFalsy();
    expect(rule.isValid(["ab", "cde"])).toBeTruthy();
  });
});
