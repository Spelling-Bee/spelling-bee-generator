import ReadTextFile from "./ReadTextFile";
import Validator from "./Validator";
import WriteTextFile from "./WriteTextFile";

class SpellingBee {
  validator: Validator;
  toBeGuessedWords: string[];

  constructor(validator: Validator) {
    this.validator = validator;
  }

  public generateToBeGuessedWords(dictionary: ReadTextFile) {
    this.toBeGuessedWords = [];
    let word: string;
    while ((word = dictionary.readLine())) {
      if (this.validator.isWordValid(word)) {
        this.toBeGuessedWords.push(word);
      }
    }
  }

  public getToBeGuessedWords() {
    return this.toBeGuessedWords;
  }

  public writeToBeGuessedWords(writer: WriteTextFile) {
    if (this.validator.isGameValid(this.getToBeGuessedWords())) {
      this.getToBeGuessedWords().forEach(writer.writeLine.bind(writer));
    }
  }
}

export default SpellingBee;
