// Turns a due word into a calendar date (YYYY-MM-DD).
const ymd = (d) => d.toISOString().slice(0, 10);

export function dueDate(word, now) {
  const d = new Date(now);
  switch (word) {
    case "today":
      return ymd(d);
    case "tomorrow":
      d.setDate(d.getDate() + 1);
      return ymd(d);
    case "next-week":
      d.setDate(d.getDate() + 7);
      return ymd(d);
    default:
      if (/^\d{4}-\d{2}-\d{2}$/.test(word)) return word;
      throw new Error(`unknown due date: ${word}`);
  }
}
