function isPangram(letters: string[], word: string) {
  letters = letters.map((letter) => letter.toLowerCase());
  word = word.toLowerCase();

  let pangram = letters.length === word.length;
  if (pangram) {
    letters.forEach((letter) => {
      if (pangram) pangram = word.includes(letter);
    });
    word.split("").forEach((letter) => {
      if (pangram) pangram = letters.includes(letter);
    });
  }
  return pangram;
}

export default isPangram;
