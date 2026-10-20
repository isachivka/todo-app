import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { add, done, load } from "../src/store.js";

// 11:30 pm in New York on Oct 27 — already Oct 28 in UTC
const LATE_EVENING = new Date("2026-10-27T23:30:00-04:00");

beforeEach(() => {
  process.env.TODO_FILE = join(mkdtempSync(join(tmpdir(), "todo-")), "tasks.json");
});

test("add stores a task", () => {
  add("groceries", { now: LATE_EVENING });
  assert.deepEqual(load(), [{ id: 1, title: "groceries", done: false }]);
});

test("due tomorrow is the next local date", () => {
  assert.equal(add("call bank", { due: "tomorrow", now: LATE_EVENING }).due, "2026-10-28");
});

test("done marks a task", () => {
  add("groceries", { now: LATE_EVENING });
  assert.equal(done(1).done, true);
});
