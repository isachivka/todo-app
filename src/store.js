import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dueDate } from "./due.js";

const file = () => process.env.TODO_FILE ?? ".todo.json";

export function load() {
  return existsSync(file()) ? JSON.parse(readFileSync(file(), "utf8")) : [];
}

function save(tasks) {
  writeFileSync(file(), JSON.stringify(tasks, null, 2) + "\n");
}

export function add(title, { due, now }) {
  const tasks = load();
  const task = { id: tasks.length + 1, title, done: false, ...(due && { due: dueDate(due, now) }) };
  tasks.push(task);
  save(tasks);
  return task;
}

export function done(id) {
  const tasks = load();
  const task = tasks.find((t) => t.id === id);
  if (!task) throw new Error(`no task ${id}`);
  task.done = true;
  save(tasks);
  return task;
}
