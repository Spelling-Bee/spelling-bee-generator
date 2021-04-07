import Reader from "@library/Readers/Reader";

abstract class Writer {
  public abstract writeLine(word: string): void;
  public abstract getReader(): Reader;
}
export default Writer;
