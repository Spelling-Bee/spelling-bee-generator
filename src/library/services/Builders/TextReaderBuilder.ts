import TextReader from "../Readers/TextReader";
import Builder from "./Builder";

class TextReaderBuilder extends Builder<TextReader> {
  source: string;
  constructor(source: string) {
    super();

    this.source = source;
  }

  build() {
    return new TextReader(this.source);
  }
}

export default TextReaderBuilder;
