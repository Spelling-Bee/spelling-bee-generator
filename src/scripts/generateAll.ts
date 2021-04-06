require("module-alias/register");
import NYTMode from "@app/Modes/NYTMode";

const alphabet = Array.from(
  { length: "z".charCodeAt(0) - "a".charCodeAt(0) + 1 },
  (_, i) => String.fromCharCode("a".charCodeAt(0) + i)
);

function generateAll() {
  const setting = {
    bound: 10,
    dictionary: "dictionaries/en.json",
    target: "output/en/games",
    storage: "txt",
    minimum: 4,
    points: 10,
  };

  NYTMode.generate(setting, 7, alphabet);
}

generateAll();
