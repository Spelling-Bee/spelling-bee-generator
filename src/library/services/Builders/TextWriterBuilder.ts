import TextWriter from "../Writers/TextWriter";
import fs from "fs";
import path from "path";
import Builder from "./Builder";

class TextWriterBuilder extends Builder<TextWriter> {
  filePath: string;

  constructor(filePath: string) {
    super();
    this.filePath = filePath;
  }

  build() {
    const target = path.dirname(this.filePath);
    if (!fs.existsSync(target)) fs.mkdirSync(target);
    return new TextWriter(this.filePath);
  }
}

export default TextWriterBuilder;
