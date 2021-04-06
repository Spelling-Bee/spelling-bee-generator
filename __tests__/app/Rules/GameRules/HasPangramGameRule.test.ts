import HasPangramGameRule from "@app/Rules/GameRules/HasPangramGameRule";
import GameRule from "@app/Rules/GameRules/GameRule";

describe("HasPangramGameRule", () => {
  it("can be instantiated", () => {
    const rule = new HasPangramGameRule([]);

    expect(rule).toBeInstanceOf(GameRule);
    expect(rule).toBeInstanceOf(HasPangramGameRule);
  });

  it("validates if a given game has a pangram", () => {
    expect(new HasPangramGameRule([]).isValid([])).toBeFalsy();
    expect(new HasPangramGameRule([]).isValid(["a"])).toBeFalsy();
    expect(new HasPangramGameRule(["a", "b"]).isValid(["a"])).toBeFalsy();
    expect(
      new HasPangramGameRule(["a", "b"]).isValid(["a", "ab"])
    ).toBeTruthy();
  });
});
