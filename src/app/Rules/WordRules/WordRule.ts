abstract class WordRule {
  abstract errorMessage: string;
  public abstract isValid(word: string): boolean;
}

export default WordRule;
