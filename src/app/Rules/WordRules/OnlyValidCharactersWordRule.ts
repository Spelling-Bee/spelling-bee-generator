import WordRule from "./WordRule";

class OnlyValidCharactersWordRule extends WordRule {
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
