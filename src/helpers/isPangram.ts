function isPangram(letters: string[], word: string) {
  let pangram = true;
  letters.forEach((letter) => {
    if (pangram) pangram = word.includes(letter);
  });
  word.split("").forEach((letter) => {
    if (pangram) pangram = letters.includes(letter);
  });
  return pangram;
}

export default isPangram;
