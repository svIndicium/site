// Report-level validation: array shape, duplicate detection, and cross-field
// verdict rules for indicium/review/v2.

import {
  checkKeys,
  checkRequired,
  isNonEmptyString,
  isObject,
} from "./predicates.mjs";
import {
  validateCheck,
  validateCriterion,
  validateFinding,
} from "./review-entities.mjs";
import {
  isRetiredV1,
  REQUIRED_TOP_KEYS,
  RETIRED_V1_MESSAGE,
  TOP_KEYS,
  validateReportFields,
} from "./review-schema.mjs";

export function validate(report, options) {
  const errors = [];

  if (!isObject(report)) {
    return ["report: expected a JSON object"];
  }

  // Retired artifacts get one actionable message instead of a wall of
  // missing-field errors.
  if (isRetiredV1(report)) {
    return [RETIRED_V1_MESSAGE];
  }

  checkKeys(report, TOP_KEYS, "report", errors);
  checkRequired(report, REQUIRED_TOP_KEYS, "report", errors);

  validateReportFields(report, options, errors);

  if (!Array.isArray(report.checks)) {
    errors.push("report.checks: expected an array");
  } else {
    const seenCheckNames = new Set();
    report.checks.forEach((check, index) => {
      validateCheck(check, index, errors);
      if (isObject(check) && isNonEmptyString(check.name)) {
        if (seenCheckNames.has(check.name)) {
          errors.push(`checks[${index}].name: duplicate check "${check.name}"`);
        }
        seenCheckNames.add(check.name);
      }
    });
  }

  if (!Array.isArray(report.acceptance_criteria)) {
    errors.push("report.acceptance_criteria: expected an array");
  } else {
    report.acceptance_criteria.forEach((criterion, index) =>
      validateCriterion(criterion, index, errors),
    );
  }

  const findings = Array.isArray(report.findings) ? report.findings : [];
  if (!Array.isArray(report.findings)) {
    errors.push("report.findings: expected an array");
  } else {
    const seen = new Set();
    findings.forEach((finding, index) => {
      validateFinding(finding, index, errors);
      if (isObject(finding) && isNonEmptyString(finding.id)) {
        if (seen.has(finding.id)) {
          errors.push(`findings[${index}].id: duplicate id "${finding.id}"`);
        }
        seen.add(finding.id);
      }
    });
  }

  const openBlocking = findings.filter(
    (finding) =>
      isObject(finding) &&
      finding.status === "open" &&
      (finding.severity === "blocker" || finding.severity === "major"),
  );

  if (report.verdict === "changes_requested" && openBlocking.length === 0) {
    errors.push(
      'report.verdict: "changes_requested" requires at least one open blocker/major finding',
    );
  }
  if (
    (report.verdict === "pass" || report.verdict === "pass_with_findings") &&
    openBlocking.length > 0
  ) {
    errors.push(
      `report.verdict: "${report.verdict}" cannot have open blocker/major findings`,
    );
  }

  const criteria = Array.isArray(report.acceptance_criteria)
    ? report.acceptance_criteria
    : [];
  const unresolvedCriteria = criteria.filter(
    (criterion) =>
      isObject(criterion) && !["met", "waived"].includes(criterion.status),
  );
  const checks = Array.isArray(report.checks) ? report.checks : [];
  const failedChecks = checks.filter(
    (check) => isObject(check) && check.status === "fail",
  );
  const lintChecks = checks.filter(
    (check) => isObject(check) && check.name === "lint",
  );

  if (
    (report.verdict === "pass" || report.verdict === "pass_with_findings") &&
    checks.length === 0
  ) {
    errors.push(
      `report.verdict: "${report.verdict}" requires at least one check`,
    );
  }
  if (
    (report.verdict === "pass" || report.verdict === "pass_with_findings") &&
    (lintChecks.length === 0 ||
      lintChecks.some((check) => check.status !== "pass"))
  ) {
    errors.push(
      `report.verdict: "${report.verdict}" requires a passing lint check`,
    );
  }

  if (
    (report.verdict === "pass" || report.verdict === "pass_with_findings") &&
    unresolvedCriteria.length > 0
  ) {
    errors.push(
      `report.verdict: "${report.verdict}" requires every acceptance criterion to be met or waived`,
    );
  }
  if (
    (report.verdict === "pass" || report.verdict === "pass_with_findings") &&
    failedChecks.length > 0
  ) {
    errors.push(
      `report.verdict: "${report.verdict}" cannot have failed checks`,
    );
  }
  if (report.verdict !== "blocked" && criteria.length === 0) {
    errors.push(
      'report.verdict: an empty acceptance_criteria list requires "blocked"',
    );
  }

  if (
    report.human_review_required === false &&
    findings.some(
      (finding) => isObject(finding) && finding.human_review_required === true,
    )
  ) {
    errors.push(
      "report.human_review_required: must be true when a finding requires human review",
    );
  }

  return errors;
}
