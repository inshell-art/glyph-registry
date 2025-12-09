# GLYPH Registry – Naming & Tone Refactor

This document captures the glyph-centric naming and tone for the `glyph-registry` repo (retiring the older “hook” wording). You can feed this file to automation to keep the docs aligned.

---

## Quick requirements (read before applying)

- Speak in terms of glyphs and `IGlyph`/`IGlyphV2`; the registry file name stays `hooks.yml`.
- If any lingering “hook” terminology exists in URLs/examples you control, rewrite it to “glyph”; leave third-party repo names untouched.
- Keep the commons tone (inviting artists + devs); avoid platform/token framing.

---

## 1. README.md Changes

### 1.1. Top tagline

Set the tagline to:

```md
A lightweight registry of composable on-chain SVG glyphs for Starknet
```

### 1.2. “0 · What Is Glyph?” section

Use:

```md
A glyph is a graphical symbol that carries meaning on sight. Here every glyph
contract is such a glyph—an immutable on-chain function that either emits an
SVG fragment or provides utility data (e.g., random numbers) useful for SVG
composition. By composing glyphs, creators cast larger visual spells.

You don’t have to be a Cairo wizard to take part. Many glyphs will be written
by devs working with artists; others may be templated so non-dev artists can
choose parameters and let someone else handle the deployment.
```

### 1.3. “1 · First Principles” bullets

Ensure the list reads:

```md
1. Composability ▸ any contract can call any glyph via one tiny interface.
2. Openness ▸ anyone may publish; the registry is a public YAML file.
3. Immutability ▸ glyph contracts never mutate once deployed.
4. Minimalism ▸ one trait, two functions; extras are bolt-ons.
5. Transparency ▸ all metadata lives in plain text; nothing proprietary.
```

### 1.4. “Where glyphs come in” / SVG description

Use the glyph wording:

```md
Where glyphs come in: a glyph contract is a tiny program that returns either raw
SVG literal data or auxiliary values that other glyphs can consume. External
contracts—or the Glyph Hub—call these glyphs, stitch the strings, and instantly
deliver a complete FoC image.
```

And the follow-up sentence:

```md
GLYPH turns FoC SVGs into modular Legos. Each glyph is a sealed SVG fragment or
utility module; any contract can assemble them at view-time…
```

### 1.5. Minimal protocol

```md
#[starknet::interface]
trait IGlyph<T> {
    fn render(self: @T, params: Span::<felt252>) -> Array::<felt252>;
    fn metadata(self: @T) -> Span::<felt252>;
}

If your contract implements this, it is a Glyph—no further permission needed.

`params` is a `Span` so callers pass read-only calldata; glyphs should only read
and encode the SVG bytes (or other data) they return in the `Array`.
```

### 1.6. Example stanza naming

The registry example should use glyph naming, e.g.:

```yaml
- name: ExampleGlyph
  kind: svg
  author: "@yourhandle"
  contract: "0x0123abcd…"
  network: "starknet-mainnet" # or starknet-testnet
  repo: "https://github.com/you/example-glyph"
  description: |
    One-line summary of what the glyph returns
    and its expected params.
```

### 1.7. “Seeding the Field”

Insert or keep:

```md
### 1.7 · Seeding the Field

GLYPH is not a platform or marketplace. It is a small shared field that Inshell
is helping to seed.

The first glyphs live here to serve Inshell’s own works—PATH and the serial
triptych THOUGHT · WILL · AWA—but nothing in the registry is “Inshell-only”.
Any artist or dev can plant a new glyph beside them and let others call it.
```

### 1.8. “Three Ways to Join”

Use the glyph-friendly onboarding:

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

Optional dev shortcut:

```md
### Dev shortcut

Clone: `git clone https://github.com/inshell-art/glyph-registry`  
List glyphs: `cat hooks.yml`
```

### 1.9. Roadmap tone

Roadmap should read:

```md
## 6 · Roadmap Sketch

- **v1 (now)** — plain text registry (`hooks.yml`) only.
- **v2** — optional GlyphHub reference contract with `composite()` view; still no
  central service, just more examples of how to compose glyphs.
- **v3** — if there’s interest, a small community process (maybe a DAO) for
  schema changes and a simple “spellbook” viewer. No protocol token planned here.
```

### 1.10. Contribute section

Heading and copy should be glyph-centric:

```md
## 5 · Contribute a Glyph

Add a stanza for your glyph in [`hooks.yml`](./hooks.yml) and keep the repo link alive so others can learn from it. Step-by-step notes live in [CONTRIBUTING.md](./docs/CONTRIBUTING.md).
```

### 1.11. Final wording pass

After the README edits, scan for stray old “hook” references (except the file name `hooks.yml` or third-party repo names) and flip them to “glyph” where they denote the concept. Quick check: `rg -n "hook" README.md docs`.

---

## 2. hooks.yml Changes

Header comments and the example stanza should be glyph-first:

```yaml
# GLYPH Registry — hooks.yml
# ------------------------------------------------------------
# Add new entries via PR. Each stanza must include **name, kind, contract,
# network, repo, description**. Delete the leading “#” on your stanza.
# Each stanza describes one glyph implementing `IGlyph`.
# ------------------------------------------------------------
# - name: ExampleGlyph               # unique, no spaces
#   kind: svg                        # svg | utility | palette | layout | other
#   author: "@yourhandle"            # optional GitHub or ENS
#   contract: "0x0123abcd…"          # Starknet address (0x… hex)
#   network: "starknet-mainnet"      # or starknet-testnet
#   repo: "https://github.com/you/example-glyph"
#   description: |
#     One-line summary of what the glyph returns
#     and its expected params.
#   example:
#     call: "[param1, param2]"       # encoded felts
#     how_to_run: |
#       sncast --network mainnet call \
#         --address 0x0123abcd... \
#         --function render \
#         --calldata param1 param2
```

The file name remains `hooks.yml`; internally it’s a list of glyphs.

---

## 3. CONTRIBUTING.md (if present)

Use the sketchbook intro:

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

---

## 4. Summary of Rename Rules

If you still encounter the old terminology, map it to glyph language:

- `IHook` → `IGlyph`
- `IHookV2` → `IGlyphV2`
- `Hook` → `glyph` when referring to the conceptual unit
- `Hooks` → `glyphs` when referring to multiple units

Avoid touching third-party repo names or the filename `hooks.yml`. After these changes, GLYPH will speak consistently about glyphs, maintain the commons tone, and offer a welcoming “Three Ways to Join” on-ramp.
