import JsonWriter from "../../src/Writers/JsonWriter";
import path from "path";
import fs from "fs";
describe("JsonWriter", () => {
  const target = path.join(path.dirname(__dirname), "temp");
  const fileName = "test.json";
  const filePath = path.join(target, fileName);

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
    expect(require(filePath)).toEqual(["test"]);
    writer.writeLine("test2");
    expect(require(filePath)).toEqual(["test", "test2"]);
  });
});
