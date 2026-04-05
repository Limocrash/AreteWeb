import { useEffect } from 'react';

interface ExitIntentDialogProps {
  darkMode: boolean;
  onClose: () => void;
  onGoToEightWays: () => void;
}

const octetHeadlines = [
  "POLITICIANS CAN'T BE BOUGHT. (THERE AREN'T ANY.)",
  "NO BILLIONAIRE IS RICH ENOUGH TO BUY EVEN ONE LAW",
  "THE YOUNG AND THE UNBORN FINALLY HAVE A VOICE",
  "THE ECONOMY NEVER FORGETS. ANYONE.",
  "THE CAMERAS POINT UP. NOT AT YOU.",
  "MAJORITIES DON'T GET TO HAVE TYRANNY.",
  "GOVERNMENT IS NEITHER A SPORT NOR THEATER. IT'S TEAMWORK.",
  "FORGET UBI. THERE'S ONE JOB AI CAN NEVER TAKE AWAY: YOURS.",
];

export function ExitIntentDialog({ darkMode, onClose, onGoToEightWays }: ExitIntentDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleHeadlineClick = () => {
    onGoToEightWays();
    window.location.hash = 'eight-ways';
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-dialog-title"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm focus:outline-none"
        aria-label="Close dialog"
      />
      <div
        className={`relative w-full max-w-lg rounded-xl shadow-2xl border-2 p-6 md:p-8 text-left ${
          darkMode
            ? 'bg-[#0f172a] border-gray-600 text-white'
            : 'bg-white border-amber-200 text-stone-900'
        }`}
        style={{ fontFamily: '"Trebuchet MS", "Trebuchet", "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif' }}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-4 right-4 p-1 rounded transition-colors ${
            darkMode ? 'text-gray-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'
          }`}
          aria-label="Close"
        >
          <span className="text-xl leading-none">×</span>
        </button>

        <h2 id="exit-dialog-title" className="text-lg font-bold mb-1 pr-8">
          Before you go…
        </h2>
        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-stone-500'}`}>
          You haven't seen the eight reasons yet:
        </p>

        <div className="flex flex-col gap-2 mb-4">
          {octetHeadlines.map((headline) => (
            <button
              key={headline}
              type="button"
              onClick={handleHeadlineClick}
              className={`w-full text-left px-3 py-2 rounded text-xs font-bold tracking-wide transition-all duration-200 ${
                darkMode
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 hover:border-cyan-400'
                  : 'bg-cyan-50 text-cyan-700 border border-cyan-300 hover:bg-cyan-100 hover:border-cyan-500'
              }`}
            >
              {headline}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full px-6 py-3 font-semibold rounded border-2 transition-colors text-sm"
          style={{
            backgroundColor: darkMode ? '#0d2e71' : '#BFDBFE',
            borderColor: darkMode ? '#51dff1' : '#2563EB',
            color: darkMode ? '#e2e8f0' : '#1e3a5f',
          }}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
