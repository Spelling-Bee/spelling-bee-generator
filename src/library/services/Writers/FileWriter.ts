import Writer from "./Writer";

abstract class FileWriter extends Writer {
  protected filePath: string;

  constructor(filePath: string) {
    super();
    this.filePath = filePath;
  }
}

export default FileWriter;
