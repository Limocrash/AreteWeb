# Bringing "The Pillars" Page Into the Gemini Sandbox

**Goal:** Replace the "Coming soon" placeholder for `#/pillars` with the real Pillars page, without breaking home, glossary, or navigation.

---

## Current State

- **Sandbox:** `#/pillars` → "Coming soon" placeholder. `handleNavigateToPillar` only logs.
- **Main app:** Full `PillarsPage` with `TempleIntro`, `TempleArchitecture`, own parchment bg, Back + theme toggle. Uses `templeProgress`, `glossaryLookup`, `content`, `DetailCard`, images.

**Key dependencies:**

| Item | Main app | Sandbox |
|------|----------|---------|
| `TempleArchitecture` | Full component (diagram, hotspots, DetailCard) | Stub (`getResponsiveSrcset` only) |
| `TempleIntro` | Yes | No |
| `StoneTabletButton` | Yes (used by TempleIntro) | No |
| `templeProgress` | Yes | Yes (same API) |
| `glossaryLookup` | Yes | No |
| `content` / `getGlossaryContent` | Yes | Yes |
| `DetailCard` | Yes | Yes (sandbox version) |
| `backgroundScene` (figma:asset) | Imported in PillarsPage | **Unused** – remove |
| Images | `/images/` (architecture, euthynteria, completion-seal, temple-pediment) | Same paths if public is shared |

---

## Recommended Steps (in order)

### Step 1: Add missing data/util — `glossaryLookup`

- **What:** Add `src/data/glossaryLookup.ts` to the sandbox (copy from main app, or thin wrapper around `getTermById` from `glossary`).
- **Why:** `TempleArchitecture` uses `getTermByIdAsync` for glossary links.
- **Check:** No other sandbox code breaks; glossary/content loading still works.

---

### Step 2: Replace `TempleArchitecture` stub with real component

- **What:** Replace `gemini-gemini-sandbox/src/components/TempleArchitecture.tsx` with the main app’s `TempleArchitecture`, then fix imports:
  - `../utils/templeProgress` → `../utils/templeProgress` (already exists)
  - `../data/glossaryLookup` → `../data/glossaryLookup` (after Step 1)
  - `../data/content` → `../data/content`
  - `./DetailCard` → `./DetailCard`
  - Image paths: keep `/images/...` and `BASE_URL`; ensure sandbox `public` (or parent) has `architecture-diagram`, `temple-euthynteria`, `completion-seal`, `temple-pediment` assets.
- **What not to do:** Don’t wire Pillars routing yet; don’t render `PillarsPage`.
- **Check:** Build passes. No runtime errors when `TempleArchitecture` is imported (e.g. from a temporary test route or wrapper).

---

### Step 3: Add a minimal `PillarsPage` (no intro, use app chrome)

- **What:** Create `PillarsPage.tsx` in the sandbox that:
  - Accepts `darkMode`, `selectedPillarId?`, `onNavigateToPillar?`.
  - **Does not** use its own parchment background (use app’s existing parchment).
  - **Does not** render `TempleIntro` or a custom nav (no Back, no theme toggle). Use the existing top `Navigation` only.
  - Renders a "The Pillars"–style heading + `TempleArchitecture` with `darkMode` and `onNavigateToPillar`.
  - Drops the `backgroundScene` (figma) import entirely.
- **Why:** Keeps layout consistent with Glossary, avoids duplicate nav/theme, and isolates Pillars-specific UI.
- **Check:** Build passes. Still **do not** mount `PillarsPage` in App yet.

---

### Step 4: Mount `PillarsPage` on `#/pillars` only

- **What:** In `App.tsx`:
  - Import `PillarsPage` (lazy-load optional but recommended).
  - When `currentPage === 'pillars'`, render `PillarsPage` instead of the "Coming soon" placeholder.
  - Pass `darkMode` from app state, `onNavigateToPillar={handleNavigateToPillar}`.
  - For now, pass `selectedPillarId={null}` (we’ll add hash parsing in Step 6).
- **Check:** Clicking "The Pillars" in the nav goes to `#/pillars` and shows the new Pillars page. Home, Glossary, Legal, etc. unchanged.

---

### Step 5: Wire `handleNavigateToPillar` and "SEE THE BLUEPRINT"

- **What:**
  - Implement `handleNavigateToPillar(columnId)` to: navigate to `#/pillars` (and later `#/pillars?pillar=...` when we have it), then open the correct pillar detail (or scroll to it) **on the Pillars page**.
  - Ensure "SEE THE BLUEPRINT" and any hero CTAs that should go to Pillars call `onNavigate?.('pillars')` or `onNavigateToPillar(...)` as appropriate.
- **Why:** So hero → Pillars and Glossary "View Full Page" / "Rests on" → Pillars work.
- **Check:** From home, "SEE THE BLUEPRINT" (or equivalent) opens Pillars. From Glossary, pillar links open Pillars (detail behavior can be refined next).

---

### Step 6: Hash parsing for `#/pillars?pillar=...`

- **What:**
  - Extend `getPageFromUrl()` (or equivalent) to parse `#/pillars?pillar=prc` and return both page `'pillars'` and `pillar: 'prc'`.
  - Add `selectedPillarId` to app state (or derive from hash). Pass it into `PillarsPage`.
  - When `PillarsPage` mounts with `selectedPillarId`, either scroll to that section or auto-open that pillar’s `DetailCard` (match main app behavior if it does this).
- **Check:** Navigating to `#/pillars?pillar=prc` opens Pillars and focuses PRC (or the right pillar). Back/forward and shared links work as expected.

---

### Step 7: (Optional) Add Pillars intro

- **What:** Use `PillarsIntro` (already in sandbox). It provides:
  - **Short-term intro:** Pediment image → translucent white text frame fades in (“Building a great, resilient… begins with the foundational bedrock…”) → hold ~4s → fade out → image crossfades to Bedrock (euthynteria) → “Begin Construction” button.
  - **Elevator panel:** DOWN arcade-style button (flashing) + digital display cycling Roof → Pediment → Pillars → Floor Slab → Foundation → Bedrock; stops on Bedrock when the image transitions.
- **Integration:** In `PillarsPage`, show `PillarsIntro` for first-time visitors (`templeProgress` / `isReturningVisitor`), then on “Begin Construction” hide intro and show main Pillars content. Returning visitors skip text + image transition and go straight to Bedrock + button.
- **Check:** First visit: elevator + text sequence + image → Bedrock → button; returning visit: Bedrock + button; “Begin Construction” shows the temple.

---

### Step 8: Assets and visuals

- **What:** Confirm `public` (or parent) has:
  - `architecture-diagram` (and responsive variants if used),
  - `temple-euthynteria`,
  - `completion-seal`,
  - `temple-pediment` (for TempleIntro if added).
- **Check:** No 404s, correct paths, sensible `srcset`/`sizes` where used.

---

### Step 9: Smoke test and cleanup

- **What:**
  - Click through: Home → Pillars, Glossary → Pillars, Nav → Pillars. Open pillar details, use "Back to Glossary" / "View Full Page" where applicable.
  - Confirm dark mode, scrolling, and any completion/tracking still work.
  - Remove any temporary test routes or debug code.
- **Check:** No regressions; Pillars fits cleanly into the sandbox.

---

## Rollback

- If something breaks: revert the change that introduced it (e.g. remount "Coming soon" for `#/pillars`, or revert `TempleArchitecture` to the stub).
- Keep Steps 1–3 and 6–9 easy to revert (small, focused edits) so you can isolate failures.

---

## Summary

| Step | Action | Risky? |
|------|--------|--------|
| 1 | Add `glossaryLookup` | Low |
| 2 | Replace `TempleArchitecture` stub | Medium – most moving parts |
| 3 | Add minimal `PillarsPage` | Low |
| 4 | Mount Pillars on `#/pillars` | Low |
| 5 | Wire `handleNavigateToPillar` + CTAs | Low |
| 6 | Hash parsing `?pillar=...` | Low |
| 7 | (Optional) TempleIntro + StoneTabletButton | Low |
| 8 | Assets | Low |
| 9 | Smoke test + cleanup | – |

Do Steps 1–4 first; validate that Pillars loads and nothing else breaks. Then 5–6, then optional 7, then 8–9.
