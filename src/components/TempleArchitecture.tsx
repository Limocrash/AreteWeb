import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { isSectionConstructed, markSectionConstructed } from '../utils/templeProgress';
import { getTermByIdAsync } from '../data/glossaryLookup';
import type { GlossaryTerm } from '../data/glossary';
import { getGlossaryContent, preloadGlossaryContent } from '../data/content';
import { DetailCard } from './DetailCard';
import { getResponsiveSrcset } from '../utils/imageSrcset';
import { PILLAR_LEVELS } from '../data/pillarLevels';

const BASE = (typeof import.meta !== 'undefined' && (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL) || '/';
const architectureDiagram = `${BASE}images/architecture-diagram.png`;
const euthynteriaImage = `${BASE}images/temple-euthynteria.png`;
const completionSeal = `${BASE}images/completion-seal.png`;

interface TempleArchitectureProps {
  darkMode: boolean;
  onNavigateToPillar?: (pillarId: string) => void;
  currentFloor?: number;
  /** When true, Roof/Pediment show "coming soon"; when false, show "complete pillars first" */
  allPillarsComplete?: boolean;
}

// Data for the Four Isótēs (Equalities) - the black plaques
// Calculated from pixel-perfect coordinates: imageWidth=896, imageHeight=1200
const isotesData = [
  {
    id: 'isonomia',
    name: 'Isonomia',
    subtitle: 'Equal Standing Under Law',
    description: 'The principle that all citizens stand equal before the law, regardless of wealth, status, or background. No one is above the law; no one is beneath its protection.',
    position: { 
      left: `${(122/896)*100}%`, // 13.616%
      top: `${(1021/1200)*100}%`, // 85.083%
      width: `${(154/896)*100}%`, // 17.188%
      height: `${(113/1200)*100}%` // 9.417%
    }
  },
  {
    id: 'isegoria',
    name: 'Isegoria',
    subtitle: 'Equal Right to be Heard',
    description: 'Every citizen has the equal right to speak in the assembly, to voice concerns, and to participate in public discourse. Democracy requires that all voices have the opportunity to be heard.',
    position: { 
      left: `${(294/896)*100}%`, // 32.813%
      top: `${(1021/1200)*100}%`, // 85.083%
      width: `${(154/896)*100}%`, // 17.188%
      height: `${(113/1200)*100}%` // 9.417%
    }
  },
  {
    id: 'isopoliteia',
    name: 'Isopoliteia',
    subtitle: 'Equal Standing in Conduct of Polis',
    description: 'The right to participate fully in the governance of the city-state. Citizens have equal standing in deliberation, voting, and shaping the future of their community.',
    position: { 
      left: `${(462/896)*100}%`, // 51.563%
      top: `${(1021/1200)*100}%`, // 85.083%
      width: `${(154/896)*100}%`, // 17.188%
      height: `${(113/1200)*100}%` // 9.417%
    }
  },
  {
    id: 'isoeudaimonia',
    name: 'IsoEudaimonia',
    subtitle: 'Equal Right to Flourish',
    description: 'Beyond mere survival, every citizen deserves the opportunity to flourish—to pursue happiness, develop their potential, and live a life of meaning and dignity.',
    position: { 
      left: `${(631/896)*100}%`, // 70.424%
      top: `${(1021/1200)*100}%`, // 85.083%
      width: `${(154/896)*100}%`, // 17.188%
      height: `${(113/1200)*100}%` // 9.417%
    }
  }
];

// Data for the Euthynteria image - Four Isótēs and Four Aretai
// Image size: 2816 x 1536 pixels
const euthynteriaIsotesData = [
  {
    id: 'isonomia',
    name: 'Isonomia',
    position: {
      left: `${(473/2816)*100}%`, // 16.8%
      top: `${(270/1536)*100}%`, // 17.6%
      width: `${(437/2816)*100}%`, // 15.5%
      height: `${(270/1536)*100}%` // 17.6%
    }
  },
  {
    id: 'isegoria',
    name: 'Isegoria',
    position: {
      left: `${(957/2816)*100}%`, // 34.0%
      top: `${(270/1536)*100}%`, // 17.6%
      width: `${(437/2816)*100}%`, // 15.5%
      height: `${(270/1536)*100}%` // 17.6%
    }
  },
  {
    id: 'isopoliteia',
    name: 'Isopoliteia',
    position: {
      left: `${(1432/2816)*100}%`, // 50.9%
      top: `${(270/1536)*100}%`, // 17.6%
      width: `${(437/2816)*100}%`, // 15.5%
      height: `${(270/1536)*100}%` // 17.6%
    }
  },
  {
    id: 'isoeudaimonia',
    name: 'IsoEudaimonia',
    position: {
      left: `${(1906/2816)*100}%`, // 67.7%
      top: `${(270/1536)*100}%`, // 17.6%
      width: `${(437/2816)*100}%`, // 15.5%
      height: `${(270/1536)*100}%` // 17.6%
    }
  }
];

// Data for the Four Aretai (Virtues)
const aretaiData = [
  {
    id: 'sonder',
    name: 'Sonder',
    subtitle: 'Recognition of Others\' Inner Lives',
    description: 'The profound realization that every person you pass has a life as vivid and complex as your own. Sonder is the empathetic understanding that every citizen has hopes, dreams, struggles, and stories—recognizing the full humanity in others.',
    position: {
      left: `${(198/2816)*100}%`, // 7.0%
      top: `${(786/1536)*100}%`, // 51.2%
      width: `${(507/2816)*100}%`, // 18.0%
      height: `${(189/1536)*100}%` // 12.3%
    }
  },
  {
    id: 'philotimo',
    name: 'Philotimo',
    subtitle: 'Love of Honor & Civic Pride',
    description: 'A uniquely Greek concept meaning "love of honor" or "friend of honor." Philotimo embodies doing right by your community not for personal gain, but because you love being an honorable member of your society. It\'s civic virtue made personal.',
    position: {
      left: `${(837/2816)*100}%`, // 29.7%
      top: `${(786/1536)*100}%`, // 51.2%
      width: `${(507/2816)*100}%`, // 18.0%
      height: `${(189/1536)*100}%` // 12.3%
    }
  },
  {
    id: 'prc',
    name: 'Plato\'s "Roll Call"',
    subtitle: 'The Duty to Participate',
    description: 'The duty to participate in governance or be ruled by those worse. Based on Plato\'s Republic 347c: "The greatest penalty for refusing to rule is to be ruled by someone worse."',
    position: {
      left: `${(1476/2816)*100}%`, // 52.4%
      top: `${(786/1536)*100}%`, // 51.2%
      width: `${(507/2816)*100}%`, // 18.0%
      height: `${(189/1536)*100}%` // 12.3%
    }
  },
  {
    id: 'aletheia',
    name: 'Alētheia',
    subtitle: 'Truth & Unconcealment',
    description: 'Ancient Greek concept of truth as "unconcealment" or "disclosure"—not just factual accuracy, but the revealing of reality as it truly is. Alētheia demands intellectual honesty, the courage to face uncomfortable truths, and the wisdom to see through deception.',
    position: {
      left: `${(2109/2816)*100}%`, // 74.9%
      top: `${(786/1536)*100}%`, // 51.2%
      width: `${(507/2816)*100}%`, // 18.0%
      height: `${(189/1536)*100}%` // 12.3%
    }
  }
];

// Isotímia - The Foundation
const isotimiaData = {
  id: 'isotimia',
  name: 'Isotímia',
  subtitle: 'Equal Standing & Equal Honor',
  description: 'The foundational principle that all citizens possess equal standing and deserve equal honor in the eyes of the polis. Isotímia is the bedrock upon which all four Isótēs rest, and from which the four Aretai emerge. It represents the fundamental democratic commitment that no citizen is inherently superior to another.',
  position: {
    left: `${(201/2816)*100}%`, // 7.1%
    top: `${(1001/1536)*100}%`, // 65.2%
    width: `${(2415/2816)*100}%`, // 85.8%
    height: `${(322/1536)*100}%` // 21.0%
  }
};

// Data for the 16 Pillars - 8 upper, 8 lower
// Calculated from pixel-perfect coordinates: imageWidth=896, imageHeight=1200
const pillarsData = [
  // Upper Colonnade - Voice & Deliberation
  {
    id: 'paideia',
    name: 'Paideia',
    subtitle: 'Education & Civic Formation',
    description: 'The comprehensive education of citizens in virtue, culture, and civic responsibility. A democracy is only as strong as the wisdom of its people.',
    position: { 
      left: `${(90/896)*100}%`, // 10.045%
      top: `${(429/1200)*100}%`, // 35.75%
      width: `${(70/896)*100}%`, // 7.813%
      height: `${(232/1200)*100}%` // 19.333%
    },
    tier: 'upper',
    restsOn: ['isonomia', 'isegoria']
  },
  {
    id: 'hephaistia',
    name: 'Hephaistia',
    subtitle: 'Craft, Work & Productivity',
    description: 'For IsoEudaimonia to exist, people must have gainful work. This pillar encourages small businesses, cooperatives, and workshop industriousness while discouraging overly large oligopolies.',
    position: { 
      left: `${(185/896)*100}%`, // 20.647%
      top: `${(429/1200)*100}%`, // 35.75%
      width: `${(70/896)*100}%`, // 7.813%
      height: `${(232/1200)*100}%` // 19.333%
    },
    tier: 'upper',
    restsOn: ['isonomia', 'isegoria']
  },
  {
    id: 'asphaleia',
    name: 'Asphaleia',
    subtitle: 'Security & Stability',
    description: 'Citizens must feel secure in their persons, property, and community. Without basic security, no flourishing is possible.',
    position: { 
      left: `${(280/896)*100}%`, // 31.25%
      top: `${(429/1200)*100}%`, // 35.75%
      width: `${(70/896)*100}%`, // 7.813%
      height: `${(232/1200)*100}%` // 19.333%
    },
    tier: 'upper',
    restsOn: ['isegoria', 'isopoliteia']
  },
  {
    id: 'logodosia',
    name: 'Logodosia',
    subtitle: 'Truth & Transparency',
    description: 'Quis custōdiet ipsōs custōdēs? Let the private citizen have privacy; let the public servant be publicly transparent. Truth is the bedrock of trust.',
    position: { 
      left: `${(375/896)*100}%`, // 41.853%
      top: `${(429/1200)*100}%`, // 35.75%
      width: `${(70/896)*100}%`, // 7.813%
      height: `${(232/1200)*100}%` // 19.333%
    },
    tier: 'upper',
    restsOn: ['isonomia', 'isegoria']
  },
  {
    id: 'glaukos-mati',
    name: 'Glaukós Mati',
    subtitle: 'Wise Observation',
    description: 'The owl-eyed vision to see clearly through complexity and deception. A democracy must be vigilant and perceptive.',
    position: { 
      left: `${(470/896)*100}%`, // 52.455%
      top: `${(429/1200)*100}%`, // 35.75%
      width: `${(70/896)*100}%`, // 7.813%
      height: `${(232/1200)*100}%` // 19.333%
    },
    tier: 'upper',
    restsOn: ['isegoria', 'isopoliteia']
  },
  {
    id: 'therapon',
    name: 'Therapons',
    subtitle: 'Service & Stewardship',
    description: 'Those who govern are servants of the people, not masters. Public office is a sacred trust, not a path to personal enrichment.',
    position: { 
      left: `${(565/896)*100}%`, // 63.058%
      top: `${(429/1200)*100}%`, // 35.75%
      width: `${(70/896)*100}%`, // 7.813%
      height: `${(232/1200)*100}%` // 19.333%
    },
    tier: 'upper',
    restsOn: ['isopoliteia', 'isoeudaimonia']
  },
  {
    id: 'axia',
    name: 'Axia',
    subtitle: 'Worth & Dignity',
    description: 'Every citizen possesses inherent worth and deserves to be treated with dignity. This pillar guards against dehumanization and exploitation.',
    position: { 
      left: `${(655/896)*100}%`, // 73.103%
      top: `${(429/1200)*100}%`, // 35.75%
      width: `${(70/896)*100}%`, // 7.813%
      height: `${(232/1200)*100}%` // 19.333%
    },
    tier: 'upper',
    restsOn: ['isopoliteia', 'isoeudaimonia']
  },
  {
    id: 'generational-fairness',
    name: 'Generational Fairness',
    subtitle: 'Intergenerational Justice',
    description: 'We are stewards, not owners, of our society. Our choices today must not rob future generations of their chance to flourish.',
    position: { 
      left: `${(745/896)*100}%`, // 83.147%
      top: `${(429/1200)*100}%`, // 35.75%
      width: `${(70/896)*100}%`, // 7.813%
      height: `${(232/1200)*100}%` // 19.333%
    },
    tier: 'upper',
    restsOn: ['isoeudaimonia']
  },
  // Lower Colonnade - Accountability & Justice
  {
    id: 'ekklesia',
    name: 'Ekklesia',
    subtitle: 'Assembly & Direct Democracy',
    description: 'There are no career politicians in AreTéCracy. The will of the people is determined literally by the people themselves through direct governance accessible to all citizens.',
    position: { 
      left: `${(55/896)*100}%`, // 6.138%
      top: `${(690/1200)*100}%`, // 57.5%
      width: `${(80/896)*100}%`, // 8.929%
      height: `${(254/1200)*100}%` // 21.167%
    },
    tier: 'lower',
    restsOn: ['isegoria', 'isopoliteia']
  },
  {
    id: 'pnyx',
    name: 'Pnyx',
    subtitle: 'The Democratic Forum',
    description: 'The physical and digital spaces where citizens gather to deliberate. Democracy requires real forums for genuine dialogue.',
    position: { 
      left: `${(156/896)*100}%`, // 17.411%
      top: `${(690/1200)*100}%`, // 57.5%
      width: `${(80/896)*100}%`, // 8.929%
      height: `${(254/1200)*100}%` // 21.167%
    },
    tier: 'lower',
    restsOn: ['isonomia', 'isegoria']
  },
  {
    id: 'isokratos',
    name: 'IsoKratOS',
    subtitle: 'Equal Power',
    description: 'Power must be distributed equally among citizens. No individual or faction should accumulate disproportionate influence over the demos.',
    position: { 
      left: `${(262/896)*100}%`, // 29.241%
      top: `${(690/1200)*100}%`, // 57.5%
      width: `${(80/896)*100}%`, // 8.929%
      height: `${(254/1200)*100}%` // 21.167%
    },
    tier: 'lower',
    restsOn: ['isegoria', 'isopoliteia']
  },
  {
    id: 'homonia',
    name: 'Homonia',
    subtitle: 'Concord & Supermajority',
    description: 'Policies should reflect the will of an overwhelming portion of the population, not just 51%. A law that half the population intensely disagrees with is inherently a bad law.',
    position: { 
      left: `${(367/896)*100}%`, // 40.960%
      top: `${(690/1200)*100}%`, // 57.5%
      width: `${(80/896)*100}%`, // 8.929%
      height: `${(254/1200)*100}%` // 21.167%
    },
    tier: 'lower',
    restsOn: ['isonomia', 'isegoria']
  },
  {
    id: 'aegis',
    name: 'Aegis',
    subtitle: 'Protection & Defense',
    description: 'The shield that protects the democracy from external threats and internal corruption. Vigilance is the price of freedom.',
    position: { 
      left: `${(471/896)*100}%`, // 52.567%
      top: `${(690/1200)*100}%`, // 57.5%
      width: `${(80/896)*100}%`, // 8.929%
      height: `${(254/1200)*100}%` // 21.167%
    },
    tier: 'lower',
    restsOn: ['isegoria', 'isopoliteia']
  },
  {
    id: 'dikaios',
    name: 'DikaiOS',
    subtitle: 'Justice & Fairness',
    description: 'True justice goes beyond mere legality—it seeks fairness, equity, and restoration. The law must serve justice, not replace it.',
    position: { 
      left: `${(571/896)*100}%`, // 63.728%
      top: `${(690/1200)*100}%`, // 57.5%
      width: `${(80/896)*100}%`, // 8.929%
      height: `${(254/1200)*100}%` // 21.167%
    },
    tier: 'lower',
    restsOn: ['isonomia', 'isegoria']
  },
  {
    id: 'thermansis',
    name: 'Thérmansis',
    subtitle: 'Care & Nurture',
    description: 'A society that cares for its most vulnerable members—children, elderly, disabled, and disadvantaged. Strength is measured by how we treat the least among us.',
    position: { 
      left: `${(670/896)*100}%`, // 74.777%
      top: `${(690/1200)*100}%`, // 57.5%
      width: `${(80/896)*100}%`, // 8.929%
      height: `${(254/1200)*100}%` // 21.167%
    },
    tier: 'lower',
    restsOn: ['isopoliteia', 'isoeudaimonia']
  },
  {
    id: 'nomothetesis',
    name: 'Nomothetesis',
    subtitle: 'Lawmaking & Legislation',
    description: 'The structured process by which the people create, amend, and refine their laws. Good laws emerge from deliberate, transparent processes.',
    position: { 
      left: `${(769/896)*100}%`, // 85.826%
      top: `${(690/1200)*100}%`, // 57.5%
      width: `${(80/896)*100}%`, // 8.929%
      height: `${(254/1200)*100}%` // 21.167%
    },
    tier: 'lower',
    restsOn: ['isoeudaimonia']
  }
];

export function TempleArchitecture({ darkMode, onNavigateToPillar, currentFloor, allPillarsComplete = false }: TempleArchitectureProps) {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [completedElements, setCompletedElements] = useState<Set<string>>(new Set());
  const [hoveredSeal, setHoveredSeal] = useState<string | null>(null);
  const [cardOrigin, setCardOrigin] = useState<{ x: number; y: number } | null>(null);
  const [loadedMarkdownContent, setLoadedMarkdownContent] = useState<Record<string, any>>({}); // Cache loaded markdown content
  
  // Close seal when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (hoveredSeal && !(event.target as HTMLElement).closest('[data-seal-container]')) {
        setHoveredSeal(null);
      }
    };
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && hoveredSeal) {
        setHoveredSeal(null);
      }
    };
    
    if (hoveredSeal) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [hoveredSeal]);
  
  // Section refs for intersection observers
  const aretaiRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  // Load completed elements from localStorage
  const loadCompletedElements = () => {
    const allElements = [
      ...isotesData.map(i => i.id), 
      ...pillarsData.map(p => p.id),
      ...aretaiData.map(a => a.id),
      isotimiaData.id
    ];
    const completed = allElements.filter(id => isSectionConstructed(id));
    setCompletedElements(new Set(completed));
  };

  // Load completed elements on mount
  useEffect(() => {
    loadCompletedElements();
    
    // Listen for storage changes (when completion happens in another tab/page)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'aretecracy-temple-progress') {
        loadCompletedElements();
      }
    };
    
    // Listen for custom event (when completion happens in same tab)
    const handleProgressUpdate = () => {
      loadCompletedElements();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('temple-progress-updated', handleProgressUpdate);
    
    // Also reload when page gains focus
    const handleFocus = () => {
      loadCompletedElements();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('temple-progress-updated', handleProgressUpdate);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Mark element as completed (toast is handled inside DetailCard)
  const markElementCompleted = (elementId: string) => {
    markSectionConstructed(elementId);
    setCompletedElements(prev => new Set(prev).add(elementId));
    // Trigger a custom event so other components in the same tab can update
    window.dispatchEvent(new Event('temple-progress-updated'));
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-50px',
    };

    if (aretaiRef.current) {
      const aretaiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add('aretai'));
          }
        });
      }, observerOptions);
      
      aretaiObserver.observe(aretaiRef.current);
      observers.push(aretaiObserver);
    }

    if (pillarsRef.current) {
      const pillarsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add('pillars'));
          }
        });
      }, observerOptions);
      
      pillarsObserver.observe(pillarsRef.current);
      observers.push(pillarsObserver);
    }

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // If user has completed any elements, they've seen the pillars section - keep it visible
  const hasCompletedElements = completedElements.size > 0;
  const fromElevator = currentFloor !== undefined;
  const pillarsFromElevator = fromElevator && (currentFloor === 0 || currentFloor === 1 || currentFloor === 2 || currentFloor === 3 || currentFloor === 4 || currentFloor === 5);
  const aretaiFromElevator = fromElevator && (currentFloor === 4 || currentFloor === 5);
  const aretaiConstructed = isSectionConstructed('aretai') || visibleSections.has('aretai') || aretaiFromElevator;
  const pillarsConstructed = isSectionConstructed('pillars') || visibleSections.has('pillars') || hasCompletedElements || pillarsFromElevator;

  // Get current element data - check all data sources
  const currentElement = selectedElement 
    ? [...isotesData, ...pillarsData, ...aretaiData, isotimiaData].find(el => el.id === selectedElement) || null
    : null;

  // Get glossary term for current element (lazy-loaded to avoid bundling 44KB glossary data)
  const [glossaryTerm, setGlossaryTerm] = useState<GlossaryTerm | null>(null);
  
  // Load glossary term when element changes (async - doesn't block render)
  useEffect(() => {
    if (currentElement?.id) {
      getTermByIdAsync(currentElement.id).then(term => {
        setGlossaryTerm(term || null);
      });
    } else {
      setGlossaryTerm(null);
    }
  }, [currentElement?.id]);
  
  // Get markdown content if available (check both cache and loaded state)
  const markdownContent = currentElement 
    ? (getGlossaryContent(currentElement.id) || loadedMarkdownContent[currentElement.id])
    : null;
  
  // Use markdown body if available, otherwise fall back to fullDescription
  const contentBody = markdownContent?.body || glossaryTerm?.fullDescription || currentElement?.description || '';

  // Prevent body scroll when card is open (but allow card scrolling)
  useEffect(() => {
    if (selectedElement) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Disable body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Re-enable body scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [selectedElement]);

  // Preload markdown content when element is selected
  useEffect(() => {
    if (currentElement?.id) {
      // Check if already loaded
      const cached = getGlossaryContent(currentElement.id);
      if (cached) {
        setLoadedMarkdownContent(prev => ({ ...prev, [currentElement.id]: cached }));
        return;
      }

      // Preload in background
      preloadGlossaryContent(currentElement.id)
        .then(content => {
          if (content) {
            setLoadedMarkdownContent(prev => ({ ...prev, [currentElement.id]: content }));
          }
        })
        .catch(err => {
          console.error('Failed to preload glossary content:', err);
        });
    }
  }, [currentElement?.id]);
  

  // Type guard to check if element has restsOn property (pillars only)
  const hasRestsOn = (el: typeof currentElement): el is NonNullable<typeof el> & { restsOn: string[] } => {
    if (el === null) return false;
    if (!('restsOn' in el)) return false;
    const restsOn = (el as { restsOn: unknown }).restsOn;
    return Array.isArray(restsOn);
  };

  return (
    <div className="relative max-w-6xl mx-auto py-16 pr-12 md:pr-4">
      
      {/* Full Temple Structure with Interactive Overlays */}
      <motion.div
        ref={pillarsRef}
        initial={{ opacity: 0.2 }}
        animate={{ opacity: pillarsConstructed ? 1 : 0.2 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="mb-12"
      >
        <div className="text-center mb-12">
          <h2 className={`text-5xl mb-6 transition-colors duration-300 ${
            darkMode ? 'text-amber-100' : 'text-stone-900'
          }`}>
            The Temple of AreTéCracy
          </h2>
          <p className={`text-xl max-w-3xl mx-auto mb-3 transition-colors duration-300 ${
            darkMode ? 'text-amber-200/80' : 'text-stone-700'
          }`} style={{ fontFamily: 'Georgia, serif' }}>
            16 pillars supporting the architecture of democratic excellence
          </p>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            darkMode ? 'text-amber-200/60' : 'text-stone-600'
          }`} style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Click any pillar or equality plaque to explore its meaning
          </p>
        </div>

        {/* Interactive Temple Container */}
        <div className="relative w-full flex justify-center">
          {/* Temple Image */}
          <motion.div
            className="relative max-w-full"
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ 
              y: pillarsConstructed ? 0 : 40, 
              opacity: pillarsConstructed ? 1 : 0.2,
              scale: pillarsConstructed ? 1 : 0.95
            }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {/* Roof/Pediment message in the empty area above the pillars */}
            {(currentFloor === 0 || currentFloor === 1) && pillarsConstructed && (
              <div
                className="absolute inset-x-0 top-0 flex items-center justify-center pointer-events-none"
                style={{ height: '22%' }}
                aria-hidden
              >
                <div
                  className={`rounded-2xl border-2 shadow-2xl p-6 md:p-10 max-w-xl mx-4 text-center pointer-events-auto ${
                    darkMode
                      ? 'bg-gray-800/95 border-cyan-500/50 text-amber-100'
                      : 'bg-white/95 border-amber-800/50 text-stone-900'
                  }`}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {!allPillarsComplete ? (
                    <>
                      <p className="text-lg md:text-xl leading-relaxed">
                        The pediment cannot be placed until all pillars are completed.
                      </p>
                      <p className={`text-sm mt-3 ${darkMode ? 'text-amber-200/80' : 'text-stone-600'}`}>
                        Explore the Bedrock and Foundation levels to earn completion seals on each element; then return here.
                      </p>
                    </>
                  ) : (
                    <p className="text-lg md:text-xl leading-relaxed">
                      All pillars complete. Pediment and roof unlock — including honorary citizen recognition — coming soon.
                    </p>
                  )}
                </div>
              </div>
            )}
            <img
              src={architectureDiagram}
              srcSet={getResponsiveSrcset('architecture-diagram', 'webp')}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 90vw, 1200px"
              alt="AreTéCracy temple architecture showing foundation, pedestals, and pillars"
              className="w-full h-auto shadow-2xl rounded-lg"
              loading="lazy"
            />

            {/* Interactive Overlays - Isótēs Plaques */}
            {pillarsConstructed && isotesData.map((isotes) => (
              <button
                key={isotes.id}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setCardOrigin({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                  });
                  setSelectedElement(isotes.id);
                  // Close seal when opening card (user wants to read, not see the seal)
                  if (hoveredSeal === isotes.id) {
                    setHoveredSeal(null);
                  }
                }}
                onMouseEnter={() => {
                  setHoveredElement(isotes.id);
                  // Don't expand seal when hovering over element - only when hovering directly over seal
                }}
                onMouseLeave={() => {
                  setHoveredElement(null);
                }}
                className="absolute cursor-pointer transition-all duration-300"
                style={{
                  left: isotes.position.left,
                  top: isotes.position.top,
                  width: isotes.position.width,
                  height: isotes.position.height,
                }}
                aria-label={`Explore ${isotes.name}`}
              >
                {/* Hover/Active Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    hoveredElement === isotes.id || selectedElement === isotes.id
                      ? 'bg-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.6)] border-2 border-cyan-400'
                      : 'bg-transparent border-2 border-transparent'
                  }`}
                />
                
                {/* Label on hover */}
                {hoveredElement === isotes.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold ${
                      darkMode
                        ? 'bg-cyan-900/90 text-cyan-100 border border-cyan-400'
                        : 'bg-cyan-50 text-cyan-900 border border-cyan-300'
                    }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {isotes.name}
                  </motion.div>
                )}
              </button>
            ))}

            {/* Interactive Overlays - Pillars */}
            {pillarsConstructed && pillarsData.map((pillar) => (
              <button
                key={pillar.id}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setCardOrigin({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                  });
                  setSelectedElement(pillar.id);
                  // Close seal when opening card (user wants to read, not see the seal)
                  if (hoveredSeal === pillar.id) {
                    setHoveredSeal(null);
                  }
                  if (onNavigateToPillar) {
                    onNavigateToPillar(pillar.id);
                  }
                }}
                onMouseEnter={() => {
                  setHoveredElement(pillar.id);
                  // Don't expand seal when hovering over pillar - only when hovering directly over seal
                }}
                onMouseLeave={() => {
                  setHoveredElement(null);
                }}
                className="absolute cursor-pointer transition-all duration-300"
                style={{
                  left: pillar.position.left,
                  top: pillar.position.top,
                  width: pillar.position.width,
                  height: pillar.position.height,
                }}
                aria-label={`Explore ${pillar.name}`}
              >
                {/* Hover/Active Glow Effect - Nyctimene Blue */}
                <div
                  className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    hoveredElement === pillar.id || selectedElement === pillar.id
                      ? 'bg-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,0.8),inset_0_0_20px_rgba(34,211,238,0.3)] border-2 border-cyan-300 animate-pulse'
                      : 'bg-transparent border-2 border-transparent'
                  }`}
                />
                
                {/* Label on hover */}
                {hoveredElement === pillar.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute ${
                      pillar.tier === 'upper' ? '-top-12' : '-bottom-12'
                    } left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold ${
                      darkMode
                        ? 'bg-cyan-900/90 text-cyan-100 border border-cyan-400 shadow-lg'
                        : 'bg-cyan-50 text-cyan-900 border border-cyan-300 shadow-lg'
                    }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {pillar.name}
                  </motion.div>
                )}
              </button>
            ))}

            {/* Completion Seals - Rendered on completed elements */}
            {/* Only render seals for Isótēs and Pillars in the upper image */}
            {/* Aretai and Isotimia only appear in the lower Euthynteria image */}
            {pillarsConstructed && [...isotesData, ...pillarsData].map((element) => {
              if (!completedElements.has(element.id)) return null;
              
              // Calculate center position: left + (width/2), top + (height/2)
              const leftPercent = parseFloat(element.position.left);
              const topPercent = parseFloat(element.position.top);
              const widthPercent = parseFloat(element.position.width);
              const heightPercent = parseFloat(element.position.height);
              
              const elementCenterLeft = leftPercent + (widthPercent / 2);
              const elementCenterTop = topPercent + (heightPercent / 2);
              
              // Seal expands ONLY when hovering directly over the seal itself, not the pillar
              // This prevents the seal from blocking the view when users want to read the pillar name/content
              const isHovered = hoveredSeal === element.id;
              
              // Seal container size - increased for better visibility
              // Only the visual appearance scales when hovered using transform: scale()
              const sealContainerSize = 60; // 60px for better visibility
              const visualScale = isHovered ? 3 : 1; // Visual scale factor
              
              // To center the seal, we need to offset by half its width/height
              // Since we're using percentage-based positioning, we need to convert pixels to percentage
              // The image is 896px wide, so: (sealContainerSize/2) / 896 * 100 = percentage offset
              const sealWidthPercent = (sealContainerSize / 2) / 896 * 100;
              const sealHeightPercent = (sealContainerSize / 2) / 1200 * 100;
              
              // Position seal so its center aligns with element center
              const sealLeft = elementCenterLeft - sealWidthPercent;
              const sealTop = elementCenterTop - sealHeightPercent;
              
              return (
                <motion.div
                  key={`seal-${element.id}`}
                  data-seal-container
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ 
                    scale: visualScale, 
                    rotate: 0, 
                    opacity: 1,
                  }}
                  transition={{ 
                    scale: { type: 'spring', damping: 15, stiffness: 300 },
                    rotate: { type: 'spring', damping: 12, stiffness: 200, delay: 0.2 },
                    opacity: { duration: 0.3 }
                  }}
                  className="absolute"
                  style={{
                    left: `${sealLeft}%`,
                    top: `${sealTop}%`,
                    zIndex: isHovered ? 100 : 10,
                    width: `${sealContainerSize}px`, // Container always stays small
                    height: `${sealContainerSize}px`, // Container always stays small
                    pointerEvents: 'none', // Don't block pillar hover events
                    transformOrigin: 'center center', // Scale from center
                  }}
                >
                  {/* Glowing background - behind the image */}
                  <div 
                    className="absolute blur-xl bg-cyan-400/40"
                    style={{ 
                      width: '100%',
                      height: '100%',
                      opacity: isHovered ? 0.6 : 0.4,
                      left: 0,
                      top: 0,
                      zIndex: 1,
                    }} 
                  />
                  
                  {/* Completion Seal Image - on top of glow */}
                  <img 
                    src={completionSeal}
                    srcSet={getResponsiveSrcset('completion-seal', 'webp')}
                    sizes="(max-width: 600px) 120px, 180px"
                    alt="Completion Seal"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: isHovered 
                        ? 'drop-shadow(0 0 20px rgba(34, 211, 238, 1)) brightness(1.2)'
                        : 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.8)) brightness(1)',
                      left: 0,
                      top: 0,
                      zIndex: 20,
                      display: 'block',
                      opacity: 1,
                      visibility: 'visible',
                      pointerEvents: 'none',
                      backgroundColor: 'transparent',
                    }}
                    onError={(e) => {
                      console.error('Failed to load completion seal image:', completionSeal);
                      console.error('Image error:', e);
                    }}
                    onLoad={(e) => {
                      console.log('Completion seal image loaded successfully for:', element.id);
                      const img = e.currentTarget as HTMLImageElement;
                      console.log('Image dimensions:', img.width, 'x', img.height);
                      console.log('Image rendered size:', img.offsetWidth, 'x', img.offsetHeight);
                    }}
                  />
                  
                  {/* Close button - only shown when expanded and explicitly clicked to stay open */}
                  {hoveredSeal === element.id && selectedElement === element.id && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setHoveredSeal(null);
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg z-50 pointer-events-auto"
                      style={{ transform: 'translate(50%, -50%)' }}
                      aria-label="Close seal"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </motion.div>
              );
            })}

            {/* Level indicator arrow - Roof / Pediment / Pillars α / β */}
            {(currentFloor === 0 || currentFloor === 1 || currentFloor === 2 || currentFloor === 3) && PILLAR_LEVELS[currentFloor] && (
              <motion.div
                key={PILLAR_LEVELS[currentFloor].id}
                data-level-indicator
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-0 sm:-right-2 md:-right-8 lg:-right-12 text-4xl md:text-5xl -translate-y-1/2 pointer-events-none z-10"
                style={{
                  top: `${PILLAR_LEVELS[currentFloor].triangleTop}%`,
                  color: darkMode ? '#22d3ee' : '#0891b2',
                  filter: darkMode ? 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))' : 'drop-shadow(0 0 4px rgba(8, 145, 178, 0.4))',
                }}
                aria-hidden
              >
                ◀
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Detail Card - Blooms from clicked element */}
      <AnimatePresence>
        {selectedElement && currentElement && cardOrigin && (
          <DetailCard
            element={{
              id: currentElement.id,
              name: currentElement.name,
              subtitle: currentElement.subtitle,
              type: isotesData.some(i => i.id === selectedElement) ? 'equality' :
                    aretaiData.some(a => a.id === selectedElement) ? 'virtue' :
                    selectedElement === 'isotimia' ? 'foundation' : 'pillar'
            }}
            glossaryTerm={glossaryTerm ? { blurb: glossaryTerm.blurb } : null}
            contentBody={contentBody}
            darkMode={darkMode}
            completed={completedElements.has(selectedElement)}
            cardOrigin={cardOrigin}
            onClose={() => {
              setSelectedElement(null);
              setCardOrigin(null);
            }}
            onComplete={markElementCompleted}
            onNavigateToPillar={(pillarId) => {
              const rect = document.querySelector(`[data-element-id="${pillarId}"]`)?.getBoundingClientRect();
              if (rect) {
                setCardOrigin({
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2
                });
              }
              setSelectedElement(pillarId);
              if (onNavigateToPillar) {
                onNavigateToPillar(pillarId);
              }
            }}
            restsOn={hasRestsOn(currentElement) ? currentElement.restsOn : undefined}
          />
        )}
      </AnimatePresence>



      {/* Divider */}
      <div className="my-16 max-w-2xl mx-auto">
        <div className={`h-px transition-colors duration-300 ${
          darkMode ? 'bg-amber-700/40' : 'bg-stone-300'
        }`} />
      </div>

      {/* Euthynteria - The Philosophical Foundation */}
      <motion.div
        ref={aretaiRef}
        initial={{ opacity: 0.2 }}
        animate={{ opacity: aretaiConstructed ? 1 : 0.2 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="mb-16"
      >
        <div className="text-center mb-12">
          <h2 className={`text-5xl mb-6 transition-colors duration-300 ${
            darkMode ? 'text-amber-100' : 'text-stone-900'
          }`}>
            The Euthynteria
          </h2>
          <p className={`text-xl max-w-3xl mx-auto mb-3 transition-colors duration-300 ${
            darkMode ? 'text-amber-200/80' : 'text-stone-700'
          }`} style={{ fontFamily: 'Georgia, serif' }}>
            The foundational substrate upon which all else rests
          </p>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            darkMode ? 'text-amber-200/60' : 'text-stone-600'
          }`} style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Isotímia — Equal Standing — composed of the Four Aretai virtues
          </p>
        </div>

        {/* Euthynteria Image */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="relative max-w-full"
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ 
              y: aretaiConstructed ? 0 : 50, 
              opacity: aretaiConstructed ? 1 : 0.2,
              scale: aretaiConstructed ? 1 : 0.9
            }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <img
              src={euthynteriaImage}
              srcSet={getResponsiveSrcset('temple-euthynteria', 'webp')}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 90vw, 1200px"
              alt="Euthynteria foundation showing Isotímia and the Four Aretai"
              className="max-w-full h-auto shadow-2xl rounded-lg"
              loading="lazy"
            />

            {/* Level indicator arrow - Foundation / Bedrock */}
            {(currentFloor === 4 || currentFloor === 5) && PILLAR_LEVELS[currentFloor] && (
              <motion.div
                key={PILLAR_LEVELS[currentFloor].id}
                data-level-indicator
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-0 sm:-right-2 md:-right-8 lg:-right-12 text-4xl md:text-5xl -translate-y-1/2 pointer-events-none z-10"
                style={{
                  top: `${PILLAR_LEVELS[currentFloor].triangleTop}%`,
                  color: darkMode ? '#22d3ee' : '#0891b2',
                  filter: darkMode ? 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))' : 'drop-shadow(0 0 4px rgba(8, 145, 178, 0.4))',
                }}
                aria-hidden
              >
                ◀
              </motion.div>
            )}

            {/* Interactive Overlays - Isótēs on Euthynteria */}
            {aretaiConstructed && euthynteriaIsotesData.map((isotes) => (
              <button
                key={`euth-${isotes.id}`}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setCardOrigin({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                  });
                  setSelectedElement(isotes.id);
                  // Close seal when opening card (user wants to read, not see the seal)
                  if (hoveredSeal === isotes.id) {
                    setHoveredSeal(null);
                  }
                }}
                onMouseEnter={() => {
                  setHoveredElement(isotes.id);
                  // Don't expand seal when hovering over isote - only when hovering directly over seal
                }}
                onMouseLeave={() => {
                  setHoveredElement(null);
                }}
                className="absolute cursor-pointer transition-all duration-300"
                style={{
                  left: isotes.position.left,
                  top: isotes.position.top,
                  width: isotes.position.width,
                  height: isotes.position.height,
                }}
                aria-label={`Explore ${isotes.name}`}
              >
                <div
                  className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    hoveredElement === isotes.id || selectedElement === isotes.id
                      ? 'bg-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.6)] border-2 border-cyan-400'
                      : 'bg-transparent border-2 border-transparent'
                  }`}
                />
                
                {hoveredElement === isotes.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold z-10 ${
                      darkMode
                        ? 'bg-cyan-900/90 text-cyan-100 border border-cyan-400'
                        : 'bg-cyan-50 text-cyan-900 border border-cyan-300'
                    }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {isotes.name}
                  </motion.div>
                )}
              </button>
            ))}

            {/* Interactive Overlays - Aretai */}
            {aretaiConstructed && aretaiData.map((arete) => (
              <button
                key={arete.id}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setCardOrigin({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                  });
                  setSelectedElement(arete.id);
                  // Close seal when opening card (user wants to read, not see the seal)
                  if (hoveredSeal === arete.id) {
                    setHoveredSeal(null);
                  }
                }}
                onMouseEnter={() => {
                  setHoveredElement(arete.id);
                  // Don't expand seal when hovering over arete - only when hovering directly over seal
                }}
                onMouseLeave={() => {
                  setHoveredElement(null);
                }}
                className="absolute cursor-pointer transition-all duration-300"
                style={{
                  left: arete.position.left,
                  top: arete.position.top,
                  width: arete.position.width,
                  height: arete.position.height,
                }}
                aria-label={`Explore ${arete.name}`}
              >
                <div
                  className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    hoveredElement === arete.id || selectedElement === arete.id
                      ? 'bg-amber-400/30 shadow-[0_0_30px_rgba(251,191,36,0.6)] border-2 border-amber-400'
                      : 'bg-transparent border-2 border-transparent'
                  }`}
                />
                
                {hoveredElement === arete.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold z-10 ${
                      darkMode
                        ? 'bg-amber-900/90 text-amber-100 border border-amber-400'
                        : 'bg-amber-50 text-amber-900 border border-amber-300'
                    }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {arete.name}
                  </motion.div>
                )}
              </button>
            ))}

            {/* Interactive Overlay - Isotímia */}
            {aretaiConstructed && (
              <button
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setCardOrigin({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                  });
                  setSelectedElement(isotimiaData.id);
                  // Close seal when opening card (user wants to read, not see the seal)
                  if (hoveredSeal === isotimiaData.id) {
                    setHoveredSeal(null);
                  }
                }}
                onMouseEnter={() => {
                  setHoveredElement(isotimiaData.id);
                  // Don't expand seal when hovering over isotimia - only when hovering directly over seal
                }}
                onMouseLeave={() => {
                  setHoveredElement(null);
                }}
                className="absolute cursor-pointer transition-all duration-300"
                style={{
                  left: isotimiaData.position.left,
                  top: isotimiaData.position.top,
                  width: isotimiaData.position.width,
                  height: isotimiaData.position.height,
                }}
                aria-label={`Explore ${isotimiaData.name}`}
              >
                <div
                  className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    hoveredElement === isotimiaData.id || selectedElement === isotimiaData.id
                      ? 'bg-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.8)] border-2 border-amber-500'
                      : 'bg-transparent border-2 border-transparent'
                  }`}
                />
                
                {hoveredElement === isotimiaData.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold z-10 ${
                      darkMode
                        ? 'bg-amber-900/90 text-amber-100 border border-amber-500'
                        : 'bg-amber-50 text-amber-900 border border-amber-400'
                    }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {isotimiaData.name}
                  </motion.div>
                )}
              </button>
            )}

            {/* Completion Seals - Rendered on completed Euthynteria elements */}
            {aretaiConstructed && [...euthynteriaIsotesData, ...aretaiData, isotimiaData].map((element) => {
              // For isotes on Euthynteria, check if completed (they use same IDs as isotesData)
              // The isotes share IDs with the main diagram, so completion state is shared
              const isCompleted = completedElements.has(element.id);
              if (!isCompleted) return null;
              
              // Calculate center position
              const leftPercent = parseFloat(element.position.left);
              const topPercent = parseFloat(element.position.top);
              const widthPercent = parseFloat(element.position.width);
              const heightPercent = parseFloat(element.position.height);
              
              const elementCenterLeft = leftPercent + (widthPercent / 2);
              const elementCenterTop = topPercent + (heightPercent / 2);
              
              // Seal expands ONLY when hovering directly over the seal itself, not the element
              // This prevents the seal from blocking the view when users want to read the element name/content
              const isHovered = hoveredSeal === element.id;
              
              // Seal container size - increased for better visibility
              // Only the visual appearance scales when hovered
              const sealContainerSize = 60; // 60px for better visibility
              const visualScale = isHovered ? 3 : 1; // Visual scale factor
              
              // To center the seal, we need to offset by half its width/height
              // Since we're using percentage-based positioning, we need to convert pixels to percentage
              // The Euthynteria image is 2816px wide x 1536px tall
              const sealWidthPercent = (sealContainerSize / 2) / 2816 * 100;
              const sealHeightPercent = (sealContainerSize / 2) / 1536 * 100;
              
              // Position seal so its center aligns with element center
              const sealLeft = elementCenterLeft - sealWidthPercent;
              const sealTop = elementCenterTop - sealHeightPercent;
              
              return (
                <motion.div
                  key={`seal-euth-${element.id}`}
                  data-seal-container
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ 
                    scale: visualScale, 
                    rotate: 0, 
                    opacity: 1,
                  }}
                  transition={{ 
                    scale: { type: 'spring', damping: 15, stiffness: 300 },
                    rotate: { type: 'spring', damping: 12, stiffness: 200, delay: 0.2 },
                    opacity: { duration: 0.3 }
                  }}
                  className="absolute"
                  style={{
                    left: `${sealLeft}%`,
                    top: `${sealTop}%`,
                    zIndex: isHovered ? 100 : 10,
                    width: `${sealContainerSize}px`, // Container always stays small
                    height: `${sealContainerSize}px`, // Container always stays small
                    pointerEvents: 'none', // Don't block element hover events
                    transformOrigin: 'center center', // Scale from center
                  }}
                >
                  {/* Glowing background - behind the image */}
                  <div 
                    className="absolute blur-xl bg-cyan-400/40"
                    style={{ 
                      width: '100%',
                      height: '100%',
                      opacity: isHovered ? 0.6 : 0.4,
                      left: 0,
                      top: 0,
                      zIndex: 1,
                      pointerEvents: 'none',
                    }} 
                  />
                  
                  {/* Completion Seal Image - on top of glow */}
                  {/* Make the image area hoverable so users can hover directly over the seal */}
                  <div
                    onMouseEnter={() => {
                      setHoveredSeal(element.id);
                    }}
                    onMouseLeave={() => {
                      // Only clear hover if seal wasn't clicked to stay open
                      if (selectedElement !== element.id) {
                        setHoveredSeal(null);
                      }
                    }}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      left: '0',
                      top: '0',
                      zIndex: 20,
                      pointerEvents: 'auto', // Make this area hoverable
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={completionSeal}
                      srcSet={getResponsiveSrcset('completion-seal', 'webp')}
                      sizes="(max-width: 600px) 120px, 180px"
                      alt="Completion Seal"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: isHovered 
                          ? 'drop-shadow(0 0 20px rgba(34, 211, 238, 1)) brightness(1.2)'
                          : 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.8)) brightness(1)',
                        display: 'block',
                        opacity: 1,
                        visibility: 'visible',
                        pointerEvents: 'none', // Image itself doesn't need pointer events
                        backgroundColor: 'transparent',
                      }}
                      onError={(e) => {
                        console.error('Failed to load completion seal image:', completionSeal);
                        console.error('Image error:', e);
                      }}
                      onLoad={(e) => {
                        console.log('Completion seal image loaded successfully for:', element.id);
                        const img = e.currentTarget as HTMLImageElement;
                        console.log('Image dimensions:', img.width, 'x', img.height);
                        console.log('Image rendered size:', img.offsetWidth, 'x', img.offsetHeight);
                      }}
                    />
                  </div>
                  
                  {/* Close button - only shown when expanded and explicitly clicked to stay open */}
                  {hoveredSeal === element.id && selectedElement === element.id && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setHoveredSeal(null);
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg z-50 pointer-events-auto"
                      style={{ transform: 'translate(50%, -50%)' }}
                      aria-label="Close seal"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}