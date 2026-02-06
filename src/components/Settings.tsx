import { useState, useEffect } from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SKIP_WELCOME_INTRO_KEY = 'aretecracy-skip-welcome-intro';
const SKIP_PILLARS_INTRO_KEY = 'aretecracy-skip-pillars-intro';

export function getSkipWelcomeIntro(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(SKIP_WELCOME_INTRO_KEY) === 'true';
}

export function getSkipPillarsIntro(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(SKIP_PILLARS_INTRO_KEY) === 'true';
}

function setSkipWelcomeIntroStorage(skip: boolean): void {
  if (typeof window === 'undefined') return;
  if (skip) localStorage.setItem(SKIP_WELCOME_INTRO_KEY, 'true');
  else localStorage.removeItem(SKIP_WELCOME_INTRO_KEY);
}

function setSkipPillarsIntroStorage(skip: boolean): void {
  if (typeof window === 'undefined') return;
  if (skip) localStorage.setItem(SKIP_PILLARS_INTRO_KEY, 'true');
  else localStorage.removeItem(SKIP_PILLARS_INTRO_KEY);
}

interface SettingsProps {
  darkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSkipPrefChange?: () => void;
}

// Reset functions
function resetTempleProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('aretecracy-temple-progress');
}

function resetWelcomeIntro(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('heroInvocationSeen');
}

function resetPillarsIntro(): void {
  if (typeof window === 'undefined') return;
  const progress = localStorage.getItem('aretecracy-temple-progress');
  if (progress) {
    try {
      const data = JSON.parse(progress);
      data.visited = false;
      localStorage.setItem('aretecracy-temple-progress', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to reset Pillars intro:', e);
    }
  }
}

export function Settings({ darkMode, isOpen, onClose, onSkipPrefChange }: SettingsProps) {
  const [isResetting, setIsResetting] = useState(false);
  const [isResettingWelcome, setIsResettingWelcome] = useState(false);
  const [isResettingPillars, setIsResettingPillars] = useState(false);
  const [skipWelcomeIntro, setSkipWelcomeIntroState] = useState(false);
  const [skipPillarsIntro, setSkipPillarsIntroState] = useState(false);

  // Sync checkbox state from localStorage when modal opens
  useEffect(() => {
    if (isOpen) {
      setSkipWelcomeIntroState(getSkipWelcomeIntro());
      setSkipPillarsIntroState(getSkipPillarsIntro());
    }
  }, [isOpen]);

  const handleResetProgress = () => {
    if (!confirm('Are you sure you want to reset all completed elements? This cannot be undone.')) {
      return;
    }

    setIsResetting(true);
    resetTempleProgress();
    
    // Show success message
    alert('Progress reset successfully. Refreshing...');
    
    // Reload the page to refresh all state
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleResetWelcomeIntro = () => {
    setIsResettingWelcome(true);
    resetWelcomeIntro();
    alert('Welcome intro reset. You will see it again on your next visit to Home.');
    setIsResettingWelcome(false);
  };

  const handleResetPillarsIntro = () => {
    setIsResettingPillars(true);
    resetPillarsIntro();
    alert('Pillars intro reset. You will see the elevator descent again on your next visit to The Pillars.');
    setIsResettingPillars(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            aria-hidden="true"
          />

          {/* Modal - positioned correctly above nav (z-50) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[90vw] max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Blue-only detail card theme (matches Pillar / Arcade detail cards, no amber/brown) */}
            <div className={`rounded-2xl shadow-2xl border-2 ${
              darkMode
                ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-blue-800 border-cyan-500/50'
                : 'bg-gradient-to-br from-white via-stone-50 to-blue-50 border-cyan-400'
            }`}>
              {/* Header */}
              <div className={`flex items-center justify-between px-6 py-4 border-b ${
                darkMode ? 'border-cyan-500/40' : 'border-cyan-300'
              }`}>
                <h2 className={`text-2xl font-bold ${
                  darkMode ? 'text-cyan-300' : 'text-cyan-600'
                }`} style={{ fontFamily: 'Georgia, serif' }}>
                  Settings
                </h2>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    darkMode
                      ? 'bg-cyan-900/30 text-cyan-200 hover:bg-cyan-800/50 border border-cyan-500/50'
                      : 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100 border border-cyan-300'
                  }`}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <div className="space-y-6">
                  {/* Intro Resets */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${
                      darkMode ? 'text-cyan-200' : 'text-cyan-700'
                    }`} style={{ fontFamily: 'Georgia, serif' }}>
                      Intro Sequences
                    </h3>
                    
                    {/* Reset Welcome Intro */}
                    <div className="mb-3">
                      <p className={`text-sm mb-2 ${
                        darkMode ? 'text-cyan-200/90' : 'text-cyan-700'
                      }`} style={{ fontFamily: 'Georgia, serif' }}>
                        Show welcome intro again on next home visit.
                      </p>
                      <button
                        onClick={handleResetWelcomeIntro}
                        disabled={isResettingWelcome}
                        className={`w-full py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                          darkMode
                            ? 'bg-cyan-900/30 text-cyan-200 hover:bg-cyan-800/50 border border-cyan-500/60'
                            : 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100 border border-cyan-400'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        <RotateCcw className={`w-4 h-4 ${isResettingWelcome ? 'animate-spin' : ''}`} />
                        {isResettingWelcome ? 'Resetting...' : 'Reset Welcome Intro'}
                      </button>
                      <label className={`mt-2 flex items-center gap-2 cursor-pointer select-none ${
                        darkMode ? 'text-cyan-200/90' : 'text-cyan-700'
                      }`} style={{ fontFamily: 'Georgia, serif', fontSize: '0.875rem' }}>
                        <input
                          type="checkbox"
                          checked={skipWelcomeIntro}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSkipWelcomeIntroStorage(checked);
                            setSkipWelcomeIntroState(checked);
                            onSkipPrefChange?.();
                          }}
                          className="sr-only"
                          aria-label="Don't show welcome intro again"
                        />
                        <span className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          darkMode
                            ? skipWelcomeIntro ? 'bg-cyan-600 border-cyan-500' : 'bg-transparent border-cyan-500/60'
                            : skipWelcomeIntro ? 'bg-cyan-500 border-cyan-400' : 'bg-transparent border-cyan-400'
                        }`}>
                          {skipWelcomeIntro && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                        </span>
                        Don't show welcome intro again (uncheck to turn back on)
                      </label>
                    </div>

                    {/* Reset Pillars Intro */}
                    <div>
                      <p className={`text-sm mb-2 ${
                        darkMode ? 'text-cyan-200/90' : 'text-cyan-700'
                      }`} style={{ fontFamily: 'Georgia, serif' }}>
                        Show Pillars intro again on next visit.
                      </p>
                      <button
                        onClick={handleResetPillarsIntro}
                        disabled={isResettingPillars}
                        className={`w-full py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                          darkMode
                            ? 'bg-cyan-900/30 text-cyan-200 hover:bg-cyan-800/50 border border-cyan-500/60'
                            : 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100 border border-cyan-400'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        <RotateCcw className={`w-4 h-4 ${isResettingPillars ? 'animate-spin' : ''}`} />
                        {isResettingPillars ? 'Resetting...' : 'Reset Pillars Intro'}
                      </button>
                      <label className={`mt-2 flex items-center gap-2 cursor-pointer select-none ${
                        darkMode ? 'text-cyan-200/90' : 'text-cyan-700'
                      }`} style={{ fontFamily: 'Georgia, serif', fontSize: '0.875rem' }}>
                        <input
                          type="checkbox"
                          checked={skipPillarsIntro}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSkipPillarsIntroStorage(checked);
                            setSkipPillarsIntroState(checked);
                            onSkipPrefChange?.();
                          }}
                          className="sr-only"
                          aria-label="Don't show Pillars intro again"
                        />
                        <span className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          darkMode
                            ? skipPillarsIntro ? 'bg-cyan-600 border-cyan-500' : 'bg-transparent border-cyan-500/60'
                            : skipPillarsIntro ? 'bg-cyan-500 border-cyan-400' : 'bg-transparent border-cyan-400'
                        }`}>
                          {skipPillarsIntro && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                        </span>
                        Don't show Pillars intro again (uncheck to turn back on)
                      </label>
                    </div>
                  </div>

                  {/* Progress Reset */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${
                      darkMode ? 'text-cyan-200' : 'text-cyan-700'
                    }`} style={{ fontFamily: 'Georgia, serif' }}>
                      Progress
                    </h3>
                    <p className={`text-sm mb-4 ${
                      darkMode ? 'text-cyan-200/90' : 'text-cyan-700'
                    }`} style={{ fontFamily: 'Georgia, serif' }}>
                      Reset all completed elements and start fresh.
                    </p>
                    <button
                      onClick={handleResetProgress}
                      disabled={isResetting}
                      className={`w-full py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                        darkMode
                          ? 'bg-red-900/50 text-white hover:bg-red-800/70 border border-red-600'
                          : 'bg-red-100 text-red-800 hover:bg-red-200 border border-red-400'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      <RotateCcw className={`w-5 h-5 ${isResetting ? 'animate-spin' : ''}`} />
                      {isResetting ? 'Resetting...' : 'Reset All Progress'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
