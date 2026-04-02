# Blueprint Content — Editing Guide
*Last updated: 2026-04-01*

All Blueprint hub content lives here. Edit the `.md` files directly in any text editor
(VS Code, Cursor, Notepad++) — no TypeScript changes needed for content edits.

---

## Directory Map

```
src/content/blueprint/
│
├── manifest.json                    ← SINGLE SOURCE OF TRUTH for hub/hotspot structure
│                                      Edit this to add hubs, hotspots, or change coordinates
│
├── ekklesia/                        ← THE PEOPLE'S ASSEMBLY (plaque-hub, full-width map)
│   ├── ekklesia.md                  ← Hub overview (legacy placeholder)
│   ├── 01-what-it-is.md            ← L1: We're 2,000 Years Brand New
│   ├── 02-no-rulers.md             ← L2: No Rulers. Only Citizens.
│   ├── 03-diy-lawmaking.md         ← L3: DIY Government / With Expert Help
│   ├── 04-isokratos.md             ← L4: You'll Need A Coach. Meet IsoKratÓS.
│   ├── 05-homonoia.md              ← R1: The Tyranny In Every Majority
│   ├── 06-not-democracy.md         ← R2: You Call This Democracy?
│   └── 07-kairos.md                ← R4: The Countdown Began 2,359 Years Ago (double-height)
│
├── nomothesia/                      ← THE PEOPLE'S LAWS (bitmapped map, 8 nodes)
│   ├── 01-hypothesis.md            ← Node: hypothesis
│   ├── 02-thermansis.md            ← Node: isokratos
│   ├── 03-deliberation.md          ← Node: coordinator
│   ├── 04-aegides-drafting.md      ← Node: ekklesia-delib
│   ├── 05-ratification.md          ← Node: psephisma
│   ├── 06-iteration.md             ← Node: dikaios
│   ├── 07-dikaios.md               ← Node: new-law
│   └── 08-psephisma-nomos.md       ← Node: other-options
│
├── therapon-dokimazo/               ← THE PEOPLE'S GOVERNMENT (bitmapped map, 9 nodes + Nixor)
│   ├── minotaur-nixor.md           ← The Nixor full page (navigated separately)
│   ├── the-registry.md             ← Node: the-registry
│   ├── the-cut.md                  ← Node: the-cut
│   ├── brillianteering.md          ← Node: brillianteering (note capital B in filename)
│   ├── masterstones.md             ← Node: masterstones (note capital M in filename)
│   ├── the-lever-pull.md           ← Node: the-lever-pull
│   ├── the-mandate.md              ← Node: the-mandate
│   ├── the-vow.md                  ← Node: the-vow
│   └── the-reality.md              ← Node: the-reality
│
├── glaukos-mati/                    ← ACCOUNTABILITY & TRANSPARENCY (text hub, full page)
│   └── overview.md                 ← "We point the cameras UP." — edit this directly
│
└── paideia/                         ← GENERATIONAL FAIRNESS (text hub, full page)
    └── overview.md                 ← "How Will They Remember Us?" — edit this directly
```

---

## Hub Types

| Type | Behavior | Examples |
|------|----------|---------|
| `plaque-hub` | Full-width bitmapped map, rect hit areas, DetailCard on click | Ekklesia |
| `process` (map) | Full-viewport contained map, circle hit areas, DetailCard on click | Nomothesia, Dokimazo |
| `full-page` | Standalone scrollable text page | Nixor |
| text hub (no map) | Full scrollable page with marble bg, Crimson Text | Logodosia, GFF |

---

## MD File Format

```markdown
---
id: node-id-here
name: "Display Name"
greekName: "Ἑλληνικά"
blurb: "Short description shown in DetailCard header."
column: left          ← Ekklesia plaque-hub only: left | right
order: 0              ← Position within column (0-based)
doubleHeight: true    ← Ekklesia plaque-hub only, for Kairos tile
---

Body content in standard Markdown.
## Headings render in Crimson Text
### Subheadings render in Trebuchet MS
**Bold** = terms of art only.
```

---

## Voice & Style Rules (enforce on all content)

- No em-dashes except rare structural use; parentheses or semicolons preferred
- No "we believe" hedging
- **Bold** = terms of art only
- No AI-isms: "delve," "testament to," "it's worth noting," "flags and surfaces" together
- 200–600 words per node card; no limit on hub overview pages
- BeefText shortcut `zxc` → AreTéCracy

---

## Images

Header images for text hub pages live in:
`public/images/blueprint/`

| File | Used by |
|------|---------|
| `gff-header.webp` | GFF / Paideia page top |
| `logodosia-header.webp` | Logodosia page top |
| `nixor-header.webp` | Nixor full page top |
| `ekklesia-map-*.webp` | Ekklesia hub map (3 sizes) |
| `nomothesia-map-*.webp` | Nomothesia hub map (3 sizes) |
| `dokimazo-map-*.webp` | Dokimazo hub map (3 sizes) |
| `BlueprintMarbleDark.webp` | Dark mode marble background |
| `BlueprintMarbleLight.webp` | Light mode marble background |

Squoosh settings for all images: Quality 82, Alpha 100, Lossless OFF, Method 4, Lanczos3.
Header images: single size, 768px wide (matches max-w-3xl text column).
