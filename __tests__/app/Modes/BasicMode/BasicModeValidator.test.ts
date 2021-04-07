import BasicModeValidator from "@app/Modes/BasicMode/BasicModeValidator";
import SpellingBeeValidator from "@app/SpellingBeeValidator";

describe("BasicModeValidator", () => {
  const gameSettings = {
    letters: ["a", "b", "c"],
    bound: 1,
  };

  it("can be instantiated", () => {
    const validator = new BasicModeValidator(gameSettings);

    expect(validator).toBeInstanceOf(BasicModeValidator);
    expect(validator).toBeInstanceOf(SpellingBeeValidator);
  });

  it("applies word rule only valid characters", () => {
    const validator = new BasicModeValidator(gameSettings);

    expect(validator.isWordValid("abc")).toBeTruthy();
    expect(validator.isWordValid("abcd")).toBeFalsy();
  });

  it("applies game rule at least many words", () => {
    const validator = new BasicModeValidator({ ...gameSettings, bound: 2 });

    expect(validator.isGameValid([])).toBeFalsy();
    expect(validator.isGameValid(["a"])).toBeFalsy();
    expect(validator.isGameValid(["a", "ab"])).toBeTruthy();
  });

  it("applies game rule every letter is unique", () => {
    let validator = new BasicModeValidator(gameSettings);

    expect(validator.isGameValid(["a"])).toBeTruthy();

    validator = new BasicModeValidator({
      ...gameSettings,
      letters: ["a", "a"],
    });

    expect(validator.isGameValid(["a"])).toBeFalsy();
  });
});
