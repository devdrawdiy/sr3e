---
title: Services
sidebar_position: 3
---

`module/services/` holds sr3e's rules and business logic — the layer between Svelte UI and `IStoreManager`. There's no framework here, just TypeScript. Rather than a folder-by-folder catalog, this page groups services by the pattern they demonstrate, since most new services fit one of three shapes.

## Request/response services

Stateless (or singleton-coordinator) functions/classes that take inputs, apply rules, and return a result — no ongoing lifecycle. Character creation and economy/purchase logic are the clearest examples:

```typescript
// module/services/character-creation/CharacterCreationService.ts
export class CharacterCreationService {
  static #instance: CharacterCreationService | null = null;
  // composes MetatypeRepository, MagicRepository, PriorityValidator, CharacterInitializer...
}
```

```typescript
// module/services/economy/purchase.ts
export function commodityPrice(item: CommodityItem): number { /* ... */ }
export function hasCommodityComponent(item): boolean { /* ... */ }
```

These take plain data or documents in, return a value or mutate a document once, and don't hold open state across calls beyond what a coordinator class caches internally.

`SkillSpendingService` (also character creation) is the same coordinator shape with a documented cost rule baked into its methods rather than scattered across callers — the class owns the formula, callers just ask "what does the next point cost":

```typescript
// module/services/character-creation/SkillSpendingService.ts
// cost = currentValue < linkedAttrRating ? 1 : 2 (all skill types)
export class SkillSpendingService {
  static #instance: SkillSpendingService | null = null;
  static Instance(): SkillSpendingService { /* ... */ }
  // does NOT call storeManager.Subscribe/Unsubscribe - that's the caller's job
}
```

## Orchestration/procedure services

Combat (`module/services/combat/`) is the deepest example of this shape. Rather than one big "resolve an attack" function, each weapon family (melee, firearm) exposes small, pure planning functions that a higher-level composer strings together:

```typescript
// module/services/combat/procedures/meleeFamily.ts
export function planStrike(attacker, weapon, situational = {}): DamagePacket { /* ... */ }
export function prepareMeleeResistance(defender, packet, netAttackSuccesses = 0): ResistanceBuild { /* ... */ }
```

`planStrike` computes a `DamagePacket` from attacker/weapon state; `prepareMeleeResistance` turns that packet into a `ResistanceBuild` for the defender's resistance roll. Each family (`meleeFamily.ts`, `firearmFamily.ts`) implements the same shape — plan, then prepare-resistance — and a composer service sequences them against the actual contest/roll flow. This is intentionally not one class per procedure; it's small pure functions composed by the orchestration layer.

The pattern isn't combat-specific — spellcasting drain resolves the same way, plan-then-resolve, just without a defender's counter-roll:

```typescript
// module/services/spells/spellDrain.ts
export function buildSpellDrainSetup(actor, spell): ProcedureSetup {
  const drainPower = Math.max(2, Math.floor(force / 2) + powerModifier + sustainingDrainPower(actor));
  // ... builds a roll setup targeting drainPower, Willpower dice
  return { kind: "spell-drain", rollState: { /* ... */ }, commitFn: async (roll) => applyDrain(/* ... */) };
}
```

Casting a spell computes its drain power up front (half the spell's Force, plus modifiers), then hands back a `ProcedureSetup` the same shape combat procedures use — a roll to make, and a `commitFn` to apply the outcome once it resolves.

## Realtime/socket services

Two conventions exist side by side, both wrapping Foundry's `game.socket`:

**Class-based dispatch** (`module/services/news-service/NewsSocket.ts`) — a thin bind/unbind wrapper around one socket channel, dispatching by a `type` field on the payload to injected handler callbacks:

```typescript
export class NewsSocket {
  constructor(private readonly socket: any, private readonly handlers: Handlers) {}
  bind(): void { this.socket.on("module.sr3e", (data) => this.#handle(data)); }
  unbind(): void { this.socket?.off("module.sr3e"); }
  #handle(data) { /* switch on data.type */ }
}
```

**Function-based dispatch** (`module/services/combat/orchestration/socketHandlers.ts`) — a single `registerSocketHandlers()` call sets up one `game.socket.on(...)` listener with a discriminated-union payload type, dispatching inline:

```typescript
type SocketPayload =
  | { type: "contestStub"; stub: ContestStub }
  | { type: "contestResponse"; contestId: string; roll: RollSnapshot }
  // ...

export function registerSocketHandlers(): void {
  game.socket.on(SOCKET_EVENT, (payload: unknown) => {
    const p = payload as SocketPayload;
    if (p.type === "contestStub") void handleContestStub(p.stub);
    else if (p.type === "contestResponse") deliverResponse(p.contestId, p.roll);
    // ...
  });
}
```

Both exist to let the GM's client be the authority for state that must agree across all connected players (news ticker broadcasts, contest resolution) — a client mutates local state, broadcasts a socket payload, and every other client's handler applies the same change locally rather than re-deriving it independently.

The combat socket's full payload union gives a sense of how much state actually needs to travel this way: `contestStub`, `contestResponse`, `contestAbort`, `updateChatMessage`, `contestSideUpdate`, `contestDone`, `contestBothDone`, `drainUpdate`, `resistanceUpdate`. Every contested roll, drain, and resistance test in the game touches this one channel — it's the backbone that keeps every connected client's view of a contest in sync, not a narrow one-off.
