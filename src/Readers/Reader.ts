abstract class Reader {
  protected iterator: Generator;

  public abstract readLine(): string;
  protected abstract createIterator(): Generator<string>;

  public reset() {
    this.iterator = this.createIterator();
  }
}

export default Reader;
