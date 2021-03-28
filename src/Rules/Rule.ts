abstract class Rule {
  letters: string[];
  constructor(letters: string[]) {
    this.letters = letters;
  }

  public abstract isValid(word: string): boolean;
}

export default Rule;
