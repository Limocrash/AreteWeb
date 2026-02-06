/**
 * Single source of truth for Architekton Elevator levels.
 * Used by PillarsIntro, PillarsMainView, and TempleArchitecture for labels and triangle positions.
 */
export interface PillarLevel {
  id: string;
  label: string;
  floor: number;
  /** Vertical position (percent 0–100) for the level indicator triangle on the temple image */
  triangleTop: number;
}

// List order: Roof → Bedrock. α = 1 (lower row), β = 2 (upper row); so in list β above α.
// triangleTop values are tuned to line the blue elevator triangles up with the actual visual levels:
// - Roof       → middle of the pediment/roof message card
// - Pediment   → halfway between the bottom of that message and the top of the pillars
// - Pillars β  → same vertical band as the upper-row completion seals
// - Pillars α  → same vertical band as the lower-row completion seals
export const PILLAR_LEVELS: readonly PillarLevel[] = [
  { id: 'roof', label: 'Roof', floor: 0, triangleTop: 11 },
  { id: 'pediment', label: 'Pediment', floor: 1, triangleTop: 27 },
  { id: 'pillars-beta', label: 'Pillars β', floor: 2, triangleTop: 45 }, // upper row (Paideia, Hephaistia…)
  { id: 'pillars-alpha', label: 'Pillars α', floor: 3, triangleTop: 68 }, // lower row (Ekklesia, Pnyx…); α below β in list
  { id: 'foundation', label: 'Foundation', floor: 4, triangleTop: 22 },
  { id: 'bedrock', label: 'Bedrock', floor: 5, triangleTop: 64 },
] as const;

export type PillarLevelId = (typeof PILLAR_LEVELS)[number]['id'];

/** Label list for elevator menu (same order as PILLAR_LEVELS) */
export const PILLAR_LEVEL_LABELS = PILLAR_LEVELS.map((l) => l.label);

export const PILLAR_LEVEL_COUNT = PILLAR_LEVELS.length;
