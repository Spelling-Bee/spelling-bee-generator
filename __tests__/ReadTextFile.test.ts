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
    expect(readTextFile.readLine()).toBe("arc");
    expect(readTextFile.readLine()).toBe("car");
    expect(readTextFile.readLine()).toBe("card");
    expect(readTextFile.readLine()).toBe("cd");
    expect(readTextFile.readLine()).toBe(null);
    expect(readTextFile.readLine()).toBe(undefined);
  });
});
