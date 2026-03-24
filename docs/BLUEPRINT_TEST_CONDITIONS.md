# Blueprint Page Test Conditions

Run this checklist after each layout change to avoid regressions.

## Layout

- [ ] Image starts below the top nav row (Row 1).
- [ ] Image extends under Row 2 (theme toggles, Login, Join Us).
- [ ] No unwanted scroll or gap on the Blueprint page.

## Label

- [ ] "The Blueprint / Click a hub to explore" label top edge is at or below the middle of the Row 2 buttons.
- [ ] Label is locked to image (scales and moves with the image across viewports).
- [ ] Label has opaque/semi-opaque background for readability.

## Hotspots

- [ ] All five hotspots (Legislative Protection, The People's Assembly, Competent Execution, Accountability & Transparency, Generational Fairness) are visible and clickable.
- [ ] Hotspots are not obscured by the label or Row 2.
- [ ] **If Legislative Protection or other hotspots look misaligned:** Re-measure coordinates in `src/data/blueprintHubs.ts` at 2117×1064 reference resolution.

## Viewports

- [ ] 2560×1600 (WQXGA, 16:10)
- [ ] 1920×1080 (Full HD)
- [ ] Narrow mobile width (e.g. 375×667)

## Nav Measurements (Reference: 2560×1600)

| Element | Height |
|---------|--------|
| Row 1 (main nav) | 99px |
| Row 2 (theme, Login, Join Us) | 60px |
| Combined | 159px |
