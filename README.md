# **GLYPH** — **G**raphic **L**edger **Y**ielding  **P**rogrammable **H**yperstructures

_A lightweight registry of composable on‑chain SVG hooks for Starknet_

---

## 0 · What Is Glyph?

A **glyph** is a graphical symbol that carries meaning on sight. Here every **Hook contract** is such a glyph—an immutable on‑chain function that either emits an SVG fragment **or provides utility data** (e.g., random numbers) useful for SVG composition. By composing hooks, creators cast larger visual spells.

---

## 1 · First Principles

1. **Composability ▸** any contract can call any Hook via one tiny interface.
2. **Openness ▸** anyone may publish; the registry is a public YAML file.
3. **Immutability ▸** Hooks never mutate once deployed.
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

**Where Hooks come in**: a Hook is a tiny contract that returns either raw SVG **literal** data **or auxiliary values** that other hooks can consume. External contracts—or the Glyph Hub—call these Hooks, stitch the strings, and instantly deliver a complete FoC image. No off‑chain renderer, no hidden asset store: **the blockchain itself hosts, composes, and serves the art.**

### 1.6 · How GLYPH Super‑charges FoC

GLYPH turns FoC SVGs into **modular Legos**. Each Hook is a sealed SVG fragment **or utility module**; any contract can assemble them at view‑time, letting NFTs evolve, reflect on‑chain data, or adopt fresh renderers without altering the originals. **GLYPH makes FoC art not just permanent but living and composable.**

---

## 2 · The Minimal Protocol

```cairo
#[starknet::interface]
trait IHook<T> {
    fn render(self: @T, params: Span::<felt252>) -> Array::<felt252>;
    fn metadata(self: @T) -> Span::<felt252>;
}
```

If your contract implements this, it **is** a Glyph Hook—no further permission needed.

`params` is a `Span` so callers pass read‑only calldata; Hooks should only read and encode the SVG bytes they return in the `Array`.

---

## 3 · Registry (`hooks.yml`)

Each entry is one stanza, e.g.:

```yaml
- name: GradientHook
  contract: "0x0123abcd…"
  network: "starknet-mainnet"
  repo: "https://github.com/yourhandle/gradient-hook"
  description: "Returns an SVG linear‑gradient fragment."
```

_The file is machine‑readable; GUIs and wallets consume it in one request._

---

## 4 · Quick‑Start for Developers

| Action          | Command                                                             |
| --------------- | ------------------------------------------------------------------- |
| **Clone**       | `git clone https://github.com/glyph-art/glyph-registry`             |
| **List hooks**  | `cat hooks.yml`                                                     |
| **Call a hook** | Use `starkli`, `starknet.py`, etc. with the address + packed params |
| **Compose**     | Wire the hooks yourself for now; GlyphHub view ships post‑v1        |

---

## 5 · Contribute a Hook

Experienced dev? Just fork and add a stanza to [`hooks.yml`](./hooks.yml). Detailed steps live in [CONTRIBUTING.md](./docs/CONTRIBUTING.md).

---

## 6 · Roadmap Sketch

- **v1 (now)** — plain registry (`hooks.yml`) only.
- **v2** — reference GlyphHub contract with `composite()` view + optional `IHookV2` media flag & royalty view.
- **v3** — DAO‑governed schema evolution, payout router, GUI spellbook.

---

### License

Docs and registry under MIT; Hook authors choose their own licences in their respective repos.

> **Every glyph is a module · Every module is a spell · Combine freely.**
