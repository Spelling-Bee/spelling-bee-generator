import isPangram from "@helpers/isPangram";
import {
  SpellingBeeGeneratorSettings,
  SpellingBeeNYTGameSettings,
} from "@app/types";
import rotateArray from "@helpers/rotateArray";
import BasicModeGenerator from "../BasicMode/BasicModeGenerator";
import NYTModeValidator from "./NYTModeValidator";
import HasEnoughPointsGameRule from "@app/Rules/GameRules/HasEnoughPointsGameRule";

class NYTModeGenerator extends BasicModeGenerator {
  gameSettings: SpellingBeeNYTGameSettings;

  constructor(
    gameSettings: SpellingBeeNYTGameSettings,
    generatorSettings: SpellingBeeGeneratorSettings
  ) {
    super(gameSettings, generatorSettings, new NYTModeValidator(gameSettings));

    this.validator.addGameRule(
      new HasEnoughPointsGameRule(
        gameSettings.points,
        this.getPointForWord.bind(this)
      )
    );
  }

  public getPointForWord(word: string) {
    if (isPangram(this.gameSettings.letters, word)) {
      return this.gameSettings.letters.length + word.length;
    }
    if (word.length === this.gameSettings.minimum) {
      return 1;
    }
    return word.length;
  }

  public createId() {
    return NYTModeGenerator.createId(this.gameSettings);
  }

  static createId(gameSettings: SpellingBeeNYTGameSettings) {
    const id = super.createId(gameSettings);
    const idArray: string[] = rotateArray(id.split(""), gameSettings.pivot);
    return idArray.join("");
  }
}

export default NYTModeGenerator;
