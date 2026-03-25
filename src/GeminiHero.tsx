import { useState, useEffect, useRef, useCallback } from 'react';
import { FeatureTriadOverlay } from './components/FeatureTriadOverlay';
import { ExitIntentDialog } from './components/ExitIntentDialog';
import { RulesLine } from './components/RulesLine';

interface GeminiHeroProps {
  darkMode?: boolean;
  onNavigate?: (page: string) => void;
  onNavigateToPillar?: (pillarId: string) => void;
}

export function GeminiHero({ darkMode = true, onNavigate, onNavigateToPillar: _onNavigateToPillar }: GeminiHeroProps) {
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [clickedScrollPrompt, setClickedScrollPrompt] = useState(false);
  const [scrolledToEightWays, setScrolledToEightWays] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const exitIntentFiredRef = useRef(false);

  const goToEightWays = useCallback(() => {
    setShowExitDialog(false);
    document.getElementById('eight-ways')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const el = document.getElementById('eight-ways');
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e?.isIntersecting) setScrolledToEightWays(true); },
      { threshold: 0.1, rootMargin: '-80px 0px 0px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY > 0) return;
      if (exitIntentFiredRef.current || clickedScrollPrompt || scrolledToEightWays) return;
      exitIntentFiredRef.current = true;
      setShowExitDialog(true);
    };
    document.addEventListener('mouseout', handleExitIntent);
    return () => document.removeEventListener('mouseout', handleExitIntent);
  }, [clickedScrollPrompt, scrolledToEightWays]);

  const base = import.meta.env.BASE_URL;
  const bannerSmall = `${base}images/logo-banner-small.webp`;
  const bannerMed = `${base}images/logo-banner-medium.webp`;
  const bannerLg = `${base}images/logo-banner-large.webp`;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode ? 'text-white' : 'text-stone-900'
    }`} style={{ 
      fontFamily: '"Trebuchet MS", "Trebuchet", "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
      backgroundColor: 'transparent'
    }}>
      {/* Hero Section */}
      <header className="relative pt-20 pb-8 lg:pt-24 lg:pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top tagline above logo */}
          <p
            className="mb-4 md:mb-5 tracking-wide text-[1.75rem] md:text-[2rem]"
            style={{
              fontFamily: '"Crimson Text", "EB Garamond", "Georgia", "Times New Roman", serif',
              fontWeight: 600,
              fontVariant: 'small-caps',
              letterSpacing: '0.05em',
              color: darkMode ? 'rgba(251, 191, 36, 0.9)' : 'rgb(87, 83, 78)',
            }}
          >
            IT&apos;S TIME TO UPGRADE TO A WHOLE NEW OS.
          </p>

          {/* Logo Banner */}
          <div className="mb-10 md:mb-12 relative mx-auto max-w-5xl">
            <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/60 via-blue-500/70 to-cyan-500/60 rounded-lg blur-xl -z-10" aria-hidden="true"></div>
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <div className="aspect-[21/9] bg-gradient-to-br from-gray-800 to-black flex items-center justify-center relative overflow-hidden">
                {!bannerLoaded && (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black" aria-hidden="true" />
                )}
                <img 
                  src={bannerSmall}
                  srcSet={`${bannerSmall} 400w, ${bannerMed} 800w, ${bannerLg} 1200w`}
                  sizes="(max-width: 1024px) 92vw, 1000px"
                  alt="AreTéCracy Hero Banner" 
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    bannerLoaded ? "opacity-100" : "opacity-0 absolute"
                  }`}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onLoad={() => setBannerLoaded(true)}
                />
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1
            className="text-2xl md:text-4xl font-bold tracking-tight mb-0 max-w-5xl mx-auto"
            style={{ fontFamily: '"Trebuchet MS", "Trebuchet", "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif' }}
          >
            <span className="block mb-2 md:whitespace-nowrap">
              Are you ready for <span className="underline">real</span>, CITIZEN-RUN democracy?
            </span>
            <span
              className="block mt-6 uppercase text-[2.26875rem] md:text-[2.7225rem] lg:text-[3.63rem]"
              style={{
                color: darkMode ? '#00F0FF' : '#0891b2',
                fontFamily: '"Crimson Text", "EB Garamond", "Georgia", "Times New Roman", serif',
                fontWeight: 600,
              }}
            >
              WE ARE.{' '}
              <a
                href="https://www.patreon.com/aretecracy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
                style={{ color: 'inherit', fontFamily: 'inherit' }}
              >
                JOIN US.
              </a>
            </span>
          </h1>

          <p className={`mt-6 max-w-2xl mx-auto text-xl ${darkMode ? 'text-gray-300' : 'text-stone-700'}`}>
            A civic operating system for the new millennium. Built on 2,000-year-old classic first principles, focused on virtue, powered by AI, and designed to resist — and <span className="font-bold uppercase">RESET</span> — everything you're seeing today.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setClickedScrollPrompt(true);
                goToEightWays();
              }}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-base md:text-lg transition-all duration-300 border-2 shadow-lg hover:scale-105 ${
                darkMode
                  ? 'bg-cyan-600 text-white border-cyan-500 hover:bg-cyan-500 hover:border-cyan-400'
                  : 'bg-cyan-600 text-white border-cyan-500 hover:bg-cyan-500 hover:border-cyan-400'
              }`}
              style={{ fontFamily: '"Trebuchet MS", "Trebuchet", "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif' }}
            >
              FIND OUT MORE
              <span className="inline-block" aria-hidden="true">↓</span>
            </button>

            <button
              onClick={() => window.open('https://www.patreon.com/aretecracy', '_blank')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-base md:text-lg transition-all duration-300 shadow-lg hover:scale-105 bg-[#D4AF37] text-black hover:bg-[#F9E076] border-2 border-[#D4AF37] hover:border-[#F9E076]"
              style={{ fontFamily: '"Trebuchet MS", "Trebuchet", "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif' }}
            >
              JOIN US FOR FREE
            </button>
          </div>
        </div>
      </header>

      {/* Feature Triad */}
      <div className="relative">
        <FeatureTriadOverlay 
          darkMode={darkMode}
          onNavigate={onNavigate}
        />
      </div>

      {/* CTA Section */}
      <section className="py-32 text-center relative">
        <div className="absolute inset-0 bg-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">
            The Moment is Now.
          </h2>
          <p className={`text-xl md:text-2xl mb-12 ${darkMode ? 'text-gray-300' : 'text-stone-700'}`}>
            No career politicians. No elite few. <br/>
            Just citizens, virtue, and the power to govern ourselves.
          </p>
          <button
            onClick={() => onNavigate?.('pillars')}
            className="inline-block px-10 py-5 bg-[#D4AF37] text-black text-lg font-bold tracking-widest hover:bg-[#F9E076] transition-colors shadow-lg transform hover:-translate-y-1"
          >
            SEE THE BLUEPRINT
          </button>
          <div className="mt-16">
            <RulesLine darkMode={darkMode ?? true} />
          </div>
        </div>
      </section>

      {/* Exit Intent Dialog */}
      {showExitDialog && (
        <ExitIntentDialog
          darkMode={darkMode}
          onClose={() => setShowExitDialog(false)}
          onGoToEightWays={goToEightWays}
        />
      )}
    </div>
  );
}
