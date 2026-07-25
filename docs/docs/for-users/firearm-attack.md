---
title: Firearm Attacks
sidebar_position: 2
---

This walks through what happens when a character fires a personal carried weapon — pistol, rifle, whatever's in their hands. Vehicle-mounted weapons and reloading are their own topics, not covered here.

## Declaring the attack

Pick your weapon's fire mode — manual, semiauto, burst, full-auto, or energy — and how many rounds you're firing, then pick a target. The mode and round count both feed into recoil below, so declare them honestly before you roll.

## Range and target number

Every weapon has four range bands — short, medium, long, extreme — each with its own base target number:

| Band | Base TN |
| --- | --- |
| Short | 4 |
| Medium | 5 |
| Long | 6 |
| Extreme | 9 |

The system measures the distance to your target and picks the band automatically. Some weapons also have a minimum range — get closer than that, and the shot doesn't resolve through the normal band table at all (you're too close for the weapon to be effective at range). Beyond a weapon's extreme band, the target is simply out of range.

## Recoil

Firing more than once in the same combat phase makes follow-up shots harder — that's recoil. A few things shape how much:

- **Manual and energy weapons never suffer recoil.**
- **Semiauto** picks up a flat +1 penalty starting on your second shot of the phase.
- **Burst fire** costs +2 if you're firing exactly two rounds; firing more than that scales up fast.
- **Full-auto** penalty grows with every shot already fired this phase — the more you've sprayed, the worse your next burst gets.
- **Weapon category changes the multiplier**: heavy weapons double the penalty, mounted weapons (vehicle turrets, tripods) halve it, and shotguns firing in burst mode double it too.
- **Recoil compensation** — a property of the weapon itself, sometimes boosted by gear — subtracts from whatever penalty you've built up, down to a minimum of zero.

Recoil resets at the start of a new combat phase, and out of combat it clears itself out after a few seconds between shots — you're not permanently penalized for a burst you fired minutes ago.

## Ammo

Whatever's loaded changes what your shot does on a hit:

- **APDS** — armor-piercing, cuts the target's ballistic armor protection in half.
- **Gel rounds** — less lethal: damage becomes stun instead of physical, and the round hits softer.
- **Tracer** — easier to land a hit with, at the cost of announcing your position.
- **Flechette, incendiary, capsule, tracker** — each applies its own special effect on a hit (spread damage, burning, payload delivery, marking a target), handled case by case rather than through the normal damage math.

Running out of ammo, and reloading, are covered separately — this page assumes the weapon is loaded.

## The defender's response

The default response to a firearm attack is Dodge — a contested roll between your attack and the target's Reaction. This isn't a fixed penalty on either side; both of you roll, and the outcome is decided by comparing successes.

## Damage resistance

If the attack wins the contest, the attacker's net successes carry over into the defender's damage resistance test — the step where armor, Body, and the weapon's power decide how much of that hit actually lands.
