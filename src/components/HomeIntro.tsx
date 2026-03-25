import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeIntroProps {
  darkMode: boolean;
  onComplete: () => void;
  onOpenSettings?: () => void;
}

export function HomeIntro({ darkMode, onComplete, onOpenSettings }: HomeIntroProps) {
  const [plaqueLoaded, setPlaqueLoaded] = useState(false);
  const [kickerLoaded, setKickerLoaded] = useState(false);
  const [showThesisLine, setShowThesisLine] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => { onComplete(); }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => { setShowThesisLine(true); }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onComplete(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  const base = import.meta.env.BASE_URL;
  const plaqueSmall = encodeURI(`${base}images/hero-plaque (no text - dark vignette)-12.webp`);
  const plaqueMed   = encodeURI(`${base}images/hero-plaque (no text - dark vignette)-1600.webp`);
  const plaqueLg    = encodeURI(`${base}images/hero-plaque (no text - dark vignette)-3200.webp`);
  const kickerSmall = encodeURI(`${base}images/hero-plaque (text only transparency)-1200.webp`);
  const kickerMed   = encodeURI(`${base}images/hero-plaque (text only transparency)-1600.webp`);
  const kickerLg    = encodeURI(`${base}images/hero-plaque (text only transparency)-3200.webp`);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{
          backgroundImage: darkMode
            ? `url(${base}images/DarkmodeParchment.png)`
            : `url(${base}images/LightParchment.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative mx-auto px-4" style={{ maxWidth: 'min(828px, 92vw)' }}>
          <div className="relative w-full" style={{ aspectRatio: '4 / 1' }}>
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/60 via-blue-500/70 to-cyan-500/60 rounded blur-lg -z-10" aria-hidden="true" />
            {!plaqueLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded" aria-hidden="true" />
            )}
            <img
              src={plaqueSmall}
              srcSet={`${plaqueSmall} 1200w, ${plaqueMed} 1600w, ${plaqueLg} 3200w`}
              sizes="(max-width: 768px) 92vw, 828px"
              alt=""
              className={`w-full h-full object-cover transition-opacity duration-300 ${plaqueLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onLoad={() => setPlaqueLoaded(true)}
            />
            {plaqueLoaded && (
              <img
                src={kickerSmall}
                srcSet={`${kickerSmall} 1200w, ${kickerMed} 1600w, ${kickerLg} 3200w`}
                sizes="(max-width: 768px) 92vw, 828px"
                alt="AFTER MORE THAN 2,000 YEARS — THIS IS THE MOMENT."
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${kickerLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onLoad={() => setKickerLoaded(true)}
              />
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showThesisLine ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
          >
            <p
              className={`text-3xl md:text-4xl tracking-wide ${darkMode ? 'text-amber-200/70' : 'text-stone-600'}`}
              style={{ fontFamily: 'Georgia, serif', fontVariant: 'small-caps', letterSpacing: '0.05em' }}
            >
              Don't change leaders. Change the <span className="underline">rules</span>.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <p className={`text-sm ${darkMode ? 'text-cyan-200' : 'text-stone-700'}`} style={{ fontFamily: 'Georgia, serif' }}>
            ESC to skip Intro
          </p>
        </div>

        <div className="absolute bottom-8 right-8 flex items-stretch rounded-lg overflow-hidden border-2 border-cyan-400/60 shadow-lg">
          <button
            onClick={onComplete}
            className={`px-4 py-2 transition-all duration-300 ${
              darkMode ? 'bg-cyan-900/30 text-cyan-200 hover:bg-cyan-800/50' : 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Skip Intro
          </button>
          <button
            onClick={() => { onComplete(); onOpenSettings?.(); }}
            className={`px-3 py-2 border-l-2 border-cyan-400/60 transition-all duration-300 ${
              darkMode ? 'bg-cyan-900/30 text-cyan-200 hover:bg-cyan-800/50' : 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100'
            }`}
            aria-label="Settings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
