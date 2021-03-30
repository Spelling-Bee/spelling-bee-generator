import { SpellingBeeSettings } from "@app/types";
import BasicMode from "./BasicMode";

class NYTMode extends BasicMode {
  pivotElement: string;
  minimum: number;

  constructor(letters: string[], pivot: string, minimum: number) {
    super(letters);

    this.settings["pivot"] = pivot;
    this.settings["minimum"] = minimum;
  }

  addRules() {
    super.addRules();
  }

  public createId() {
    return NYTMode.createId(this.settings);
  }

  static createId(settings: SpellingBeeSettings) {
    return settings.letters.sort().toString();
  }
}

export default NYTMode;
