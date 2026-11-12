#!/usr/bin/env node
/**
 * Validate a review report against indicium/review/v2.
 *
 * Usage:
 *   node .agents/skills/review-branch/scripts/validate-review.mjs <file> [--issue N] [--head SHA] [--tree SHA]
 *
 * No dependencies. Prints every error and exits 1 on failure.
 */

import { readFileSync } from "node:fs";
import { validate } from "./lib/review-report.mjs";

function usage(message) {
  if (message) console.error(`error: ${message}`);
  console.error(
    "usage: node .agents/skills/review-branch/scripts/validate-review.mjs <file> [--issue N] [--head SHA] [--tree SHA]",
  );
  process.exit(2);
}

function parseArgs(argv) {
  const options = { file: null, issue: null, head: null, tree: null };
  const positional = [];

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--issue" || arg === "--head" || arg === "--tree") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) usage(`${arg} needs a value`);
      i += 1;
      if (arg === "--issue") options.issue = parseIssue(value);
      else if (arg === "--head") options.head = parseHead(value);
      else options.tree = parseTree(value);
    } else if (arg.startsWith("--issue=")) {
      options.issue = parseIssue(arg.slice("--issue=".length));
    } else if (arg.startsWith("--head=")) {
      options.head = parseHead(arg.slice("--head=".length));
    } else if (arg.startsWith("--tree=")) {
      options.tree = parseTree(arg.slice("--tree=".length));
    } else if (arg.startsWith("-")) {
      usage(`unknown option ${arg}`);
    } else {
      positional.push(arg);
    }
  }

  if (positional.length !== 1) usage("expected exactly one review file");

  options.file = positional[0];
  return options;
}

function parseIssue(value) {
  if (!/^[1-9][0-9]*$/.test(value)) usage(`invalid issue number: ${value}`);
  return Number(value);
}

function parseHead(value) {
  if (!/^[0-9a-fA-F]{7,40}$/.test(value)) {
    usage(`invalid head SHA (expected 7-40 hex characters): ${value}`);
  }
  return value.toLowerCase();
}

function parseTree(value) {
  if (!/^[0-9a-fA-F]{40}$/.test(value)) {
    usage(`invalid tree SHA (expected 40 hex characters): ${value}`);
  }
  return value.toLowerCase();
}

const options = parseArgs(process.argv.slice(2));
let text;
try {
  text = readFileSync(options.file, "utf8");
} catch (error) {
  console.error(`error: cannot read ${options.file}: ${error.message}`);
  process.exit(1);
}

let report;
try {
  report = JSON.parse(text);
} catch (error) {
  console.error(`error: ${options.file} is not valid JSON: ${error.message}`);
  process.exit(1);
}

const errors = validate(report, options);
if (errors.length > 0) {
  for (const message of errors) console.error(`error: ${message}`);
  console.error(`\n${errors.length} error(s) in ${options.file}`);
  process.exit(1);
}

console.log(
  `OK ${options.file}: ${report.verdict}, ${report.findings.length} finding(s)`,
);
