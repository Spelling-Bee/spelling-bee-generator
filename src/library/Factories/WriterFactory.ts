import Writer from "@library/Writers/Writer";
import Factory from "./Factory";
import path from "path";
import TextWriter from "@library/Writers/TextWriter";
import JsonWriter from "@library/Writers/JsonWriter";

class WriterFactory implements Factory<Writer> {
  storage: string;
  target: string;
  id: string;

  constructor(storage: string, target: string, id: string) {
    this.storage = storage;
    this.target = target;
    this.id = id;
  }

  getObject() {
    const filePath = path.join(this.target, this.id);
    switch (this.storage) {
      case "txt":
        return new TextWriter(filePath + ".txt");
      case "json":
        return new JsonWriter(filePath + ".json");
    }
  }
}

export default WriterFactory;
