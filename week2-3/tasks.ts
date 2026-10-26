// 1)
// Judges give a contestant scores. To make it fair, remove one lowest and one highest score,
// then return the average of the rest, rounded to 2 decimals. If there are fewer than 3 scores, return 0. Do not change the original array.
// fairAverage([10, 2, 7, 5, 1]) // 4.67  (removed 10 and 1)
// fairAverage([9, 9, 1, 4])     // 6.5   (removed one 9 and 1)
// fairAverage([5, 5, 5])        // 5
// fairAverage([3, 8])           // 0

function fairAverage(scores: number[]): number {
  if (scores.length < 3) {
    return 0;
  }
  const min: number = Math.min(...scores);
  const max: number = Math.max(...scores);
  const sum = scores.reduce((acc, value) => acc + value, 0);
  const sumSum = sum - (min + max);
  const average = sumSum / (scores.length - 2);
  return Number(average.toFixed(2));
}
console.log(fairAverage([10, 2, 7, 5, 1])); // 4.67
console.log(fairAverage([9, 9, 1, 4])); // 6.5
console.log(fairAverage([5, 5, 5])); // 5
console.log(fairAverage([3, 8])); // 0

// 2)
// Given an array of words, group them by first letter.
// Keys are lowercase letters, words inside each group are sorted alphabetically, ignoring case.
// Skip empty strings.

const arrayOfWords = ["Apple", "avocado", "Banana", "", "blueberry", "cherry"];

function sortByFirstLetter(words: string[]) {
  const groups: { [letter: string]: string[] } = {};
  for (const word of words) {
    if (word.length === 0) {
      continue;
    }
    const letter = word.slice(0, 1).toLocaleLowerCase();
    if (letter in groups) {
      groups[letter].push(word);
    } else groups[letter] = [word];
  }
  for (const letter in groups) {
    groups[letter].sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase()),
    );
  }

  return groups;
}
