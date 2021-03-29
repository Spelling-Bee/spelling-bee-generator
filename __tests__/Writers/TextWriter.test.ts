import TextWriter from "../../src/Writers/TextWriter";
import TextReader from "../../src/Readers/TextReader";
import path from "path";
import fs from "fs";
describe("TextWriter", () => {
  const target = path.join(path.dirname(__dirname), "temp");
  const fileName = "test.txt";
  const filePath = path.join(target, fileName);

  afterEach(() => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      fs.rmdirSync(target);
    }
  });

  it("can be instantiated with a path and filePath", () => {
    const writer = new TextWriter(filePath);

    expect(writer).toBeInstanceOf(TextWriter);
  });

  it("can write lines to a file", () => {
    const writer = new TextWriter(filePath);

    writer.writeLine("Hello World");
    writer.writeLine("Hello World2\n");
    writer.writeLine("Hello World3");

    expect(fs.existsSync(target)).toBe(true);

    const reader = new TextReader(filePath);
    expect(reader.readLine()).toBe("Hello World");
    expect(reader.readLine()).toBe("Hello World2");
    expect(reader.readLine()).toBe("Hello World3");
  });
});
