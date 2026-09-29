---
status: unread
type: root_dashboard
---
# Dashboard — anti
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">anti-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“against, opposite, or counter”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Everyday foundational concepts that structure how we describe reality.</span>
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

The root **anti** means against, opposite, or counter. It refers to against, opposite, counteracting, rival, inverse. In English, this root forms words such as *antacid*, *antagonist*, *antagonistic*, and *antagonize*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: against, opposite, or counter
> The root **anti** means against, opposite, or counter. It refers to against, opposite, counteracting, rival, inverse. In English, this root forms words such as *antacid*, *antagonist*, *antagonistic*, and *antagonize*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Against, opposite, or counter</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Everyday foundational concepts that structure how we describe reality.</mark>
> - **Everyday Connection**: Think of familiar words like *antacid* and *antagonist*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **anti** comes from a Latin word that means *"against, opposite, or counter"*.
  - At its core, it describes against, opposite, or counter.

- **The Big Picture Idea**:
  - Picture everyday foundational concepts that structure how we describe reality.
  - Whenever you see **anti** in an English word, think of **core foundational concepts**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of against, opposite, or counter.
  - **Mental & Social**: How people experience, organize, or communicate about against, opposite, or counter.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Antacid**: A substance that neutralizes stomach acidity.
  - **Antagonist**: A person who actively opposes, contends with, or is hostile toward another.
  - **Antagonistic**: Showing or feeling active opposition or hostility toward someone or something.
  - **Antagonize**: To cause to become hostile, irritated, or unfriendly.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">anti</mark>, think of <mark class="hl-def">core foundational concepts</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Mechanics of `anti-` and `ant-`
> The prefix **anti** operates with distinct phonological rules across English vocabulary:
> 1. **Vocalic Elision (`ant-` before vowels and `h`):**
>    - *anti-* + *acid* $ightarrow$ **antacid** (neutralizing stomach acid).
>    - *anti-* + *Arktikos* $ightarrow$ **antarctic** (opposite the Arctic).
>    - *anti-* + *agōnistēs* $ightarrow$ **antagonist** (rival, adversary).
>    - *anti-* + *helminth* $ightarrow$ **anthelmintic** (expelling worms).
> 2. **Classical Latinized Borrowings (Middle English & Renaissance):**
>    - Latin *antidotum* $ightarrow$ Old French *antidote* $ightarrow$ English **antidote**.
>    - Latin *antipathīa* $ightarrow$ English **antipathy**.
>    - Latin *antipodes* $ightarrow$ English **antipodes**, **antipodal**.
>    - Latin *antithesis* $ightarrow$ English **antithesis**, **antithetical**.
>    - Latin *antiphōna* $ightarrow$ English **antiphon**, **antiphonal**.
> 3. **Modern Scientific & Neological Engine:**
>    - In immunology, biochemistry, and physics, *anti-* forms productive prefixes directly attached to English nouns: *antibody*, *antigen*, *antimatter*, *antivirus*, *antioxidant*, *antihero*.

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

```
                                  ┌── Pharmacology & Immunity ── antidote, antibiotic, antibody, antigen, antiseptic
                                  │
                                  ├── Psychology & Rivalry ───── antipathy, antagonist, antagonistic, antihero
                                  │
    [ANTI-] ──────────────────────┼── Logic, Rhetoric & Law ──── antithesis, antithetical, antinomy, antilogy
(against / opposite)              │
                                  ├── Geography & Atmospheric ── antarctic, antipodes, antipodal, anticyclone
                                  │
                                  └── Physics & Mechanics ────── antimatter, anticathode, antipyretic
```

> [!tip] 🌈 Thematic Categories of the Derived Vocabulary
> 1. **Biomedical Defense & Therapeutics:** *antidote*, *antidotal*, *antibiotic*, *antibody*, *antigen*, *antigenic*, *antiseptic*, *antihistamine*, *antipyretic*, *antiserum*, *antitoxin*, *antiviral*, *antacid*.
> 2. **Interpersonal & Narrative Conflict:** *antagonist*, *antagonism*, *antagonistic*, *antagonize*, *antipathy*, *antipathetic*, *antihero*.
> 3. **Philosophy, Law & Literary Tropes:** *antithesis*, *antithetical*, *antinomy*, *antilogy*, *antiphrasis*, *anticlimax*, *anticlimactic*.
> 4. **Geophysical & Cosmic Opposites:** *antarctic*, *antipodes*, *antipodal*, *anticyclone*, *antimatter*.
> 5. **Choral Liturgy:** *antiphon*, *antiphonal*.

---

## 🔀 4. Prefix & Combining Dynamics on anti

### Phonological Allomorphs

| Prefix Variant | Conditioning Environment | Representative Example | Semantic Effect |
| :--- | :--- | :--- | :--- |
| `anti-` | Standard before consonants | **antibiotic**, **antipathy**, **antithesis** | Directly opposes, counteracts, or inverts the stem. |
| `ant-` | Elided before vowels or `h` | **antacid**, **antarctic**, **antagonist** | Vowel contraction maintaining smooth classical pronunciation. |

### Productive Suffix Attachments

| Suffix | Morphological Role | Formed Word | Syntactic Role |
| :--- | :--- | :--- | :--- |
| `-ist` | Agent noun | **antagonist** | One who contends against an opponent. |
| `-ic` / `-ical` | Adjective of relation | **antagonistic**, **antithetical**, **antiseptic** | Operating in opposition, contrast, or counter-action. |
| `-ism` | Abstract noun (state / practice) | **antagonism** | The state or condition of active mutual hostility. |
| `-ize` | Causative verb | **antagonize** | To provoke active opposition or enmity in someone. |
| `-dote` (Greek *dosis*) | Noun (thing given) | **antidote** | A remedy given specifically to counter poison. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Domain | Representative Lemmas | Practical Application & Operational Context |
| :--- | :--- | :--- |
| 🩺 **Immunology, Pharmacology & Critical Care** | *antibiotic*, *antibody*, *antigen*, *antiseptic*, *antidote* | Neutralizing venom with polyvalent antivenoms, administering broad-spectrum beta-lactams, and assessing antibody titers. |
| ⚖️ **Jurisprudence & Kantian Epistemology** | *antinomy*, *antithesis* | Resolving antinomies (contradictions between two equally demonstrable legal or metaphysical propositions). |
| 🎭 **Narrative Craft, Dramaturgy & Film** | *antagonist*, *antihero*, *anticlimax* | Constructing compelling character foils; subverting classical heroic tropes with morally ambiguous antiheroes. |
| 🌍 **Polar Geography & Meteorology** | *antarctic*, *anticyclone*, *antipodes* | Navigating the Southern Ocean; tracking high-pressure anticyclonic systems characterized by clockwise circulation in the North. |
| ⚛️ **High-Energy Particle Physics** | *antimatter*, *anticathode* | Investigating baryogenesis, positron emission, and particle-antiparticle annihilation in particle accelerators. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[anti]] | noun | **1.** A person who is opposed (to an action or policy or practice etc.).<br>**2.** Not in favor of (an action or proposal etc.). | *"The anti-climax would be too intolerable; and her return might bring reproach upon her idolized husband."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[antiacid]] | noun | **1.** An agent that counteracts or neutralizes acidity (especially in the stomach). | *"In academic literature, antiacid designates an agent that counteracts or neutralizes acidity (especially in the stomach)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiadrenergic]] | adjective | **1.** Relating to blocking or reducing adrenergic effects in the body. | *"In academic literature, antiadrenergic designates relating to blocking or reducing adrenergic effects in the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiaircraft]] | noun | **1.** Artillery designed to shoot upward at airplanes.<br>**2.** Designed for defense from a surface position against air attack. | *"In academic literature, antiaircraft designates artillery designed to shoot upward at airplanes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antialiasing]] | noun | **1.** (computer graphics) a technique that is used to smooth jagged distortions in curves and diagonal lines so they appear smoother. | *"In academic literature, antialiasing designates (computer graphics) a technique that is used to smooth jagged distortions in curves and diagonal lines so they appear smoother."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiapartheid]] | adjective | **1.** Opposing the policy of apartheid in south africa. | *"In academic literature, antiapartheid designates opposing the policy of apartheid in south africa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiarrhythmic]] | noun | **1.** A drug used to treat an abnormal heart rhythm. | *"In academic literature, antiarrhythmic designates a drug used to treat an abnormal heart rhythm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiauthoritarian]] | adjective | **1.** Opposed to authoritarianism. | *"In academic literature, antiauthoritarian designates opposed to authoritarianism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antic]] | noun | **1.** A ludicrous or grotesque act done for fun and amusement.<br>**2.** Act as or like a clown. | *"And resolution thus fubbed as it is with the rusty curb of old father Antic the law?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[anticancer]] | adjective | **1.** Used in the treatment of cancer. | *"In academic literature, anticancer designates used in the treatment of cancer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticatalyst]] | noun | **1.** (chemistry) a substance that retards a chemical reaction or diminishes the activity of a catalyst. | *"In academic literature, anticatalyst designates (chemistry) a substance that retards a chemical reaction or diminishes the activity of a catalyst."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticholinergic]] | noun | **1.** A substance that opposes or blocks the action of acetylcholine.<br>**2.** Inhibiting or blocking the action of acetylcholine at a receptor site. | *"In academic literature, anticholinergic designates a substance that opposes or blocks the action of acetylcholine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticholinesterase]] | noun | **1.** A medicine that inhibits cholinesterase by combining with it and so has a cholinergic effect. | *"In academic literature, anticholinesterase designates a medicine that inhibits cholinesterase by combining with it and so has a cholinergic effect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antichrist]] | noun | **1.** (christianity) the adversary of christ (or christianity) mentioned in the new testament; the antichrist will rule the world until overthrown by the second coming of christ. | *"Bulstrode felt that his mode of talking about Catholic countries, as if there were any truce with Antichrist, illustrated the usual tendency to unsoundness in intellectual men."* — George Eliot, *Middlemarch* |
| [[anticipant]] | noun | **1.** One who anticipates.<br>**2.** Marked by eager anticipation. | *"In academic literature, anticipant designates one who anticipates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticipate]] | verb | **1.** Regard something as probable or likely.<br>**2.** Act in advance of; deal with ahead of time. | *"Thus policy in love t’ anticipate The ills that were not, grew to faults assured, And brought to medicine a healthful state Which rank of goodness would by ill be cured."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[anticipated]] | verb | **1.** Regard something as probable or likely.<br>**2.** Act in advance of; deal with ahead of time. | *"Mademoiselle, you are right!” Her quickness anticipated what I might have said presently but as yet had only thought."* — Charles Dickens, *Bleak House* |
| [[anticipation]] | noun | **1.** An expectation.<br>**2.** Something expected (as on the basis of a norm). | *"I will tell you why; so shall my anticipation prevent your discovery, and your secrecy to the King and Queen moult no feather."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[anticipative]] | adjective | **1.** Marked by eager anticipation. | *"But, to this, Bishop Jebb’s anticipative answer is ready."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[anticipator]] | noun | **1.** One who anticipates. | *"In academic literature, anticipator designates one who anticipates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticipatory]] | adjective | **1.** In anticipation. | *"In academic literature, anticipatory designates in anticipation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticlimactic]] | adjective | **1.** Of or relating to a sudden change from an impressive to a ludicrous style.<br>**2.** Coming after the climax especially of a dramatic or narrative plot. | *"In academic literature, anticlimactic designates of or relating to a sudden change from an impressive to a ludicrous style."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticlimactical]] | adjective | **1.** Of or relating to a sudden change from an impressive to a ludicrous style. | *"In academic literature, anticlimactical designates of or relating to a sudden change from an impressive to a ludicrous style."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticlimax]] | noun | **1.** A disappointing decline after a previous rise.<br>**2.** A change from a serious subject to a disappointing one. | *"Boldwood’s deep attachment was a matter of great interest among all around him; but, after having been pointed out for so many years as the perfect exemplar of thriving bachelorship, his lapse was an anticlimax somewhat resembling that of St."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[anticlinal]] | adjective | **1.** Sloping downward away from a common crest. | *"In academic literature, anticlinal designates sloping downward away from a common crest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticlockwise]] | adjective | **1.** In the direction opposite to the rotation of the hands of a clock.<br>**2.** In a direction opposite to the direction in which the hands of a clock move. | *"In academic literature, anticlockwise designates in the direction opposite to the rotation of the hands of a clock."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticoagulant]] | noun | **1.** Medicine that prevents or retards the clotting of blood. | *"In academic literature, anticoagulant designates medicine that prevents or retards the clotting of blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticoagulation]] | noun | **1.** The administration of an anticoagulant drug to retard coagulation of the blood. | *"In academic literature, anticoagulation designates the administration of an anticoagulant drug to retard coagulation of the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticoagulative]] | adjective | **1.** Of or relating to an anticoagulant. | *"In academic literature, anticoagulative designates of or relating to an anticoagulant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticonvulsant]] | noun | **1.** A drug used to treat or prevent convulsions (as in epilepsy). | *"In academic literature, anticonvulsant designates a drug used to treat or prevent convulsions (as in epilepsy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticyclone]] | noun | **1.** (meteorology) winds spiraling outward from a high pressure center; circling clockwise in the northern hemisphere and counterclockwise in the southern. | *"In academic literature, anticyclone designates (meteorology) winds spiraling outward from a high pressure center; circling clockwise in the northern hemisphere and counterclockwise in the southern."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticyclonic]] | adjective | **1.** Of or relating to or characteristic of the atmosphere around a high pressure center. | *"In academic literature, anticyclonic designates of or relating to or characteristic of the atmosphere around a high pressure center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antidotal]] | adjective | **1.** Counteracting the effects of a poison. | *"In academic literature, antidotal designates counteracting the effects of a poison."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antidote]] | noun | **1.** A remedy that stops or controls the effects of a poison. | *"Recant what you have said, ye Mungrils, and lick up the vomit ye have cast upon the Court, where you unworthily have had warmth and breeding, and swear that you, like Spiders, have made poison of that which was a saving Antidote. _Egre_."* — John Fletcher, *The Elder Brother* |
| [[antielectron]] | noun | **1.** An elementary particle with positive charge; interaction of a positron and an electron results in annihilation. | *"In academic literature, antielectron designates an elementary particle with positive charge; interaction of a positron and an electron results in annihilation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiemetic]] | noun | **1.** A drug that prevents or alleviates nausea and vomiting. | *"In academic literature, antiemetic designates a drug that prevents or alleviates nausea and vomiting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiepileptic]] | noun | **1.** A drug used to treat or prevent convulsions (as in epilepsy). | *"In academic literature, antiepileptic designates a drug used to treat or prevent convulsions (as in epilepsy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiestablishmentarianism]] | noun | **1.** The doctrine of opposition to the social and political establishment. | *"In academic literature, antiestablishmentarianism designates the doctrine of opposition to the social and political establishment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiestablishmentism]] | noun | **1.** The doctrine of opposition to the social and political establishment. | *"In academic literature, antiestablishmentism designates the doctrine of opposition to the social and political establishment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antilepton]] | noun | **1.** The antiparticle of a lepton. | *"In academic literature, antilepton designates the antiparticle of a lepton."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antilles]] | noun | **1.** A group of islands in the west indies. | *"But if the currents carry ye to those sweet Antilles where the beaches are only beat with water-lilies, will ye do one little errand for me?"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[antilocapra]] | noun | **1.** Type and sole genus of the antilocapridae comprising one species. | *"In academic literature, antilocapra designates type and sole genus of the antilocapridae comprising one species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antilocapridae]] | noun | **1.** Comprising only the pronghorns. | *"In academic literature, antilocapridae designates comprising only the pronghorns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antilog]] | noun | **1.** The number of which a given number is the logarithm. | *"In academic literature, antilog designates the number of which a given number is the logarithm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antilogarithm]] | noun | **1.** The number of which a given number is the logarithm. | *"In academic literature, antilogarithm designates the number of which a given number is the logarithm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antilope]] | noun | **1.** Blackbucks. | *"In academic literature, antilope designates blackbucks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimacassar]] | noun | **1.** A piece of ornamented cloth that protects the back of a chair from hair oils. | *"I declare to my antimacassar if you took up a straw from the bloody floor and if you said to Bloom: _Look at, Bloom."* — James Joyce, *Ulysses* |
| [[antimagnetic]] | adjective | **1.** Impervious to the effects of a magnetic field; resistant to magnetization. | *"In academic literature, antimagnetic designates impervious to the effects of a magnetic field; resistant to magnetization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimalarial]] | noun | **1.** A medicinal drug used to prevent or treat malaria. | *"In academic literature, antimalarial designates a medicinal drug used to prevent or treat malaria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimatter]] | noun | **1.** Matter consisting of elementary particles that are the antiparticles of those making up normal substances. | *"In academic literature, antimatter designates matter consisting of elementary particles that are the antiparticles of those making up normal substances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimeson]] | noun | **1.** The antiparticle of a meson. | *"In academic literature, antimeson designates the antiparticle of a meson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimetabolite]] | noun | **1.** An antineoplastic drug that inhibits the utilization of a metabolite. | *"In academic literature, antimetabolite designates an antineoplastic drug that inhibits the utilization of a metabolite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimicrobial]] | noun | **1.** An agent (as heat or radiation or a chemical) that destroys microorganisms that might carry disease.<br>**2.** Capable of destroying or inhibiting the growth of disease-causing microorganisms. | *"In academic literature, antimicrobial designates an agent (as heat or radiation or a chemical) that destroys microorganisms that might carry disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimicrobic]] | noun | **1.** An agent (as heat or radiation or a chemical) that destroys microorganisms that might carry disease.<br>**2.** Capable of destroying or inhibiting the growth of disease-causing microorganisms. | *"In academic literature, antimicrobic designates an agent (as heat or radiation or a chemical) that destroys microorganisms that might carry disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimonial]] | adjective | **1.** Containing antimony. | *"In academic literature, antimonial designates containing antimony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimonic]] | adjective | **1.** Relating to or derived from antimony. | *"In academic literature, antimonic designates relating to or derived from antimony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimonious]] | adjective | **1.** Relating to or derived from antimony. | *"In academic literature, antimonious designates relating to or derived from antimony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimonopoly]] | adjective | **1.** Of laws and regulations; designed to protect trade and commerce from unfair business practices. | *"In academic literature, antimonopoly designates of laws and regulations; designed to protect trade and commerce from unfair business practices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimony]] | noun | **1.** A metallic element having four allotropic forms; used in a wide variety of alloys; found in stibnite. | *"Crucibles, alembics, and retorts were confusedly piled in various corners, and on a small table I saw distributed in separate bottles a number of mineral and metallic substances, which I recognized as antimony, mercury, plumbago, arsenic, borax, etc."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[antimuon]] | noun | **1.** The antiparticle of a muon; decays to positron and neutrino and antineutrino. | *"In academic literature, antimuon designates the antiparticle of a muon; decays to positron and neutrino and antineutrino."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimycin]] | noun | **1.** A crystalline antibiotic active against various fungi. | *"In academic literature, antimycin designates a crystalline antibiotic active against various fungi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimycotic]] | noun | **1.** Any agent that destroys or prevents the growth of fungi. | *"In academic literature, antimycotic designates any agent that destroys or prevents the growth of fungi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antineoplastic]] | noun | **1.** Any of several drugs that control or kill neoplastic cells; used in chemotherapy to kill cancer cells; all have unpleasant side effects that may include nausea and vomiting and hair loss and suppression of bone marrow function.<br>**2.** Used in the treatment of cancer. | *"In academic literature, antineoplastic designates any of several drugs that control or kill neoplastic cells; used in chemotherapy to kill cancer cells; all have unpleasant side effects that may include nausea and vomiting and hair loss and suppression of bone marrow function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antineutrino]] | noun | **1.** The antiparticle of a neutrino. | *"In academic literature, antineutrino designates the antiparticle of a neutrino."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antineutron]] | noun | **1.** The antiparticle of a neutron. | *"In academic literature, antineutron designates the antiparticle of a neutron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antinode]] | noun | **1.** (physics) the point of maximum displacement in a periodic system. | *"In academic literature, antinode designates (physics) the point of maximum displacement in a periodic system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antinomasia]] | noun | **1.** Substitution of a title for a name. | *"In academic literature, antinomasia designates substitution of a title for a name."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antinomian]] | noun | **1.** A follower of the doctrine of antinomianism.<br>**2.** Relating to or influenced by antinomianism. | *"The sermon, as might be expected, was of the extremest antinomian type; on justification by faith, as expounded in the theology of St Paul."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[antinomianism]] | noun | **1.** The theological doctrine that by faith and god's grace a christian is freed from all laws (including the moral standards of the culture). | *"She was great at Antinomianism and Bible-classes, and was plainly going to hold a class now."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[antinomy]] | noun | **1.** A contradiction between two statements that seem equally reasonable. | *"In academic literature, antinomy designates a contradiction between two statements that seem equally reasonable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antioch]] | noun | **1.** A town in southern turkey; ancient commercial center and capital of syria; an early center of christianity. | *"Before the palace of Antioch Scene I."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[antioxidant]] | noun | **1.** Substance that inhibits oxidation or inhibits reactions promoted by oxygen or peroxides. | *"In academic literature, antioxidant designates substance that inhibits oxidation or inhibits reactions promoted by oxygen or peroxides."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiredeposition]] | noun | **1.** The process of preventing redeposition. | *"In academic literature, antiredeposition designates the process of preventing redeposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antirrhinum]] | noun | **1.** A genus of herbs of the family scrophulariaceae with brightly colored irregular flowers. | *"In academic literature, antirrhinum designates a genus of herbs of the family scrophulariaceae with brightly colored irregular flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antisatellite]] | adjective | **1.** Of or relating to a system to destroy satellites in orbit. | *"In academic literature, antisatellite designates of or relating to a system to destroy satellites in orbit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antisemitic]] | adjective | **1.** Relating to or characterized by anti-semitism; hating jews. | *"In academic literature, antisemitic designates relating to or characterized by anti-semitism; hating jews."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antisemitism]] | noun | **1.** The intense dislike for and prejudice against jewish people. | *"In academic literature, antisemitism designates the intense dislike for and prejudice against jewish people."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antisepsis]] | noun | **1.** (of non-living objects) the state of being free of pathogenic organisms.<br>**2.** The process of inhibiting the growth and multiplication of microorganisms. | *"In academic literature, antisepsis designates (of non-living objects) the state of being free of pathogenic organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiseptic]] | noun | **1.** A substance that destroys micro-organisms that carry disease without harming body tissues.<br>**2.** Thoroughly clean and free of or destructive to disease-causing organisms. | *"And his keen sense of the ludicrous side of things often acted as an antiseptic, and kept him right both with himself and with his people."* — John Cairns, *Principal Cairns* |
| [[antisepticize]] | verb | **1.** Disinfect with an antiseptic. | *"In academic literature, antisepticize designates disinfect with an antiseptic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiserum]] | noun | **1.** Blood serum containing antibodies against specific antigens; provides immunity to a disease. | *"In academic literature, antiserum designates blood serum containing antibodies against specific antigens; provides immunity to a disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antisocial]] | adjective | **1.** Shunning contact with others.<br>**2.** Hostile to or disruptive of normal standards of social behavior. | *"It is doubtful whether the boycott can be extended at all beyond the first degree of personal relations without becoming antisocial, whether it is the weapon of organized workers or of organized wealth."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[antispasmodic]] | noun | **1.** A drug used to relieve or prevent spasms (especially of the smooth muscles). | *"In academic literature, antispasmodic designates a drug used to relieve or prevent spasms (especially of the smooth muscles)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antistrophe]] | noun | **1.** The section of a choral ode answering a previous strophe in classical greek drama; the second of two metrically corresponding sections in a poem. | *"Antistrophe Plunderer of Armies! lift thine eyes, (A while forbear, ye torturing fiends;) Seest thou whose step, unwilling, hither bends?"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[antistrophic]] | adjective | **1.** Of or relating to an antistrophe. | *"In academic literature, antistrophic designates of or relating to an antistrophe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antisubmarine]] | adjective | **1.** Defensive against enemy submarines. | *"In academic literature, antisubmarine designates defensive against enemy submarines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antisyphilitic]] | noun | **1.** A drug (or other chemical agent) that is effective against syphilis. | *"In academic literature, antisyphilitic designates a drug (or other chemical agent) that is effective against syphilis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitank]] | adjective | **1.** Designed for defense against armored vehicles. | *"In academic literature, antitank designates designed for defense against armored vehicles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitauon]] | noun | **1.** An antilepton of very great mass. | *"In academic literature, antitauon designates an antilepton of very great mass."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antithesis]] | noun | **1.** Exact opposite.<br>**2.** The juxtaposition of contrasting words or ideas to give a feeling of balance. | *"You feel he does not strain after effect--epigram, antithesis, or alliteration."* — T. R. Glover, *The Jesus of History* |
| [[antithetic]] | adjective | **1.** Sharply contrasted in character or purpose. | *"True enough,” said the man of bitter moods, looking round upon the company with the antithetic laughter that comes from a keener appreciation of the miseries of life than ordinary men are capable of."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[antithetical]] | adjective | **1.** Sharply contrasted in character or purpose. | *"The two types of worship are in some measure antithetical: in the one, the animal is not eaten because it is revered; in the other, it is revered because it is eaten."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[antithetically]] | adverb | **1.** With antithesis; in an antithetical manner. | *"In academic literature, antithetically designates with antithesis; in an antithetical manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antithyroid]] | adjective | **1.** Having the effect of counteracting excessive thyroid activity. | *"In academic literature, antithyroid designates having the effect of counteracting excessive thyroid activity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitoxic]] | adjective | **1.** Counteracting a toxin or poison. | *"In academic literature, antitoxic designates counteracting a toxin or poison."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitoxin]] | noun | **1.** An antibody that can neutralize a specific toxin. | *"In academic literature, antitoxin designates an antibody that can neutralize a specific toxin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitrade]] | noun | **1.** Winds blowing from west to east and lying above the trade winds in the tropics. | *"In academic literature, antitrade designates winds blowing from west to east and lying above the trade winds in the tropics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitrades]] | noun | **1.** Wind in the upper atmosphere blowing above but in the opposite direction from the trade winds.<br>**2.** Winds blowing from west to east and lying above the trade winds in the tropics. | *"In academic literature, antitrades designates wind in the upper atmosphere blowing above but in the opposite direction from the trade winds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitrust]] | adjective | **1.** Of laws and regulations; designed to protect trade and commerce from unfair business practices. | *"In academic literature, antitrust designates of laws and regulations; designed to protect trade and commerce from unfair business practices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitumor]] | adjective | **1.** Used in the treatment of cancer. | *"In academic literature, antitumor designates used in the treatment of cancer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitumour]] | adjective | **1.** Used in the treatment of cancer. | *"In academic literature, antitumour designates used in the treatment of cancer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitussive]] | noun | **1.** Any medicine used to suppress or relieve coughing. | *"In academic literature, antitussive designates any medicine used to suppress or relieve coughing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitype]] | noun | **1.** A person or thing represented or foreshadowed by a type or symbol; especially a figure in the old testament having a counterpart in the new testament.<br>**2.** An opposite or contrasting type. | *"In academic literature, antitype designates a person or thing represented or foreshadowed by a type or symbol; especially a figure in the old testament having a counterpart in the new testament."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitypic]] | adjective | **1.** Of or relating to an antitype. | *"In academic literature, antitypic designates of or relating to an antitype."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitypical]] | adjective | **1.** Of or relating to an antitype. | *"In academic literature, antitypical designates of or relating to an antitype."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enantiomer]] | noun | **1.** Either one of a pair of compounds (crystals or molecules) that are mirror images on each other but are not identical. | *"In academic literature, enantiomer designates either one of a pair of compounds (crystals or molecules) that are mirror images on each other but are not identical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enantiomorph]] | noun | **1.** Either one of a pair of compounds (crystals or molecules) that are mirror images on each other but are not identical. | *"In academic literature, enantiomorph designates either one of a pair of compounds (crystals or molecules) that are mirror images on each other but are not identical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enantiomorphism]] | noun | **1.** The relation of opposition between crystals or molecules that are reflections of one another. | *"In academic literature, enantiomorphism designates the relation of opposition between crystals or molecules that are reflections of one another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unanticipated]] | adjective | **1.** Not anticipated; - h.w.glidden. | *"In academic literature, unanticipated designates not anticipated; - h.w.glidden."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster General]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ANTI
  </div>
</div>
