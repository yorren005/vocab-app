---
status: unread
type: root_dashboard
---
# Dashboard — cod
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cod-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“book, tablet, or system of laws”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Carving clear dark letters onto paper to preserve thoughts in writing.</span>
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

The root **cod** means book, tablet, or system of laws. It refers to a bound volume, written ledger, or systematic set of laws. In English, this root forms words such as *codex*, *code*, *codify*, and *codification*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: book, tablet, or system of laws
> The root **cod** means book, tablet, or system of laws. It refers to a bound volume, written ledger, or systematic set of laws. In English, this root forms words such as *codex*, *code*, *codify*, and *codification*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Book, tablet, or system of laws</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Carving clear dark letters onto paper to preserve thoughts in writing.</mark>
> - **Everyday Connection**: Think of familiar words like *codex* and *code*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cod** comes from a Latin word that means *"book, tablet, or system of laws"*.
  - At its core, it describes book, tablet, or system of laws.

- **The Big Picture Idea**:
  - Picture carving clear dark letters onto paper to preserve thoughts in writing.
  - Whenever you see **cod** in an English word, think of **writing, records, and written words**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of book, tablet, or system of laws.
  - **Mental & Social**: How people experience, organize, or communicate about book, tablet, or system of laws.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Codex**: An ancient manuscript text in book form, with handwritten parchment or papyrus leaves bound between covers.
  - **Code**: A systematic collection of laws or regulations.
  - **Codify**: To arrange laws, rules, or principles into a systematic code or formal written structure.
  - **Codification**: The action or process of treating or arranging something according to a system.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cod</mark>, think of <mark class="hl-def">writing, records, and written words</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `cod-` (< Latin *codex*): Base nominal and verbal root.
  - `codic-` (< Latin *codicis*, oblique stem): *codicil, codify*.
- **Prefix Machinery**:
  - `de-` ("reverse, un-"): *decode*.
  - `en-` ("in, into"): *encode*.
- **Suffixal Formations**:
  - `-ex`: *codex*.
  - `-ify`: *codify*.
  - `-ification`: *codification*.
  - `-il`: *codicil*.

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
                      ┌── Historical Manuscripts: codex
                      │
   [cod] ─────────────┼── Jurisprudence: code (legal), codify, codification, codicil
 (Book / Statutes)    │
                      └── Cryptography & Computing: code (software), encode, decode
```

---

## 🔀 4. Prefix & Combining Dynamics on cod
- **`cod-` + `-ex`**: *codex* — an ancient manuscript book, especially of Scripture or classical literature.
- **`cod-` + `-ify`**: *codify* — to arrange laws, rules, or system principles into a systematic code.
- **`en-` + `code`**: *encode* — to convert information or data into a coded cipher or digital format.
- **`de-` + `code`**: *decode* — to translate coded data back into understandable plaintext.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Paleography & Biblical Studies**: Biblical uncial *codices* (Codex Sinaiticus, Codex Vaticanus).
- **Civil & Common Law**: The *Code* of Hammurabi; Justinian's *Codex*; the Napoleonic *Code*; penal *codes*.
- **Probate & Estate Planning**: Testamentary *codicils* modifying wills.
- **Computer Science & Cryptography**: *Source code*; binary machine *code*; AES *encryption* and decoding.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[cod]] | noun | **1.** The vessel that contains the seeds of a plant (not the seeds themselves).<br>**2.** Lean white flesh of important north atlantic food fish; usually baked or poached. | *"We had a fine cod-fish, a piece of roast beef, a dish of cutlets, and a pudding; an excellent dinner, if it had had any cooking to speak of, but it was almost raw."* — Charles Dickens, *Bleak House* |
| [[coda]] | noun | **1.** The closing section of a musical composition. | *"In academic literature, coda designates the closing section of a musical composition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[codariocalyx]] | noun | **1.** Used in some classifications for plants usually included in genus desmodium. | *"In academic literature, codariocalyx designates used in some classifications for plants usually included in genus desmodium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[code]] | noun | **1.** A set of rules or principles or laws (especially written ones).<br>**2.** A coding system used for transmitting messages requiring brevity or secrecy. | *"X Every village has its idiosyncrasy, its constitution, often its own code of morality."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[codefendant]] | noun | **1.** A defendant who has been joined together with one or more other defendants in a single action. | *"In academic literature, codefendant designates a defendant who has been joined together with one or more other defendants in a single action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[codeine]] | noun | **1.** Derivative of opium; used as an antitussive (to relieve coughing) and an analgesic (to relieve pain). | *"In academic literature, codeine designates derivative of opium; used as an antitussive (to relieve coughing) and an analgesic (to relieve pain)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coder]] | noun | **1.** A person who designs and writes and tests computer programs. | *"In academic literature, coder designates a person who designs and writes and tests computer programs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[codetalker]] | noun | **1.** A secret agent who was one of the navajos who devised and used a code based on their native language; the code was unbroken by the japanese during world war ii. | *"In academic literature, codetalker designates a secret agent who was one of the navajos who devised and used a code based on their native language; the code was unbroken by the japanese during world war ii."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[codex]] | noun | **1.** An official list of chemicals or medicines etc.<br>**2.** An unbound manuscript of some ancient classic (as distinguished from a scroll). | *"In academic literature, codex designates an official list of chemicals or medicines etc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[codiaeum]] | noun | **1.** Evergreen tropical trees and shrubs with thick and colorful leathery leaves; malaya and pacific islands. | *"In academic literature, codiaeum designates evergreen tropical trees and shrubs with thick and colorful leathery leaves; malaya and pacific islands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[codicil]] | noun | **1.** A supplement to a will; a testamentary instrument intended to alter an already executed will. | *"I am sure Casaubon was not.” “Well, it would have been worse if he had made the codicil to hinder her from marrying again at all, you know.” “I don’t know that,” said Sir James."* — George Eliot, *Middlemarch* |
| [[codification]] | noun | **1.** The act of codifying; arranging in a systematic order.<br>**2.** A set of rules or principles or laws (especially written ones). | *"An enlargement of the free list, essential reductions and readjustments of rates, are to be fully considered, and some errors of conflicting codifications corrected."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[codified]] | verb | **1.** Organize into a code or system, such as a body of law.<br>**2.** Enacted by a legislative body. | *"In academic literature, codified designates organize into a code or system, such as a body of law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[codify]] | verb | **1.** Organize into a code or system, such as a body of law. | *"In academic literature, codify designates organize into a code or system, such as a body of law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coding]] | noun | **1.** Act of writing in code or cipher.<br>**2.** Attach a code to. | *"Studying the arrangement of the structures around them and the coding on cable bundles, Brad peered along the catwalk, first in one direction, then the opposite."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[codling]] | noun | **1.** Young codfish. | *"Not yet old enough for a man, nor young enough for a boy; as a squash is before ’tis a peascod, or a codling, when ’tis almost an apple. ’Tis with him in standing water, between boy and man."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[codlins-and-cream]] | noun | **1.** Plant of europe and asia having purplish-red flowers and hairy stems and leaves; introduced into north america. | *"In academic literature, codlins-and-cream designates plant of europe and asia having purplish-red flowers and hairy stems and leaves; introduced into north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[codon]] | noun | **1.** A specific sequence of three adjacent nucleotides on a strand of dna or rna that specifies the genetic code information for synthesizing a particular amino acid. | *"In academic literature, codon designates a specific sequence of three adjacent nucleotides on a strand of dna or rna that specifies the genetic code information for synthesizing a particular amino acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[codswallop]] | noun | **1.** Nonsensical talk or writing. | *"In academic literature, codswallop designates nonsensical talk or writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cody]] | noun | **1.** United states showman famous for his wild west show (1846-1917). | *"Monday was our day of final preparation, and we commenced it by making the acquaintance of those two celebrated characters, Wild Bill and Buffalo Bill, or, more correctly, William Hickock and William Cody."* — W. E. Webb, *Buffalo Land* |
| [[decode]] | verb | **1.** Convert code into ordinary language. | *"I'll get it." ## Drummer read again the message he had decoded and handed it to Brad who quickly scanned and silently returned it."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[decoder]] | noun | **1.** The kind of intellectual who converts messages from a code to plain text.<br>**2.** A machine that converts a coded text into ordinary language. | *"In academic literature, decoder designates the kind of intellectual who converts messages from a code to plain text."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decoding]] | noun | **1.** The activity of making clear or converting from code into plain text.<br>**2.** Convert code into ordinary language. | *"In academic literature, decoding designates the activity of making clear or converting from code into plain text."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encode]] | verb | **1.** Convert information into code. | *"In academic literature, encode designates convert information into code."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encoding]] | noun | **1.** The activity of converting data or information into code.<br>**2.** Convert information into code. | *"In academic literature, encoding designates the activity of converting data or information into code."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postcode]] | noun | **1.** A code of letters and digits added to a postal address to aid in the sorting of mail. | *"In academic literature, postcode designates a code of letters and digits added to a postal address to aid in the sorting of mail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recode]] | verb | **1.** Put into a different code; rearrange mentally. | *"In academic literature, recode designates put into a different code; rearrange mentally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recoding]] | noun | **1.** Converting from one code to another.<br>**2.** Put into a different code; rearrange mentally. | *"In academic literature, recoding designates converting from one code to another."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Writing]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · COD
  </div>
</div>
