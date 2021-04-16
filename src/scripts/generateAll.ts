require("module-alias/register");
import NYTModeGenerator from "@app/Modes/NYTMode/NYTModeGenerator";
import { SpellingBeeNYTGameSettings } from "@app/types";
import ReaderFactory from "@library/Factories/ReaderFactory";
import path from "path";
import fs from "fs";
import WriterFactory from "@library/Factories/WriterFactory";
import S3Service from "@library/Services/S3Service";

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
    pivot: "",
  };

  const generatorSettings = {
    dictionary: "dictionaries/en/en.json",
    target: "output/en",
    storage: "json",
  };

  const numberOfLetters = 7;

  const reader = new ReaderFactory(generatorSettings.dictionary).getObject();
  const target = path.join(generatorSettings.target, "games");

  let line: string;
  while ((line = reader.readLine())) {
    if (line !== "" && line !== null) {
      const letters = [...new Set(line.split(""))];
      const onlyValidLetters = letters.reduce(
        (previous, letter) => previous && alphabet.includes(letter),
        true
      );
      if (onlyValidLetters) {
        if (letters.length === numberOfLetters) {
          for (const pivot of letters) {
            const generator = new NYTModeGenerator(
              { ...gameSettings, letters, pivot },
              { ...generatorSettings, target }
            );

            generator.createGame();
          }
        }
      }
    }
  }

  const games = fs.readdirSync(target);
  const writer = new WriterFactory(
    generatorSettings.storage,
    generatorSettings.target,
    "gameList"
  ).getObject();
  for (const game of games) {
    writer.writeLine(game);
  }

  const s3 = new S3Service(process.env.S3_BUCKET);
  s3.upload("output");
}

generateAll();
