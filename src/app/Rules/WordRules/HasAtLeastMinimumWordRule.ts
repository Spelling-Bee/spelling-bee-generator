import WordRule from "./WordRule";

class HasAtLeastMinimumWordRule extends WordRule {
  minimum: number;
  constructor(minimum: number) {
    super();
    this.minimum = minimum;
  }

  public isValid(word: string) {
    return word.length >= this.minimum;
  }
}
export default HasAtLeastMinimumWordRule;
