import { existsSync, readFileSync } from "node:fs";

// The app's idea of "now": TODO_NOW, or a .demo-now file next to the store, or the real clock.
export function now() {
  if (process.env.TODO_NOW) return new Date(process.env.TODO_NOW);
  if (existsSync(".demo-now")) return new Date(readFileSync(".demo-now", "utf8").trim());
  return new Date();
}
