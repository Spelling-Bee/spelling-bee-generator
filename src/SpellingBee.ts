import Reader from "./Readers/Reader";
import Validator from "./Validator";
import Writer from "./Writers/Writer";

class SpellingBee {
  validator: Validator;
  toBeGuessedWords: string[];

  constructor(validator: Validator) {
    this.validator = validator;
  }

  public generateToBeGuessedWords(reader: Reader) {
    this.toBeGuessedWords = [];
    let word: string;
    reader.reset();
    while ((word = reader.readLine())) {
      if (this.validator.isWordValid(word)) {
        this.toBeGuessedWords.push(word);
      }
    }
  }

  public getToBeGuessedWords() {
    return this.toBeGuessedWords;
  }

  public writeToBeGuessedWords(writer: Writer) {
    if (this.validator.isGameValid(this.getToBeGuessedWords())) {
      this.getToBeGuessedWords().forEach(writer.writeLine.bind(writer));
    }
  }
}

export default SpellingBee;
