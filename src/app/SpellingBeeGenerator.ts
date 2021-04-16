import Reader from "@library/Readers/Reader";
import SpellingBeeValidator from "./SpellingBeeValidator";
import Writer from "@library/Writers/Writer";
import removeDuplicatesFromArray from "@helpers/removeDuplicatesFromArray";
import { SpellingBeeGeneratorSettings } from "./types";
import ReaderFactory from "@library/Factories/ReaderFactory";
import WriterFactory from "@library/Factories/WriterFactory";

class SpellingBeeGenerator {
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
    return removeDuplicatesFromArray(toBeGuessedWords);
  }

  public writeToBeGuessedWords(toBeGuessedWords: string[], writer: Writer) {
    writer.reset();
    if (this.validator.isGameValid(toBeGuessedWords)) {
      toBeGuessedWords.forEach(writer.writeLine.bind(writer));
    }
  }

  public generate(reader: Reader, writer: Writer) {
    const toBeGuessedWords = this.readToBeGuessedWords(reader);
    this.writeToBeGuessedWords(toBeGuessedWords, writer);
  }

  public createGame(
    generatorSettings: SpellingBeeGeneratorSettings,
    id: string
  ) {
    const reader = new ReaderFactory(generatorSettings.dictionary).getObject();
    const writer = new WriterFactory(
      generatorSettings.storage,
      generatorSettings.target,
      id
    ).getObject();

    this.generate(reader, writer);
  }
}

export default SpellingBeeGenerator;
