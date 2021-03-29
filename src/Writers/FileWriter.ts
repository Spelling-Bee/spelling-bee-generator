import Writer from "./Writer";
import path from "path";
import fs from "fs";

abstract class FileWriter extends Writer {
  protected filePath: string;

  constructor(filePath: string) {
    super();
    this.filePath = filePath;
    this.createTargetIfDoesNotExist();
  }

  private createTargetIfDoesNotExist() {
    const target = path.dirname(this.filePath);
    if (!fs.existsSync(target)) fs.mkdirSync(target);
  }
}

export default FileWriter;
