export function isEmpty(value: any) {
  // Check for null or undefined values
  if (value == null) {
    return true;
  }

  // Check for empty string, array, or object
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  // If the value is not null/undefined, string, array, or object, then it's not empty
  return false;
}
