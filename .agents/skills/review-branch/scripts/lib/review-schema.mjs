// Wire contract constants and top-level field checks for indicium/review/v2.

import {
  checkKeys,
  checkRequired,
  isNonEmptyString,
  isObject,
} from "./predicates.mjs";

export const SCHEMA = "indicium/review/v2";
export const RETIRED_V1_MESSAGE =
  "review/v1 is retired; rerun /review-branch with the v2 contract";

export const BRANCH_RE =
  /^(feat|fix|chore|docs|refactor|test|perf|ci|build)\/[1-9][0-9]*-[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const HEAD_RE = /^[0-9a-f]{40}$/;
export const TREE_RE = /^[0-9a-f]{40}$/;
export const DATE_TIME_RE =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

export const MODES = ["staged", "committed"];

export const TOP_KEYS = [
  "schema",
  "issue",
  "branch",
  "base",
  "mode",
  "reviewed_head",
  "reviewed_tree",
  "generated_at",
  "agent",
  "verdict",
  "checks",
  "acceptance_criteria",
  "findings",
  "summary",
  "human_review_required",
  "triage",
];

export const REQUIRED_TOP_KEYS = TOP_KEYS.filter((key) => key !== "triage");

export const CHECK_KEYS = [
  "name",
  "command",
  "status",
  "reason",
  "exit_code",
  "duration_seconds",
  "output_path",
];

export const CRITERION_KEYS = ["criterion", "status", "evidence"];

export const FINDING_KEYS = [
  "id",
  "severity",
  "category",
  "file",
  "line",
  "end_line",
  "symbol",
  "title",
  "evidence",
  "why_it_matters",
  "recommendation",
  "confidence",
  "pre_existing",
  "status",
  "verification",
  "human_review_required",
  "decision",
  "follow_up_issue",
  "decision_note",
];

export const REQUIRED_FINDING_KEYS = FINDING_KEYS.filter(
  (key) =>
    key !== "decision" && key !== "follow_up_issue" && key !== "decision_note",
);

export const TRIAGE_KEYS = ["decided_at", "verdict_before"];

export const VERDICTS = [
  "pass",
  "pass_with_findings",
  "changes_requested",
  "blocked",
];
export const SEVERITIES = ["blocker", "major", "minor", "nit"];
export const CATEGORIES = [
  "correctness",
  "security",
  "performance",
  "tests",
  "docs",
  "style",
  "scope",
  "other",
];
export const FINDING_STATUSES = ["open", "fixed", "accepted", "false_positive"];
export const DECISIONS = [
  "pending",
  "fix_now",
  "accept",
  "false_positive",
  "follow_up",
];
export const CRITERION_STATUSES = ["met", "unmet", "unverified", "waived"];
export const CHECK_STATUSES = ["pass", "fail", "skipped"];

export function isDateTime(value) {
  return (
    typeof value === "string" &&
    DATE_TIME_RE.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

export function isRetiredV1(report) {
  return (
    report.schema === "indicium/review/v1" ||
    (!("schema" in report) && ("head" in report || "staged_tree" in report))
  );
}

function validateTriage(triage, errors) {
  if (!isObject(triage)) {
    errors.push("report.triage: expected an object");
    return;
  }

  checkKeys(triage, TRIAGE_KEYS, "report.triage", errors);
  checkRequired(triage, TRIAGE_KEYS, "report.triage", errors);

  if (!isDateTime(triage.decided_at)) {
    errors.push("report.triage.decided_at: expected an ISO-8601 date-time");
  }
  if (!VERDICTS.includes(triage.verdict_before)) {
    errors.push(
      `report.triage.verdict_before: expected one of ${VERDICTS.join(", ")}`,
    );
  }
}

export function validateReportFields(report, options, errors) {
  if (report.schema !== SCHEMA) {
    errors.push(`report.schema: expected "${SCHEMA}"`);
  }
  if (!Number.isInteger(report.issue) || report.issue < 1) {
    errors.push("report.issue: expected an integer >= 1");
  } else if (options.issue !== null && report.issue !== options.issue) {
    errors.push(
      `report.issue: ${report.issue} does not match --issue ${options.issue}`,
    );
  }
  if (typeof report.branch !== "string" || !BRANCH_RE.test(report.branch)) {
    errors.push(
      "report.branch: expected <type>/<issue>-<slug>, e.g. feat/42-passkey-login",
    );
  } else {
    const branchIssue = Number(report.branch.split("/")[1].split("-")[0]);
    if (Number.isInteger(report.issue) && report.issue !== branchIssue) {
      errors.push(
        `report.issue: ${report.issue} does not match branch #${branchIssue}`,
      );
    }
  }
  if (!isNonEmptyString(report.base)) {
    errors.push("report.base: expected a non-empty string");
  }
  if (!MODES.includes(report.mode)) {
    errors.push(`report.mode: expected one of ${MODES.join(", ")}`);
  }
  if (
    typeof report.reviewed_head !== "string" ||
    !HEAD_RE.test(report.reviewed_head)
  ) {
    errors.push(
      "report.reviewed_head: expected a 40-character lowercase commit SHA",
    );
  } else if (options.head !== null) {
    const actual = report.reviewed_head;
    const expected = options.head;
    if (
      actual !== expected &&
      !actual.startsWith(expected) &&
      !expected.startsWith(actual)
    ) {
      errors.push(
        `report.reviewed_head: ${actual} does not match --head ${options.head}`,
      );
    }
  }
  if (
    typeof report.reviewed_tree !== "string" ||
    !TREE_RE.test(report.reviewed_tree)
  ) {
    errors.push(
      "report.reviewed_tree: expected a 40-character lowercase tree SHA",
    );
  } else if (options.tree !== null && report.reviewed_tree !== options.tree) {
    errors.push(
      `report.reviewed_tree: ${report.reviewed_tree} does not match --tree ${options.tree}`,
    );
  }
  if (!isDateTime(report.generated_at)) {
    errors.push("report.generated_at: expected an ISO-8601 date-time");
  }
  if (!isNonEmptyString(report.agent)) {
    errors.push("report.agent: expected a non-empty string");
  }
  if (!VERDICTS.includes(report.verdict)) {
    errors.push(`report.verdict: expected one of ${VERDICTS.join(", ")}`);
  }
  if (!isNonEmptyString(report.summary)) {
    errors.push("report.summary: expected a non-empty string");
  }
  if (typeof report.human_review_required !== "boolean") {
    errors.push("report.human_review_required: expected a boolean");
  }
  if ("triage" in report) validateTriage(report.triage, errors);
}
