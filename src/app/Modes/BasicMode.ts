import OnlyValidCharactersWordRule from "../Rules/WordRules/OnlyValidCharactersWordRule";
import SpellingBeeGenerator from "../SpellingBeeGenerator";
import SpellingBeeValidator from "../SpellingBeeValidator";
import HasEnoughWordsGameRule from "../Rules/GameRules/HasEnoughWordsGameRule";
import { SpellingBeeBasicSetting } from "@app/types";
import ReaderFactory from "@library/Factories/ReaderFactory";
import WriterFactory from "@library/Factories/WriterFactory";
import EachLetterIsUniqueGameRule from "@app/Rules/GameRules/EachLetterIsUniqueGameRule";

class BasicMode {
  validator: SpellingBeeValidator;
  generator: SpellingBeeGenerator;
  settings: SpellingBeeBasicSetting;
  letters: string[];

  constructor(letters: string[], settings: SpellingBeeBasicSetting) {
    this.validator = new SpellingBeeValidator();
    this.generator = new SpellingBeeGenerator(this.validator);

    this.letters = letters.map((letter) => letter.toLowerCase());
    this.settings = settings;
  }

  protected addRules() {
    this.validator.addWordRule(new OnlyValidCharactersWordRule(this.letters));
    this.validator.addGameRule(new HasEnoughWordsGameRule(this.settings.bound));
    this.validator.addGameRule(new EachLetterIsUniqueGameRule(this.letters));
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
    return BasicMode.createId(this.letters, this.settings);
  }

  static createId(letters: string[], settings: SpellingBeeBasicSetting) {
    return [...letters].sort().toString().split(",").join("");
  }

  static generate(settings: SpellingBeeBasicSetting) {}
}

export default BasicMode;
