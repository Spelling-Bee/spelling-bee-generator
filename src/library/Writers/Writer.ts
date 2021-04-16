import Reader from "@library/Readers/Reader";

abstract class Writer {
  public abstract writeLine(word: string): void;
  public abstract getReader(): Reader;
  public abstract reset(): void;
}
export default Writer;
