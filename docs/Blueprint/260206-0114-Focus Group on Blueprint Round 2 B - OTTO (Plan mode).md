---
name: blueprint-section-design
overview: Design and roll out an engaging Blueprint section and related navigation that visually introduces the AreTéCracy civic operating system to blank users and routes them into deeper engagement (The Tour, Glossary, Nyctimene, etc.).
todos:
  - id: blueprint-prd
    content: Draft a short PRD/spec for Blueprint + Tour IA (goals, user journeys, metrics).
    status: pending
  - id: blueprint-v0
    content: Design and prototype Blueprint v0 with hub + four main loops, basic tooltips, and Start the Tour CTA.
    status: pending
  - id: node-templates
    content: Define and document the standard content/visual template for each node/loop detail view.
    status: pending
  - id: tour-integration
    content: Map each Blueprint loop to specific Tour segments and define deep links and CTAs between them.
    status: pending
  - id: glossary-integration
    content: Design in-context Glossary access from Blueprint/Tour without breaking user flow.
    status: pending
  - id: visual-refinement
    content: Commission or refine production-quality Blueprint art and interactions based on v0 learnings.
    status: pending
  - id: analytics-setup
    content: Specify and implement analytics events for Blueprint and Tour engagement, and review early data with users from both target audiences.
    status: pending
isProject: false
---

# Blueprint Section & Navigation Plan

## 1. Objectives & Success Criteria

- **Primary goal**: Give a "blank user" a clear, intriguing, 30,000‑foot understanding of AreTéCracy as a *buildable system*, and invite them into deeper exploration.
- **Target audiences**:
  - **A1 – Disillusioned Gen‑Z/Millennials**: Feel left behind by current systems; low trust; low tolerance for walls of text; respond to agency, clarity, and emotional resonance.
  - **A2 – Collegiates / structurally-minded adults**: Cognitively see that the system is broken; want a serious, coherent alternative; respond to architecture, rigor, and mechanisms.
- **Success signals (v1)**:
  - From **Home**, a meaningful fraction of first‑time visitors click **The Blueprint** or a "How it works" entry point.
  - On **Blueprint**, visitors interact with at least one node (hover/tap/click) and some continue into **The Tour** or a node’s deeper content.
  - Qualitative tests: users in both A1 and A2 can answer, in their own words, "what this is" and "what problem it’s trying to solve" after 1–2 minutes.

## 2. Overall Information Architecture

- **Top‑level nav direction** (from focus group consensus):
  - `Home` – emotional hook, problem framing.
  - `The Blueprint` – visual map: *"What is this system?"*
  - `The Tour` – guided, interactive journey: *"Show me and convince me"*.
  - `κ.τ.λ. (More)` – lore, Nyctimene, Owl, docs, etc.; deeper engagement.
- **Relationship between Blueprint and Tour**:
  - **Blueprint** shows structure and loops (hub + big balloons).
  - **Tour** shows *why users should care* via stories and interactive sequences (including Nyctimene as a guide after orientation).
  - Each Blueprint node should have a clear affordance to **"jump into the Tour"** at the relevant section.

## 3. Content & Concept Design for Blueprint

- **3.1 Core visual model (v0/v1)**
  - **Center hub**: Pnyx/Ekklesia – "citizen assembly" as *visible core*.
  - **Four primary loops/"balloons"** around hub (v0 scope):
    - Aegis/Thérmansis → Ekklesia loop (protection & care).
    - Therapon/Dokimazo → Ekklesia loop (service & vetting).
    - GlaukÓS Mati/Logodosia → Ekklesia loop (watchdog & transparency).
    - Paideia/Generational Fairness/Jr. Ekklesia → Ekklesia loop (education & succession).
  - **Future stubs**: visually mark additional nodes (Hephaistia, Workshop Economy, Misthos, etc.) as "coming" without overloading v0.
- **3.2 Language strategy (Sonny + Neo + Lex)**
  - **English‑first labels, Greek as secondary**:
    - Primary label: plain English (e.g., "Accountability Loop").
    - Secondary: Greek name as subtitle or tooltip (e.g., "Glaukós Mati / Logodosia").
  - Each node/balloon uses a **strict microcopy template**:
    - **1‑line purpose** ("What this loop does for you").
    - **1‑line painkiller** (Neo’s "what changes in my life" – e.g., "Stops 51% whiplash" / "Prevents capture" / "Builds stable futures").
    - Optional: 2–3 bullets or a short paragraph in the deeper view.
- **3.3 Progressive disclosure**
  - First view: **only hub + four big loops**, minimal text, strong labels.
  - Hover/tap on a node: tooltip with the microcopy above.
  - Click: open a **detail panel or section** with:
    - Short narrative tying the loop to a real pain point for A1 and A2.
    - A simple mini‑diagram or animation of the feedback loop.
    - A clear button: **"See this in The Tour"** (deep link).

## 4. Interaction & UX Principles

- **4.1 Blueprint page behavior**
  - Works on both pointer and touch:
    - Hover → tooltip; tap on mobile → show tooltip; second tap → open detail.
  - The map is **never a dead-end**:
    - Global CTA in or near the map: "Start the Tour".
    - Per‑node CTA: "See how this loop works" / "Jump into the Tour at this loop".
- **4.2 Avoiding pitfalls called out by the group**
  - **Pretty infographic that explains nothing** (Neo, Lex, Otto):
    - Every node must complete the sentence: **"This exists so that..."** in concrete, user‑level terms.
    - No diagram element is purely decorative; each corresponds to a mechanism users will see in The Tour.
  - **Greek overload**:
    - Never require understanding a Greek term to grasp the map.
    - Greek appears as flavor and deep link to Glossary, not as a gate.
  - **Blueprint vs. marketing**:
    - Blueprint is factual and system‑oriented; The Tour carries more narrative/emotional weight.
- **4.3 Integration with Glossary and other content**
  - From any node detail, Greek term or key concept text should be **clickable** to open:
    - Either a side panel with the Glossary entry, or
    - A new tab on Glossary pre‑filtered to that entry.
  - Ensure users never have to leave Blueprint/Tour context completely just to look up a term.

## 5. Nyctimene & κ.τ.λ. Placement

- **Nyctimene**:
  - Avoid using Nyctimene as a "lore gate" before people understand the basics (Neo, Otto, Lex).
  - Recommended flow:
    - Home may feature subtle owl imagery / small "Who is the Owl?" link.
    - **The Tour**: Nyctimene appears as a *guide* once the user grasps "what this is".
    - Full story and deeper lore live under κ.τ.λ. with cross‑links from Tour.
- **κ.τ.λ. (More)**:
  - Keep it, but ensure affordances (chevron, hover state) make it obviously a dropdown.
  - Contents: Glossary, Nyctimene/Owl, white paper, dev notes, etc.

## 6. Execution Phasing (Spec & Iteration)

### 6.1 Phase 0 – Product spec & success metrics (your "spec" step)

- Write a short **Product Requirements Doc (PRD)** for Blueprint + Tour IA:
  - Problem statement (blank user, two target audiences).
  - Goals and non‑goals.
  - Key user journeys:
    - Home → Blueprint → node → Tour.
    - Home → Tour (Nyctimene intro) → Blueprint.
  - Success metrics:
    - % of new visitors who visit Blueprint.
    - % who interact with ≥1 node.
    - % who proceed to Tour from Blueprint.
    - Qualitative comprehension from a small user test (can they retell what AreTéCracy is and name one loop?).
- This is essentially the modern version of the specs you remember: still very relevant, but shorter, outcome‑focused, and built to support iterative releases.

### 6.2 Phase 1 – Blueprint v0 (four loops, minimal detail)

- Implement a first version with:
  - Center hub + four major loops only.
  - Tooltips with 1–2 sentences each and simple CTAs.
  - A single "Start the Tour" button from the page.
- Use this to test:
  - Do users understand the hub‑and‑loops idea at all?
  - Which loops attract the most curiosity (for prioritizing deeper work)?

### 6.3 Phase 2 – Deeper node details & Tour integration

- For each primary loop:
  - Create a consistent **detail pattern** (Lex’s template):
    - Short purpose + painkiller summary.
    - Mini diagram / illustration of the loop.
    - 3–4 bullets on how it protects users or fixes a failure mode.
    - Button: "Enter the Tour here" → deep link into relevant Tour step.
- Ensure The Tour’s structure can be deep‑linked and can explain in narrative form *why* each loop matters.

### 6.4 Phase 3 – Visual refinement & extended nodes

- Upgrade from playground visuals to **production design**:
  - Professional pass on the Blueprint art (avoid conspiracy‑chart vibes; keep clean and modern).
  - Animations/transitions tuned to feel deliberate, not noisy.
- Add additional balloons/nodes (Hephaistia, Misthos, etc.) as the Tour and Glossary content for them is ready.

### 6.5 Phase 4 – Measurement, A/B and iteration

- Instrument page with analytics:
  - Events: nav clicks, node hovers/clicks, Tour entry from each node, Glossary opens from Blueprint.
  - Funnel views: Home → Blueprint → Tour → downstream engagement (e.g., signups, JOIN US, time on site).
- Optionally A/B:
  - Copy on node summaries (e.g., more emotional vs. more technical lines).
  - Positioning/wording of CTAs ("Start the Tour" vs. "See how this works").
- Use data + 4–6 person qualitative interviews from both A1 and A2 to refine wording and layout.

## 7. How This Relates to Modern Software Management

- **Your old process still maps well**: gather user needs → write spec with clear acceptance criteria → build → test against criteria.
- Modern best practice adds:
  - **Outcome‑focused PRDs** instead of huge specs (what user problem, what success looks like, constraints).
  - **Iterative vertical slices**: ship Blueprint v0 with four loops first, then deepen; don’t wait for the fully annotated system map.
  - **Instrumentation from day one**: define events/metrics in the spec and wire them when you build, so you can see if Blueprint actually improves engagement.
  - **Design + copy as first‑class citizens**: treat the microcopy templates and visual hierarchy as part of the spec, not afterthoughts.

In short: yes, your spec‑and‑milestones instinct is still right, but paired with staged releases (v0 → v1 → v2) and explicit engagement metrics, it will let the team move quickly while still being rigorous.