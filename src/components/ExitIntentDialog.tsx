import { useEffect } from 'react';

interface ExitIntentDialogProps {
  darkMode: boolean;
  onClose: () => void;
  onGoToEightWays: () => void;
}

export function ExitIntentDialog({ darkMode, onClose, onGoToEightWays }: ExitIntentDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-dialog-title"
      aria-describedby="exit-dialog-desc"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-inset"
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
        <h2 id="exit-dialog-title" className="text-xl font-bold mb-4 pr-8">
          Before you go…
        </h2>
        <p id="exit-dialog-desc" className={`text-base md:text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-stone-700'}`}>
          You haven't seen the eight reasons yet. How about: &quot;Politicians can't be bought — there aren't any,&quot; or &quot;No billionaire is rich enough to buy even one law,&quot; or &quot;The young and the unborn finally have a voice?&quot; Aren't you curious?
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="#eight-ways"
            onClick={(e) => {
              e.preventDefault();
              onGoToEightWays();
              window.location.hash = 'eight-ways';
            }}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-bold rounded transition-all ${
              darkMode
                ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                : 'bg-cyan-600 text-white hover:bg-cyan-500'
            }`}
          >
            See the eight ways
            <span className="inline-block translate-y-0.5" aria-hidden="true">↓</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className={`px-6 py-3 font-semibold rounded border-2 transition-colors ${
              darkMode
                ? 'border-gray-500 text-gray-300 hover:border-gray-400 hover:text-white'
                : 'border-stone-300 text-stone-700 hover:border-stone-400 hover:text-stone-900'
            }`}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
