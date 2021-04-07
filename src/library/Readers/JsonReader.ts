import fs from "fs";
import JsonWriter from "@library/Writers/JsonWriter";
import FileReader from "./FileReader";

class JsonReader extends FileReader {
  protected *createIterator() {
    if (fs.existsSync(this.filePath)) {
      const file = fs.readFileSync(this.filePath);
      const lines = JSON.parse(file.toString());
      for (let i = 0; i < lines.length; i++) {
        if (i + 1 === lines.length && lines[i] === "") break;
        yield lines[i];
      }
    }
    yield null;
  }

  public getWriter() {
    return new JsonWriter(this.filePath);
  }
}

export default JsonReader;
