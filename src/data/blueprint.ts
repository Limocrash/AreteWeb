// Blueprint content loader - hubs and hotspots from manifest + MD files

import { parseContentFile, ContentFile } from '../utils/contentLoader';

// Manifest is the single source of truth for hub/hotspot structure
import manifest from '../content/blueprint/manifest.json';

// Load all blueprint markdown files (nested under hub folders)
const blueprintModules = import.meta.glob<string>('../content/blueprint/**/*.md', {
  eager: false,
  query: '?raw',
  import: 'default'
});

const contentCache: Record<string, ContentFile> = {};

/** Resolve contentFile path (e.g. "ekklesia/ekklesia.md") to glob key */
function findModulePath(relativePath: string): string | undefined {
  const normalized = relativePath.replace(/\\/g, '/');
  return Object.keys(blueprintModules).find((p) => p.endsWith(normalized));
}

/** Load and parse a blueprint content file by its relative path */
async function loadByPath(relativePath: string): Promise<ContentFile | undefined> {
  const cacheKey = relativePath;
  if (contentCache[cacheKey]) return contentCache[cacheKey];

  const modulePath = findModulePath(relativePath);
  if (!modulePath) return undefined;

  try {
    const loader = blueprintModules[modulePath];
    const mod = await loader();
    const raw = typeof mod === 'string' ? mod : (mod as { default: string }).default;
    const parsed = parseContentFile(raw);
    contentCache[cacheKey] = parsed;
    return parsed;
  } catch {
    return undefined;
  }
}

export interface BlueprintHubTooltip {
  id: string;
  label: string;
  text: string;
  leftPercent: number;
  topPercent: number;
  widthPercent: number;
}

export interface BlueprintHub {
  id: string;
  name: string;
  position: string;
  type: string;
  contentFile: string;
  imageFile?: string;
  imageWidth?: number;
  imageHeight?: number;
  tooltips?: BlueprintHubTooltip[];
  hotspots: {
    id: string;
    file: string;
    order: number;
    column?: string;
    leftPercent?: number;
    topPercent?: number;
    widthPercent?: number;
    heightPercent?: number;
    shape?: string;
    navigateTo?: string;
    doubleHeight?: boolean;
  }[];
}

export const blueprintHubs: BlueprintHub[] = manifest.hubs as BlueprintHub[];

/** Load central hub or process hub content */
export async function loadBlueprintHubContent(hubId: string): Promise<ContentFile | undefined> {
  const hub = blueprintHubs.find((h) => h.id === hubId);
  if (!hub) return undefined;
  return loadByPath(hub.contentFile);
}

/** Load hotspot content within a hub */
export async function loadBlueprintHotspotContent(
  hubId: string,
  hotspotId: string
): Promise<ContentFile | undefined> {
  const hub = blueprintHubs.find((h) => h.id === hubId);
  if (!hub?.hotspots?.length) return undefined;
  const hotspot = hub.hotspots.find((h) => h.id === hotspotId);
  if (!hotspot) return undefined;
  const hubFolder = hub.contentFile.split('/')[0];
  const relativePath = `${hubFolder}/${hotspot.file}`;
  return loadByPath(relativePath);
}
