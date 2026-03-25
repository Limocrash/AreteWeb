import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { DetailCard } from './DetailCard';

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

const triadItems: TriadItem[] = [
  { id: 'no-politicians', headline: 'NO POLITICIANS. NOT ONE.', reveal: 'We don\'t hire rulers; we hire public servants. In AreTéCracy, all officials are functionaries, not commanders. There are no career politicians, no dynasties, and no permanent ruling class.\n\nFor high-level offices, citizens are selected from a refined list of highly qualified individuals based on proven merit, skills, and knowledge. This list must be approved by at least 70% of the Ekklesia, and the final magistrate is chosen by Sortition (random lot). This ensures competence while preventing any single political bias from capturing the system. This is Plato\'s Roll Call: the duty to participate or be ruled by your inferiors.' },
  { id: 'no-billionaires', headline: 'BILLIONAIRES CAN\'T BUY VOTES. OR LAWS.', reveal: 'In the current system, money buys access, and access buys laws. We end this with Isotímia (Equal Honor). We don\'t disparage wealth, but we recognize that the Pleonektai (those who seek more than their share) often use it to extract opportunity from the community.\n\nHere, lobbying is impossible because there are no politicians to lobby. Campaign donations are impossible because there are no campaigns. Your voice is weighted by your citizenship, not your net worth. A teacher\'s vote on education policy counts exactly as much as a hedge fund manager\'s—actually, if the teacher has more proven merit in that field, it might count more.' },
  { id: 'future-has-vote', headline: 'THE FUTURE GETS TO VOTE, TOO.', reveal: 'Every generation is tempted to live large and hand the bill to people who can\'t vote yet. We stop this practice of "taxation without representation" against our own descendants.\n\nEvery proposed law is stress-tested for its long-term impact. If a policy creates short-term gain at a future cost, the Generational Fairness Fund and Horizon Clauses intervene. They require that the ROI for future generations exceeds the tax burden—meaning we must invest enough today to ensure our children inherit assets, not just debts. We are the first system to give the unborn a seat at the table.' },
  { id: 'workshop-economy', headline: 'AN ECONOMY THAT REMEMBERS EVERYONE.', reveal: 'You cannot have a free vote if you are a serf in the marketplace. Today, a handful of "Too Big to Fail" monopolies control the survival stack—from food to payments. That isn\'t capitalism; it\'s corporate feudalism.\n\nHephaistia breaks the "Infinity Gauntlet." We stop subsidizing giants and start funding the little guy. By partnering with AI and advanced tooling, we empower a new class of artisan-citizens to build, repair, and trade locally. We replace fragile supply chains with resilient, distributed workshops. It is the return of real capitalism: many hands, fair competition, and no overlords.' },
  { id: 'watch-watchers', headline: 'WHO WATCHES THE WATCHMEN? YOU DO.', reveal: 'Transparency usually means the government watching you. We flip the cameras. GlaukÓS Mati (The Bright-Eyed Guardian) is a system of "Reverse Surveillance" where transparency flows upward.\n\nLike the owl of Athens, it is a watcher in the night. Every action, transaction, and decision made by a public servant is recorded on an immutable public ledger. There are no backroom deals because there are no backrooms. If you serve the public, you live in a glass house.' },
  { id: 'no-51-tyranny', headline: 'THE FIVE-ONE IS A COP-OUT.', reveal: 'Modern democracy is often a civil war fought with ballots, where 51% of the people try to crush the other 49%. This creates division, hate, and policy whiplash.\n\nWe believe that any law which half the population hates is, by definition, a bad law. We require Homonoia (Like-mindedness). Major legislation requires broad consensus (often supermajorities of 60-70%) to pass. If a proposal can\'t earn broad agreement, it goes back to the workshop. We don\'t move forward until we move forward together.' },
  { id: 'civility-default', headline: 'THE THEATER GETS ITS FINAL CURTAIN CALL.', reveal: 'Modern politics is theater: scripted performances, fake outrage, and shouting matches designed to entertain, not govern. We end the spectacle.\n\n**IsoKratÓS** is our AI moderator that replaces the stage with a workshop. It coaches citizens to turn rants into proposals. It enforces the "Steel Man Rule": you cannot criticize an argument until you restate it to your opponent\'s satisfaction. No more straw men, no more performative anger.\n\nWe don\'t just hope for better discourse; we engineered it. The theater burns so real governance can rise from the ashes.' },
  { id: 'self-destruct', headline: 'IF ALL ELSE FAILS, SELF DESTRUCT.', reveal: 'In most systems, removing a failed government requires a revolution or a civil war. We built a safety valve instead.\n\nAxioktonia (The Worthy Death) is the ultimate guarantee of freedom. If a hypermajority of citizens agree the system has fundamentally failed, they can trigger a peaceful, orderly "uninstall and reinstall" of the government. It wipes the slate clean, removes all current leaders, and patches the Constitution.\n\nIdeally, this button is never pressed. It acts as a nuclear deterrent against tyranny—because a government that knows it can be uninstalled at any moment is a government that listens.' }
];

export function FeatureTriadOverlay({ darkMode = true, onNavigate }: FeatureTriadOverlayProps) {
  const [selectedItem, setSelectedItem] = useState<TriadItem | null>(null);
  const [cardOrigin, setCardOrigin] = useState<{ x: number; y: number } | null>(null);

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
            {triadItems.map((item) => (
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
              onClick={() => onNavigate?.('pillars')}
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
