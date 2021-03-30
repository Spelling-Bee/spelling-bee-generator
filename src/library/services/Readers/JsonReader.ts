import TextReader from "./TextReader";
import fs from "fs";

class JsonReader extends TextReader {
  protected *createIterator() {
    const file = fs.readFileSync(this.path);
    const lines = JSON.parse(file.toString());
    for (let i = 0; i < lines.length; i++) {
      if (i + 1 === lines.length && lines[i] === "") break;
      yield lines[i];
    }
    yield null;
  }
}

export default JsonReader;
