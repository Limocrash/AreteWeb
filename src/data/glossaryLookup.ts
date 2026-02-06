// Thin async wrapper for glossary lookups (Pillars/DetailCard).
// Uses getTermById from glossary and returns a Promise for API compatibility with main app.

import { getTermById } from './glossary';
import type { GlossaryTerm } from './glossary';

/**
 * Get a glossary term by ID (async - resolves with glossary data).
 * Use this in TempleArchitecture/DetailCard for Pillars tour.
 */
export async function getTermByIdAsync(id: string): Promise<GlossaryTerm | undefined> {
  return Promise.resolve(getTermById(id));
}
