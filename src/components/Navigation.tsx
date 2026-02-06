import { motion } from 'motion/react';
import { Home, BookOpen, Columns3, Users, Info, MoreHorizontal, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { Settings } from './Settings';
const logoWordmark = import.meta.env.BASE_URL + "images/logo-wordmark.png";

interface NavigationProps {
  darkMode: boolean;
  currentPage: string;
  onNavigate: (page: string) => void;
  onDarkModeChange?: (darkMode: boolean) => void;
  settingsOpen?: boolean;
  onSettingsChange?: (open: boolean) => void;
  onSkipPrefChange?: () => void;
}


const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'The Owl', icon: Info },
  { id: 'pillars', label: 'The Pillars', icon: Columns3 },
  { id: 'glossary', label: 'Glossary', icon: BookOpen },
  { id: 'etc', label: 'κ.τ.λ. (More)', icon: MoreHorizontal },
];

export function Navigation(props: NavigationProps) {
  // Guard against undefined props (can happen during HMR or strict mode)
  if (!props) {
    console.warn('Navigation component received undefined props');
    return null;
  }
  
  const { darkMode = true, currentPage = 'home', onNavigate = () => {}, onDarkModeChange, settingsOpen: externalSettingsOpen, onSettingsChange, onSkipPrefChange } = props || {};
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [internalSettingsOpen, setInternalSettingsOpen] = useState(false);
  const [joinHover, setJoinHover] = useState(false);
  
  // Use external control if provided, otherwise internal
  const settingsOpen = externalSettingsOpen !== undefined ? externalSettingsOpen : internalSettingsOpen;
  const setSettingsOpen = onSettingsChange || setInternalSettingsOpen;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
    >
      {/* Row 1: Main nav - solid background, nav items only */}
      <div
        className={`w-full px-4 sm:px-6 lg:px-8 border-b-2 transition-colors duration-300 ${
          darkMode
            ? 'bg-[#0a0a0a] border-amber-700/50 shadow-lg'
            : 'bg-white border-slate-200 shadow-lg'
        }`}
      >
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo - Home Button */}
          <button
            onClick={() => onNavigate('home')}
            className={`flex items-center h-full py-2 px-3 md:px-4 rounded-lg transition-all duration-300 ${
              currentPage === 'home'
                ? darkMode
                  ? 'bg-gray-800/50'
                  : 'bg-stone-100'
                : darkMode
                  ? 'hover:bg-gray-800/30'
                  : 'hover:bg-stone-50'
            }`}
            style={darkMode ? { border: '1px solid #0a0a0a' } : {}}
            aria-label="Home"
          >
            {!logoError ? (
              <img
                src={logoWordmark}
                srcSet={`${import.meta.env.BASE_URL || "/"}images/logo-wordmark-small.webp 200w, ${import.meta.env.BASE_URL || "/"}images/logo-wordmark-medium.webp 400w, ${import.meta.env.BASE_URL || "/"}images/logo-wordmark-large.webp 800w`}
                sizes="(max-width: 600px) 120px, 160px"
                alt="AreTéCracy"
                onLoad={() => setLogoLoaded(true)}
                onError={() => setLogoError(true)}
                className={`h-8 md:h-10 w-auto transition-all duration-300 ${
                  !logoLoaded ? 'opacity-0' : 'opacity-100'
                } hover:scale-105`}
                style={{ border: darkMode ? '1px solid #0a0a0a' : 'none' }}
                loading="eager"
                fetchpriority="high"
              />
            ) : (
              <span className={`text-lg md:text-xl font-bold ${
                darkMode ? 'text-amber-300' : 'text-slate-800'
              }`} style={{ fontFamily: '"Trebuchet MS", "Trebuchet", "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif' }}>
                AreTéCracy
              </span>
            )}
          </button>

          {/* Navigation Items - Compact horizontal layout (no theme, settings, login here) */}
          <div className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                  }}
                  className={`relative flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? darkMode
                        ? 'text-amber-200'
                        : 'text-slate-800'
                      : darkMode
                        ? 'text-amber-100 hover:bg-gray-800/50 hover:text-[#69dcff]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                  } ${!isActive && 'hover:scale-105'}`}
                  style={{
                    fontFamily: '"Trebuchet MS", "Trebuchet", "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    ...(isActive && darkMode ? {
                      backgroundColor: '#0d2e71',
                      border: '1px solid #51dff1'
                    } : isActive && !darkMode ? {
                      backgroundColor: '#BFDBFE',
                      border: '1px solid #2563EB'
                    } : {})
                  }}
                >
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 ${
                    isActive 
                      ? 'opacity-80' 
                      : ''
                  }`} />
                  <span className={`text-sm md:text-base font-semibold whitespace-nowrap ${
                    isActive 
                      ? 'opacity-90' 
                      : ''
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 2: Sub-bar - transparent, theme left, Login | Join Us right (overlays content) */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between bg-transparent">
        {/* Theme toggle - current theme = dimmed, switch-to = highlighted */}
        <div className="flex items-center gap-1">
          {onDarkModeChange && (
            <>
              <button
                onClick={() => onDarkModeChange(false)}
                className={`p-2 rounded-full border-2 shadow-sm transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#b45309] text-white border-[#7c2d12] hover:bg-[#c05621]'
                    : 'bg-amber-100/90 text-[#7c2d12] border-amber-500 hover:bg-amber-200'
                }`}
                aria-label="Light mode"
                title="Light mode"
              >
                <Sun className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDarkModeChange(true)}
                className={`p-2 rounded-full border-2 shadow-sm transition-all duration-300 ${
                  darkMode
                    ? 'bg-amber-100/90 text-[#7c2d12] border-amber-500 hover:bg-amber-200'
                    : 'bg-[#b45309] text-white border-[#7c2d12] hover:bg-[#c05621]'
                }`}
                aria-label="Dark mode"
                title="Dark mode"
              >
                <Moon className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Login | Join Us - right */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              // Placeholder: wire to auth when ready
              console.log('Login clicked');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-300 ${
              darkMode
                ? 'border-cyan-400/60 text-cyan-200 hover:bg-cyan-500/20'
                : 'border-slate-400 text-slate-700 hover:bg-slate-100'
            }`}
            style={{
              fontFamily: '"Trebuchet MS", "Trebuchet", "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
              backgroundColor: darkMode ? '#0a0a0a' : '#ffffff',
            }}
            aria-label="Login"
          >
            Login
          </button>
          <button
            onClick={() => {
              // Placeholder: wire to Patreon or auth when ready
              window.open('https://www.patreon.com/aretecracy', '_blank');
            }}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 text-black border-2 border-[#D4AF37] hover:border-[#F9E076] opacity-100"
            style={{ fontFamily: '"Trebuchet MS", "Trebuchet", "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', backgroundColor: joinHover ? '#F9E076' : '#D4AF37' }}
            onMouseEnter={() => setJoinHover(true)}
            onMouseLeave={() => setJoinHover(false)}
            aria-label="Join Us"
          >
            Join Us
          </button>
        </div>
      </div>
      
      {/* Settings Modal */}
      <Settings
        darkMode={darkMode}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSkipPrefChange={onSkipPrefChange}
      />
    </motion.nav>
  );
}
