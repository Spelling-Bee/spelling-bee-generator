import fs from "fs";

class TextFile {
  path: string;
  iterator: Generator<string>;

  constructor(source: string) {
    this.isValidSource(source);

    this.path = source;
    this.iterator = this.readLineIterator();
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

  private *readLineIterator() {
    const file = fs.readFileSync(this.path);
    const lines = file.toString().split("\n");
    for (let i = 0; i < lines.length; i++) {
      yield lines[i];
    }
    yield null;
  }

  public readLine() {
    return this.iterator.next().value;
  }
}

export default TextFile;
