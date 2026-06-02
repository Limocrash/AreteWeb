import { Home, Columns3, Info, MoreHorizontal, Sun, Moon, BookOpen, Languages, Settings as SettingsIcon, FileText, Shield, Scale, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Settings } from './Settings';
const logoWordmark = import.meta.env.BASE_URL + 'images/logo-wordmark.png';

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
  { id: 'blueprint', label: 'The Blueprint', icon: Info },
  { id: 'pillars', label: 'The Pillars', icon: Columns3 },
];

const ETC_PAGES = ['glossary', 'why-greek', 'etc', 'legal', 'privacy', 'terms'];

export function Navigation(props: NavigationProps) {
  if (!props) { console.warn('Navigation: undefined props'); return null; }
  const { darkMode = true, currentPage = 'home', onNavigate = () => {}, onDarkModeChange, settingsOpen: externalSettingsOpen, onSettingsChange, onSkipPrefChange } = props;
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [internalSettingsOpen, setInternalSettingsOpen] = useState(false);
  const [joinHover, setJoinHover] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const settingsOpen = externalSettingsOpen !== undefined ? externalSettingsOpen : internalSettingsOpen;
  const setSettingsOpen = onSettingsChange || setInternalSettingsOpen;

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  const navigateTo = (page: string) => {
    onNavigate(page);
    setDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <div className={`w-full px-4 sm:px-6 lg:px-8 border-b-2 transition-colors duration-300 ${
        darkMode ? 'bg-[#0a0a0a] border-amber-700/50 shadow-lg' : 'bg-white border-slate-200 shadow-lg'
      }`}>
        <div className="flex items-center justify-between h-14">
          <button onClick={() => onNavigate('home')}
            className={`flex items-center h-full py-2 px-3 rounded-lg transition-all duration-300 ${
              currentPage === 'home' ? (darkMode ? 'bg-gray-800/50' : 'bg-stone-100') : (darkMode ? 'hover:bg-gray-800/30' : 'hover:bg-stone-50')
            }`}
            style={darkMode ? { border: '1px solid #0a0a0a' } : {}}
            aria-label="Home"
          >
            {!logoError ? (
              <img
                src={logoWordmark}
                srcSet={`${import.meta.env.BASE_URL}images/logo-wordmark-small.webp 200w, ${import.meta.env.BASE_URL}images/logo-wordmark-medium.webp 400w, ${import.meta.env.BASE_URL}images/logo-wordmark-large.webp 800w`}
                sizes="(max-width: 600px) 120px, 160px"
                alt="AreTéCracy"
                onLoad={() => setLogoLoaded(true)}
                onError={() => setLogoError(true)}
                className={`h-8 w-auto transition-all duration-300 hover:scale-105 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ border: darkMode ? '1px solid #0a0a0a' : 'none' }}
                loading="eager"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {...{ fetchpriority: 'high' } as any}
              />
            ) : (
              <span className={`text-lg font-bold ${darkMode ? 'text-amber-300' : 'text-slate-800'}`}
                style={{ fontFamily: '"Trebuchet MS", sans-serif' }}>AreTéCracy</span>
            )}
          </button>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button key={item.id} onClick={() => onNavigate(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? (darkMode ? 'text-amber-200' : 'text-slate-800')
                      : (darkMode ? 'text-amber-100 hover:bg-gray-800/50 hover:text-[#69dcff]' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600')
                  } ${!isActive && 'hover:scale-105'}`}
                  style={{
                    fontFamily: '"Trebuchet MS", sans-serif',
                    ...(isActive && darkMode ? { backgroundColor: '#0d2e71', border: '1px solid #51dff1' }
                      : isActive && !darkMode ? { backgroundColor: '#BFDBFE', border: '1px solid #2563EB' }
                      : {})
                  }}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'opacity-80' : ''}`} />
                  <span className={`font-semibold whitespace-nowrap ${isActive ? 'opacity-90' : ''}`} style={{ fontSize: 'var(--nav-item-font)' }}>{item.label}</span>
                </button>
              );
            })}

            {/* κ.τ.λ. dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(o => !o)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 ${
                  ETC_PAGES.includes(currentPage) || dropdownOpen
                    ? (darkMode ? 'text-amber-200' : 'text-slate-800')
                    : (darkMode ? 'text-amber-100 hover:bg-gray-800/50 hover:text-[#69dcff]' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600')
                }`}
                style={{
                  fontFamily: '"Trebuchet MS", sans-serif',
                  ...((ETC_PAGES.includes(currentPage) || dropdownOpen) && darkMode
                    ? { backgroundColor: '#0d2e71', border: '1px solid #51dff1' }
                    : (ETC_PAGES.includes(currentPage) || dropdownOpen) && !darkMode
                    ? { backgroundColor: '#BFDBFE', border: '1px solid #2563EB' }
                    : {})
                }}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <MoreHorizontal className="w-4 h-4" />
                <span className="font-semibold whitespace-nowrap" style={{ fontSize: 'var(--nav-item-font)' }}>κ.τ.λ.</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className={`absolute right-0 top-full mt-1 w-52 rounded-lg border-2 shadow-xl z-[100] py-1 ${
                  darkMode
                    ? 'bg-[#0a0a0a] border-amber-700/50'
                    : 'bg-white border-slate-200'
                }`}>
                  {/* Content */}
                  <p className={`px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-widest ${darkMode ? 'text-amber-600' : 'text-amber-700'}`}
                    style={{ fontFamily: '"Trebuchet MS", sans-serif' }}>Content</p>
                  <button onClick={() => navigateTo('glossary')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors ${
                      currentPage === 'glossary'
                        ? (darkMode ? 'bg-[#0d2e71] text-amber-200' : 'bg-blue-100 text-slate-800')
                        : (darkMode ? 'text-amber-100 hover:bg-gray-800/60' : 'text-slate-700 hover:bg-slate-50')
                    }`} style={{ fontFamily: '"Trebuchet MS", sans-serif' }}>
                    <BookOpen className="w-4 h-4 flex-shrink-0" /><span>Glossary</span>
                  </button>
                  <button onClick={() => navigateTo('why-greek')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors ${
                      currentPage === 'why-greek'
                        ? (darkMode ? 'bg-[#0d2e71] text-amber-200' : 'bg-blue-100 text-slate-800')
                        : (darkMode ? 'text-amber-100 hover:bg-gray-800/60' : 'text-slate-700 hover:bg-slate-50')
                    }`} style={{ fontFamily: '"Trebuchet MS", sans-serif' }}>
                    <Languages className="w-4 h-4 flex-shrink-0" /><span>Why Greek?</span>
                  </button>

                  <hr className={`my-1 ${darkMode ? 'border-amber-700/30' : 'border-slate-200'}`} />

                  {/* Settings */}
                  <button onClick={() => { setSettingsOpen(true); setDropdownOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors ${
                      darkMode ? 'text-amber-100 hover:bg-gray-800/60' : 'text-slate-700 hover:bg-slate-50'
                    }`} style={{ fontFamily: '"Trebuchet MS", sans-serif' }}>
                    <SettingsIcon className="w-4 h-4 flex-shrink-0" /><span>Settings</span>
                  </button>

                  <hr className={`my-1 ${darkMode ? 'border-amber-700/30' : 'border-slate-200'}`} />

                  {/* Legal */}
                  <p className={`px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-widest ${darkMode ? 'text-amber-600' : 'text-amber-700'}`}
                    style={{ fontFamily: '"Trebuchet MS", sans-serif' }}>Legal</p>
                  {[
                    { id: 'legal', label: 'Legal Notices', icon: FileText },
                    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
                    { id: 'terms', label: 'Terms of Use', icon: Scale },
                  ].map(({ id, label, icon: Icon }) => (
                    <button key={id} onClick={() => navigateTo(id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors ${
                        currentPage === id
                          ? (darkMode ? 'bg-[#0d2e71] text-amber-200' : 'bg-blue-100 text-slate-800')
                          : (darkMode ? 'text-amber-100/70 hover:bg-gray-800/60 hover:text-amber-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700')
                      }`} style={{ fontFamily: '"Trebuchet MS", sans-serif' }}>
                      <Icon className="w-4 h-4 flex-shrink-0" /><span>{label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between bg-transparent">
        <div className="flex items-center gap-1">
          {onDarkModeChange && (
            <>
              <button onClick={() => onDarkModeChange(false)} className={`p-2 rounded-full border-2 shadow-sm transition-all duration-300 ${darkMode ? 'bg-[#b45309] text-white border-[#7c2d12] hover:bg-[#c05621]' : 'bg-amber-100/90 text-[#7c2d12] border-amber-500 hover:bg-amber-200'}`} aria-label="Light mode"><Sun className="w-5 h-5" /></button>
              <button onClick={() => onDarkModeChange(true)} className={`p-2 rounded-full border-2 shadow-sm transition-all duration-300 ${darkMode ? 'bg-amber-100/90 text-[#7c2d12] border-amber-500 hover:bg-amber-200' : 'bg-[#b45309] text-white border-[#7c2d12] hover:bg-[#c05621]'}`} aria-label="Dark mode"><Moon className="w-5 h-5" /></button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => console.log('Login clicked')}
            className={`px-4 py-2 rounded-lg font-semibold border-2 transition-all duration-300 ${darkMode ? 'border-cyan-400/60 text-cyan-200 hover:bg-cyan-500/20' : 'border-slate-400 text-slate-700 hover:bg-slate-100'}`}
            style={{ fontFamily: '"Trebuchet MS", sans-serif', backgroundColor: darkMode ? '#0a0a0a' : '#ffffff', fontSize: 'var(--nav-item-font)' }}
            aria-label="Login"
          >Login</button>
          <button onClick={() => window.open('https://www.patreon.com/aretecracy', '_blank')}
            className="px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-black border-2 border-[#D4AF37] hover:border-[#F9E076] opacity-100"
            style={{ fontFamily: '"Trebuchet MS", sans-serif', backgroundColor: joinHover ? '#F9E076' : '#D4AF37', fontSize: 'var(--nav-item-font)' }}
            onMouseEnter={() => setJoinHover(true)} onMouseLeave={() => setJoinHover(false)}
            aria-label="Join Us"
          >Join Us</button>
        </div>
      </div>

      <Settings darkMode={darkMode} isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} onSkipPrefChange={onSkipPrefChange} />
    </nav>
  );
}
