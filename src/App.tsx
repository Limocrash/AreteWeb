import React, { useState, useEffect } from 'react';
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
const lightParchment = '/images/LightParchment.jpg';
const darkParchment = '/images/DarkmodeParchment.png';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Helper function to get page from URL
  const getPageFromUrl = (): string => {
    const hash = window.location.hash;
    if (hash === '#/glossary') return 'glossary';
    if (hash === '#/pillars') return 'pillars';
    if (hash.startsWith('#/blueprint')) return 'blueprint';
    if (hash === '#/etc') return 'etc';
    if (hash === '#/legal') return 'legal';
    if (hash === '#/privacy') return 'privacy';
    if (hash === '#/terms') return 'terms';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getPageFromUrl());
  const [hash, setHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ''));
  const [showPillarsIntro, setShowPillarsIntro] = useState(true);
  const [skipWelcomeIntro, setSkipWelcomeIntro] = useState(() => getSkipWelcomeIntro());
  const [skipPillarsIntro, setSkipPillarsIntro] = useState(() => getSkipPillarsIntro());

  // Home intro: show on first visit only (unless skip is set)
  const [showHomeIntro, setShowHomeIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    const seen = localStorage.getItem('heroInvocationSeen');
    return !seen && currentPage === 'home';
  });

  const refreshSkipPrefs = () => {
    setSkipWelcomeIntro(getSkipWelcomeIntro());
    setSkipPillarsIntro(getSkipPillarsIntro());
  };

  // Show PillarsIntro when navigating to pillars; skip if user turned off future intros
  useEffect(() => {
    if (currentPage === 'pillars') {
      setShowPillarsIntro(!skipPillarsIntro);
    }
  }, [currentPage, skipPillarsIntro]);

  // Sync dark mode to document class for global CSS variables
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle browser back/forward and hash changes (e.g. blueprint landing vs hub)
  useEffect(() => {
    const sync = () => {
      setCurrentPage(getPageFromUrl());
      setHash(window.location.hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  // Navigation handler
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
    const hash = hashMap[page] || '';
    setCurrentPage(page);
    setHash(hash);
    window.history.pushState({ page }, '', hash || window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToPillar = (pillarId: string) => {
    console.log(`Navigate to pillar: ${pillarId}`);
    // In a real implementation, this would open the pillar detail card
  };

  const handleHomeIntroComplete = () => {
    setShowHomeIntro(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('heroInvocationSeen', 'true');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col relative ${darkMode ? 'dark' : ''}`}>
      {/* Parchment Background */}
      <div className="fixed inset-0 -z-10">
        <img 
          // Use light parchment in light mode and the darker PNG in dark mode.
          src={darkMode ? darkParchment : lightParchment}
          alt="Parchment background" 
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        {/* Debug mode: remove the overlay entirely */}
        <div className="absolute inset-0 bg-transparent" />
      </div>

      {/* Navigation Bar */}
      <Navigation
        darkMode={darkMode}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onDarkModeChange={setDarkMode}
        settingsOpen={settingsOpen}
        onSettingsChange={setSettingsOpen}
        onSkipPrefChange={refreshSkipPrefs}
      />

      {/* Home Intro Overlay */}
      {showHomeIntro && currentPage === 'home' && (
        <HomeIntro
          darkMode={darkMode}
          onComplete={handleHomeIntroComplete}
          onOpenSettings={() => setSettingsOpen(true)}
        />
      )}

      {/* Page Content - Blueprint map hub: pt-[66px] so map starts below navbar Row 1; Blueprint landing: pt-[66px]; others: pt-[8rem] */}
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
          currentPage === 'pillars' ? 'max-h-[100vh] overflow-y-hidden' : ''
        } ${
          currentPage === 'blueprint'
            ? 'min-h-0 overflow-y-hidden flex flex-col'
            : ''
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
        
        {/* Legal Pages */}
        {(currentPage === 'legal' || currentPage === 'privacy' || currentPage === 'terms') && (
          <LegalPage 
            darkMode={darkMode}
            type={currentPage as 'legal' | 'privacy' | 'terms'}
          />
        )}
        
        {/* Glossary Page */}
        {currentPage === 'glossary' && (
          <GlossaryPage 
            darkMode={darkMode}
            onNavigateToPillar={handleNavigateToPillar}
          />
        )}

        {/* Pillars Page: main view always mounted (so it lays out during intro); intro as overlay when showing */}
        {currentPage === 'pillars' && (
          <>
            <PillarsMainView
              darkMode={darkMode}
              onNavigateToPillar={handleNavigateToPillar}
              introVisible={showPillarsIntro}
            />
            {showPillarsIntro && (
              <AnimatePresence>
                <PillarsIntro
                  darkMode={darkMode}
                  isReturningVisitor={isReturningVisitor()}
                  onBeginConstruction={() => {
                    markVisited();
                    setShowPillarsIntro(false);
                  }}
                  onOpenSettings={() => setSettingsOpen(true)}
                />
              </AnimatePresence>
            )}
          </>
        )}
        
        {/* κ.τ.λ. (More) page - Settings + Legal/Privacy/Terms */}
        {currentPage === 'etc' && (
          <EtcPage
            darkMode={darkMode}
            onNavigate={handleNavigate}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        )}

        {/* The Blueprint page - Ekklesia hub + process hubs */}
        {currentPage === 'blueprint' && (
          <BlueprintPage darkMode={darkMode} />
        )}
      </div>

      {/* Footer - hidden on Pillars so page is exactly 100vh and elevator has no scrollbar */}
      {currentPage !== 'pillars' && (
        <Footer darkMode={darkMode} onNavigate={handleNavigate} />
      )}

      {/* Toast notifications (completion seal award, etc.) */}
      <Toaster
        theme={darkMode ? 'dark' : 'light'}
        position="bottom-center"
        offset={16}
        richColors
      />
    </div>
  );
}
