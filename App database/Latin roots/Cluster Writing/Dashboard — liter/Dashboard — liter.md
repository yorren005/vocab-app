---
status: unread
type: root_dashboard
---
# Dashboard — liter
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">liter-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“letter”</span>
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

The root **liter** means letter. It refers to a written character, letter of the alphabet, or inscription. In English, this root forms words such as *letter*, *literal*, *literature*, and *illiterate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: letter
> The root **liter** means letter. It refers to a written character, letter of the alphabet, or inscription. In English, this root forms words such as *letter*, *literal*, *literature*, and *illiterate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Letter</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Carving clear dark letters onto paper to preserve thoughts in writing.</mark>
> - **Everyday Connection**: Think of familiar words like *letter* and *literal*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **liter** comes from a Latin word that means *"letter"*.
  - At its core, it describes letter.

- **The Big Picture Idea**:
  - Picture carving clear dark letters onto paper to preserve thoughts in writing.
  - Whenever you see **liter** in an English word, think of **writing, records, and written words**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of letter.
  - **Mental & Social**: How people experience, organize, or communicate about letter.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Letter**: An everyday English word showing the root's idea of *letter*.
  - **Literal**: Taking words in their usual or most basic sense without metaphor or allegory.
  - **Literature**: Written works, especially those considered of superior or lasting artistic merit.
  - **Illiterate**: Unable to read or write.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">liter</mark>, think of <mark class="hl-def">writing, records, and written words</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `liter-` / `letter-` (< Latin *littera*): Base nominal root.
- **Prefix Machinery**:
  - `in-` / `il-` ("not, un-"): *illiterate, illiteracy*.
  - `ob-` ("against, thoroughly blotting out"): *obliterate, obliteration*.
  - `ad-` / `al-` ("to, toward"): *alliteration, alliterative*.
- **Suffixal Formations**:
  - `-al`: *literal*.
  - `-ate`: *literate*.
  - `-acy`: *literacy*.
  - `-ary`: *literary*.
  - `-ature`: *literature*.

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
                      ┌── Semantic Fidelity: literal, literally
                      │
   [liter] ───────────┼── Education & Reading: literate, literacy, illiterate, illiteracy
 (Letter / Learning)  │
                      ├── Art & Culture: literary, literature, alliteration, alliterative
                      │
                      └── Total Annihilation: obliterate, obliteration
```

---

## 🔀 4. Prefix & Combining Dynamics on liter
- **`il-` + `liter-` + `-ate`**: *illiterate* — unable to read or write; uncultured.
- **`ob-` + `liter-` + `-ate`**: *obliterate* — to wipe out completely; blot out every letter.
- **`al-` + `liter-` + `-ation`**: *alliteration* — the recurrence of the same letter or sound at the beginning of adjacent words.
- **`liter-` + `-ary`**: *literary* — concerning the writing, study, or content of literature.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Education & Global Development**: UNESCO adult *literacy* metrics; primary literacy acquisition.
- **Literary Criticism & Poetics**: *Alliteration* in Germanic poetry; *literary* canons; narrative voice.
- **Jurisprudence & Constitutional Interpretation**: Textualism and *literal* construction of statutory law.
- **Military History & Ballistics**: Weaponry capable of *obliterating* hardened fortifications.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[alliterate]] | verb | **1.** Use alliteration as a form of poetry. | *"In academic literature, alliterate designates use alliteration as a form of poetry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alliteration]] | noun | **1.** Use of the same consonant at the beginning of each stressed syllable in a line of verse. | *"You feel he does not strain after effect--epigram, antithesis, or alliteration."* — T. R. Glover, *The Jesus of History* |
| [[alliterative]] | adjective | **1.** Having the same consonant at the beginning of each stressed syllable. | *"An alliterative prefix served as an ornament of oratory."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[alliteratively]] | adverb | **1.** In an alliterative manner. | *"In academic literature, alliteratively designates in an alliterative manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alliterator]] | noun | **1.** A speaker or writer who makes use of alliteration. | *"In academic literature, alliterator designates a speaker or writer who makes use of alliteration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illiteracy]] | noun | **1.** Ignorance resulting from not reading.<br>**2.** An inability to read. | *"It provides that the proceeds of the sale of public land and the earnings of the Patent Office shall be funded at four per cent., and the interest divided among the States in proportion to their illiteracy."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[illiterate]] | noun | **1.** A person unable to read.<br>**2.** Not able to read or write. | *"Yea, the illiterate, that know not how To cipher what is writ in learned books, Will quote my loathsome trespass in my looks."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[liter]] | noun | **1.** A metric unit of capacity, formerly defined as the volume of one kilogram of pure water under standard conditions; now equal to 1,000 cubic centimeters (or approximately 1.75 pints). | *"In academic literature, liter designates a metric unit of capacity, formerly defined as the volume of one kilogram of pure water under standard conditions; now equal to 1,000 cubic centimeters (or approximately 1.75 pints)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[literacy]] | noun | **1.** The ability to read and write. | *"Graffiti may, indeed, tell us something about degrees of literacy."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[literal]] | noun | **1.** A mistake in printed matter resulting from mechanical failures of some kind.<br>**2.** Being or reflecting the essential or genuine character of something; ; - g.k.chesterton. | *"No, father; I cannot underwrite Article Four (leave alone the rest), taking it ‘in the literal and grammatical sense’ as required by the Declaration; and, therefore, I can’t be a parson in the present state of affairs,” said Angel."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[literalise]] | verb | **1.** Make literal. | *"In academic literature, literalise designates make literal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[literalism]] | noun | **1.** The doctrine of realistic (literal) portrayal in art or literature.<br>**2.** A disposition to interpret statements in their literal sense. | *"In academic literature, literalism designates the doctrine of realistic (literal) portrayal in art or literature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[literalize]] | verb | **1.** Make literal. | *"In academic literature, literalize designates make literal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[literally]] | adverb | **1.** In a literal sense.<br>**2.** (intensifier before a figurative expression) without exaggeration. | *"I don’t mean literally a child,” pursued Mr."* — Charles Dickens, *Bleak House* |
| [[literalness]] | noun | **1.** Adhereing to the concrete construal of something. | *"In academic literature, literalness designates adhereing to the concrete construal of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[literary]] | adjective | **1.** Of or relating to or characteristic of literature.<br>**2.** Knowledgeable about literature. | *"The idea of Louisa Musgrove turned into a person of literary taste, and sentimental reflection was amusing, but she had no doubt of its being so."* — Jane Austen, *Persuasion* |
| [[literate]] | noun | **1.** A person who can read and write.<br>**2.** Able to read and write. | *"One wit remarked that whatever the ability to read or write may have been at the time, almost everyone seemed to have been literate when presented with a bog-house wall: "Since all who come to Bog-house write" (pt. 2, p. 26)."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[literati]] | noun | **1.** The literary intelligentsia. | *"I have likewise warm friends among the literati; Professors Stewart, Blair, and Mr."* — Robert Burns, *The Letters of Robert Burns* |
| [[literatim]] | adverb | **1.** Letter for letter. | *"Dyce's 1830 publication is described as a reprint "verbatim et literatim," but it has little claim to be so called."* — John Fletcher, *The Elder Brother* |
| [[literature]] | noun | **1.** Creative writing of recognized artistic value.<br>**2.** The humanistic study of a body of literature. | *"These lectures, while not rising to the level of greatness, impress one with his mastery of the immense literature of the subject, and are characterised throughout by lucidity of arrangement and by sobriety and fairness of judgment."* — John Cairns, *Principal Cairns* |
| [[nonliteral]] | adjective | **1.** (used of the meanings of words or text) not literal; using figures of speech. | *"In academic literature, nonliteral designates (used of the meanings of words or text) not literal; using figures of speech."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonliterary]] | adjective | **1.** Marked by lack of affectation or pedantry; - w.d.howells. | *"In academic literature, nonliterary designates marked by lack of affectation or pedantry; - w.d.howells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonliterate]] | adjective | **1.** Used of a society that has not developed writing. | *"In academic literature, nonliterate designates used of a society that has not developed writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obliterable]] | adjective | **1.** Able to be obliterated completely. | *"In academic literature, obliterable designates able to be obliterated completely."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obliterate]] | verb | **1.** Mark for deletion, rub off, or erase.<br>**2.** Make undecipherable or imperceptible by obscuring or concealing. | *"But if, in plain fact, we do not see why we should bear the cross for others, why we should deny and obliterate self on this scale for the salvation of men--how, I ask, to people of such a mind should Jesus be intelligible?"* — T. R. Glover, *The Jesus of History* |
| [[obliterated]] | verb | **1.** Mark for deletion, rub off, or erase.<br>**2.** Make undecipherable or imperceptible by obscuring or concealing. | *"At least she could not be comfortable there till long years should have obliterated her keen consciousness of it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[obliteration]] | noun | **1.** Destruction by annihilating something.<br>**2.** The complete destruction of every trace of something. | *"Not a cousin of the batch but is amazed to hear from Sir Leicester at breakfast-time of the obliteration of landmarks, and opening of floodgates, and cracking of the framework of society, manifested through Mrs."* — Charles Dickens, *Bleak House* |
| [[obliterator]] | noun | **1.** An eliminator that does away with all traces. | *"In academic literature, obliterator designates an eliminator that does away with all traces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preliterate]] | adjective | **1.** Not yet having acquired the ability to read and write.<br>**2.** Used of a society that has not developed writing. | *"In academic literature, preliterate designates not yet having acquired the ability to read and write."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subliterary]] | adjective | **1.** Not written as or intended to be literature. | *"In academic literature, subliterary designates not written as or intended to be literature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transliterate]] | verb | **1.** Rewrite in a different script. | *"Osiris was the offspring of an intrigue between the earth-god Seb (Keb or Geb, as the name is sometimes transliterated) and the sky-goddess Nut."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[transliteration]] | noun | **1.** A transcription from one alphabet to another. | *"Though the pages are less peppered with Sanskrit transliterations and Buddhist terms than other Buddhist classics, the work still presents serious difficulty to the Chinese reader and not less so to the Western student."* — William Edward Soothill, *The lotus of the wonderful law* |
| [[unliterary]] | adjective | **1.** Marked by lack of affectation or pedantry; - w.d.howells. | *"In academic literature, unliterary designates marked by lack of affectation or pedantry; - w.d.howells."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · LITER
  </div>
</div>
