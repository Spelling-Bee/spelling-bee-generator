import FileWriter from "./FileWriter";
import fs from "fs";

class JsonWriter extends FileWriter {
  constructor(filePath: string) {
    super(filePath);
    this.createFileIfDoesNotExist();
  }

  public writeLine(word: string) {
    const json = require(this.filePath);
    json.push(word);
    fs.writeFileSync(this.filePath, JSON.stringify(json));
  }

  private createFileIfDoesNotExist() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
  }
}
export default JsonWriter;
