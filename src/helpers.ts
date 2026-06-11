export function getNestedValue<T>(item: T, path: string): unknown {
  return path.split(".").reduce((currentValue: any, key: string) => {
    return currentValue?.[key];
  }, item);
}

export function convertStringToNumber(text: string): number {
  const date = new Date(text);
  const isDate = date.toString() === "Invalid Date";

  if (isDate) return date.getTime();

  const char1 = text.charCodeAt(0) || 0;
  const char2 = text.charCodeAt(1) || 0;
  const char3 = text.charCodeAt(2) || 0;

  return char1 * 10000 + char2 * 100 + char3;
}

export function normalizeToNumeric(value: unknown): number {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    return convertStringToNumber(value.toLowerCase());
  }

  if (value instanceof Date) {
    return value.getTime()
  }

  return 0;
}

export function calculateSortingDelay<T extends object>(
  item: T,
  params: string[],
): number {
  return params.reduce((accumulatedDelay, currentParam, index) => {
    const rawValue = getNestedValue(item, currentParam);
    const numericValue = normalizeToNumeric(rawValue) / 1_000_000_000;

    const weight = Math.pow(100000, params.length - 1 - index);

    return accumulatedDelay + numericValue * weight;
  }, 0);
}

export function clampDelay(delay: number): number {
  const MAX_SET_TIMEOUT_DELAY = 2147483647;
  return Math.min(Math.max(0, delay), MAX_SET_TIMEOUT_DELAY);
}
