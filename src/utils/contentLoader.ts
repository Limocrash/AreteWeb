// Content loader for markdown files with YAML frontmatter

export interface ContentMetadata {
  id: string;
  name: string;
  greekName?: string;
  blurb: string;
  headline?: string;
  order?: number;
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
  body: string;
}

export function parseContentFile(content: string): ContentFile {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error('Invalid content file format: missing YAML frontmatter');
  }

  const frontmatter = match[1];
  const body = match[2].trim();

  const metadata: Partial<ContentMetadata> = {};
  const lines = frontmatter.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = line.slice(colonIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1).trim();
      if (arrayContent === '') {
        value = [];
      } else {
        value = arrayContent
          .split(',')
          .map((item: string) => item.trim().replace(/^["']|["']$/g, ''))
          .filter((item: string) => item.length > 0);
      }
    }

    if (value === 'true') value = true;
    if (value === 'false') value = false;

    if (typeof value === 'string' && /^\d+$/.test(value)) {
      value = parseInt(value, 10);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (metadata as any)[key] = value;
  }

  return {
    metadata: metadata as ContentMetadata,
    body
  };
}

export async function loadContentFile(path: string): Promise<ContentFile> {
  try {
    const response = await fetch(path);
    const content = await response.text();
    return parseContentFile(content);
  } catch (error) {
    throw new Error(`Failed to load content file: ${path} - ${error}`);
  }
}

export function getAllGlossaryContent(): Record<string, ContentFile> {
  return {};
}
