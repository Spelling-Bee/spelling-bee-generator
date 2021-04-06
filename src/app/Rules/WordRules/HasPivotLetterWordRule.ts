import WordRule from "./WordRule";

class HasPivotLetterWordRule extends WordRule {
  pivotLetter: string;
  constructor(pivotLetter: string) {
    super();
    this.pivotLetter = pivotLetter;
  }

  public isValid(word: string) {
    return word.includes(this.pivotLetter);
  }
}

export default HasPivotLetterWordRule;
