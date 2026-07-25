---
title: Architecture
sidebar_position: 1
---

## System context

sr3e follows a four-layer model:

**Svelte UI → Service Layer → IStoreManager → Foundry VTT**

- **Svelte UI** — actor/item sheets and dialogs are Svelte 5 components. They never touch Foundry documents directly.
- **Service Layer** — rules and business logic (spending points, resolving contests, spawning combat procedures) live in plain TS classes/functions under `module/services/`, free of both Foundry and Svelte concerns.
- **IStoreManager** — the only layer that talks to Foundry's actor/item/effect APIs. UI reads and writes through it instead of calling `document.update()` directly. See the Concepts section for the full pattern.
- **Foundry VTT** — the actual document database, hooks, and rendering host.

Actor and item schemas are defined with DataModels, not a legacy `template.json`.

## Sheets: skip Foundry's renderer, mount Svelte instead

Every actor and item sheet in sr3e extends a thin base class — [`SR3EActorBase`](https://github.com/devdrawdiy/sr3e/blob/main/module/sheets/actors/SR3EActorBase.ts) or [`SR3EItemBase`](https://github.com/devdrawdiy/sr3e/blob/main/module/sheets/items/SR3EItemBase.ts) — over Foundry's `ActorSheetV2`/`ItemSheetV2`. Both follow the same pattern:

1. **`_renderHTML` returns an empty string.** This is the hook ApplicationV2 normally uses to render a Handlebars template. Returning `""` means no template is ever rendered.
2. **`_replaceHTML` mounts a Svelte component** into the window content ApplicationV2 hands it, using Svelte's `mount()`.
3. **Every mounted app is pushed onto `this.apps`.** ApplicationV2 has no built-in concept of "a Svelte app is running here" — `apps` is how the base class knows what to `unmount()` later.
4. **Teardown calls `unmount()`** on everything in `apps`, via `_unmountAllApps()` (called from `close`/`_tearDown`).

Item sheets are the simplest case — one component, no sub-apps:

```typescript
// module/sheets/items/WeaponSheet.ts
export default class WeaponSheet extends SR3EItemBase {
    #app?: SvelteApp;

    protected _replaceHTML(_result, windowContent, _options): void {
        this._unmountAllApps();
        this.#app = mount(WeaponApp, {
            target: windowContent,
            props: { item: this.document as Item },
        });
        this.apps.push(this.#app);
    }
}
```

### Extension point: header sub-app injection

Actor sheets go further — `CharacterSheet.ts` mounts the main sheet component, then injects several independent Svelte apps into the window header (NewsFeed, ShoppingCart, the Neon Name display, the roll composer). Each injector follows the same shape:

```typescript
_injectNewsFeed(header: Element | null) {
    if (!header) return;

    let slot = header.querySelector(".news-feed-position");
    if (!slot) {
        slot = document.createElement("div");
        slot.classList.add("news-feed-position");
        header.insertBefore(slot, header.querySelector(".header-control"));
    }

    if (slot.childNodes.length === 0) {
        this.#newsFeed = mount(NewsFeed, { target: slot });
    }
}
```

Find-or-create a DOM slot by class name, mount into it once, track the mounted instance on the sheet for later `unmount()`. This is the pattern to follow for any new header-level widget: it doesn't need to know about the main sheet component, only about a slot in the header DOM.
