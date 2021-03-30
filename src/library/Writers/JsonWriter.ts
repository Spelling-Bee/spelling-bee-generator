import FileWriter from "./FileWriter";
import fs from "fs";

class JsonWriter extends FileWriter {
  public writeLine(word: string) {
    const file = fs.readFileSync(this.filePath);
    const json = JSON.parse(file.toString());
    json.push(word);
    fs.writeFileSync(this.filePath, JSON.stringify(json));
  }
}
export default JsonWriter;
