// Content loader for markdown files with YAML frontmatter

export interface ContentMetadata {
  id: string;
  name: string;
  greekName?: string;
  blurb: string;
  complexity?: 1 | 2 | 3;
  category?: 'pillar' | 'virtue' | 'equality' | 'process' | 'institution' | 'concept' | 'article' | 'announcement';
  hasFullPage?: boolean;
  relatedTerms?: string[];
  tags?: string[];
  published?: boolean;
  publishedDate?: string;
  lastUpdated?: string;
  author?: string;
  featuredImage?: string;
  tier?: string;
  parentPillar?: string;
}

export interface ContentFile {
  metadata: ContentMetadata;
  body: string; // Markdown content body
}

/**
 * Parse YAML frontmatter and markdown body from a content file
 */
export function parseContentFile(content: string): ContentFile {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error('Invalid content file format: missing YAML frontmatter');
  }

  const frontmatter = match[1];
  const body = match[2].trim();

  // Parse YAML frontmatter (simple parser for basic key-value pairs)
  const metadata: Partial<ContentMetadata> = {};
  const lines = frontmatter.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value: any = line.slice(colonIndex + 1).trim();

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1).trim();
      if (arrayContent === '') {
        value = [];
      } else {
        value = arrayContent
          .split(',')
          .map(item => item.trim().replace(/^["']|["']$/g, ''))
          .filter(item => item.length > 0);
      }
    }

    // Parse booleans
    if (value === 'true') value = true;
    if (value === 'false') value = false;

    // Parse numbers
    if (/^\d+$/.test(value)) {
      value = parseInt(value, 10);
    }

    (metadata as any)[key] = value;
  }

  return {
    metadata: metadata as ContentMetadata,
    body
  };
}

/**
 * Load a content file dynamically (for runtime loading)
 * Note: In Vite, we need to use import.meta.glob for static analysis
 */
export async function loadContentFile(path: string): Promise<ContentFile> {
  try {
    // For Vite, we'll use import.meta.glob in the component
    // This is a placeholder for the actual implementation
    const response = await fetch(path);
    const content = await response.text();
    return parseContentFile(content);
  } catch (error) {
    throw new Error(`Failed to load content file: ${path} - ${error}`);
  }
}

/**
 * Get all glossary content files (build-time)
 * This will be populated by a build script or Vite's import.meta.glob
 */
export function getAllGlossaryContent(): Record<string, ContentFile> {
  // This will be populated at build time or via import.meta.glob
  return {};
}
