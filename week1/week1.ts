// Task 1
const numArray = [1, -4, 7, 12];

function positiveNumSum(numArray: number[]) {
  let sum = 0;
  for (const positiveNum of numArray) {
    if (positiveNum > 0) {
      sum = sum + positiveNum;
    }
  }
  return sum;
}
console.log(positiveNumSum(numArray));

// Task 2
const words = ["world", "word"];

function reverseString(word: string) {
  let reversedWord = "";
  for (const letter of word) {
    reversedWord = letter + reversedWord;
  }
  return reversedWord;
}
console.log(reverseString(words[0]));
console.log(reverseString(words[1]));

//Task 3
const groupOne = [1, 2, 10, 8];
const groupTwo = [1, 5, 87, 45, 8, 8];
const groupThree = [1, 3, 10, 0];

function getTwoOldies(group: number[]) {
  let firstOldest = 0;
  let secondOldest = 0;
  for (let age of group) {
    if (age > firstOldest) {
      secondOldest = firstOldest;
      firstOldest = age;
    } else {
      if (age > secondOldest) {
        secondOldest = age;
      }
    }
  }

  return [secondOldest, firstOldest];
}

/* else озн - якщо age вже став новим firstOldest, не перевіряй його ще раз на secondOldest.
А якщо age не більший за firstOldest, тоді вже має сенс перевірити, чи він більший за secondOldest. */

console.log(getTwoOldies(groupOne));
console.log(getTwoOldies(groupTwo));
console.log(getTwoOldies(groupThree));
