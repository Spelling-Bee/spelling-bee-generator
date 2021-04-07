import Reader from "./Reader";

abstract class FileReader extends Reader {
  protected filePath: string;

  constructor(source: string) {
    super();

    this.filePath = source;
    this.reset();
  }
}

export default FileReader;
