import Reader from "@library/Readers/Reader";
import Writer from "@library/Writers/Writer";
import SpellingBeeValidator from "./SpellingBeeValidator";

class SpellingBeeGame {
  validator: SpellingBeeValidator;
  reader: Reader;
  writer: Writer;

  constructor(
    validator: SpellingBeeValidator,
    source: Reader,
    storage: Writer
  ) {
    this.validator = validator;
    this.reader = source;
    this.writer = storage;
  }

  private checkGuessedWords(word: string) {
    const writerReader = this.writer.getReader();
    writerReader.reset();
    let line: string;
    while ((line = writerReader.readLine())) {
      if (word === line) {
        throw new Error("Already found.");
      }
    }
    return true;
  }

  private checkToBeGuessedWords(word: string) {
    this.reader.reset();
    let line: string;
    while ((line = this.reader.readLine())) {
      if (word === line) {
        return true;
      }
    }
    throw new Error("Word not in the list.");
  }

  public checkGuess(word: string) {
    return (
      this.validator.isWordValidWithErrorMessage(word) &&
      this.checkGuessedWords(word) &&
      this.checkToBeGuessedWords(word)
    );
  }

  public makeGuess(word: string) {
    if (this.checkGuess(word)) {
      this.writer.writeLine(word);
    }
    return true;
  }

  public getGuessedWords() {
    const guessedWords: string[] = [];
    const writerReader = this.writer.getReader();
    writerReader.reset();
    let line: string;
    while ((line = writerReader.readLine())) {
      if (line !== "" && line !== null) {
        guessedWords.push(line);
      }
    }
    return guessedWords;
  }

  public getSolution() {
    const solution: string[] = [];
    this.reader.reset();
    let line: string;
    while ((line = this.reader.readLine())) {
      if (line !== "" && line !== null) {
        solution.push(line);
      }
    }
    return solution;
  }

  public getToBeGuessedWords() {
    return this.getSolution().filter(
      (word) => !this.getGuessedWords().includes(word)
    );
  }
}

export default SpellingBeeGame;
