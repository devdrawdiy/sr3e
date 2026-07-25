# StoreManager Utility

## Overview

The StoreManager utility bridges Foundry VTT's document system with Svelte's reactive stores, enabling seamless two-way data synchronization between the backend data model and frontend UI components.

## Files

- **IStoreManager.ts** - TypeScript interface defining the StoreManager contract, with full TSDoc + examples
- **StoreManager.svelte.ts** - Singleton implementation (`StoreManager.Instance`)
- **StoreManager.example.ts** - Usage examples and patterns

## Key Features

- **Bidirectional Sync**: Changes in UI update documents, document changes update UI
- **Reference Counting**: One singleton for the whole game, refcounted per document
- **Hook Management**: Automatic registration and cleanup of Foundry hooks
- **Circular Loop Prevention**: Muting mechanism prevents infinite update loops
- **Multiple Store Types**: Read-write, read-only, derived SimpleStat sum, shallow, and flag stores
- **Type Safety**: Full TypeScript support with generics

## Store Types

All factory methods take the target `document` as the first argument — there is one `StoreManager` singleton (`StoreManager.Instance`) shared across every document, not one instance per document.

### 1. Read-Write Stores (`GetRWStore`)
Bidirectional synchronization between a Foundry document and Svelte UI.
```typescript
const bodyStore = storeManager.GetRWStore<number>(actor, "attributes.body", false);
// Updates both ways: UI <-> Document (actor.system.attributes.body)
```

### 2. Read-Only Stores (`GetROStore`)
Unidirectional data flow from document to UI.
```typescript
const essenceStore = storeManager.GetROStore<number>(actor, "attributes.essence", false);
// Updates one way: Document -> UI
```

### 3. Derived SimpleStat Sum Stores (`GetSimpleStatROStore`)
Sums a SimpleStat's `.value` and `.mod` fields (e.g. attribute + Active Effect bonus).
```typescript
const totalBodyStore = storeManager.GetSimpleStatROStore(actor, "attributes.body");
// totalBodyStore = attributes.body.value + attributes.body.mod
```

### 4. Shallow Stores (`GetShallowStore`)
In-memory UI state, never persisted to the document.
```typescript
const expandedStore = storeManager.GetShallowStore<boolean>(actor, "sectionExpanded", false);
// Perfect for accordion state, tab selection, etc.
```

### 5. Flag Stores (`GetFlagStore`)
Persistent preferences stored in Foundry's flag system.
```typescript
const themeStore = storeManager.GetFlagStore<string>(actor, "theme", "dark");
// Reads via actor.getFlag("sr3e", "theme"); writes via
// actor.update({ "flags.sr3e.theme": value }, { render: false })
```

## Usage Pattern

### In Svelte Components

```typescript
import { onDestroy } from "svelte";
import { StoreManager } from "./StoreManager.svelte";

const storeManager = StoreManager.Instance;
storeManager.Subscribe(actor);

const bodyStore = storeManager.GetRWStore<number>(actor, "attributes.body", false);

onDestroy(() => storeManager.Unsubscribe(actor));
```

### In Svelte Templates

```svelte
<input type="number" bind:value={$bodyStore} />
```

## Implementation Details

### Singleton Pattern
`StoreManager.Instance` is one true singleton for the entire game, managing every subscribed document. Reference counting per document ensures hooks/stores are cleaned up only when the last subscriber for that document disconnects.

### Muting Mechanism
When a store update triggers a document update, that store's key is temporarily muted so the document's update hook doesn't feed the value straight back in and cause a redundant re-set (circular loop prevention).

### Non-Intrusive Updates
Document updates use `{ render: false }` to prevent unnecessary re-renders of the whole sheet, relying instead on Svelte's fine-grained reactivity.

### Hook Lifecycle
Hooks are registered on first subscription and cleaned up when subscriber count reaches zero, preventing memory leaks.

## Architecture

```
+-----------------+
|  Svelte Store   | <--- UI binds to store
+--------+--------+
         |
         | (subscribe)
         v
+-----------------+
|  StoreManager   | <--- Manages lifecycle (singleton)
+--------+--------+
         |
         | (hooks)
         v
+-----------------+
| Foundry Document| <--- Source of truth
+-----------------+
```

## Best Practices

1. **Always unsubscribe** when components are destroyed to prevent memory leaks
2. **Use appropriate store types** for each use case (RW for editable, RO for computed)
3. **Leverage shallow stores** for UI state that shouldn't persist
4. **Use flag stores** for user preferences that should persist across sessions
5. **Pass the document explicitly** to every call — the singleton has no notion of a "current" document

## TypeScript Support

The StoreManager is fully typed with generics to ensure type safety:

```typescript
const bodyStore = storeManager.GetRWStore<number>(actor, "attributes.body");
const nameStore = storeManager.GetRWStore<string>(actor, "profile.name");
```

## See Also

`StoreManager.example.ts` in this folder for runnable end-to-end examples of every store type.
