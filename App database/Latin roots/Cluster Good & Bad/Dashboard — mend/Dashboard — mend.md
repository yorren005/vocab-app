---
status: unread
type: root_dashboard
---
# Dashboard — mend
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mend-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“fault”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Comparing a fresh, wholesome fruit against a damaged or spoiled one.</span>
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

The root **mend** means fault. It refers to blemish/fault, removal of error, deceitful fabrication, holy begging. In English, this root forms words such as *menda*, *mender*, *mending*, and *unmended*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: fault
> The root **mend** means fault. It refers to blemish/fault, removal of error, deceitful fabrication, holy begging. In English, this root forms words such as *menda*, *mender*, *mending*, and *unmended*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Fault</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Comparing a fresh, wholesome fruit against a damaged or spoiled one.</mark>
> - **Everyday Connection**: Think of familiar words like *menda* and *mender*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mend** comes from a Latin word that means *"fault"*.
  - At its core, it describes fault.

- **The Big Picture Idea**:
  - Picture comparing a fresh, wholesome fruit against a damaged or spoiled one.
  - Whenever you see **mend** in an English word, think of **goodness, benefits, or harm**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of fault.
  - **Mental & Social**: How people experience, organize, or communicate about fault.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Menda**: A fault, blemish, or defect.
  - **Mender**: A person who repairs broken objects, clothes, or footwear.
  - **Mending**: The action of repairing.
  - **Unmended**: Not repaired.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mend</mark>, think of <mark class="hl-def">goodness, benefits, or harm</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of `mend`
> Derivations split across three functional Latin branches:
> 1. **The Correction & Repair Family (`-mend-` < *menda* / *ēmendāre*):**
>    - Textual Scholarly Stems: **emend**, **emendation**, **emendator**, **emendatory**.
>    - Legislative & Moral Stems: **amend**, **amendable**, **amendment**, **amends**.
>    - Vernacular Clipped Stems: **mend**, **mender**, **mending**, **unmended**.
> 2. **The Deception Family (`mendac-` < *mendāx*):**
>    - **mendacious**, **mendaciously**, **mendaciousness**, **mendacity**.
> 3. **The Indigence Family (`mendic-` < *mendīcus*):**
>    - **mendicant**, **mendicancy**, **mendicity**.

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
                                  ┌── Textual Philology ──────── emend, emendation, emendator, emendatory
                                  │
                                  ├── Legislative Reform ─────── amend, amendment, amendable, amends
    [MEND-] ──────────────────────┼── Physical Repair ────────── mend, mender, mending, unmended
(blemish / defect / correction)   │
                                  ├── Moral Falsehood ────────── mendacious, mendaciously, mendacity
                                  │
                                  └── Holy Poverty & Begging ─── mendicant, mendicancy, mendicity
```

> [!tip] 🌈 Thematic Distribution of Vocabulary
> 1. **Classical Philology & Manuscript Editing:** *emend*, *emendation*, *emendator*, *emendatory*.
> 2. **Constitutional Law, Parliamentary Procedure & Ethics:** *amend*, *amendment*, *amendable*, *amends*.
> 3. **Everyday Craftsmanship & Physical Restoration:** *mend*, *mender*, *mending*, *unmended*.
> 4. **Deception, Perjury & Moral Philosophy:** *mendacious*, *mendaciously*, *mendaciousness*, *mendacity*.
> 5. **Monastic History & Socio-Economic Indigence:** *mendicant*, *mendicancy*, *mendicity*.

---

## 🔀 4. Prefix & Combining Dynamics on mend

### Prefix Dynamics

| Prefix | Classical Meaning | Resulting Lemma | Semantic Transformation |
| :--- | :--- | :--- | :--- |
| `ē-` / `ex-` | out of, away from | **emend**, **emendation** | Taking the flaw (*menda*) out of a text; restoring authentic manuscript readings. |
| `a-` (< *ē-*) | out of (via Old French) | **amend**, **amendment** | Correcting a statutory defect, modifying a bill, or reforming personal conduct. |
| ∅ (aphesis) | clipped initial vowel | **mend** | Vernacular clipping of *amend*; repairing a physical tear or broken fence. |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!abstract] 🏛️ Institutional & Professional Sphere Applications
> 1. **Constitutional Jurisprudence & Legislative Process:** Article V of the U.S. Constitution prescribes procedures for ratifying constitutional *amendments* (such as the Bill of Rights).
> 2. **Classical Textual Criticism (Stemmatics):** Paleographers propose conjectural *emendations* to restore corrupt lacunae in ancient Greek and Latin papyri.
> 3. **Church History & Monasticism:** The four great *Mendicant Orders* (Franciscans, Dominicans, Carmelites, Augustinians) revolutionized medieval urban evangelization.
> 4. **Tort Law & Civil Reparation:** Courts order tortfeasors to make financial *amends* through compensatory damages to injured parties.
> 5. **Psychology & Interrogation:** Forensic interviewers assess indicators of verbal *mendacity* to detect deceptive witness testimony during depositions.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[amend]] | verb | **1.** Make amendments to.<br>**2.** To make better. | *"If this penetrate, I will consider your music the better; if it do not, it is a vice in her ears which horsehairs and calves’ guts, nor the voice of unpaved eunuch to boot, can never amend. [_Exeunt Musicians._] Enter Cymbeline and Queen."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[amendable]] | adjective | **1.** Capable of being corrected by additions. | *"In academic literature, amendable designates capable of being corrected by additions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amendatory]] | adjective | **1.** Effecting amendment. | *"This was called in Congress the Enforcement Act, and an Amendatory Enforcement Act was inserted in the Sundry Civil Bill, June 10, 1872."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[amended]] | verb | **1.** Make amendments to.<br>**2.** To make better. | *"Ambitious love hath so in me offended That barefoot plod I the cold ground upon, With sainted vow my faults to have amended."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[amendment]] | noun | **1.** The act of amending or correcting.<br>**2.** A statement that is added to or revises or improves a proposal or document (a bill or constitution etc.). | *"What hope is there of his majesty’s amendment?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commend]] | verb | **1.** Express approval of.<br>**2.** Present as worthy of regard, kindness, or confidence. | *"Commend me to my kinsmen and my son."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commendable]] | adjective | **1.** Worthy of high praise.<br>**2.** In an admirable manner. | *"So our virtues Lie in th’ interpretation of the time, And power, unto itself most commendable, Hath not a tomb so evident as a chair T’ extol what it hath done."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commendation]] | noun | **1.** An official award (as for bravery or service) usually given as formal public statement.<br>**2.** A message expressing a favorable opinion. | *"Not much commendation to them?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[emend]] | verb | **1.** Make improvements or corrections to. | *"In academic literature, emend designates make improvements or corrections to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emendation]] | noun | **1.** A correction by emending; a correction resulting from critical editing. | *"On the Improvement of the Understanding (Treatise on the Emendation of the Intellect) by Baruch Spinoza [Benedict de Spinoza] Translated by R."* — Benedictus de Spinoza, *On the Improvement of the Understanding* |
| [[emended]] | verb | **1.** Make improvements or corrections to.<br>**2.** Improved or corrected by critical editing. | *"In academic literature, emended designates make improvements or corrections to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mend]] | noun | **1.** Sewing that repairs a worn or torn hole (especially in a garment).<br>**2.** The act of putting something in working order again. | *"Yet be most proud of that which I compile, Whose influence is thine, and born of thee, In others’ works thou dost but mend the style, And arts with thy sweet graces graced be."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mendacious]] | adjective | **1.** Given to lying.<br>**2.** Intentionally untrue. | *"Unusual polysyllables of foreign origin she interpreted phonetically or by false analogy or by both: metempsychosis (met him pike hoses), _alias_ (a mendacious person mentioned in sacred scripture)."* — James Joyce, *Ulysses* |
| [[mendaciously]] | adverb | **1.** In a mendacious and untruthful manner. | *"I am sure," I declared mendaciously, "there can be nothing to forgive!" He had the grace to look a trifle ashamed, but his resolution did not waver."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[mendacity]] | noun | **1.** The tendency to be untruthful. | *"Then, too, her mendacity―George of England is advertised as a saint, and Joe Miller as a wit."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[mendel]] | noun | **1.** Augustinian monk and botanist whose experiments in breeding garden peas led to his eventual recognition as founder of the science of genetics (1822-1884). | *"In academic literature, mendel designates augustinian monk and botanist whose experiments in breeding garden peas led to his eventual recognition as founder of the science of genetics (1822-1884)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mendeleev]] | noun | **1.** Russian chemist who developed a periodic table of the chemical elements and predicted the discovery of several new elements (1834-1907). | *"In academic literature, mendeleev designates russian chemist who developed a periodic table of the chemical elements and predicted the discovery of several new elements (1834-1907)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mendelevium]] | noun | **1.** A radioactive transuranic element synthesized by bombarding einsteinium with alpha particles (md is the current symbol for mendelevium but mv was formerly the symbol). | *"In academic literature, mendelevium designates a radioactive transuranic element synthesized by bombarding einsteinium with alpha particles (md is the current symbol for mendelevium but mv was formerly the symbol)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mendeleyev]] | noun | **1.** Russian chemist who developed a periodic table of the chemical elements and predicted the discovery of several new elements (1834-1907). | *"In academic literature, mendeleyev designates russian chemist who developed a periodic table of the chemical elements and predicted the discovery of several new elements (1834-1907)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mendelian]] | noun | **1.** A follower of mendelism.<br>**2.** Of or relating to gregor mendel or in accord with mendel's laws. | *"I am all of my past, as every protagonist of the Mendelian law must agree."* — Jack London, *The Jacket (The Star-Rover)* |
| [[mendelianism]] | noun | **1.** The theory of inheritance based on mendel's laws. | *"In academic literature, mendelianism designates the theory of inheritance based on mendel's laws."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mendelism]] | noun | **1.** The theory of inheritance based on mendel's laws. | *"In academic literature, mendelism designates the theory of inheritance based on mendel's laws."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mendelsohn]] | noun | **1.** German architect who migrated to palestine in 1937 (1887-1953). | *"Edward Mendelsohn (London: Faber and Faber, 976), 510-18."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[mendelssohn]] | noun | **1.** German musician and romantic composer of orchestral and choral works (1809-1847). | *"And says he: —Mendelssohn was a jew and Karl Marx and Mercadante and Spinoza."* — James Joyce, *Ulysses* |
| [[mender]] | noun | **1.** A skilled worker who mends or repairs things. | *"A trade, sir, that I hope I may use with a safe conscience, which is indeed, sir, a mender of bad soles."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mendicancy]] | noun | **1.** The state of being a beggar or mendicant.<br>**2.** A solicitation for money or food (especially in the street by an apparently penniless person). | *"Tuberculosis, lunacy, war and mendicancy must now cease."* — James Joyce, *Ulysses* |
| [[mendicant]] | noun | **1.** A male member of a religious order that originally relied solely on alms.<br>**2.** A pauper who lives by begging. | *"They probably despised her already; how much more they would despise her in the character of a mendicant!"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[mendicity]] | noun | **1.** The state of being a beggar or mendicant. | *"In academic literature, mendicity designates the state of being a beggar or mendicant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mending]] | noun | **1.** Garments that must be repaired.<br>**2.** The act of putting something in working order again. | *"Why, this is like the mending of highways In summer, where the ways are fair enough."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recommend]] | verb | **1.** Push for something.<br>**2.** Express a good opinion of. | *"Do not stand upon’t.— We recommend to you, tribunes of the people, Our purpose to them, and to our noble consul Wish we all joy and honour."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recommendation]] | noun | **1.** Something (as a course of action) that is recommended as advisable.<br>**2.** Something that recommends (or expresses commendation of) a person or thing as worthy or desirable. | *"Certainly, certainly!” “And to confer upon me the favour of your distinguished recommendation?” “By all means, Mademoiselle Hortense.” “A word from Mr."* — Charles Dickens, *Bleak House* |
| [[unamended]] | adjective | **1.** (of legislation) not amended. | *"In academic literature, unamended designates (of legislation) not amended."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Good & Bad]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MEND
  </div>
</div>
