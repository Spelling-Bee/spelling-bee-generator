import fs from "fs";
import path from "path";

class WriteTextFile {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  public writeWord(line: string) {
    fs.appendFileSync(this.filePath, this.addLineSeparator(line));
  }

  private addLineSeparator(line: string) {
    if (!line.includes("\n")) {
      line += "\n";
    }
    return line;
  }
}

export default WriteTextFile;
