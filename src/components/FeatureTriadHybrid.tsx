import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Users, Clock, Eye, Handshake, RefreshCw, Hammer, MessageCircle, ChevronRight } from 'lucide-react';
import { DetailCard } from './DetailCard';

interface FeatureTriadHybridProps {
  darkMode?: boolean;
  onNavigate?: (page: string) => void;
  onNavigateToPillar?: (_pillarId: string) => void;
}

const features = [
  { id: 'no-politicians', title: "NO POLITICIANS", icon: <Users className="w-5 h-5" />, content: "We don't hire rulers; we hire public servants. In AreTéCracy, all officials are functionaries, not commanders. There are no career politicians, no dynasties, and no permanent ruling class." },
  { id: 'no-billionaires', title: "BILLIONAIRES CAN'T BUY VOTES", icon: <Scale className="w-5 h-5" />, content: "In the current system, money buys access, and access buys laws. We end this with Isotímia (Equal Honor). Lobbying is impossible because there are no politicians to lobby." },
  { id: 'future-has-vote', title: "THE FUTURE GETS A VOTE", icon: <Clock className="w-5 h-5" />, content: "Every generation is tempted to live large and hand the bill to people who can't vote yet. We stop this practice of \"taxation without representation\" against our own descendants." },
  { id: 'watch-watchers', title: "WHO WATCHES THE WATCHMEN? YOU", icon: <Eye className="w-5 h-5" />, content: "Transparency usually means the government watching you. We flip the cameras. GlaukÓS Mati (The Bright-Eyed Guardian) is a system of \"Reverse Surveillance\" where transparency flows upward." },
  { id: 'no-51-tyranny', title: "51% IS NEVER ENOUGH", icon: <Handshake className="w-5 h-5" />, content: "Modern democracy is often a civil war fought with ballots, where 51% of the people try to crush the other 49%. This creates division, hate, and policy whiplash." },
  { id: 'self-destruct', title: "THE SELF-DESTRUCT BUTTON", icon: <RefreshCw className="w-5 h-5" />, content: "In most systems, removing a failed government requires a revolution or a civil war. We built a safety valve instead.\n\nAxioktonia (The Worthy Death) is the ultimate guarantee of freedom." },
  { id: 'workshop-economy', title: "AN ECONOMY THAT WORKS", icon: <Hammer className="w-5 h-5" />, content: "You cannot have a free vote if you are a serf in the marketplace. Today, a handful of \"Too Big to Fail\" monopolies control the survival stack. That isn't capitalism; it's corporate feudalism." },
  { id: 'civility-default', title: "WE'LL BURN DOWN THE THEATER", icon: <MessageCircle className="w-5 h-5" />, content: "Modern politics is theater: scripted performances, fake outrage, and shouting matches designed to entertain, not govern. We end the spectacle.\n\n**IsoKratÓS** is our AI moderator that replaces the stage with a workshop." },
];

type Feature = typeof features[0];

const FeatureTriadHybrid = ({ darkMode = true, onNavigate }: FeatureTriadHybridProps) => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [cardOrigin, setCardOrigin] = useState<{ x: number; y: number } | null>(null);

  const handleCardClick = (e: React.MouseEvent, feature: Feature) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setCardOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setSelectedFeature(feature);
  };

  return (
    <section id="eight-ways" className={`py-16 md:py-24 ${darkMode ? 'bg-gray-900' : 'bg-stone-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-12">
          <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
            Eight ways AreTéCracy is different from anything you've seen before
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-stone-700'}`}>
            Click a principle to learn more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {features.map((feature) => (
            <button
              key={feature.id}
              type="button"
              onClick={(e) => handleCardClick(e, feature)}
              className={`relative cursor-pointer group transition-all duration-300 ease-in-out border rounded-lg p-4 md:p-5 flex items-center justify-between min-h-[80px] text-left ${
                darkMode
                  ? 'border-gray-800 bg-gray-900/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:border-cyan-500/50'
                  : 'border-stone-300 bg-white/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:border-amber-500/50'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`p-2 rounded-full flex-shrink-0 ${
                  darkMode
                    ? 'bg-gray-950 border border-gray-800 group-hover:border-cyan-500/50 text-cyan-400'
                    : 'bg-stone-100 border border-stone-300 text-amber-600'
                }`}>
                  {feature.icon}
                </div>
                <h3 className={`font-serif text-xl md:text-2xl leading-tight flex-1 ${
                  darkMode ? 'text-gray-200 group-hover:text-white' : 'text-stone-800 group-hover:text-stone-900'
                }`}>
                  {feature.title}
                </h3>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 items-stretch">
          <button
            onClick={() => onNavigate?.('pillars')}
            className="min-h-[52px] w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B4941F] text-black font-bold rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all inline-flex items-center justify-center gap-2"
          >
            SEE THE BLUEPRINT <ChevronRight size={20} />
          </button>
          <a
            href="https://www.patreon.com/aretecracy"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[52px] w-full sm:w-auto px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-sm hover:bg-[#D4AF37]/10 transition-all inline-flex items-center justify-center gap-2"
          >
            SUPPORT THE MISSION
          </a>
        </div>
      </div>

      <AnimatePresence>
        {selectedFeature && cardOrigin && (
          <DetailCard
            element={{ id: selectedFeature.id, name: selectedFeature.title }}
            glossaryTerm={{ blurb: '' }}
            contentBody={selectedFeature.content}
            darkMode={darkMode ?? true}
            cardOrigin={cardOrigin}
            onClose={() => { setSelectedFeature(null); setCardOrigin(null); }}
            mode="triad"
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeatureTriadHybrid;
