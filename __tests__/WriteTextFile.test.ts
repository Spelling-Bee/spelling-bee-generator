import WriteTextFile from "../src/WriteTextFile";
import ReadTextFile from "../src/ReadTextFile";
import path from "path";
import fs from "fs";
describe("WriteTextFile", () => {
  const target = path.join(path.dirname(__dirname), "temp");
  const fileName = "test.txt";
  const filePath = path.join(target, fileName);

  beforeEach(() => {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target);
    }
  });

  afterEach(() => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      fs.rmdirSync(target);
    }
  });

  it("can be instantiated with a path and filePath", () => {
    const writeTextFile = new WriteTextFile(filePath);

    expect(writeTextFile).toBeInstanceOf(WriteTextFile);
  });

  it("can write lines to a file", () => {
    const writeTextFile = new WriteTextFile(filePath);

    writeTextFile.writeWord("Hello World");
    writeTextFile.writeWord("Hello World2\n");
    writeTextFile.writeWord("Hello World3");

    expect(fs.existsSync(target)).toBe(true);

    const readTextFile = new ReadTextFile(filePath);
    expect(readTextFile.readWord()).toBe("Hello World");
    expect(readTextFile.readWord()).toBe("Hello World2");
    expect(readTextFile.readWord()).toBe("Hello World3");
  });
});
