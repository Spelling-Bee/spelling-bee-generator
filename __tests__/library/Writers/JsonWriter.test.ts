import JsonWriter from "@library/Writers/JsonWriter";
import JsonReader from "@library/Readers/JsonReader";
import path from "path";
import fs from "fs";
describe("JsonWriter", () => {
  const target = path.join("temp");
  const fileName = "test.json";
  const filePath = path.join(target, fileName);

  beforeEach(() => {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target);
    }
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
  });

  afterEach(() => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      fs.rmdirSync(target);
    }
  });

  it("can be instantiated", () => {
    const writer = new JsonWriter(filePath);

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
});
