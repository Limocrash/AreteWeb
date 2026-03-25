// Content loader using Vite's import.meta.glob
import { parseContentFile, ContentFile } from '../utils/contentLoader';

const glossaryModules = import.meta.glob('../content/glossary/*.md', { 
  eager: false,
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

// Use Partial<Record<...>> so TypeScript allows undefined index access
const glossaryContentCache: Partial<Record<string, ContentFile>> = {};
const loadingPromises: Partial<Record<string, Promise<ContentFile | undefined>>> = {};

async function loadGlossaryFile(id: string): Promise<ContentFile | undefined> {
  if (glossaryContentCache[id]) {
    return glossaryContentCache[id];
  }

  if (loadingPromises[id]) {
    return loadingPromises[id];
  }

  let filePath = Object.keys(glossaryModules).find(path => {
    const filename = path.split('/').pop()?.replace('.md', '') || '';
    return filename === id;
  });

  if (!filePath) {
    const idVariations: Record<string, string> = {
      'homonia': 'homonoia',
      'glaukos-mati': 'glauk-s-mati',
      'thermansis': 'th-rmansis',
      'nomothesia': 'nomothet-sis',
      'generational-fairness': 'generational-fairness-doctrine-gfd',
      'isotimia': 'isotim-a',
      'aletheia': 'al-theia',
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

  if (!filePath || !glossaryModules[filePath]) {
    return undefined;
  }

  const promise = glossaryModules[filePath]()
    .then(content => {
      try {
        const parsed = parseContentFile(content);
        glossaryContentCache[id] = parsed;
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

export function getGlossaryContent(id: string): ContentFile | undefined {
  return glossaryContentCache[id];
}

export async function preloadGlossaryContent(id: string): Promise<ContentFile | undefined> {
  return loadGlossaryFile(id);
}

export function getAllGlossaryContent(): Partial<Record<string, ContentFile>> {
  return glossaryContentCache;
}
