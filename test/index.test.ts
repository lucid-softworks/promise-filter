import { describe, expect, it, vi } from "vitest";

import { filterPromises } from "../src/index.js";

describe("filterPromises", () => {
  it("filters asynchronously in input order with predicate context", async () => {
    const values = [3, 1, 2, 4];
    const predicate = vi.fn<
      (
        value: number,
        index: number,
        input: readonly number[],
      ) => Promise<boolean>
    >(async (value) => value % 2 === 0);
    await expect(filterPromises(values, predicate)).resolves.toEqual([2, 4]);
    expect(predicate).toHaveBeenNthCalledWith(2, 1, 1, values);
  });

  it("forwards explicit concurrency and supports empty input", async () => {
    await expect(
      filterPromises([1, 2], (value) => value > 1, { concurrency: 1 }),
    ).resolves.toEqual([2]);
    await expect(filterPromises([], () => true)).resolves.toEqual([]);
  });

  it("propagates predicate failures", async () => {
    const reason = new Error("failed");
    await expect(
      filterPromises([1], () => Promise.reject(reason)),
    ).rejects.toBe(reason);
  });
});
