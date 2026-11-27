import { existsSync, readFileSync } from "node:fs";

// The app's idea of "now": TODO_NOW, or a .demo-now file next to the store, or the real clock.
export function now() {
  if (process.env.TODO_NOW) return parseClock(process.env.TODO_NOW);
  if (existsSync(".demo-now")) return parseClock(readFileSync(".demo-now", "utf8").trim());
  return new Date();
}

// A bare YYYY-MM-DD means local midnight (new Date() would read it as UTC midnight).
export function parseClock(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(s);
}
