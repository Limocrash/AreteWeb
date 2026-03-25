import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { X, BookOpen, ChevronDown, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { MarkdownContent } from './MarkdownContent';
import { getResponsiveSrcset } from '../utils/imageSrcset';
import { EnBracheiCycler } from './EnBracheiCycler';

const completionSeal = (import.meta.env.BASE_URL || "/") + "images/completion-seal.png";

interface DetailCardProps {
  element: {
    id: string;
    name: string;
    subtitle?: string;
    greekName?: string;
    type?: 'pillar' | 'virtue' | 'equality' | 'foundation' | 'process' | 'institution' | 'concept';
    complexity?: 1 | 2 | 3;
  };
  glossaryTerm?: { blurb: string } | null;
  contentBody: string;
  darkMode: boolean;
  completed?: boolean;
  cardOrigin: { x: number; y: number };
  onClose: () => void;
  onComplete?: (elementId: string) => void;
  onNavigateToPillar?: (pillarId: string) => void;
  restsOn?: string[];
  mode?: 'pillar' | 'glossary' | 'triad';
  hasFullPage?: boolean;
}

export function DetailCard({
  element, glossaryTerm, contentBody, darkMode, completed = false,
  cardOrigin, onClose, onComplete, onNavigateToPillar, restsOn,
  mode = 'pillar', hasFullPage = false
}: DetailCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCompletionPill, setShowCompletionPill] = useState(false);
  // _toastVisible: tracked for side-effects only (toast.dismiss coordination); value intentionally unused in render
  const [_toastVisible, setToastVisible] = useState(false);
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const isGlossaryMode = mode === 'glossary';
  const isTriadMode = mode === 'triad';
  const useBloomPalette = true;

  const isContentShort = isTriadMode || contentBody.length < 200 || (contentBody.match(/[.!?]+/g) || []).length < 3;

  useEffect(() => {
    setIsExpanded(false);
    setShowCompletionPill(false);
    setToastVisible(false);
  }, [element.id]);

  useEffect(() => {
    return () => {
      toast.dismiss();
      setToastVisible(false);
    };
  }, []);

  const handleMouseLeave = (e: React.MouseEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget) {
      toast.dismiss();
      setToastVisible(false);
      onClose();
      return;
    }
    const isStillInBackdrop = backdropRef.current?.contains(relatedTarget);
    const isStillInCard = cardRef.current?.contains(relatedTarget);
    if (!isStillInBackdrop && !isStillInCard) {
      toast.dismiss();
      setToastVisible(false);
      onClose();
    }
  };

  useEffect(() => {
    if (isTriadMode) { setShowCompletionPill(false); return; }
    if (completed) { setShowCompletionPill(false); return; }
    if (!contentBody || contentBody.length === 0) { setShowCompletionPill(false); return; }
    const contentIsShort = contentBody.length < 200 || (contentBody.match(/[.!?]+/g) || []).length < 3;
    if (contentIsShort) { setShowCompletionPill(true); return; }
    if (!isExpanded) { setShowCompletionPill(false); return; }
    const scrollContainer = contentScrollRef.current;
    if (!scrollContainer) {
      const timeoutId = setTimeout(() => {
        const container = contentScrollRef.current;
        if (container && !completed && isExpanded) {
          const { scrollTop, scrollHeight, clientHeight } = container;
          if (scrollHeight <= clientHeight) { setShowCompletionPill(true); }
          else if (scrollHeight - scrollTop - clientHeight <= 100) { setShowCompletionPill(true); }
          else { setShowCompletionPill(false); }
        }
      }, 200);
      return () => clearTimeout(timeoutId);
    }
    const handleScroll = () => {
      if (!scrollContainer || completed || !isExpanded) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      if (scrollHeight <= clientHeight) { setShowCompletionPill(true); return; }
      setShowCompletionPill(scrollHeight - scrollTop - clientHeight <= 100);
    };
    let rafId: number | null = null;
    const throttled = () => {
      if (rafId === null) { rafId = requestAnimationFrame(() => { handleScroll(); rafId = null; }); }
    };
    scrollContainer.addEventListener('scroll', throttled, { passive: true });
    handleScroll();
    const checkTimeouts = [
      setTimeout(() => handleScroll(), 100),
      setTimeout(() => handleScroll(), 300),
      setTimeout(() => handleScroll(), 500),
    ];
    return () => {
      scrollContainer.removeEventListener('scroll', throttled);
      checkTimeouts.forEach(clearTimeout);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isExpanded, contentBody, completed, isContentShort, isTriadMode]);

  const handleComplete = () => {
    if (onComplete) {
      onComplete(element.id);
      setToastVisible(true);
    }
    toast.custom(
      (t) => (
        <div
          className={`flex flex-col items-center gap-4 py-6 px-8 relative rounded-xl shadow-xl ${
            darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-gradient-to-br from-blue-50 to-cyan-50'
          }`}
          style={{ border: '2px solid rgba(34, 211, 238, 0.3)', zIndex: 9999, minWidth: '360px' }}
          onMouseEnter={(e) => e.stopPropagation()}
          onMouseLeave={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => { toast.dismiss(t); setToastVisible(false); }}
            className={`absolute top-2 right-2 p-2 rounded-full z-10 backdrop-blur-md ${
              darkMode
                ? 'bg-black/70 text-white hover:bg-black/90 border-2 border-cyan-400'
                : 'bg-white/90 text-cyan-700 hover:bg-white border-2 border-cyan-500'
            }`}
            aria-label="Close"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <div className="text-center">
            <h3 className={`text-xl font-bold mb-2 ${
              darkMode
                ? 'bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-cyan-600 to-amber-600 bg-clip-text text-transparent'
            }`} style={{ fontFamily: 'Georgia, serif' }}>The Kairos Moment</h3>
            <p className={`text-sm mb-3 ${darkMode ? 'text-cyan-200' : 'text-cyan-800'}`} style={{ fontFamily: 'Georgia, serif' }}>
              This is the kairos moment. And you're one step closer to being ready...
            </p>
          </div>
          <img
            src={completionSeal}
            srcSet={getResponsiveSrcset('completion-seal', 'webp')}
            sizes="(max-width: 600px) 200px, 280px"
            alt="Completion Seal"
            className="w-48 h-48 sm:w-56 sm:h-56 object-contain pointer-events-none"
            style={{ filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.8))' }}
          />
        </div>
      ),
      { duration: Infinity }
    );
  };

  const getBadgeInfo = () => {
    if (!element.type) return null;
    const badgeMap: Record<string, { text: string; class: string }> = {
      virtue: { text: 'Virtue', class: darkMode ? 'bg-amber-700/70 text-amber-100 border border-amber-600' : 'bg-amber-100 text-amber-800 border border-amber-400' },
      equality: { text: 'Equality', class: darkMode ? 'bg-blue-800/70 text-blue-200 border border-blue-600' : 'bg-blue-100 text-blue-800 border border-blue-400' },
      foundation: { text: 'Foundation', class: darkMode ? 'bg-slate-700/70 text-slate-200 border border-slate-500' : 'bg-slate-100 text-slate-800 border border-slate-400' },
      pillar: { text: 'Pillar', class: darkMode ? 'bg-blue-800/70 text-blue-200 border border-blue-600' : 'bg-blue-100 text-blue-800 border border-blue-400' },
      process: { text: 'Process', class: darkMode ? 'bg-purple-900/70 text-purple-200 border border-purple-700' : 'bg-purple-100 text-purple-800 border border-purple-300' },
      institution: { text: 'Institution', class: darkMode ? 'bg-indigo-900/70 text-indigo-200 border border-indigo-700' : 'bg-indigo-100 text-indigo-800 border border-indigo-300' },
      concept: { text: 'Concept', class: darkMode ? 'bg-teal-900/70 text-teal-200 border border-teal-700' : 'bg-teal-100 text-teal-800 border border-teal-300' },
    };
    return badgeMap[element.type] || { text: element.type.charAt(0).toUpperCase() + element.type.slice(1), class: darkMode ? 'bg-stone-700 text-stone-200 border border-stone-600' : 'bg-stone-200 text-stone-700 border border-stone-300' };
  };
  const badgeInfo = getBadgeInfo();

  const backBtn = (extraClass = '') => (
    <button onClick={(e) => { e.stopPropagation(); toast.dismiss(); setToastVisible(false); onClose(); }}
      type="button"
      className={`py-2.5 px-5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:scale-105 ${
        darkMode ? 'bg-stone-700/80 text-amber-200 hover:bg-stone-600 border border-stone-600' : 'bg-white/90 text-stone-700 hover:bg-stone-100 border border-stone-300'
      } ${extraClass}`}
      style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem' }}
    >
      {isTriadMode ? '← Back' : isGlossaryMode ? 'Back to Glossary' : 'Back to Pillars'}
    </button>
  );

  const completePill = () => !isTriadMode && showCompletionPill && !completed ? (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center pt-4">
      <button onClick={(e) => { e.stopPropagation(); handleComplete(); }} type="button"
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 hover:scale-105 shadow-lg ${
          useBloomPalette
            ? darkMode ? 'bg-amber-900/80 text-amber-200 hover:bg-amber-800 border border-amber-700' : 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-400'
            : darkMode ? 'bg-cyan-900/80 text-cyan-200 hover:bg-cyan-800 border border-cyan-700' : 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200 border border-cyan-300'
        }`}
        style={{ fontFamily: 'Georgia, serif' }}
      >
        <BookOpen className="w-4 h-4" /> Bookmark as Completed
      </button>
    </motion.div>
  ) : null;

  const contentBoxClass = `p-4 md:p-6 rounded-xl transition-colors duration-300 ${
    useBloomPalette
      ? darkMode ? 'bg-gray-800/50 text-stone-50 border-l-4 border-amber-500' : 'bg-stone-100 text-stone-700 border-l-4 border-amber-600'
      : darkMode ? 'bg-stone-800/50 text-amber-100/90 border-l-4 border-cyan-400' : 'bg-stone-100 text-stone-700 border-l-4 border-cyan-500'
  }`;
  const fontFamilyProp = useBloomPalette ? '"Trebuchet MS", "Trebuchet", "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif' : 'Georgia, serif';

  return (
    <>
      <motion.div
        ref={backdropRef}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={() => { toast.dismiss(); setToastVisible(false); onClose(); }}
        onMouseLeave={handleMouseLeave}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        style={{ overflow: 'hidden', touchAction: 'none' }}
      />
      <motion.div
        ref={cardRef}
        initial={{ scale: 0, x: cardOrigin.x - window.innerWidth / 2, y: cardOrigin.y - window.innerHeight / 2, opacity: 0 }}
        animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
        exit={{ scale: 0, x: cardOrigin.x - window.innerWidth / 2, y: cardOrigin.y - window.innerHeight / 2, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300, duration: 0.5 }}
        transformTemplate={({ x, y, scale }) => {
          const xVal = x ? (typeof x === 'string' ? x : `${x}px`) : '0';
          const yVal = y ? (typeof y === 'string' ? y : `${y}px`) : '0';
          return `translate(-50%, 0) translate(${xVal}, ${yVal}) scale(${scale || 1})`;
        }}
        className={`fixed z-50 rounded-3xl overflow-hidden shadow-2xl left-1/2 w-[95vw] max-w-5xl ${
          darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-blue-800' : 'bg-gradient-to-br from-white via-stone-50 to-blue-50'
        }`}
        style={{ top: 'max(80px, calc(50vh - min(45vh, 450px)))', maxHeight: 'calc(100vh - 160px)', height: 'auto', display: 'flex', flexDirection: 'column' }}
        onClick={(e) => e.stopPropagation()}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-full flex flex-col overflow-hidden min-h-0">
          {/* Header */}
          <div className={`flex-shrink-0 px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b ${darkMode ? 'border-stone-700' : 'border-stone-300'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h2 className={`text-3xl md:text-4xl lg:text-5xl transition-colors duration-300 ${
                    useBloomPalette ? (darkMode ? 'text-amber-200' : 'text-amber-700') : (darkMode ? 'text-cyan-300' : 'text-cyan-600')
                  }`} style={{
                    fontFamily: useBloomPalette ? '"Trebuchet MS", "Trebuchet", sans-serif' : 'Georgia, serif',
                    fontWeight: useBloomPalette ? 700 : 'normal',
                    letterSpacing: useBloomPalette ? '-0.01em' : 'normal',
                    textShadow: useBloomPalette ? (darkMode ? '0 0 20px rgba(212, 175, 55, 0.4), 0 2px 10px rgba(0,0,0,0.5)' : 'none') : (darkMode ? '0 0 20px rgba(34, 211, 238, 0.5), 0 2px 10px rgba(0,0,0,0.5)' : 'none')
                  }}>{element.name}</h2>
                  {badgeInfo && <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeInfo.class}`}>{badgeInfo.text}</span>}
                </div>
                {(element.subtitle || element.greekName) && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className={`text-lg md:text-xl lg:text-2xl transition-colors duration-300 ${darkMode ? 'text-amber-200' : 'text-amber-600'}`}
                    style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 'bold' }}
                  >
                    {element.subtitle || element.greekName}
                  </motion.p>
                )}
              </div>
              <button onClick={() => { toast.dismiss(); setToastVisible(false); onClose(); }}
                className={`flex-shrink-0 p-3 rounded-full transition-all duration-300 ${darkMode ? 'bg-stone-800/80 text-amber-200 hover:bg-stone-700' : 'bg-white/80 text-stone-700 hover:bg-stone-100'}`}
                aria-label="Close"
              >
                <X className="w-7 h-7 md:w-8 md:h-8" style={{ strokeWidth: 2.5 }} />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div ref={contentScrollRef} className="detail-card-scroll flex-1 overflow-y-auto overflow-x-hidden min-h-0 px-6 md:px-8 py-6 md:py-8"
            tabIndex={0} style={{ WebkitOverflowScrolling: 'touch', outline: 'none' }}
            onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()} onScroll={(e) => e.stopPropagation()}
          >
            {/* Blurb - glossary only */}
            {glossaryTerm && !isTriadMode && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6">
                <div className="flex items-center gap-2 mb-3"><EnBracheiCycler darkMode={darkMode} /></div>
                <div className={`text-base md:text-lg leading-relaxed p-4 md:p-6 rounded-xl ${
                  useBloomPalette
                    ? darkMode ? 'bg-gray-800/50 text-stone-50 border-l-4 border-amber-500' : 'bg-stone-100 text-stone-700 border-l-4 border-amber-600'
                    : darkMode ? 'bg-stone-800/50 text-amber-100/90 border-l-4 border-cyan-400' : 'bg-stone-100 text-stone-700 border-l-4 border-cyan-500'
                }`} style={{ fontFamily: 'Georgia, serif' }}>
                  <p>{glossaryTerm.blurb}</p>
                </div>
              </motion.div>
            )}

            {/* Content rendering */}
            {!isExpanded && !isContentShort && !isTriadMode ? (
              <div className="space-y-4">
                <div className={`relative overflow-hidden rounded-xl ${contentBoxClass}`} style={{ maxHeight: '400px' }}>
                  <div className="p-4 md:p-6 pb-20">
                    <div className={`text-base md:text-lg leading-relaxed ${useBloomPalette ? (darkMode ? 'text-stone-50' : 'text-stone-700') : (darkMode ? 'text-amber-100/90' : 'text-stone-700')}`}>
                      <MarkdownContent content={contentBody} darkMode={darkMode} fontFamily={fontFamilyProp} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 pointer-events-none rounded-b-xl" style={{ height: '80px', background: darkMode ? 'linear-gradient(to bottom, transparent, rgba(31,41,55,1))' : 'linear-gradient(to bottom, transparent, rgba(250,250,249,1))' }} />
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }} type="button"
                    className={`py-2.5 px-5 rounded-full transition-all flex items-center gap-2 shadow-xl cursor-pointer hover:scale-105 ${
                      useBloomPalette
                        ? darkMode ? 'bg-amber-600 text-black hover:bg-amber-500 border-2 border-amber-500' : 'bg-amber-500 text-black hover:bg-amber-400 border-2 border-amber-600'
                        : darkMode ? 'bg-cyan-600 text-white hover:bg-cyan-500 border-2 border-cyan-400' : 'bg-cyan-500 text-white hover:bg-cyan-600 border-2 border-cyan-400'
                    }`}
                    style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '0.9rem' }}
                  >
                    <BookOpen className="w-4 h-4" /> Continue reading <ChevronDown className="w-4 h-4" />
                  </button>
                  {backBtn()}
                </div>
              </div>
            ) : isContentShort ? (
              <div className="space-y-4">
                <div className={contentBoxClass}><MarkdownContent content={contentBody} darkMode={darkMode} fontFamily={fontFamilyProp} isTriadMode={isTriadMode} /></div>
                {completePill()}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex justify-center pt-4">
                  {backBtn()}
                </motion.div>
              </div>
            ) : (
              <div className="space-y-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                  <ChevronDown className={`w-5 h-5 animate-bounce ${useBloomPalette ? (darkMode ? 'text-amber-400/60' : 'text-amber-600/60') : (darkMode ? 'text-cyan-400/60' : 'text-cyan-600/60')}`} />
                </motion.div>
                <div className={contentBoxClass}><MarkdownContent content={contentBody} darkMode={darkMode} fontFamily={fontFamilyProp} isTriadMode={isTriadMode} /></div>
                {completePill()}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex justify-center pt-6">
                  <button onClick={(e) => { e.stopPropagation(); toast.dismiss(); setToastVisible(false); onClose(); }} type="button"
                    className={`rounded-full transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:scale-105 ${
                      darkMode ? 'bg-stone-700/80 text-amber-200 hover:bg-stone-600 border border-stone-600' : 'bg-white/90 text-stone-700 hover:bg-stone-100 border border-stone-300'
                    }`}
                    style={{ fontFamily: 'Georgia, serif', fontSize: '2.5cqi', padding: '1cqi 2.5cqi' }}
                  >
                    {isTriadMode ? '← Back' : isGlossaryMode ? 'Back to Glossary' : 'Back to Pillars'}
                  </button>
                </motion.div>
              </div>
            )}

            {/* View Full Page */}
            {isGlossaryMode && hasFullPage && onNavigateToPillar && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex justify-center pt-6">
                <button onClick={(e) => { e.stopPropagation(); onNavigateToPillar(element.id); onClose(); }}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all hover:scale-105 hover:shadow-lg ${
                    darkMode ? 'bg-[#020617] border-2 border-gray-700 hover:border-amber-500 hover:bg-gray-800/80 text-amber-200' : 'bg-white/90 border-2 border-amber-400 hover:border-amber-600 hover:bg-white text-amber-800'
                  }`}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  <ExternalLink className="w-6 h-6" />
                  <span className="text-lg font-semibold">View Full {element.type === 'pillar' ? 'Pillar' : 'Page'}</span>
                </button>
              </motion.div>
            )}

            {/* Rests on */}
            {restsOn && restsOn.length > 0 && (
              <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-stone-700' : 'border-stone-300'}`}>
                <p className={`text-sm mb-3 ${useBloomPalette ? (darkMode ? 'text-amber-200' : 'text-amber-700') : (darkMode ? 'text-cyan-200' : 'text-cyan-700')}`} style={{ fontFamily: 'Georgia, serif' }}>Rests on:</p>
                <div className="flex flex-wrap gap-2">
                  {restsOn.map((pillarId) => (
                    <button key={pillarId} onClick={(e) => { e.stopPropagation(); if (onNavigateToPillar) { toast.dismiss(); setToastVisible(false); onClose(); onNavigateToPillar(pillarId); } }}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all hover:scale-105 ${
                        useBloomPalette
                          ? darkMode ? 'bg-amber-900/50 text-amber-200 hover:bg-amber-800 border border-amber-700' : 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-400'
                          : darkMode ? 'bg-cyan-900/50 text-cyan-200 hover:bg-cyan-800 border border-cyan-700' : 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200 border border-cyan-300'
                      }`}
                      style={{ fontFamily: 'Georgia, serif' }}
                    >{pillarId}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
