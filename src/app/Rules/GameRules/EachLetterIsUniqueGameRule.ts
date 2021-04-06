import GameRule from "./GameRule";

class EachLetterIsUniqueGameRule extends GameRule {
  letters: string[];
  constructor(letters: string[]) {
    super();
    this.letters = letters;
  }

  public isValid() {
    return [...new Set(this.letters)].length === this.letters.length;
  }
}

export default EachLetterIsUniqueGameRule;
