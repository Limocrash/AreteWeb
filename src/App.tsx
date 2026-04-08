import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { LegalPage } from './components/LegalPage';
import { GlossaryPage } from './components/GlossaryPage';
import { GeminiHero } from './GeminiHero';
import { PillarsIntro } from './components/PillarsIntro';
import { PillarsMainView } from './components/PillarsMainView';
import { HomeIntro } from './components/HomeIntro';
import { EtcPage } from './components/EtcPage';
import { BlueprintPage } from './components/BlueprintPage';
import { BLUEPRINT_HUB_BUTTONS } from './data/blueprintHubs';
import { getSkipWelcomeIntro, getSkipPillarsIntro } from './components/Settings';
import { isReturningVisitor, markVisited } from './utils/templeProgress';

// Parchment textures for background (local files in public/images)
const lightParchment = import.meta.env.BASE_URL + 'images/LightParchment.jpg';
const darkParchment = import.meta.env.BASE_URL + 'images/DarkmodeParchment.png';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('aretecracy-dark-mode');
      return saved !== null ? saved === 'true' : true; // default dark
    } catch { return true; }
  });

  // Persist dark mode preference
  useEffect(() => {
    try { localStorage.setItem('aretecracy-dark-mode', String(darkMode)); } catch {}
  }, [darkMode]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const getPageFromUrl = (): string => {
    const h = window.location.hash;
    if (h === '#/glossary') return 'glossary';
    if (h === '#/pillars' || h === '#/pillars/tour') return 'pillars';
    if (h.startsWith('#/blueprint')) return 'blueprint';
    if (h === '#/etc') return 'etc';
    if (h === '#/legal') return 'legal';
    if (h === '#/privacy') return 'privacy';
    if (h === '#/terms') return 'terms';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getPageFromUrl());
  const [hash, setHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ''));
  const [showPillarsIntro, setShowPillarsIntro] = useState(true);
  const [skipWelcomeIntro, setSkipWelcomeIntro] = useState(() => getSkipWelcomeIntro());
  const [skipPillarsIntro, setSkipPillarsIntro] = useState(() => getSkipPillarsIntro());

  const [showHomeIntro, setShowHomeIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    const seen = localStorage.getItem('heroInvocationSeen');
    return !seen && currentPage === 'home';
  });

  const refreshSkipPrefs = () => {
    setSkipWelcomeIntro(getSkipWelcomeIntro());
    setSkipPillarsIntro(getSkipPillarsIntro());
  };

  useEffect(() => {
    if (currentPage === 'pillars') {
      setShowPillarsIntro(!skipPillarsIntro);
    }
  }, [currentPage, skipPillarsIntro]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const pageTitles: Record<string, string> = {
      'home':    'AreTéCracy',
      'blueprint': 'The Blueprint | AreTéCracy',
      'pillars':   'The Pillars | AreTéCracy',
      'glossary':  'Glossary | AreTéCracy',
      'etc':       'κ.τ.λ. | AreTéCracy',
      'legal':     'Legal Notices | AreTéCracy',
      'privacy':   'Privacy Policy | AreTéCracy',
      'terms':     'Terms of Use | AreTéCracy',
    };
    document.title = pageTitles[currentPage] ?? 'AreTéCracy';
  }, [currentPage]);

  useEffect(() => {
    const sync = (e?: Event) => {
      const page = getPageFromUrl();
      setCurrentPage(page);
      setHash(window.location.hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Restore intro state based on history entry or hash
      if (page === 'pillars') {
        const introState = (e as PopStateEvent)?.state?.intro;
        const isTourHash = window.location.hash === '#/pillars/tour';
        setShowPillarsIntro(introState === true || (!isTourHash && introState === undefined));
      }
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync as EventListener);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const handleNavigate = (page: string) => {
    const hashMap: Record<string, string> = {
      'home': '',
      'glossary': '#/glossary',
      'pillars': '#/pillars',
      'blueprint': '#/blueprint',
      'etc': '#/etc',
      'legal': '#/legal',
      'privacy': '#/privacy',
      'terms': '#/terms',
    };
    const newHash = hashMap[page] || '';
    setCurrentPage(page);
    setHash(newHash);
    window.history.pushState({ page }, '', newHash || window.location.pathname);
    // Dispatch popstate so BlueprintPage resets to landing when navbar 'blueprint' is clicked
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToPillar = (_pillarId: string) => {
    // Placeholder: opens pillar detail card
  };

  const handleHomeIntroComplete = () => {
    setShowHomeIntro(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('heroInvocationSeen', 'true');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col relative ${darkMode ? 'dark' : ''}`}>
      <div className="fixed inset-0 -z-10">
        <img 
          src={darkMode ? darkParchment : lightParchment}
          alt="Parchment background" 
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-transparent" />
      </div>

      <Navigation
        darkMode={darkMode}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onDarkModeChange={setDarkMode}
        settingsOpen={settingsOpen}
        onSettingsChange={setSettingsOpen}
        onSkipPrefChange={refreshSkipPrefs}
      />

      {showHomeIntro && currentPage === 'home' && (
        <HomeIntro
          darkMode={darkMode}
          onComplete={handleHomeIntroComplete}
          onOpenSettings={() => setSettingsOpen(true)}
        />
      )}

      <div
        className={`flex-1 min-w-0 overflow-x-hidden ${
          currentPage === 'blueprint'
            ? (() => {
                const m = hash.match(/#\/blueprint\/([a-z-]+)/);
                const hubId = m ? m[1] : null;
                const hasMap = hubId && BLUEPRINT_HUB_BUTTONS.some((b) => b.id === hubId && b.hasMap);
                return hasMap ? 'pt-[66px]' : 'pt-[66px]';
              })()
            : 'pt-[8rem]'
        } ${
          currentPage === 'pillars' ? 'max-h-[100vh] min-h-0 overflow-y-hidden' : ''
        } ${
          currentPage === 'blueprint' ? 'min-h-0 flex flex-col' : ''
        }`}
      >
        {currentPage === 'home' && (
          <div
            className="transition-opacity duration-[1200ms] ease-out"
            style={{
              opacity: showHomeIntro && !skipWelcomeIntro ? 0 : 1,
              pointerEvents: showHomeIntro && !skipWelcomeIntro ? 'none' : 'auto',
            }}
          >
            <GeminiHero 
              darkMode={darkMode}
              onNavigate={handleNavigate}
              onNavigateToPillar={handleNavigateToPillar}
            />
          </div>
        )}
        
        {(currentPage === 'legal' || currentPage === 'privacy' || currentPage === 'terms') && (
          <LegalPage 
            darkMode={darkMode}
            type={currentPage as 'legal' | 'privacy' | 'terms'}
          />
        )}
        
        {currentPage === 'glossary' && (
          <GlossaryPage 
            darkMode={darkMode}
            onNavigateToPillar={handleNavigateToPillar}
          />
        )}

        {currentPage === 'pillars' && (
          <>
            <PillarsMainView
              darkMode={darkMode}
              onNavigateToPillar={handleNavigateToPillar}
              introVisible={showPillarsIntro}
              onRestartIntro={() => {
                setShowPillarsIntro(true);
                // Push a history entry so back button returns to intro state
                window.history.pushState({ page: 'pillars', intro: true }, '', '#/pillars');
              }}
            />
            {showPillarsIntro && (
              <AnimatePresence>
                <PillarsIntro
                  darkMode={darkMode}
                  isReturningVisitor={isReturningVisitor()}
                  onBeginConstruction={() => {
                    markVisited();
                    setShowPillarsIntro(false);
                    // Push a new history entry so back button returns to the intro
                    window.history.pushState({ page: 'pillars', intro: false }, '', '#/pillars/tour');
                  }}
                  onOpenSettings={() => setSettingsOpen(true)}
                />
              </AnimatePresence>
            )}
          </>
        )}
        
        {currentPage === 'etc' && (
          <EtcPage
            darkMode={darkMode}
            onNavigate={handleNavigate}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        )}

        {currentPage === 'blueprint' && (
          <BlueprintPage darkMode={darkMode} />
        )}
      </div>

      {currentPage !== 'pillars' && (
        <Footer darkMode={darkMode} onNavigate={handleNavigate} />
      )}

      <Toaster
        theme={darkMode ? 'dark' : 'light'}
        position="bottom-center"
        offset={16}
        richColors
      />
    </div>
  );
}
