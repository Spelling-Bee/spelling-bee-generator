import WriterFactory from "@library/Factories/WriterFactory";
import TextWriter from "@library/Writers/TextWriter";
import JsonWriter from "@library/Writers/JsonWriter";
import path from "path";
import deleteDirectoryRecursively from "@helpers/deleteDirectoryRecursively";

describe("ReaderFactory", () => {
  const target = path.join("temp");
  const id = "test";
  afterEach(() => {
    deleteDirectoryRecursively(target);
  });

  it("can be instantiated", () => {
    const factory = new WriterFactory("", "", "");

    expect(factory).toBeInstanceOf(WriterFactory);
  });

  it("can create a TextWriter", () => {
    const factory = new WriterFactory("txt", target, id);

    const writer = factory.getObject();

    expect(writer).toBeInstanceOf(TextWriter);
  });

  it("can create a JsonReader", () => {
    const factory = new WriterFactory("json", target, id);

    const writer = factory.getObject();

    expect(writer).toBeInstanceOf(JsonWriter);
  });
});
