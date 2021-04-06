import isPangram from "@helpers/isPangram";
import GameRule from "./GameRule";

class HasPangramGameRule extends GameRule {
  letters: string[];
  constructor(letters: string[]) {
    super();
    this.letters = letters;
  }

  public isValid(toBeGuessedWords: string[]) {
    for (let toBeGuessedWord of toBeGuessedWords) {
      if (isPangram(this.letters, toBeGuessedWord)) {
        return true;
      }
    }
    return false;
  }
}

export default HasPangramGameRule;
