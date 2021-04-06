import HasAtLeastMinimumWordRule from "@app/Rules/WordRules/HasAtLeastMinimumWordRule";
import WordRule from "@app/Rules/WordRules/WordRule";

describe("HasAtLeastMinimumWordRule", () => {
  it("can be instantiated", () => {
    const rule = new HasAtLeastMinimumWordRule(4);

    expect(rule).toBeInstanceOf(HasAtLeastMinimumWordRule);
    expect(rule).toBeInstanceOf(WordRule);
  });

  it("can validate words if they are long enough", () => {
    const rule = new HasAtLeastMinimumWordRule(2);
    expect(rule.isValid("a")).toBeFalsy();
    expect(rule.isValid("b")).toBeFalsy();
    expect(rule.isValid("ab")).toBeTruthy();
    expect(rule.isValid("ba")).toBeTruthy();
    expect(rule.isValid("abc")).toBeTruthy();
  });
});
