---
title: Contributing
sidebar_position: 4
---

For build setup, code style, PR flow, and commit conventions, see [`CONTRIBUTING.md`](https://github.com/devdrawdiy/sr3e/blob/main/CONTRIBUTING.md) at the repo root — that stays the canonical source, this page doesn't duplicate it.

## Design philosophy: trust over enforcement

sr3e's default posture toward any new mechanic is:

**Open first. Optional second. Enforced only when it really matters.**

TTRPGs run on trust between the GM and the players at the table. The system should support that, not replace it. Concretely: most rules the system implements are aids, not gates — a dice pool calculated for you, a target number suggested, a resource tracked. Very little of it is designed to stop a GM or player from overriding what the system says, because that override is a legitimate part of how the table actually plays.

Karma spending is the closest thing to an exception — it's tracked and checked because getting it wrong quietly breaks character progression in a way that's hard to notice and annoying to unwind. That's the bar: enforcement earns its place when getting something wrong is expensive to detect or expensive to fix, not because a rule exists to enforce.

### What this means when you're building something

Before adding a hard validation, a lock, an anti-cheat-style check, or anything that stops a user rather than assists them, ask:

- **Is this high-value to lock down**, or is it something a GM would reasonably want to override in play?
- **Would a soft version work instead** — a warning, a default, a visible-but-editable value — rather than a hard block?
- **Is the cost of getting it wrong actually high** (like Karma), or just theoretically incorrect?

If you're not sure, default to open. A feature that lets the table do the wrong thing on purpose is closer to sr3e's values than one that prevents them from doing something the system author didn't anticipate.
