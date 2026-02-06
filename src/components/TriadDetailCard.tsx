import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface TriadDetailCardProps {
  element: {
    id: string;
    name: string;
  };
  contentBody: string;
  darkMode: boolean;
  cardOrigin: { x: number; y: number };
  onClose: () => void;
}

export function TriadDetailCard({
  element,
  contentBody,
  darkMode,
  cardOrigin,
  onClose
}: TriadDetailCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);

  // Handle hover-out to close card
  const handleMouseLeave = (e: React.MouseEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget) {
      // Mouse left the window
      onClose();
      return;
    }
    
    // Check if related target is still within backdrop or card
    const isStillInBackdrop = backdropRef.current?.contains(relatedTarget);
    const isStillInCard = cardRef.current?.contains(relatedTarget);
    
    if (!isStillInBackdrop && !isStillInCard) {
      // Mouse has left both backdrop and card
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        ref={backdropRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onMouseLeave={handleMouseLeave}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        style={{ 
          overflow: 'hidden',
          touchAction: 'none'
        }}
      />

      {/* Detail Card - Hero theme (blue + gold) */}
      <motion.div
        ref={cardRef}
        initial={{
          scale: 0,
          x: cardOrigin.x - window.innerWidth / 2,
          y: cardOrigin.y - window.innerHeight / 2,
          opacity: 0
        }}
        animate={{ 
          scale: 1,
          x: 0,
          y: 0,
          opacity: 1
        }}
        exit={{
          scale: 0,
          x: cardOrigin.x - window.innerWidth / 2,
          y: cardOrigin.y - window.innerHeight / 2,
          opacity: 0
        }}
        transition={{ 
          type: 'spring', 
          damping: 25, 
          stiffness: 300,
          duration: 0.5
        }}
        className={`fixed z-50 rounded-3xl overflow-hidden shadow-2xl left-1/2 -translate-x-1/2 w-[95vw] max-w-5xl ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-950' 
            : 'bg-gradient-to-br from-white via-stone-50 to-blue-50'
        }`}
        style={{
          top: 'max(80px, calc(50vh - min(45vh, 450px)))',
          maxHeight: 'calc(100vh - 160px)',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
        onMouseLeave={handleMouseLeave}
      >
        {/* Scrollable Content Container */}
        <div className="h-full flex flex-col overflow-hidden min-h-0">
          {/* Header */}
          <div className={`flex-shrink-0 px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b ${
            darkMode ? 'border-gray-700' : 'border-stone-300'
          }`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className={`text-3xl md:text-4xl lg:text-5xl transition-colors duration-300 ${
                  darkMode ? 'text-amber-200' : 'text-amber-700'
                }`} style={{ 
                  fontFamily: '"Trebuchet MS", "Trebuchet", sans-serif',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  textShadow: darkMode ? '0 0 20px rgba(212, 175, 55, 0.4), 0 2px 10px rgba(0,0,0,0.5)' : 'none'
                }}>
                  {element.name}
                </h2>
              </div>
              
              {/* Close button */}
              <button
                onClick={onClose}
                className={`flex-shrink-0 p-3 rounded-full transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/80 text-amber-200 hover:bg-gray-700'
                    : 'bg-white/80 text-stone-700 hover:bg-stone-100'
                }`}
                aria-label="Close"
              >
                <X className="w-7 h-7 md:w-8 md:h-8" style={{ strokeWidth: 2.5 }} />
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div 
            className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 px-6 md:px-8 py-6 md:py-8"
            tabIndex={0}
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'thin',
              scrollbarColor: darkMode ? 'rgba(212, 175, 55, 0.4) transparent' : 'rgba(212, 175, 55, 0.4) transparent',
              outline: 'none'
            }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onScroll={(e) => e.stopPropagation()}
          >
            {/* Content */}
            <div className={`p-4 md:p-6 rounded-xl transition-colors duration-300 ${
              darkMode
                ? 'bg-gray-800/50 text-amber-100/90 border-l-4 border-amber-500'
                : 'bg-stone-100 text-stone-700 border-l-4 border-amber-600'
            }`}>
              <p className={`text-base md:text-lg leading-relaxed ${
                darkMode ? 'text-amber-100/90' : 'text-stone-700'
              }`} style={{ fontFamily: 'Georgia, serif' }}>
                {contentBody}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
