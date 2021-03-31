import Writer from "@library/Writers/Writer";
import Factory from "./Factory";
import path from "path";
import TextWriter from "@library/Writers/TextWriter";
import JsonWriter from "@library/Writers/JsonWriter";

class WriterFactory implements Factory<Writer> {
  engine: string;
  target: string;
  id: string;

  constructor(engine: string, target: string, id: string) {
    this.engine = engine;
    this.target = target;
    this.id = id;
  }

  getObject() {
    const filePath = path.join(this.target, this.id);
    switch (this.engine) {
      case "txt":
        return new TextWriter(filePath + ".txt");
      case "json":
        return new JsonWriter(filePath + ".json");
    }
  }
}

export default WriterFactory;
