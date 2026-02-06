import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Scale, Users, Clock, Eye, Handshake, ShieldAlert, RefreshCw, Hammer, MessageCircle, ChevronRight } from 'lucide-react';

interface FeatureTriadGeniProps {
  darkMode?: boolean;
  onNavigate?: (page: string) => void;
  onNavigateToPillar?: (pillarId: string) => void;
}

const FeatureTriadGeni = ({ darkMode = true, onNavigate, onNavigateToPillar }: FeatureTriadGeniProps) => {
  // Single-open accordion state
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const features = [
    {
      title: "NO POLITICIANS",
      icon: <Users className="w-5 h-5" />,
      content: "We don't hire rulers; we hire public servants. In AreTéCracy, all officials are functionaries, not commanders. There are no career politicians, no dynasties, and no permanent ruling class.\n\nFor high-level offices, citizens are selected from a refined list of highly qualified individuals based on proven merit, skills, and knowledge. This list must be approved by at least 70% of the Ekklesia, and the final magistrate is chosen by Sortition (random lot). This ensures competence while preventing any single political bias from capturing the system. This is Plato's Roll Call: the duty to participate or be ruled by your inferiors.",
    },
    {
      title: "BILLIONAIRES CAN'T BUY VOTES",
      icon: <Scale className="w-5 h-5" />,
      content: "In the current system, money buys access, and access buys laws. We end this with Isotímia (Equal Honor). We don't disparage wealth, but we recognize that the Pleonektai (those who seek more than their share) often use it to extract opportunity from the community.\n\nHere, lobbying is impossible because there are no politicians to lobby. Campaign donations are impossible because there are no campaigns. Your voice is weighted by your citizenship, not your net worth. A teacher's vote on education policy counts exactly as much as a hedge fund manager's—actually, if the teacher has more proven merit in that field, it might count more.",
    },
    {
      title: "THE FUTURE GETS A VOTE",
      icon: <Clock className="w-5 h-5" />,
      content: "Every generation is tempted to live large and hand the bill to people who can't vote yet. We stop this practice of \"taxation without representation\" against our own descendants.\n\nEvery proposed law is stress-tested for its long-term impact. If a policy creates short-term gain at a future cost, the Generational Fairness Fund and Horizon Clauses intervene. They require that the ROI for future generations exceeds the tax burden—meaning we must invest enough today to ensure our children inherit assets, not just debts. We are the first system to give the unborn a seat at the table.",
    },
    {
      title: "WHO WATCHES THE WATCHMEN? YOU",
      icon: <Eye className="w-5 h-5" />,
      content: "Transparency usually means the government watching you. We flip the cameras. GlaukÓS Mati (The Bright-Eyed Guardian) is a system of \"Reverse Surveillance\" where transparency flows upward.\n\nLike the owl of Athens, it is a watcher in the night. Every action, transaction, and decision made by a public servant is recorded on an immutable public ledger. There are no backroom deals because there are no backrooms. If you serve the public, you live in a glass house.",
    },
    {
      title: "51% IS NEVER ENOUGH",
      icon: <Handshake className="w-5 h-5" />,
      content: "Modern democracy is often a civil war fought with ballots, where 51% of the people try to crush the other 49%. This creates division, hate, and policy whiplash.\n\nWe believe that any law which half the population hates is, by definition, a bad law. We require Homonoia (Like-mindedness). Major legislation requires broad consensus (often supermajorities of 60-70%) to pass. If a proposal can't earn broad agreement, it goes back to the workshop. We don't move forward until we move forward together.",
    },
    {
      title: "THE SELF-DESTRUCT BUTTON",
      icon: <RefreshCw className="w-5 h-5" />,
      content: "In most systems, removing a failed government requires a revolution or a civil war. We built a safety valve instead.\n\nAxioktonia (The Worthy Death) is the ultimate guarantee of freedom. If a hypermajority of citizens agree the system has fundamentally failed, they can trigger a peaceful, orderly \"uninstall and reinstall\" of the government. It wipes the slate clean, removes all current leaders, and patches the Constitution.\n\nIdeally, this button is never pressed. It acts as a nuclear deterrent against tyranny—because a government that knows it can be uninstalled at any moment is a government that listens.",
    },
    {
      title: "AN ECONOMY THAT WORKS",
      icon: <Hammer className="w-5 h-5" />,
      content: "You cannot have a free vote if you are a serf in the marketplace. Today, a handful of \"Too Big to Fail\" monopolies control the survival stack—from food to payments. That isn't capitalism; it's corporate feudalism.\n\nHephaistia breaks the \"Infinity Gauntlet.\" We stop subsidizing giants and start funding the little guy. By partnering with AI and advanced tooling, we empower a new class of artisan-citizens to build, repair, and trade locally. We replace fragile supply chains with resilient, distributed workshops. It is the return of real capitalism: many hands, fair competition, and no overlords.",
    },
    {
      title: "WE'LL BURN DOWN THE THEATER",
      icon: <MessageCircle className="w-5 h-5" />,
      content: "Modern politics is theater: scripted performances, fake outrage, and shouting matches designed to entertain, not govern. We end the spectacle.\n\n**IsoKratÓS** is our AI moderator that replaces the stage with a workshop. It coaches citizens to turn rants into proposals. It enforces the \"Steel Man Rule\": you cannot criticize an argument until you restate it to your opponent's satisfaction. No more straw men, no more performative anger.\n\nWe don't just hope for better discourse; we engineered it. The theater burns so real governance can rise from the ashes.",
    }
  ];

  return (
    <section className={`w-full max-w-4xl mx-auto px-4 py-8 md:py-12 ${
      darkMode ? 'bg-gray-900' : 'bg-stone-50'
    }`}>
      {/* Micro-trust header */}
      <div className="text-center mb-6">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-stone-900'
        }`} style={{ 
          fontFamily: '"Trebuchet MS", "Trebuchet", sans-serif',
          fontWeight: 700
        }}>
          Eight ways AreTéCracy is different from anything you've seen before
        </h2>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
          darkMode ? 'text-gray-300' : 'text-stone-700'
        }`}>
          Tap or hover to explore each principle.
        </p>
      </div>

      {/* Grid: 4 columns on desktop, 1 column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div 
            key={index}
            onClick={() => toggleIndex(index)}
            className={`
              relative cursor-pointer group transition-all duration-300 ease-in-out
              border rounded-lg overflow-hidden
              ${darkMode 
                ? `border-gray-800 bg-gray-900/50 backdrop-blur-sm ${
                    openIndex === index 
                      ? 'ring-1 ring-yellow-500/50 bg-gray-800/80' 
                      : 'hover:bg-gray-800/50'
                  }`
                : `border-stone-300 bg-white/50 ${
                    openIndex === index 
                      ? 'ring-1 ring-amber-500/50 bg-stone-50' 
                      : 'hover:bg-stone-50'
                  }`
              }
            `}
          >
            {/* Header / Trigger */}
            <div className="p-4 flex items-center justify-between h-full min-h-[80px]">
              <div className="flex items-center gap-3">
                <div className={`
                  p-2 rounded-full transition-colors
                  ${darkMode
                    ? `bg-gray-950 border ${
                        openIndex === index 
                          ? 'border-yellow-500/30' 
                          : 'border-gray-800 group-hover:border-gray-600'
                      }`
                    : `bg-stone-100 border ${
                        openIndex === index 
                          ? 'border-amber-500/30' 
                          : 'border-stone-300 group-hover:border-stone-400'
                      }`
                  }
                `}>
                  <div className={darkMode ? 'text-yellow-400' : 'text-amber-600'}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className={`
                  font-serif text-lg leading-tight transition-colors
                  ${darkMode
                    ? openIndex === index 
                      ? 'text-yellow-400' 
                      : 'text-gray-200 group-hover:text-white'
                    : openIndex === index 
                      ? 'text-amber-600' 
                      : 'text-stone-800 group-hover:text-stone-900'
                  }
                `}>
                  {feature.title}
                </h3>
              </div>
              
              {/* Mobile Accordion Indicator */}
              <div className={`md:hidden ${
                darkMode ? 'text-gray-500' : 'text-stone-500'
              }`}>
                {openIndex === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>

            {/* Expandable Content */}
            <div className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
            `}>
              <div className={`p-4 pt-0 text-sm leading-relaxed border-t mt-2 ${
                darkMode
                  ? 'text-gray-300 border-gray-800/50'
                  : 'text-stone-700 border-stone-300/50'
              }`} style={{ fontFamily: 'Georgia, serif' }}>
                {feature.content}
              </div>
            </div>

            {/* Desktop Hover Hint */}
            <div className="hidden md:block absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className={`text-[10px] uppercase tracking-wider ${
                darkMode ? 'text-gray-500' : 'text-stone-500'
              }`}>
                {openIndex === index ? 'Close' : 'Expand'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Micro-trust footer */}
      <div className="text-center mt-4">
        <p className={`text-[10px] ${
          darkMode ? 'text-gray-500' : 'text-stone-500'
        }`}>
          Tap or hover to explore the core principles.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 items-center mt-8">
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
          className="w-full sm:w-auto px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-sm hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center gap-2"
        >
          SUPPORT THE MISSION
        </a>
      </div>
    </section>
  );
};

export default FeatureTriadGeni;
