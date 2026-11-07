# Website

This repository is not the live website source, and nothing here is deployed. It vendors agent skills for Claude Code and Cursor under [`.claude/skills/`](.claude/skills/).

Provenance, licenses, install notes, and the security review are in [`.claude/skills/SOURCES.md`](.claude/skills/SOURCES.md).

## Installed skills

### Leonxlnx/taste-skill

- `design-taste-frontend`

### bergside/awesome-design-skills

`agentic`, `ant`, `artistic`, `basic`, `bento`, `bold`, `brutalism`, `cafe`, `claude`, `claymorphism`, `clean`, `codex`, `colorful`, `contemporary`, `corporate`, `cosmic`, `creative`, `dithered`, `doodle`, `dramatic`, `editorial`, `enterprise`, `expressive`, `fantasy`, `fiction`, `flat`, `friendly`, `futuristic`, `geometric`, `glassmorphism`, `gradient`, `immersive`, `levels`, `lingo`, `material`, `matrix`, `minimal`, `modern`, `mono`, `neobrutalism`, `neon`, `neumorphism`, `pacman`, `paper`, `perspective`, `power`, `premium`, `professional`, `pulse`, `refined`, `retro`, `riso`, `roku`, `sega`, `shadcn`, `sketch`, `skeumorphism`, `sleek`, `spacious`, `square`, `stitch`, `storytelling`, `terracotta`, `tetris`, `typeui-impeccable`, `vibrant`, `vintage`

`claude` and `codex` are design styles from that collection. `typeui-impeccable` is that collection's Impeccable style, renamed so it does not collide with the skill below.

### microsoft/playwright-cli

- `playwright-cli`

### nextlevelbuilder/ui-ux-pro-max-skill

- `banner-design`
- `brand`
- `design`
- `design-system`
- `slides`
- `ui-styling`
- `ui-ux-pro-max`

The `design` skill does not include its logo, icon, or CIP image-generation scripts. Those read `.env` files and call third-party image APIs. See SOURCES.md.

### pbakaus/impeccable

- `impeccable`

### zhaoxuya520/reverse-skill

Nothing from this repository was installed. The pack is offensive-security and CTF guidance, and its bootstrap can install tools and write MCP config. The skipped skill names are listed in SOURCES.md.

## Additional Cursor skills

Ponytail, headroom, and graphify skill files are under [`.cursor/skills/`](.cursor/skills/). What is installed versus left uninstalled is in [docs/skills-setup.md](docs/skills-setup.md).
