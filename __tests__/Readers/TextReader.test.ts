import TextReader from "../../src/Readers/TextReader";
import path from "path";
describe("TextReader", () => {
  const source = path.join(path.dirname(__dirname), "stubs", "sample.txt");

  it("can only be instantiated with a local source as a string", () => {
    const reader = new TextReader(source);

    expect(reader).toBeInstanceOf(TextReader);
  });

  it("can read the text file line by line", () => {
    const reader = new TextReader(source);
    expect(reader.readLine()).toBe("ar");
    expect(reader.readLine()).toBe("car");
    expect(reader.readLine()).toBe("card");
    expect(reader.readLine()).toBe("cd");
    expect(reader.readLine()).toBe(null);
    expect(reader.readLine()).toBe(undefined);
  });

  it("can reset the cursor", () => {
    const reader = new TextReader(source);
    expect(reader.readLine()).toBe("ar");
    expect(reader.readLine()).toBe("car");
    expect(reader.readLine()).toBe("card");
    expect(reader.readLine()).toBe("cd");
    expect(reader.readLine()).toBe(null);
    expect(reader.readLine()).toBe(undefined);

    reader.reset();
    expect(reader.readLine()).toBe("ar");
  });
});
