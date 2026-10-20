import { test } from "node:test";
import assert from "node:assert/strict";
import { parse } from "../src/cli.js";
import { shortDate, line } from "../src/format.js";

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
