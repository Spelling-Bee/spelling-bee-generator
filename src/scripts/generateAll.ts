require("module-alias/register");
import NYTModeGenerator from "@app/Modes/NYTMode/NYTModeGenerator";
import { SpellingBeeNYTGameSettings } from "@app/types";

const alphabet = Array.from(
  { length: "z".charCodeAt(0) - "a".charCodeAt(0) + 1 },
  (_, i) => String.fromCharCode("a".charCodeAt(0) + i)
);

function generateAll() {
  const gameSettings: SpellingBeeNYTGameSettings = {
    letters: [],
    bound: 10,
    minimum: 4,
    points: 10,
  };

  const generatorSettings = {
    dictionary: "dictionaries/en.json",
    target: "output/en/games",
    storage: "json",
  };

  NYTModeGenerator.generateAllGames(
    gameSettings,
    generatorSettings,
    7,
    alphabet
  );
}

generateAll();
