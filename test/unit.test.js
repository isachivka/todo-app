import { test } from "node:test";
import assert from "node:assert/strict";
import { parse } from "../src/cli.js";
import { shortDate, line } from "../src/format.js";
import { dueDate } from "../src/due.js";
import { parseClock } from "../src/clock.js";

test("parse reads the command, the title words and --due", () => {
  assert.deepEqual(parse(["add", "call", "bank", "--due", "tomorrow"]), { cmd: "add", words: ["call", "bank"], due: "tomorrow" });
  assert.equal(parse([]).cmd, "list");
});

test("shortDate prints month and day", () => {
  assert.equal(shortDate("2026-10-28"), "Oct 28");
  assert.equal(shortDate("2026-01-05"), "Jan 5");
});

test("line shows the due date when there is one", () => {
  assert.equal(line({ id: 3, title: "call bank", done: false, due: "2026-10-28" }), "·  3  call bank  — due Oct 28");
  assert.equal(line({ id: 4, title: "groceries", done: true }), "✓  4  groceries");
});

test("dueDate uses the local calendar day late in the evening", () => {
  const lateEvening = new Date(2026, 10, 27, 23, 30); // Nov 27, 23:30 local
  assert.equal(dueDate("today", lateEvening), "2026-11-27");
  assert.equal(dueDate("tomorrow", lateEvening), "2026-11-28");
  assert.equal(dueDate("next-week", lateEvening), "2026-12-04");
});

test("a bare clock date means local midnight", () => {
  assert.equal(dueDate("today", parseClock("2026-10-27")), "2026-10-27");
});

test("dueDate rejects an invalid clock time", () => {
  assert.throws(() => dueDate("today", new Date("garbage")), /invalid clock time/);
});
