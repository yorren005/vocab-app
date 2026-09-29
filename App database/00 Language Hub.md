---
cssclasses:
  - hide-inline-title
  - wide
aliases:
  - Language Hub
  - Language
  - Grand Corpus
tags:
  - hub
  - moc
  - language
  - dashboard
status: learning
---

# 🏛️ Unified Language & Philology Hub

> [!abstract] Grand Corpus Architecture & Study Sanctuary
> Welcome to the unified knowledge vault. This hub connects foundational English grammar, scholarly rhetoric, the expansive expressive lexicon, and classical Greco-Roman root morphology into a singular, synchronized learning ecosystem.
> 
> *Navigate to any discipline below, track cross-vault mastery in real time, or jump directly into active study triage queues.*

---

## 📈 Cross-Vault Telemetry HUD

```dataviewjs
// Inject and always synchronize Apple/Zen HUD styles for Light & Dark modes
let s = document.getElementById('hub-telemetry-css');
if (!s) {
    s = document.createElement('style');
    s.id = 'hub-telemetry-css';
    document.head.appendChild(s);
}
s.textContent = `
    :root, .theme-light, .theme-dark {
        --hub-bg-card: var(--zen-bg-card, var(--background-secondary));
        --hub-bg-subtle: var(--zen-bg-subtle, var(--background-primary));
        --hub-border: var(--zen-border, var(--background-modifier-border));
        --hub-border-subtle: var(--zen-border-subtle, rgba(128, 128, 128, 0.18));
        --hub-ink: var(--zen-ink, var(--text-normal));
        --hub-muted: var(--zen-muted, var(--text-muted));
        --hub-faint: var(--text-faint, #64748b);
        --hub-green: var(--zen-moss, #30D158);
        --hub-amber: var(--zen-ochre, #FF9F0A);
        --hub-red: var(--zen-vermillion, #FF453A);
        --hub-blue: #0A84FF;
        --hub-purple: #BF5AF2;
        --hub-teal: #64D2FF;
    }
    .hub-hud-card {
        background: var(--hub-bg-card) !important;
        border: 1px solid var(--hub-border) !important;
        border-radius: 12px;
        padding: 24px;
        margin: 16px 0 28px;
        box-shadow: var(--zen-shadow, 0 4px 16px rgba(0, 0, 0, 0.06));
    }
    .hub-discipline-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 14px;
        margin-top: 20px;
    }
    .hub-discipline-box {
        background: var(--hub-bg-subtle) !important;
        border: 1px solid var(--hub-border) !important;
        border-radius: 8px;
        padding: 16px 18px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .hub-discipline-box:hover {
        transform: translateY(-2px);
        border-color: var(--hub-muted) !important;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.10);
    }
    .hub-bar-track {
        height: 7px;
        background: var(--hub-border-subtle);
        border-radius: 999px;
        display: flex;
        overflow: hidden;
        width: 100%;
    }
    .hub-bar-learned { background: var(--hub-green); }
    .hub-bar-learning { background: var(--hub-amber); }
    .hub-bar-unread { background: transparent; }
`;

// 1. Gather discipline datasets
const basicPages = dv.pages('"Basic English"').where(p => p.file.folder.replace(/\\/g, '/').split('/').length >= 3);
const advPages = dv.pages('"Advanced english"').where(p => p.file.name !== "Advanced english" && p.file.name !== "Advanced English Progress" && !p.file.name.startsWith("Module "));
const vocabPages = dv.pages('"English vocabulary master"').where(p => p.cluster && p.type !== "cluster_dashboard" && p.type !== "moc");
const greekPages = dv.pages('"Greek roots"').where(p => p.greek_root);
const latinPages = dv.pages('"Latin roots"').where(p => p.latin_root);
const philoPages = dv.pages('"Philosophy"').where(p => { const parts = p.file.folder.replace(/\\/g, '/').split('/'); return parts.length === 2 && p.file.name !== parts[1]; });

function calcStats(pages, fallbackTotal = 0) {
    let t = pages.length;
    if (t === 0 && fallbackTotal > 0) {
        return { total: fallbackTotal, learned: 0, learning: 0, unread: fallbackTotal, pct: "0.0", ingPct: "0.0" };
    }
    let l = 0, ing = 0, u = 0;
    for (let p of pages) {
        if (p.status === "learned") l++;
        else if (p.status === "learning") ing++;
        else u++;
    }
    const pct = t > 0 ? ((l / t) * 100).toFixed(1) : "0.0";
    const ingPct = t > 0 ? ((ing / t) * 100).toFixed(1) : "0.0";
    return { total: t, learned: l, learning: ing, unread: u, pct: pct, ingPct: ingPct };
}

const basicS = calcStats(basicPages, 33);
const advS = calcStats(advPages, 358);
const vocabS = calcStats(vocabPages, 514);
const greekS = calcStats(greekPages, 810);
const latinS = calcStats(latinPages, 782);
const philoS = calcStats(philoPages, 30);

const grandTotal = basicS.total + advS.total + vocabS.total + greekS.total + latinS.total + philoS.total;
const grandLearned = basicS.learned + advS.learned + vocabS.learned + greekS.learned + latinS.learned + philoS.learned;
const grandLearning = basicS.learning + advS.learning + vocabS.learning + greekS.learning + latinS.learning + philoS.learning;
const grandUnread = basicS.unread + advS.unread + vocabS.unread + greekS.unread + latinS.unread + philoS.unread;
const grandPct = grandTotal > 0 ? ((grandLearned / grandTotal) * 100).toFixed(1) : "0.0";

const disciplines = [
    {
        name: "Basic English",
        icon: "🧱",
        tag: "Grammar Engines & Syntax",
        stats: basicS,
        moc: '<a class="internal-link" data-href="Basic English/Basic English">MOC</a>',
        tracker: '<a class="internal-link" data-href="Basic English/Basic English Progress">Progress</a>',
        color: "#D4A359"
    },
    {
        name: "Advanced English",
        icon: "🖋️",
        tag: "Rhetoric & Stylistics",
        stats: advS,
        moc: '<a class="internal-link" data-href="Advanced english/Advanced english">MOC</a>',
        tracker: '<a class="internal-link" data-href="Advanced english/Advanced English Progress">Progress</a>',
        color: "#4D725C"
    },
    {
        name: "Vocabulary Master",
        icon: "👑",
        tag: "Expressive English Lexicon",
        stats: vocabS,
        moc: '<a class="internal-link" data-href="English vocabulary master/English vocabulary master">MOC</a>',
        tracker: '<a class="internal-link" data-href="English vocabulary master/Vocabulary Learning Progress">Progress</a>',
        color: "#B58514"
    },
    {
        name: "Greek Roots",
        icon: "🏛️",
        tag: "Hellenic Morphology",
        stats: greekS,
        moc: '<a class="internal-link" data-href="Greek roots/Greek roots">MOC</a>',
        tracker: '<a class="internal-link" data-href="Greek roots/Greek Learning Progress">Progress</a>',
        color: "#64D2FF"
    },
    {
        name: "Latin Roots",
        icon: "📜",
        tag: "Classical & Medieval Latin",
        stats: latinS,
        moc: '<a class="internal-link" data-href="Latin roots/Latin roots">MOC</a>',
        tracker: '<a class="internal-link" data-href="Latin roots/Latin Learning Progress">Progress</a>',
        color: "#C67D5A"
    },
    {
        name: "Philosophy",
        icon: "🦉",
        tag: "Contemplative Inquiries",
        stats: philoS,
        moc: '<a class="internal-link" data-href="Philosophy/Philosophy">MOC</a>',
        tracker: '<a class="internal-link" data-href="Philosophy/Philosophy Progress">Progress</a>',
        color: "#64A0D8"
    }
];

let boxesHtml = "";
for (let d of disciplines) {
    const s = d.stats;
    boxesHtml += `
    <div class="hub-discipline-box">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <div style="font-size:16px; font-weight:800; color:var(--hub-ink); display:flex; align-items:center; gap:6px;">
            <span>${d.icon}</span> <span>${d.name}</span>
          </div>
          <div style="font-size:11px; color:var(--hub-muted); font-weight:500;">${d.tag}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:15px; font-weight:800; color:var(--hub-green); font-family:Georgia, serif;">${s.pct}%</div>
          <div style="font-size:10px; color:var(--hub-muted);">${s.learned} / ${s.total}</div>
        </div>
      </div>
      <div class="hub-bar-track">
        <div class="hub-bar-learned" style="width:${s.pct}%;"></div>
        <div class="hub-bar-learning" style="width:${s.ingPct}%;"></div>
        <div class="hub-bar-unread" style="flex:1;"></div>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--hub-muted); margin-top:2px;">
        <div>🟡 ${s.learning} study · 🔴 ${s.unread} unread</div>
        <div style="display:flex; gap:8px;">
          <span>${d.moc}</span>
          <span>·</span>
          <span>${d.tracker}</span>
        </div>
      </div>
    </div>
    `;
}

dv.paragraph(`
<div class="hub-hud-card">
  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px; border-bottom:1px solid var(--hub-border); padding-bottom:18px;">
    <div>
      <div style="font-size:11px; font-weight:800; letter-spacing:1px; text-transform:uppercase; color:var(--hub-amber); font-family:Georgia, serif;">
        GRAND CORPUS OVERVIEW
      </div>
      <div style="font-size:22px; font-weight:800; color:var(--hub-ink); letter-spacing:-0.3px; margin-top:2px;">
        Cross-Vault Mastery Telemetry
      </div>
      <div style="font-size:12px; color:var(--hub-muted); margin-top:4px;">
        Tracking <strong>${grandTotal}</strong> structured learning nodes across 6 classical, English & philosophical disciplines
      </div>
    </div>
    <div style="display:flex; align-items:center; gap:20px; background:var(--hub-bg-subtle); border:1px solid var(--hub-border); padding:10px 22px; border-radius:10px;">
      <div style="position:relative; width:64px; height:64px; display:flex; align-items:center; justify-content:center;">
        <svg style="width:64px; height:64px; transform:rotate(-90deg);" viewBox="0 0 36 36">
          <path stroke="var(--hub-border-subtle)" stroke-width="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
          <path stroke="var(--hub-green)" stroke-width="3.5" stroke-dasharray="${grandPct}, 100" stroke-linecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style="filter:drop-shadow(0 0 4px rgba(48,209,88,0.35));"/>
        </svg>
        <span style="position:absolute; font-family:Georgia, serif; font-size:13px; font-weight:800; color:var(--hub-ink);">${grandPct}%</span>
      </div>
      <div>
        <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; color:var(--hub-muted); font-family:Georgia, serif;">Grand Dial</div>
        <div style="font-size:17px; font-weight:800; color:var(--hub-green); font-family:Georgia, serif;">${grandLearned} <span style="font-size:12px; font-weight:500; color:var(--hub-muted);">/ ${grandTotal}</span></div>
        <div style="font-size:11px; color:var(--hub-muted);">🟡 ${grandLearning} in-flight · 🔴 ${grandUnread} queue</div>
      </div>
    </div>
  </div>

  <div class="hub-discipline-grid">
    ${boxesHtml}
  </div>
</div>
`);
```

---

## 🏛️ Corpus Architecture & Portals

The vault is divided into **6 core subject disciplines**, each organized with its own dedicated Master Navigation MOC, interactive Progress & Triage Dashboard, and structured hierarchy:

### 1. 🧱 Foundational Grammar: Basic English
> [!abstract] Architectural Scope
> Systematic mastery of essential English syntax, sentence anatomy, word classes, verb conjugations, clause relations, and mechanical punctuation.
- **Master MOC**: [[Basic English/Basic English|Basic English Hub]]
- **Study Triage & HUD**: [[Basic English/Basic English Progress|Basic English Progress Tracker]]
- **4 Core Modules**:
  1. `[[Basic English/1. Word Classes/1. Word Classes|1. Word Classes]]` — Nouns, Pronouns, Adjectives, Adverbs, Determiners, Word Forms.
  2. `[[Basic English/2. Verbs & Tenses/2. Verbs & Tenses|2. Verbs & Tenses]]` — Verb Engines, Concord, Tense/Aspect, Modals, Passive Voice.
  3. `[[Basic English/3. Sentences & Clauses/3. Sentences & Clauses|3. Sentences & Clauses]]` — Skeletons, Relatives, Conditionals, Reported Speech.
  4. `[[Basic English/4. Connectors & Mechanics/4. Connectors & Mechanics|4. Connectors & Mechanics]]` — Prepositions, Conjunctions, Punctuation, Error Repairs.

---

### 2. 🖋️ Scholarly Rhetoric: Advanced English
> [!abstract] Architectural Scope
> Stylistic control, syntactic cadence, academic register, persuasive rhetoric, figures of speech, and narrative craft across 13 thematic modules and 228 modular lessons.
- **Master MOC**: [[Advanced english/Advanced english|Advanced English Hub]]
- **Study Triage & HUD**: [[Advanced english/Advanced English Progress|Advanced English Progress Tracker]]
- **Core Ladder Modules (1–8)**:
  - `[[Advanced english/1. Sentence Expansion/1. Sentence Expansion|1. Sentence Expansion]]`
  - `[[Advanced english/2. Sentence Control/2. Sentence Control|2. Sentence Control]]`
  - `[[Advanced english/3. Natural Spoken English/3. Natural Spoken English|3. Natural Spoken English]]`
  - `[[Advanced english/4. Clear Writing/4. Clear Writing|4. Clear Writing]]`
  - `[[Advanced english/5. Persuasion and Style/5. Persuasion and Style|5. Persuasion and Style]]`
  - `[[Advanced english/6. Figures of Speech/6. Figures of Speech|6. Figures of Speech]]`
  - `[[Advanced english/7. Storytelling and Narrative/7. Storytelling and Narrative|7. Storytelling and Narrative]]`
  - `[[Advanced english/8. Expressive Vocabulary/8. Expressive Vocabulary|8. Expressive Vocabulary]]`
- **Rhetoric & Craft Modules (I–V)**:
  - `[[Advanced english/1. Syntax & Sentence Craft/1. Syntax & Sentence Craft|I. Syntax & Sentence Craft]]`
  - `[[Advanced english/2. Discourse & Flow/2. Discourse & Flow|II. Discourse & Flow]]`
  - `[[Advanced english/3. Rhetoric & Persuasion/3. Rhetoric & Persuasion|III. Rhetoric & Persuasion]]`
  - `[[Advanced english/4. Style, Pragmatics & Society/4. Style, Pragmatics & Society|IV. Style, Pragmatics & Society]]`
  - `[[Advanced english/5. Writing & Editing Craft/5. Writing & Editing Craft|V. Writing & Editing Craft]]`

---

### 3. 👑 Expressive Lexicon: English Vocabulary Master
> [!abstract] Architectural Scope
> High-register Germanic, Norse, Romance, and contemporary loanwords organized into 30 expressive semantic clusters with active usage drills.
- **Master MOC**: [[English vocabulary master/English vocabulary master|Vocabulary Master Hub]]
- **Study Triage & HUD**: [[English vocabulary master/Vocabulary Learning Progress|Vocabulary Progress Tracker]]
- **Exploration Vectors**:
  - Browse by semantic theme: *Nature & Wilderness, Mind & Senses, Motion & Physicality, Conflict & Strategy, Society & Habitation*.
  - Master collocational density and nuanced connotation shifts.

---

### 4. 🏛️ Classical Hellenic Etymology: Greek Roots
> [!abstract] Architectural Scope
> The foundation of philosophical, scientific, biomedical, and abstract English thought across 30 semantic clusters and 810 root dashboards.
- **Master MOC**: [[Greek roots/Greek roots|Greek Roots Hub]]
- **Study Triage & HUD**: [[Greek roots/Greek Learning Progress|Greek Learning Progress Tracker]]
- **Exploration Vectors**:
  - `[[Greek roots/Master Table — Greek Roots|Complete Alphabetical Greek Root Index]]`
  - Core clusters: *Bios, Chronos, Demos, Grapho, Logos, Pathos, Psyche, Techne, Theos*.

---

### 5. 📜 Classical & Medieval Etymology: Latin Roots
> [!abstract] Architectural Scope
> The legal, academic, institutional, and morphological backbone of literary English across 60 semantic clusters and 782+ root dashboards.
- **Master MOC**: [[Latin roots/Latin roots|Latin Roots Hub]]
- **Study Triage & HUD**: [[Latin roots/Latin Learning Progress|Latin Learning Progress Tracker]]
- **Exploration Vectors**:
  - `[[Latin roots/Master Table — Latin Roots|Complete Alphabetical Latin Root Index]]`
  - Core clusters: *Capio, Cedo, Dico, Duco, Facio, Mitto, Pono, Scribo, Sedeo, Voco*.

---

### 6. 🦉 The Contemplative Corpus: Philosophy
> [!abstract] Architectural Scope
> Epistemological justification, formal logic, ontology & metaphysics, philosophy of mind, normative ethics, political legitimacy, and the great historical dialogue of ideas across 7 pure disciplinary pillars.
- **Master MOC**: [[Philosophy/Philosophy|Philosophy Hub]]
- **Study Triage & HUD**: [[Philosophy/Philosophy Progress|Philosophy Progress Tracker]]
- **7 Pure Disciplines**:
  1. `[[Philosophy/1. Epistemology/1. Epistemology|1. Epistemology]]` — Socratic Dialectic, Tripartite JTB, The Gettier Crisis, Skepticism, Rationalism & Empiricism.
  2. `[[Philosophy/2. Logic/2. Logic|2. Logic]]` — Deductive & Inductive Reasoning, Syllogistic Forms, Fallacies of Argumentation.
  3. `[[Philosophy/3. Metaphysics/3. Metaphysics|3. Metaphysics]]` — Platonic Forms, Aristotelian Substance, Free Will & Determinism, The Problem of Universals.
  4. `[[Philosophy/4. Philosophy of Mind/4. Philosophy of Mind|4. Philosophy of Mind]]` — Cartesian Dualism, Physicalism & Functionalism, The Hard Problem of Consciousness, Personal Identity.
  5. `[[Philosophy/5. Ethics/5. Ethics|5. Ethics]]` — Aristotelian Virtue Ethics, Kantian Deontology, Utilitarianism, The Is-Ought Problem.
  6. `[[Philosophy/6. Political Philosophy/6. Political Philosophy|6. Political Philosophy]]` — The State of Nature, Social Contract Theory, Rawlsian Justice, The Tension of Liberty & Authority.
  7. `[[Philosophy/7. History of Philosophy/7. History of Philosophy|7. History of Philosophy]]` — Pre-Socratics & Archē, Hellenistic Stoicism, The Kantian Copernican Turn, Existentialism.

## ⚡ Direct Triage & Active Study Jump Table

| Discipline | Direct MOC | Interactive Progress Tracker | Active In-Flight Triage |
| :--- | :--- | :--- | :--- |
| **Basic English** | [[Basic English/Basic English\|🧱 Basic English]] | [[Basic English/Basic English Progress\|📊 Basic Progress HUD]] | [[Basic English/Basic English Progress#🟡 Lessons Currently In Progress\|🟡 In-Flight Lessons]] |
| **Advanced English** | [[Advanced english/Advanced english\|🖋️ Advanced English]] | [[Advanced english/Advanced English Progress\|📊 Advanced Progress HUD]] | [[Advanced english/Advanced English Progress#🟡 Active Studying Shelf\|🟡 In-Flight Lessons]] |
| **Vocabulary Master** | [[English vocabulary master/English vocabulary master\|👑 Vocab Master]] | [[English vocabulary master/Vocabulary Learning Progress\|📊 Vocab Progress HUD]] | [[English vocabulary master/Vocabulary Learning Progress#🟡 Words In Progress Triage\|🟡 In-Flight Words]] |
| **Greek Roots** | [[Greek roots/Greek roots\|🏛️ Greek Roots]] | [[Greek roots/Greek Learning Progress\|📊 Greek Progress HUD]] | [[Greek roots/Greek Learning Progress#🟡 Roots In Progress Triage\|🟡 In-Flight Roots]] |
| **Latin Roots** | [[Latin roots/Latin roots\|📜 Latin Roots]] | [[Latin roots/Latin Learning Progress\|📊 Latin Progress HUD]] | [[Latin roots/Latin Learning Progress#🟡 Roots In Progress Triage\|🟡 In-Flight Roots]] |
| **Philosophy** | [[Philosophy/Philosophy\|🦉 Philosophy]] | [[Philosophy/Philosophy Progress\|📊 Philosophy Progress HUD]] | [[Philosophy/Philosophy Progress#🟡 Lessons Currently In Dialogue\|🟡 In-Flight Inquiries]] |
| **Content Studio** | [[Content/Content\|🎬 Content Hub]] | [[Content/Short form content/Short form content\|📱 Short Form Studio]] | [[Content/YouTube/YouTube\|▶️ YouTube Studio]] |

---

## 🧭 Daily Scholarly Rhythm & Best Practice

> [!tip] Recommended 20-Minute Daily Cadence
> 1. **Morphological Deep Dive (7 min)**: Study 1 Greek or Latin root dashboard (`learned` ➔ review etymological branches).
> 2. **Lexical Precision (5 min)**: Drill 1 Vocabulary cluster and formulate 2 original sentences.
> 3. **Grammar & Rhetoric (8 min)**: Complete 1 lesson from Basic English (mechanics) or Advanced English (cadence & inversion).
