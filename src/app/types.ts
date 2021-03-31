export type SpellingBeeSettings = {
  letters: string[];
  bound: number;
  dictionary: string;
  target: string;
  storage: string;
  pivot?: string;
  minimum?: number;
  size?: number;
};
