import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const todo = (...args) =>
  execFileSync(join(import.meta.dirname, "../bin/todo"), args, {
    encoding: "utf8",
    env: { ...process.env, TODO_FILE: join(dir, "tasks.json"), TODO_NOW: "2026-10-27T12:00:00-04:00" },
  }).trim();
const dir = mkdtempSync(join(tmpdir(), "todo-e2e-"));

test("add, list and done from the command line", () => {
  assert.equal(todo("add", "water", "plants"), "·  1  water plants");
  todo("add", "groceries");
  todo("done", "1");
  assert.equal(todo("list"), "✓  1  water plants\n·  2  groceries");
});

test("now prints the app's clock", () => {
  assert.equal(todo("now"), "Oct 27, 12:00 (New York)");
});
