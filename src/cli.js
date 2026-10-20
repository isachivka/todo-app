import { now } from "./clock.js";
import { add, done, load } from "./store.js";
import { line } from "./format.js";

export function parse(args) {
  const [cmd = "list", ...rest] = args;
  const opts = { words: [] };
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === "--due") opts.due = rest[++i];
    else opts.words.push(rest[i]);
  }
  return { cmd, ...opts };
}

export function main(args) {
  const { cmd, words, due } = parse(args);
  switch (cmd) {
    case "add": {
      const t = add(words.join(" "), { due, now: now() });
      console.log(line(t));
      break;
    }
    case "done":
      console.log(line(done(Number(words[0]))));
      break;
    case "list":
      for (const t of load()) console.log(line(t));
      break;
    case "now": {
      const n = now();
      const date = n.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const time = n.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
      console.log(`${date}, ${time} (${Intl.DateTimeFormat().resolvedOptions().timeZone.split("/").pop().replace("_", " ")})`);
      break;
    }
    default:
      console.error(`usage: todo add <title> [--due today|tomorrow|next-week|YYYY-MM-DD] | list | done <id> | now`);
      process.exitCode = 2;
  }
}
