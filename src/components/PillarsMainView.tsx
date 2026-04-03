// Pillars page after intro: level-specific content (message / pillars image / euthynteria) + elevator sidebar.
// Opens at bottom (Bedrock) so the intro's "you can't build the roof first" makes sense.

import { useState, useEffect, useRef } from 'react';
import { TempleArchitecture } from './TempleArchitecture';
import { RulesLine } from './RulesLine';
import { PILLAR_LEVELS, PILLAR_LEVEL_COUNT } from '../data/pillarLevels';
import { areAllPillarsCompleted } from '../utils/templeProgress';

interface PillarsMainViewProps {
  darkMode: boolean;
  onNavigateToPillar?: (pillarId: string) => void;
  /** True while PillarsIntro overlay is showing; main view scrolls to bottom when this becomes false */
  introVisible?: boolean;
  /** Restart the Pillars intro from the beginning */
  onRestartIntro?: () => void;
}

export function PillarsMainView({ darkMode, onNavigateToPillar, introVisible = false, onRestartIntro: _onRestartIntro }: PillarsMainViewProps) {
  const [floorIndex, setFloorIndex] = useState(5); // Bedrock = bottom; elevator starts here
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const prevIntroVisible = useRef(introVisible);

  const atTop = floorIndex <= 0;
  const atBottom = floorIndex >= PILLAR_LEVEL_COUNT - 1;

  const goUp = () => {
    if (!atTop) setFloorIndex((i) => Math.max(0, i - 1));
  };
  const goDown = () => {
    if (!atBottom) setFloorIndex((i) => Math.min(PILLAR_LEVEL_COUNT - 1, i + 1));
  };
  const goToFloor = (idx: number) => setFloorIndex(idx);

  // When we become visible (intro closes or skip intro), scroll to bottom so Bedrock is in view
  useEffect(() => {
    prevIntroVisible.current = introVisible;
    if (introVisible) return; // Still covered by intro; don't scroll yet
    const el = contentScrollRef.current;
    if (!el) return;
    const scrollToBottom = () => {
      el.scrollTop = el.scrollHeight;
    };
    // Short delay so layout is ready (main view was pre-mounted under intro, or just mounted with skip)
    const t = setTimeout(() => {
      scrollToBottom();
      requestAnimationFrame(scrollToBottom);
    }, 100);
    return () => clearTimeout(t);
  }, [introVisible]);

  // Keyboard: ArrowUp / ArrowDown to move elevator when on Pillars page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFloorIndex((i) => Math.max(0, i - 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFloorIndex((i) => Math.min(PILLAR_LEVEL_COUNT - 1, i + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const allComplete = areAllPillarsCompleted();

  // Scroll content so the level indicator arrow (white on blue) is in view when floor changes
  useEffect(() => {
    const scrollEl = contentScrollRef.current;
    if (!scrollEl) return;
    const arrow = scrollEl.querySelector('[data-level-indicator]');
    if (arrow instanceof HTMLElement) {
      const t = requestAnimationFrame(() => {
        arrow.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
      return () => cancelAnimationFrame(t);
    }
  }, [floorIndex]);

  return (
    <div className="flex h-[calc(100vh-8rem)] w-full min-w-0 min-h-0 overflow-hidden">
      {/* Main content - scrollable */}
      <div
        ref={contentScrollRef}
        className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden"
        style={{ pointerEvents: 'auto' }}
      >
        <TempleArchitecture
          darkMode={darkMode}
          onNavigateToPillar={onNavigateToPillar}
          currentFloor={floorIndex}
          allPillarsComplete={allComplete}
        />
        <div className="py-12 text-center px-4">
          <RulesLine darkMode={darkMode} />
        </div>
      </div>

      {/* Elevator sidebar - fills available height; extra top padding so "Architekton Elevator" clears nav buttons */}
      <aside className="pillars-elevator-sidebar w-44 md:w-52 flex-shrink-0 h-full flex flex-col items-center pt-6 pb-4 px-3 gap-2 border-l border-gray-600/50 overflow-hidden">
        <div className="flex flex-col items-center w-full gap-1 flex-shrink-0">
          <span className="font-bold leading-tight text-center elevator-menu-item elevator-panel-dark-text block" style={{ fontSize: 'clamp(11px, 1vw, 13px)' }}>
            Architekton Elevator
          </span>
          <span className="font-bold uppercase tracking-wide w-full text-center elevator-menu-item text-cyan-200 block" style={{ fontSize: 'clamp(13px, 1.2vw, 16px)' }}>
            Levels
          </span>
        </div>

        {/* Levels list — overflow-y-auto so it scrolls rather than clips on short viewports */}
        <div className="flex flex-col gap-1 w-full flex-1 min-h-0 overflow-y-auto">
          {PILLAR_LEVELS.map((level, idx) => {
            const isCurrent = idx === floorIndex;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => goToFloor(idx)}
                className={`w-full text-left px-2 py-1.5 rounded text-sm font-mono elevator-menu-item transition-all duration-200 flex items-center gap-2 ${
                  isCurrent
                    ? 'bg-cyan-500/30 text-cyan-100 border border-cyan-400/60'
                    : 'elevator-panel-dark-text hover:bg-gray-600/40 hover:text-blue-200'
                }`}
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

        {/* Restart Tour button */}
        {_onRestartIntro && (
          <div className="flex-shrink-0 w-full">
            <button
              type="button"
              onClick={_onRestartIntro}
              className={`w-full py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all duration-300 ${
                darkMode
                  ? 'bg-amber-900/30 text-amber-200 border-amber-700/60 hover:bg-amber-800/50 hover:border-amber-500'
                  : 'bg-amber-50 text-amber-800 border-amber-400 hover:bg-amber-100'
              }`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              ↩ Restart Tour
            </button>
          </div>
        )}

        {/* Tour instruction frame */}
        <div className="flex-shrink-0 w-full">
          <div className="px-3 py-2 rounded-xl border-2 shadow-lg bg-white/95 border-amber-800/90 backdrop-blur-sm w-full">
            <p className="text-xs text-center text-stone-900 leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
              Use <span className="font-bold">▲</span> <span className="font-bold">▼</span> or click a level
            </p>
          </div>
        </div>

        {/* UP / DOWN triangle buttons */}
        <div className="flex flex-col gap-2 w-full flex-shrink-0">
          <button
            type="button"
            onClick={goUp}
            disabled={atTop}
            aria-label="Go up"
            className={`w-full py-2 rounded-lg border-2 text-2xl transition-all elevator-menu-item ${
              atTop
                ? 'bg-gray-700/30 text-gray-500 border-gray-600 cursor-not-allowed'
                : 'bg-cyan-500/20 text-cyan-300 border-cyan-400 hover:bg-cyan-500/30'
            }`}
          >
            ▲
          </button>
          <button
            type="button"
            onClick={goDown}
            disabled={atBottom}
            aria-label="Go down"
            className={`w-full py-2 rounded-lg border-2 text-2xl transition-all elevator-menu-item ${
              atBottom
                ? 'bg-gray-700/30 text-gray-500 border-gray-600 cursor-not-allowed'
                : 'bg-cyan-500/20 text-cyan-300 border-cyan-400 hover:bg-cyan-500/30'
            }`}
          >
            ▼
          </button>
        </div>
      </aside>
    </div>
  );
}
