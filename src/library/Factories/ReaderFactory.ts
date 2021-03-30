import Reader from "../Readers/Reader";
import Factory from "./Factory";
import path from "path";
import TextReader from "../Readers/TextReader";
import JsonReader from "../Readers/JsonReader";

class ReaderFactory implements Factory<Reader> {
  source: string;
  constructor(source: string) {
    this.source = source;
  }

  private sourceIsFile() {
    return this.getSourceExtension() !== "";
  }

  private getSourceExtension() {
    return path.extname(this.source);
  }

  getObject() {
    if (this.sourceIsFile()) {
      switch (this.getSourceExtension()) {
        case ".txt":
          return new TextReader(this.source);
        case ".json":
          return new JsonReader(this.source);
      }
    }
  }
}

export default ReaderFactory;
