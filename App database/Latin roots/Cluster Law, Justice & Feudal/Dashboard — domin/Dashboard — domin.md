---
status: unread
type: root_dashboard
---
# Dashboard — domin
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">domin-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“lord, master, or owner”</span>
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

The root **domin** means lord, master, or owner. It refers to mastery, absolute ownership, sovereign rule, commanding control, feudal hierarchy. In English, this root forms words such as *domain*, *dominate*, *domination*, and *dominant*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: lord, master, or owner
> The root **domin** means lord, master, or owner. It refers to mastery, absolute ownership, sovereign rule, commanding control, feudal hierarchy. In English, this root forms words such as *domain*, *dominate*, *domination*, and *dominant*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Lord, master, or owner</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community gathering in a hall to establish fair rules and resolve disputes.</mark>
> - **Everyday Connection**: Think of familiar words like *domain* and *dominate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **domin** comes from a Latin word that means *"lord, master, or owner"*.
  - At its core, it describes lord, master, or owner.

- **The Big Picture Idea**:
  - Picture a community gathering in a hall to establish fair rules and resolve disputes.
  - Whenever you see **domin** in an English word, think of **justice, legal authority, and governance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of lord, master, or owner.
  - **Mental & Social**: How people experience, organize, or communicate about lord, master, or owner.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Domain**: An area of territory owned or controlled by a ruler or government.
  - **Dominate**: To exercise control, authority, or commanding influence over.
  - **Domination**: The exercise of power, authority, or control over others.
  - **Dominant**: The fifth tone or degree of a major or minor diatonic scale, next in harmonic importance to the tonic.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">domin</mark>, think of <mark class="hl-def">justice, legal authority, and governance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates through five distinct morphological stems in English:
> - **Primary Nominal Stem (`domin-`):** Derived directly from Latin *dominus / dominium*: *dominion*, *dominus*, *domina*, *Anno Domini*, *Dominican*.
> - **Verbal & Participial Stem (`dominat-`):** Derived from Latin *dominātus* (past participle of *dominārī*): *dominate*, *domination*, *dominant*, *dominance*, *dominator*, *dominatrix*.
> - **Gallicized Land & Property Stem (`domain-` / `demesn-`):** Transmitted via Anglo-Norman *demeine*: *domain*, *demesne*, *eminent domain*, *public domain*.
> - **Prefix Compounds (`predomin-`, `condomin-`):**
>   - `prae-` ("before, above") + *domināre* $\to$ *predominate*, *predominant*, *predominance*.
>   - `con-` ("together") + *dominium* $\to$ *condominium*.
> - **Contracted Romance Honorific Stems (`dam-`, `don-`):** Derived from *domina* and *dominus*: *dame*, *madam*, *mademoiselle*, *damsel*, *don*, *doña*.

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
> The derivations of *domin* organize into five primary domains:
> - **Real Estate, Sovereignty & Jurisdictional Territory:** In [[domain]], [[eminent domain]], [[public domain]], [[dominion]], [[demesne]], and [[condominium]], the root denotes legal property boundaries, sovereign territory, and shared housing complexes.
> - **Coercive Power, Hegemony & Overbearing Rule:** In [[dominate]], [[domination]], [[dominator]], [[dominatrix]], [[domineer]], and [[domineering]], the root expresses interpersonal control, autocratic governance, and imperial hegemony.
> - **Empirical Sciences, Genetics & Ecology:** In [[dominant]], [[dominance]], [[predominant]], and [[predominance]], the root describes prevailing genetic traits (dominant alleles), ecological keystone species, and statistically prevalent phenomena.
> - **Music Theory & Harmony:** In the musical noun [[dominant]], the root denotes the fifth degree of the diatonic scale, which creates harmonic tension demanding resolution to the tonic.
> - **Chivalric Titles & Social Etiquette:** In [[dame]], [[madam]], [[damsel]], [[don]], and [[doña]], the root softens from ancient absolute mastery into courteous titles of social distinction and feminine honor.
> - **Sacred Chronology & Cultural Tokens:** In [[Anno Domini]], [[Dominican]], and [[domino]], the root reflects Christian theological reverence for Christ as Lord and ecclesiastical vestments.

---

## 🔀 4. Prefix & Combining Dynamics on domin

### Prefix Shifts (Directional & Relational Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `prae-` (`pre-`) | before, in front of, above | [[predominate]], [[predominant]] | To be superior in strength, authority, or prevalence; to be the prevailing element. |
| `con-` | together, jointly | [[condominium]] | Lit. "joint ownership"; shared governance over a territory, or co-ownership of real estate. |
| `mea` (French *ma*) | my (possessive) | [[madam]], [[mademoiselle]] | Lit. "my lady"; a respectful form of address for a woman of status. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ate` | Verb (Action / Rule) | [[dominate]] | To exercise control, authority, or commanding influence over others. |
| `-ation` | Noun (State / Exercise) | [[domination]] | The exercise of supreme power, control, or rule over a population or group. |
| `-ant` | Adjective / Noun | [[dominant]] | Exercising ruling influence; prevailing in genetics, music, or ecology. |
| `-ance` | Noun (State / Power) | [[dominance]] | The condition or fact of being dominant, supreme, or prevailing. |
| `-ion` | Noun (Territory / Sovereign Power) | [[dominion]] | Sovereign authority; the territory governed by a sovereign state. |
| `-ium` | Noun (Latin Legal Concept) | [[condominium]] | Joint property ownership or governance. |
| `-or` | Noun (Agent / Master) | [[dominator]] | An individual or power that dominates or holds sway. |
| `-trix` | Noun (Female Agent) | [[dominatrix]] | A woman who exercises commanding or dominant authority. |
| `-eer` / `-eering` | Verb / Adjective (Pejorative) | [[domineer]], [[domineering]] | To rule or behave in an arrogant, tyrannical, overbearing manner. |
| `-sel` (< Latin *-icella*) | Noun (Diminutive) | [[damsel]] | A young unmarried woman (< Vulgar Latin *dominicella* "little lady"). |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Property Law & Constitutional Rights** | [[domain]], [[eminent domain]], [[public domain]], [[condominium]] | Fifth Amendment takings, fair market value compensation, copyright expiration, horizontal property regimes. |
| 🧬 **Genetics, Ecology & Evolutionary Biology**| [[dominant]], [[dominance]], [[predominant]] | Mendelian inheritance, heterozygous phenotypic expression, dominant rainforest canopy trees, alpha dominance. |
| 🏛️ **International Relations & Imperial History**| [[dominion]], [[domination]], [[condominium]] | Hegemonic regional dominance, British Commonwealth Dominions (Statute of Westminster 1931), Anglo-Egyptian Sudan condominium. |
| 🎵 **Musicology & Harmonic Theory** | [[dominant]] | Dominant seventh chords, tonic-dominant harmonic polarity, sonata-allegro form expositions. |
| 💻 **Information Technology & Networking** | [[domain]] | Domain Name System (DNS), top-level domains (.com, .gov), Active Directory domain controllers. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abdominal]] | noun | **1.** The muscles of the abdomen.<br>**2.** Of or relating to or near the abdomen. | *"What a sensation in the abdominal region!"* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[abdominocentesis]] | noun | **1.** Centesis of the belly to remove fluid for diagnosis. | *"In academic literature, abdominocentesis designates centesis of the belly to remove fluid for diagnosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abdominoplasty]] | noun | **1.** Cosmetic surgery of the abdomen to remove wrinkles and tighten the skin over the stomach. | *"In academic literature, abdominoplasty designates cosmetic surgery of the abdomen to remove wrinkles and tighten the skin over the stomach."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abdominous]] | adjective | **1.** Having a large belly. | *"In academic literature, abdominous designates having a large belly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abdominousness]] | noun | **1.** The bodily property of a protruding belly. | *"In academic literature, abdominousness designates the bodily property of a protruding belly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abdominovesical]] | adjective | **1.** Of or relating to the abdomen and the urinary bladder. | *"In academic literature, abdominovesical designates of or relating to the abdomen and the urinary bladder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[condominium]] | noun | **1.** One of the dwelling units in a condominium.<br>**2.** Housing consisting of a complex of dwelling units (as an apartment house) in which each unit is individually owned. | *"In academic literature, condominium designates one of the dwelling units in a condominium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dominance]] | noun | **1.** Superior development of one side of the body.<br>**2.** The state that exists when one person or group has power over another. | *"I haven't talked with Cousin James yet," I felt white feathers sprouting all over me, as I thus invoked the masculine dominance I had come to lay."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[dominant]] | noun | **1.** (music) the fifth note of the diatonic scale.<br>**2.** An allele that produces the same phenotype whether its paired allele is identical or different. | *"Tenderness was absolutely dominant in Clare at last."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[dominate]] | verb | **1.** Be larger in number, quantity, power, status or importance.<br>**2.** Be in control. | *"Great interests are affected by foreign trade and certain of these interests are able to influence opinion and to dominate legislation."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[dominated]] | verb | **1.** Be larger in number, quantity, power, status or importance.<br>**2.** Be in control. | *"In earlier conditions of society natural chance dominated industry, and it still remains and must always remain important."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[dominating]] | verb | **1.** Be larger in number, quantity, power, status or importance.<br>**2.** Be in control. | *"But a new power had entered into his life, and that power gradually asserted itself as the chief and dominating influence there."* — John Cairns, *Principal Cairns* |
| [[domination]] | noun | **1.** Social control by dominating.<br>**2.** Power to dominate or defeat. | *"Africa, Asia, and America, have successively felt her domination."* — Alexander Hamilton, *The Federalist Papers* |
| [[dominatrix]] | noun | **1.** A dominating woman (especially one who plays that role in a sadomasochistic sexual relationship). | *"In academic literature, dominatrix designates a dominating woman (especially one who plays that role in a sadomasochistic sexual relationship)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[domine]] | noun | **1.** A clergyman; especially a settled minister or parson. | *"Let me hear a staff, a stanze, a verse, _Lege, domine_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dominee]] | noun | **1.** A clergyman; especially a settled minister or parson. | *"In academic literature, dominee designates a clergyman; especially a settled minister or parson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[domineer]] | verb | **1.** Rule or exercise power over (somebody) in a cruel and autocratic manner. | *"Obey the bride, you that attend on her; Go to the feast, revel and domineer, Carouse full measure to her maidenhead, Be mad and merry, or go hang yourselves: But for my bonny Kate, she must with me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[domineering]] | verb | **1.** Rule or exercise power over (somebody) in a cruel and autocratic manner.<br>**2.** Tending to domineer. | *"I, that have been love’s whip, A very beadle to a humorous sigh, A critic, nay, a night-watch constable, A domineering pedant o’er the boy, Than whom no mortal so magnificent!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[domineeringly]] | adverb | **1.** In a domineering manner. | *"In academic literature, domineeringly designates in a domineering manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[domineeringness]] | noun | **1.** The trait of being imperious and overbearing. | *"In academic literature, domineeringness designates the trait of being imperious and overbearing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dominic]] | noun | **1.** (roman catholic church) spanish priest who founded an order whose members became known as dominicans or black friars (circa 1170-1221). | *"The palm and the laurel, Dominic and Dante, sanctity and song, grew together in her soil: she has retained the palm, but forgone the laurel."* — Francis Thompson, *Shelley: An Essay* |
| [[dominica]] | noun | **1.** A country on the island of dominica.<br>**2.** A volcanic island in the windward islands that was once a stronghold of the carib indians. | *"In academic literature, dominica designates a country on the island of dominica."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dominical]] | adjective | **1.** Of or relating to or coming from jesus christ.<br>**2.** Of or relating to sunday as the lord's day. | *"Let me not die your debtor, My red dominical, my golden letter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dominican]] | noun | **1.** A roman catholic friar wearing the black mantle of the dominican order.<br>**2.** A native or inhabitant of the dominican republic. | *"They broke into his bedchamber at the Dominican convent near Perth, where he was residing, and barbarously murdered him by oft-repeated wounds."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[dominick]] | noun | **1.** American breed of chicken having barred grey plumage raised for meat and brown eggs. | *"In academic literature, dominick designates american breed of chicken having barred grey plumage raised for meat and brown eggs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dominicus]] | noun | **1.** First day of the week; observed as a day of rest and worship by most christians. | *"After an early breakfast at Morristown, the tobacco pedlar, whose name was Dominicus Pike, had travelled seven miles through a solitary piece of woods, without speaking a word to anybody but himself and his little gray mare."* — Nathaniel Hawthorne, *Twice-Told Tales* |
| [[dominie]] | noun | **1.** A clergyman; especially a settled minister or parson. | *"And when the Dominie, in the chapel, here in Folsom of a Sunday, worships God in his own good modern way, I know that in him, the Dominie, still abide the worships of the Plough, the Fish, the Tree—ay, and also all worships of Astarte and the Night."* — Jack London, *The Jacket (The Star-Rover)* |
| [[dominion]] | noun | **1.** Dominance or power through legal authority.<br>**2.** A region marked off for administrative or other purposes. | *"Good news, gods! [_Reads._] _Justice and your father’s wrath, should he take me in his dominion, could not be so cruel to me as you, O the dearest of creatures, would even renew me with your eyes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dominique]] | noun | **1.** American breed of chicken having barred grey plumage raised for meat and brown eggs. | *"In academic literature, dominique designates american breed of chicken having barred grey plumage raised for meat and brown eggs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[domino]] | noun | **1.** United states rhythm and blues pianist and singer and composer (born in 1928).<br>**2.** A loose hooded cloak worn with a half mask as part of a masquerade costume. | *"This ingenious article itself, without the elegant domino-box, card-basket, &c., ought alone to give a high price to the lot."* — George Eliot, *Middlemarch* |
| [[dominoes]] | noun | **1.** Any of several games played with small rectangular blocks.<br>**2.** United states rhythm and blues pianist and singer and composer (born in 1928). | *"The Accountant had brought out already a box of dominoes, and was toying architecturally with the bones."* — Joseph Conrad, *Heart of Darkness* |
| [[dominos]] | noun | **1.** Any of several games played with small rectangular blocks.<br>**2.** United states rhythm and blues pianist and singer and composer (born in 1928). | *"In academic literature, dominos designates any of several games played with small rectangular blocks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dominus]] | noun | **1.** A clergyman; especially a settled minister or parson. | *"Material domination. _Dominus!_ Lord!"* — James Joyce, *Ulysses* |
| [[predominance]] | noun | **1.** The state of being predominant over others.<br>**2.** The quality of being more noticeable than anything else. | *"Is’t night’s predominance, or the day’s shame, That darkness does the face of earth entomb, When living light should kiss it?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[predominant]] | adjective | **1.** Most frequent or common.<br>**2.** Having superior power and influence. | *"Virtue is choked with foul ambition, And charity chased hence by rancour’s hand; Foul subornation is predominant, And equity exiled your highness’ land."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[predominantly]] | adverb | **1.** Much greater in number or influence. | *"Indeed, our national banking development has been predominantly urban and commercial to the neglect of rural and agricultural interests."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[predominate]] | verb | **1.** Be larger in number, quantity, power, status or importance.<br>**2.** Appear very large or occupy a commanding position. | *"Master Brook, thou shalt know I will predominate over the peasant, and thou shalt lie with his wife."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[predomination]] | noun | **1.** The state of being predominant over others.<br>**2.** The quality of being more noticeable than anything else. | *"In academic literature, predomination designates the state of being predominant over others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subdominant]] | noun | **1.** (music) the fourth note of the diatonic scale. | *"In academic literature, subdominant designates (music) the fourth note of the diatonic scale."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · DOMIN
  </div>
</div>
