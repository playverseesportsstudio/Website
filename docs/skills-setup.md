# Skills setup inventory

Repository-scoped Cursor skills only. No website, UI kit, design-system implementation, deployment, DNS, merge, or running services.

Cursor loads project skills from `.cursor/skills/<name>/SKILL.md` and from `.agents/skills/`. These files live only under `.cursor/skills/` so the same skill is not discovered twice. There are no symlinks. `SKILL.md` bytes match the upstream file cited below. Each directory has `PROVENANCE.txt` plus the upstream licence.

Skills were not executed. Graphify reference bodies were not loaded for content review; only their relative links were checked.

## Playverse-OS skills — blocked, not installed

Named skills: `banner-design`, `brand`, `design`, `design-system`, `design-taste-frontend`, `hallmark`, `slides`, `ui-styling`, `ui-ux-pro-max`.

Source `https://github.com/playverseesportsstudio/Playverse-OS` is not readable from this run:

- `GET https://api.github.com/repos/playverseesportsstudio/Playverse-OS` returned **404 Not Found** with this run's GitHub token and without auth.
- `git ls-remote` returned **repository not found**.
- No local checkout, `.agents`, `.cursor`, or `skills-lock.json` was available.

The lockfile was not used as proof of installation. The nine skills were not replaced from public skill registries. Nothing from Playverse-OS was copied.

## Installed skill files

| Skill | Status | Source commit | Upstream path |
| --- | --- | --- | --- |
| `ponytail` | Installed (markdown). Hooks and always-on rule not installed. | [`96608e078b2d5ea607c5c3b8b5a54d1c1fba6846`](https://github.com/DietrichGebert/ponytail/commit/96608e078b2d5ea607c5c3b8b5a54d1c1fba6846) (2026-10-29, package 5.3.3) | `skills/ponytail/SKILL.md` |
| `ponytail-review` | Installed (markdown). | same | `skills/ponytail-review/SKILL.md` |
| `ponytail-audit` | Installed (markdown). | same | `skills/ponytail-audit/SKILL.md` |
| `ponytail-debt` | Installed (markdown). | same | `skills/ponytail-debt/SKILL.md` |
| `ponytail-gain` | Installed (markdown). | same | `skills/ponytail-gain/SKILL.md` |
| `ponytail-help` | Installed (markdown). | same | `skills/ponytail-help/SKILL.md` |
| `headroom` | Installed (markdown). Python/npm package not installed. | [`12864fc8f01a1ca6c58440eccef0dabdd3e595b8`](https://github.com/headroomlabs-ai/headroom/commit/12864fc8f01a1ca6c58440eccef0dabdd3e595b8) (2026-11-06, plugin manifest 0.43.1) | `skills/headroom/SKILL.md` |
| `graphify` | Skill files installed. CLI, graph, hooks, and always-on rule not installed. Not operational. | [`16218bfc80d4ca2799734d045039f7ed1a5fa9fb`](https://github.com/Graphify-Labs/graphify/commit/16218bfc80d4ca2799734d045039f7ed1a5fa9fb) (tag `v0.9.103`, 2026-11-05, package `graphifyy` 0.9.103) | `graphify/skill-agents.md` plus `graphify/skills/agents/references/` |

No duplicate skill names among the eight installed skills. No name collision with the nine blocked Playverse-OS skills, because those files are absent.

## Ponytail

https://github.com/DietrichGebert/ponytail — MIT, copyright 2026 Dietrich Gebert. `LICENSE` is copied into each skill directory.

The six `SKILL.md` files are self-contained. They do not link to other repo files. Upstream documents them as the skills install (`npx skills add DietrichGebert/ponytail`). They do not need Node.

Not installed, on purpose:

- `node scripts/cursor-hooks.js`, which writes Cursor `hooks.json` and expects a persistent checkout of the ponytail repo on `PATH` for `node`.
- Always-on `.cursor/rules/ponytail.mdc` and root `AGENTS.md`. Those are a separate adapter from the skills. This repo does not force ponytail on every turn.
- npm package, statusline, user config, and Claude Code band.

No extra runtime is required to read the skills. They are instruction text.

## Headroom

https://github.com/headroomlabs-ai/headroom — Apache-2.0. `LICENSE` and `NOTICE` are in `.cursor/skills/headroom/`. Copyright 2025 Headroom Contributors. `NOTICE` also lists third-party libraries of the Headroom product; those libraries were not vendored.

The skill file is the published agent skill. Both copies in the source repo are the same bytes (sha256 `75d8348ff7ef38f7c2697ecfc406c7c2f6264ecc043ade8b1e95a7234b9bda32`). It has no local relative links. It does not claim the package is already installed.

Not installed:

- `pip install headroom-ai` (in-process Python `compress()`).
- `headroom-ai[proxy]` and `headroom proxy` (required for the TypeScript SDK path).
- `uv tool install --python 3.13 "headroom-ai[all]"` and `headroom wrap` (agent proxy). That needs Python 3.13, can pull a large extra set, and can start a local proxy. The skill says not to install `[all]` or `[ml]` unless asked.
- MCP, Docker, OAuth plugin, and hooks.

Unmet requirement before the skill can change an app: install `headroom-ai` in that app. The upstream skill says `HEADROOM_OFFLINE=1` blocks the package update check, model and pricing-table downloads, and beacon. This setup did not install the package, so that telemetry path was not started.

## Graphify

https://github.com/Graphify-Labs/graphify — Apache-2.0, with `LICENSE-MIT` retained for portions contributed under MIT before relicensing. Copyright 2026 Safi Shamsi and the Graphify contributors. Licence files are in `.cursor/skills/graphify/`.

Cursor's own installer (`graphify cursor install`) does not write a `SKILL.md`. It writes `.cursor/rules/graphify.mdc` with `alwaysApply: true`, and that rule tells the agent to run `graphify query` before exploration and `graphify update` after code edits. That rule was not added. It needs the CLI on `PATH`, and it would require graph generation, which this task forbids.

What was added is the generic project skill from `graphify install --project --platform agents`: `skill-agents.md` renamed to `SKILL.md`, with the eight `references/` files the body links to. Those links resolve. No reference link points outside the skill directory.

Unmet requirements (skill is not operational):

- Python 3.12 or newer, plus `uv` or `pipx`.
- `uv tool install graphifyy` or `pipx install graphifyy` (package `graphifyy` 0.9.103 at this commit). This is a large Python tool (`uv.lock` in the source repo). It was not installed.
- Optional and not installed: Whisper models, Neo4j, FalkorDB, MCP server, git post-commit hook (`references/hooks.md` is documentation only; no hook was registered).

The skill text tells an agent that invokes `/graphify` to install `graphifyy` if import fails and then build `graphify-out/`. Do not run that under the current constraint. No graph was generated.

## Validation

Checked on this branch, without running the skills:

- Eight `SKILL.md` files, each with YAML frontmatter `name` equal to its directory name, and a description.
- Skill names are unique. No second `.agents/skills` or `.claude/skills` copy.
- Zero symlinks under `.cursor/skills`.
- `SKILL.md` sha256 matches the upstream file for all eight skills. Graphify `references/*.md` checksums match `graphify/skills/agents/references/`.
- Markdown relative links in each `SKILL.md` and in `graphify/references/*.md` exist and stay inside that skill directory. Result: 0 dangling links.
- No `.env`, key, or pem files were copied.

Not done: Cursor Settings UI slash-command check, executing ponytail/headroom/graphify, installing their packages, or reading every reference for a design review.

## Repo bootstrap

`playverseesportsstudio/Website` `main` is not an empty Git repository. It already has commit `e4da1bb` (`Initial commit`) and `README.md`. This work is a normal branch and pull request. `main` was not force-pushed and was not merged.
