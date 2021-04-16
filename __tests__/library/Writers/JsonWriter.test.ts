import JsonWriter from "@library/Writers/JsonWriter";
import JsonReader from "@library/Readers/JsonReader";
import path from "path";
import fs from "fs";
import deleteDirectoryRecursively from "@helpers/deleteDirectoryRecursively";

describe("JsonWriter", () => {
  const target = path.join("temp");
  const fileName = "test.json";
  const filePath = path.join(target, fileName);

  beforeAll(() => {
    deleteDirectoryRecursively(target);
  });

  afterEach(() => {
    deleteDirectoryRecursively(target);
  });

  it("can be instantiated", () => {
    expect(fs.existsSync(target)).toBeFalsy();
    const writer = new JsonWriter(filePath);
    expect(fs.existsSync(target)).toBeTruthy();

    expect(writer).toBeInstanceOf(JsonWriter);
  });

  it("can write to json", () => {
    const writer = new JsonWriter(filePath);
    writer.writeLine("test");
    writer.writeLine("test2");

    const reader = new JsonReader(filePath);

    expect(reader.readLine()).toEqual("test");
    expect(reader.readLine()).toEqual("test2");
  });

  it("can return a JsonReader", () => {
    const writer = new JsonWriter(filePath);
    writer.writeLine("test");

    expect(writer.getReader()).toBeInstanceOf(JsonReader);
  });

  it("can delete its file", () => {
    const writer = new JsonWriter(filePath);
    writer.writeLine("test");

    expect(fs.existsSync(filePath)).toBeTruthy();
    writer.reset();
    expect(fs.existsSync(filePath)).toBeFalsy();
  });
});
