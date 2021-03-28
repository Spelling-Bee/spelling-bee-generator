import fs from "fs";

class ReadTextFile {
  path: string;
  iterator: Generator<string>;

  constructor(source: string) {
    this.isValidSource(source);

    this.path = source;
    this.resetCursor();
  }

  public resetCursor() {
    this.iterator = this.readWordIterator();
  }

  private isValidSource(source: string) {
    if (!this.isString(source)) {
      throw "Source needs to be a string.";
    }

    if (!fs.existsSync(source)) {
      throw "The provided local source cannot be found.";
    }
  }

  private isString(input: any) {
    return typeof input === "string";
  }

  private *readWordIterator() {
    const file = fs.readFileSync(this.path);
    const lines = file.toString().split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (i + 1 === lines.length && lines[i] === "") break;
      yield lines[i];
    }
    yield null;
  }

  public readWord() {
    return this.iterator.next().value;
  }
}

export default ReadTextFile;
