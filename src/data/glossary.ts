// AreTéCracy Glossary Data

export interface GlossaryTerm {
  id: string;
  name: string;
  greekName?: string;
  blurb: string;
  complexity: 1 | 2 | 3; // Star rating
  category?: 'pillar' | 'virtue' | 'equality' | 'process' | 'institution' | 'concept';
  hasFullPage?: boolean; // Whether this term has a dedicated page
  relatedTerms?: string[]; // IDs of related terms
  fullDescription?: string; // Extended description for the card
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'aegides',
    name: 'Aegides',
    greekName: 'Αἰγίδες',
    blurb: 'Drafting corps: intent → enforceable law.',
    complexity: 1,
    category: 'institution',
    fullDescription: '"Protectors of the Hypothesis"\n\nFrom Greek: aigis (αἰγίς, shield/protection)\n\nA trained civil service body that helps refine citizen proposals into legally precise Psephismata, or bills to be voted on.  This will include attorneys and paralegals, along with  experts in the domain that the given Pnyx serves, such as doctors, engineers, educators, etc.\n\nThe DikaiOS AI provides Aegides with oversight and assistance to preserve Ekklesia intent, compliance with precedent, and more.\n\nFunction: Bring the stated intent of the Ekklesia—"what citizens want"—into legally enforceable language that adheres stringently to their will and intent.\n\nSelection: Members are selected through:\n\n* Dokimazo (vetting or "tempering"), which includes education, degrees, certifications, work history, potential skills or competency testing, interviews, etc.\n\n* Axia (citizenship-wide scoring system for civic merit and honorable reputation)\n\n* Approval of a candidate list by the Ekklesia\n\n* Sortition (random lot) from the candidate list.\n\nThis is intended to ensure against political factioning while at the same time ensuring ability, skill, and integrity.'
  },
  {
    id: 'aegis',
    name: 'Aegis',
    greekName: 'Αἰγίς',
    blurb: 'The "shield" function protecting citizen intent.',
    complexity: 1,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: 'Shield / Protection (See: Aegides)\n\nFrom Greek aigis (αἰγίς) - the shield or breastplate of Athena, symbolizing divine protection and authority\n\nIn AreTécracy, "Aegis" refers to the protective function of the Aegides - the trained civil service body that shields Ekklesia intent from legal corruption while translating citizen proposals into enforceable law. The Aegis is Athena\'s shield; the Aegides are those who wield it on behalf of the demos. \n\nSee: Aegides'
  },
  {
    id: 'aletheia',
    name: 'Alētheia',
    greekName: 'Ἀλήθεια',
    blurb: 'Truth, transparency, and reality-first governance.',
    complexity: 1,
    category: 'virtue',
    hasFullPage: true,
    fullDescription: 'Truth/Transparency\n\nFrom Greek: a- (ἀ-, not) + lēthē (λήθη, concealment) = "unconcealed" or "not hidden"\n\nThe fourth of the Four Aretai. Truth and transparency—not just factual accuracy but personal integrity, truthfulness free from pretense and self-delusion.\n\nClassical meaning: In his famous "Allegory of the Cave," Plato described alētheia as what the prisoner discovered when he left the cave and saw, in bright sunlight, the actual objects that were merely shadows projected on a wall in his prior world. Pindar invoked it as the foundation of great virtue, guarding against falsehood.\n\nIn AreTéCracy:\n\n- Lying to the polis is a high crime\n- No functions of government shall be conducted "behind closed doors." Even high security activities must have reasonable oversight and transparency\n- Law and policy must be based on verifiable reality, and with reliable data\n- Commitment to truth is a key virtue at every level\n\nImplementation:\n\n- Logodosia (transparent accountability)\n- IsoKratOS/DikaiOS verification and explainability requirements\n- Open records and reverse surveillance\n- Whistleblower protections'
  },
  {
    id: 'archegramma',
    name: 'Archegramma',
    greekName: 'Ἀρχέγραμμα',
    blurb: 'The constitutional foundation and hard constraints.',
    complexity: 1,
    category: 'concept',
    fullDescription: 'Founding Document / Constitution / Magna Carta\n\nFrom Greek: archē (ἀρχή, beginning/foundation) + gramma (γράμμα, writing/document)\n\nThe foundational constitutional document encoding Isotimía and the Four Isótēs into enforceable law. Both the principles themselves, as well as hard constraints and enforcement mechanisms, are established in this document.\n\nKey features:\n\n- Encodes Isotimía as a constitutional mandate\n- Defines Axioktonia (self-destruct clause for regime failure that reboots government)\n- Requires extreme Homonoia for amendments\n- Includes "Horizon Clauses" for foreseeable future challenges that do not yet directly affect peoples\' lives, but which clearly will in time.'
  },
  {
    id: 'four-aretai',
    name: 'The Four Aretai',
    greekName: 'Αἱ Τέσσαρες Ἀρεταί',
    blurb: 'The virtues beneath equal standing.',
    complexity: 1,
    category: 'virtue',
    hasFullPage: true,
    fullDescription: 'The four foundational virtues that enable equal standing: Sonder, Philotimo, Plato\'s Roll Call, and Alētheia.'
  },
  {
    id: 'aretecracy',
    name: 'AreTéCracy',
    greekName: 'Ἀρετοκρατία',
    blurb: 'Virtue-based democratic operating system.',
    complexity: 1,
    category: 'concept',
    hasFullPage: true,
    fullDescription: '#### A totally refactored OS for Democracy (replaces versions 2.XXX and restores virtue from version 1.0)\n\nFrom Greek: aretē (ἀρετή, excellence/virtue) + kratia (κρατία, rule/power)\n\nA civic governance operating system built on virtue (aretē), equal standing (Isotimía), and direct citizen participation. Combines ancient Athenian democratic principles with modern AI tools to restore genuine self-governance.'
  },
  {
    id: 'asphaleia',
    name: 'Asphaleia',
    greekName: 'Ἀσφάλεια',
    blurb: 'Security architecture against capture and sabotage.',
    complexity: 2,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: 'The Security Architecture of AreTéCracy\n\nFrom Greek: asphaleia (ἀσφάλεια, safety / security / stability)\n\nThe security architecture of AreTéCracy—protecting the system from capture, sabotage, and quiet decay without turning it into a police state.\n\nAsphaleia covers multiple layers:\n\n- Physical security: protection of critical infrastructure in the Survival Stack (power, water, data centers, comms, archives).\n- Cybersecurity: hardened IsoKratOS / DikaiOS, audit logs, public verifiability of code and models where possible.\n- Institutional security: rules against concentration of force, clear limits on emergency powers, layered oversight of enforcement agencies.\n- Information security: defenses against mass manipulation, deepfake abuse, and algorithmic rage‑bait; transparency around recommendation systems.\n- AI alignment in context: ensuring IsoKratOS, DikaiOS and related tools serve the Ekklesia’s intent, not vendor interests.\n\nAsphaleia’s job is simple to say and hard to do: keep power hard to steal, hard to hide, and hard to hoard.'
  },
  {
    id: 'atd',
    name: 'ATD',
    greekName: 'Automated Technological Dividend',
    blurb: 'Automation gains shared via tools, not crumbs.',
    complexity: 3,
    category: 'concept',
    fullDescription: 'When automation increases productivity, the gains should be distributed as empowering tools and resources for all citizens, not as charity or minimal basic income.'
  },
  {
    id: 'axia',
    name: 'Axia',
    greekName: 'Ἀξία',
    blurb: 'Domain-specific civic merit and trust score.',
    complexity: 2,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: 'Civic Merit\n\nFrom Greek: axia (ἀξία, worth / value)\n\nA dynamic civic merit score reflecting how much trust a citizen has earned in specific domains of governance. Axia never replaces equal rights—it weights expertise and integrity inside the field of equal standing.\n\nSources of positive Axia:\n\n- Demonstrated competence (tests, credentials, published analyses, successful projects)\n- High‑quality contributions in the Pnyx (clear, evidence‑based, solution‑oriented Hypotheses, compromise proposals, honorable, Isotimía-centric arguments, respectful debate)\n- Peer recognition and endorsements across factions\n- Service in roles that passed Dokimazo + clean Euthynia / Sentilea reviews\n\nSources of negative Axia:\n\n- Proven corruption, self‑dealing, or attempts to enclose resources or policies\n- Systematic abuse of processes or misinformation\n- Repeated decorum violations flagged by IsoKratOS\n\nAxia can open doors to certain roles (e.g., Aegides, committee rapporteurs). It can also amplify the citizen\'s voice in relevant domains, giving him or her more weight in specialized deliberations\n\nIt should be noted that Axia: Decays over time if axiatic behavior ends or lapses, to prevent “frozen aristocracies” based on past good works and deeds.'
  },
  {
    id: 'axioktonia',
    name: 'Axioktonia',
    greekName: 'Ἀξιοκτονία',
    blurb: 'Constitutional "reboot" clause for regime failure.',
    complexity: 2,
    category: 'process',
    fullDescription: 'Self-Destruct Clause For Dissolution of Government\n\nFrom Greek: axios (ἄξιος, worthy) + kteinein (κτείνειν, to kill) = "worthy death"\n\nThe self-destruct clause in the Archegramma. Defines when the regime has failed so fundamentally that it must be legally dissolved and rebooted. Jokingly referred to as the \'Jim Phelps Clause\' by α-Team members.\n\nTriggers might include:\n\n- Systematic violation of Isotimía\n- Attempts at factional seizure of any institution or policy\n- Erosion of or direct damage to the Four Isótēs \n- Failure of accountability systems (Logodosia)\n\nProcess: A special Archegramma Dicesis assembly requiring Pampollē Homonoia (an oversized supermajority) and judicial agreement to declare failure and transition to new constitutional convention.'
  },
  {
    id: 'dikaios',
    name: 'DikaiOS',
    greekName: 'Δικαία + OS',
    blurb: 'AI legal system for drafting and compliance.',
    complexity: 2,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: 'AreTéCracy\'s Agentic AI for Assisting Legislation Development\n\nFrom Greek: dikaios (δίκαιος, just/lawful) + Operating System\n\nThe legal and policy operating system. AI-assisted platform for drafting, reviewing, and enforcing laws.\n\nFunctions:\n\n- Psephisma drafting assistance\n- Archegramma compliance checking\n- Loophole detection\n- Enforceability review\n- Drift detection (Aegides deviating from Ekklesia intent)\n- Must be explainable (Alētheia requirement)'
  },
  {
    id: 'dokimazo',
    name: 'Dokimazo',
    greekName: 'Δοκιμάζω',
    blurb: 'Vetting and tempering for civic roles.',
    complexity: 2,
    category: 'process',
    fullDescription: 'Vetting / Tempering\n\nFrom Greek: dokimazein (δοκιμάζειν, to test/examine/approve)\n\nThe vetting process for citizens entering specialized civic roles—magistrates, Aegides, key administrative posts. Combines integrity checks (past corruption, conflicts of interest, pattern of violating Isotimía), competence evaluation where relevant (domain knowledge assessed through testing and portfolios), and Axia review (existing civic merit in relevant domains).\n\nThe Ekklesia approves or vetoes candidate pools, then final selection happens via sortition (random lot) from the approved pool. This prevents both incompetence (anyone can enter) and capture (no one can buy their way in or use factional politics for the final selection).\n\nFor some roles, Dokimazo includes an apprenticeship period with Euthynia at the end of each phase—first to ensure the candidate is ready for full responsibility, then the normal end-of-term audit after their full office term is complete.'
  },
  {
    id: 'ekklesia',
    name: 'Ekklesia',
    greekName: 'Ἐκκλησία',
    blurb: 'The citizen body governing directly.',
    complexity: 1,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: 'The Body of Citizens Making Up an Assembly of the Ekklesia\n\nFrom Greek: ek (ἐκ, out) + kalein (καλεῖν, to call) = “the called‑out ones”\n\nThe body of citizens who are called to exercise direct governance. In classical Athens, all citizens with civic standing could attend, speak, and vote directly on laws and policies. In AreTéCracy, the Ekklesia is the whole civic body; when it convenes, it does so in Assemblies that can be digital, physical, or hybrid.\n\nModern implementation:\n\n- Domain‑specific assemblies (healthcare, defense, economy, education, etc.)\n- Geographic assemblies (city, town, province, region)\n- Coordinated, queued, and moderated through IsoKratOS\n\nAn Assembly is a particular sitting of the Ekklesia. The Pnyx is the space—digital or physical—where Assemblies meet.'
  },
  {
    id: 'euthynia',
    name: 'Euthynia',
    greekName: 'Εὐθυνία / Εὐθῦναι',
    blurb: 'End-of-term audit with real consequences.',
    complexity: 3,
    category: 'process',
    fullDescription: 'Every office-holder faces a rigorous public audit at the end of their term. Good service is rewarded; corruption or negligence brings real consequences.'
  },
  {
    id: 'generational-fairness',
    name: 'Generational Fairness Doctrine',
    greekName: 'GFD',
    blurb: 'Policy must be fair across generations.',
    complexity: 2,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: 'We are stewards, not owners, of our society. Our choices today must not rob future generations of their chance to flourish.'
  },
  {
    id: 'gff',
    name: 'Generational Fairness Fund',
    greekName: 'GFF',
    blurb: 'Mandatory future-protection investment reserve.',
    complexity: 2,
    category: 'institution',
    fullDescription: 'A constitutionally mandated fund that protects future generations by requiring current leaders to invest in long-term sustainability and infrastructure.'
  },
  {
    id: 'glaukos-mati',
    name: 'Glaukós Mati',
    greekName: 'γλαυκόν μάτι',
    blurb: 'Reverse surveillance: watch power, not people.',
    complexity: 3,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: 'The owl-eyed vision to see clearly through complexity and deception. A democracy must be vigilant and perceptive.'
  },
  {
    id: 'graphe-paranomon',
    name: 'Graphē Paranomon',
    greekName: 'Γραφὴ Παρανόμων',
    blurb: 'Citizens can strike unconstitutional proposals.',
    complexity: 3,
    category: 'process',
    fullDescription: 'Any citizen can challenge a proposal as unconstitutional before it becomes law. The ultimate check on majority tyranny.'
  },
  {
    id: 'hephaistia',
    name: 'Hephaistia',
    greekName: 'Ἡφαιστία',
    blurb: 'Distributed productive capacity; anti-monopoly economy.',
    complexity: 2,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: 'For IsoEudaimonia to exist, people must have gainful work. This pillar encourages small businesses, cooperatives, and workshop industriousness while discouraging overly large oligopolies.'
  },
  {
    id: 'homonia',
    name: 'Homonoia',
    greekName: 'Ὁμόνοια',
    blurb: 'Broad-consensus rule; no 51% tyranny.',
    complexity: 2,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: 'Policies should reflect the will of an overwhelming portion of the population, not just 51%. A law that half the population intensely disagrees with is inherently a bad law.'
  },
  {
    id: 'horizon-clauses',
    name: 'Horizon Clauses',
    blurb: 'Future-proof provisions for foreseeable challenges.',
    complexity: 3,
    category: 'concept',
    fullDescription: 'Constitutional provisions that anticipate and plan for foreseeable future challenges—climate change, technological disruption, demographic shifts.'
  },
  {
    id: 'hupodikoi',
    name: 'Hupodikoi',
    greekName: 'Ὑπόδικοι',
    blurb: 'Office-holders are answerable to the people.',
    complexity: 3,
    category: 'concept',
    fullDescription: '#### Accountable to\n\nFrom Greek: hypo (ὑπό, under) + dikē (δίκη, justice) = "answerable/accountable"\n\nAll holders of public office in AreTéCracy are hupodikoi—answerable to the Ekklesia through the full system of Logodosia (Sentilea, Peira, Euthynia). No office is exempt.\n\nOfficials have enhanced responsibility and enhanced accountability, not reduced consequences.'
  },
  {
    id: 'hypothesis',
    name: 'Hypothesis',
    greekName: 'Ὑπόθεσις',
    blurb: 'A citizen\'s initial policy proposal.',
    complexity: 2,
    category: 'process',
    fullDescription: 'Initial Proposed Bill from Ekklesia\n\nFrom Greek: hypo (ὑπό, under) + thesis (θέσις, placing) = "foundation/supposition"\n\nA citizen\'s initial proposal for law or policy. The starting point of Nomothesia. Can come from any citizen, but must pass through:\n\n- Clarity check (is it comprehensible?)\n- Feasibility review (is it possible?)\n- Archegramma compliance (does it violate core principles?)'
  },
  {
    id: 'isegoria',
    name: 'Isegoria',
    greekName: 'Ἰσηγορία',
    blurb: 'Equal right to speak and be heard.',
    complexity: 1,
    category: 'equality',
    hasFullPage: true,
    fullDescription: 'Equal Right to Speak\n\nFrom Greek: isos (ἴσος, equal) + agoreuein (ἀγορεύειν, to speak in the assembly)\n\nOne of the Four Isótēs (pedestals of equal standing). Every citizen has the same formal right to address the Assembly—no matter their wealth, fame, or faction.\n\nIn practice, truly equal voice needs structure, or the loudest and richest (pleonektai) take over.\n\nImplementation in AreTéCracy:\n\n- IsoKratOS manages queues, timeboxing, and topic focus.\n- Session agendas are built from submitted Hypotheses and citizen priorities, there are no parties or party whips.\n- Open‑floor time is queued transparently (first‑come‑first‑served by default, with optional randomization to prevent queue‑gaming).\n- Axia can amplify time for demonstrably informed contributors in a domain—but cannot silence others.\n- Misthos (civic pay) and digital access guarantees ensure that poor or time‑constrained citizens can still show up and be heard.'
  },
  {
    id: 'isoeudaimonia',
    name: 'IsoEudaimonia',
    greekName: 'Ἰσοευδαιμονία',
    blurb: 'Equal right to a human baseline.',
    complexity: 1,
    category: 'equality',
    hasFullPage: true,
    fullDescription: 'Equal Right to Flourish\n\nFrom Greek: isos (ἴσος, equal) + eudaimonia (εὐδαιμονία, flourishing / well‑being)\n\nEqual right to a baseline of eudaimonia, or flourishing. One of the four Isótēs (but not one of the original Greek equalities—IsoEudaimonia is AreTéCracy\'s special addition to the classical trio). It creates a floor under human life below which no citizen is allowed to be pushed or left, but does not guarantee equal outcomes.\n\nIn the Nicomachean Ethics, Aristotle defined eudaimonia as the highest human good, achieved through a life of virtuous activity in accordance with reason.\n\nAreTéCracy holds that, to achieve such a life, people must have the opportunity and wherewithal to do so. Where Thomas Jefferson famously declared “pursuit of happiness” as a human right, AreTéCracy recasts that right as a constitutional guarantee instead of a dream. It\'s not simply a nice idea; it\'s a solid baseline all policy must protect.\n\nIsoEudaimonia seeks economic and social conditions high enough that people are not desperate, disposable, or permanently trapped, so they can realistically and enthusiastically participate in self‑government.'
  },
  {
    id: 'isokratos',
    name: 'IsoKratOS',
    greekName: 'Ἰσοκρατία + OS',
    blurb: 'AI platform for deliberation at scale.',
    complexity: 2,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: 'AreTéCracy\'s AI for Assisting in Civic Delibiration\n\nFrom Greek: isos (ἴσος, equal) + kratos (κράτος, power) + Operating System\n\nThe civic deliberation operating system. AI-powered platform enabling millions to deliberate without descending into chaos or capture.\n\nFunctions:\n\n- Structures debates (prevents thread chaos)\n- Oratory assistance (helps citizens communicate clearly)\n- Axia tracking (domain-specific merit/reputation)\n- Decorum enforcement (Sonder, Philotimo, Alētheia)\n- Session moderation (for both oral and commentary threads)\n- Explainable AI (Alētheia requirement - no black boxes)'
  },
  {
    id: 'isonomia',
    name: 'Isonomia',
    greekName: 'Ἰσονομία',
    blurb: 'Same law for rich and poor.',
    complexity: 1,
    category: 'equality',
    hasFullPage: true,
    fullDescription: 'Equal Standing Under Law\n\nFrom Greek: isos (ἴσος, equal) + nomos (νόμος, law)\n\nOne of the three original pillars of Athenian democracy: equal standing under the law. In AreTéCracy, one of the Four Isótēs.\n\nSame rules apply to everyone—rich or poor, powerful or ordinary. Justice cannot be bought, inherited, or corporatized.\n\nIf the four Isótēs are the foundation pedestals beneath the pillars of AreTéCracy, then Isonomia is the cornerstone pedestal. If that cornerstone cracks, the whole structure tilts toward those who can afford to rig the game.\n\nThink of government as a system running on an operating system written in a programming language called laws. The pleonektai and minotaurs are the hackers. They exploit loopholes, find privilege escalation vulnerabilities, and create different rules for those with money and power. Isonomia is the security architecture that says: No exploits. No root access for sale. Same code executes for everyone.\n\nThere are three domains:\n\n1. Justice - No two-tier legal system, proportional consequences (day-fines), equal access to competent defense\n2. Political Rights - No corporate personhood, no money as speech, executives personally liable for corporate crimes\n3. Commons - Law cannot enclose survival stack or cultural commons as private tollbooths\n\nJust as in IsoEudaimonia there is no "too big to fail," under Isonomia there is no "too big to prosecute."'
  },
  {
    id: 'isarchia',
    name: 'Isarchia',
    greekName: 'Ἰσαρχία',
    blurb: 'Equal command: equal ability and obligation to serve in governance.',
    complexity: 1,
    category: 'equality',
    hasFullPage: true,
    fullDescription: 'Equal Command\n\nFrom Greek: isos (ἴσος, equal) + archē (ἀρχή, rule/governance/command)\n\nOne of the Four Isótēs. The equal ability and obligation of every citizen to participate in and serve the governance of the polis. Isarchia is distinct from the Attic concept of Isokratia (equal power) and more specific than Isopoliteia (equal citizenship) because it emphasizes not just equal rights but equal responsibility — the duty to serve when called.\n\nKey concepts:\n\n- Sortition (selection by lot for civic roles)\n- Dokimazo (vetting for competence, not wealth)\n- Misthos (civic pay, so that serving is possible for all)\n- No permanent political class — every citizen is eligible and obligated'
  },
  {
    id: 'four-isotes',
    name: 'The Four Isótēs',
    greekName: 'Αἱ Τέσσαρες Ἰσότητες',
    blurb: 'The four equalities that enforce standing.',
    complexity: 1,
    category: 'equality',
    hasFullPage: true,
    fullDescription: '#### The Four Equalities\n\nFrom Greek: isos (ἴσος, equal) + -tēs (-της, forming abstract nouns)\n\nThe four equalities that institutionalize Isotimía into structural guarantees. These are the "foundation pedestals" supporting all AreTéCracy systems.\n\n1. Isegoria (Ἰσηγορία) - Equal voice: Right to speak and be heard in civic deliberation\n2. Isonomia (Ἰσονομία) - Equal law: Same rules apply to everyone, justice cannot be bought\n3. Isarchia (Ἰσαρχία) - Equal command: Equal ability and obligation to serve in governance\n4. IsoEudaimonia (Ἰσοευδαιμονία) - Equal flourishing: Material conditions enabling genuine participation'
  },
  {
    id: 'isotimia',
    name: 'Isotímia',
    greekName: 'Ἰσοτιμία',
    blurb: 'Equal civic standing: the bedrock.',
    complexity: 1,
    category: 'concept',
    hasFullPage: true,
    fullDescription: 'Equal Standing\n\nFrom Greek: isos (ἴσος, equal) + timē (τιμή, honor / worth / standing)\n\nThe foundational principle that every citizen has the same civic worth and the same right to shape the shared world—not equal outcomes, but equal standing and access to self‑governance.\n\nIsotimía is the bedrock beneath the Four Isótēs (Isegoria, Isonomia, Isarchia, IsoEudaimonia), and that bedrock\'s geology, or mineral makeup, are the Four Aretai (PRC, Philotimo, Sonder, Alētheia).\n\nWithout Isotimía, human rights disintegrate and people with less wealth or status are quietly treated as less real.\n\nComposed of: The Four Aretai (virtues that create equal standing)  \nInstitutionalized through: The Four Isótēs (structural guarantees)'
  },
  {
    id: 'jr-ekklesia',
    name: 'Junior Ekklesia',
    greekName: 'Jr Ekk',
    blurb: 'Youth assemblies that train real citizens.',
    complexity: 2,
    category: 'institution',
    fullDescription: 'A parallel set of Assemblies for younger citizens that mirrors the adult Ekklesia in structure and spirit, but with age‑appropriate scope and tooling. A critical element in Paideia: instead of being lectured about “democracy,” children and adolescents actually experience what it feels like to propose ideas, listen, argue, revise, and seek Homonoia with their peers.\n\nJunior Ekklesiai use simplified versions of the same core mechanisms as the adult system—agenda‑setting, moderated debate, basic Axia‑style recognition for constructive participation, and feedback from an IsoKratOS‑like platform tuned for learning rather than binding decision‑making. Their resolutions are non‑binding in law, but visible to the main Ekklesia and Aegides, especially on issues that heavily affect future generations. In this way, the voices of those who cannot yet vote still register as a meaningful signal in the system.\n\nThe goal is not to create a “kid parliament” for show, but to raise cohorts of citizens who arrive at full civic standing already familiar with the rhythms of Assemblies, the responsibilities that come with Isotimía, and the expectation that they can be co‑authors of the polis—not spectators or customers—and treat other members with equal standing.'
  },
  {
    id: 'klerosis',
    name: 'Klērōsis',
    greekName: 'Κλήρωσις',
    blurb: 'Sortition: random selection from vetted pools.',
    complexity: 2,
    category: 'process',
    fullDescription: 'Selection by lottery from pools of qualified citizens. Eliminates careerism and ensures representation reflects the actual demos, not just the ambitious.'
  },
  {
    id: 'liturgies',
    name: 'Liturgies',
    greekName: 'Λειτουργίαι',
    blurb: 'Structured civic contributions for public goods.',
    complexity: 2,
    category: 'process',
    fullDescription: 'Formalized contributions of time, resources, or expertise for public benefit. Modern version: those with more give more, but in structured, transparent ways.'
  },
  {
    id: 'logodosia',
    name: 'Logodosia',
    greekName: 'Λογοδοσία',
    blurb: 'Accountability stack: power must show its work.',
    complexity: 2,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: 'A civic contribution mechanism for funding and building public goods—traditionally large, visible works that improve collective capacity (infrastructure, cultural institutions, resilience systems, education, and other shared assets). In AreTéCracy, liturgies can be used in multiple modes, depending on what an Ekklesia chooses:\n\n- Civic Patronage Mode (voluntary): individuals or organizations sponsor major public works as a form of honor, duty, or legacy-building.\n\n- Civic Exchange Mode (policy tool): structured liturgy commitments may reduce or offset certain taxes/fees when they meet transparent criteria, audits, and public-value requirements.\n\n- Restorative Mode (behavior correction): when wealth/power has been gained through extraction or distortion of the commons, liturgies become part of a “repair pathway” alongside market-repair measures and fair-share contribution.\n\nGuardrails: Liturgies must be measurable (deliverables + timelines), transparent (public reporting), and non-corruptible (independent audit + conflict rules) so they don’t become legalized bribery.\n\n--- \n\n### Logodosia (Λογοδοσία) ⭐⭐\n\nAccountability / Transparency\n\nFrom Byzantine/Modern Greek: logos (λόγος, account/reckoning) + didomi (δίδωμι, to give)\n\nThe accountability stack. The goal of Logodosia is transparency and Alētheia—ensuring those who hold power operate in the light, not in shadow.\n\nAll public servants are hupodikoi (ὑπόδικοι, answerable) to the Ekklesia. Power comes with enhanced responsibility and enhanced scrutiny, not immunity.\n\nFour accountability layers:\n\nLayer 1 - Glaukós Mati (Reverse Surveillance): Cameras pointed UP at government, not down at citizens. Creates tamper-evident records of official conduct. Designed to create complete transparency and prevent corruption by monitoring public offices\n\nLayer 2 - Sentilea (Συντέλεια): Regular in-term reporting to Ekklesia, verified against surveillance records\n\nLayer 3 - Peira (Πεῖρα): Triggered investigations when problems arise, using evidence from surveillance and reports\n\nLayer 4 - Euthynia (Εὐθυνία): End-of-term comprehensive audit drawing on all previous layers\n\nOfficials who serve with integrity have nothing to fear from transparency. Those who abuse power have nowhere to hide.'
  },
  {
    id: 'minotaur',
    name: 'Minotaur',
    greekName: 'Μινώταυρος',
    blurb: 'The captured "professional politician" archetype.',
    complexity: 1,
    category: 'concept',
    fullDescription: 'Corrupted Professional Politician\n\nFrom Greek myth: half-human, half-bull creature that demanded human sacrifice\n\nIn AreTéCracy: a public servant who serves two masters—the people (to get reelected) and the pleonektai (to get funded). Metaphorically neither fully human citizen nor fully captured beast, the minotaur represents the corrupted professional politician who can no longer serve either role honestly.\n\nModern example: Politicians who must serve donors to afford campaigns, while pretending to serve constituents.'
  },
  {
    id: 'misthos',
    name: 'Misthos',
    greekName: 'Μισθός',
    blurb: 'Civic pay for civic duty.',
    complexity: 3,
    category: 'concept',
    fullDescription: 'Civic Pay in a Reciprocal Citizenship\n\nFrom misthós (μισθός), meaning wage, pay, or recompense. \n\nIn classical Athens, Misthos was the payment citizens received for performing civic duties—serving on juries, attending the Ekklesia, or holding certain administrative offices. It was introduced so that participation in democracy was not limited to those rich enough to lose a day\'s work.\n\nIn AreTéCracy, Misthos is the economic expression of reciprocal citizenship. The polis asks more than passive voting: it expects citizens to participate regularly in Assemblies, accept sortition when called, and contribute to deliberation and oversight. In return, the system provides compensation and economic support so that this participation is genuinely possible for everyone, not just for those with spare time and money.\n\nMisthos is therefore not charity, welfare or any form of UBI. It is the earned remuneration for fulfilling civic obligations—the income side of IsoEudaimonia. Oikonomia defines the overall rules for how resources flow; Misthos is one of the key channels that turns those rules into actual time, food, and shelter for citizens who are doing the work of self‑government.'
  },
  {
    id: 'nomos',
    name: 'Nomos',
    greekName: 'Νόμος',
    blurb: 'Canon law: passed and certified.',
    complexity: 3,
    category: 'concept',
    fullDescription: 'Law that has successfully passed through the full deliberative process and stands as binding canon. Not mere decree, but tested and validated law.'
  },
  {
    id: 'nomothetesis',
    name: 'Nomothetēsis',
    greekName: 'Νομοθέτησις',
    blurb: 'The full pipeline from idea → law.',
    complexity: 2,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: 'Process of Creating Legal Policies\n\nFrom Greek: nomos (νόμος, law) + thesis (θέσις, placing/setting)\n\nThe lawmaking pathway from citizen idea to enacted law.\n\nQuick outline of process:\n\n1. Hypothesis (Ὑπόθεσις) - Citizen proposes idea\n2. Thérmansis (Θέρμανσις) - Vetting and tempering of the proposal\n3. Deliberation - Ekklesia debate via IsoKratOS\n4. Aegides drafting - Legal professionals craft precise language via DikaiOS to create a Psephisma\n5. Ratification - Ekklesia votes (Homonoia threshold if major)\n   ---OR ---\n6. Iteration -  If the vote fails to reach Homonoia, the Ekklesia works to negotiate compromise, changes to address concerns of minorities, etc., or proposes software development-style methods for discovery, such as A/B testing or limited pilots in small areas, then returns Hypothesis to Aegides.\n7. Psephisma becomes Nomos (canon) - Enacted law with rationale documented'
  },
  {
    id: 'oikonomia',
    name: 'Oikonomia',
    greekName: 'Οἰκονομία',
    blurb: 'How resources flow to sustain citizenship.',
    complexity: 2,
    category: 'concept',
    fullDescription: 'Management of Resources and Funding\n\nFrom oikos (οἶκος, household) + nemein (νέμειν, to manage, distribute, apportion).\n\nOriginally “household management”; in the classical view it meant much more than kitchen‑table budgeting. An action was considered economically rational only when taken toward a praiseworthy end—above all, living as a philosopher or as an active participant in the life of the polis. \n\nResources were to be managed so that human beings could actually live as citizens, not merely survive.\n\nIn AreTéCracy, Oikonomia is the framework for how a community organizes production, exchange, and public finance so that Isotimía can function. It shapes how the polis raises revenue, funds the Survival Stack (food, water, energy, healthcare, communications, etc.), invests in future generations, and prevents pleonexia.\n\nA key part of Oikonomia is Misthos—the practice of compensating citizens for time spent in civic duty (jury service, Assembly participation, Therapon and Magistrate roles), so that democratic participation is not reserved for the independently wealthy. In short: economic security is tied to reciprocal citizenship. You receive a baseline that lets you live as a citizen, and in return you are expected to show up for the Ekklesia, accept civic service when called, and contribute to the common good.\n\nAreTéCracy does not dictate a single tax regime or redistribution scheme. Specific choices—progressive tax structures, European-style proportional fines based on income (“day fines”), public options in key sectors, surplus rules feeding a Generational Fairness Fund, and so on—are left to each Ekklesia to design and refine. The AreTéCracy α‑team’s role is to offer historically informed options and model policies any Ekklesia can adopt or adapt, not to hand down economic dogma.'
  },
  {
    id: 'ostrakismos',
    name: 'Ostrakismos',
    greekName: 'Ὀστρακισμός',
    blurb: 'Remove dangerously concentrated power—last resort.',
    complexity: 2,
    category: 'process',
    fullDescription: 'The nuclear option: voting to exile someone who has accumulated too much power or influence. A safety valve against would-be tyrants.'
  },
  {
    id: 'paideia',
    name: 'Paideia',
    greekName: 'Παιδεία',
    blurb: 'Lifelong civic education: citizens made, not born.',
    complexity: 2,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: 'Education as Duty\n\nFrom paideia (παιδεία), meaning holistic upbringing, education, and cultural formation. \n\nFor the Greeks it was never just “school”; it was the whole process by which a person became fit to live as a citizen among other citizens—ethically, intellectually, and aesthetically.\n\nIn AreTéCracy, Paideia is the lifelong project of forming people who can actually live in Areté. It includes critical thinking, media literacy, basic economics, history, rhetoric, philosophy, and the Aretai: \n\n* Sonder and Philotimo — developing the habit of seeing other people as real and wanting to help them,\n\n* PRC — the moral duty to serve democracy in order to protect it, and\n\n* Alētheia — to be transparent and honest in all dealings.\n\nPaideia is not confined to formal schooling. It runs through public media, cultural institutions, civic games and simulations, and the way families and communities are supported in raising children who can one day sit in the Ekklesia without being manipulated by demagogues or algorithms.\n\nA key expression of Paideia in AreTéCracy is the Junior Ekklesia: a parallel set of Assemblies for younger citizens mirroring the structures of the adult Ekklesia in age‑appropriate form. There, children and adolescents learn how to deliberate, disagree, seek Homonoia, and see the consequences of policy choices in simulated or low‑stakes environments. Junior deliberations do not directly bind adult law, but their outcomes and perspectives are relayed to the main Ekklesia and can inform debate, especially on long‑horizon issues like climate, education, and generational fairness.'
  },
  {
    id: 'peira',
    name: 'Peira',
    greekName: 'Πεῖρα',
    blurb: 'Triggered investigations when officials screw up.',
    complexity: 3,
    category: 'process',
    fullDescription: 'Investigative Hearing of an Official\n\nFrom Greek: peira (πεῖρα, trial/attempt/experience)\n\nThird layer of Logodosia accountability.\n\nTriggered investigation by Ekklesia when something goes wrong. Launched by:\n\n- Whistleblowers\n- Anomalies in surveillance logs\n- Ekklesia concern\n- Failed Sentilea metrics'
  },
  {
    id: 'philotimo',
    name: 'Philotimo',
    greekName: 'Φιλότιμο',
    blurb: 'Honor-driven duty to the common good.',
    complexity: 1,
    category: 'virtue',
    hasFullPage: true,
    fullDescription: 'The love of honor that drives citizens to serve the common good, not for personal gain but for the dignity of doing what is right.'
  },
  {
    id: 'pleonektai',
    name: 'Pleonektai',
    greekName: 'Πλεονέκται',
    blurb: 'Oligarchs and would-be oligarchs.',
    complexity: 2,
    category: 'concept',
    fullDescription: 'Those who always want more—the greedy, the power-hungry, the ones who would turn democracy into oligarchy if given the chance.'
  },
  {
    id: 'prc',
    name: 'Plato\'s Roll Call',
    greekName: 'PRC',
    blurb: 'The duty to participate or be ruled.',
    complexity: 1,
    category: 'virtue',
    hasFullPage: true,
    fullDescription: 'This one line sits at the heart of AreTéCracy\'s moral architecture:\n\n"The greatest penalty for refusing to rule is to be ruled by someone worse."\n— Plato, Republic 347c\n\nIn Greek:\nτῆς δὲ ζημίας μεγίστη τὸ ὑπὸ πονηροτέρου ἄρχεσθαι, ἐὰν μὴ αὐτὸς ἐθέλῃ ἄρχειν.\n\nIn AreTéCracy, PRC is not just our favorite quote; it is one of the Four Aretai that lie beneath Isotimía: equal standing. It is the reminder that equal standing means equal responsibility, not just equal entitlements. Every citizen is "on call" to contribute—whether in the Pnyx, the Junior Ekklesia, the Aegides, or any Therapon duty. The system is designed so that answering that call is possible and supported, but PRC is the part that says: it is also morally obligatory.\n\nWe call this passage "Plato\'s Roll Call" because it names the cost of not showing up. It warns that if people of conscience avoid responsibility, they will be ruled by those with less conscience—and so will their children. In our minds, this is the heart of what is wrong with representative "democracy": you hand your duty to someone else. History says that, in almost every case, at some point they will abuse it.\n\nIn the surrounding passage, Socrates is clear: the truly good do not want to rule for money, honor, or pleasure. They want to be "seen to be forced" into office so no one can say they took the job for gain. But Plato writes they must still accept it, because refusing to serve leaves the polis to worse rulers. So it\'s Déontological, in the sense that you do your civic duty not because you enjoy power, but because failing to do it is itself a moral failure.\n\nTwo related Greek ideas sit under this:\n\n• Déon (δέον) — "that which is binding / what must be done"; duty or moral necessity.\n• Érgon (ἔργον) — "work, function, proper task"; the distinctive work that belongs to a person or role.\n\nRead together, PRC implies that:\n\nIt is your déon (moral duty) to participate in the ergon (proper task) of governing, or you and those you care about will ultimately live under tyranny.\n\nPRC is the sentence we point to whenever someone asks, "Why should I bother? Why not let others handle politics?" Its answer: "Because if you don\'t accept the role, history shows exactly the kind of people that will."'
  },
  {
    id: 'pnyx',
    name: 'Pnyx',
    greekName: 'Πνύξ',
    blurb: 'The assembly space: digital/physical decision-room.',
    complexity: 2,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: 'The physical and digital spaces where citizens gather to deliberate. Democracy requires real forums for genuine dialogue.'
  },
  {
    id: 'psephisma',
    name: 'Psephisma',
    greekName: 'Ψήφισμα',
    blurb: 'Final bill text ready for vote.',
    complexity: 2,
    category: 'process',
    fullDescription: 'The refined, final version of a proposal ready for the assembly\'s vote. All the deliberation distilled into actionable text.'
  },
  {
    id: 'reverse-surveillance',
    name: 'Reverse Surveillance',
    blurb: 'Transparency aimed upward at power.',
    complexity: 3,
    category: 'concept',
    fullDescription: 'The panopticon inverted: constant monitoring of those with power, while protecting the privacy of ordinary citizens.'
  },
  {
    id: 'sentilea',
    name: 'Sentilea / Synteleia',
    greekName: 'Συντέλεια',
    blurb: 'Regular in-term reporting to the people.',
    complexity: 3,
    category: 'process',
    fullDescription: 'Regular Reporting to Ekklesia\n\nFrom Greek: syn (σύν, together) + telos (τέλος, completion/tax) = "joint contribution"\n\nSecond layer of Logodosia accountability.\n\nRegular in-term reporting by every magistrate-level Therapon to Ekklesia.\n\nIncludes:\n\n- Monthly/quarterly performance reports\n- Requests for Ekklesia approval on major decisions\n- Budget transparency\n- Early warning of problems'
  },
  {
    id: 'sonder',
    name: 'Sonder',
    blurb: 'Felt recognition of others\' full humanity.',
    complexity: 1,
    category: 'virtue',
    hasFullPage: true,
    fullDescription: 'The profound realization that every person you pass has a life as complex and vivid as your own. The empathy foundation of democracy.'
  },
  {
    id: 'survival-stack',
    name: 'Survival Stack',
    blurb: 'The essentials no one can be allowed to chokehold.',
    complexity: 2,
    category: 'concept',
    fullDescription: 'The basic necessities—food, water, shelter, energy, healthcare—that must be protected from monopolization and weaponization.'
  },
  {
    id: 'therapon',
    name: 'Therapon',
    greekName: 'Θεράπων',
    blurb: 'Public servant roles, from routine to magistrate.',
    complexity: 3,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: 'Those who govern are servants of the people, not masters. Public office is a sacred trust, not a path to personal enrichment.'
  },
  {
    id: 'thermansis',
    name: 'Thérmansis',
    greekName: 'Θέρμανσις',
    blurb: 'Tempering proposals into enforceable policy.',
    complexity: 2,
    category: 'pillar',
    hasFullPage: true,
    fullDescription: '"Tempering / Refinement"\n\n_From Greek: thermainō (θερμαίνω, to heat/temper)_\n\nThe vetting and refinement process where citizen proposals (Hypothesis) are tempered into legally precise, enforceable laws (Psephismata). Aegides work with DikaiOS to test the proposal for Archegramma compliance, identify loopholes, clarify ambiguities, and preserve the Ekklesia\'s intent while ensuring the law actually does what citizens want it to do.\n\nLike tempering clay tablets—heating and shaping to remove weaknesses and create durability—Thérmansis refines raw ideas into workable policy without changing the fundamental intent.'
  },
  {
    id: 'workshop-economy',
    name: 'Workshop Economy',
    blurb: 'Many small producers beat corporate feudalism.',
    complexity: 2,
    category: 'concept',
    fullDescription: 'An economy of many small-to-medium producers rather than a few mega-corporations. Distributed ownership means distributed power.'
  }
];

// Helper functions
export function getTermById(id: string): GlossaryTerm | undefined {
  return glossaryTerms.find(term => term.id === id);
}

export function getTermsByCategory(category: GlossaryTerm['category']): GlossaryTerm[] {
  return glossaryTerms.filter(term => term.category === category);
}

export function getTermsByComplexity(complexity: 1 | 2 | 3): GlossaryTerm[] {
  return glossaryTerms.filter(term => term.complexity === complexity);
}

export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(term => 
    term.name.toLowerCase().includes(lowerQuery) ||
    term.greekName?.toLowerCase().includes(lowerQuery) ||
    term.blurb.toLowerCase().includes(lowerQuery)
  );
}