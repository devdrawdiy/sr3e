---
title: IStoreManager pattern
sidebar_position: 1
---

`IStoreManager` is the only layer in sr3e allowed to talk to Foundry's actor/item/effect APIs. Svelte components never call `document.update()` — they read and write through a store returned by `StoreManager.Instance`, and the singleton keeps that store in sync with the underlying document via Foundry hooks.

## Getting a manager

There is one `StoreManager` for the whole game, not one per document:

```typescript
import { StoreManager } from "../../utilities/StoreManager.svelte";

const storeManager = StoreManager.Instance;
```

## Subscribing

Before creating any store for a document, subscribe to it. This registers Foundry hooks (`update<DocType>`, Active Effect create/update/delete, and — for actors — `actorSystemRecalculated`) the first time a document is subscribed, and reference-counts every subsequent call:

```typescript
storeManager.Subscribe(actor);
// ... later, typically in onDestroy ...
storeManager.Unsubscribe(actor);
```

Hooks and cached stores for a document are only torn down once its subscriber count reaches zero — safe to call `Subscribe` from every component that touches the document without worrying about duplicate hook registration.

## Store types

| Method | Direction | Persisted? | Use for |
| --- | --- | --- | --- |
| `GetRWStore(doc, path, isRoot?)` | UI ↔ Document | Yes | Editable fields (`system.attributes.body`) |
| `GetROStore(doc, path, isRoot?)` | Document → UI | Yes (read side) | Computed/derived fields the UI shouldn't edit |
| `GetSimpleStatROStore(doc, path)` | Document → UI | Yes (read side) | `.value + .mod` sum for a SimpleStat, cached per document+path |
| `GetShallowStore(doc, name, initial)` | UI only | No | Transient UI state (accordion open/closed, active tab) |
| `GetFlagStore(doc, flagName, initial)` | UI ↔ `flags.sr3e.*` | Yes | Persisted user preferences |

`path` omits the `system.` prefix by default — `GetRWStore(actor, "attributes.body", false)` reads/writes `actor.system.attributes.body`. Pass `isRoot: true` to use the path as-is (e.g. for `flags` or other root-level fields addressed through `GetRWStore` directly).

```typescript
// Editable attribute, bidirectional sync
const bodyStore = storeManager.GetRWStore<number>(actor, "attributes.body", false);

// Attribute + Active Effect bonus, summed and cached
const totalBodyStore = storeManager.GetSimpleStatROStore(actor, "attributes.body");

// Accordion state, never touches the document
const expandedStore = storeManager.GetShallowStore<boolean>(actor, "skillsExpanded", true);

// Persisted preference
const themeStore = storeManager.GetFlagStore<string>(actor, "theme", "dark");
```

## Why `GetSimpleStatROStore` exists

Attributes and pools can carry both a base `.value` and a `.mod` from Active Effects. A naive derived store built directly from an effect-bearing field risks infinite recursion when the effect itself depends on the recalculated total. `GetSimpleStatROStore` sidesteps this by deriving from the two underlying `GetRWStore` calls (`${path}.value`, `${path}.mod`) instead, and caches the result per document+path so repeated calls for the same stat return the same store.

## What it won't do for you

`IStoreManager` provides reactive access and writes back via `document.update()` — it does not validate values or enforce rules. Validation and business logic belong in the service layer (procedures, spending services), which read/write through the same stores rather than bypassing them.

## Full usage example

```typescript
import { onDestroy } from "svelte";
import { StoreManager } from "../../utilities/StoreManager.svelte";

const storeManager = StoreManager.Instance;
storeManager.Subscribe(actor);

const bodyStore = storeManager.GetRWStore<number>(actor, "attributes.body", false);

onDestroy(() => storeManager.Unsubscribe(actor));
```

```svelte
<input type="number" bind:value={$bodyStore} />
```

See `module/utilities/StoreManager.example.ts` for further runnable examples covering reference counting and multi-document usage.
