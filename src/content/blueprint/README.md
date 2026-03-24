# Blueprint Content Structure

This folder holds the Blueprint page content: **hubs** (the 5 nodes on the map) and **hotspots** (the traces/steps within each process hub).

## Layout

- **One manifest** at the root: `manifest.json` lists all hubs and their hotspots.
- **Per-hub folders** contain MD files for that hub's content and hotspots.

## Structure

```
blueprint/
├── manifest.json          # Single source of truth: hub list + hotspot list per hub
├── ekklesia/
│   └── ekklesia.md        # Central hub (longer card)
├── nomothetesis/
│   ├── overview.md       # Hub-level content
│   ├── hypothesis.md     # Hotspot 1
│   ├── thermansis.md     # Hotspot 2
│   └── ...               # 8 hotspots total
├── therapon-dokimazo/
│   └── overview.md       # East hub (hotspots TBD)
├── glaukos-mati/
│   └── overview.md       # South hub (hotspots TBD)
└── paideia/
    └── overview.md       # West hub (hotspots TBD)
```

## Editing Content

1. Edit the `.md` files directly—no TypeScript changes needed.
2. To add or reorder hotspots, edit `manifest.json` in the relevant hub's `hotspots` array.
3. To add a new hub, add an entry to `manifest.hubs` and create the folder + content file.

## MD File Format

Same as glossary: YAML frontmatter + markdown body.
