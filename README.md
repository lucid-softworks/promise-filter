# @lucid-softworks/promise-filter

Filter array values with synchronous or asynchronous predicates, bounded
concurrency, and stable input ordering.

```ts
import { filterPromises } from "@lucid-softworks/promise-filter";

const ids = ["user-1", "user-2", "user-3"];
const database = new Set(["user-1", "user-3"]);
const existing = await filterPromises(ids, (id) => database.has(id), {
  concurrency: 8,
});
```
