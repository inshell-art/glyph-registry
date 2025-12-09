# **GLYPH** — **G**raphic **L**edger **Y**ielding  **P**rogrammable **H**yperstructures

_A lightweight registry of composable on‑chain SVG glyphs for Starknet_

---

## 0 · What Is Glyph?

A **glyph** is a graphical symbol that carries meaning on sight. Here every glyph
contract is such a glyph—an immutable on‑chain function that either emits an
SVG fragment **or provides utility data** (e.g., random numbers) useful for SVG
composition. By composing glyphs, creators cast larger visual spells.

You don’t have to be a Cairo wizard to take part. Many glyphs will be written
by devs working with artists; others may be templated so non‑dev artists can
choose parameters and let someone else handle the deployment.

---

## 1 · First Principles

1. **Composability ▸** any contract can call any glyph via one tiny interface.
2. **Openness ▸** anyone may publish; the registry is a public YAML file.
3. **Immutability ▸** glyph contracts are intended to behave immutably once
   registered. If behaviour changes, the author deploys a new contract and
   adds a new stanza with a new version, rather than upgrading the old one.
4. **Minimalism ▸** one trait, two functions; extras are bolt‑ons.
5. **Transparency ▸** all metadata lives in plain text; nothing proprietary.

---

## 1.5 · Why SVG + Fully On‑Chain?

**SVG is a descriptive text language whose _source IS the artifact_.** The XML markup you write is the exact bytecode a viewer parses—no compilation, no binary blob. That makes SVG uniquely suited for **Fully‑on‑Chain (FoC)** storage, where every byte must live on the ledger forever.

**What FoC gives us**: permanence, cryptographic provenance, and contract‑level composability. The entire image, metadata, and generation logic are pinned to the chain; anyone can verify or remix the art without relying on IPFS or a web server.

**Why SVG excels inside a contract**:

- **Compact literal** – vector instructions fit in hundreds of bytes, slashing gas costs.
- **Scales forever** – no pixels to blur; renders at any zoom.
- **Universal reader** – browsers and wallets natively handle `data:image/svg+xml`.
- **String‑friendly** – smart contracts build or tweak the markup with simple concatenation.

**Where glyphs come in**: a glyph contract is a tiny program that returns either raw SVG **literal** data **or auxiliary values** that other glyphs can consume. External contracts—or the Glyph Hub—call these glyphs, stitch the strings, and instantly deliver a complete FoC image. No off‑chain renderer, no hidden asset store: **the blockchain itself hosts, composes, and serves the art.**

### 1.6 · How GLYPH Super‑charges FoC

GLYPH turns FoC SVGs into **modular Legos**. Each glyph is a sealed SVG fragment **or utility module**; any contract can assemble them at view‑time, letting NFTs evolve, reflect on‑chain data, or adopt fresh renderers without altering the originals. **GLYPH makes FoC art not just permanent but living and composable.**

### 1.7 · Seeding the Field

GLYPH is not a platform or marketplace. It is a small shared field that Inshell
is helping to seed.

The first glyphs live here to serve Inshell’s own works—PATH and the serial
triptych THOUGHT · WILL · AWA—but nothing in the registry is “Inshell‑only”.
Any artist or dev can plant a new glyph beside them and let others call it.

---

## 2 · The Minimal Protocol

```cairo
#[starknet::interface]
trait IGlyph<T> {
    fn render(self: @T, params: Span::<felt252>) -> Array::<felt252>;
    fn metadata(self: @T) -> Span::<felt252>;
}
```

If your contract implements this, it **is** a Glyph—no further permission needed.

`params` is a `Span` so callers pass read‑only calldata; glyphs should only read
and encode the SVG bytes (or other data) they return in the `Array`.

---

## 3 · Registry (`glyphs.yml`)

Each entry is one stanza with `name, kind, contract, network, repo, description`, e.g.:

```yaml
- name: GradientGlyph
  kind: svg
  contract: "0x0123abcd…"
  network: "starknet-mainnet"
  repo: "https://github.com/yourhandle/gradient-glyph"
  description: "Returns an SVG linear‑gradient fragment."
```

Each glyph entry in `glyphs.yml` has the following fields:

- `name` — unique glyph name, no spaces.
- `kind` — coarse category, e.g. `svg`, `utility`, `palette`, `layout`, or `other`.
- `author` — optional GitHub/ENS handle.
- `contract` — Starknet contract address (0x… hex).
- `network` — network identifier (e.g. `starknet-sepolia`).
- `repo` — URL to the glyph’s source code repository.
- `description` — short explanation of what the glyph returns and how to call it.

_The file is machine‑readable; GUIs and wallets consume it in one request._

---

## 4 · Three Ways to Join

1. Use an existing glyph  
   Call any glyph in `glyphs.yml` from your own contract. Start with the ones
   Inshell ships (e.g. PATH‑look once live), pass in your params, and render
   a FoC SVG without touching the internals.

2. Fork and remix  
   Each glyph in the registry links to its repo. Fork one, tweak the look or
   behaviour, deploy your own contract, and point a new stanza at it.

3. Publish a new glyph  
   Add a single stanza to `glyphs.yml` via PR. No token, no gate, no platform
   accounts—just a public text file other contracts can read.

### Dev shortcut

Clone: `git clone https://github.com/inshell-art/glyph-registry`  
List glyphs: `cat glyphs.yml`

---

## 5 · Contribute a Glyph

Add a stanza for your glyph in [`glyphs.yml`](./glyphs.yml) and keep the repo link alive so others can learn from it. Step‑by‑step notes live in [CONTRIBUTING.md](./docs/CONTRIBUTING.md).

### Publishing a glyph

To publish a glyph to the registry:

1. Deploy your glyph contract implementing `IGlyph` on Starknet.
2. Add a stanza to `glyphs.yml` with at least: `name, kind, contract, network, repo, description`.
3. Open a PR.

Glyphs in this registry are expected to behave immutably once deployed. If you need to change behaviour, deploy a new contract and add a new stanza with a new version. Upgradeable / proxy glyphs are discouraged and must be clearly disclosed if they are ever used.

---

## 6 · Roadmap Sketch

- **v1 (now)** — plain text registry (`glyphs.yml`) only.
- **v2** — optional GlyphHub reference contract with `composite()` view; still no
  central service, just more examples of how to compose glyphs.
- **v3** — if there’s interest, a small community process (maybe a DAO) for schema
  changes and a simple “spellbook” viewer. No protocol token planned here.

---

### License

Docs and registry under MIT; glyph authors choose their own licences in their respective repos.

> **Every glyph is a module · Every module is a spell · Combine freely.**
