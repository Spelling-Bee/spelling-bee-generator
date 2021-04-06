import BasicMode from "./BasicMode";
import isPangram from "@helpers/isPangram";
import {
  SpellingBeeNYTSetting,
  SpellingBeeNYTSettingWithPivot,
} from "@app/types";
import HasPivotLetterWordRule from "@app/Rules/WordRules/HasPivotLetterWordRule";
import HasEnoughPointsGameRule from "@app/Rules/GameRules/HasEnoughPointsGameRule";
import HasPangramGameRule from "@app/Rules/GameRules/HasPangramGameRule";
import rotateArray from "@helpers/rotateArray";
import HasAtLeastMinimumWordRule from "@app/Rules/WordRules/HasAtLeastMinimumWordRule";

class NYTMode extends BasicMode {
  settings: SpellingBeeNYTSettingWithPivot;
  constructor(letters: string[], settings: SpellingBeeNYTSettingWithPivot) {
    super(letters, settings);
  }

  protected addRules() {
    super.addRules();
    this.validator.addWordRule(new HasPivotLetterWordRule(this.settings.pivot));
    this.validator.addWordRule(
      new HasAtLeastMinimumWordRule(this.settings.minimum)
    );
    this.validator.addGameRule(
      new HasEnoughPointsGameRule(
        this.settings.points,
        this.getPointForWord.bind(this)
      )
    );
    this.validator.addGameRule(new HasPangramGameRule(this.letters));
  }

  public getPointForWord(word: string) {
    if (isPangram(this.letters, word)) {
      return this.letters.length + word.length;
    }
    if (word.length === this.settings.minimum) {
      return 1;
    }
    return word.length;
  }

  public createId() {
    return NYTMode.createId(this.letters, this.settings);
  }

  static createId(letters: string[], settings: SpellingBeeNYTSettingWithPivot) {
    const id = super.createId(letters, settings);
    const idArray: string[] = rotateArray(id.split(""), settings.pivot);
    return idArray.join("");
  }

  static generateGame(letters: string[], settings: SpellingBeeNYTSetting) {
    for (const pivot of letters) {
      const game = new this(letters, { ...settings, pivot });
      game.createGame();
    }
  }
}

export default NYTMode;
