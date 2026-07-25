# sr3e
<!-- Overview video goes here -->
[![Watch the video](https://img.youtube.com/vi/qKfM4xvRxYo/maxresdefault.jpg)](https://youtu.be/qKfM4xvRxYo)

sr3e is a Shadowrun Third Edition Unofficial game system for Foundry Virtual Tabletop (VTT). In Foundry, a game system is a modular software package that defines the rules, mechanics, and data structures for a specific tabletop role-playing game (TTRPG).

## The project is in Beta

The system is now playable end to end. It is still a hobby project developed in spare time, so expect rough edges, missing rules, and the occasional bug.

## How to install
Provide this link in Foundry VTTs system dialog:
https://github.com/devdrawdiy/sr3e/releases/latest/download/system.json

## Contributing - Help Wanted! 

Code and documentation contributions are very welcome. Small fixes can be submitted as pull requests, while larger changes are best discussed first in an issue or GitHub Discussion. I'm also looking for people interested in sticking around and helping maintain or develop larger parts of the system, so feel free to join the sr3e adventure.

### Bug reports and feature requests

Found a bug, a missing rule, or something behaving is some part of the system acting up? Please submit bug reports feature requests through the the issues tab above. There are ready made templates to fill in that helps mapping out your request.

## Architecture overview

The system follows a four-layer model: Svelte UI -> Service Layer -> IStoreManager -> Foundry VTT. See the [Architecture](https://devdrawdiy.github.io/sr3e/docs/for-developers/architecture) and [Concepts](https://devdrawdiy.github.io/sr3e/docs/for-developers/concepts/store-manager) pages in the docs site for the full pattern.

## Localization

Locale files under `lang/*.json` are generated from TypeScript key declarations, not hand-maintained. See the [localization scaffolding](https://devdrawdiy.github.io/sr3e/docs/for-developers/concepts/localization) page for how to add or translate a string.

## Icon credit

Icons used throughout the system are sourced from [SVG Repo](https://www.svgrepo.com/), an open-source icon repository. Thank you to the artists whose freely licensed work makes this project more presentable, see `textures/svgrepo/` for the icons in use.

## Texture credit

The texture for the character sheet is from https://ambientcg.com/ a shout out and big thank you here too.

## AI-policy

It takes a village to raise a TTRPG system, and I started out as a single VTTRPG-system-dad. Beginning the project in 2024 I created the foundation of the project mostly by hand, to learn the ropes of FVTT. With a CS-degree in game dev front end was never my end goal, so I used this project to explore what I found interesting in frontend and as platform explore and experiment with AI to keep up with the times, and keep an eye on the hype. I have no particular love for AI, but prefer to not be left in the dark.

* Parts of this project's code, documentation, and tooling have been developed with Claude and Codex. This is disclosed in the interest of transparency, in accordance with Foundry VTT best practice. The architecture and questionable hacks are human, implementation details is a mix between human and AI. Contributors may or may not use AI, per personal preference.
* AI-generated "art" and "content" is banned from this project in particular. What happens in your game or unsanctioned compendiums is up to you and your moral framework. 
* The sheet layout and design is entierly my human brain child, with a background that spans fine art and graphic design, I have put in my 10000-hours in that department.

## What is Shadowrun Third Edition

Shadowrun 3rd Edition is a cyberpunk-fantasy tabletop role-playing game set in a dystopian future where magic has returned, blending high-tech with arcane powers. Released in 1998, it refines the core mechanics of its predecessors, focusing on the interplay between hacking, combat, and magical systems. Players take on roles like hackers (deckers), street samurai, or spell-slinging mages, navigating a gritty world dominated by megacorporations, cyber-enhanced mercenaries, and ancient, awakened creatures. The game uses a d6 dice pool system, emphasizing strategic planning and resource management while diving deep into rich lore and immersive world-building.

## What is Foundry VTT?

This system targets Foundry VTT, and can not be built or run without the Foundry VTT software and licence. A VTT (Virtual Tabletop) is a digital platform designed to simulate a tabletop gaming experience online. It allows players to collaborate in role-playing games (RPGs) like Dungeons & Dragons, Pathfinder, or Shadowrun, even if they're geographically separated.

Foundry Virtual Tabletop is a web-based application built primarily with JavaScript, utilizing HTML and CSS for its user interface. It operates on a Node.js server, leveraging Electron to provide a desktop application experience. For data storage, Foundry employs LevelDB, a fast key-value store, to manage game data and assets efficiently.

## Requirements

-  Software
   -  A licenced copy of Foundry Virtual Table Top

## Disclaimer

This project is a fan-made initiative created out of love for the Shadowrun 3rd Edition tabletop RPG. It is developed for personal enjoyment and the enjoyment of other fans.

-  This is an unofficial, non-commercial fan project, and it is not affiliated with or endorsed by the IP owners.
-  This project is designed to complement the original source material. The official rulebooks are required to fully understand and run the game. You may buy your copies here: [Shadowrun at DriveThroughRPG](https://www.drivethrurpg.com/en/product/1893/shadowrun-third-edition) or somwhere else where sold.
-  Shadowrun and all associated intellectual property are owned by their respective copyright holders.
-  The project may be removed from GitHub at any time if requested by the rights holders or for any other reason.

If you are a representative of the rights holders and have concerns about this project, please contact me, and I will address the matter promptly.
