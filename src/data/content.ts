// Content loader using Vite's import.meta.glob
// This loads all markdown files at build time

import { parseContentFile, ContentFile } from '../utils/contentLoader';

// Import all glossary markdown files
// Using lazy loading to prevent hangs during dev server startup
// Note: Markdown files may not exist in some environments - gracefully handle missing files
const glossaryModules = import.meta.glob('../content/glossary/*.md', { 
  eager: false, // Lazy load to prevent hangs
  // Vite 7+: use query/import instead of deprecated `as: 'raw'`
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

// Cache for parsed content
const glossaryContentCache: Record<string, ContentFile> = {};
const loadingPromises: Record<string, Promise<ContentFile | undefined>> = {};

/**
 * Load a glossary file by ID
 */
async function loadGlossaryFile(id: string): Promise<ContentFile | undefined> {
  // Check cache
  if (glossaryContentCache[id]) {
    return glossaryContentCache[id];
  }

  // Check if already loading
  if (loadingPromises[id]) {
    return loadingPromises[id];
  }

  // Find matching file - try exact match first, then common variations
  let filePath = Object.keys(glossaryModules).find(path => {
    const filename = path.split('/').pop()?.replace('.md', '') || '';
    return filename === id;
  });

  // If not found, try common ID variations (architecture/glossary id -> markdown filename)
  if (!filePath) {
    const idVariations: Record<string, string> = {
      'homonia': 'homonoia', // Architecture uses 'homonia', file is homonoia.md
      'glaukos-mati': 'glauk-s-mati', // Architecture uses 'glaukos-mati', file is glauk-s-mati.md
      'thermansis': 'th-rmansis',     // Architecture uses 'thermansis', file is th-rmansis.md
      'nomothesia': 'nomothet-sis', // Architecture/Blueprint uses 'nomothesia', glossary file is nomothet-sis.md
      'generational-fairness': 'generational-fairness-doctrine-gfd',
      'isotimia': 'isotim-a',         // Architecture uses 'isotimia', file is isotim-a.md
      'aletheia': 'al-theia',         // Architecture uses 'aletheia', file is al-theia.md
      // Additional glossary-only ID ↔ filename mappings
      'aretecracy': 'aret-cracy',
      'four-aretai': 'aretai-the-four',
      'four-isotes': 'is-t-s-the-four',
      'jr-ekklesia': 'junior-ekklesia',
      'klerosis': 'kl-r-sis',
      'sentilea': 'sentilea-synteleia',
      'atd': 'atd-automated-technological-dividend',
      'graphe-paranomon': 'graph-paranomon',
    };
    
    const variation = idVariations[id];
    if (variation) {
      filePath = Object.keys(glossaryModules).find(path => {
        const filename = path.split('/').pop()?.replace('.md', '') || '';
        return filename === variation;
      });
    }
    
    // Also try generic pattern: add 'o' before 'nia' (homonia -> homonoia)
    if (!filePath) {
      const idWithO = id.replace(/([^o])nia$/, '$1onoia');
      if (idWithO !== id) {
        filePath = Object.keys(glossaryModules).find(path => {
          const filename = path.split('/').pop()?.replace('.md', '') || '';
          return filename === idWithO;
        });
      }
    }
  }

  if (!filePath) {
    return undefined;
  }

  // Check if the module exists (markdown files may not exist in Gemini sandbox)
  if (!glossaryModules[filePath]) {
    return undefined;
  }

  // Create loading promise
  const promise = glossaryModules[filePath]()
    .then(content => {
      try {
        const parsed = parseContentFile(content);
        // Cache by the requested ID (not the filename) so future lookups work
        glossaryContentCache[id] = parsed;
        // Also cache by the actual frontmatter ID if different
        if (parsed.metadata.id && parsed.metadata.id !== id) {
          glossaryContentCache[parsed.metadata.id] = parsed;
        }
        return parsed;
      } catch (error) {
        console.error(`Failed to parse ${filePath}:`, error);
        return undefined;
      }
    })
    .catch(error => {
      console.error(`Failed to load ${filePath}:`, error);
      return undefined;
    })
    .finally(() => {
      delete loadingPromises[id];
    });

  loadingPromises[id] = promise;
  return promise;
}

/**
 * Get glossary content by ID (synchronous - returns cached content only)
 * Returns undefined if not yet loaded - component should handle this gracefully
 */
export function getGlossaryContent(id: string): ContentFile | undefined {
  return glossaryContentCache[id];
}

/**
 * Preload glossary content by ID (async)
 * Call this when you know you'll need the content soon
 */
export async function preloadGlossaryContent(id: string): Promise<ContentFile | undefined> {
  return loadGlossaryFile(id);
}

/**
 * Get all cached glossary content
 */
export function getAllGlossaryContent(): Record<string, ContentFile> {
  return glossaryContentCache;
}
