interface FooterProps {
  darkMode?: boolean;
  onNavigate?: (page: string) => void;
}

export function Footer({ darkMode = true, onNavigate }: FooterProps) {
  const handleLegalClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-4 border-t transition-colors duration-300 ${
      darkMode 
        ? 'bg-stone-900 border-stone-800 text-stone-300' 
        : 'bg-stone-50 border-stone-300 text-stone-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-center md:text-left">
            <span className={darkMode ? 'text-stone-300' : 'text-stone-600'}>
              © 2015–{currentYear} AreTéCracy.org & The Civic OS Foundation.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLegalClick('legal')}
              className={`hover:underline transition-colors ${
                darkMode 
                  ? 'text-stone-200 hover:text-amber-200' 
                  : 'text-stone-600 hover:text-amber-700'
              }`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Legal
            </button>
            <span className={darkMode ? 'text-stone-500' : 'text-stone-400'}>·</span>
            <button
              onClick={() => handleLegalClick('privacy')}
              className={`hover:underline transition-colors ${
                darkMode 
                  ? 'text-stone-200 hover:text-amber-200' 
                  : 'text-stone-600 hover:text-amber-700'
              }`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Privacy
            </button>
            <span className={darkMode ? 'text-stone-500' : 'text-stone-400'}>·</span>
            <button
              onClick={() => handleLegalClick('terms')}
              className={`hover:underline transition-colors ${
                darkMode 
                  ? 'text-stone-200 hover:text-amber-200' 
                  : 'text-stone-600 hover:text-amber-700'
              }`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
