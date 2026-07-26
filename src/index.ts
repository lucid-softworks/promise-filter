import {
  mapPromises,
  type PromiseMapOptions,
} from "@lucid-softworks/promise-map";

export type { PromiseMapOptions } from "@lucid-softworks/promise-map";

export type PromisePredicate<TValue> = (
  value: TValue,
  index: number,
  values: readonly TValue[],
) => boolean | PromiseLike<boolean>;

/** Filters values concurrently while retaining their original order. */
export async function filterPromises<TValue>(
  values: readonly TValue[],
  predicate: PromisePredicate<TValue>,
  options?: PromiseMapOptions,
): Promise<TValue[]> {
  const included =
    options === undefined
      ? await mapPromises(values, predicate)
      : await mapPromises(values, predicate, options);
  return values.filter((_, index) => included[index]);
}
