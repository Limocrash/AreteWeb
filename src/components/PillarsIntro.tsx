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

// Descent duration when user triggers it (shorter than old auto-descent)
const DESCENT_DURATION_MS = 3500;
const RETURNING_DESCENT_MS = 1500;

// Glow positions — based on temple-euthynteria.png native dimensions 2816×1536
// Vertical positions use bottom% (stable across viewport widths)
// Horizontal positions are approximate for object-cover display

// Phase 1: Amber glows on Aretai stones + Isotímia lettering
const aretaiGlows = [
  { id: 'sonder',    left: '2%',  width: '20%', bottom: '36%', height: '14%' },
  { id: 'philotimo', left: '25%', width: '20%', bottom: '36%', height: '14%' },
  { id: 'prc',       left: '48%', width: '20%', bottom: '36%', height: '14%' },
  { id: 'aletheia',  left: '72%', width: '20%', bottom: '36%', height: '14%' },
];
const isotimiaGlow = { left: '5%', width: '88%', bottom: '14%', height: '22%' };

// Phase 2: Cyan glows on Isótēs header + four black plaques
const isotesHeaderGlow = { left: '8%', width: '82%', bottom: '82%', height: '10%' };
const isotesGlows = [
  { id: 'isonomia',      left: '9%',  width: '20%', bottom: '64%', height: '18%' },
  { id: 'isegoria',      left: '31%', width: '20%', bottom: '64%', height: '18%' },
  { id: 'isarchia',      left: '52%', width: '20%', bottom: '64%', height: '18%' },
  { id: 'isoeudaimonia', left: '73%', width: '20%', bottom: '64%', height: '18%' },
];

interface PillarsIntroProps {
  darkMode: boolean;
  isReturningVisitor?: boolean;
  onBeginConstruction: () => void;
  onOpenSettings?: () => void;
}

type Phase = 'pediment' | 'descending' | 'aretai' | 'isotes';

export function PillarsIntro({ darkMode, isReturningVisitor = false, onBeginConstruction, onOpenSettings }: PillarsIntroProps) {
  const [phase, setPhase] = useState<Phase>(isReturningVisitor ? 'aretai' : 'pediment');
  const [descentProgress, setDescentProgress] = useState(isReturningVisitor ? 1 : 0);
  const [floorIndex, setFloorIndex] = useState(isReturningVisitor ? 5 : 0);

  // ESC to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onBeginConstruction(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBeginConstruction]);

  // Descent animation — triggered by startDescent()
  const startDescent = () => {
    if (phase !== 'pediment') return;
    setPhase('descending');
    const startTime = Date.now();
    const duration = isReturningVisitor ? RETURNING_DESCENT_MS : DESCENT_DURATION_MS;
    let rafId: number;
    const tick = () => {
      const progress = Math.min(1, (Date.now() - startTime) / duration);
      setDescentProgress(progress);
      setFloorIndex(Math.min(5, Math.floor(progress * 6)));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setFloorIndex(5);
        setPhase('aretai');
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  };

  // Elevator: selected floor = where user is pointing; clicking floor dismisses intro
  const atTop = floorIndex === 0;
  const atBottom = floorIndex === PILLAR_LEVEL_COUNT - 1;

  const goUp = () => {
    if (!atTop) {
      if (phase === 'aretai' || phase === 'isotes') { onBeginConstruction(); return; }
      setFloorIndex(i => Math.max(0, i - 1));
    }
  };
  const goDown = () => {
    if (!atBottom) {
      if (phase === 'aretai' || phase === 'isotes') { onBeginConstruction(); return; }
      setFloorIndex(i => Math.min(PILLAR_LEVEL_COUNT - 1, i + 1));
    }
  };
  const goToFloor = () => {
    if (phase === 'aretai' || phase === 'isotes') onBeginConstruction();
  };

  // Text box styling shared
  const textBoxClass = `px-6 py-5 md:px-8 md:py-6 rounded-2xl border-2 shadow-2xl bg-white/95 border-amber-800/90 backdrop-blur-sm max-w-xl mx-4`;
  const textClass = `text-sm md:text-base leading-relaxed text-stone-900`;
  const btnClass = (color: 'cyan' | 'amber') => `px-6 py-3 rounded-lg font-bold text-base tracking-wide transition-all duration-300 border-2 shadow-xl hover:scale-105 ${
    color === 'cyan'
      ? 'bg-cyan-600 text-white border-cyan-500 hover:bg-cyan-500'
      : 'bg-amber-500 text-black border-amber-400 hover:bg-amber-400'
  }`;

  // Glow overlay helper
  const renderGlow = (g: { left: string; width: string; bottom: string; height: string; id?: string }, color: 'amber' | 'cyan', delay = 0) => (
    <motion.div
      key={g.id || `${g.left}-${g.bottom}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      className="absolute pointer-events-none"
      style={{
        left: g.left,
        width: g.width,
        bottom: g.bottom,
        height: g.height,
        background: color === 'amber'
          ? 'rgba(251, 191, 36, 0.25)'
          : 'rgba(34, 211, 238, 0.25)',
        border: color === 'amber'
          ? '2px solid rgba(251, 191, 36, 0.7)'
          : '2px solid rgba(34, 211, 238, 0.7)',
        borderRadius: '8px',
        boxShadow: color === 'amber'
          ? '0 0 24px rgba(251, 191, 36, 0.6), inset 0 0 12px rgba(251, 191, 36, 0.2)'
          : '0 0 24px rgba(34, 211, 238, 0.6), inset 0 0 12px rgba(34, 211, 238, 0.2)',
        zIndex: 5,
      }}
    />
  );

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-16 left-0 right-0 bottom-0 z-40 flex min-w-0 overflow-x-hidden overflow-y-hidden"
    >
      {/* Main content area */}
      <div className="flex-1 min-w-0 w-0 flex flex-col items-center justify-center relative overflow-hidden">

        {/* Camera strip — 3 panels stacked, slides up as descentProgress increases */}
        <div className="absolute inset-0 overflow-hidden min-w-0">
          <motion.div
            className="flex flex-col w-full min-w-0 max-w-full"
            style={{ height: '300vh' }}
            animate={{ y: `${descentProgress * -200}vh` }}
            transition={{ duration: 0.05 }}
          >
            {/* Panel 1: Pediment */}
            <div className="relative h-screen w-full min-w-0 max-w-full flex-shrink-0 overflow-hidden">
              <img src={pedimentSrc} srcSet={pedimentSrcSet} sizes="100vw" alt="Temple pediment"
                className="absolute inset-0 w-full max-w-full h-full min-w-0 object-cover" loading="eager" style={{ maxWidth: '100%' }} />
              <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-b from-black/40 via-black/20 to-black/50' : 'bg-gradient-to-b from-black/20 via-black/10 to-black/30'}`} />
            </div>
            {/* Panel 2: Pillars */}
            <div className="relative h-screen w-full min-w-0 max-w-full flex-shrink-0 overflow-hidden">
              <img src={pillarsSrc} srcSet={pillarsSrcSet} sizes="100vw" alt="Temple pillars"
                className="absolute inset-0 w-full max-w-full h-full min-w-0 object-cover" loading="eager" style={{ maxWidth: '100%' }} />
              <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-b from-black/40 via-black/20 to-black/50' : 'bg-gradient-to-b from-black/20 via-black/10 to-black/30'}`} />
            </div>
            {/* Panel 3: Stereobate */}
            <div className="relative h-screen w-full min-w-0 max-w-full flex-shrink-0 overflow-hidden">
              <img src={bedrockSrc} srcSet={bedrockSrcSet} sizes="100vw" alt="The Stereobate — foundation of Isotímia"
                className="absolute inset-0 w-full max-w-full h-full min-w-0 object-cover" loading="eager" style={{ maxWidth: '100%' }} />
              <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-b from-black/40 via-black/20 to-black/50' : 'bg-gradient-to-b from-black/20 via-black/10 to-black/30'}`} />

              {/* Phase 1 glows: Aretai + Isotímia (amber) */}
              <AnimatePresence>
                {phase === 'aretai' && (
                  <>
                    {aretaiGlows.map((g, i) => renderGlow(g, 'amber', i * 0.08))}
                    {renderGlow(isotimiaGlow, 'amber', 0.35)}
                  </>
                )}
              </AnimatePresence>

              {/* Phase 2 glows: Isótēs header + plaques (cyan) */}
              <AnimatePresence>
                {phase === 'isotes' && (
                  <>
                    {renderGlow(isotesHeaderGlow, 'cyan', 0)}
                    {isotesGlows.map((g, i) => renderGlow(g, 'cyan', 0.1 + i * 0.08))}
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ── PHASE 0: Pediment text + NEXT ── */}
        <AnimatePresence>
          {phase === 'pediment' && (
            <motion.div
              key="phase-pediment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-col items-center gap-5"
            >
              <div className={textBoxClass}>
                <p className={textClass} style={{ fontFamily: 'Georgia, serif' }}>
                  Like classic Greek architecture, AreTéCracy has an elegant, sophisticated and detailed design.
                  While our Blueprint Section shows you what a government running the AreTéCracy model would theoretically look like,
                  the Pillars Tour is intended to help you understand AreTéCracy's overall design and what makes it
                  as strong as a temple that's still standing after two and a half millennia.
                </p>
                <p className={`${textClass} mt-4`} style={{ fontFamily: 'Georgia, serif' }}>
                  Understanding that requires us to start at the core of AreTéCracy itself: its design philosophy —
                  the broad, solid virtues or <em>Aretai</em> that any good, moral government <em>ought</em> to have,
                  and that a self-government model <em>must</em> have if it is to avoid factionalism or devolve into
                  chaotic mob rule or anarchy.
                </p>
              </div>
              <button onClick={startDescent} className={btnClass('cyan')} style={{ fontFamily: 'Georgia, serif' }}>
                NEXT →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── PHASE 1: Aretai text (upper box, over Isótēs area) ── */}
        <AnimatePresence>
          {phase === 'aretai' && (
            <motion.div
              key="phase-aretai"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute z-20 flex flex-col items-center gap-4"
              style={{ top: '8%', left: 0, right: 0 }}
            >
              <div className={`${textBoxClass} overflow-y-auto`} style={{ maxHeight: '45vh' }}>
                <p className={textClass} style={{ fontFamily: 'Georgia, serif' }}>
                  We've tried to use the most descriptive names we could think of.
                  Two of their names come directly from their Greek counterparts.
                  One comes from a passage in Plato's <em>Republic</em> we call "Plato's Roll Call" (PRC) —
                  to emphasize the <em>moral obligation</em> his statement implies rather than the price paid if that
                  obligation is not honored. And one more for which John Koenig's '<em>Sonder</em>' was the closest
                  equivalent we could find.
                </p>
                <p className={`${textClass} mt-3`} style={{ fontFamily: 'Georgia, serif' }}>
                  Once you activate the elevator you will be able to select each Areté's definition and explore
                  the entire architectural model. But before you do, it's important to understand that these four
                  Aretai lead to a way of seeing government, its role in serving the people, and <strong>your</strong> role
                  in participating in that government quite differently than most people do today.
                </p>
                <p className={`${textClass} mt-3`} style={{ fontFamily: 'Georgia, serif' }}>
                  We call this philosophical shift <em>Isotímia</em> — "Equal Standing" for every citizen, regardless
                  of wealth, social status, or ideology.
                </p>
              </div>
              <button onClick={() => setPhase('isotes')} className={btnClass('amber')} style={{ fontFamily: 'Georgia, serif' }}>
                NEXT →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── PHASE 2: Isótēs text (lower box, over Isotímia area) ── */}
        <AnimatePresence>
          {phase === 'isotes' && (
            <motion.div
              key="phase-isotes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute z-20 flex flex-col items-center gap-4"
              style={{ bottom: '8%', left: 0, right: 0 }}
            >
              <div className={`${textBoxClass} overflow-y-auto`} style={{ maxHeight: '42vh' }}>
                <p className={textClass} style={{ fontFamily: 'Georgia, serif' }}>
                  Isotímia can be divided into Four Equalities, or <em>Isótēs</em>, most of which harken back to the
                  beginnings of Attic direct democracy nearly 2,500 years ago. Two are named directly for the key
                  "pillars of democracy" of Attic Greece. One — <em>Isarchia</em> (ἰσαρχία), or "Equal Command" —
                  is a little different, because ours more specifically refers to an equal ability <em>and obligation</em> to
                  serve in governance. The last was something philosophers as far back as Aristotle argued for,
                  never defined as a 'right' until Thomas Jefferson mentioned a derivative in the Declaration of
                  Independence: the pursuit of happiness, or, to use Aristotle's term, <em>eudaimonia</em>. We chose
                  not just to make it a right, but one equal to all the others: IsoEudaimonia.
                </p>
              </div>
              <button onClick={onBeginConstruction} className={btnClass('cyan')} style={{ fontFamily: 'Georgia, serif' }}>
                USE ELEVATOR TO CONTINUE TOUR →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ESC hint + Skip/gear — shown during pediment and descending phases */}
        <AnimatePresence>
          {(phase === 'pediment' || phase === 'descending') && (
            <motion.div
              key="skip-controls"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-8 left-0 right-0 z-20 flex items-end justify-between px-8"
            >
              <p className={`text-sm ${darkMode ? 'text-cyan-200' : 'text-stone-700'}`} style={{ fontFamily: 'Georgia, serif' }}>
                ESC to skip Intro
              </p>
              <div className="flex items-stretch rounded-lg overflow-hidden border-2 border-cyan-400/60 shadow-lg">
                <button onClick={onBeginConstruction}
                  className={`px-4 py-2 transition-all duration-300 ${darkMode ? 'bg-cyan-900/30 text-cyan-200 hover:bg-cyan-800/50' : 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100'}`}
                  style={{ fontFamily: 'Georgia, serif' }}
                >Skip Intro</button>
                <button onClick={() => { onBeginConstruction(); onOpenSettings?.(); }}
                  className={`px-3 py-2 border-l-2 border-cyan-400/60 transition-all duration-300 ${darkMode ? 'bg-cyan-900/30 text-cyan-200 hover:bg-cyan-800/50' : 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100'}`}
                  aria-label="Settings"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip Intro button during aretai/isotes phases (subtler, top-right) */}
        <AnimatePresence>
          {(phase === 'aretai' || phase === 'isotes') && (
            <motion.button
              key="skip-tour"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onBeginConstruction}
              className={`absolute top-4 right-4 z-30 px-3 py-1.5 rounded-lg text-sm border transition-all duration-300 ${
                darkMode ? 'bg-black/50 text-cyan-200 border-cyan-400/40 hover:bg-black/70' : 'bg-white/70 text-stone-700 border-stone-400 hover:bg-white/90'
              }`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Skip Intro
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Elevator sidebar */}
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="pillars-elevator-sidebar w-44 md:w-52 flex-shrink-0 min-w-0 flex flex-col items-center pt-4 pb-3 px-3 gap-2 border-l border-gray-600/50"
      >
        {/* Header */}
        <div className="flex flex-col items-center w-full gap-0.5 flex-shrink-0">
          <span className="text-[10px] md:text-xs font-bold leading-tight text-center elevator-menu-item elevator-panel-dark-text">
            Architekton<br />Elevator
          </span>
          <span className="text-lg md:text-xl font-bold uppercase tracking-wide w-full text-center elevator-menu-item text-cyan-200">
            Levels
          </span>
        </div>

        {/* Floor list */}
        <div className="flex flex-col gap-1 w-full flex-1 min-h-0 overflow-y-auto">
          {PILLAR_LEVELS.map((level, idx) => {
            const isCurrent = idx === floorIndex;
            const isStoppedAtBedrock = phase === 'aretai' || phase === 'isotes';
            const useRestingGlow = isCurrent && isStoppedAtBedrock;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => goToFloor()}
                className={`w-full text-left px-2 py-1.5 rounded text-sm font-mono elevator-menu-item transition-all duration-300 flex items-center gap-2 ${
                  isCurrent
                    ? useRestingGlow
                      ? 'bg-cyan-500/30 text-cyan-100 border border-cyan-400/60'
                      : 'bg-cyan-400/50 text-white border-2 border-cyan-200'
                    : 'elevator-panel-dark-text hover:bg-gray-600/40 hover:text-blue-200 cursor-pointer'
                }`}
                style={
                  isCurrent && !useRestingGlow
                    ? { boxShadow: darkMode
                        ? '0 0 24px rgba(255,255,255,0.85), 0 0 48px rgba(34,211,238,0.7)'
                        : '0 0 24px rgba(255,255,255,0.95), 0 0 48px rgba(251,191,36,0.6)' }
                    : isCurrent && useRestingGlow
                      ? { boxShadow: darkMode ? '0 0 8px rgba(34,211,238,0.5)' : '0 0 8px rgba(251,191,36,0.4)' }
                      : undefined
                }
              >
                <span className={`flex-shrink-0 w-4 text-center ${isCurrent ? 'opacity-100' : 'opacity-0'}`} aria-hidden>▸</span>
                <span className="min-w-0 truncate">{level.label}</span>
              </button>
            );
          })}
        </div>

        {/* ▲ ▼ buttons */}
        <div className="flex flex-col gap-2 w-full flex-shrink-0">
          <button type="button" onClick={goUp} disabled={atTop} aria-label="Go up"
            className={`w-full py-2 rounded-lg border-2 text-2xl transition-all elevator-menu-item ${
              atTop ? 'bg-gray-700/30 text-gray-500 border-gray-600 cursor-not-allowed' : 'bg-cyan-500/20 text-cyan-300 border-cyan-400 hover:bg-cyan-500/30'
            }`}
          >▲</button>
          <button type="button" onClick={goDown} disabled={atBottom} aria-label="Go down"
            className={`w-full py-2 rounded-lg border-2 text-2xl transition-all elevator-menu-item ${
              atBottom ? 'bg-gray-700/30 text-gray-500 border-gray-600 cursor-not-allowed' : 'bg-cyan-500/20 text-cyan-300 border-cyan-400 hover:bg-cyan-500/30'
            }`}
          >▼</button>
        </div>

        {/* Instruction */}
        <div className="flex-shrink-0 w-full">
          <div className="px-3 py-2 rounded-xl border-2 shadow-lg bg-white/95 border-amber-800/90 w-full">
            <p className="text-xs text-center text-stone-900 leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
              {phase === 'aretai' || phase === 'isotes'
                ? 'Click any level to begin'
                : 'Use ▲ ▼ or click a level'}
            </p>
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
}
