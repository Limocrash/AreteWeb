import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { loadBlueprintHubContent, loadBlueprintHotspotContent, blueprintHubs } from '../data/blueprint';
import { BLUEPRINT_HUB_BUTTONS, BLUEPRINT_LANDING_ASPECT_RATIO, NOMOTHETESIS_MAP_ASPECT_RATIO } from '../data/blueprintHubs';
import { DetailCard } from './DetailCard';
import { MarkdownContent } from './MarkdownContent';
import type { ContentFile } from '../utils/contentLoader';

interface BlueprintPageProps {
  darkMode: boolean;
}

function getBlueprintHubFromHash(): string | null {
  const hash = window.location.hash;
  const m = hash.match(/^#\/blueprint(?:\/([a-z-]+))?$/);
  return m ? (m[1] || null) : null;
}

function navigateToBlueprintHub(hubId: string | null) {
  const hash = hubId ? `#/blueprint/${hubId}` : '#/blueprint';
  window.history.pushState({}, '', hash);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function BlueprintPage({ darkMode }: BlueprintPageProps) {
  const [hubId, setHubId] = useState<string | null>(() => getBlueprintHubFromHash());
  const [pnyxBloomOpen, setPnyxBloomOpen] = useState(false);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);
  const [hotspotCardOrigin, setHotspotCardOrigin] = useState<{ x: number; y: number } | null>(null);
  const [content, setContent] = useState<ContentFile | null>(null);
  const [loading, setLoading] = useState(false);

  // Sync hubId from URL (back/forward, or nav link click)
  useEffect(() => {
    const handler = () => setHubId(getBlueprintHubFromHash());
    window.addEventListener('popstate', handler);
    window.addEventListener('hashchange', handler);
    return () => {
      window.removeEventListener('popstate', handler);
      window.removeEventListener('hashchange', handler);
    };
  }, []);

  // Clear selected hotspot when switching hubs
  useEffect(() => {
    setSelectedHotspotId(null);
    setHotspotCardOrigin(null);
  }, [hubId]);

  // Load content: ekklesia bloom, nomothetesis hotspot, or hub overview
  useEffect(() => {
    if (pnyxBloomOpen) {
      let cancelled = false;
      setLoading(true);
      loadBlueprintHubContent('ekklesia')
        .then((data) => { if (!cancelled) setContent(data ?? null); })
        .catch(() => { if (!cancelled) setContent(null); })
        .finally(() => { if (!cancelled) setLoading(false); });
      return () => { cancelled = true; };
    }
    if (!hubId) {
      setContent(null);
      return;
    }
    if (hubId === 'nomothetesis' && selectedHotspotId) {
      let cancelled = false;
      setLoading(true);
      loadBlueprintHotspotContent('nomothetesis', selectedHotspotId)
        .then((data) => { if (!cancelled) setContent(data ?? null); })
        .catch(() => { if (!cancelled) setContent(null); })
        .finally(() => { if (!cancelled) setLoading(false); });
      return () => { cancelled = true; };
    }
    let cancelled = false;
    setLoading(true);
    loadBlueprintHubContent(hubId)
      .then((data) => { if (!cancelled) setContent(data ?? null); })
      .catch(() => { if (!cancelled) setContent(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [hubId, pnyxBloomOpen, selectedHotspotId]);

  const handleHubClick = useCallback((id: string) => {
    if (id === 'ekklesia') {
      setPnyxBloomOpen(true);
    } else {
      navigateToBlueprintHub(id);
      setHubId(id);
    }
  }, []);

  const handleBackToLanding = useCallback(() => {
    navigateToBlueprintHub(null);
    setHubId(null);
  }, []);

  const base = import.meta.env.BASE_URL || '/';

  // Scroll to top when opening a hub page (so diagram is visible, not centered in a long page)
  useEffect(() => {
    if (hubId && !pnyxBloomOpen) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [hubId, pnyxBloomOpen]);

  // Hub page (not landing) - scroll-together: background, map, overlays, and card all in one unit
  if (hubId && !pnyxBloomOpen) {
    const hub = BLUEPRINT_HUB_BUTTONS.find((b) => b.id === hubId);
    const hubLabel = hub?.label ?? hubId;
    const hasMap = hub?.hasMap ?? false;

    // Nomothetesis: fit viewport so diagram is visible on load; full scroll via object-contain
    const useScrollLayout = hasMap && hubId === 'nomothetesis';

    return (
      <div
        className={`relative w-full ${
          darkMode ? 'text-amber-100' : 'text-stone-900'
        }`}
      >
        {/* BlueprintMap-BG overlay - only for hub with map; sits above app background, below content */}
        {useScrollLayout && (
          <div
            className="fixed left-0 right-0 bottom-0 z-0"
            style={{ top: 'var(--navbar-total, 110px)' }}
            aria-hidden
          >
            <img
              src={darkMode ? `${base}images/blueprint/BlueprintMap-BG-DarkMode.png` : `${base}images/blueprint/BlueprintMap-BG-LightMode.jpg`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {/* Single scroll unit: canvas fits viewport so diagram visible on load; uses --navbar-total (110px) per docs/BLUEPRINT_MAPS_LAYOUT_SPEC.md */}
        <div
          className={`relative w-full ${useScrollLayout ? 'pb-[var(--navbar-total)]' : ''}`}
          style={{
            minHeight: useScrollLayout ? 'calc(100vh - var(--navbar-total, 110px) - 6rem)' : 'calc(100vh - 8rem - 6rem)',
            height: useScrollLayout ? 'calc(100vh - var(--navbar-total, 110px) - 6rem)' : undefined,
            maxHeight: useScrollLayout ? 'calc(100vh - var(--navbar-total, 110px) - 6rem)' : undefined,
          }}
        >
          {/* Background layer - NOT fixed, scrolls with content */}
          <div className={`absolute inset-0 ${useScrollLayout ? 'flex items-center justify-center' : ''}`}>
            {useScrollLayout ? (
              <div
                className="relative h-full max-w-full [container-type:size]"
                style={{ aspectRatio: NOMOTHETESIS_MAP_ASPECT_RATIO }}
              >
                <img
                  src={`${base}images/blueprint/blueprint-background-large.webp`}
                  srcSet={`${base}images/blueprint/blueprint-background-small.webp 400w, ${base}images/blueprint/blueprint-background-medium.webp 800w, ${base}images/blueprint/blueprint-background-large.webp 1200w`}
                  sizes="100vw"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-contain object-center"
                />
                <img
                  src={`${base}images/blueprint/blueprint-map-nomothetesis-large.webp`}
                  srcSet={`${base}images/blueprint/blueprint-map-nomothetesis-small.webp 400w, ${base}images/blueprint/blueprint-map-nomothetesis-medium.webp 800w, ${base}images/blueprint/blueprint-map-nomothetesis-large.webp 1200w`}
                  sizes="100vw"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none"
                />
                <div
                  className={`absolute inset-0 ${
                    darkMode
                      ? 'bg-gradient-to-b from-black/20 via-black/10 to-black/25'
                      : 'bg-gradient-to-b from-amber-950/15 via-transparent to-amber-950/20'
                  }`}
                  aria-hidden
                />
                {/* Hotspot overlay - coordinates match map (1200x769) */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="relative w-full h-full pointer-events-auto">
                    {(blueprintHubs.find((h) => h.id === 'nomothetesis')?.hotspots ?? [])
                      .filter((h): h is typeof h & { leftPercent: number; topPercent: number } => 
                        h.leftPercent != null && h.topPercent != null
                      )
                      .map((hotspot) => (
                        <button
                          key={hotspot.id}
                          type="button"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHotspotCardOrigin({
                              x: rect.left + rect.width / 2,
                              y: rect.top + rect.height / 2,
                            });
                            setSelectedHotspotId(hotspot.id);
                          }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.15em] font-semibold transition-all duration-200 flex items-center justify-center overflow-hidden hover:scale-110 hover:brightness-110 hover:ring-2 hover:ring-amber-400/60 active:scale-95 active:brightness-95"
                          style={{
                            left: `${hotspot.leftPercent}%`,
                            top: `${hotspot.topPercent}%`,
                            width: '2.67%',
                            aspectRatio: 1,
                            fontSize: '0.9375rem',
                            ...(darkMode
                              ? {
                                  backgroundColor: 'rgba(146, 64, 14, 0.9)',
                                  borderColor: 'rgba(180, 83, 9, 0.95)',
                                  color: '#fef3c7',
                                }
                              : {
                                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                                  borderColor: 'rgba(146, 64, 14, 0.9)',
                                  color: '#292524',
                                }),
                          }}
                          title={hotspot.id}
                          aria-label={`Hotspot: ${hotspot.id}`}
                        >
                          {hotspot.order + 1}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={`${base}images/blueprint/blueprint-ekklesia-hub-owl.webp`}
                  alt=""
                  aria-hidden
                  className="w-full h-full object-cover object-center"
                />
                <div
                  className={`absolute inset-0 ${
                    darkMode
                      ? 'bg-gradient-to-b from-black/20 via-black/10 to-black/25'
                      : 'bg-gradient-to-b from-amber-950/15 via-transparent to-amber-950/20'
                  }`}
                  aria-hidden
                />
              </>
            )}
          </div>

          {/* Content at top so visible on load */}
          <div className="absolute inset-0 flex flex-col items-start py-12 px-4 sm:px-6 lg:px-8 pointer-events-none">
            <div className="mb-6 flex items-center gap-4 pointer-events-auto">
              <button
                type="button"
                onClick={handleBackToLanding}
                className={`text-sm font-medium hover:underline ${
                  darkMode ? 'text-amber-300' : 'text-amber-700'
                }`}
              >
                ← Back to The Blueprint
              </button>
              {useScrollLayout && selectedHotspotId && (
                <button
                  type="button"
                  onClick={() => setSelectedHotspotId(null)}
                  className={`text-sm font-medium hover:underline ${
                    darkMode ? 'text-amber-400' : 'text-amber-600'
                  }`}
                >
                  View overview
                </button>
              )}
            </div>
            <div className="max-w-3xl w-full flex-1 flex flex-col items-start pointer-events-auto">
              <h1
                className="text-3xl md:text-4xl font-bold mb-6 text-center"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {hubLabel}
              </h1>
              {loading && !selectedHotspotId ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-400" />
                </div>
              ) : content && !(useScrollLayout && selectedHotspotId) ? (
                <div
                  className={`rounded-lg border-2 p-6 md:p-8 backdrop-blur-sm w-full ${
                    darkMode
                      ? 'border-amber-700/50 bg-stone-900/70'
                      : 'border-amber-600/50 bg-stone-50/90'
                  }`}
                >
                  <h2
                    className="text-2xl md:text-3xl font-bold mb-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {content.metadata.name}
                    {content.metadata.greekName && (
                      <span className="block text-lg font-normal italic text-amber-400">
                        {content.metadata.greekName}
                      </span>
                    )}
                  </h2>
                  <MarkdownContent content={content.body} darkMode={darkMode} />
                </div>
              ) : useScrollLayout && selectedHotspotId ? (
                loading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-400" />
                  </div>
                ) : null
              ) : (
                <p
                  className="text-center text-lg"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {hasMap
                    ? 'Hub map will have numbered hotspots here.'
                    : 'Map and content coming soon.'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Nomothesia hotspot cards - Glossary-style DetailCard bloom */}
        {useScrollLayout && selectedHotspotId && hotspotCardOrigin && content?.metadata?.id === selectedHotspotId && (
          <AnimatePresence>
              <DetailCard
                key={selectedHotspotId}
                element={{
                  id: content.metadata.id,
                  name: content.metadata.name,
                  greekName: content.metadata.greekName,
                }}
                glossaryTerm={{ blurb: content.metadata.blurb ?? '' }}
                contentBody={content.body}
                darkMode={darkMode}
                cardOrigin={hotspotCardOrigin}
                onClose={() => {
                  setSelectedHotspotId(null);
                  setHotspotCardOrigin(null);
                }}
                mode="triad"
              />
          </AnimatePresence>
        )}
      </div>
    );
  }

  // Landing: scrollable, full image via object-contain. Image extends under Row 2 (pt uses --navbar-row1). Page scrolls when image taller than viewport.
  return (
    <div
      className={`relative min-h-0 ${darkMode ? 'text-amber-100' : 'text-stone-900'}`}
    >
      {/* Container: natural height from aspect-ratio; object-contain = full image, scroll when needed */}
      <div className={`relative z-0 w-full ${darkMode ? 'bg-stone-900' : 'bg-stone-200'}`}>
        <div
          className="relative w-full bg-stone-900"
          style={{ aspectRatio: BLUEPRINT_LANDING_ASPECT_RATIO }}
        >
          <img
            src={`${base}images/blueprint/blueprint-ekklesia-hub-owl.webp`}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-contain object-center"
          />
          <div
            className={`absolute inset-0 ${
              darkMode
                ? 'bg-gradient-to-b from-black/15 via-black/8 to-black/20'
                : 'bg-gradient-to-b from-amber-950/10 via-transparent to-amber-950/15'
            }`}
            aria-hidden
          />
          {/* Hotspots in same container as image - aligned at all aspect ratios */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full pointer-events-auto">
              {BLUEPRINT_HUB_BUTTONS.map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => handleHubClick(btn.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg border-2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-100"
                style={{
                  left: `${btn.leftPercent}%`,
                  top: `${btn.topPercent}%`,
                  fontSize: 'var(--map-overlay-font)',
                  // Beveled / clickable look: white/light bg, darker border (sienna-ish)
                  ...(darkMode
                    ? {
                        backgroundColor: 'rgba(146, 64, 14, 0.95)',
                        borderColor: 'rgba(180, 83, 9, 0.95)',
                        color: '#fef3c7',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.3)',
                      }
                    : {
                        backgroundColor: 'rgba(255, 255, 255, 0.92)',
                        borderColor: 'rgba(146, 64, 14, 0.9)',
                        color: '#292524',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 4px rgba(0,0,0,0.15)',
                      }),
                }}
              >
                {btn.label}
              </button>
            ))}
            </div>
          </div>
          {/* Label - locked to image, same coordinate space as hotspots; top at or below middle of Row 2 */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[3%] pointer-events-none"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                darkMode ? 'bg-stone-900/80' : 'bg-black/70'
              }`}
            >
              <h1 className="font-bold text-center text-amber-100" style={{ fontSize: 'var(--map-title-font)' }}>
                The Blueprint
              </h1>
              <p
                className={`text-center ${darkMode ? 'text-amber-200/80' : 'text-amber-100/90'}`}
                style={{ fontSize: 'var(--map-subtitle-font)' }}
              >
                Click a hub to explore
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pnyx bloom overlay - Pillars instruction style: white bg, black text, sienna border */}
      <AnimatePresence>
        {pnyxBloomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/30"
            onClick={() => setPnyxBloomOpen(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Escape' && setPnyxBloomOpen(false)}
            aria-label="Close"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl border-2 shadow-2xl bg-white text-stone-900 border-amber-800/90 backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="pnyx-title"
            >
              <button
                type="button"
                onClick={() => setPnyxBloomOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border-2 border-stone-400 text-stone-600 hover:bg-stone-100 hover:border-stone-500 transition-colors"
                aria-label="Close"
              >
                ×
              </button>
              <div className="px-6 py-8 md:px-10 md:py-10">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-700" />
                  </div>
                ) : content ? (
                  <>
                    <h2
                      id="pnyx-title"
                      className="text-2xl md:text-3xl font-bold mb-2 pr-10"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {content.metadata.name}
                      {content.metadata.greekName && (
                        <span className="block text-lg font-normal italic text-amber-800">
                          {content.metadata.greekName}
                        </span>
                      )}
                    </h2>
                    <div className="prose prose-stone max-w-none">
                      <MarkdownContent content={content.body} darkMode={false} />
                    </div>
                  </>
                ) : (
                  <p style={{ fontFamily: 'Georgia, serif' }}>
                    Content loading…
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
