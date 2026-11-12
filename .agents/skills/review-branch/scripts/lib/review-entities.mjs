// Per-entry validators for checks, acceptance criteria, and findings.

import {
  checkKeys,
  checkRequired,
  isNonEmptyString,
  isObject,
} from "./predicates.mjs";
import {
  CATEGORIES,
  CHECK_KEYS,
  CHECK_STATUSES,
  CRITERION_KEYS,
  CRITERION_STATUSES,
  DECISIONS,
  FINDING_KEYS,
  FINDING_STATUSES,
  REQUIRED_FINDING_KEYS,
  SEVERITIES,
} from "./review-schema.mjs";

export function validateCheck(check, index, errors) {
  const path = `checks[${index}]`;
  if (!isObject(check)) {
    errors.push(`${path}: expected an object`);
    return;
  }

  checkKeys(check, CHECK_KEYS, path, errors);
  checkRequired(check, CHECK_KEYS, path, errors);

  if (!isNonEmptyString(check.name))
    errors.push(`${path}.name: expected a non-empty string`);
  if (!isNonEmptyString(check.command)) {
    errors.push(`${path}.command: expected a non-empty string`);
  }
  if (!CHECK_STATUSES.includes(check.status)) {
    errors.push(`${path}.status: expected one of ${CHECK_STATUSES.join(", ")}`);
  }
  if (check.status === "skipped") {
    if (!isNonEmptyString(check.reason)) {
      errors.push(`${path}.reason: skipped checks need a non-empty reason`);
    }
  } else if (check.reason !== null) {
    errors.push(`${path}.reason: must be null unless status is skipped`);
  }
  if (check.exit_code !== null && !Number.isInteger(check.exit_code)) {
    errors.push(`${path}.exit_code: expected an integer or null`);
  }
  if (
    typeof check.duration_seconds !== "number" ||
    !Number.isFinite(check.duration_seconds) ||
    check.duration_seconds < 0
  ) {
    errors.push(`${path}.duration_seconds: expected a number >= 0`);
  }
  if (!isNonEmptyString(check.output_path)) {
    errors.push(`${path}.output_path: expected a non-empty string`);
  }
}

export function validateCriterion(criterion, index, errors) {
  const path = `acceptance_criteria[${index}]`;
  if (!isObject(criterion)) {
    errors.push(`${path}: expected an object`);
    return;
  }

  checkKeys(criterion, CRITERION_KEYS, path, errors);
  checkRequired(criterion, CRITERION_KEYS, path, errors);

  if (!isNonEmptyString(criterion.criterion)) {
    errors.push(`${path}.criterion: expected a non-empty string`);
  }
  if (!CRITERION_STATUSES.includes(criterion.status)) {
    errors.push(
      `${path}.status: expected one of ${CRITERION_STATUSES.join(", ")}`,
    );
  }
  if (!isNonEmptyString(criterion.evidence)) {
    errors.push(`${path}.evidence: expected a non-empty string`);
  }
}

export function validateFinding(finding, index, errors) {
  const path = `findings[${index}]`;
  if (!isObject(finding)) {
    errors.push(`${path}: expected an object`);
    return;
  }

  checkKeys(finding, FINDING_KEYS, path, errors);
  checkRequired(finding, REQUIRED_FINDING_KEYS, path, errors);

  if (!isNonEmptyString(finding.id))
    errors.push(`${path}.id: expected a non-empty string`);
  if (!SEVERITIES.includes(finding.severity)) {
    errors.push(`${path}.severity: expected one of ${SEVERITIES.join(", ")}`);
  }
  if (!CATEGORIES.includes(finding.category)) {
    errors.push(`${path}.category: expected one of ${CATEGORIES.join(", ")}`);
  }
  if (!isNonEmptyString(finding.file)) {
    errors.push(`${path}.file: expected a non-empty string`);
  }
  if (!Number.isInteger(finding.line) || finding.line < 1) {
    errors.push(`${path}.line: expected an integer >= 1`);
  }
  if (finding.end_line !== null) {
    if (!Number.isInteger(finding.end_line) || finding.end_line < 1) {
      errors.push(`${path}.end_line: expected an integer >= 1 or null`);
    } else if (
      Number.isInteger(finding.line) &&
      finding.end_line < finding.line
    ) {
      errors.push(`${path}.end_line: must be >= line`);
    }
  }
  if (finding.symbol !== null && typeof finding.symbol !== "string") {
    errors.push(`${path}.symbol: expected a string or null`);
  }
  for (const key of [
    "title",
    "evidence",
    "why_it_matters",
    "recommendation",
    "verification",
  ]) {
    if (!isNonEmptyString(finding[key])) {
      errors.push(`${path}.${key}: expected a non-empty string`);
    }
  }
  if (
    typeof finding.confidence !== "number" ||
    !Number.isFinite(finding.confidence) ||
    finding.confidence < 0 ||
    finding.confidence > 1
  ) {
    errors.push(`${path}.confidence: expected a number between 0 and 1`);
  }
  if (typeof finding.pre_existing !== "boolean") {
    errors.push(`${path}.pre_existing: expected a boolean`);
  }
  if (!FINDING_STATUSES.includes(finding.status)) {
    errors.push(
      `${path}.status: expected one of ${FINDING_STATUSES.join(", ")}`,
    );
  }
  if (typeof finding.human_review_required !== "boolean") {
    errors.push(`${path}.human_review_required: expected a boolean`);
  }

  const decision = "decision" in finding ? finding.decision : "pending";
  const decisionKnown = DECISIONS.includes(decision);
  if (!decisionKnown) {
    errors.push(`${path}.decision: expected one of ${DECISIONS.join(", ")}`);
  }

  let followUpIssue = null;
  if ("follow_up_issue" in finding) {
    followUpIssue = finding.follow_up_issue;
    if (
      followUpIssue !== null &&
      (!Number.isInteger(followUpIssue) || followUpIssue < 1)
    ) {
      errors.push(`${path}.follow_up_issue: expected an integer >= 1 or null`);
    }
  }
  if (
    "decision_note" in finding &&
    finding.decision_note !== null &&
    typeof finding.decision_note !== "string"
  ) {
    errors.push(`${path}.decision_note: expected a string or null`);
  }

  if (decisionKnown) {
    if (decision === "fix_now" && !["open", "fixed"].includes(finding.status)) {
      errors.push(
        `${path}.decision: "fix_now" requires status "open" or "fixed"`,
      );
    }
    if (decision === "accept" && finding.status !== "accepted") {
      errors.push(`${path}.decision: "accept" requires status "accepted"`);
    }
    if (decision === "false_positive" && finding.status !== "false_positive") {
      errors.push(
        `${path}.decision: "false_positive" requires status "false_positive"`,
      );
    }
    if (decision === "follow_up") {
      if (finding.status !== "accepted") {
        errors.push(`${path}.decision: "follow_up" requires status "accepted"`);
      }
      if (!Number.isInteger(followUpIssue) || followUpIssue < 1) {
        errors.push(
          `${path}.decision: "follow_up" requires an integer follow_up_issue`,
        );
      }
    }
    if (followUpIssue !== null && decision !== "follow_up") {
      errors.push(`${path}.follow_up_issue: requires decision "follow_up"`);
    }
  }
}
