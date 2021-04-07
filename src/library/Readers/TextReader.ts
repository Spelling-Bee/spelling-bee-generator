import TextWriter from "@library/Writers/TextWriter";
import fs from "fs";
import FileReader from "./FileReader";

class TextReader extends FileReader {
  protected *createIterator() {
    if (fs.existsSync(this.filePath)) {
      const file = fs.readFileSync(this.filePath);
      const lines = file.toString().split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (i + 1 === lines.length && lines[i] === "") break;
        yield lines[i];
      }
    }
    yield null;
  }

  public getWriter() {
    return new TextWriter(this.filePath);
  }
}

export default TextReader;
