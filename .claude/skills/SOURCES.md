# Skill sources

Skills in this directory were copied from public GitHub repositories on 2026-11-07. They are files, not git submodules. Claude Code and Cursor both read `.claude/skills/`.

No hook config, settings file, or MCP config was added. Nothing in this tree is wired to run on its own.

Upstream docs sometimes name another install path (`~/.claude/skills/`, `~/.cursor/skills/`, or a tool-specific folder such as `.agents/skills/`). Those paths were not used. Everything installed here lives under `.claude/skills/<skill-name>/`.

## Installed

### [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)

- Commit: `f6b76575f949707b4e3c37cd86cb44b0b98643e8` (2026-11-07)
- License: MIT. `LICENSE` is in the skill folder.
- Install note: `./install.sh` symlinks the skill into `~/.claude/skills/` using the frontmatter name. This copy uses that name in the project tree instead of a symlink.

| Skill | Source folder |
| --- | --- |
| `design-taste-frontend` | `skills/taste-skill/` |

### [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills)

- Commit: `f631a09b4fcc0166f2e2c1a8c81906ef680c57e8` (2026-06-28)
- License: MIT. `LICENSE` is in each skill folder.
- Install note: the repo is a collection of style skills under `skills/`. Each directory that contains a `SKILL.md` was copied. `registry-examples/` was not.

`agentic`, `ant`, `artistic`, `basic`, `bento`, `bold`, `brutalism`, `cafe`, `claude`, `claymorphism`, `clean`, `codex`, `colorful`, `contemporary`, `corporate`, `cosmic`, `creative`, `dithered`, `doodle`, `dramatic`, `editorial`, `enterprise`, `expressive`, `fantasy`, `fiction`, `flat`, `friendly`, `futuristic`, `geometric`, `glassmorphism`, `gradient`, `immersive`, `levels`, `lingo`, `material`, `matrix`, `minimal`, `modern`, `mono`, `neobrutalism`, `neon`, `neumorphism`, `pacman`, `paper`, `perspective`, `power`, `premium`, `professional`, `pulse`, `refined`, `retro`, `riso`, `roku`, `sega`, `shadcn`, `sketch`, `skeumorphism`, `sleek`, `spacious`, `square`, `stitch`, `storytelling`, `terracotta`, `tetris`, `typeui-impeccable`, `vibrant`, `vintage`.

`claude` and `codex` are visual-style skills from this collection. `typeui-impeccable` is the upstream `skills/impeccable/` style (typeui.sh). Its folder and `name` were changed so it does not collide with `impeccable` from pbakaus/impeccable.

### [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli)

- Commit: `4bc00fb7fa5b4329f2fb53ac4743a066c2c664e8` (2026-11-05)
- License: Apache-2.0. `LICENSE` is in the skill folder. The repo has no `NOTICE` file.
- Install note: upstream installs this skill with `playwright-cli install --skills`. The published skill is `skills/playwright-cli/`.

| Skill | Source folder |
| --- | --- |
| `playwright-cli` | `skills/playwright-cli/` |

Not installed, because they are maintainer workflows for the playwright-cli repository rather than the published skill:

- `.claude/skills/dev`
- `.claude/skills/playwright-triage` (unattended issue-triage workflow)

The CLI package itself was not copied.

### [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

- Commit: `b7d5353e0130feb8c5574ef1251f8a1db1873ccb` (2026-11-05)
- License: MIT. `LICENSE` is in each skill folder. `ui-styling` also ships the upstream `LICENSE.txt` (Apache-2.0 boilerplate). Its frontmatter says MIT.
- Install note: upstream prefers `uipro init --ai claude`, which writes `.claude/skills/`. The committed skill tree is `.claude/skills/`. `cli/assets/skills/` is the same set without `ui-ux-pro-max`, so the `.claude` copy was used. Pytest `.coverage` was left out.

| Skill | Source folder |
| --- | --- |
| `banner-design` | `.claude/skills/banner-design/` |
| `brand` | `.claude/skills/brand/` |
| `design` | `.claude/skills/design/` |
| `design-system` | `.claude/skills/design-system/` |
| `slides` | `.claude/skills/slides/` |
| `ui-styling` | `.claude/skills/ui-styling/` |
| `ui-ux-pro-max` | `.claude/skills/ui-ux-pro-max/` |

Left out of `design` (see Security review):

- `scripts/logo/generate.py`
- `scripts/icon/generate.py`
- `scripts/cip/generate.py`
- `scripts/logo/tests/test_generate.py`
- `scripts/tests/test_cip_generate.py`
- `scripts/tests/test_icon_generate.py`

### [pbakaus/impeccable](https://github.com/pbakaus/impeccable)

- Commit: `687bc381bc9091bf252c0a05303640561014a425` (2026-11-06)
- License: Apache-2.0. `LICENSE` and `NOTICE.md` are in the skill folder.
- Install note: `npx impeccable install` can also install a design hook and per-tool copies. Manual install, which this copy follows, is `cp -r .claude/skills/impeccable` into the project. The hook was not installed. The same skill is duplicated for other agents in that repo; only the `.claude/skills/impeccable/` copy is here.

| Skill | Source folder |
| --- | --- |
| `impeccable` | `.claude/skills/impeccable/` |

## Security review

Reviewed shell, Python, and JavaScript under each installed skill before commit. Looked for unexpected network hosts, credential or environment reads, obfuscation, destructive commands, and auto-run hooks.

Kept, with these notes:

- `design-taste-frontend` scripts talk to the local machine when someone runs them: a loopback static server and the local Chrome DevTools port. Optional network, only from those scripts, goes to documented hosts: `cdn.jsdelivr.net` (pinned icon packages), `commons.wikimedia.org` and `upload.wikimedia.org`, `picsum.photos`, and `fonts.googleapis.com` / `fonts.gstatic.com`. They read `CHROME_PATH` and similar path variables to find a browser. The upstream `SKILL.md` `hooks.Stop` block, which exec'd `scripts/gate.mjs` after a turn, was removed.
- `awesome-design-skills` entries are Markdown and one JSON file. No scripts.
- `playwright-cli` is Markdown command guidance for the Playwright CLI. No scripts in the skill folder.
- `ui-ux-pro-max` search scripts use the local CSV data and do not make network calls. `design-system/scripts/fetch-background.py` returns curated `images.pexels.com` URLs and does not download them. `ui-styling/scripts/shadcn_add.py` runs `npx shadcn@<version> add` only when that script is invoked. `brand/scripts/sync-brand-to-tokens.cjs` runs `node` on the sibling `generate-tokens.cjs` with fixed arguments.
- `impeccable/scripts/impeccable` (and `impeccable.cmd`) can download a platform engine from `https://github.com/pbakaus/impeccable/releases/download` when the skill is used and no local binary is present. The download is refused unless `engine-checksums.txt` has a sha256 for that exact version. `scripts/live-browser.js` talks only to `http://localhost`. `reference/hooks.md` documents an optional detector hook. That hook is not installed. It runs only if someone later invokes the skill's hooks command.

Removed or not installed:

- `design` image generators `logo/generate.py`, `icon/generate.py`, and `cip/generate.py`. Each calls `load_env()` and reads every key from a `.env` next to the skill, `~/.claude/skills/.env`, and `~/.claude/.env`, then uses `GEMINI_API_KEY`, `GOOGLE_API_KEY`, `ATLASCLOUD_API_KEY`, or `MUAPI_API_KEY`. Logo generation also POSTs to `https://api.atlascloud.ai` and `https://api.muapi.ai`. Their tests were left out with them. The local search, core, and HTML render helpers remain. `design/SKILL.md` tells the agent not to recreate the generators.
- All of [zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill) at `cab634bd855fc287f6e420c1f36fd1a6b9245960` (2026-09-22, MIT). See below.

## Skipped: reverse-skill

None of this repository was installed. It is an offensive-security and CTF skill pack, and its installer is not safe to vendor.

`skills/scripts/bootstrap-reverse.sh` installs packages, can start services, and can write Claude and Codex MCP config (`~/.claude/mcp.json` and Codex `config.toml`). Skill scripts also include Frida runners, APK rebuild/sign/install, and IDA autostart. Skill text is operational attack guidance: exploitation, credential and token access, malware handling, EDR bypass, and CTF solve workflows. That includes `pentest-tools/src-hunter` (SQLi, XSS, RCE, SSRF, and related playbooks) and the CTF orchestrator skills (LSASS material, DPAPI, Kerberos delegation, NTLM relay, cloud metadata credentials, container escape, SSL pinning bypass, prompt injection).

`diagram-generator` and `docs-generator` look narrower, but both tell the agent to read the tool index and call that bootstrap immediately. `docs-generator` is also the write-up skill for reverse-engineering, penetration-test, CTF, and malware reports. They were left out with the rest.

Skipped skill directories (89 `SKILL.md` files):

- Router: `skills/` (master entry), `plugins/reverse-skill/skills/reverse-skill-router`
- CTF sandbox: `CTF-Sandbox-Orchestrator/ctf-sandbox-orchestrator` and `CTF-Sandbox-Orchestrator/competition-*` (`ad-certificate-abuse`, `agent-cloud`, `android-hooking`, `browser-persistence`, `bundle-sourcemap-recovery`, `cloud-metadata-path`, `container-runtime`, `crypto-mobile`, `custom-protocol-replay`, `dpapi-credential-chain`, `file-parser-chain`, `firmware-layout`, `forensic-timeline`, `graphql-rpc-drift`, `identity-windows`, `ios-runtime`, `jwt-claim-confusion`, `k8s-control-plane`, `kerberos-delegation`, `kernel-container-escape`, `linux-credential-pivot`, `lsass-ticket-material`, `mailbox-abuse`, `malware-config`, `oauth-oidc-chain`, `pcap-protocol`, `prompt-injection`, `queue-worker-drift`, `race-condition-state-drift`, `relay-coercion-chain`, `request-normalization-smuggling`, `reverse-pwn`, `runtime-routing`, `ssrf-metadata-pivot`, `stego-media`, `supply-chain`, `template-render-path`, `web-runtime`, `websocket-runtime`, `windows-pivot`, `zip-archive`)
- Other skills: `skills/api-security`, `skills/apk-reverse`, `skills/attack-chain`, `skills/binary-diff`, `skills/binary-ninja-reverse`, `skills/browser-automation`, `skills/browser-extension-reverse`, `skills/case-review`, `skills/cloud-k8s`, `skills/code-audit`, `skills/ctf-sandbox`, `skills/database-security`, `skills/diagram-generator`, `skills/digital-forensics`, `skills/docs-generator`, `skills/dotnet-reverse`, `skills/edr-bypass-re`, `skills/email-security`, `skills/firmware-pentest`, `skills/ghidra-reverse`, `skills/go-rust-reverse`, `skills/hardware-security`, `skills/ida-reverse`, `skills/identity-federation`, `skills/js-reverse`, `skills/llm-security`, `skills/macos-reverse`, `skills/malware-analysis`, `skills/mobile-reverse`, `skills/ot-ics`, `skills/patch-diff-exploit`, `skills/pentest-tools`, `skills/pentest-tools/src-hunter`, `skills/protocol-reverse`, `skills/pwn-chain`, `skills/radare2`, `skills/radio-sdr`, `skills/reverse-engineering`, `skills/reverse-engineering/dsl-vm-reverse`, `skills/supply-chain-security`, `skills/thick-client`, `skills/threat-hunting`, `skills/threat-intelligence`, `skills/wifi-wireless`, `skills/windows-ad`
