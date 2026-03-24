import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Filter, BookOpen } from 'lucide-react';
import { glossaryTerms, GlossaryTerm, searchTerms } from '../data/glossary';
import { DetailCard } from './DetailCard';
import { RulesLine } from './RulesLine';
import { getGlossaryContent } from '../data/content';
import { isSectionConstructed, markSectionConstructed } from '../utils/templeProgress';

const COMPLETION_FEATHER_DEBUG = true; // set false once feather is verified
const completionFeatherSrc = (import.meta.env.BASE_URL || '/') + 'completion-feather.png';

interface GlossaryPageProps {
  darkMode: boolean;
  onNavigateToPillar?: (pillarId: string) => void;
}

export function GlossaryPage({ darkMode, onNavigateToPillar }: GlossaryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [cardOrigin, setCardOrigin] = useState<{ x: number; y: number } | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [completedTerms, setCompletedTerms] = useState<Set<string>>(new Set());

  // Load completed terms from localStorage on mount
  const loadCompletedTerms = () => {
    const completed = glossaryTerms
      .filter(term => isSectionConstructed(term.id))
      .map(term => term.id);
    setCompletedTerms(new Set(completed));
  };

  useEffect(() => {
    loadCompletedTerms();
    
    // Listen for storage changes (when completion happens in another tab/page)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'aretecracy-temple-progress') {
        loadCompletedTerms();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also reload when page gains focus (in case completion happened in same tab)
    const handleFocus = () => {
      loadCompletedTerms();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Diagnostic: log when completed terms change (feather only shows on completed terms)
  useEffect(() => {
    if (COMPLETION_FEATHER_DEBUG && completedTerms.size > 0) {
      console.log('[Glossary] Completion feather will show on term ids:', Array.from(completedTerms));
      console.log('[Glossary] Feather image URL:', completionFeatherSrc);
    } else if (COMPLETION_FEATHER_DEBUG) {
      console.log('[Glossary] No completed terms yet — feather only appears on cards for terms you\'ve read (open term → Full Page → scroll to bottom).');
    }
  }, [completedTerms]);

  // Mark term as completed
  const markTermCompleted = (termId: string) => {
    markSectionConstructed(termId);
    setCompletedTerms(prev => new Set(prev).add(termId));
    // Trigger a custom event so other components in the same tab can update
    window.dispatchEvent(new Event('temple-progress-updated'));
  };

  // Filter and search
  const filteredTerms = useMemo(() => {
    let terms = searchQuery ? searchTerms(searchQuery) : glossaryTerms;
    
    if (filterCategory) {
      terms = terms.filter(t => t.category === filterCategory);
    }
    
    return terms.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, filterCategory]);

  // Get categories
  const categories = useMemo(() => {
    const cats = new Set(glossaryTerms.map(t => t.category).filter(Boolean));
    return Array.from(cats).sort();
  }, []);

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-6xl mb-6 transition-colors duration-300 ${
              darkMode ? 'text-amber-100' : 'text-stone-900'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            AreTéCracy Glossary
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
              darkMode ? 'text-amber-200/80' : 'text-stone-700'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            The language of virtue-based democratic governance
          </motion.p>
          
          {/* Completion Legend */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={`mt-4 flex items-center justify-center gap-2 text-sm ${
              darkMode ? 'text-cyan-300/70' : 'text-cyan-600/70'
            }`}
          >
            <div className="relative w-5 h-5 shrink-0 flex items-center justify-center">
              <div
                className={`absolute inset-0 z-0 rounded-full blur ${
                  darkMode ? 'bg-cyan-400/40' : 'bg-cyan-600/30'
                }`}
                style={{
                  width: '200%',
                  height: '200%',
                  top: '-50%',
                  left: '-50%'
                }}
              />
              <img
                src={completionFeatherSrc}
                alt=""
                role="presentation"
                className="relative z-10 w-5 h-5 object-contain"
                style={{
                  filter: darkMode
                    ? 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.4))'
                    : 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.6)) drop-shadow(0 0 8px rgba(6, 182, 212, 0.3))'
                }}
              />
            </div>
            <span style={{ fontFamily: 'Georgia, serif' }}>
              = You've read this term (syncs with Pillars page)
            </span>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
              darkMode ? 'text-amber-400' : 'text-stone-500'
            }`} />
            <input
              type="text"
              placeholder="Search terms, Greek names, or concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-12 py-4 rounded-xl text-lg transition-all duration-300 ${
                darkMode
                  ? 'bg-stone-800 text-amber-100 placeholder-amber-300/40 border-2 border-amber-700/50 focus:border-amber-500'
                  : 'bg-white text-stone-900 placeholder-stone-400 border-2 border-stone-300 focus:border-amber-500'
              } outline-none`}
              style={{ fontFamily: 'Georgia, serif' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
                  darkMode
                    ? 'text-amber-400 hover:bg-stone-700'
                    : 'text-stone-500 hover:bg-stone-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Category Filter */}
            <div className="flex gap-2 items-center flex-wrap">
              <Filter className={`w-4 h-4 shrink-0 ${darkMode ? 'text-amber-400' : 'text-stone-600'}`} />
              <span className={`text-sm ${darkMode ? 'text-amber-200' : 'text-stone-700'}`}>
                Category:
              </span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(filterCategory === cat ? null : cat)}
                  className={`px-3 py-1 rounded-full text-xs capitalize transition-all ${
                    filterCategory === cat
                      ? darkMode
                        ? 'bg-cyan-600 text-white'
                        : 'bg-cyan-500 text-white'
                      : darkMode
                        ? 'bg-stone-700 text-cyan-200 hover:bg-stone-600'
                        : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Clear Filters */}
            {filterCategory && (
              <button
                onClick={() => setFilterCategory(null)}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  darkMode
                    ? 'bg-stone-600 text-amber-200 hover:bg-stone-500'
                    : 'bg-stone-300 text-stone-700 hover:bg-stone-400'
                }`}
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Results Count */}
          <p className={`text-center text-sm ${darkMode ? 'text-amber-300/60' : 'text-stone-600'}`}>
            Showing {filteredTerms.length} of {glossaryTerms.length} terms
          </p>
        </motion.div>

        {/* Terms Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {filteredTerms.map((term, index) => {
            const isCompleted = completedTerms.has(term.id);
            return (
              <motion.button
                key={term.id}
                data-term-id={term.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                onClick={(e) => {
                  // Capture the click position for bloom animation
                  const rect = e.currentTarget.getBoundingClientRect();
                  setCardOrigin({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                  });
                  setSelectedTerm(term);
                }}
                className={`text-left p-6 rounded-xl transition-all duration-300 relative ${
                  darkMode
                    ? 'bg-stone-800/70 hover:bg-stone-700 border-2 border-amber-700/40 hover:border-amber-500'
                    : 'bg-white hover:bg-stone-50 border-2 border-stone-300 hover:border-amber-500'
                } hover:scale-105 hover:shadow-xl`}
              >
                {/* Completion Indicator - Small glowing feather (asset: solid feather; glow via CSS) */}
                {isCompleted && (
                  <div 
                    className="absolute top-3 right-3 group z-10"
                    title="You've read this term"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative w-[50px] h-[50px]">
                      {/* Glow effect - explicitly behind the feather (z-0) */}
                      <div 
                        className={`absolute inset-0 z-0 rounded-full ${
                          darkMode ? 'bg-cyan-400/40' : 'bg-cyan-600/30'
                        } blur-md`}
                        style={{
                          width: '180%',
                          height: '180%',
                          top: '-40%',
                          left: '-40%'
                        }}
                      />
                      {/* Feather image - explicitly on top of glow (z-10) so it's visible */}
                      <img
                        src={completionFeatherSrc}
                        alt=""
                        role="presentation"
                        className="absolute inset-0 z-10 w-[50px] h-[50px] object-contain"
                        style={{
                          filter: darkMode 
                            ? 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.4))'
                            : 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.6)) drop-shadow(0 0 8px rgba(6, 182, 212, 0.3))'
                        }}
                        onLoad={() => {
                          if (COMPLETION_FEATHER_DEBUG) console.log('[Glossary] Completion feather image loaded OK:', term.id);
                        }}
                        onError={(e) => {
                          console.warn('[Glossary] Completion feather image failed to load:', completionFeatherSrc, e);
                        }}
                      />
                    </div>
                    {/* Tooltip on hover */}
                    <div className="absolute right-0 top-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                      <div className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                        darkMode 
                          ? 'bg-stone-800 text-cyan-300 border border-cyan-500/50' 
                          : 'bg-white text-cyan-700 border border-cyan-300 shadow-lg'
                      }`} style={{ fontFamily: 'Georgia, serif' }}>
                        Read
                      </div>
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="mb-3">
                  <h3 className={`text-xl mb-1 transition-colors duration-300 ${
                    darkMode ? 'text-amber-100' : 'text-stone-900'
                  }`} style={{ fontFamily: 'Georgia, serif' }}>
                    {term.name}
                  </h3>
                  {term.greekName && (
                    <p className={`text-sm transition-colors duration-300 ${
                      darkMode ? 'text-cyan-300' : 'text-cyan-600'
                    }`}>
                      {term.greekName}
                    </p>
                  )}
                </div>

              {/* Blurb */}
              <p className={`text-sm mb-3 transition-colors duration-300 ${
                darkMode ? 'text-amber-200/80' : 'text-stone-700'
              }`} style={{ fontFamily: 'Georgia, serif' }}>
                {term.blurb}
              </p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {term.category && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    darkMode
                      ? 'bg-stone-700 text-cyan-300'
                      : 'bg-stone-200 text-stone-700'
                  }`}>
                    {term.category}
                  </span>
                )}
                {term.hasFullPage && (
                  <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 border ${
                    darkMode
                      ? 'bg-[#020617] border-gray-700 text-stone-50'
                      : 'bg-white/90 border-amber-400 text-slate-900'
                  }`}>
                    <BookOpen className="w-3 h-3" />
                    Full Page
                  </span>
                )}
              </div>
            </motion.button>
            );
          })}
        </motion.div>

        {/* No Results */}
        {filteredTerms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className={`text-xl ${darkMode ? 'text-amber-300/60' : 'text-stone-600'}`}>
              No terms found matching your search or filters
            </p>
          </motion.div>
        )}

        <div className="py-12 text-center">
          <RulesLine darkMode={darkMode} />
        </div>
      </div>

      {/* Detail Card - Using shared DetailCard component (unified with Pillars behavior) */}
      <AnimatePresence>
        {selectedTerm && cardOrigin && (() => {
          // Get markdown content if available, otherwise use fullDescription
          const markdownContent = getGlossaryContent(selectedTerm.id);
          const contentBody = markdownContent?.body || selectedTerm.fullDescription || selectedTerm.blurb;
          
          return (
            <DetailCard
              key={selectedTerm.id}
              element={{
                id: selectedTerm.id,
                name: selectedTerm.name,
                greekName: selectedTerm.greekName,
                type: selectedTerm.category as 'pillar' | 'virtue' | 'equality' | 'process' | 'institution' | 'concept' | undefined,
                complexity: selectedTerm.complexity
              }}
              glossaryTerm={{ blurb: selectedTerm.blurb }}
              contentBody={contentBody}
              darkMode={darkMode}
              completed={completedTerms.has(selectedTerm.id)}
              cardOrigin={cardOrigin}
              onClose={() => {
                setSelectedTerm(null);
                setCardOrigin(null);
              }}
              onComplete={markTermCompleted}
              onNavigateToPillar={onNavigateToPillar ? (pillarId) => {
                // When navigating to a pillar, close glossary card first
                setSelectedTerm(null);
                setCardOrigin(null);
                onNavigateToPillar(pillarId);
              } : undefined}
              hasFullPage={selectedTerm.hasFullPage}
              mode="glossary"
            />
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
