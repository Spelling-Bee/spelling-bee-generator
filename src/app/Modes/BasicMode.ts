import OnlyValidCharactersWordRule from "../Rules/WordRules/OnlyValidCharactersWordRule";
import SpellingBeeGenerator from "../SpellingBeeGenerator";
import SpellingBeeValidator from "../SpellingBeeValidator";
import HasEnoughWordsGameRule from "../Rules/GameRules/HasEnoughWordsGameRule";
import { SpellingBeeSettings } from "@app/types";
import ReaderFactory from "@library/Factories/ReaderFactory";
import WriterFactory from "@library/Factories/WriterFactory";

class BasicMode {
  validator: SpellingBeeValidator;
  generator: SpellingBeeGenerator;
  settings: SpellingBeeSettings;

  constructor(settings: SpellingBeeSettings) {
    this.validator = new SpellingBeeValidator();
    this.generator = new SpellingBeeGenerator(this.validator);
    this.settings = settings;
  }

  protected addRules() {
    this.validator.addWordRule(
      new OnlyValidCharactersWordRule(this.settings.letters)
    );
    this.validator.addGameRule(new HasEnoughWordsGameRule(this.settings.bound));
  }

  public createGame() {
    this.addRules();

    const reader = new ReaderFactory(this.settings.dictionary).getObject();
    const writer = new WriterFactory(
      this.settings.storage,
      this.settings.target,
      this.createId()
    ).getObject();

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
