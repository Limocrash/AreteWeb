# Pillars image and section layout

## Tour order: bottom → top

The elevator tour goes **bottom to top** (Bedrock → Foundation → Pillars α → Pillars β → Pediment → Roof).

- **Pillar α** = **lower** row of pillars (Ekklesia, Pnyx, IsoKratOS, Homonia, Aegis, DikaiOS, Thérmansis, Nomothetesis).
- **Pillar β** = **upper** row (Paideia, Hephaistia, Asphaleia, Logodosia, Glaukós Mati, Therapons, Axia, Generational Fairness).

So when the user is on "Pillars α" the level indicator points to the lower row; on "Pillars β" it points to the upper row. (`pillarLevels.ts`: Pillars α has the higher `triangleTop` %, Pillars β the lower %.)

---

## Image plan (Nano Banana)

- **One architecture diagram** will be updated to include **ghosted pediment and roof** in the empty space above the pillars.
- Later, those areas can be **replaced with solid images** when:
  - **Pediment:** user has completed the completion seals (per existing gating).
  - **Roof:** user has completed the comprehension quiz.

No code change required for “one image with ghosted bits”; we just swap in the new asset. When we add pediment/roof unlock logic, we conditionally show the solid pediment/roof image (or overlay) instead of the ghosted area.

---

## Section layout: Option 3 (current) vs Option 1 (later)

### Option 3 — **Current / near term** (what we’re doing now)

- **Section 1 (top):** Single architecture image = pillars + **ghosted** pediment and roof (once Nano Banana provides it). One image for mechanics + placeholder for pediment/roof.
- **Section 2:** Euthynteria (philosophical basis), separate section.

**Rationale:** Euthynteria is the **philosophical basis** for AreTéCracy; the upper portion is the **mechanics** of the “ÓS”. Keeping them in two sections reflects that. Easiest to maintain for now; no cropping or third section.

### Option 1 — **Longer term** (more appealing conceptually)

- **Section 1:** Euthynteria (unchanged).
- **Section 2:** Pillars image **cropped** so that:
  - Only the **upper ~1/3 of the black plaques** is visible (equality names visible, description area cropped).
  - Crop **just above the top pillar row**, with **a little of the ghosted pediment** visible.
- **Section 3:** Pediment + roof image, with the **top of the top row of pillars** visible so it stitches visually.

**Rationale:** Pediment and roof are **not** part of the mechanics; they represent the **user’s role** in making AreTéCracy possible (pediment) and the **benefits** AreTéCracy provides in return (roof). A dedicated third section makes that distinction clear. More work (cropping, asset alignment, three sections).

### Option 2 — One long image

- Single image from Euthynteria through roof. Less favoured; harder to maintain and to swap pediment/roof assets independently.

---

## Summary

| Item | Decision |
|------|----------|
| Tour order | Bottom → top; Pillar α = lower row, Pillar β = upper row. |
| Image | One diagram with ghosted pediment/roof; later solid images when seals (pediment) and quiz (roof) are done. |
| Sections now | Option 3: Euthynteria one section, pillars + ghosted pediment/roof in one top image. |
| Sections later | Option 1: Three sections (Euthynteria, cropped pillars, pediment/roof) when we want clearer separation of mechanics vs role vs benefits. |
