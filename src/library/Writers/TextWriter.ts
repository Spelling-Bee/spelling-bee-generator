import TextReader from "@library/Readers/TextReader";
import fs from "fs";
import FileWriter from "./FileWriter";

class TextWriter extends FileWriter {
  public writeLine(line: string) {
    fs.appendFileSync(this.filePath, this.addLineSeparator(line));
  }

  private addLineSeparator(line: string) {
    if (!line.includes("\n")) {
      line += "\n";
    }
    return line;
  }

  public getReader() {
    return new TextReader(this.filePath);
  }
}

export default TextWriter;
