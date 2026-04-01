import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { loadBlueprintHubContent, loadBlueprintHotspotContent, blueprintHubs } from '../data/blueprint';
import { BLUEPRINT_HUB_BUTTONS, BLUEPRINT_LANDING_ASPECT_RATIO, NOMOTHESIA_MAP_ASPECT_RATIO, DOKIMAZO_MAP_ASPECT_RATIO } from '../data/blueprintHubs';
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
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

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

  // Load content: ekklesia bloom, nomothesia hotspot, or hub overview
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
    if ((hubId === 'nomothesia' || hubId === 'therapon-dokimazo' || hubId === 'ekklesia') && selectedHotspotId) {
      // all three hubs use bitmapped approach with DetailCard
      let cancelled = false;
      setLoading(true);
      loadBlueprintHotspotContent(hubId, selectedHotspotId)
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
    navigateToBlueprintHub(id);
    setHubId(id);
  }, []);

  const handleBackFromNixor = useCallback(() => {
    navigateToBlueprintHub('therapon-dokimazo');
    setHubId('therapon-dokimazo');
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

  // Hub page (not landing)
  if (hubId && !pnyxBloomOpen) {
    const hub = BLUEPRINT_HUB_BUTTONS.find((b) => b.id === hubId);
    const manifestHub = blueprintHubs.find((h) => h.id === hubId);
    const hubLabel = hub?.label ?? manifestHub?.name ?? hubId;
    const hasMap = hub?.hasMap ?? false;
    const isDokimazo = hubId === 'therapon-dokimazo';
    const isNomothesia = hubId === 'nomothesia';
    const isNixorPage = hubId === 'dokimazo-nixor';

    // Nixor: full scrollable text page
    if (isNixorPage) {
      return (
        <div className={`relative w-full min-h-screen px-6 py-12 max-w-3xl mx-auto ${
          darkMode ? 'text-amber-100' : 'text-stone-900'
        }`}>
          <button
            type="button"
            onClick={handleBackFromNixor}
            className={`text-sm font-medium hover:underline mb-8 block ${
              darkMode ? 'text-amber-300' : 'text-amber-700'
            }`}
          >
            ← Back to Dokimazo
          </button>
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-700" />
            </div>
          ) : content ? (
            <div className={`rounded-lg border-2 p-6 md:p-10 ${
              darkMode ? 'border-amber-700/50 bg-stone-900/70' : 'border-amber-600/50 bg-stone-50/90'
            }`}>
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                {content.metadata.name}
              </h1>
              {content.metadata.greekName && (
                <p className="text-lg italic text-amber-500 mb-6">{content.metadata.greekName}</p>
              )}
              <MarkdownContent content={content.body} darkMode={darkMode} />
            </div>
          ) : (
            <p style={{ fontFamily: 'Georgia, serif' }}>Content loading…</p>
          )}
        </div>
      );
    }

    // Nomothesia: full-viewport bitmapped map (same pattern as Dokimazo)
    if (isNomothesia) {
      const nomAspect = 4400 / 2750;
      return (
        <>
          <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -5 }}>
            <img
              src={darkMode ? `${base}images/blueprint/BlueprintMarbleDark.webp` : `${base}images/blueprint/BlueprintMarbleLight.webp`}
              alt="" className="w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full" style={{ height: 'calc(100vh - 60px)', background: 'transparent' }}>
            <button type="button" onClick={handleBackToLanding}
              className={`absolute top-16 left-4 z-20 text-sm font-medium hover:underline ${
                darkMode ? 'text-amber-300' : 'text-amber-700'
              }`}>← Back to The Blueprint</button>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative" style={{
                aspectRatio: `${nomAspect}`,
                maxWidth: '100%', maxHeight: '100%',
                width: `min(100%, calc(100vh - 60px) * ${nomAspect})`,
              }}>
                <img
                  src={`${base}images/blueprint/nomothesia-map-large.webp`}
                  srcSet={`${base}images/blueprint/nomothesia-map-small.webp 400w, ${base}images/blueprint/nomothesia-map-medium.webp 800w, ${base}images/blueprint/nomothesia-map-large.webp 1200w`}
                  sizes="100vw" alt="Nomothesia process map"
                  className="absolute inset-0 w-full h-full" style={{ objectFit: 'fill' }}
                />
                {(blueprintHubs.find((h) => h.id === 'nomothesia')?.hotspots ?? [])
                  .filter((h): h is typeof h & { leftPercent: number; topPercent: number; widthPercent: number } =>
                    h.leftPercent != null && h.topPercent != null && (h as { widthPercent?: number }).widthPercent != null
                  )
                  .map((hotspot) => {
                    const hp = hotspot as typeof hotspot & { widthPercent: number; heightPercent?: number; shape?: string };
                    return (
                      <button key={hp.id} type="button"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHotspotCardOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                          setSelectedHotspotId(hp.id);
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
                        style={{
                          left: `${hp.leftPercent}%`, top: `${hp.topPercent}%`,
                          width: `${hp.widthPercent}%`, aspectRatio: '1',
                          background: 'transparent', border: '2px solid transparent',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLButtonElement;
                          el.style.background = 'rgba(251,191,36,0.18)';
                          el.style.border = '2px solid rgba(251,191,36,0.90)';
                          el.style.boxShadow = '0 0 6px 1px rgba(251,191,36,0.85), 0 0 20px 4px rgba(251,191,36,0.5), 0 0 38px 6px rgba(251,191,36,0.2), inset 0 0 12px rgba(251,191,36,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLButtonElement;
                          el.style.background = 'transparent';
                          el.style.border = '2px solid transparent';
                          el.style.boxShadow = '';
                        }}
                        aria-label={`Node: ${hp.id}`}
                      />
                    );
                  })}
              </div>
            </div>
            <AnimatePresence>
              {selectedHotspotId && hotspotCardOrigin && content?.metadata?.id === selectedHotspotId && (
                <DetailCard
                  key={selectedHotspotId}
                  element={{ id: content.metadata.id, name: content.metadata.name, greekName: content.metadata.greekName }}
                  glossaryTerm={{ blurb: content.metadata.blurb ?? '' }}
                  contentBody={content.body}
                  darkMode={darkMode}
                  cardOrigin={hotspotCardOrigin}
                  onClose={() => { setSelectedHotspotId(null); setHotspotCardOrigin(null); }}
                  mode="triad"
                />
              )}
            </AnimatePresence>
          </div>
        </>
      );
    }

    const useScrollLayout = hasMap && false; // legacy path — no longer used for map hubs

    // Ekklesia: full-viewport bitmapped plaque-hub
    const isEkklesia = hubId === 'ekklesia';
    if (isEkklesia) {
      const ekkHub = blueprintHubs.find((h) => h.id === 'ekklesia');
      const ekkAspect = (ekkHub?.imageWidth ?? 5439) / (ekkHub?.imageHeight ?? 3318);
      const tooltips = ekkHub?.tooltips ?? [];
      return (
        <>
          <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -5 }}>
            <img
              src={darkMode ? `${base}images/blueprint/BlueprintMarbleDark.webp` : `${base}images/blueprint/BlueprintMarbleLight.webp`}
              alt="" className="w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full" style={{ background: 'transparent' }}>
            <button type="button" onClick={handleBackToLanding}
              className={`fixed top-16 left-4 z-20 text-sm font-medium hover:underline ${
                darkMode ? 'text-amber-300' : 'text-amber-700'
              }`}>← Back to The Blueprint</button>
            <div
              className="relative w-full"
              style={{ aspectRatio: `${ekkAspect}` }}
            >
                <img
                  src={`${base}images/blueprint/ekklesia-map-large.webp`}
                  srcSet={`${base}images/blueprint/ekklesia-map-small.webp 400w, ${base}images/blueprint/ekklesia-map-medium.webp 800w, ${base}images/blueprint/ekklesia-map-large.webp 1200w`}
                  sizes="100vw" alt="The Ekklesia — The People's Assembly"
                  className="absolute inset-0 w-full h-full" style={{ objectFit: 'cover' }}
                />
                {/* Alpha / Omega tooltip triggers */}
                {tooltips.map((tip) => (
                  <div key={tip.id} className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${tip.leftPercent}%`, top: `${tip.topPercent}%`, zIndex: 10,
                      width: `${tip.widthPercent}%`,
                      height: `${tip.heightPercent ?? tip.widthPercent * 2}%`,
                    }}>
                    <button type="button"
                      className={`w-full h-full flex items-center justify-center text-xl font-bold transition-all duration-200 rounded ${
                        darkMode ? 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10' : 'text-cyan-600 hover:text-cyan-500 hover:bg-cyan-600/10'
                      }`}
                      style={{ fontFamily: 'Georgia, serif', background: 'transparent', border: 'none', cursor: 'default' }}
                      onMouseEnter={() => setActiveTooltip(tip.id)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      aria-label={tip.text}
                    >{tip.label}</button>
                    {activeTooltip === tip.id && (
                      <div className={`absolute z-30 w-48 p-2 rounded-lg text-xs shadow-xl pointer-events-none ${
                        darkMode ? 'bg-stone-900/95 text-amber-100 border border-amber-700/50' : 'bg-white/95 text-stone-800 border border-amber-400/50'
                      }`} style={{ top: '110%', left: tip.leftPercent > 50 ? 'auto' : '0', right: tip.leftPercent > 50 ? '0' : 'auto' }}>
                        {tip.text}
                      </div>
                    )}
                  </div>
                ))}
                {/* Plaque hit areas */}
                {(ekkHub?.hotspots ?? [])
                  .filter((h): h is typeof h & { leftPercent: number; topPercent: number; widthPercent: number } =>
                    h.leftPercent != null && h.topPercent != null && (h as { widthPercent?: number }).widthPercent != null
                  )
                  .map((hotspot) => {
                    const isDouble = !!hotspot.doubleHeight;
                    const glowColor = 'rgba(251,191,36';
                    return (
                      <button key={hotspot.id} type="button"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHotspotCardOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                          setSelectedHotspotId(hotspot.id);
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                          isDouble ? 'rounded-md' : 'rounded-sm'
                        }`}
                        style={{
                          left: `${hotspot.leftPercent}%`,
                          top: `${hotspot.topPercent}%`,
                          width: `${hotspot.widthPercent}%`,
                          height: `${hotspot.heightPercent != null ? hotspot.heightPercent + '%' : 'auto'}`,
                          background: 'transparent',
                          border: '2px solid transparent',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLButtonElement;
                          el.style.background = `${glowColor},0.12)`;
                          el.style.border = `2px solid ${glowColor},0.70)`;
                          el.style.boxShadow = `0 0 6px 1px ${glowColor},0.65), 0 0 18px 3px ${glowColor},0.35), inset 0 0 10px ${glowColor},0.1)`;
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLButtonElement;
                          el.style.background = 'transparent';
                          el.style.border = '2px solid transparent';
                          el.style.boxShadow = '';
                        }}
                        aria-label={`Read: ${hotspot.id}`}
                      />
                    );
                  })}
            </div>
            <AnimatePresence>
              {selectedHotspotId && hotspotCardOrigin && content?.metadata?.id === selectedHotspotId && (
                <DetailCard
                  key={selectedHotspotId}
                  element={{ id: content.metadata.id, name: content.metadata.name, greekName: content.metadata.greekName }}
                  glossaryTerm={{ blurb: content.metadata.blurb ?? '' }}
                  contentBody={content.body}
                  darkMode={darkMode}
                  cardOrigin={hotspotCardOrigin}
                  onClose={() => { setSelectedHotspotId(null); setHotspotCardOrigin(null); }}
                  mode="triad"
                />
              )}
            </AnimatePresence>
          </div>
        </>
      );
    }

    // Dokimazo: full-viewport map, no content overlay
    if (isDokimazo) {
      return (
        <>
          {/* Marble background — fixed, full viewport, sits above parchment (z:-10), below content */}
          <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -5 }}>
            <img
              src={darkMode
                ? `${base}images/blueprint/BlueprintMarbleDark.webp`
                : `${base}images/blueprint/BlueprintMarbleLight.webp`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

        <div className="relative w-full" style={{ height: 'calc(100vh - 60px)', background: 'transparent' }}>
          {/* Back button */}
          <button
            type="button"
            onClick={handleBackToLanding}
            className={`absolute top-16 left-4 z-20 text-sm font-medium hover:underline ${
              darkMode ? 'text-amber-300' : 'text-amber-700'
            }`}
          >
            ← Back to The Blueprint
          </button>

          {/* Contained map — transparent so marble from parent shows through */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative"
              style={{
                aspectRatio: `${DOKIMAZO_MAP_ASPECT_RATIO}`,
                maxWidth: '100%',
                maxHeight: '100%',
                width: `min(100%, calc(100vh - 60px) * ${DOKIMAZO_MAP_ASPECT_RATIO})`,
              }}
            >
              <img
                src={`${base}images/blueprint/dokimazo-map-large.webp`}
                srcSet={`${base}images/blueprint/dokimazo-map-small.webp 400w, ${base}images/blueprint/dokimazo-map-medium.webp 800w, ${base}images/blueprint/dokimazo-map-large.webp 1200w`}
                sizes="100vw"
                alt="Therapon / Dokimazo process map"
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: 'fill' }}
              />
              {/* Invisible hit areas */}
              {(blueprintHubs.find((h) => h.id === 'therapon-dokimazo')?.hotspots ?? [])
                .filter((h): h is typeof h & { leftPercent: number; topPercent: number; widthPercent: number } =>
                  h.leftPercent != null && h.topPercent != null && (h as { widthPercent?: number }).widthPercent != null
                )
                .map((hotspot) => {
                  const hp = hotspot as typeof hotspot & { widthPercent: number; heightPercent?: number; shape?: string; navigateTo?: string };
                  const isNixor = hp.id === 'nixor';
                  const isRect = hp.shape === 'rect';
                  return (
                    <button
                      key={hp.id}
                      type="button"
                      onClick={(e) => {
                        if (hp.navigateTo) {
                          navigateToBlueprintHub(hp.navigateTo);
                          setHubId(hp.navigateTo);
                          return;
                        }
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHotspotCardOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                        setSelectedHotspotId(hp.id);
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        isRect ? 'rounded-xl' : 'rounded-full'
                      }`}
                      style={{
                        left: `${hp.leftPercent}%`,
                        top: `${hp.topPercent}%`,
                        width: `${hp.widthPercent}%`,
                        ...(isRect && hp.heightPercent
                          ? { height: `${hp.heightPercent}%` }
                          : { aspectRatio: '1' }),
                        background: 'transparent',
                        border: '2px solid transparent',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        const glowColor = isNixor ? 'rgba(34,211,238' : 'rgba(251,191,36';
                        el.style.background = `${glowColor},0.18)`;
                        el.style.border = `2px solid ${glowColor},0.90)`;
                        el.style.boxShadow = `0 0 6px 1px ${glowColor},0.85), 0 0 20px 4px ${glowColor},0.5), 0 0 38px 6px ${glowColor},0.2), inset 0 0 12px ${glowColor},0.15)`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = 'transparent';
                        el.style.border = '2px solid transparent';
                        el.style.boxShadow = '';
                      }}
                      aria-label={`Explore: ${hp.id}`}
                    />
                  );
                })}
            </div>
          </div>

          {/* Hotspot DetailCard */}
          <AnimatePresence>
            {selectedHotspotId && hotspotCardOrigin && content?.metadata?.id === selectedHotspotId && (
              <DetailCard
                key={selectedHotspotId}
                element={{ id: content.metadata.id, name: content.metadata.name, greekName: content.metadata.greekName }}
                glossaryTerm={{ blurb: content.metadata.blurb ?? '' }}
                contentBody={content.body}
                darkMode={darkMode}
                cardOrigin={hotspotCardOrigin}
                onClose={() => { setSelectedHotspotId(null); setHotspotCardOrigin(null); }}
                mode="triad"
              />
            )}
          </AnimatePresence>
        </div>
        </>
      );
    }

    return (
      <div
        className={`relative w-full ${
          darkMode ? 'text-amber-100' : 'text-stone-900'
        }`}
      >
        {/* BlueprintMap-BG overlay - only for hub with map */}
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
        <div
          className={`relative w-full ${useScrollLayout ? 'pb-[var(--navbar-total)]' : ''}`}
          style={{
            minHeight: useScrollLayout ? 'calc(100vh - var(--navbar-total, 110px) - 6rem)' : 'calc(100vh - 8rem - 6rem)',
            height: useScrollLayout ? 'calc(100vh - var(--navbar-total, 110px) - 6rem)' : undefined,
            maxHeight: useScrollLayout ? 'calc(100vh - var(--navbar-total, 110px) - 6rem)' : undefined,
          }}
        >
          <div className={`absolute inset-0 ${useScrollLayout ? 'flex items-center justify-center' : ''}`}>
            {useScrollLayout ? (
              <div
                className="relative h-full max-w-full [container-type:size]"
                style={{ aspectRatio: isDokimazo ? DOKIMAZO_MAP_ASPECT_RATIO : NOMOTHESIA_MAP_ASPECT_RATIO }}
              >
                <img
                  src={isDokimazo
                    ? `${base}images/blueprint/dokimazo-map-large.webp`
                    : `${base}images/blueprint/nomothesia-map-large.webp`}
                  srcSet={isDokimazo
                    ? `${base}images/blueprint/dokimazo-map-small.webp 400w, ${base}images/blueprint/dokimazo-map-medium.webp 800w, ${base}images/blueprint/dokimazo-map-large.webp 1200w`
                    : `${base}images/blueprint/nomothesia-map-small.webp 400w, ${base}images/blueprint/nomothesia-map-medium.webp 800w, ${base}images/blueprint/nomothesia-map-large.webp 1200w`}
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
                {/* Hotspot overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="relative w-full h-full pointer-events-auto">
                    {isDokimazo
                      ? /* Dokimazo: invisible hit areas with glow hover, matching bitmapped nodes */
                        (blueprintHubs.find((h) => h.id === 'therapon-dokimazo')?.hotspots ?? [])
                          .filter((h): h is typeof h & { leftPercent: number; topPercent: number; widthPercent: number } =>
                            h.leftPercent != null && h.topPercent != null && (h as { widthPercent?: number }).widthPercent != null
                          )
                          .map((hotspot) => {
                            const hp = hotspot as typeof hotspot & { widthPercent: number; heightPercent?: number; shape?: string; navigateTo?: string };
                            const isNixor = hp.id === 'nixor';
                            const isRect = hp.shape === 'rect';
                            return (
                              <button
                                key={hp.id}
                                type="button"
                                onClick={(e) => {
                                  if (hp.navigateTo) {
                                    navigateToBlueprintHub(hp.navigateTo);
                                    setHubId(hp.navigateTo);
                                    return;
                                  }
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  setHotspotCardOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                                  setSelectedHotspotId(hp.id);
                                }}
                                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                                  isRect ? 'rounded-xl' : 'rounded-full'
                                }`}
                                style={{
                                  left: `${hp.leftPercent}%`,
                                  top: `${hp.topPercent}%`,
                                  width: `${hp.widthPercent}%`,
                                  ...(isRect && hp.heightPercent
                                    ? { height: `${hp.heightPercent}%` }
                                    : { aspectRatio: '1' }),
                                  background: 'transparent',
                                  border: '2px solid transparent',
                                }}
                                onMouseEnter={(e) => {
                                  const el = e.currentTarget as HTMLButtonElement;
                                  const glowColor = isNixor ? 'rgba(34,211,238' : 'rgba(251,191,36';
                                  el.style.background = `${glowColor},0.18)`;
                                  el.style.border = `2px solid ${glowColor},0.90)`;
                                  el.style.boxShadow = `0 0 6px 1px ${glowColor},0.85), 0 0 20px 4px ${glowColor},0.5), 0 0 38px 6px ${glowColor},0.2), inset 0 0 12px ${glowColor},0.15)`;
                                }}
                                onMouseLeave={(e) => {
                                  const el = e.currentTarget as HTMLButtonElement;
                                  el.style.background = 'transparent';
                                  el.style.border = '2px solid transparent';
                                  el.style.boxShadow = '';
                                }}
                                title={hp.id}
                                aria-label={`Explore: ${hp.id}`}
                              />
                            );
                          })
                      : /* Nomothesia: numbered buttons */
                        (blueprintHubs.find((h) => h.id === 'nomothesia')?.hotspots ?? [])
                          .filter((h): h is typeof h & { leftPercent: number; topPercent: number } =>
                            h.leftPercent != null && h.topPercent != null
                          )
                          .map((hotspot) => (
                            <button
                              key={hotspot.id}
                              type="button"
                              onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setHotspotCardOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
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
                                  ? { backgroundColor: 'rgba(146, 64, 14, 0.9)', borderColor: 'rgba(180, 83, 9, 0.95)', color: '#fef3c7' }
                                  : { backgroundColor: 'rgba(255, 255, 255, 0.92)', borderColor: 'rgba(146, 64, 14, 0.9)', color: '#292524' }),
                              }}
                              title={hotspot.id}
                              aria-label={`Hotspot: ${hotspot.id}`}
                            >
                              {hotspot.order + 1}
                            </button>
                          ))
                    }
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

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-start py-12 px-4 sm:px-6 lg:px-8 pointer-events-none">
            <div className="mb-6 flex items-center gap-4 pointer-events-auto">
              <button
                type="button"
                onClick={isNixorPage ? handleBackFromNixor : handleBackToLanding}
                className={`text-sm font-medium hover:underline ${
                  darkMode ? 'text-amber-300' : 'text-amber-700'
                }`}
              >
                {isNixorPage ? '← Back to Dokimazo' : '← Back to The Blueprint'}
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

        {/* Nomothesia / Dokimazo hotspot cards */}
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

  // Landing
  return (
    <div
      className={`relative min-h-0 ${darkMode ? 'text-amber-100' : 'text-stone-900'}`}
    >
      <div className={`relative z-0 w-full ${darkMode ? 'bg-stone-900' : 'bg-stone-200'}`}>
        <div
          className="relative w-full bg-stone-900"
          style={{ aspectRatio: BLUEPRINT_LANDING_ASPECT_RATIO }}
        >
          <img
            src={`${base}images/blueprint/blueprint-landing-map.png`}
            srcSet={`${base}images/blueprint/blueprint-landing-map-small.webp 400w, ${base}images/blueprint/blueprint-landing-map-medium.webp 800w, ${base}images/blueprint/blueprint-landing-map-large.webp 1200w`}
            sizes="100vw"
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
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full pointer-events-auto">
              {BLUEPRINT_HUB_BUTTONS.map((btn) => (
                <div
                  key={btn.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${btn.leftPercent}%`, top: `${btn.topPercent}%`, width: '15.5%', aspectRatio: '1' }}
                >
                  {/* Invisible circular hit area with amber glow on hover */}
                  <button
                    type="button"
                    onClick={() => handleHubClick(btn.id)}
                    className="absolute inset-0 rounded-full transition-all duration-300"
                    style={{
                      background: 'transparent',
                      border: '2px solid transparent',
                      aspectRatio: '1',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = 'rgba(251,191,36,0.18)';
                      el.style.border = '2px solid rgba(251,191,36,0.90)';
                      el.style.boxShadow = '0 0 6px 1px rgba(251,191,36,0.85), 0 0 20px 4px rgba(251,191,36,0.5), 0 0 38px 6px rgba(251,191,36,0.2), inset 0 0 12px rgba(251,191,36,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = 'transparent';
                      el.style.border = '2px solid transparent';
                      el.style.boxShadow = '';
                    }}
                    aria-label={btn.label}
                  />
                  {/* Label — white text, subtle dark pill for readability on any background */}
                  <span
                    className="absolute left-1/2 -translate-x-1/2 pointer-events-none text-center font-semibold leading-tight"
                    style={{
                      top: '105%',
                      fontSize: 'var(--map-overlay-font)',
                      color: '#ffffff',
                      background: 'rgba(0,0,0,0.45)',
                      borderRadius: '4px',
                      padding: '1px 6px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {btn.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
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

      {/* Pnyx bloom overlay */}
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
