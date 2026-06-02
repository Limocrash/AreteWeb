function navigateToWhyGreek() {
  window.history.pushState({}, '', '#/why-greek');
  window.dispatchEvent(new PopStateEvent('popstate'));
}

interface WhyGreekBannerProps {
  darkMode: boolean;
}

export function WhyGreekBanner({ darkMode }: WhyGreekBannerProps) {
  return (
    <div className={`w-full px-4 py-3 flex items-center justify-between gap-4 border-b ${
      darkMode
        ? 'bg-stone-900/60 border-amber-700/30 text-amber-200/80'
        : 'bg-amber-50/80 border-amber-300/60 text-stone-700'
    }`}>
      <p className="text-sm italic" style={{ fontFamily: '"Crimson Text", Georgia, serif' }}>
        AreTéCracy uses Greek terminology — not for atmosphere, but for a precise political reason.
      </p>
      <button
        type="button"
        onClick={navigateToWhyGreek}
        className={`flex-shrink-0 text-sm font-semibold whitespace-nowrap transition-colors ${
          darkMode
            ? 'text-amber-400 hover:text-amber-200'
            : 'text-amber-700 hover:text-amber-900'
        }`}
        style={{ fontFamily: '"Trebuchet MS", system-ui, sans-serif' }}
      >
        Why Greek? →
      </button>
    </div>
  );
}
