import GameRule from "./GameRule";

class HasEnoughPointsGameRule extends GameRule {
  points: number;
  calculator: (word: string) => number;

  constructor(points: number, calculator: (word: string) => number) {
    super();
    this.points = points;
    this.calculator = calculator;
  }

  public isValid(toBeGuessedWords: string[]) {
    let score = 0;

    toBeGuessedWords.forEach((toBeGuessedWord) => {
      if (toBeGuessedWord.length) {
        score += this.calculator(toBeGuessedWord);
      }
    });

    return score >= this.points;
  }
}

export default HasEnoughPointsGameRule;
