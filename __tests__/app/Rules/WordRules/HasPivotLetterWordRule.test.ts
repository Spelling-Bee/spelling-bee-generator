import HasPivotLetterWordRule from "@app/Rules/WordRules/HasPivotLetterWordRule";
import WordRule from "@app/Rules/WordRules/WordRule";

describe("HasPivotLetterWordRule", () => {
  const pivotLetter = "a";
  it("can be instantiated", () => {
    const rule = new HasPivotLetterWordRule(pivotLetter);

    expect(rule).toBeInstanceOf(WordRule);
    expect(rule).toBeInstanceOf(HasPivotLetterWordRule);
  });

  it("validates only words who contain the pivot letter", () => {
    const rule = new HasPivotLetterWordRule(pivotLetter);

    expect(rule.isValid("word")).toBeFalsy();
    expect(rule.isValid("adc")).toBeTruthy();
    expect(rule.isValid("worda")).toBeTruthy();
  });
});
