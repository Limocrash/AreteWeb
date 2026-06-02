import rawContent from '../content/why-greek.md?raw';
import { parseContentFile } from '../utils/contentLoader';
import { MarkdownContent } from './MarkdownContent';

interface WhyGreekPageProps {
  darkMode: boolean;
}

const parsed = parseContentFile(rawContent);

export function WhyGreekPage({ darkMode }: WhyGreekPageProps) {
  return (
    <div className={`relative w-full min-h-screen px-6 py-12 max-w-3xl mx-auto ${
      darkMode ? 'text-amber-100' : 'text-stone-900'
    }`}>
      <div className={`rounded-lg border-2 p-6 md:p-10 ${
        darkMode ? 'border-amber-700/50 bg-stone-900/70' : 'border-amber-600/50 bg-stone-50/90'
      }`}>
        <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${
          darkMode ? 'text-amber-500' : 'text-amber-700'
        }`} style={{ fontFamily: '"Trebuchet MS", system-ui, sans-serif' }}>
          On Language &amp; Intent
        </p>
        <h1 className={`text-3xl md:text-4xl font-semibold mb-2 ${
          darkMode ? 'text-amber-100' : 'text-stone-900'
        }`} style={{ fontFamily: '"Crimson Text", Georgia, serif' }}>
          {parsed.metadata.name}
        </h1>
        <p className={`text-xl italic mb-8 ${
          darkMode ? 'text-amber-400' : 'text-amber-700'
        }`} style={{ fontFamily: '"Crimson Text", Georgia, serif' }}>
          {parsed.metadata.headline}
        </p>
        <MarkdownContent content={parsed.body} darkMode={darkMode} />
      </div>
    </div>
  );
}
