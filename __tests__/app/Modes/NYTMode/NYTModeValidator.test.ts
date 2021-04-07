import BasicModeValidator from "@app/Modes/BasicMode/BasicModeValidator";
import NYTModeValidator from "@app/Modes/NYTMode/NYTModeValidator";
import SpellingBeeValidator from "@app/SpellingBeeValidator";

describe("NYTModeValidator", () => {
  const gameSettings = {
    letters: ["a", "b", "c"],
    bound: 1,
    pivot: "b",
    minimum: 2,
    points: 1,
  };

  it("can be instantiated", () => {
    const validator = new NYTModeValidator(gameSettings);

    expect(validator).toBeInstanceOf(NYTModeValidator);
    expect(validator).toBeInstanceOf(BasicModeValidator);
    expect(validator).toBeInstanceOf(SpellingBeeValidator);
  });

  it("applies word rule has pivot", () => {
    const validator = new NYTModeValidator(gameSettings);

    expect(validator.isWordValid("ac")).toBeFalsy();
    expect(validator.isWordValid("acb")).toBeTruthy();
  });

  it("applies word rule has at least minimum letters", () => {
    const validator = new NYTModeValidator(gameSettings);

    expect(validator.isWordValid("b")).toBeFalsy();
    expect(validator.isWordValid("ab")).toBeTruthy();
  });

  it("applies game rule has a pangram", () => {
    const validator = new NYTModeValidator(gameSettings);

    expect(validator.isGameValid(["ab", "bb", "cc"])).toBeFalsy();
    expect(validator.isGameValid(["abc"])).toBeTruthy();
  });
});
