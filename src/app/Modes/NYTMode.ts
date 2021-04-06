import BasicMode from "./BasicMode";
import isPangram from "@helpers/isPangram";
import { SpellingBeeNYTSetting } from "@app/types";
import HasPivotLetterWordRule from "@app/Rules/WordRules/HasPivotLetterWordRule";
import HasEnoughPointsGameRule from "@app/Rules/GameRules/HasEnoughPointsGameRule";
import HasPangramGameRule from "@app/Rules/GameRules/HasPangramGameRule";
import rotateArray from "@helpers/rotateArray";
import HasAtLeastMinimumWordRule from "@app/Rules/WordRules/HasAtLeastMinimumWordRule";

class NYTMode extends BasicMode {
  settings: SpellingBeeNYTSetting;
  constructor(letters: string[], settings: SpellingBeeNYTSetting) {
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

  static createId(letters: string[], settings: SpellingBeeNYTSetting) {
    const id = super.createId(letters, settings);
    const idArray: string[] = rotateArray(id.split(""), settings.pivot);
    return idArray.join("");
  }
}

export default NYTMode;
