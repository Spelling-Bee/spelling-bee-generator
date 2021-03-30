import ReaderFactory from "@library/Factories/ReaderFactory";
import TextReader from "@library/Readers/TextReader";
import JsonReader from "@library/Readers/JsonReader";
import path from "path";

describe("ReaderFactory", () => {
  const txtSource = path.join("__tests__", "stubs", "sample.txt");
  const jsonSource = path.join("__tests__", "stubs", "sample.json");
  it("can be instantiated", () => {
    const factory = new ReaderFactory();

    expect(factory).toBeInstanceOf(ReaderFactory);
  });

  it("can create a TextReader", () => {
    const factory = new ReaderFactory(txtSource);

    const reader = factory.getObject();

    expect(reader).toBeInstanceOf(TextReader);
  });

  it("can create a JsonReader", () => {
    const factory = new ReaderFactory(jsonSource);

    const reader = factory.getObject();

    expect(reader).toBeInstanceOf(JsonReader);
  });

  it("cannot create a reader if source is wrong", () => {
    const factory = new ReaderFactory("test");

    const reader = factory.getObject();

    expect(reader).toBeUndefined();
  });
});
