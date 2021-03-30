import GameRule from "./GameRule";

class HasEnoughWordsGameRule extends GameRule {
  minimum: number;
  constructor(minimum: number = 0) {
    super();
    this.minimum = minimum;
  }

  public isValid(toBeGuessedWords: string[]) {
    return toBeGuessedWords.length >= this.minimum;
  }
}

export default HasEnoughWordsGameRule;
