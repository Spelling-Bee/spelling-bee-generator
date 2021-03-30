import OnlyValidCharacters from "./Rules/WordRules/OnlyValidCharacters";
import SpellingBeeGenerator from "./SpellingBeeGenerator";
import SpellingBeeValidator from "./SpellingBeeValidator";
import HasEnoughWords from "./Rules/GameRules/HasEnoughWords";
import Reader from "@library/services/Readers/Reader";
import Writer from "@library/services/Writers/Writer";
import TextWriterBuilder from "@library/services/Builders/TextWriterBuilder";
import TextReaderBuilder from "@library/services/Builders/TextReaderBuilder";
import path from "path";

abstract class SpellingBee {
  abstract getReader(): Reader;
  abstract getWriter(): Writer;

  validator: SpellingBeeValidator;
  generator: SpellingBeeGenerator;
  letters: string[];

  constructor(letters: string[]) {
    this.validator = new SpellingBeeValidator();
    this.generator = new SpellingBeeGenerator(this.validator);
    this.letters = letters;

    this.addRules();
  }

  protected addRules() {
    this.validator.addWordRule(new OnlyValidCharacters(this.letters));
    this.validator.addGameRule(new HasEnoughWords(1));
  }

  public main() {
    const writer = new TextWriterBuilder(
      path.join("output", "games", this.createId() + ".txt")
    ).build();

    const reader = new TextReaderBuilder("dictionaries/en.txt").build();

    const toBeGuessedWords = this.generator.readToBeGuessedWords(reader);
    this.generator.writeToBeGuessedWords(toBeGuessedWords, writer);
  }

  private createId() {
    return this.letters.sort().toString();
  }
}

export default SpellingBee;
