import removeDuplicatesFromArray from "@helpers/removeDuplicatesFromArray";

describe("removeDuplicatesFromArray", () => {
  it("if everything is unique, return the array", () => {
    const array = ["a", "b"];

    expect(removeDuplicatesFromArray(array)).toEqual(["a", "b"]);
  });
  it("removes what is not unique", () => {
    const array = ["a", "a", "b", "a", "b"];

    expect(removeDuplicatesFromArray(array)).toEqual(["a", "b"]);
  });
});
