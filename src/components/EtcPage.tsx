/**
 * κ.τ.λ. (More) page: Settings, Legal, Privacy, Terms links.
 * Settings opens the Settings modal; Legal/Privacy/Terms use in-app navigation.
 */

import { Settings as SettingsIcon, FileText, Shield, Scale } from 'lucide-react';
import { RulesLine } from './RulesLine';

interface EtcPageProps {
  darkMode: boolean;
  onNavigate: (page: string) => void;
  onOpenSettings: () => void;
}

export function EtcPage({ darkMode, onNavigate, onOpenSettings }: EtcPageProps) {
  return (
    <div className={`min-h-screen py-16 px-4 transition-colors duration-300 ${
      darkMode ? 'bg-transparent text-white' : 'bg-transparent text-stone-900'
    }`}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-center" style={{ fontFamily: 'Georgia, serif' }}>
          κ.τ.λ. (More)
        </h1>

        {/* Settings */}
        <section className="mb-10">
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-amber-200' : 'text-amber-800'}`} style={{ fontFamily: 'Georgia, serif' }}>
            Settings
          </h2>
          <button
            onClick={onOpenSettings}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
              darkMode
                ? 'border-amber-700/50 text-amber-200 hover:bg-amber-900/30 hover:border-amber-600'
                : 'border-amber-400 text-amber-800 hover:bg-amber-50 hover:border-amber-500'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <SettingsIcon className="w-5 h-5 flex-shrink-0" />
            <span>Reset intros, progress, theme</span>
          </button>
        </section>

        {/* Legal */}
        <section className="mb-10">
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-amber-200' : 'text-amber-800'}`} style={{ fontFamily: 'Georgia, serif' }}>
            Legal
          </h2>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onNavigate('legal')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-300 text-left ${
                darkMode
                  ? 'border-stone-600 text-amber-100/90 hover:bg-stone-800/50 hover:border-stone-500'
                  : 'border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-stone-400'
              }`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              <span>Legal Notices</span>
            </button>
            <button
              onClick={() => onNavigate('privacy')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-300 text-left ${
                darkMode
                  ? 'border-stone-600 text-amber-100/90 hover:bg-stone-800/50 hover:border-stone-500'
                  : 'border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-stone-400'
              }`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <Shield className="w-5 h-5 flex-shrink-0" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-300 text-left ${
                darkMode
                  ? 'border-stone-600 text-amber-100/90 hover:bg-stone-800/50 hover:border-stone-500'
                  : 'border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-stone-400'
              }`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <Scale className="w-5 h-5 flex-shrink-0" />
              <span>Terms of Use</span>
            </button>
          </div>
        </section>

        <div className="pt-12 text-center">
          <RulesLine darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
