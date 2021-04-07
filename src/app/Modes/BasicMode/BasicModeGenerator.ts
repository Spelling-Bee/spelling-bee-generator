import {
  SpellingBeeGameSettings,
  SpellingBeeGeneratorSettings,
} from "@app/types";
import ReaderFactory from "@library/Factories/ReaderFactory";
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
    this.generator.createGame(this.generatorSettings, this.createId());
  }

  static generateGame(
    gameSettings: SpellingBeeGameSettings,
    generatorSettings: SpellingBeeGeneratorSettings
  ) {
    const game = new this(gameSettings, generatorSettings);
    game.createGame();
  }

  static generateAllGames(
    gameSettings: SpellingBeeGameSettings,
    generatorSettings: SpellingBeeGeneratorSettings,
    bound: number,
    alphabet: string[]
  ) {
    const reader = new ReaderFactory(generatorSettings.dictionary).getObject();
    let line: string;
    while ((line = reader.readLine())) {
      if (line !== "" && line !== null) {
        const letters = [...new Set(line.split(""))];
        const onlyValidLetters = letters.reduce(
          (previous, letter) => previous && alphabet.includes(letter),
          true
        );
        if (onlyValidLetters) {
          if (letters.length === bound) {
            this.generateGame({ ...gameSettings, letters }, generatorSettings);
          }
        }
      }
    }
  }
}

export default BasicModeGenerator;
