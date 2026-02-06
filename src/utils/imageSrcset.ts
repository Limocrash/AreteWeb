// Shared helper for responsive image srcset (used by TempleArchitecture and DetailCard).
// Kept in utils so TempleArchitecture.tsx only exports the component (Fast Refresh compatible).

const BASE = (typeof import.meta !== 'undefined' && (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL) || '/';

export function getResponsiveSrcset(baseName: string, format: 'webp' | 'png' = 'webp'): string {
  const basePath = `${BASE}images/${baseName}`;
  return `${basePath}-small.${format} 400w, ${basePath}-medium.${format} 800w, ${basePath}-large.${format} 1200w`;
}
