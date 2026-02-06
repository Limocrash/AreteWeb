import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PILLAR_LEVELS, PILLAR_LEVEL_COUNT } from '../data/pillarLevels';

const BASE = (typeof import.meta !== 'undefined' && (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL) || '/';
const pedimentSrc = `${BASE}images/temple-pediment.png`;
const pedimentSrcSet = `${BASE}images/temple-pediment-small.webp 400w, ${BASE}images/temple-pediment-medium.webp 800w, ${BASE}images/temple-pediment-large.webp 1200w`;
const pillarsSrc = `${BASE}images/architecture-diagram.png`;
const pillarsSrcSet = `${BASE}images/architecture-diagram-small.webp 400w, ${BASE}images/architecture-diagram-medium.webp 800w, ${BASE}images/architecture-diagram-large.webp 1200w`;
const bedrockSrc = `${BASE}images/temple-euthynteria.png`;
const bedrockSrcSet = `${BASE}images/temple-euthynteria-small.webp 400w, ${BASE}images/temple-euthynteria-medium.webp 800w, ${BASE}images/temple-euthynteria-large.webp 1200w`;

// Timing (ms): pediment only 1s, then text in + descent, text out ~0.5s before end
const PEDIMENT_ONLY_MS = 1000;
const DESCENT_DURATION_MS = 5000;
const RETURNING_DESCENT_MS = 2000; // Returning visitor: quick 2s descent, no flicker
const TEXT_FADE_OUT_BEFORE_END_MS = 500;
const descentStartMs = PEDIMENT_ONLY_MS;
const textFadeOutStartMs = descentStartMs + DESCENT_DURATION_MS - TEXT_FADE_OUT_BEFORE_END_MS;

interface PillarsIntroProps {
  darkMode: boolean;
  isReturningVisitor?: boolean;
  onBeginConstruction: () => void;
  onOpenSettings?: () => void;
}

type Phase = 'pediment' | 'text' | 'textOut' | 'toBedrock' | 'bedrock';

export function PillarsIntro({ darkMode, isReturningVisitor = false, onBeginConstruction, onOpenSettings }: PillarsIntroProps) {
  // Returning: start at top with text "Returning to our tour", then 2s descent (no flicker)
  const [phase, setPhase] = useState<Phase>(isReturningVisitor ? 'text' : 'pediment');
  const [descentProgress, setDescentProgress] = useState(0);
  const [floorIndex, setFloorIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  // Elevator floor: during descent use progress; at bedrock use floorIndex (so Up/Down work if they interact before Begin)
  const displayFloorIndex = phase === 'toBedrock' || phase === 'bedrock' ? 5 : Math.min(5, Math.floor(descentProgress * 6));
  const elevatorHighlightIndex = showButton ? floorIndex : displayFloorIndex;
  // When descent has stopped at bedrock, use a dimmer "resting" glow so the label stays readable
  const isStoppedAtBedrock = phase === 'toBedrock' || phase === 'bedrock';

  // Single continuous descent. First-time: 1s hold then DESCENT_DURATION_MS. Returning: 2s immediately, no hold.
  useEffect(() => {
    const startTime = Date.now();
    let rafId: number;

    if (isReturningVisitor) {
      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / RETURNING_DESCENT_MS);
        setDescentProgress(progress);
        if (progress >= 0.85) setPhase((p) => (p === 'text' ? 'textOut' : p));
        if (progress >= 1) {
          setPhase('toBedrock');
          return;
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    }

    const tick = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < descentStartMs) {
        setDescentProgress(0);
        rafId = requestAnimationFrame(tick);
        return;
      }
      const descentElapsed = elapsed - descentStartMs;
      const progress = Math.min(1, descentElapsed / DESCENT_DURATION_MS);
      setDescentProgress(progress);
      if (progress >= 1) {
        setPhase('toBedrock');
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isReturningVisitor]);

  // Phase timers: first-time only — show text at 1s, fade text out before end. (Bedrock + button come from toBedrock effect.)
  useEffect(() => {
    if (isReturningVisitor) return;

    const tText = setTimeout(() => setPhase('text'), PEDIMENT_ONLY_MS);
    const tTextOut = setTimeout(() => setPhase('textOut'), textFadeOutStartMs);

    return () => {
      clearTimeout(tText);
      clearTimeout(tTextOut);
    };
  }, [isReturningVisitor]);

  // When descent ends (toBedrock): transition to bedrock (300ms). DON'T cancel tButton on phase change
  // or it never fires — cleanup runs when phase→bedrock, which would cancel the 800ms timer.
  useEffect(() => {
    if (phase !== 'toBedrock') return;
    const tBedrock = setTimeout(() => {
      setPhase('bedrock');
      setFloorIndex(5);
    }, 300);
    setTimeout(() => setShowButton(true), 800);
    return () => {
      clearTimeout(tBedrock);
      // Do NOT clear tButton — when phase changes to 'bedrock', cleanup runs and would
      // cancel the 800ms timer before it fires. Let it run.
    };
  }, [phase]);

  // Show button 500ms after entering bedrock (in case we missed it from toBedrock — belt-and-suspenders)
  useEffect(() => {
    if (phase !== 'bedrock') return;
    const t = setTimeout(() => setShowButton(true), 500);
    return () => clearTimeout(t);
  }, [phase]);

  // ESC key to skip intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBeginConstruction();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBeginConstruction]);

  const atTop = elevatorHighlightIndex === 0;
  const atBottom = elevatorHighlightIndex === PILLAR_LEVEL_COUNT - 1;
  const canInteract = showButton;

  const goUp = () => {
    if (!atTop && canInteract) setFloorIndex((i) => Math.max(0, i - 1));
  };
  const goDown = () => {
    if (!atBottom && canInteract) setFloorIndex((i) => Math.min(PILLAR_LEVEL_COUNT - 1, i + 1));
  };
  const goToFloor = (idx: number) => {
    if (canInteract) setFloorIndex(idx);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-16 left-0 right-0 bottom-0 z-40 flex overflow-x-hidden overflow-y-hidden"
    >
      {/* Main content area - images + Begin Construction (no overlay) */}
      <div className="flex-1 min-w-0 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Camera descent: stacked strip (pediment → pillars → euthynteria) slides up as elevator goes down */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="flex flex-col"
          style={{ height: '300vh' }}
          initial={{ y: 0 }}
          animate={{ y: `${descentProgress * -200}vh` }}
          transition={{ duration: 0.05 }}
        >
          {/* 1. Roof / Pediment (Poseidon) */}
          <div className="relative h-screen w-full flex-shrink-0">
            <img
              src={pedimentSrc}
              srcSet={pedimentSrcSet}
              sizes="100vw"
              alt="Temple pediment"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            <div
              className={`absolute inset-0 ${
                darkMode
                  ? 'bg-gradient-to-b from-black/40 via-black/20 to-black/50'
                  : 'bg-gradient-to-b from-black/20 via-black/10 to-black/30'
              }`}
            />
          </div>
          {/* 2. Pillars (architecture) */}
          <div className="relative h-screen w-full flex-shrink-0">
            <img
              src={pillarsSrc}
              srcSet={pillarsSrcSet}
              sizes="100vw"
              alt="Temple pillars"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            <div
              className={`absolute inset-0 ${
                darkMode
                  ? 'bg-gradient-to-b from-black/40 via-black/20 to-black/50'
                  : 'bg-gradient-to-b from-black/20 via-black/10 to-black/30'
              }`}
            />
          </div>
          {/* 3. Bedrock (euthynteria) */}
          <div className="relative h-screen w-full flex-shrink-0">
            <img
              src={bedrockSrc}
              srcSet={bedrockSrcSet}
              sizes="100vw"
              alt="Euthynteria – bedrock of Isotímia"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            <div
              className={`absolute inset-0 ${
                darkMode
                  ? 'bg-gradient-to-b from-black/40 via-black/20 to-black/50'
                  : 'bg-gradient-to-b from-black/20 via-black/10 to-black/30'
              }`}
            />
          </div>
        </motion.div>
      </div>

      {/* Translucent white text frame: first-time intro or "Returning to our tour" (same look) */}
      <AnimatePresence>
        {(phase === 'text' || phase === 'textOut') && (
          <motion.div
            key="text-frame"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'text' ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center gap-4"
          >
            <div className="px-6 py-8 md:px-10 md:py-10 rounded-2xl max-w-2xl mx-4 border-2 shadow-2xl bg-white/95 border-amber-800/90 backdrop-blur-sm">
              <p
                className="text-xl md:text-2xl text-center text-stone-900"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {isReturningVisitor
                  ? 'Returning to our tour'
                  : 'Building a great, resilient, and well-crafted structure begins with the foundational bedrock on which it stands.'}
              </p>
            </div>
            {isReturningVisitor && (
              <button
                type="button"
                onClick={onBeginConstruction}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 border ${
                  darkMode
                    ? 'text-amber-200/90 border-amber-500/60 bg-amber-900/30 hover:bg-amber-800/50 hover:border-amber-400'
                    : 'text-stone-700 border-stone-400 bg-white/60 hover:bg-white/80 hover:border-stone-500'
                }`}
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Skip Intro
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ESC hint text at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <p className={`text-sm ${darkMode ? 'text-cyan-200' : 'text-stone-700'}`} style={{ fontFamily: 'Georgia, serif' }}>
          ESC to skip Intro
        </p>
      </div>

      {/* Split button bottom-right: Skip Intro | gear */}
      <div className="absolute bottom-8 right-8 z-20 flex items-stretch rounded-lg overflow-hidden border-2 border-cyan-400/60 shadow-lg">
        {/* Left: Skip Intro */}
        <button
          onClick={onBeginConstruction}
          className={`px-4 py-2 transition-all duration-300 ${
            darkMode
              ? 'bg-cyan-900/30 text-cyan-200 hover:bg-cyan-800/50'
              : 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100'
          }`}
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Skip Intro
        </button>
        
        {/* Right: Settings gear */}
        <button
          onClick={() => {
            onBeginConstruction();
            onOpenSettings?.();
          }}
          className={`px-3 py-2 border-l-2 border-cyan-400/60 transition-all duration-300 ${
            darkMode
              ? 'bg-cyan-900/30 text-cyan-200 hover:bg-cyan-800/50'
              : 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100'
          }`}
          aria-label="Settings"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Euthynteria explanation + Begin Construction button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center gap-6 mt-8"
          >
            <div className="px-6 py-5 md:px-8 md:py-6 rounded-2xl max-w-2xl mx-4 border-2 shadow-2xl bg-white/95 border-amber-800/90 backdrop-blur-sm">
              <p className="text-base md:text-lg leading-relaxed text-stone-900" style={{ fontFamily: 'Georgia, serif' }}>
                In Greek temple construction, the <em>euthynteria</em> is the leveling course—the base slab upon which the entire structure rests. In AreTéCracy, we consider our euthynteria to be the philosophical foundation on which we believe all government, and especially self-government, should stand.
              </p>
            </div>
            <button
              onClick={onBeginConstruction}
              className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 border-2 shadow-xl hover:scale-105 hover:shadow-2xl ${
                darkMode
                  ? 'bg-cyan-600 text-white border-cyan-500 hover:bg-cyan-500 hover:border-cyan-400'
                  : 'bg-cyan-600 text-white border-cyan-500 hover:bg-cyan-500 hover:border-cyan-400'
              }`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Begin Construction
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* Elevator sidebar - brushed metal, full height, no overlay */}
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="pillars-elevator-sidebar w-44 md:w-52 flex-shrink-0 flex flex-col items-center py-6 px-3 gap-4 border-l border-gray-600/50"
      >
        <div className="flex flex-col items-center w-full gap-1">
          <span className="text-[10px] md:text-xs font-bold leading-tight text-center elevator-menu-item elevator-panel-dark-text">
            Architekton<br />Elevator
          </span>
          <span className="text-lg md:text-xl font-bold uppercase tracking-wide w-full text-center elevator-menu-item text-cyan-200">
            Levels
          </span>
        </div>

        {/* Floor list - jump to any level. Unselected = dark blue for contrast on brushed metal. Pointer = current floor. */}
        <div className="flex flex-col gap-1 w-full flex-1 min-h-0 overflow-y-auto">
          {PILLAR_LEVELS.map((level, idx) => {
            const isCurrent = idx === elevatorHighlightIndex;
            const isClickable = canInteract;
            // Bright emission during descent; dimmer "resting" state when stopped at bedrock so text is readable
            const useRestingGlow = isCurrent && isStoppedAtBedrock;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => goToFloor(idx)}
                disabled={!isClickable}
                className={`w-full text-left px-2 py-1.5 rounded text-sm font-mono elevator-menu-item transition-all duration-300 flex items-center gap-2 ${
                  isCurrent
                    ? useRestingGlow
                      ? 'bg-cyan-500/30 text-cyan-100 border border-cyan-400/60'
                      : 'bg-cyan-400/50 text-white border-2 border-cyan-200'
                    : isClickable
                      ? 'elevator-panel-dark-text hover:bg-gray-600/40 hover:text-blue-200'
                      : 'elevator-panel-dark-text cursor-default'
                }`}
                style={
                  isCurrent && !useRestingGlow
                    ? {
                        boxShadow: darkMode
                          ? '0 0 24px rgba(255,255,255,0.85), 0 0 48px rgba(34,211,238,0.7), 0 0 72px rgba(34,211,238,0.4)'
                          : '0 0 24px rgba(255,255,255,0.95), 0 0 48px rgba(251,191,36,0.6), 0 0 72px rgba(251,191,36,0.35)',
                      }
                    : isCurrent && useRestingGlow
                      ? {
                          boxShadow: darkMode
                            ? '0 0 8px rgba(34,211,238,0.5)'
                            : '0 0 8px rgba(251,191,36,0.4)',
                        }
                      : undefined
                }
              >
                <span
                  className={`flex-shrink-0 w-4 text-center transition-opacity duration-200 ${isCurrent ? 'opacity-100' : 'opacity-0'}`}
                  aria-hidden
                >
                  ▸
                </span>
                <span className="min-w-0 truncate">{level.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tour instruction frame - centered vertically in available space */}
        <div className="flex-1 flex items-center justify-center min-h-0 w-full">
          <div className="px-3 py-3 rounded-xl border-2 shadow-lg bg-white/95 border-amber-800/90 backdrop-blur-sm w-full">
            <p className="text-sm text-center text-stone-900 leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
              Use the <span className="font-bold">▲</span> and <span className="font-bold">▼</span> buttons, or click a level to navigate
            </p>
          </div>
        </div>

        {/* UP / DOWN triangle buttons */}
        <div className="flex flex-col gap-2 w-full">
          <button
            type="button"
            onClick={goUp}
            disabled={atTop || !canInteract}
            aria-label="Go up"
            className={`w-full py-2 rounded-lg border-2 text-2xl transition-all elevator-menu-item ${
              atTop || !canInteract
                ? 'bg-gray-700/30 text-gray-500 border-gray-600 cursor-not-allowed'
                : 'bg-cyan-500/20 text-cyan-300 border-cyan-400 hover:bg-cyan-500/30'
            }`}
          >
            ▲
          </button>
          <button
            type="button"
            onClick={goDown}
            disabled={atBottom || !canInteract}
            aria-label="Go down"
            className={`w-full py-2 rounded-lg border-2 text-2xl transition-all elevator-menu-item ${
              atBottom || !canInteract
                ? 'bg-gray-700/30 text-gray-500 border-gray-600 cursor-not-allowed'
                : 'bg-cyan-500/20 text-cyan-300 border-cyan-400 hover:bg-cyan-500/30'
            }`}
          >
            ▼
          </button>
        </div>
      </motion.aside>
    </motion.div>
  );
}
