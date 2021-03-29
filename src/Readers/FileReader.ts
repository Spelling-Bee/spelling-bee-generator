import Reader from "./Reader";
import fs from "fs";

abstract class FileReader extends Reader {
  protected path: string;

  constructor(source: string) {
    super();
    this.isValidSource(source);

    this.path = source;
    this.reset();
  }

  private isValidSource(source: string) {
    if (!this.isString(source)) {
      throw new Error("Source needs to be a string.");
    }

    if (!fs.existsSync(source)) {
      throw new Error("The provided local source cannot be found.");
    }
  }

  private isString(input: any) {
    return typeof input === "string";
  }
}

export default FileReader;
