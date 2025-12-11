# Contributing to GLYPH

GLYPH is closer to a shared sketchbook than a platform.

If you deploy a contract that implements `IGlyph` and add a stanza to
`glyphs.yml`, you’re in. There is no curation gate; the only rules are:

- Your contract is immutable (or behaves immutably for `render`).
- Your description is honest about what it returns and how to call it.
- You keep the repo link alive so others can learn from and fork it.

Inshell is seeding the first glyphs (PATH-look, THOUGHT-look, AWA-look, etc.),
but the ecosystem only becomes interesting when many voices draw here.

---

## 1 Prerequisites

- A deployed Starknet contract that implements the `IGlyph` interface.
- A public repository containing the glyph’s source and README.

---

## 2 Fork & Branch

```bash
git clone https://github.com/inshell-art/glyph-registry.git
cd glyph-registry
git checkout -b add/my-gradient-glyph
```

---

## 3 Add an Entry to `glyphs.yml`

Append a YAML stanza at the end of the list:

```yaml
- name: GradientGlyph
  kind: svg
  author: "@yourhandle"
  contract: "0x0123abcd…"
  network: "starknet-mainnet"  # or starknet-testnet
  repo: "https://github.com/yourhandle/gradient-glyph"
  description: |
    Returns an SVG linear‑gradient. Params: hue (0–360), steps (2–32).
  example:
    call: "[200,10]" # ABI‑encoded felts
    how_to_run: |
      sncast --network mainnet call \
        --address 0x0123abcd... \
        --function render \
        --calldata 200 10
```

**Required keys:** `name`, `kind`, `contract`, `network`, `repo`, `description`.
`kind` is a coarse category for tooling: `svg`, `utility`, `palette`, `layout`, or `other`.
The `example` block is optional but encouraged—pack the calldata you use most often and show others exactly how to reproduce the raw `<svg>` output over RPC instead of pasting an IPFS preview.

---

## 4 Commit & Push

```bash
git add glyphs.yml
git commit -m "feat: add GradientGlyph registry entry"
git push origin add/my-gradient-glyph
```

---

## 5 Open a Pull Request

In the PR description include:

1. Contract address and network.
2. One‑line what the glyph does.
3. Sample call parameters + CLI/RPC command to reproduce the raw `<svg>` output (e.g., `sncast call ...`).

---

## 6 CI Checks

The PR will pass if:

1. `glyphs.yml` is valid YAML.
2. `name` and `contract` are unique.
3. `repo` URL returns HTTP 200.

A maintainer merges once checks are green. Your glyph becomes discoverable across GLYPH‑aware tools within minutes.

---

### Updating or Deprecating a Glyph

| Scenario        | Action                                                    |
| --------------- | --------------------------------------------------------- |
| **New version** | Deploy new contract → add a new entry (`GradientGlyphV2`). |
| **Retiring**    | Open a PR marking the entry with `status: deprecated`.    |

That’s it—thanks for sealing another mark on‑chain! 🎨
