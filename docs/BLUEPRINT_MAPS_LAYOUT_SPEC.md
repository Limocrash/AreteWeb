# Blueprint Maps Layout Spec

**Purpose:** Definition of done for Blueprint landing and hub map layouts. Do not alter these rules without explicit approval.

---

## Navbar dimensions (reference: 1920×1080)

| Element | Height | Notes |
|---------|--------|-------|
| Row 1 | 60px | Solid background; content must not extend into this area |
| Row 2 | 50px | Transparent in center; title banner may extend into this area only |
| Total | 110px | Image/map content must start at or below this offset |

**Implementation:** Use CSS variables or constants: `--navbar-row1: 60px`, `--navbar-row2: 50px`, `--navbar-total: 110px`.

---

## Image (map content) positioning

- **Landing:** Top edge at 60px (below Row 1 only), so image extends under Row 2 (transparent) — no gap. `object-cover object-top` fills viewport; no letterboxing (crops bottom if viewport is short).
- **Hub maps:** Top edge at 110px (below both rows) so title banner has room. `object-contain`; full image visible; minimal letterboxing; map size does not change on scroll.
- **Do not** use `padding-top` that shrinks map height; use margin/positioning/spacer.

---

## Title banner (hub maps: "Legislative Process" / "Nomothesia" etc.)

- **Intent:** Extend upward to cover the gold key meander in the border, without overlapping map text (e.g. Citizens Assembly).
- **Position:** Use negative `top` so the banner extends above the map container.
- **Constraint:** Banner may extend into Row 2 (50px) only. It must NOT extend into Row 1 (60px).
- **Implementation:** `top: clamp(-50px, -4%, 0)` — caps upward extension at 50px.
- **Do not** change to a positive `top` that would overlap map content.

---

## Overlay mapping accuracy (highest priority)

- Overlays must stay aligned with the image at any zoom.
- Image and overlay container must share the same dimensions and aspect ratio.
- Use percentage positioning (`leftPercent`, `topPercent`) relative to the image container.
- Avoid `object-cover` that crops and shifts the visible region; use `object-contain` or natural image sizing.

---

## Scaling (navbar, footer, back button, title banner, map overlays)

- Use CSS variables in `:root`: `--nav-item-font`, `--map-overlay-font`, `--map-title-font`, `--map-subtitle-font`.
- **Rem-only** — no `vw`, `vh`, or `cqi` — for stable sizing across viewport and zoom. Values: `--nav-item-font: 1rem`, `--map-overlay-font: 0.9375rem`, `--map-title-font: 1.5rem`, `--map-subtitle-font: 0.9375rem`.
- Hub map title banner and hotspots: fixed rem (e.g. 1.25rem, 0.9375rem).
- **Avoid responsive breakpoints** (e.g. `md:`) on nav items and map overlays — use fixed sizes so elements don't jump when viewport crosses breakpoints. Note: browser zoom scales everything; CSS cannot prevent that.

---

## Checklist for changes affecting Blueprint maps

- [ ] Landing: image top at 60px (extends under Row 2). Hub maps: image top at 110px.
- [ ] Title banner uses `clamp(-50px, -4%, 0)` and does not extend into Row 1.
- [ ] No `padding-top` that shrinks map height; use margin/positioning/spacer.
- [ ] Overlays remain correctly aligned with the image.
- [ ] Scaling uses rem-only; no `vw`/`vh`/`cqi`.
