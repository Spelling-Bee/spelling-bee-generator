import fs from "fs";
import FileReader from "./FileReader";

class TextReader extends FileReader {
  protected *createIterator() {
    const file = fs.readFileSync(this.path);
    const lines = file.toString().split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (i + 1 === lines.length && lines[i] === "") break;
      yield lines[i];
    }
    yield null;
  }

  public readLine() {
    return this.iterator.next().value;
  }
}

export default TextReader;
