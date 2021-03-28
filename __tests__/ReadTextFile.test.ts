import ReadTextFile from "../src/ReadTextFile";
import path from "path";
describe("ReadTextFile", () => {
  const source = path.join(__dirname, "stubs", "sample.txt");

  it("can only be instantiated with a local source as a string", () => {
    const readTextFile = new ReadTextFile(source);

    expect(readTextFile).toBeInstanceOf(ReadTextFile);
  });

  it("can read the text file line by line", () => {
    const readTextFile = new ReadTextFile(source);
    expect(readTextFile.readWord()).toBe("ar");
    expect(readTextFile.readWord()).toBe("car");
    expect(readTextFile.readWord()).toBe("card");
    expect(readTextFile.readWord()).toBe("cd");
    expect(readTextFile.readWord()).toBe(null);
    expect(readTextFile.readWord()).toBe(undefined);
  });

  it("can reset the cursor", () => {
    const readTextFile = new ReadTextFile(source);
    expect(readTextFile.readWord()).toBe("ar");
    expect(readTextFile.readWord()).toBe("car");
    expect(readTextFile.readWord()).toBe("card");
    expect(readTextFile.readWord()).toBe("cd");
    expect(readTextFile.readWord()).toBe(null);
    expect(readTextFile.readWord()).toBe(undefined);

    readTextFile.resetCursor();
    expect(readTextFile.readWord()).toBe("ar");
  });
});
