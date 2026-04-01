// Blueprint hub buttons: display names + center positions (percentage of content area)
// Coordinates from Measure-It screenshots; reference 2117×1064 for landing image

/** Aspect ratio (width/height) of landing image - must match actual image file so hotspots stay aligned.
 *  blueprint-landing-map.png is 2724×1682. */
export const BLUEPRINT_LANDING_ASPECT_RATIO = 2724 / 1682;

/** Aspect ratio (width/height) of blueprint scroll background */
export const BLUEPRINT_SCROLL_ASPECT_RATIO = '2/3';

/** Aspect ratio of nomothesia map - must match nomothesia-map image (1200×750) for hotspot alignment */
export const NOMOTHESIA_MAP_ASPECT_RATIO = 1200 / 750;

/** Aspect ratio of Dokimazo map — native image is 4400×2818 */
export const DOKIMAZO_MAP_ASPECT_RATIO = 4400 / 2818;

export interface BlueprintHubButton {
  id: string;
  label: string; // English only, for button
  leftPercent: number;
  topPercent: number;
  hasMap: boolean; // true if blueprint map image exists for this hub
}

// Landing map image: 2724×1682
// Coordinates from Blueprint Landing Map Node Coordinates.xlsx
// Note: Photoshop canvas has Y=11 offset — all topPercent values subtract 11px before dividing by image height (1682)
// topPercent = (Y_canvas + Height/2 - 11) / 1682
// leftPercent = (X_canvas + Width/2) / 2724
export const BLUEPRINT_HUB_BUTTONS: BlueprintHubButton[] = [
  { id: 'ekklesia',         label: "The People's Assembly",        leftPercent: 50.02, topPercent: 50.03, hasMap: true  },
  { id: 'nomothesia',       label: "The People's Laws",           leftPercent: 14.04, topPercent: 19.77, hasMap: true  },
  { id: 'therapon-dokimazo',label: "The People's Government",      leftPercent: 86.23, topPercent: 20.07, hasMap: true  },
  { id: 'glaukos-mati',     label: 'Accountability & Transparency',leftPercent: 14.04, topPercent: 80.20, hasMap: false },
  { id: 'paideia',          label: 'Generational Fairness',        leftPercent: 86.15, topPercent: 80.23, hasMap: false },
];
