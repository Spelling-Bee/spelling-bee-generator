import GameRule from "./Rules/GameRules/GameRule";
import WordRule from "./Rules/WordRules/WordRule";

class Validator {
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

  public isWordValid(word: string) {
    for (const wordRule of this.wordRules) {
      if (!wordRule.isValid(word)) {
        return false;
      }
    }
    return true;
  }

  public isGameValid(toBeGuessedWords: string[]) {
    for (const gameRule of this.gameRules) {
      if (!gameRule.isValid(toBeGuessedWords)) {
        return false;
      }
    }
    return true;
  }
}

export default Validator;
