# Contributing a Hook to GLYPH

Thank you for adding a new **glyph** to the registry! Your contract code stays in your own repo. This project only stores a pointer and metadata.

---

## 1 Prerequisites

- A deployed Starknet contract that implements the `IHook` interface.
- A public repository containing the Hook’s source and README.

---

## 2 Fork & Branch

```bash
git clone https://github.com/glyph-art/glyph-registry.git
cd glyph-registry
git checkout -b add/my-gradient-hook
```

---

## 3 Add an Entry to `hooks.yml`

Append a YAML stanza at the end of the list:

```yaml
- name: GradientHook
  author: "@yourhandle"
  contract: "0x0123abcd…"
  network: "starknet-mainnet" # or starknet-testnet
  repo: "https://github.com/yourhandle/gradient-hook"
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

**Required keys:** `name`, `contract`, `network`, `repo`, `description`. The `example` block is optional but encouraged—pack the calldata you use most often and show others exactly how to reproduce the raw `<svg>` output over RPC instead of pasting an IPFS preview.

---

## 4 Commit & Push

```bash
git add hooks.yml
git commit -m "feat: add GradientHook registry entry"
git push origin add/my-gradient-hook
```

---

## 5 Open a Pull Request

In the PR description include:

1. Contract address and network.
2. One‑line what the Hook does.
3. Sample call parameters + CLI/RPC command to reproduce the raw `<svg>` output (e.g., `sncast call ...`).

---

## 6 CI Checks

The PR will pass if:

1. `hooks.yml` is valid YAML.
2. `name` and `contract` are unique.
3. `repo` URL returns HTTP 200.

A maintainer merges once checks are green. Your glyph becomes discoverable across GLYPH‑aware tools within minutes.

---

### Updating or Deprecating a Hook

| Scenario        | Action                                                    |
| --------------- | --------------------------------------------------------- |
| **New version** | Deploy new contract → add a new entry (`GradientHookV2`). |
| **Retiring**    | Open a PR marking the entry with `status: deprecated`.    |

That’s it—thanks for sealing another mark on‑chain! 🎨
