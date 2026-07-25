---
title: Localization scaffolding
sidebar_position: 2
---

`lang/*.json` files are generated, not hand-maintained. Every key that exists there comes from a TypeScript declaration under `lang/config/`. A Vite plugin watches those declarations and keeps the JSON in sync — you declare a key once, in TypeScript, and never touch the JSON structure yourself.

## Adding a new translatable string, end to end

**1. Add the key to a `KEYS` array** in the relevant file under `lang/config/`, or create a new one:

```typescript
// lang/config/CommonConfig.ts
export const COMMON_KEYS = [
  "min",
  "average",
  "max",
  "commit",
  "reset", // <- new key
] as const;
```

**2. Wire it into the aggregated map** in `lang/config.ts` — skip this step if you added to an existing category (`COMMON_KEYS` is already wired):

```typescript
// lang/config.ts
export const sr3e = {
  COMMON: createCategory("common", COMMON_KEYS),
  // ...
} as const;
```

**3. Run the build (or dev watch).** `vite-plugins/i18n-scaffold.ts` parses `lang/config/*.ts` and `lang/config.ts` with `ts-morph`, finds every `createCategory("category", KEYS)` call, and merges the resulting key set into **every** `lang/<locale>.json`:

```json
// lang/en.json — before
"common": { "average": "Average", "commit": "Commit", "max": "Max", "min": "Min" }

// lang/en.json — after
"common": { "average": "Average", "commit": "Commit", "max": "Max", "min": "Min", "reset": "Reset" }
```

New keys get a capitalized-key placeholder value (`"reset"` → `"Reset"`) so the string isn't visibly missing while you write the real translation.

**4. Edit the placeholder value** in `lang/en.json` (and any other locale file) to the real display string. That's the only manual JSON edit you make — never restructure the JSON by hand, the plugin owns that shape and will prune anything it doesn't recognize.

**5. Use it from code** through `CONFIG.SR3E.<CATEGORY>.<key>` (typed, from the `sr3e` export in `lang/config.ts`, assigned to `CONFIG.SR3E` at init) and the `localize()` helper:

```typescript
import { localize } from "../../services/utilities";
localize(CONFIG.SR3E.COMMON.reset); // -> "sr3e.common.reset" -> "Reset"
```

## What the plugin actually does

- Watches `lang/config/*.ts` and `lang/config.ts` the same way Vite watches SCSS — any change re-runs the scaffold, including in dev/watch mode.
- Parses the AST rather than importing the modules, so it works without executing TypeScript at build time.
- **Non-destructive merge**: existing translated values are left untouched. Only missing keys are added and orphaned keys (declared in JSON but no longer present in any `KEYS` array) are pruned.
- **Locale-agnostic**: every `lang/<locale>.json` file present gets the same key set merged in, so adding a locale file is enough to have it scaffolded on the next build.
- Keys are sorted alphabetically on write for stable diffs.
- Hashes output before writing, so a build with no actual key changes doesn't touch the file (avoids noisy diffs and rebuild loops in watch mode).

## Why this exists

Hand-maintained locale JSON drifts: keys get added to one locale and forgotten in others, or a component starts referencing a key that was never added anywhere. Declaring the key set in TypeScript makes it type-checked (`CONFIG.SR3E.COMMON.reset` doesn't compile if the key doesn't exist) and keeps every locale file mechanically in sync with what the code actually needs — translating the system becomes "fill in the placeholder values," not "figure out which keys exist and hope none are missing."
