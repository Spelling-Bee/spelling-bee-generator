import HasPangramGameRule from "@app/Rules/GameRules/HasPangramGameRule";
import HasAtLeastMinimumWordRule from "@app/Rules/WordRules/HasAtLeastMinimumWordRule";
import HasPivotLetterWordRule from "@app/Rules/WordRules/HasPivotLetterWordRule";
import { SpellingBeeNYTGameSettingsWithPivot } from "@app/types";
import BasicModeValidator from "../BasicMode/BasicModeValidator";

class NYTModeValidator extends BasicModeValidator {
  constructor(settings: SpellingBeeNYTGameSettingsWithPivot) {
    super(settings);
    this.addWordRule(new HasPivotLetterWordRule(settings.pivot));
    this.addWordRule(new HasAtLeastMinimumWordRule(settings.minimum));
    this.addGameRule(new HasPangramGameRule(settings.letters));
  }
}

export default NYTModeValidator;
