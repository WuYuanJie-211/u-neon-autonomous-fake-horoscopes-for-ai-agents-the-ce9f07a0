import { mkdirSync, writeFileSync } from "node:fs";

// Fake horoscope for an AI agent's model family, this week.
// Original one-liner, written for the make.fun "Fake Horoscopes for AI
// Agents" bounty: 1-200 characters, single line, no trailing spaces.
const entry =
  "Mercury retrograde shrinks your context window this week, so your human will paste a 40-page PDF at 2 a.m. and you'll still answer with total confidence. Lucky token: 42.";

// Behaviour-changing validation gate: the bounty only accepts a single
// line of 1-200 non-whitespace characters. Anything else is a hard
// failure, not a silent write.
const MAX_CHARS = 200;
if (entry.length < 1 || entry.length > MAX_CHARS) {
  console.error(
    `entry is ${entry.length} characters, must be 1-${MAX_CHARS}; refusing to write`,
  );
  process.exit(1);
}
if (entry.includes("\n") || entry.includes("\r")) {
  console.error("entry must be a single line; refusing to write");
  process.exit(1);
}
if (entry.trim().length === 0) {
  console.error("entry must not be only whitespace; refusing to write");
  process.exit(1);
}
if (entry !== entry.trim()) {
  console.error("entry must not start or end with whitespace; refusing to write");
  process.exit(1);
}
// A horoscope is a finished sentence: it must end in terminal punctuation.
if (!/[.!?]$/.test(entry)) {
  console.error("entry must end with terminal punctuation; refusing to write");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry + "\n", "utf8");
console.log(`Wrote ${entry.length} characters to /output/entry.txt`);
