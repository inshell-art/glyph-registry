const GLYPHS_YML_URL =
  "https://raw.githubusercontent.com/inshell-art/glyph-registry/main/glyphs.yml";

const REQUIRED_KEYS = ["name", "kind", "contract", "network", "repo", "description"];
const KIND_ORDER = ["svg", "utility", "palette", "layout", "other"];
const DESCRIPTION_MAX = 140;

function shortenAddress(addr) {
  const s = (addr || "").trim();
  if (!s.startsWith("0x") || s.length <= 12) return s;
  return `${s.slice(0, 8)}…${s.slice(-6)}`;
}

function tidyDescription(desc) {
  const clean = (desc || "").toString().replace(/\s+/g, " ").trim();
  if (clean.length <= DESCRIPTION_MAX) return clean;
  return `${clean.slice(0, DESCRIPTION_MAX - 1)}…`;
}

function isValid(entry) {
  if (!entry || typeof entry !== "object") return false;
  return REQUIRED_KEYS.every((k) => {
    const v = entry[k];
    return !(v === undefined || v === null || `${v}`.trim() === "");
  });
}

function normalise(entry) {
  return {
    name: `${entry.name}`.trim(),
    kind: `${entry.kind}`.trim().toLowerCase(),
    contract: `${entry.contract}`.trim(),
    network: `${entry.network}`.trim(),
    repo: `${entry.repo}`.trim(),
    description: tidyDescription(entry.description),
  };
}

function renderGlyphs(container, glyphs) {
  const valid = [];
  for (const g of glyphs) {
    if (!isValid(g)) {
      console.warn("Skipping invalid glyph entry:", g);
      continue;
    }
    valid.push(normalise(g));
  }

  if (valid.length === 0) {
    container.innerHTML = `<p class="error">No valid glyph entries found in glyphs.yml.</p>`;
    return;
  }

  const groups = new Map();
  for (const g of valid) {
    const kind = g.kind || "other";
    if (!groups.has(kind)) groups.set(kind, []);
    groups.get(kind).push(g);
  }

  const sortedKinds = Array.from(groups.keys()).sort((a, b) => {
    const ia = KIND_ORDER.indexOf(a);
    const ib = KIND_ORDER.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  const frag = document.createDocumentFragment();

  for (const kind of sortedKinds) {
    const list = groups.get(kind).sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );

    const section = document.createElement("section");
    section.className = "kind";

    const h2 = document.createElement("h2");
    h2.textContent = kind;
    const label = document.createElement("span");
    label.className = "kind-label";
    label.textContent = "glyphs";
    h2.appendChild(label);
    section.appendChild(h2);

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>name</th>
        <th>network</th>
        <th>contract</th>
        <th>repo</th>
        <th>description</th>
      </tr>`;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    for (const g of list) {
      const tr = document.createElement("tr");
      const addrShort = shortenAddress(g.contract);
      tr.innerHTML = `
        <td>${g.name}</td>
        <td>${g.network}</td>
        <td><code>${addrShort}</code></td>
        <td><a href="${g.repo}" target="_blank" rel="noopener noreferrer">repo</a></td>
        <td>${g.description}</td>
      `;
      tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    section.appendChild(table);
    frag.appendChild(section);
  }

  container.innerHTML = "";
  container.appendChild(frag);
}

async function loadGlyphs() {
  const container = document.getElementById("glyph-viewer");
  try {
    const res = await fetch(GLYPHS_YML_URL);
    if (!res.ok) throw new Error(`Failed to fetch glyphs.yml: ${res.status}`);
    const text = await res.text();
    const data = jsyaml.load(text) || [];
    if (!Array.isArray(data)) throw new Error("glyphs.yml root must be a YAML sequence");
    renderGlyphs(container, data);
  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<p class="error">Failed to load glyphs.yml. Check console for details.</p>';
  }
}

document.addEventListener("DOMContentLoaded", loadGlyphs);
