# GLYPH Registry – Naming & Tone Refactor

This document describes the concrete changes to apply to the `glyph-registry` repo to align naming (Hook → Glyph) and adjust the tone toward an open artist/developer commons.

You can feed this file to automated tools (e.g. Codex) to update the repo.

---

## Quick requirements (read before applying)

- Always speak in terms of glyphs and `IGlyph`/`IGlyphV2`; the registry file name stays `hooks.yml`.
- Only rename “hook” inside URLs/examples you control; leave third-party repo names as-is.
- Keep the commons tone (inviting artists + devs); avoid platform/token framing.

---

## 1. README.md Changes

### 1.1. Top tagline

**Find:**

```md
A lightweight registry of composable on-chain SVG hooks for Starknet
```

**Replace with:**

```md
A lightweight registry of composable on-chain SVG glyphs for Starknet
```

---

### 1.2. “0 · What Is Glyph?” section

**Find the paragraph starting with:**

```md
A glyph is a graphical symbol that carries meaning on sight. Here every Hook contract is such a glyph—an immutable on-chain function that either emits an SVG fragment or provides utility data (e.g., random numbers) useful for SVG composition. By composing hooks, creators cast larger visual spells.
```

**Replace with:**

```md
A glyph is a graphical symbol that carries meaning on sight. Here every glyph
contract is such a glyph—an immutable on-chain function that either emits an
SVG fragment or provides utility data (e.g., random numbers) useful for SVG
composition. By composing glyphs, creators cast larger visual spells.
```

Immediately after that paragraph, **insert**:

```md
You don’t have to be a Cairo wizard to take part. Many glyphs will be written
by devs working with artists; others may be templated so non-dev artists can
choose parameters and let someone else handle the deployment.
```

---

### 1.3. “1 · First Principles” bullets

**Find the bullet list:**

```md
1. Composability ▸ any contract can call any Hook via one tiny interface.
2. Openness ▸ anyone may publish; the registry is a public YAML file.
3. Immutability ▸ Hooks never mutate once deployed.
4. Minimalism ▸ one trait, two functions; extras are bolt-ons.
5. Transparency ▸ all metadata lives in plain text; nothing proprietary.
```

**Replace with:**

```md
1. Composability ▸ any contract can call any glyph via one tiny interface.
2. Openness ▸ anyone may publish; the registry is a public YAML file.
3. Immutability ▸ glyph contracts never mutate once deployed.
4. Minimalism ▸ one trait, two functions; extras are bolt-ons.
5. Transparency ▸ all metadata lives in plain text; nothing proprietary.
```

---

### 1.4. “Where Hooks come in” / SVG description

**Find the text:**

```md
Where Hooks come in: a Hook is a tiny contract that returns either raw SVG literal data or auxiliary values that other hooks can consume. External contracts—or the Glyph Hub—call these Hooks, stitch the strings, and instantly deliver a complete FoC image.
```

**Replace with:**

```md
Where glyphs come in: a glyph contract is a tiny program that returns either raw
SVG literal data or auxiliary values that other glyphs can consume. External
contracts—or the Glyph Hub—call these glyphs, stitch the strings, and instantly
deliver a complete FoC image.
```

**Also find:**

```md
GLYPH turns FoC SVGs into modular Legos. Each Hook is a sealed SVG fragment or utility module; any contract can assemble them at view-time…
```

(Exact text may differ slightly; update the sentence that describes “Each Hook…”)

**Replace that sentence with:**

```md
GLYPH turns FoC SVGs into modular Legos. Each glyph is a sealed SVG fragment or
utility module; any contract can assemble them at view-time…
```

---

### 1.5. Minimal protocol: rename IHook → IGlyph

**Find the code block:**

```md
#[starknet::interface]
trait IHook<T> {
    fn render(self: @T, params: Span::<felt252>) -> Array::<felt252>;
    fn metadata(self: @T) -> Span::<felt252>;
}
```

**Replace with:**

```md
#[starknet::interface]
trait IGlyph<T> {
    fn render(self: @T, params: Span::<felt252>) -> Array::<felt252>;
    fn metadata(self: @T) -> Span::<felt252>;
}
```

**Then find the sentence immediately beneath it:**

```md
If your contract implements this, it is a Glyph Hook—no further permission needed.
```

**Replace with:**

```md
If your contract implements this, it is a Glyph—no further permission needed.
```

**And the following explanatory sentence:**

```md
`params` is a `Span` so callers pass read-only calldata; Hooks should only read and encode the SVG bytes they return in the `Array`.
```

**Replace with:**

```md
`params` is a `Span` so callers pass read-only calldata; glyphs should only read
and encode the SVG bytes (or other data) they return in the `Array`.
```

---

### 1.6. Example stanza naming

In the README registry example, swap any sample name that ends in “Hook” (e.g.
`ExampleHook`, `GradientHook`) to “…Glyph” and adjust the repo/description to
say “glyph”.

**Find (or approximate):**

```md
- name: ExampleHook          # unique, no spaces
  author: "@yourhandle"      # optional GitHub or ENS
  contract: "0x0123abcd…"    # Starknet address (0x… hex)
  network: "starknet-mainnet" # or starknet-testnet
  repo: "https://github.com/you/example-hook"
  description: |
    One-line summary of what the hook returns
    and its expected params.
```

**Replace with:**

```md
- name: ExampleGlyph         # unique, no spaces
  author: "@yourhandle"      # optional GitHub or ENS
  contract: "0x0123abcd…"    # Starknet address (0x… hex)
  network: "starknet-mainnet" # or starknet-testnet
  repo: "https://github.com/you/example-glyph"
  description: |
    One-line summary of what the glyph returns
    and its expected params.
```

---

### 1.7. New subsection: “1.7 · Seeding the Field”

Right after the SVG / “Where glyphs come in” subsection (before the protocol section), **insert:**

```md
### 1.7 · Seeding the Field

GLYPH is not a platform or marketplace. It is a small shared field that Inshell
is helping to seed.

The first glyphs live here to serve Inshell’s own works—PATH and the serial
triptych THOUGHT · WILL · AWA—but nothing in the registry is “Inshell-only”.
Any artist or dev can plant a new glyph beside them and let others call it.
```

Adjust the heading number if your README uses a different numbering scheme.

---

### 1.8. Replace Quick-Start with “Three Ways to Join”

Locate the current “Quick-Start” / “Quick-Start for Developers” section and replace the entire body with the following:

```md
## 4 · Three Ways to Join

1. Use an existing glyph  
   Call any glyph in `hooks.yml` from your own contract. Start with the ones
   Inshell ships (e.g. PATH-look once live), pass in your params, and render
   a FoC SVG without touching the internals.

2. Fork and remix  
   Each glyph in the registry links to its repo. Fork one, tweak the look or
   behaviour, deploy your own contract, and point a new stanza at it.

3. Publish a new glyph  
   Add a single stanza to `hooks.yml` via PR. No token, no gate, no platform
   accounts—just a public text file other contracts can read.
```

Optionally, under that, add a short “Dev shortcut”:

```md
### Dev shortcut

Clone: `git clone https://github.com/inshell-art/glyph-registry`  
List glyphs: `cat hooks.yml`
```

Also ensure the clone URL points to `inshell-art/glyph-registry` (not an older placeholder).

---

### 1.9. Roadmap: Hook → Glyph, softer tone

Find the “Roadmap” section.

**Find e.g.:**

```md
* v1 — plain text registry (`hooks.yml`) only.
* v2 — reference GlyphHub contract with `composite()` view + optional `IHookV2` media flag & royalty view.
* v3 — …
```

**Replace with:**

```md
## 6 · Roadmap Sketch

* v1 (now) — plain text registry (`hooks.yml`) only.
* v2 — optional GlyphHub reference contract with `composite()` view; still no
  central service, just more examples of how to compose glyphs.
* v3 — if there’s interest, a small community process (maybe a DAO) for schema
  changes and a simple “spellbook” viewer. No protocol token planned here.
```

If `IHookV2` is referenced in text, rename it to `IGlyphV2`.

Also update the license line:

**Find:**

```md
Docs and registry under MIT; Hook authors choose their own licences in their respective repos.
```

**Replace with:**

```md
Docs and registry under MIT; glyph authors choose their own licences in their respective repos.
```

---

### 1.10. Contribute section copy

If the README still has a “Contribute a Hook” section, rename it to “Contribute
a Glyph” and refresh the copy.

**Find:**

```md
## 5 · Contribute a Hook

Experienced dev? Just fork and add a stanza to [`hooks.yml`](./hooks.yml). Detailed steps live in [CONTRIBUTING.md](./docs/CONTRIBUTING.md).
```

**Replace with:**

```md
## 5 · Contribute a Glyph

Add a stanza for your glyph in [`hooks.yml`](./hooks.yml) and keep the repo link alive so others can learn from it. Step-by-step notes live in [CONTRIBUTING.md](./docs/CONTRIBUTING.md).
```

---

### 1.11. Final wording pass

After the README edits, scan for stray “Hook”/“hook” references (except in the
filename `hooks.yml` or external repo names) and flip them to “glyph” where it
denotes the concept. Quick check: `rg -n "Hook" README.md docs`.

---

## 2. hooks.yml Changes

Open `hooks.yml` and update the header comments and example stanza.

**Find the top comments:**

```yaml
# GLYPH Registry — hooks.yml
# ------------------------------------------------------------
# Add new entries via PR. Each stanza must include **name, contract,
# network, repo, description**. Delete the leading “#” on your stanza.
# ------------------------------------------------------------
# - name: ExampleHook          # unique, no spaces
#   author: "@yourhandle"      # optional GitHub or ENS
#   contract: "0x0123abcd…"    # Starknet address (0x… hex)
#   network: "starknet-mainnet" # or starknet-testnet
#   repo: "https://github.com/you/example-hook"
#   description: |
#     One-line summary of what the hook returns
#     and its expected params.
```

**Replace with:**

```yaml
# GLYPH Registry — hooks.yml
# ------------------------------------------------------------
# Add new entries via PR. Each stanza must include **name, contract,
# network, repo, description**. Delete the leading “#” on your stanza.
# Each stanza describes one glyph implementing `IGlyph`.
# ------------------------------------------------------------
# - name: ExampleGlyph         # unique, no spaces
#   author: "@yourhandle"      # optional GitHub or ENS
#   contract: "0x0123abcd…"    # Starknet address (0x… hex)
#   network: "starknet-mainnet" # or starknet-testnet
#   repo: "https://github.com/you/example-glyph"
#   description: |
#     One-line summary of what the glyph returns
#     and its expected params.
```

The file name can remain `hooks.yml`; internally it’s “a list of glyphs”.

---

## 3. CONTRIBUTING.md (if present)

If you have `CONTRIBUTING.md` or similar, prepend or adjust the introduction to emphasize the commons / sketchbook vibe.

### 3.1. Suggested intro

At the very top of `CONTRIBUTING.md`, add or replace the opening with:

```md
# Contributing to GLYPH

GLYPH is closer to a shared sketchbook than a platform.

If you deploy a contract that implements `IGlyph` and add a stanza to
`hooks.yml`, you’re in. There is no curation gate; the only rules are:

- Your contract is immutable (or behaves immutably for `render`).
- Your description is honest about what it returns and how to call it.
- You keep the repo link alive so others can learn from and fork it.

Inshell is seeding the first glyphs (PATH-look, THOUGHT-look, AWA-look, etc.),
but the ecosystem only becomes interesting when many voices draw here.
```

You can keep the existing PR / formatting instructions below this block.

---

## 4. Summary of Rename Rules

For automated replacements, apply these where they make semantic sense:

- `IHook` → `IGlyph`
- `IHookV2` → `IGlyphV2`
- `Hook` → `glyph` when referring to the conceptual unit
- `Hooks` → `glyphs` when referring to multiple units

Be careful *not* to rename “hook” in unrelated words (e.g. if any URL paths or repo names still intentionally include “hook”).

After these changes, GLYPH will:

- speak consistently about **glyphs** instead of hooks,
- present itself as an **artist/dev commons**, not a “platform”,
- and offer a gentle “Three ways to join” on-ramp aligned with Inshell’s ethos.
