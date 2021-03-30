import TextReaderBuilder from "@library/Builders/TextReaderBuilder";
import TextReader from "@library/Readers/TextReader";
import path from "path";

describe("TextReaderBuilder", () => {
  const source = path.join("__tests__", "stubs", "sample.txt");
  it("can be instantiated", () => {
    const builder = new TextReaderBuilder(source);

    expect(builder).toBeInstanceOf(TextReaderBuilder);
  });

  it("can build a TextReader", () => {
    const builder = new TextReaderBuilder(source);

    const reader = builder.build();

    expect(reader).toBeInstanceOf(TextReader);
  });
});
