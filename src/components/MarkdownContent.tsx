// Markdown content renderer component

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMemo } from 'react';

interface MarkdownContentProps {
  content: string;
  className?: string;
  darkMode?: boolean;
  fontFamily?: string;
  isTriadMode?: boolean;
}

export function MarkdownContent({ content, className = '', darkMode = false, fontFamily = '"Crimson Text", Georgia, serif', isTriadMode = false }: MarkdownContentProps) {
  const markdownClasses = useMemo(() => {
    const baseClasses = 'prose prose-lg max-w-none';
    const darkClasses = darkMode 
      ? (isTriadMode
          ? 'prose-invert prose-amber prose-headings:text-stone-50 prose-p:text-stone-50 prose-strong:text-stone-50 prose-em:text-stone-100 prose-blockquote:text-stone-200/80 prose-blockquote:border-amber-400/50 prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-code:text-cyan-300 prose-pre:bg-stone-900 prose-pre:border-stone-700'
          : 'prose-invert prose-amber prose-headings:text-amber-100 prose-h2:text-amber-100 prose-h3:text-amber-100 prose-p:text-amber-100/95 prose-strong:text-amber-50 prose-em:text-amber-200 prose-li:text-amber-100/95 prose-blockquote:text-amber-200/80 prose-blockquote:border-amber-400/50 prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-code:text-cyan-300 prose-pre:bg-stone-900 prose-pre:border-stone-700')
      : 'prose-stone prose-headings:text-stone-800 prose-p:text-stone-700 prose-strong:text-stone-900 prose-em:text-stone-700 prose-blockquote:text-stone-600 prose-blockquote:border-stone-400 prose-a:text-cyan-600 hover:prose-a:text-cyan-700 prose-code:text-cyan-700 prose-pre:bg-stone-100 prose-pre:border-stone-300';
    
    return `${baseClasses} ${darkClasses} ${className}`;
  }, [darkMode, className, isTriadMode]);

  // Pre-process content to wrap attribution lines (starting with — ) in a span
  // This avoids needing a custom p component and keeps TypeScript happy
  const processedContent = useMemo(() => {
    return content.split('\n').map(line => {
      if (line.startsWith('\u2014 ') || line.startsWith('-- ')) {
        return `<span class="attribution-line">${line}</span>`;
      }
      return line;
    }).join('\n');
  }, [content]);

  return (
    <div className={markdownClasses} style={{ fontFamily }}>
      <style>{`
        .attribution-line {
          display: block;
          color: #22d3ee;
          font-style: italic;
          text-shadow: 0 0 8px rgba(34,211,238,0.5);
          margin-bottom: 1rem;
        }
      `}</style>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => <h1 className="text-3xl md:text-4xl font-semibold mb-4 mt-6 first:mt-0" style={{ fontFamily: '"Crimson Text", Georgia, serif' }} {...props} />,
          h2: ({ ...props }) => <h2 className="text-2xl md:text-3xl font-semibold mb-3 mt-8" style={{ fontFamily: '"Crimson Text", Georgia, serif' }} {...props} />,
          h3: ({ ...props }) => <h3 className="text-xl md:text-2xl font-normal mb-2 mt-6" style={{ fontFamily: '"Trebuchet MS", system-ui, sans-serif', letterSpacing: '0.04em' }} {...props} />,
          h4: ({ ...props }) => <h4 className="text-lg md:text-xl font-normal mb-2 mt-4" style={{ fontFamily: '"Trebuchet MS", system-ui, sans-serif', letterSpacing: '0.03em' }} {...props} />,
          h5: ({ ...props }) => <h5 className="text-base md:text-lg font-semibold mb-2 mt-3 italic" {...props} />,
          h6: ({ ...props }) => <h6 className="text-sm md:text-base font-semibold mb-2 mt-3 italic" {...props} />,
          p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
          ul: ({ ...props }) => <ul className="list-disc list-inside mb-4 space-y-2 ml-4" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2 ml-4" {...props} />,
          li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote 
              className={`border-l-4 pl-4 py-2 my-4 italic ${
                darkMode 
                  ? 'border-amber-400/50 bg-stone-800/30' 
                  : 'border-amber-600/50 bg-stone-100/50'
              }`}
              {...props} 
            />
          ),
          strong: ({ ...props }) => <strong className="font-bold" {...props} />,
          em: ({ ...props }) => <em className="italic" {...props} />,
          a: ({ ...props }) => (
            <a 
              className="underline hover:no-underline transition-colors" 
              target="_blank" 
              rel="noopener noreferrer"
              {...props} 
            />
          ),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: ({ inline, ...props }: any) => {
            if (inline) {
              return (
                <code 
                  className={`px-1.5 py-0.5 rounded text-sm font-mono ${
                    darkMode 
                      ? 'bg-stone-800 text-cyan-300' 
                      : 'bg-stone-200 text-cyan-700'
                  }`}
                  {...props} 
                />
              );
            }
            return <code {...props} />;
          },
          hr: ({ ...props }) => (
            <hr 
              className={`my-6 border-t ${darkMode ? 'border-stone-700' : 'border-stone-300'}`}
              {...props} 
            />
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
