import WriteTextFile from "../src/WriteTextFile";
import ReadTextFile from "../src/ReadTextFile";
import path from "path";
import fs from "fs";
describe("WriteTextFile", () => {
  const target = path.join(path.dirname(__dirname), "temp");
  const fileName = "test.txt";
  const filePath = path.join(target, fileName);

  afterEach(() => {
    fs.unlinkSync(filePath);
    fs.rmdirSync(target);
  });

  it("can be instantiated with a path and fileName", () => {
    const writeTextFile = new WriteTextFile(target, fileName);

    expect(writeTextFile).toBeInstanceOf(WriteTextFile);
  });

  it("can write lines to a file", () => {
    const writeTextFile = new WriteTextFile(target, fileName);
    expect(fs.existsSync(target)).toBe(false);

    writeTextFile.writeLine("Hello World");
    writeTextFile.writeLine("Hello World2");

    expect(fs.existsSync(target)).toBe(true);

    const readTextFile = new ReadTextFile(filePath);
    expect(readTextFile.readLine()).toBe("Hello World");
    expect(readTextFile.readLine()).toBe("Hello World2");
  });
});
