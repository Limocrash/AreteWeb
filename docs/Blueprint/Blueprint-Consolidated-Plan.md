# Blueprint Section & Navigation Plan (Consolidated)

This document consolidates focus group feedback (Round 1, Round 2 A, Round 2 B) into a single spec with clear definitions of done. Round 2 sources: `260206-0112-Focus Group on Blueprint Round 2 A.md` (Sonny, Neo, Geni, Lex) and `260206-0114-Focus Group on Blueprint Round 2 B - OTTO (Plan mode).md`.

---

## 1. Objectives & Success Criteria

- **Primary goal**: Give a "blank user" a clear, intriguing, 30,000-foot understanding of AreTéCracy as a *buildable system*, and invite them into deeper exploration.
- **Target audiences**:
  - **A1 – Disillusioned Gen-Z/Millennials**: Feel left behind by current systems; low trust; low tolerance for walls of text; respond to agency, clarity, and emotional resonance.
  - **A2 – Collegiates / structurally-minded adults**: Cognitively see that the system is broken; want a serious, coherent alternative; respond to architecture, rigor, and mechanisms.
- **Success signals (v1)**:
  - From **Home**, a meaningful fraction of first-time visitors click **The Blueprint** or a "How it works" entry point.
  - On **Blueprint**, visitors interact with at least one node (hover/tap/click) and some continue into **The Tour** or a node's deeper content.
  - Qualitative tests: users in both A1 and A2 can answer, in their own words, "what this is" and "what problem it's trying to solve" after 1–2 minutes.

---

## 2. Overall Information Architecture

- **Top-level nav** (consensus across Round 1 & 2):
  - `Home` – emotional hook, problem framing.
  - `The Blueprint` – visual map: *"What is this system?"*
  - `The Tour` – guided, interactive journey: *"Show me and convince me"*.
  - `κ.τ.λ. (More)` – lore, Nyctimene, Owl, Glossary, docs, etc.; deeper engagement.
- **Blueprint ↔ Tour**: Blueprint shows structure and loops; Tour shows *why users should care*. Each Blueprint node must offer a clear **"Jump into the Tour"** (or equivalent) CTA to the relevant section.

---

## 3. Content & Concept Design for Blueprint

### 3.1 Core visual model (v0/v1)

- **Center hub**: Pnyx/Ekklesia – "citizen assembly" as *visible core*.
- **Four primary loops/balloons** around hub (v0 scope):
  - Aegis/Thérmansis → Ekklesia loop (protection & care).
  - Therapon/Dokimazo → Ekklesia loop (service & vetting).
  - GlaukÓS Mati/Logodosia → Ekklesia loop (watchdog & transparency).
  - Paideia/Generational Fairness/Jr. Ekklesia → Ekklesia loop (education & succession).
- **Future stubs**: visually mark additional nodes (Hephaistia, Workshop Economy, Misthos, etc.) as "coming" without overloading v0.

### 3.2 Language strategy (Sonny, Neo, Lex)

- **English-first labels, Greek as secondary**: Primary label in plain English (e.g., "Accountability Loop"); Greek name as subtitle or tooltip (e.g., "Glaukós Mati / Logodosia").
- **Strict microcopy per node**:
  - **1-line purpose** – "What this loop does for you."
  - **1-line painkiller** – Neo's "what changes in my life" (e.g., "Stops 51% whiplash" / "Prevents capture" / "Builds stable futures").
  - Supporting text in the second layer: short, diagram-led (see §3.4).

### 3.3 Progressive disclosure

- **Layer 1 (always visible)**: Hub + four big loops; English labels only.
- **Hover/tap**: Tooltip with 1–2 sentences (purpose + painkiller); Greek in tooltip optional.
- **Click**: Open **second-layer view** for that node (see §3.4).

### 3.4 Second layer: one diagram per node (consolidated rule)

**Rule:** Every clickable node/balloon has a **dedicated second-layer diagram** for that loop or mechanism. The second layer is **diagram-first**: the diagram is the primary explanation; text is on the diagram (labels, callouts) or in a tight supporting block. We do not rely on a text-only panel.

- **Rationale**: Keeps "fast, quick, easy" understanding in visual form and avoids "pretty infographic that explains nothing" (Neo, Lex, Otto). Aligns with Neo Round 2 A §5 (Milestone B: "zoomed detail diagram") and Lex Round 2 A "Level 2: Node Detail Views" ("visual loop diagram showing feedback mechanism").
- **Per-node deliverable**:
  - One diagram showing that loop/mechanism (e.g., feedback flow, 3–4 elements max).
  - Text on the diagram or in fixed callouts (not a long paragraph first).
  - Optional: 2–3 bullets or 1–2 sentences below.
  - One CTA: **"See this in The Tour"** (deep link to relevant Tour segment).

**Definition of done for each node:** The node has a second-layer diagram that, with its labels/callouts, allows someone to explain what the loop does and why it matters without reading a paragraph first.

---

## 4. Interaction & UX Principles

- **Blueprint page**: Works on pointer and touch (hover → tooltip; tap → tooltip, second tap → open detail). Map is never a dead-end: global "Start the Tour" CTA and per-node "See this in The Tour" (or equivalent).
- **Pitfalls to avoid**: Every node must answer "This exists so that..." in concrete, user-level terms. No Greek required to grasp the map. Blueprint is factual and system-oriented; Tour carries narrative/emotional weight.
- **Glossary**: Terms in Blueprint/Tour are clickable to open Glossary in a side panel or new tab so users don't leave context (Otto, Lex).

---

## 5. Nyctimene & κ.τ.λ. Placement

- **Nyctimene**: Not a "lore gate" before basics (Neo, Otto, Lex). Home may have subtle owl motif / "Who is the Owl?" link. **The Tour**: Nyctimene as guide after orientation. Full story under κ.τ.λ. with cross-links from Tour.
- **κ.τ.λ. (More)**: Obviously a dropdown (chevron, hover). Contents: Glossary, Nyctimene/Owl, white paper, etc.

---

## 6. Execution Phasing & Definitions of Done

### 6.1 Phase 0 – PRD and success metrics

- **Deliverable**: Short PRD for Blueprint + Tour IA (problem statement, audiences, user journeys, success metrics).
- **Done when**: Metrics are defined (e.g., % visiting Blueprint, % interacting with ≥1 node, % proceeding to Tour; qualitative comprehension test).

### 6.2 Phase 1 – Blueprint v0 (four loops, minimal detail)

- **Deliverable**: Single Blueprint page with hub + four loops, hotspots, tooltips (1–2 sentences each), and "Start the Tour" CTA.
- **Done when**: ≥60% of Blueprint visitors interact with at least one node (hover or click); first-time users can name the hub and one loop from the map alone (Neo Round 2 A §5, Milestone A).

### 6.3 Phase 2 – Second-layer diagrams & Tour integration

- **Deliverable**: For each of the four nodes, a second-layer view that is **diagram-first** (one diagram per node, text on diagram or in callouts), plus short supporting copy and "See this in The Tour" CTA. Tour segments deep-linkable from each node.
- **Done when**: Each of the four nodes has a diagram that passes the test: "Can someone explain what this loop does and why it matters using only the diagram and its labels?" (Neo Round 2 A Milestone B; Lex Level 2.)

### 6.4 Phase 3 – Visual refinement & extended nodes

- **Deliverable**: Production-quality Blueprint art and interactions; optional additional nodes (Hephaistia, Misthos, etc.) as content is ready.
- **Done when**: Visuals are "construction-grade," clean, modern; no conspiracy-chart feel (Sonny, Lex).

### 6.5 Phase 4 – Measurement & iteration

- **Deliverable**: Analytics (nav clicks, node hovers/clicks, Tour entry from Blueprint, Glossary opens); optional A/B on copy and CTAs; qualitative feedback from A1 and A2.
- **Done when**: Funnel and engagement metrics are tracked and reviewed for iteration.

---

## 7. Round 2 Cross-References

| Topic | Round 2 A | Round 2 B (Otto) |
|-------|-----------|------------------|
| Nav: Home \| Blueprint \| Tour \| More | Sonny, Neo, Geni, Lex | §2 |
| Node template / one-line promise | Neo §3, Geni §3 | §3.2, §6.3 |
| **Diagram per node (second layer)** | **Neo §5 Milestone B ("zoomed detail diagram"); Lex "Level 2: Node Detail Views" ("visual loop diagram")** | §3.3, §6.3 |
| English-first, Greek in tooltips | Sonny, Neo §4, Lex | §3.2, §4 |
| Glossary in-context | Lex, Otto Round 1 | §4.3, §6.5 |
| Nyctimene in Tour, not gate | Neo, Lex | §5 |
| Definitions of done / milestones | Neo §5 (Milestones A–D), Sonny phases, Lex phases | §6 |

---

## 8. Todos (for implementation)

- [ ] Draft PRD/spec for Blueprint + Tour IA (goals, user journeys, metrics).
- [ ] Design and prototype Blueprint v0 (hub + four loops, tooltips, Start the Tour CTA).
- [ ] Define and document the standard content/visual template for each node (diagram-first, text on diagram, CTA).
- [ ] Map each Blueprint loop to Tour segments and define deep links and CTAs.
- [ ] Design in-context Glossary access from Blueprint/Tour.
- [ ] Commission or refine production Blueprint art and interactions.
- [ ] Specify and implement analytics events; review with both target audiences.
