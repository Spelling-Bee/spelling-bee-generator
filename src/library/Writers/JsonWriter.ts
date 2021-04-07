import FileWriter from "./FileWriter";
import fs from "fs";
import JsonReader from "@library/Readers/JsonReader";

class JsonWriter extends FileWriter {
  private createEmptyJson() {
    fs.writeFileSync(this.filePath, JSON.stringify([]));
  }

  public writeLine(word: string) {
    if (!fs.existsSync(this.filePath)) {
      this.createEmptyJson();
    }

    const file = fs.readFileSync(this.filePath);
    const json = JSON.parse(file.toString());
    json.push(word);
    fs.writeFileSync(this.filePath, JSON.stringify(json));
  }

  public getReader() {
    return new JsonReader(this.filePath);
  }
}
export default JsonWriter;
