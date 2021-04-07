import isPangram from "@helpers/isPangram";
describe("isPangram", () => {
  const letters = ["a", "b", "c"];
  it("detects if a word is a pangram", () => {
    expect(isPangram(letters, "a")).toBeFalsy();
    expect(isPangram(letters, "ab")).toBeFalsy();
    expect(isPangram(letters, "abc")).toBeTruthy();
    expect(isPangram(letters, "bac")).toBeTruthy();
    expect(isPangram(letters, "cab")).toBeTruthy();
    expect(isPangram(["C", "A", "B"], "cab")).toBeTruthy();
    expect(isPangram(letters, "CAB")).toBeTruthy();
    expect(isPangram(letters, "caab")).toBeTruthy();
    expect(isPangram(letters, "cabd")).toBeFalsy();
  });
});
