import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface AccordionTriadProps {
  darkMode?: boolean;
  onNavigate?: (page: string) => void;
  onNavigateToPillar?: (pillarId: string) => void;
}

interface TriadItem {
  id: string;
  headline: string;
  reveal: string;
}

const triadItems: TriadItem[] = [
  {
    id: 'no-politicians',
    headline: 'NO POLITICIANS',
    reveal: 'We don\'t hire rulers; we hire public servants. In AreTéCracy, all officials are functionaries, not commanders. There are no career politicians, no dynasties, and no permanent ruling class.\n\nFor high-level offices, citizens are selected from a refined list of highly qualified individuals based on proven merit, skills, and knowledge. This list must be approved by at least 70% of the Ekklesia, and the final magistrate is chosen by Sortition (random lot). This ensures competence while preventing any single political bias from capturing the system. This is Plato\'s Roll Call: the duty to participate or be ruled by your inferiors.'
  },
  {
    id: 'no-billionaires',
    headline: 'BILLIONAIRES CAN\'T BUY VOTES',
    reveal: 'In the current system, money buys access, and access buys laws. We end this with Isotímia (Equal Honor). We don\'t disparage wealth, but we recognize that the Pleonektai (those who seek more than their share) often use it to extract opportunity from the community.\n\nHere, lobbying is impossible because there are no politicians to lobby. Campaign donations are impossible because there are no campaigns. Your voice is weighted by your citizenship, not your net worth. A teacher\'s vote on education policy counts exactly as much as a hedge fund manager\'s—actually, if the teacher has more proven merit in that field, it might count more.'
  },
  {
    id: 'future-has-vote',
    headline: 'THE FUTURE GETS A VOTE',
    reveal: 'Every generation is tempted to live large and hand the bill to people who can\'t vote yet. We stop this practice of "taxation without representation" against our own descendants.\n\nEvery proposed law is stress-tested for its long-term impact. If a policy creates short-term gain at a future cost, the Generational Fairness Fund and Horizon Clauses intervene. They require that the ROI for future generations exceeds the tax burden—meaning we must invest enough today to ensure our children inherit assets, not just debts. We are the first system to give the unborn a seat at the table.'
  },
  {
    id: 'watch-watchers',
    headline: 'WHO WATCHES THE WATCHMEN? YOU',
    reveal: 'Transparency usually means the government watching you. We flip the cameras. GlaukÓS Mati (The Bright-Eyed Guardian) is a system of "Reverse Surveillance" where transparency flows upward.\n\nLike the owl of Athens, it is a watcher in the night. Every action, transaction, and decision made by a public servant is recorded on an immutable public ledger. There are no backroom deals because there are no backrooms. If you serve the public, you live in a glass house.'
  },
  {
    id: 'no-51-tyranny',
    headline: '51% IS NEVER ENOUGH',
    reveal: 'Modern democracy is often a civil war fought with ballots, where 51% of the people try to crush the other 49%. This creates division, hate, and policy whiplash.\n\nWe believe that any law which half the population hates is, by definition, a bad law. We require Homonoia (Like-mindedness). Major legislation requires broad consensus (often supermajorities of 60-70%) to pass. If a proposal can\'t earn broad agreement, it goes back to the workshop. We don\'t move forward until we move forward together.'
  },
  {
    id: 'self-destruct',
    headline: 'THE SELF-DESTRUCT BUTTON',
    reveal: 'In most systems, removing a failed government requires a revolution or a civil war. We built a safety valve instead.\n\nAxioktonia (The Worthy Death) is the ultimate guarantee of freedom. If a hypermajority of citizens agree the system has fundamentally failed, they can trigger a peaceful, orderly "uninstall and reinstall" of the government. It wipes the slate clean, removes all current leaders, and patches the Constitution.\n\nIdeally, this button is never pressed. It acts as a nuclear deterrent against tyranny—because a government that knows it can be uninstalled at any moment is a government that listens.'
  },
  {
    id: 'workshop-economy',
    headline: 'AN ECONOMY THAT WORKS',
    reveal: 'You cannot have a free vote if you are a serf in the marketplace. Today, a handful of "Too Big to Fail" monopolies control the survival stack—from food to payments. That isn\'t capitalism; it\'s corporate feudalism.\n\nHephaistia breaks the "Infinity Gauntlet." We stop subsidizing giants and start funding the little guy. By partnering with AI and advanced tooling, we empower a new class of artisan-citizens to build, repair, and trade locally. We replace fragile supply chains with resilient, distributed workshops. It is the return of real capitalism: many hands, fair competition, and no overlords.'
  },
  {
    id: 'civility-default',
    headline: "WE'LL BURN DOWN THE THEATER",
    reveal: 'Modern politics is theater: scripted performances, fake outrage, and shouting matches designed to entertain, not govern. We end the spectacle.\n\n**IsoKratÓS** is our AI moderator that replaces the stage with a workshop. It coaches citizens to turn rants into proposals. It enforces the "Steel Man Rule": you cannot criticize an argument until you restate it to your opponent\'s satisfaction. No more straw men, no more performative anger.\n\nWe don\'t just hope for better discourse; we engineered it. The theater burns so real governance can rise from the ashes.'
  }
];

export function AccordionTriad({ darkMode = true, onNavigate, onNavigateToPillar }: AccordionTriadProps) {
  // First item open by default on desktop, all closed on mobile initially
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['no-politicians']));
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // On mobile, start with all closed
      if (window.innerWidth < 768) {
        setOpenItems(new Set());
      } else {
        // On desktop, first one open
        setOpenItems(new Set(['no-politicians']));
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section className={`py-16 md:py-24 ${darkMode ? 'bg-gray-900' : 'bg-stone-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-stone-900'
          }`}>
            Eight ways AreTéCracy is different from anything you've seen before
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-stone-700'
          }`}>
            Tap or hover to explore each principle.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4 mb-12">
          {triadItems.map((item, index) => {
            const isOpen = openItems.has(item.id);
            return (
              <motion.div
                key={item.id}
                initial={false}
                className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                  darkMode
                    ? isOpen
                      ? 'bg-gray-800/80 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                      : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    : isOpen
                      ? 'bg-white border-cyan-600/50 shadow-lg shadow-cyan-600/10'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                {/* Headline Button */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between text-left transition-colors ${
                    darkMode
                      ? isOpen
                        ? 'bg-gray-800/90'
                        : 'bg-gray-800/50 hover:bg-gray-800/70'
                      : isOpen
                        ? 'bg-white'
                        : 'bg-stone-50 hover:bg-stone-100'
                  }`}
                  aria-expanded={isOpen}
                  aria-controls={`triad-content-${item.id}`}
                >
                  <h3 className={`text-xl md:text-2xl font-serif font-bold flex-1 ${
                    darkMode ? 'text-amber-200' : 'text-stone-900'
                  }`}>
                    {item.headline}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`ml-4 flex-shrink-0 ${
                      darkMode ? 'text-cyan-400' : 'text-cyan-600'
                    }`}
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </button>

                {/* Reveal Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`triad-content-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className={`px-6 py-5 md:px-8 md:py-6 border-t ${
                        darkMode
                          ? 'border-gray-700 bg-gray-800/40'
                          : 'border-stone-200 bg-stone-50/50'
                      }`}>
                        <p className={`text-lg md:text-xl leading-relaxed ${
                          darkMode ? 'text-gray-200' : 'text-stone-700'
                        }`} style={{ fontFamily: 'Georgia, serif' }}>
                          {item.reveal}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
          <button
            onClick={() => onNavigate?.('pillars')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B4941F] text-black font-bold rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-2"
          >
            SEE THE BLUEPRINT <ChevronRight size={20} />
          </button>
          <a
            href="https://www.patreon.com/aretecracy" // TODO: Update with actual Patreon URL
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-sm hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center gap-2"
          >
            SUPPORT THE MISSION
          </a>
        </div>
      </div>
    </section>
  );
}
