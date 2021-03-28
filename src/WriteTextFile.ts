import fs from "fs";
import path from "path";

class WriteTextFile {
  path: string;
  fileName: string;
  filePath: string;

  constructor(target: string, fileName: string) {
    this.path = target;
    this.fileName = fileName;
    this.filePath = path.join(this.path, this.fileName);
  }

  public writeLine(line: string) {
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path);
    }
    fs.appendFileSync(
      path.join(this.path, this.fileName),
      this.addLineSeparator(line)
    );
  }

  private addLineSeparator(line: string) {
    if (!line.includes("\n")) {
      line += "\n";
    }
    return line;
  }
}

export default WriteTextFile;
