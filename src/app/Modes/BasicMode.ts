import OnlyValidCharacters from "../Rules/WordRules/OnlyValidCharacters";
import SpellingBeeGenerator from "../SpellingBeeGenerator";
import SpellingBeeValidator from "../SpellingBeeValidator";
import HasEnoughWords from "../Rules/GameRules/HasEnoughWords";
import { SpellingBeeSettings } from "@app/types";
import Reader from "@library/services/Readers/Reader";
import Writer from "@library/services/Writers/Writer";

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
    this.validator.addWordRule(new OnlyValidCharacters(this.settings.letters));
    this.validator.addGameRule(new HasEnoughWords(1));
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
