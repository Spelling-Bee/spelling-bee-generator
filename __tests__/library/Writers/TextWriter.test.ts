import TextWriter from "@library/Writers/TextWriter";
import TextReader from "@library/Readers/TextReader";
import path from "path";
import fs from "fs";
import deleteDirectoryRecursively from "@helpers/deleteDirectoryRecursively";

describe("TextWriter", () => {
  const target = path.join("temp");
  const fileName = "test.txt";
  const filePath = path.join(target, fileName);

  afterEach(() => {
    deleteDirectoryRecursively(target);
  });

  it("can be instantiated with a filePath, creates the target if it doesnt exist", () => {
    expect(fs.existsSync(target)).toBeFalsy();
    const writer = new TextWriter(filePath);
    expect(fs.existsSync(target)).toBeTruthy();

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
