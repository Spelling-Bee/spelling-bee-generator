import TextWriter from "@library/services/Writers/TextWriter";
import TextReader from "@library/services/Readers/TextReader";
import path from "path";
import fs from "fs";
describe("TextWriter", () => {
  const target = path.join("temp");
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
    const writer = new TextWriter(filePath);

    expect(writer).toBeInstanceOf(TextWriter);
  });

  it("can write lines to a file", () => {
    const writer = new TextWriter(filePath);

    writer.writeLine("Hello World");
    writer.writeLine("Hello World2\n");
    writer.writeLine("Hello World3");

    const reader = new TextReader(filePath);
    expect(reader.readLine()).toBe("Hello World");
    expect(reader.readLine()).toBe("Hello World2");
    expect(reader.readLine()).toBe("Hello World3");
  });
});
