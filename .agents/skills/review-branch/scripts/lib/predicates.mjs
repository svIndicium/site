// Small, dependency-free type predicates shared by the AI workflow scripts.

export function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function checkKeys(object, allowed, path, errors) {
  for (const key of Object.keys(object)) {
    if (!allowed.includes(key)) errors.push(`${path}: unknown field "${key}"`);
  }
}

export function checkRequired(object, keys, path, errors) {
  for (const key of keys) {
    if (!(key in object))
      errors.push(`${path}: missing required field "${key}"`);
  }
}
