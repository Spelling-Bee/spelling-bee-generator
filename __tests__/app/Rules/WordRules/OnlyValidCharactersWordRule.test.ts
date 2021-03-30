import OnlyValidCharactersWordRule from "@app/Rules/WordRules/OnlyValidCharactersWordRule";
import WordRule from "@app/Rules/WordRules/WordRule";

describe("OnlyValidCharactersWordRule", () => {
  const letters = ["a", "b", "c"];
  it("can be instantiated", () => {
    const rule = new OnlyValidCharactersWordRule(letters);

    expect(rule).toBeInstanceOf(WordRule);
    expect(rule).toBeInstanceOf(OnlyValidCharactersWordRule);
  });

  it("validates only words constisting of the given letters", () => {
    const rule = new OnlyValidCharactersWordRule(letters);

    expect(rule.isValid("word")).toBeFalsy();
    expect(rule.isValid("adc")).toBeFalsy();

    expect(rule.isValid("abc")).toBeTruthy();
  });
});
