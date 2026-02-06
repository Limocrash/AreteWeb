import React from 'react';
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

### Information you provide

If you contact us or submit forms, we may collect:

- Name (if provided)

- Email address

- Message content and any information you choose to include

### Information collected automatically

Like most websites, we (or our hosting providers) may collect basic technical data such as:

- IP address

- Browser type and device information

- Pages visited and time spent

- Referring/exit pages

- Approximate location (city/region level)

This data is typically logged for security, performance, and analytics.

## 2) Cookies and analytics

We may use cookies or similar technologies for:

- Essential site functionality

- Basic analytics (to understand what pages are helpful)

If we use third-party analytics (e.g., Google Analytics, Plausible, etc.), we will list them here:

- **Analytics provider(s):** [None / List providers]

## 3) How we use information

We use collected information to:

- Respond to messages and inquiries

- Improve site performance and content

- Maintain security and prevent abuse

- Understand site usage (analytics)

We do **not** sell personal information.

## 4) Sharing

We may share information:

- With service providers who help operate the Site (hosting, email, analytics), under appropriate safeguards

- If required by law, subpoena, or legal process

- To protect rights, safety, and security (e.g., fraud prevention)

## 5) Data retention

We retain information only as long as necessary for the purposes described above, unless a longer retention period is required by law.

## 6) Your choices

You can:

- Disable cookies in your browser (some features may not function properly)

- Request access, correction, or deletion of personal information you have provided, where applicable

To make a request: **[[privacy@aretecracy.org](mailto:privacy@aretecracy.org)]**

## 7) Children

The Site is not intended for children under [13/16—choose based on your target audience and jurisdiction], and we do not knowingly collect personal information from children.

## 8) Changes

We may update this Privacy Policy. The "Last updated" date will reflect changes.

## 9) Contact

Privacy questions: **[[privacy@aretecracy.org](mailto:privacy@aretecracy.org)]**`,

  terms: `# Terms of Use

**Effective date:** [Month Day, 2026]  
**Last updated:** [Month Day, 2026]

By accessing or using **AreTéCracy.org** (the "Site"), you agree to these Terms of Use. If you do not agree, do not use the Site.

## 1) Who may use the Site

You must be able to form a legally binding agreement in your jurisdiction to use the Site.

## 2) Acceptable use

You agree not to:

- Use the Site for unlawful purposes

- Attempt to disrupt, exploit, or compromise the Site's security or functionality

- Harvest data, scrape content at scale, or use automated systems that degrade performance

- Impersonate others or misrepresent affiliation

- Upload or distribute malware or harmful code

## 3) Intellectual property

The Site and its content are owned by AreTéCracy.org and/or its licensors and protected by intellectual property laws. Except as expressly permitted, you may not copy, modify, distribute, sell, or create derivative works from Site content without written permission.

## 4) User submissions (if enabled)

If the Site allows submissions (comments, forms, uploads, proposals), you retain ownership of your content, but you grant AreTéCracy.org a non-exclusive, worldwide, royalty-free license to use, display, reproduce, and distribute that content for operating and promoting the project.

You represent that you have the rights to submit the content and that it does not violate law or third-party rights.

We may remove submissions at our discretion.

## 5) Donations, memberships, and paid support

If you choose to support the project via donations, memberships, or third-party platforms (e.g., Patreon), those transactions may be governed by additional terms from the payment provider. All contributions are subject to the policies stated at the point of contribution.

## 6) Disclaimer of warranties

The Site is provided **"as is"** and **"as available."** We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.

## 7) Limitation of liability

To the fullest extent permitted by law, AreTéCracy.org and its affiliates will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the Site.

## 8) Changes to the Site or Terms

We may update the Site and these Terms at any time. Changes are effective when posted. Your continued use of the Site after updates means you accept the revised Terms.

## 9) Contact

Questions about these Terms: **[[legal@aretecracy.org](mailto:legal@aretecracy.org)]**`
};

export function LegalPage({ darkMode = true, type }: LegalPageProps) {
  const content = legalContent[type];
  const title = type === 'legal' ? 'Legal Notices' : type === 'privacy' ? 'Privacy Policy' : 'Terms of Use';

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
