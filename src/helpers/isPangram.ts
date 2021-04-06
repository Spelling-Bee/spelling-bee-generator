function isPangram(letters: string[], word: string) {
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
