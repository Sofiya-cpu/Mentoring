// Task 1
type TestStatus = "passed" | "failed" | "skipped";

interface TestResult {
  name: string;
  status: TestStatus;
  durationMs: number;
  error?: string;
}

class TestRun {
  readonly name: string;
  private results: TestResult[] = [];
  constructor(name: string) {
    this.name = name;
  }
  //constructor(readonly name: string) {} //parameter properties (readonly перед параметром сам створює поле name і кладе в нього значення.
  //Тому писати this.name = name не треба).

  addResult(result: TestResult): void {
    this.results.push(result);
  }

  getFailed(): string[] {
    return this.results
      .filter((each) => each.status === "failed") // тут each параметр для перебору
      .map((each) => each.name);
  }

  getSummary(): Record<string, number> {
    const statuses = {
      passed: 0,
      failed: 0,
      skipped: 0,
    };

    for (const oneResult of this.results) statuses[oneResult.status]++;
    return statuses;
  }

  getTotalDuration(): number {
    return this.results.reduce((acc, each) => acc + each.durationMs, 0);
  }
}

const testRun = new TestRun("smoke");
testRun.addResult({ name: "first test", status: "passed", durationMs: 120 });
testRun.addResult({
  name: "second test",
  status: "failed",
  error: "element not found",
  durationMs: 120,
});
testRun.addResult({
  name: "third test",
  status: "skipped",
  error: "not implemented",
  durationMs: 120,
});

testRun.addResult({ name: "fourth test", status: "passed", durationMs: 120 });
console.log(testRun.getFailed());
console.log(testRun.getSummary());
console.log(testRun.getTotalDuration());

/*
npx tsx week4/test.ts
[ 'second test' ]
{ passed: 2, failed: 1, skipped: 1 }
480
*/

// Task 2
function returnHighAndLow(numbers: string): string {
  const getArray = numbers.split(" ").map((each) => Number(each));
  const minNumber = Math.min(...getArray);
  const maxNumber = Math.max(...getArray);

  return [maxNumber, minNumber].join(" ");
}

console.log(returnHighAndLow("1 2 3 4 5"));
console.log(returnHighAndLow("1 2 -3 4 5"));
console.log(returnHighAndLow("1 9 3 4 -5"));
console.log(returnHighAndLow("7"));
