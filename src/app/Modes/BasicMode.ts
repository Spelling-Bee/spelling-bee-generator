import OnlyValidCharactersWordRule from "../Rules/WordRules/OnlyValidCharactersWordRule";
import SpellingBeeGenerator from "../SpellingBeeGenerator";
import SpellingBeeValidator from "../SpellingBeeValidator";
import HasEnoughWordsGameRule from "../Rules/GameRules/HasEnoughWordsGameRule";
import { SpellingBeeSettings } from "@app/types";
import Reader from "@library/Readers/Reader";
import Writer from "@library/Writers/Writer";

class BasicMode {
  validator: SpellingBeeValidator;
  generator: SpellingBeeGenerator;
  settings: SpellingBeeSettings;
  letters: string[];

  constructor(letters: string[]) {
    this.validator = new SpellingBeeValidator();
    this.generator = new SpellingBeeGenerator(this.validator);
    this.settings = { letters };
  }

  protected addRules() {
    this.validator.addWordRule(
      new OnlyValidCharactersWordRule(this.settings.letters)
    );
    this.validator.addGameRule(new HasEnoughWordsGameRule(1));
  }

  public createGame(reader: Reader, writer: Writer) {
    this.addRules();
    this.generator.generate(reader, writer);
  }

  public createId() {
    return BasicMode.createId(this.settings);
  }

  static createId(settings: SpellingBeeSettings) {
    return settings.letters.sort().toString().split(",").join("");
  }
}

export default BasicMode;
