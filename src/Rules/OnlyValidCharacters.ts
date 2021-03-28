import Rule from "./Rule";

class OnlyValidCharacters extends Rule {
  public isValid(word: string) {
    for (let letter of word.split("")) {
      if (!this.letters.includes(letter)) {
        return false;
      }
    }
    return true;
  }
}

export default OnlyValidCharacters;
