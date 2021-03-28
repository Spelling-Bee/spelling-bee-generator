import OnlyValidCharacters from "../../src/Rules/OnlyValidCharacters";
import Rule from "../../src/Rules/Rule";

describe("OnlyValidCharacters", () => {
  const letters = ["a", "b", "c"];
  it("can be instantiated", () => {
    const rule = new OnlyValidCharacters(letters);

    expect(rule).toBeInstanceOf(Rule);
    expect(rule).toBeInstanceOf(OnlyValidCharacters);
  });

  it("validates only words constisting of the given letters", () => {
    const rule = new OnlyValidCharacters(letters);

    expect(rule.isValid("word")).toBeFalsy();
    expect(rule.isValid("adc")).toBeFalsy();

    expect(rule.isValid("abc")).toBeTruthy();
  });
});
