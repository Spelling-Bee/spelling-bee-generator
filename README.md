# Spelling Bee - Generator

This repo is a Node.js implementation to generate Spelling Bee games.

## The Game

Spelling Bee is a language puzzle. The player is given a set of letters and needs to find all words which can be build by using the given set of letters. For example with the set of letters `a,c,d,r`, the words `cd, car, card, arc` need to be found by the player. The game is usually extended with rules like all words need to consist of at least 3 letters, or all words need to include a certain letter.

## Rules

- Each set of letters needs to have 7 letters
- Each to-be-guessed word must have at least 4 letters
- One letter, the pivot letter, is chosen to be included in every to-be-guessed word
- A valid game needs to have at least 10 to-be-guessed words
- Each set of letters need to create a pangram, which is a word that includes all letters once
- Then for each possible game, there should be another text file generated with the to-be-guessed words separated by lines.

## Instructions

You are given a text file with all the words of a language separated by lines. The program should generate a text file with all possible games separated by lines using the rules above. Then for each possible game, there should be another text file generated with the to-be-guessed words separated by lines.

## Requirements

### Unique Identifier

To uniquely identify a game, we use the special ordering of the set of letters. First, the set of letters will be ordered lexicographically, then the set will be rotated such that the pivot letter is the first letter.

#### Example

For example, the set of letters `g,f,e,d,c,b,a` with the pivot letter `d` create a valid game. The transformation would reorder the set first to `a,b,c,d,e,f,g`. Since the pivot letter is `d`, it would rotate the set to `d,e,f,g,a,b,c`. With that we have a unique identifier `defgabc`.

### Structure

We are using the following folder structure:

```
.
├── __tests__
│   ├── **.*.ts
├── dist
│   ├── **.*.js
├── src
│   ├── **.*.ts
├── output
│   ├── games
│   │  ├── defgabc.txt
│   ├── generatedGames.txt
│   index.js (entry file)
│   index.d.ts (types file)
│   package.json
```
