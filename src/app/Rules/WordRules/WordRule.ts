abstract class WordRule {
  letters: string[];
  constructor(letters: string[]) {
    this.letters = letters;
  }

  public abstract isValid(word: string): boolean;
}

export default WordRule;
