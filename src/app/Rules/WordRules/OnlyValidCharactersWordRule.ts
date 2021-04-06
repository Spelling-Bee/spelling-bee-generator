import WordRule from "./WordRule";

class OnlyValidCharactersWordRule extends WordRule {
  letters: string[];

  constructor(letters: string[]) {
    super();
    this.letters = letters;
  }

  public isValid(word: string) {
    for (const letter of word.split("")) {
      if (!this.letters.includes(letter)) {
        return false;
      }
    }
    return true;
  }
}

export default OnlyValidCharactersWordRule;
