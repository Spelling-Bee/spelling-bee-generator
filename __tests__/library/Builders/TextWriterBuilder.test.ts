import Builder from "@library/Builders/Builder";
import TextWriterBuilder from "@library/Builders/TextWriterBuilder";
import TextWriter from "@library/Writers/TextWriter";
import path from "path";
import fs from "fs";

describe("TextBuilder", () => {
  const target = path.join("temp");
  const fileName = "fileName.txt";
  const filePath = path.join(target, fileName);

  afterEach(() => {
    if (fs.existsSync(target)) {
      fs.rmdirSync(target);
    }
  });

  it("can be instantiated", () => {
    const builder = new TextWriterBuilder(filePath);

    expect(builder).toBeInstanceOf(Builder);
    expect(builder).toBeInstanceOf(TextWriterBuilder);
  });

  it("can build a writer", () => {
    const builder = new TextWriterBuilder(filePath);

    expect(fs.existsSync(target)).toBeFalsy();

    const writer = builder.build();

    expect(fs.existsSync(target)).toBeTruthy();

    expect(writer).toBeInstanceOf(TextWriter);
  });
});
