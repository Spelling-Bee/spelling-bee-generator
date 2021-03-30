import JsonReader from "@library/services/Readers/JsonReader";
import path from "path";

describe("JsonReader", () => {
  const source = path.join("__tests__", "stubs", "sample.json");
  it("can be instantiated", () => {
    const reader = new JsonReader(source);

    expect(reader).toBeInstanceOf(JsonReader);
  });

  it("can read line by line", () => {
    const reader = new JsonReader(source);

    expect(reader.readLine()).toBe("hello");
    expect(reader.readLine()).toBe("world");
    expect(reader.readLine()).toBe(null);
  });
});
