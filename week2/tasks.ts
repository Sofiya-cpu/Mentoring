// 1)
// Judges give a contestant scores. To make it fair, remove one lowest and one highest score, then return the average of the rest, rounded to 2 decimals. If there are fewer than 3 scores, return 0. Do not change the original array.
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
}

// 2)
// Given an array of words, group them by first letter. Keys are lowercase letters, words inside each group are sorted alphabetically, ignoring case. Skip empty strings.

// 3)
// Split an array into chunks of the given size. The last chunk can be smaller.
// chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
// chunk([1, 2, 3], 5)       // [[1, 2, 3]]
// chunk([], 3)              // []
