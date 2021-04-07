import EachLetterIsUniqueGameRule from "@app/Rules/GameRules/EachLetterIsUniqueGameRule";
import HasEnoughWordsGameRule from "@app/Rules/GameRules/HasEnoughWordsGameRule";
import OnlyValidCharactersWordRule from "@app/Rules/WordRules/OnlyValidCharactersWordRule";
import SpellingBeeValidator from "@app/SpellingBeeValidator";
import { SpellingBeeGameSettings } from "@app/types";

class BasicModeValidator extends SpellingBeeValidator {
  constructor(settings: SpellingBeeGameSettings) {
    super();
    this.addWordRule(new OnlyValidCharactersWordRule(settings.letters));
    this.addGameRule(new HasEnoughWordsGameRule(settings.bound));
    this.addGameRule(new EachLetterIsUniqueGameRule(settings.letters));
  }
}

export default BasicModeValidator;
