abstract class GameRule {
  public abstract isValid(toBeGuessedWords: string[]): boolean;
}

export default GameRule;
