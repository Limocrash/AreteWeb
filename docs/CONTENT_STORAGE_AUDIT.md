# Content storage audit – where detail card text actually lives

**Vision (add/change/rename/delete via dev tool, no code changes):** See repo root **`docs/CONTENT_AND_DEV_TOOL_VISION.md`**.

## What was agreed (per CARD_MANAGEMENT_SPEC and CONTENT_FORMAT_SPEC)

- **Detail card / glossary text** should live in **markdown files** in:
  - **`src/content/glossary/{id}.md`** (one file per term: isonomia, prc, paideia, etc.)
- **TempleArchitecture** should hold only:
  - **Position data** (left, top, width, height) and minimal metadata (id, name, subtitle)
  - **No** long `description` paragraphs in the component
- The app loads card body from: **markdown file** → then glossary fallback → then (legacy) inline description.

---

## What actually exists

### Parent repo (main website) – `d:\GitHub\Aretecracywebsite\src\`

| Item | Status |
|------|--------|
| **Agreed directory** `src/content/glossary/` | **Exists** – 55 markdown files (isonomia.md, isegoria.md, prc.md, paideia.md, etc.) |
| **Content loader** `src/data/content.ts` | Uses `import.meta.glob('../content/glossary/*.md')` – finds those files |
| **TempleArchitecture.tsx** | **Still has full inline datasets**: `isotesData`, `pillarsData`, `aretaiData`, `isotimiaData` each with long `description` strings (hundreds of lines). Used as **fallback** when markdown isn’t loaded. |

So in the parent: the agreed directory exists and is used; the component was never refactored to remove the duplicate inline text.

### Sandbox – `gemini-gemini-sandbox\src\`

| Item | Status |
|------|--------|
| **Agreed directory** `src/content/glossary/` | **Missing** – there is no `content/` folder at all. |
| **Content loader** `src/data/content.ts` | Same glob `'../content/glossary/*.md'` – finds **zero** files. |
| **TempleArchitecture.tsx** | Full copy from parent: **all** detail card text is in the component as inline `description` (flat datasets). Cards **only** show that inline text because no markdown files exist to load. |

So in the sandbox: there is no directory of text files; everything is the “flat datasets inside the component” you were told about.

---

## Where the “flat datasets” are

All of this lives **inside** `TempleArchitecture.tsx` (same in parent and sandbox):

- **isotesData** – 4 items (Isonomia, Isegoria, Isopoliteia, IsoEudaimonia) – each with `id`, `name`, `subtitle`, `description`, `position`
- **pillarsData** – 16 items (Paideia, Hephaistia, Ekklesia, Pnyx, …) – same shape + `tier`, `restsOn`
- **aretaiData** – 4 items (Sonder, Philotimo, PRC, Alētheia)
- **isotimiaData** – 1 item (Isotímia)
- **euthynteriaIsotesData** – 4 items (positions for Euthynteria image; same ids as isotesData)

The **contentBody** shown in the detail card is resolved as:

```ts
contentBody = markdownContent?.body || glossaryTerm?.fullDescription || currentElement?.description
```

So: **if no markdown file exists** (sandbox) or isn’t loaded yet, the card shows `currentElement?.description` – the long inline strings in that file.

---

## Summary

| Location | Agreed storage | In practice |
|----------|----------------|------------|
| **Parent** | `src/content/glossary/*.md` | Directory exists (55 files). Loader works. Component still has full inline text as fallback. |
| **Sandbox** | `src/content/glossary/*.md` | **No directory** – no markdown files. Loader finds nothing. All card text comes from inline data in TempleArchitecture.tsx. |

---

## Editing element text today (no code changes for content)

**To add or correct text for an element:** Find that element in the directory tree and edit the markdown file.

- **Location:** `src/content/glossary/{id}.md` (e.g. `isonomia.md`, `prc.md`).
- **Format:** `.md` with YAML frontmatter (id, name, blurb, category, etc.) and a body. Human- and app-readable; no JSON for content.
- **Effect:** Both the Glossary and the Temple/Euthynteria detail cards use the same content (markdown body → glossary fallback → inline fallback). Edit the `.md` and both surfaces update.

Add/change/rename/delete **elements** (without touching React/Vite) is the future dev-tool vision; see **`docs/CONTENT_AND_DEV_TOOL_VISION.md`** in the repo root.

## Recommended next steps (when you’re ready to refactor)

1. **Sandbox (short term)**  
   Copy (or symlink) **parent `src/content/glossary/`** into **sandbox `src/content/glossary/`** so the sandbox uses the same agreed text files and the loader can find them. Cards will then use the markdown body when loaded; inline descriptions remain as fallback.

2. **Later refactor (real sandbox / main)**  
   - Move **only** position + minimal metadata (id, name, subtitle) into TempleArchitecture (or a small data file).  
   - Remove long `description` strings from the component; rely on `src/content/glossary/{id}.md` + glossary.ts fallback only.  
   - Optionally add a build or runtime check that every architecture id has a corresponding `content/glossary/{id}.md` (or known alias).

I can copy the parent’s `src/content/glossary/` into the sandbox next so the agreed directory exists there and detail cards can load from files.
