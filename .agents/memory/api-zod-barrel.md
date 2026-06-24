---
name: api-zod barrel TS2308
description: Why lib/api-zod/src/index.ts must export only generated zod values, not types
---

The `lib/api-zod` barrel (`src/index.ts`) must contain ONLY:

```ts
export * from "./generated/api";
```

**Why:** The Orval-generated `api.ts` already exports both the zod schema values
and inferred TS types under the same identifiers. Adding a second
`export ... from` for the generated types (or re-exporting types separately)
causes duplicate-identifier errors (TS2308) at the barrel.

**How to apply:** Consumers should import the zod schema *values* from
`@workspace/api-zod` and derive types locally with `z.infer<...>` if needed.
Never re-add a types re-export to the barrel.
