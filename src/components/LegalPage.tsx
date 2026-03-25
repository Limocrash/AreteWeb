import { MarkdownContent } from './MarkdownContent';
import { RulesLine } from './RulesLine';

interface LegalPageProps {
  darkMode?: boolean;
  type: 'legal' | 'privacy' | 'terms';
}

const legalContent = {
  legal: `# Legal Notices

**Effective date:** [Month Day, 2026]  
**Last updated:** [Month Day, 2026]

## Copyright

© 2015–2026 **AreTéCracy.org**. All rights reserved.

Unless otherwise stated, all text, graphics, design elements, logos, trademarks, and other content on this site are owned by AreTéCracy.org and/or its licensors, and are protected by applicable intellectual property laws.

## Trademarks

**AreTéCracy**, **AreTéCHracy**, **The Civic OS**, and associated marks, names, logos, and design elements may be trademarks or service marks of AreTéCracy.org and/or **The Civic OS Foundation** *(in formation)*. Unauthorized use is not permitted.

## Permission and reuse

You may share links to pages on this site.  
You may quote short excerpts for commentary/criticism with attribution and a link back.

For any reuse beyond brief quotation (including republication, commercial use, derivative works, or redistribution of substantial portions), request permission at: **[[legal@aretecracy.org](mailto:legal@aretecracy.org)]**

## Disclaimers

This website provides educational and informational content about governance, civic design, and related ideas.

- **Not legal advice.** Nothing on this site constitutes legal advice.
- **Not political instruction.** This site does not advocate violence, sedition, or unlawful activity.
- **No guarantees.** Content is provided "as is," without warranties of any kind.

## External links

This site may link to third-party websites. We do not control those sites and are not responsible for their content or practices.

## Contact

Legal notices and rights inquiries: **[[legal@aretecracy.org](mailto:legal@aretecracy.org)]**`,

  privacy: `# Privacy Policy

**Effective date:** [Month Day, 2026]  
**Last updated:** [Month Day, 2026]

This Privacy Policy explains how **AreTéCracy.org** ("we," "us," "our") handles information when you use this website (the "Site").

## 1) What we collect

If you contact us or submit forms, we may collect name, email address, and message content. We may also collect basic technical data such as IP address, browser type, pages visited, and approximate location.

## 2) Cookies and analytics

We may use cookies for essential site functionality and basic analytics. Analytics provider(s): [None / List providers]

## 3) How we use information

We use collected information to respond to inquiries, improve site performance, maintain security, and understand site usage. We do **not** sell personal information.

## 4) Sharing

We may share information with service providers, if required by law, or to protect rights and safety.

## 5) Your choices

You can disable cookies in your browser or request access/deletion of personal information: **[[privacy@aretecracy.org](mailto:privacy@aretecracy.org)]**

## 6) Contact

Privacy questions: **[[privacy@aretecracy.org](mailto:privacy@aretecracy.org)]**`,

  terms: `# Terms of Use

**Effective date:** [Month Day, 2026]  
**Last updated:** [Month Day, 2026]

By accessing or using **AreTéCracy.org** (the "Site"), you agree to these Terms of Use.

## 1) Acceptable use

You agree not to use the Site for unlawful purposes, attempt to compromise site security, harvest data at scale, impersonate others, or distribute malware.

## 2) Intellectual property

The Site and its content are owned by AreTéCracy.org and protected by intellectual property laws. Except as expressly permitted, you may not copy, modify, or distribute Site content without written permission.

## 3) Disclaimer of warranties

The Site is provided **"as is"** and **"as available."** We disclaim all warranties, express or implied.

## 4) Limitation of liability

To the fullest extent permitted by law, AreTéCracy.org will not be liable for indirect, incidental, or consequential damages arising from your use of the Site.

## 5) Changes

We may update the Site and these Terms at any time. Your continued use means you accept the revised Terms.

## 6) Contact

Questions about these Terms: **[[legal@aretecracy.org](mailto:legal@aretecracy.org)]**`
};

export function LegalPage({ darkMode = true, type }: LegalPageProps) {
  const content = legalContent[type];

  return (
    <div className={`min-h-screen py-16 px-4 transition-colors duration-300 ${
      darkMode ? 'bg-stone-900' : 'bg-stone-50'
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className={`text-sm font-semibold underline underline-offset-4 transition-colors ${
              darkMode ? 'text-amber-200 hover:text-amber-100' : 'text-stone-700 hover:text-stone-900'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            ← Back
          </button>
        </div>
        <div className={`rounded-2xl p-8 md:p-12 transition-colors duration-300 ${
          darkMode 
            ? 'bg-stone-800/50 border border-stone-700' 
            : 'bg-white border border-stone-200'
        }`}>
          <MarkdownContent content={content} darkMode={darkMode} />
        </div>
        <div className="py-12 text-center mt-8">
          <RulesLine darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
