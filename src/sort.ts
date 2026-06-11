import { calculateSortingDelay, clampDelay } from "./helpers";
import { NestedKeyOf } from "./sort.types";

export function sort<T extends object>(
  items: T[],
  ...params: NestedKeyOf<T>[]
): Promise<T[]> {
  return new Promise((resolve) => {
    const sortedItems: T[] = [];

    if (items.length === 0 || params.length === 0) {
      resolve(items);
      return;
    }

    items.forEach((item) => {
      const rawDelay = calculateSortingDelay(item, params as string[]);
      const safeDelay = clampDelay(rawDelay);
      setTimeout(() => {
        sortedItems.push(item);
        if (sortedItems.length === items.length) {
          resolve(sortedItems);
        }
      }, safeDelay);
    });
  });
}
