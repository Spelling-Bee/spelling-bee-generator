export interface SpellingBeeBasicSetting {
  bound: number;
  dictionary: string;
  target: string;
  storage: string;
}

export interface SpellingBeeNYTSetting extends SpellingBeeBasicSetting {
  minimum: number;
  points: number;
}

export interface SpellingBeeNYTSettingWithPivot extends SpellingBeeNYTSetting {
  pivot: string;
}
