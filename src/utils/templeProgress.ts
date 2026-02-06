// Temple construction progress tracking

export interface TempleProgress {
  visited: boolean;
  constructedSections: string[];
  completionPercentage: number;
  lastVisit: string;
  /** Last scroll Y on Pillars page (for returning-visitor restore). */
  lastPillarsScrollY?: number;
}

const STORAGE_KEY = 'aretecracy-temple-progress';

// Euthynteria-only: sections match TempleArchitecture element ids
export const TEMPLE_SECTIONS = [
  'isotimia',
  'sonder',
  'philotimo',
  'prc',
  'aletheia',
  'isonomia',
  'isegoria',
  'isopoliteia',
  'isoeudaimonia',
];

export function getTempleProgress(): TempleProgress {
  if (typeof window === 'undefined') {
    return defaultProgress();
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (!stored) {
    return defaultProgress();
  }

  try {
    const parsed = JSON.parse(stored) as Partial<TempleProgress>;
    return {
      visited: parsed.visited ?? false,
      constructedSections: Array.isArray(parsed.constructedSections) ? parsed.constructedSections : [],
      completionPercentage: typeof parsed.completionPercentage === 'number' ? parsed.completionPercentage : 0,
      lastVisit: typeof parsed.lastVisit === 'string' ? parsed.lastVisit : new Date().toISOString(),
      lastPillarsScrollY: typeof parsed.lastPillarsScrollY === 'number' && parsed.lastPillarsScrollY >= 0 ? parsed.lastPillarsScrollY : undefined,
    };
  } catch {
    return defaultProgress();
  }
}

function defaultProgress(): TempleProgress {
  return {
    visited: false,
    constructedSections: [],
    completionPercentage: 0,
    lastVisit: new Date().toISOString(),
  };
}

export function saveTempleProgress(progress: TempleProgress): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markSectionConstructed(sectionId: string): void {
  const progress = getTempleProgress();
  
  if (!progress.constructedSections.includes(sectionId)) {
    progress.constructedSections.push(sectionId);
    progress.completionPercentage = Math.round(
      (progress.constructedSections.length / TEMPLE_SECTIONS.length) * 100
    );
    progress.lastVisit = new Date().toISOString();
    
    saveTempleProgress(progress);
  }
}

export function isSectionConstructed(sectionId: string): boolean {
  const progress = getTempleProgress();
  return progress.constructedSections.includes(sectionId);
}

/** True when all nine Euthynteria sections have a completion seal (pediment/roof can unlock). */
export function areAllPillarsCompleted(): boolean {
  const progress = getTempleProgress();
  return TEMPLE_SECTIONS.every((id) => progress.constructedSections.includes(id));
}

export function markVisited(): void {
  const progress = getTempleProgress();
  progress.visited = true;
  progress.lastVisit = new Date().toISOString();
  saveTempleProgress(progress);
}

export function isReturningVisitor(): boolean {
  const progress = getTempleProgress();
  return progress.visited;
}

export function resetTempleProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getLastPillarsScrollY(): number | null {
  const progress = getTempleProgress();
  return progress.lastPillarsScrollY ?? null;
}

export function setLastPillarsScrollY(y: number): void {
  if (typeof window === 'undefined') return;
  const progress = getTempleProgress();
  progress.lastPillarsScrollY = Math.max(0, y);
  saveTempleProgress(progress);
}
