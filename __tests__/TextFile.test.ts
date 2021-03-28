import TextFile from "../src/TextFile";
import path from "path";
describe("TextFile", () => {
  const localTextFilePath = path.join(__dirname, "stubs", "sample.txt");

  describe("Instantiation", () => {
    it("cannot be intantiated with a missing source", () => {
      //@ts-ignore
      expect(() => new ProcessTextFile()).toThrowError();
    });

    it("cannot be intantiated with a non string", () => {
      //@ts-ignore
      expect(() => new TextFile(require(localTextFilePath))).toThrowError();

      //@ts-ignore
      expect(() => new TextFile(2)).toThrowError();
    });

    it("cannot be intantiated with a non-existing local source", () => {
      //@ts-ignore
      expect(() => new TextFile("")).toThrowError();

      //@ts-ignore
      expect(() => new TextFile("test.txt")).toThrowError();
    });

    it("can be instantiated with a local source", () => {
      const textFile = new TextFile(localTextFilePath);

      expect(textFile).toBeInstanceOf(TextFile);
    });
  });

  it("can read the text file line by line", () => {
    const textFile = new TextFile(localTextFilePath);
    expect(textFile.readLine()).toBe("First line.");
    expect(textFile.readLine()).toBe("Second line.");
    expect(textFile.readLine()).toBe("Third line.");
    expect(textFile.readLine()).toBe(null);
    expect(textFile.readLine()).toBe(undefined);
  });
});
