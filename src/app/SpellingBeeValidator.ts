import GameRule from "./Rules/GameRules/GameRule";
import WordRule from "./Rules/WordRules/WordRule";

class SpellingBeeValidator {
  wordRules: WordRule[] = [];
  gameRules: GameRule[] = [];

  public addWordRule(wordRule: WordRule) {
    this.wordRules.push(wordRule);
    return true;
  }

  public addGameRule(gameRule: GameRule) {
    this.gameRules.push(gameRule);
    return true;
  }

  public isWordValidWithErrorMessage(word: string) {
    for (const wordRule of this.wordRules) {
      if (!wordRule.isValid(word.toLowerCase())) {
        throw wordRule.errorMessage;
      }
    }
    return true;
  }

  public isWordValid(word: string) {
    try {
      return this.isWordValidWithErrorMessage(word);
    } catch (error) {
      return false;
    }
  }

  public isGameValid(toBeGuessedWords: string[]) {
    for (const gameRule of this.gameRules) {
      if (
        !gameRule.isValid(toBeGuessedWords.map((word) => word.toLowerCase()))
      ) {
        return false;
      }
    }
    return true;
  }
}

export default SpellingBeeValidator;
