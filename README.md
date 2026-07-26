# @lucid-softworks/promise-filter

Filter array values with synchronous or asynchronous predicates, bounded
concurrency, and stable input ordering.

```ts
import { filterPromises } from "@lucid-softworks/promise-filter";

const existing = await filterPromises(ids, database.has, { concurrency: 8 });
```
