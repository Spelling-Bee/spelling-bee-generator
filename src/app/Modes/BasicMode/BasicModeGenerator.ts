import {
  SpellingBeeGameSettings,
  SpellingBeeGeneratorSettings,
} from "@app/types";
import BasicModeValidator from "@app/Modes/BasicMode/BasicModeValidator";
import SpellingBeeGenerator from "@app/SpellingBeeGenerator";
import SpellingBeeValidator from "@app/SpellingBeeValidator";

class BasicModeGenerator {
  validator: SpellingBeeValidator;
  generator: SpellingBeeGenerator;
  gameSettings: SpellingBeeGameSettings;
  generatorSettings: SpellingBeeGeneratorSettings;

  constructor(
    gameSettings: SpellingBeeGameSettings,
    generatorSettings: SpellingBeeGeneratorSettings,
    validator?: SpellingBeeValidator
  ) {
    this.gameSettings = {
      ...gameSettings,
      letters: gameSettings.letters.map((letter) => letter.toLowerCase()),
    };
    this.generatorSettings = generatorSettings;

    this.validator = validator || new BasicModeValidator(this.gameSettings);
    this.generator = new SpellingBeeGenerator(this.validator);
  }

  public createId() {
    return BasicModeGenerator.createId(this.gameSettings);
  }

  static createId(gameSettings: SpellingBeeGameSettings) {
    return [...gameSettings.letters].sort().toString().split(",").join("");
  }

  public createGame() {
    const id = this.createId();
    this.generator.createGame(this.generatorSettings, id);
    return id;
  }
}

export default BasicModeGenerator;
