// Blueprint hub buttons: display names + center positions (percentage of content area)
// Coordinates from Measure-It screenshots; reference 2117×1064 for landing image

/** Aspect ratio (width/height) of landing image - must match actual image file so hotspots stay aligned.
 *  blueprint-ekklesia-hub-owl.webp is 1200×686. Update if image changes. */
export const BLUEPRINT_LANDING_ASPECT_RATIO = 1200 / 686;

/** Aspect ratio (width/height) of blueprint scroll background */
export const BLUEPRINT_SCROLL_ASPECT_RATIO = '2/3';

/** Aspect ratio of nomothesia map - must match blueprint-map-nomothetesis image (1200×769) for hotspot alignment */
export const NOMOTHESIA_MAP_ASPECT_RATIO = 1200 / 769;

export interface BlueprintHubButton {
  id: string;
  label: string; // English only, for button
  leftPercent: number;
  topPercent: number;
  hasMap: boolean; // true if blueprint map image exists for this hub
}

export const BLUEPRINT_HUB_BUTTONS: BlueprintHubButton[] = [
  { id: 'ekklesia',         label: "The People's Assembly",       leftPercent: 47.7, topPercent: 38.6, hasMap: false },
  { id: 'nomothesia',       label: 'Nomothesia',                  leftPercent: 20.5, topPercent: 11.3, hasMap: true  },
  { id: 'therapon-dokimazo',label: 'Competent Execution',         leftPercent: 86.7, topPercent:  9.6, hasMap: false },
  { id: 'paideia',          label: 'Generational Fairness',       leftPercent: 78.0, topPercent: 85.5, hasMap: false },
  { id: 'glaukos-mati',     label: 'Accountability & Transparency',leftPercent: 22.6, topPercent: 61.1, hasMap: false },
];
