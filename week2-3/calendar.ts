function getEventRange(start: string, count: number): string[] {
  const [day, month, year] = start.split(".");

  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const current = new Date(Number(year), Number(month) - 1, Number(day) + i);
    result.push(
      current.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    );
  }
  return result;
}

console.log(getEventRange("25.09.2026", 10));
console.log(getEventRange("28.12.2026", 7));
console.log(getEventRange("27.02.2028", 4));
console.log(getEventRange("10.10.2026", 0));

function countByMonth(dates: string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const date of dates) {
    const monthKey = date.slice(3);
    counts[monthKey] = (counts[monthKey] ?? 0) + 1;
  }
  return counts;
}

console.log(countByMonth(getEventRange("29.10.2026", 5)));
console.log(countByMonth(getEventRange("28.12.2026", 7)));

function daysInMonth(month: number, year: number): number {
  const daysCount = new Date(year, month, 0);
  return daysCount.getDate();
}

console.log(daysInMonth(9, 2026));
console.log(daysInMonth(10, 2026));
console.log(daysInMonth(2, 2026));
console.log(daysInMonth(2, 2028));
