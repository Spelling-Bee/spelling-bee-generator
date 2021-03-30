import OnlyValidCharacters from "@app/Rules/WordRules/OnlyValidCharacters";
import WordRule from "@app/Rules/WordRules/WordRule";

describe("OnlyValidCharacters", () => {
  const letters = ["a", "b", "c"];
  it("can be instantiated", () => {
    const rule = new OnlyValidCharacters(letters);

    expect(rule).toBeInstanceOf(WordRule);
    expect(rule).toBeInstanceOf(OnlyValidCharacters);
  });

  it("validates only words constisting of the given letters", () => {
    const rule = new OnlyValidCharacters(letters);

    expect(rule.isValid("word")).toBeFalsy();
    expect(rule.isValid("adc")).toBeFalsy();

    expect(rule.isValid("abc")).toBeTruthy();
  });
});
