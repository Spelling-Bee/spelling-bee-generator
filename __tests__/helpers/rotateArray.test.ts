import rotateArray, { swap } from "@helpers/rotateArray";
describe("rotateArray", () => {
  const array = ["a", "b", "c", "d"];
  it("swaps position in the array", () => {
    const tmp = [...array];
    expect(tmp).toEqual(["a", "b", "c", "d"]);
    swap(tmp, 0, 1);
    expect(tmp).toEqual(["b", "a", "c", "d"]);
  });

  it("rotates an array until the pivot is the first element", () => {
    expect(rotateArray(array, "a")).toEqual(["a", "b", "c", "d"]);
    expect(rotateArray(array, "b")).toEqual(["b", "c", "d", "a"]);
    expect(rotateArray(array, "c")).toEqual(["c", "d", "a", "b"]);
    expect(rotateArray(array, "d")).toEqual(["d", "a", "b", "c"]);
    expect(rotateArray(array, "g")).toEqual(["a", "b", "c", "d"]);
  });
});
