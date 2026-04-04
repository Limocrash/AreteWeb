import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { DetailCard } from './DetailCard';
import { parseContentFile } from '../utils/contentLoader';

interface FeatureTriadOverlayProps {
  darkMode?: boolean;
  onNavigate?: (page: string) => void;
  onNavigateToPillar?: (_pillarId: string) => void;
}

interface TriadItem {
  id: string;
  headline: string;
  reveal: string;
}

// Load feature octet content from markdown files
const octetModules = import.meta.glob<string>('../content/home/feature-octet/*.md', {
  eager: false,
  query: '?raw',
  import: 'default'
});

async function loadOctetItems(): Promise<TriadItem[]> {
  const items: TriadItem[] = [];
  for (const path of Object.keys(octetModules).sort()) {
    try {
      const raw = await octetModules[path]();
      const content = parseContentFile(typeof raw === 'string' ? raw : (raw as { default: string }).default);
      items.push({
        id: content.metadata.id,
        headline: content.metadata.headline ?? '',
        reveal: content.body.trim(),
      });
    } catch { /* skip malformed files */ }
  }
  return items.sort((a, b) => {
    const aPath = Object.keys(octetModules).find(p => p.includes(a.id)) ?? '';
    const bPath = Object.keys(octetModules).find(p => p.includes(b.id)) ?? '';
    return aPath.localeCompare(bPath);
  });
}

export function FeatureTriadOverlay({ darkMode = true, onNavigate }: FeatureTriadOverlayProps) {
  const [selectedItem, setSelectedItem] = useState<TriadItem | null>(null);
  const [cardOrigin, setCardOrigin] = useState<{ x: number; y: number } | null>(null);
  const [items, setItems] = useState<TriadItem[]>([]);

  useEffect(() => {
    loadOctetItems().then(setItems);
  }, []);

  const handleTileClick = (item: TriadItem, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setCardOrigin(null);
  };

  return (
    <>
      <section id="eight-ways" className="scroll-mt-20 md:scroll-mt-24 pt-8 md:pt-12 pb-16 md:pb-24 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-stone-900'}`} style={{ fontFamily: '"Trebuchet MS", "Trebuchet", sans-serif', fontWeight: 700, letterSpacing: '-0.01em' }}>
              You've never seen anything like this. Ever.
            </h2>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-stone-700'}`}>
              Here are just eight of the fifty-plus reasons why:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {items.map((item) => (
              <motion.button
                key={item.id}
                onClick={(e) => handleTileClick(item, e)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`text-left p-4 md:p-6 lg:p-8 rounded-lg border-2 transition-all duration-300 relative overflow-hidden flex items-center min-w-0 ${
                  darkMode
                    ? 'bg-[#020617] border-gray-700 hover:border-cyan-500 hover:bg-[#020617]'
                    : 'bg-white/90 border-amber-400 hover:border-cyan-600 hover:bg-white'
                } hover:shadow-lg group`}
                style={{ minHeight: '90px' }}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  darkMode ? 'bg-gradient-to-r from-cyan-500/20 via-cyan-400/30 to-cyan-500/20' : 'bg-gradient-to-r from-cyan-400/15 via-cyan-500/25 to-cyan-400/15'
                } blur-xl -z-10`} />
                <div className={`absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg ${
                  darkMode ? 'bg-gradient-to-r from-cyan-500/60 via-cyan-400/80 to-cyan-500/60' : 'bg-gradient-to-r from-cyan-400/50 via-cyan-500/70 to-cyan-400/50'
                } blur-md -z-10`} />
                <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold transition-all duration-300 min-w-0 break-words ${
                  darkMode ? 'text-stone-50 group-hover:text-stone-100' : 'text-slate-900 group-hover:text-slate-800'
                }`} style={{ fontFamily: '"Trebuchet MS", "Trebuchet", sans-serif', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  {item.headline}
                </h3>
              </motion.button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <button
              onClick={() => onNavigate?.('blueprint')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B4941F] text-black font-bold rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-2"
            >
              SEE THE BLUEPRINT <ChevronRight size={20} />
            </button>
            <a
              href="https://www.patreon.com/aretecracy"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto px-8 py-4 border-2 font-bold rounded-sm transition-all flex items-center justify-center gap-2 ${
                darkMode ? 'border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10' : 'border-[#8B6914] text-[#8B6914] hover:bg-[#D4AF37]/20'
              }`}
            >
              JOIN US
            </a>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedItem && cardOrigin && (
          <DetailCard
            element={{ id: selectedItem.id, name: selectedItem.headline, type: 'concept' }}
            contentBody={selectedItem.reveal}
            darkMode={darkMode}
            cardOrigin={cardOrigin}
            onClose={handleClose}
            mode="triad"
          />
        )}
      </AnimatePresence>
    </>
  );
}
