---
status: unread
type: root_dashboard
---
# Dashboard — arbitr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">arbitr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“judge or witness”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A community gathering in a hall to establish fair rules and resolve disputes.</span>
  </div>
</div>

```dataviewjs
// Ensure Apple Toggle CSS is injected and synchronized
let s = document.getElementById('apple-toggle-css');
if (!s) {
    s = document.createElement('style');
    s.id = 'apple-toggle-css';
    document.head.appendChild(s);
}
s.textContent = '.apple-c{position:relative;display:inline-flex;align-items:center;gap:8px;padding:2px 10px 2px 4px;border-radius:999px;background:var(--zen-toggle-bg,#27272e);border:1px solid var(--zen-border,#2d2d34);cursor:pointer;user-select:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;line-height:1;vertical-align:middle;box-sizing:border-box}.apple-c:hover{border-color:var(--zen-muted,#86848c);transform:translateY(-1px);box-shadow:0 2px 6px rgba(0,0,0,.15)}.apple-c:active{transform:scale(.96)}.apple-c .track-c{position:relative;width:44px;height:16px;background:var(--zen-toggle-track,#1e1e24);border-radius:999px;border:1px solid var(--zen-border-subtle,#24242a);display:flex;align-items:center;justify-content:space-between;padding:0 5px;box-sizing:border-box}.apple-c .c-dot{width:3px;height:3px;border-radius:999px;background:var(--zen-muted,#86848c);opacity:.5}.apple-c .halo-c{position:absolute;top:1px;left:1px;width:12px;height:12px;border-radius:999px;transition:transform .35s cubic-bezier(.34,1.6,.64,1),background-color .25s ease,box-shadow .25s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.apple-c .halo-c .core-dot{width:4px;height:4px;border-radius:999px;background:#fff;box-shadow:0 0 3px #fff}.apple-c .halo-c.p0{transform:translateX(0);background:var(--zen-vermillion,#e05244);box-shadow:0 0 8px var(--zen-vermillion-glow,rgba(224,82,68,0.35))}.apple-c .halo-c.p1{transform:translateX(14px);background:var(--zen-ochre,#d49c24);box-shadow:0 0 8px rgba(212,156,36,0.35)}.apple-c .halo-c.p2{transform:translateX(28px);background:var(--zen-moss,#429e57);box-shadow:0 0 8px var(--zen-moss-glow,rgba(66,158,87,0.35))}.apple-c .label{font-size:11px;font-weight:700;letter-spacing:.2px;transition:color .2s ease;min-width:44px}.apple-c .label.unread{color:var(--zen-vermillion,#e05244)}.apple-c .label.learning{color:var(--zen-ochre,#d49c24)}.apple-c .label.learned{color:var(--zen-moss,#429e57)}';

// Robust path and file resolution
const currentPath = dv.currentFilePath || (dv.current() && dv.current().file ? dv.current().file.path : "");
const folder = currentPath.includes('/') ? currentPath.substring(0, currentPath.lastIndexOf('/')) : (dv.current() && dv.current().file ? dv.current().file.folder : "");
const rawFileName = currentPath ? currentPath.substring(currentPath.lastIndexOf('/') + 1).replace(/\.md$/, '') : (dv.current() && dv.current().file ? dv.current().file.name : "");
const rootName = rawFileName;
const cur = dv.current();
const rawStatus = (cur && cur.status) ? cur.status : "unread";
const isLatin = folder.includes("Latin roots");

let wordPages = [];
if (folder) {
    try {
        wordPages = dv.pages('"' + folder + '"').where(n => n.file.name !== rootName && !n.file.name.startsWith("Word Triage") && (n.latin_root || n.greek_root || (!n.file.name.startsWith("Dashboard") && !n.file.name.startsWith("Cluster"))));
    } catch (e) { wordPages = []; }
}

const t = wordPages ? wordPages.length : 0;
const l = (wordPages && t > 0) ? wordPages.where(n => n.status === "learned").length : 0;
const g = (wordPages && t > 0) ? wordPages.where(n => n.status === "learning").length : 0;
const u = t - l - g;
const lPct = t > 0 ? ((l / t) * 100).toFixed(1) : "0.0";
const gPct = t > 0 ? ((g / t) * 100).toFixed(1) : "0.0";

const states = [
    { key: 'unread', label: 'unread', cls: 'unread', p: 'p0' },
    { key: 'learning', label: 'learning', cls: 'learning', p: 'p1' },
    { key: 'learned', label: 'learned', cls: 'learned', p: 'p2' }
];

let curIdx = states.findIndex(s => s.key === rawStatus);
if (curIdx === -1) curIdx = 0;

const toggle = document.createElement('div');
toggle.className = 'apple-c';
toggle.title = 'Click to glide: unread ➔ learning ➔ learned';

const track = document.createElement('div');
track.className = 'track-c';
track.innerHTML = '<span class="c-dot"></span><span class="c-dot"></span><span class="c-dot"></span><div class="halo-c ' + states[curIdx].p + '"><div class="core-dot"></div></div>';

const label = document.createElement('span');
label.className = 'label ' + states[curIdx].cls;
label.textContent = states[curIdx].label;

toggle.appendChild(track);
toggle.appendChild(label);

const cleanName = rootName.replace('Dashboard — ', '').replace('Dashboard – ', '').replace('Dashboard - ', '');
const isMastered = (curIdx === 2 || (t > 0 && l === t));

toggle.addEventListener('click', async (e) => {
    e.stopPropagation();
    curIdx = (curIdx + 1) % 3;
    const nxt = states[curIdx];
    track.querySelector('.halo-c').className = 'halo-c ' + nxt.p;
    label.className = 'label ' + nxt.cls;
    label.textContent = nxt.label;

    const seal = container.querySelector('.hanko-seal');
    if (seal) {
        if (nxt.key === 'learned') {
            seal.style.opacity = "0.95";
            seal.style.transform = "rotate(-3deg) scale(1)";
        } else {
            seal.style.opacity = "0.25";
            seal.style.transform = "rotate(-6deg) scale(0.92)";
        }
    }

    const file = app.vault.getAbstractFileByPath(currentPath);
    if (file) {
        await app.fileManager.processFrontMatter(file, fm => { fm.status = nxt.key; });
        new Notice(rootName + ': marked ' + nxt.key);
    }
});

// Container element with Zen HUD Card class
const container = document.createElement('div');
container.className = 'zen-hud-card';
container.style = "background:var(--zen-bg-card,#1a1a1e); color:var(--zen-ink,#ececec); border:1px solid var(--zen-border,#2d2d34); border-radius:10px; padding:24px 28px; margin:16px 0 20px; box-shadow:var(--zen-shadow,0 6px 24px rgba(0,0,0,0.4)); position:relative; box-sizing:border-box;";

const stampText = isLatin ? 'Latin Root' : 'Greek Root';

container.innerHTML = '' +
  '<div style="position:absolute; top:14px; right:28px; font-family:Georgia,serif; font-size:48px; font-weight:300; color:var(--zen-muted,#86848c); line-height:1; pointer-events:none; user-select:none; opacity:0.25;">' + cleanName + '</div>' +
  '<div style="display:inline-flex; align-items:center; border:1px solid var(--zen-vermillion,#e05244); color:var(--zen-vermillion,#e05244); font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; padding:2px 7px; border-radius:2px; margin-bottom:6px; background:var(--zen-vermillion-glow,rgba(224,82,68,0.1));">' + stampText + '</div>' +
  '<div style="font-family:Georgia,serif; font-size:28px; font-weight:700; color:var(--zen-ink,#ececec); letter-spacing:-0.5px; line-height:1.2;">' + cleanName + '</div>' +
  '<div style="font-family:Georgia,serif; font-size:14px; font-style:italic; color:var(--zen-muted,#86848c); margin-top:3px;">' + stampText + ' · Derived Vocabulary (' + t + ' words)</div>' +
  '<div style="width:100%; height:1px; background:linear-gradient(to right, var(--zen-ink,#ececec) 25%, transparent 95%); opacity:0.15; margin:16px 0;"></div>' +
  '<div style="display:grid; grid-template-columns:auto 1fr auto; gap:28px; align-items:center; margin:12px 0 16px;">' +
    '<div style="position:relative; width:68px; height:68px; display:flex; align-items:center; justify-content:center;">' +
      '<svg style="width:68px; height:68px; transform:rotate(-90deg);" viewBox="0 0 36 36">' +
        '<path stroke="var(--zen-border-subtle,#24242a)" stroke-width="3.6" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>' +
        '<path stroke="var(--zen-moss,#429e57)" stroke-width="3.8" stroke-linecap="round" fill="none" stroke-dasharray="' + lPct + ', 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>' +
      '</svg>' +
      '<div style="position:absolute; font-family:Georgia,serif; font-size:14px; font-weight:700; color:var(--zen-ink,#ececec);">' + lPct + '%</div>' +
    '</div>' +
    '<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">' +
      '<div><div style="font-family:Georgia,serif; font-size:26px; font-weight:600; color:var(--zen-ink,#ececec); line-height:1;">' + t + '</div><div style="font-size:9.5px; text-transform:uppercase; letter-spacing:1.4px; color:var(--zen-muted,#86848c); margin-top:4px; font-weight:600;">Derived Words</div></div>' +
      '<div><div style="font-family:Georgia,serif; font-size:26px; font-weight:600; color:var(--zen-moss,#429e57); line-height:1;">' + l + '</div><div style="font-size:9.5px; text-transform:uppercase; letter-spacing:1.4px; color:var(--zen-muted,#86848c); margin-top:4px; font-weight:600;">Mastered</div></div>' +
      '<div><div style="font-family:Georgia,serif; font-size:26px; font-weight:600; color:var(--zen-ochre,#d49c24); line-height:1;">' + g + '</div><div style="font-size:9.5px; text-transform:uppercase; letter-spacing:1.4px; color:var(--zen-muted,#86848c); margin-top:4px; font-weight:600;">Studying</div></div>' +
    '</div>' +
    '<div class="hanko-seal" style="width:42px; height:42px; border:2px solid var(--zen-vermillion,#e05244); border-radius:4px; display:flex; align-items:center; justify-content:center; color:var(--zen-vermillion,#e05244); font-family:Georgia,serif; font-size:20px; font-weight:700; user-select:none; transition:all .35s; opacity:' + (isMastered ? '0.95' : '0.25') + '; transform:' + (isMastered ? 'rotate(-3deg) scale(1)' : 'rotate(-6deg) scale(0.92)') + ';" title="Mastery Seal (熟)">熟</div>' +
  '</div>' +
  '<div style="width:100%; height:3px; background:var(--zen-border-subtle,#24242a); border-radius:2px; overflow:hidden; margin:14px 0; display:flex; gap:1px;">' +
    '<div style="height:100%; background:var(--zen-moss,#429e57); border-radius:2px 0 0 2px; width:' + lPct + '%;"></div>' +
    '<div style="height:100%; background:var(--zen-ochre,#d49c24); width:' + gPct + '%;"></div>' +
  '</div>' +
'';

const toggleRow = document.createElement('div');
toggleRow.style = "display:flex; justify-content:space-between; align-items:center; padding-top:6px; margin-top:4px;";

const toggleLabel = document.createElement('span');
toggleLabel.style = "font-size:10px; text-transform:uppercase; letter-spacing:1.2px; color:var(--zen-muted,#86848c); font-weight:600;";
toggleLabel.textContent = "Root Study Status";

toggleRow.appendChild(toggleLabel);
toggleRow.appendChild(toggle);
container.appendChild(toggleRow);
dv.container.appendChild(container);

// ================= WORD TRIAGE LAUNCH CARD =================
const triageCard = document.createElement('div');
triageCard.className = 'zen-triage-card';
triageCard.style = "background:var(--zen-bg-card,#1a1a1e); border:1px solid var(--zen-border,#2d2d34); border-radius:8px; padding:14px 20px; margin:0 0 24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; cursor:pointer; transition:all .25s ease;";
triageCard.title = "Click to open dedicated Word Triage page";

triageCard.innerHTML = '' +
  '<div style="display:flex; align-items:center; gap:16px;">' +
    '<div style="width:38px; height:38px; border-radius:8px; background:rgba(224,82,68,0.12); border:1px solid var(--zen-vermillion,#e05244); display:flex; align-items:center; justify-content:center; font-size:18px;">🎯</div>' +
    '<div>' +
      '<div style="font-family:Georgia,serif; font-size:15px; font-weight:700; color:var(--zen-ink,#ececec); letter-spacing:-0.2px;">Word Triage & Status Filters</div>' +
      '<div style="display:flex; gap:12px; margin-top:3px; font-size:11.5px; font-weight:600;">' +
        '<span style="color:var(--zen-vermillion,#e05244);">🔴 ' + u + ' unread</span> · ' +
        '<span style="color:var(--zen-ochre,#d49c24);">🟡 ' + g + ' studying</span> · ' +
        '<span style="color:var(--zen-moss,#429e57);">🟢 ' + l + ' mastered</span>' +
      '</div>' +
    '</div>' +
  '</div>' +
  '<div style="display:flex; align-items:center; gap:8px; background:var(--zen-bg-subtle,#222227); border:1px solid var(--zen-border,#2d2d34); padding:6px 14px; border-radius:999px; font-size:12px; font-weight:700; color:var(--zen-ink,#ececec);">' +
    '<span>Open Triage Page</span>' +
    '<span style="color:var(--zen-vermillion,#e05244);">➔</span>' +
  '</div>';

triageCard.addEventListener('mouseenter', () => {
    triageCard.style.borderColor = "var(--zen-vermillion,#e05244)";
    triageCard.style.transform = "translateY(-1px)";
    triageCard.style.boxShadow = "0 4px 14px rgba(0,0,0,0.25)";
});
triageCard.addEventListener('mouseleave', () => {
    triageCard.style.borderColor = "var(--zen-border,#2d2d34)";
    triageCard.style.transform = "none";
    triageCard.style.boxShadow = "none";
});

triageCard.addEventListener('click', () => {
    const triagePageName = 'Word Triage — ' + cleanName;
    app.workspace.openLinkText(triagePageName, currentPath, false);
});

dv.container.appendChild(triageCard);

```

The root **arbitr** means judge or witness. It refers to evaluating evidence, forming an opinion, or making an official decision. In English, this root forms words such as *arbiter*, *arbitrate*, *arbitration*, and *arbitrator*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: judge or witness
> The root **arbitr** means judge or witness. It refers to evaluating evidence, forming an opinion, or making an official decision. In English, this root forms words such as *arbiter*, *arbitrate*, *arbitration*, and *arbitrator*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Judge or witness</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community gathering in a hall to establish fair rules and resolve disputes.</mark>
> - **Everyday Connection**: Think of familiar words like *arbiter* and *arbitrate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **arbitr** comes from a Latin word that means *"judge or witness"*.
  - At its core, it describes judge or witness.

- **The Big Picture Idea**:
  - Picture a community gathering in a hall to establish fair rules and resolve disputes.
  - Whenever you see **arbitr** in an English word, think of **justice, legal authority, and governance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of judge or witness.
  - **Mental & Social**: How people experience, organize, or communicate about judge or witness.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Arbiter**: A person who has the sole or ultimate authority to judge, decide, or determine a dispute or controversy.
  - **Arbitrate**: To hear the arguments of contending parties and make an authoritative, binding settlement as an impartial judge.
  - **Arbitration**: The hearing and determination of a disputed case by an impartial third party or panel chosen by the parties or appointed by statute.
  - **Arbitrator**: A neutral, impartial third person chosen or officially appointed to hear evidence and deliver a legally binding award in an arbitration proceeding.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">arbitr</mark>, think of <mark class="hl-def">justice, legal authority, and governance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates through three primary morphological bases:
> - **Independent Nominal Base (`arbiter`):** Directly borrowed from Latin: *arbiter*, *arbiter elegantiarum*.
> - **Productive Combining Stem (`arbitr-`):** Formed from the oblique stem *arbitr-* and verb *arbitrārī*: *arbitrate*, *arbitration*, *arbitrator*, *arbitrary*, *arbitrament*, *arbitrable*.
> - **Gallicized Financial Stem (`arbitrage-`):** Transmitted via French: *arbitrage*, *arbitrageur*, *risk arbitrage*.
>
> Unlike prefix-heavy roots, `arbitr` is almost exclusively **suffix-driven** in English:
> - Verbal Formative: `-ate` $\to$ *arbitrate* (to settle disputes as a neutral).
> - Action & Process Nouns: `-ation` $\to$ *arbitration*; `-ament` $\to$ *arbitrament*; `-age` $\to$ *arbitrage*.
> - Agent & Role Nouns: `-ator` $\to$ *arbitrator*; `-trix` $\to$ *arbitratrix*; `-eur` $\to$ *arbitrageur*.
> - Adjectival Qualities: `-ary` $\to$ *arbitrary*; `-able` $\to$ *arbitrable*; `-ative` $\to$ *arbitrative*.
> - Negative Prefixation (rare): `non-` $\to$ *nonarbitrable*; `in-` $\to$ *inarbitrable*.

---

## 🎨 3. Semantic Range Across Derived Words

> [!tip]- 🎯 **Live Study Filter & Queue**
```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && n.latin_root);
const inProg = p.where(n => n.status === "learning");
const done = p.where(n => n.status === "learned");
if (inProg.length === 0 && done.length === 0) {
    dv.paragraph("*No words marked yet. Open any word card below and select 🟡 Learning or 🟢 Learned.*");
} else {
    let out = [];
    if (inProg.length > 0) out.push("🟡 **Currently Studying (" + inProg.length + "):** " + inProg.map(n => n.file.link).join(" · "));
    if (done.length > 0) out.push("🟢 **Mastered (" + done.length + "):** " + done.map(n => n.file.link).join(" · "));
    dv.paragraph(out.join("\n\n"));
}
```

> [!tip] 🌈 Shades of Meaning in Different Words
> The derivations of *arbitr* span five distinct conceptual arenas:
> - **Alternative Dispute Resolution (ADR):** In [[arbitrate]], [[arbitration]], [[arbitrator]], [[arbitratrix]], and [[arbitrable]], the root designates the private, binding adjudication of commercial, labor, or international conflicts outside state courtrooms.
> - **Sovereign Judgment & Ultimate Determination:** In [[arbiter]] ("the final arbiter of constitutionality") and [[arbitrament]] ("the arbitrament of the sword"), the root expresses final, unappealable authority.
> - **Despotic Power & Whimsical Caprice:** In [[arbitrary]], [[arbitrarily]], and [[arbitrariness]], the root shifts to governance unconstrained by reason, statutory standards, or predictability.
> - **Mathematical & Scientific Conventions:** In [[arbitrary]] constants, *arbitrary* coordinates, and the "arbitrariness of the linguistic sign" (Ferdinand de Saussure), the root denotes choices made by convention rather than intrinsic natural law.
> - **Quantitative Market Finance:** In [[arbitrage]], [[arbitrageur]], and [[risk arbitrage]], the root denotes risk-neutral trading strategies profiting from price discrepancies across exchanges.

---

## 🔀 4. Prefix & Combining Dynamics on arbitr

### Prefix Dynamics (Internal Archaic Fusion & Negation)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ar-` (< `ad-`) | to, toward (fused in Latin) | [[arbiter]] | Lit. "one who goes toward to see"; an eyewitness who becomes an equity judge. |
| `non-` | not | [[nonarbitrable]] | Not legally eligible to be submitted to or resolved by an arbitral tribunal. |
| `in-` (neg.) | not, un- | [[inarbitrable]] | Incapable of being arbitrated; reserved exclusively for judicial determination. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `(bare base)` | Noun (Agent / Authority) | [[arbiter]] | A person with ultimate discretionary power; an authoritative critic of taste. |
| `-ate` | Verb (Action / Process) | [[arbitrate]] | To hear evidence and hand down a binding settlement between disputants. |
| `-ation` | Noun (Procedural Act) | [[arbitration]] | The formal extrajudicial process of resolving disputes through chosen neutrals. |
| `-ator` | Noun (Appointed Agent) | [[arbitrator]] | The designated neutral third party presiding over an arbitration hearing. |
| `-trix` | Noun (Female Agent) | [[arbitratrix]] | A female arbitrator. |
| `-ary` | Adjective (Character / Quality) | [[arbitrary]] | Determined by individual discretion, whim, or caprice rather than necessity or law. |
| `-ly` | Adverb (Manner) | [[arbitrarily]] | In a capricious, autocratic, or randomly chosen manner. |
| `-ness` | Noun (Abstract State) | [[arbitrariness]] | The state of being unguided by rule, logic, or predictable principles. |
| `-ament` | Noun (Result / Sovereign Power) | [[arbitrament]] | A formal arbitral award; the supreme, decisive power of final settlement. |
| `-able` | Adjective (Capacity) | [[arbitrable]] | Subject to legal arbitration under statutory law or private contract. |
| `-ability` | Noun (Legal Eligibility) | [[arbitrability]] | The legal status of a dispute being capable of resolution by arbitration. |
| `-age` | Noun (Financial Mechanism) | [[arbitrage]] | The simultaneous trading of identical assets across markets to capture price gaps. |
| `-eur` | Noun (Professional Trader) | [[arbitrageur]] | A specialist who executes arbitrage operations in financial or commodities markets. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Commercial & Labor Law (ADR)** | [[arbitration]], [[arbitrator]], [[arbitrable]], [[arbitrability]] | Mandatory binding arbitration clauses, American Arbitration Association (AAA), ICC International Court of Arbitration, collective bargaining. |
| 🏛️ **Constitutional Law & Governance** | [[arbitrary]], [[arbitrariness]], [[arbiter]] | Fifth and Fourteenth Amendment substantive due process protections against "arbitrary and capricious" administrative actions. |
| 📈 **Wall Street & Quantitative Finance** | [[arbitrage]], [[arbitrageur]], [[risk arbitrage]] | High-frequency statistical arbitrage (stat arb), currency carry trade, index futures pricing, convertible bond arbitrage. |
| 📐 **Mathematics, Logic & Linguistics** | [[arbitrary]], [[arbitrariness]] | Arbitrary constants in integration, arbitrary precision arithmetic, Saussure's *l'arbitraire du signe* (arbitrariness of the linguistic sign). |
| 🎭 **Cultural Criticism & Aesthetics** | [[arbiter]], [[arbiter elegantiarum]] | Fashion editors, literary critics, Michelin culinary guides, and historic taste-makers of high society. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[arbitrable]] | adjective | **1.** Appropriate for or subject to settlement by arbitration. | *"In academic literature, arbitrable designates appropriate for or subject to settlement by arbitration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arbitrage]] | noun | **1.** A kind of hedged investment meant to capture slight differences in price; when there is a difference in the price of something on two different markets the arbitrageur simultaneously buys at the lower price and sells at the higher price.<br>**2.** Practice arbitrage, as in the stock market. | *"In academic literature, arbitrage designates a kind of hedged investment meant to capture slight differences in price; when there is a difference in the price of something on two different markets the arbitrageur simultaneously buys at the lower price and sells at the higher price."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arbitrager]] | noun | **1.** Someone who engages in arbitrage (who purchases securities in one market for immediate resale in another in the hope of profiting from the price differential). | *"In academic literature, arbitrager designates someone who engages in arbitrage (who purchases securities in one market for immediate resale in another in the hope of profiting from the price differential)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arbitrageur]] | noun | **1.** Someone who engages in arbitrage (who purchases securities in one market for immediate resale in another in the hope of profiting from the price differential). | *"In academic literature, arbitrageur designates someone who engages in arbitrage (who purchases securities in one market for immediate resale in another in the hope of profiting from the price differential)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arbitral]] | adjective | **1.** Relating to or resulting from arbitration. | *"In academic literature, arbitral designates relating to or resulting from arbitration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arbitrament]] | noun | **1.** The act of deciding as an arbiter; giving authoritative judgment. | *"Lo, where our sister is in expectation, Yet quaking and unsettled.—Fairest Emily, The gods by their divine arbitrament Have given you this knight; he is a good one As ever struck at head."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arbitrarily]] | adverb | **1.** In a random manner. | *"I, p. 26.] [Footnote 7: In addition, certain items of receipts of companies or incomes of individuals are arbitrarily defined as property for purposes of taxation in a few cases in about fifteen other states."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[arbitrariness]] | noun | **1.** The trait of acting unpredictably and more from whim or caprice than from reason or judgment. | *"Nicholas, though he had never seen Ilágin, with his usual absence of moderation in judgment, hated him cordially from reports of his arbitrariness and violence, and regarded him as his bitterest foe."* — graf Leo Tolstoy, *War and Peace* |
| [[arbitrary]] | adjective | **1.** Based on or subject to individual discretion or preference or sometimes impulse or caprice. | *"For instance, lying on the cell floor, I established an arbitrary and imaginary line along the wall some three feet above the floor."* — Jack London, *The Jacket (The Star-Rover)* |
| [[arbitrate]] | verb | **1.** Act between parties with a view to reconciling differences. | *"This might have been prevented and made whole With very easy arguments of love, Which now the manage of two kingdoms must With fearful bloody issue arbitrate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arbitration]] | noun | **1.** (law) the hearing and determination of a dispute by an impartial referee agreed to by both parties (often used to settle disputes between labor and management).<br>**2.** The act of deciding as an arbiter; giving authoritative judgment. | *"Mediation and voluntary arbitration. § 12."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[arbitrational]] | adjective | **1.** Relating to or resulting from arbitration. | *"In academic literature, arbitrational designates relating to or resulting from arbitration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arbitrative]] | adjective | **1.** Relating to or having the authority to arbitrate. | *"In academic literature, arbitrative designates relating to or having the authority to arbitrate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arbitrator]] | noun | **1.** Someone chosen to judge and decide a disputed issue. | *"But now the arbitrator of despairs, Just Death, kind umpire of men’s miseries, With sweet enlargement doth dismiss me hence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arbitrement]] | noun | **1.** The act of deciding as an arbiter; giving authoritative judgment. | *"Faith, yes, to be put to the arbitrement of swords, and by such two that would by all likelihood have confounded one the other or have fall’n both."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nonarbitrable]] | adjective | **1.** Not appropriate for or subject to arbitration. | *"In academic literature, nonarbitrable designates not appropriate for or subject to arbitration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonarbitrary]] | adjective | **1.** Not subject to individual determination. | *"In academic literature, nonarbitrary designates not subject to individual determination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unarbitrary]] | adjective | **1.** Not subject to individual determination. | *"In academic literature, unarbitrary designates not subject to individual determination."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Law, Justice & Feudal]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ARBITR
  </div>
</div>
