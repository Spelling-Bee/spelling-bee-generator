import Reader from "@library/Readers/Reader";
import SpellingBeeValidator from "./SpellingBeeValidator";
import Writer from "@library/Writers/Writer";

class SpellingBee {
  validator: SpellingBeeValidator;

  constructor(validator: SpellingBeeValidator) {
    this.validator = validator;
  }

  public readToBeGuessedWords(reader: Reader) {
    const toBeGuessedWords = [];
    let word: string;
    reader.reset();
    while ((word = reader.readLine())) {
      if (this.validator.isWordValid(word)) {
        toBeGuessedWords.push(word);
      }
    }
    return toBeGuessedWords;
  }

  public writeToBeGuessedWords(toBeGuessedWords: string[], writer: Writer) {
    if (this.validator.isGameValid(toBeGuessedWords)) {
      toBeGuessedWords.forEach(writer.writeLine.bind(writer));
    }
  }

  public generate(reader: Reader, writer: Writer) {
    const toBeGuessedWords = this.readToBeGuessedWords(reader);
    this.writeToBeGuessedWords(toBeGuessedWords, writer);
  }
}

export default SpellingBee;
