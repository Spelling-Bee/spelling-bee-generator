export interface SpellingBeeBasicSetting {
  bound: number;
  dictionary: string;
  target: string;
  storage: string;
}

export interface SpellingBeeNYTSetting extends SpellingBeeBasicSetting {
  pivot: string;
  minimum: number;
  points: number;
}
