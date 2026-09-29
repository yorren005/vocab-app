---
status: unread
type: root_dashboard
---
# Dashboard — phon
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">phon-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“sound or voice”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Two people conversing warmly and exchanging clear spoken words.</span>
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

The root **phon** means sound or voice. It refers to acoustic vibrations that can be heard by the ear. In English, this root forms words such as *cacophony*, *euphony*, *homophone*, and *megaphone*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: sound or voice
> The root **phon** means sound or voice. It refers to acoustic vibrations that can be heard by the ear. In English, this root forms words such as *cacophony*, *euphony*, *homophone*, and *megaphone*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Sound or voice</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Two people conversing warmly and exchanging clear spoken words.</mark>
> - **Everyday Connection**: Think of familiar words like *cacophony* and *euphony*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **phon** comes from a Latin word that means *"sound or voice"*.
  - At its core, it describes sound or voice.

- **The Big Picture Idea**:
  - Picture two people conversing warmly and exchanging clear spoken words.
  - Whenever you see **phon** in an English word, think of **talking, discussing, and communication**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of sound or voice.
  - **Mental & Social**: How people experience, organize, or communicate about sound or voice.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Cacophony**: A harsh, discordant mixture of sounds.
  - **Euphony**: The quality of being pleasing to the ear, especially through a harmonious combination of words.
  - **Homophone**: Each of two or more words having the same pronunciation but different meanings, origins, or spelling.
  - **Megaphone**: A large funnel-shaped device used for amplifying and directing the voice. 2. To shout through a megaphone.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">phon</mark>, think of <mark class="hl-def">talking, discussing, and communication</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **phon** functions as a highly productive Greek combining form:
- **Prefix Compounds with Greek Morphemes**:
  - **sym-** ("together") + *phōnē* $\to$ **symphony**, **symphonic**.
  - **poly-** ("many") + *phōnē* $\to$ **polyphony**, **polyphonic**.
  - **kako-** ("bad, harsh") + *phōnē* $\to$ **cacophony**, **cacophonous**.
  - **eu-** ("good, sweet") + *phōnē* $\to$ **euphony**, **euphonious**.
  - **homo-** ("same") + *phōnē* $\to$ **homophone**, **homophonous**.
  - **mega-** ("great, large") + *phōnē* $\to$ **megaphone**.
  - **mikro-** ("small") + *phōnē* $\to$ **microphone**.
  - **tēle-** ("far off") + *phōnē* $\to$ **telephone**, **telephonic**.
- **Linguistic & Scientific Stems**:
  - *phōnē* + *-eme* $\to$ **phoneme**, **phonemic**.
  - *phōnē* + *-tikos* $\to$ **phonetic**, **phonetics**, **phonetician**.
  - *phōnē* + *-logos* $\to$ **phonology**, **phonological**, **phonologist**.
  - *phōnē* + *-graphos* $\to$ **phonograph**.

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

The derivatives of **phon** span four major domains:
- **Music & Acoustic Aesthetics**: *symphony* (elaborate orchestral composition; harmonious blending), *polyphony* (multi-part contrapuntal music), *euphony* (pleasing harmony of sounds), *cacophony* (harsh, discordant noise).
- **Telecommunications & Audio Engineering**: *telephone* (device transmitting speech across distances), *microphone* (instrument converting sound into electrical signals), *megaphone* (cone amplifying voice), *phonograph* (sound-recording machine).
- **Theoretical & Applied Linguistics**: *phonetics* (study of the production and perception of speech sounds), *phonology* (system of relationships among speech sounds in a language), *phoneme* (smallest distinct sound unit).
- **Semantics & Orthography**: *homophone* (words pronounced the same but differing in meaning or spelling, like *bare* and *bear*).

---

## 🔀 4. Prefix & Combining Dynamics on phon

| Greek Combining Form | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`sym-`** ("together") | `sym-` + `phōnē` | Sounds agreeing together $\to$ orchestral masterpiece | *symphony, symphonic* |
| **`poly-`** ("many") | `poly-` + `phōnē` | Many voices simultaneously $\to$ contrapuntal music | *polyphony, polyphonic* |
| **`kako-`** ("bad, harsh") | `kako-` + `phōnē` | Harsh, unpleasant sound $\to$ jar of discordant noise | *cacophony, cacophonous* |
| **`eu-`** ("well, pleasant") | `eu-` + `phōnē` | Pleasant sound $\to$ harmonious vocal cadence | *euphony, euphonious* |
| **`homo-`** ("same") | `homo-` + `phōnē` | Same sound $\to$ identical pronunciation | *homophone, homophonic* |
| **`mikro-`** ("small") | `mikro-` + `phōnē` | Capturing small sounds $\to$ audio transducer | *microphone, mic* |
| **`tēle-`** ("far") | `tēle-` + `phōnē` | Sound across distances $\to$ telecom handset | *telephone, telephonic* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Audio Engineering & Acoustics**: Transducer design, frequency response, and noise cancellation (*microphone*, *megaphone*, *phonograph*).
- **Theoretical Linguistics & Phonology**: Generative phonology, acoustic phonetics, and International Phonetic Alphabet (*phoneme*, *allophone*, *phonetician*).
- **Classical Musicology & Orchestration**: Symphony orchestra composition and Renaissance polyphonic masses (*symphony*, *polyphony*).
- **Telecommunications & Mobile Technology**: Cellular communication and speech recognition software (*telephone*, *smartphone*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antiphon]] | noun | **1.** A verse or song to be chanted or sung in response. | *"In academic literature, antiphon designates a verse or song to be chanted or sung in response."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiphonal]] | noun | **1.** Bound collection of antiphons.<br>**2.** Containing or using responses; alternating. | *"After dinner the chair-bearers gathered round and with the aid of the interpreter I took down as best I could some of their calls and responses, a sort of antiphonal chorus handed down from generation to generation of coolies."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[antiphonary]] | noun | **1.** Bound collection of antiphons.<br>**2.** Relating to or resembling an antiphon or antiphony. | *"In academic literature, antiphonary designates bound collection of antiphons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiphony]] | noun | **1.** Alternate (responsive) singing by a choir in two parts.<br>**2.** A verse or song to be chanted or sung in response. | *"In academic literature, antiphony designates alternate (responsive) singing by a choir in two parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cacophonic]] | adjective | **1.** Having an unpleasant sound; - john mccarten. | *"In academic literature, cacophonic designates having an unpleasant sound; - john mccarten."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cacophonous]] | adjective | **1.** Having an unpleasant sound; - john mccarten. | *"In academic literature, cacophonous designates having an unpleasant sound; - john mccarten."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cacophony]] | noun | **1.** A loud harsh or strident noise.<br>**2.** Loud confusing disagreeable sounds. | *"In academic literature, cacophony designates a loud harsh or strident noise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[euphonic]] | adjective | **1.** Of or relating to or characterized by euphony. | *"In academic literature, euphonic designates of or relating to or characterized by euphony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[euphonical]] | adjective | **1.** Of or relating to or characterized by euphony. | *"In academic literature, euphonical designates of or relating to or characterized by euphony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[euphonious]] | adjective | **1.** Having a pleasant sound.<br>**2.** (of speech or dialect) pleasing in sound; not harsh or strident. | *"So Goslina Shaw was the euphonious sobriquet of baby No. 2, and the joyful grandame returned it to the bed beside the pale face of its mother, where 'twas quackling off to sleep, when Mr."* — Effie Afton, *Eventide* |
| [[euphonous]] | adjective | **1.** Having a pleasant sound. | *"In academic literature, euphonous designates having a pleasant sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[euphony]] | noun | **1.** Any agreeable (pleasing and harmonious) sounds. | *"If a girl she may be compelled to answer to "Little Slave," and if a boy to "Baldhead." But the names usually given indicate the place or time of birth, the hope of the parent for the child, or exhibit the parent's love of beauty or euphony."* — Isaac Taylor Headland, *The Chinese Boy and Girl* |
| [[homophone]] | noun | **1.** Two words are homophones if they are pronounced the same way but differ in meaning or spelling or both (e.g. bare and bear). | *"In academic literature, homophone designates two words are homophones if they are pronounced the same way but differ in meaning or spelling or both (e.g. bare and bear)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homophonic]] | adjective | **1.** Having the same sound.<br>**2.** Having a single melodic line with accompaniment. | *"In academic literature, homophonic designates having the same sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homophonous]] | adjective | **1.** Characteristic of the phenomenon of words of different origins that are pronounced the same way. | *"In academic literature, homophonous designates characteristic of the phenomenon of words of different origins that are pronounced the same way."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homophony]] | noun | **1.** The same pronunciation for words of different origins.<br>**2.** Part music with one dominant voice (in a homophonic style). | *"In academic literature, homophony designates the same pronunciation for words of different origins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interphone]] | noun | **1.** A telephonic intercommunication system linking different rooms in a building or ship etc. | *"A bulb flickered on his interphone set, and Marlowe shot a glance at the switch beneath it."* — Algis Budrys, *Citadel* |
| [[megaphone]] | noun | **1.** A cone-shaped acoustic device held to the mouth to intensify and direct the human voice. | *"JOHN O’CONNELL: _(Foghorns stormily through his megaphone.)_ Dignam, Patrick T, deceased."* — James Joyce, *Ulysses* |
| [[microphone]] | noun | **1.** Device for converting sound waves into electrical energy. | *"Drummer picked up a microphone, Brad beside him."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[microphoning]] | noun | **1.** The transduction of sound waves into electrical waves (by a microphone). | *"In academic literature, microphoning designates the transduction of sound waves into electrical waves (by a microphone)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phon]] | noun | **1.** A unit of subjective loudness. | *"I'm sure proud Hawk phoned." I had a hard time trying to catch up with Grandpa."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[phonate]] | verb | **1.** Utter speech sounds. | *"In academic literature, phonate designates utter speech sounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonation]] | noun | **1.** The sound made by the vibration of vocal folds modified by the resonance of the vocal tract. | *"In academic literature, phonation designates the sound made by the vibration of vocal folds modified by the resonance of the vocal tract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phone]] | noun | **1.** Electronic equipment that converts sound into electrical signals that can be transmitted over distances and then converts received signals back into sounds.<br>**2.** (phonetics) an individual sound unit of speech without concern as to whether or not it is a phoneme of some language. | *"You can 'phone from the post office." Lawrence had secured a box ten days ago, but he strolled out, thinking that the husband and wife might understand each other better when alone."* — Anthony Pryde, *Nightfall* |
| [[phone-in]] | noun | **1.** A program in which the audience participates by telephone. | *"In academic literature, phone-in designates a program in which the audience participates by telephone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonebook]] | noun | **1.** A directory containing an alphabetical list of telephone subscribers and their telephone numbers. | *"In academic literature, phonebook designates a directory containing an alphabetical list of telephone subscribers and their telephone numbers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phoneme]] | noun | **1.** (linguistics) one of a small set of speech sounds that are distinguished by the speakers of a particular language. | *"In academic literature, phoneme designates (linguistics) one of a small set of speech sounds that are distinguished by the speakers of a particular language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonemic]] | adjective | **1.** Of or relating to phonemes of a particular language.<br>**2.** By phonemics. | *"In academic literature, phonemic designates of or relating to phonemes of a particular language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonemics]] | noun | **1.** The study of the sound system of a given language and the analysis and classification of its phonemes. | *"In academic literature, phonemics designates the study of the sound system of a given language and the analysis and classification of its phonemes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phoner]] | noun | **1.** The person initiating a telephone call. | *"In academic literature, phoner designates the person initiating a telephone call."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonetic]] | adjective | **1.** Of or relating to speech sounds.<br>**2.** Of or relating to the scientific study of speech sounds. | *"Titus Munson Coan, whose familiarity with the languages of the Pacific has enabled me to harmonise the spelling of foreign words in ‘Typee’ and ‘Omoo,’ though without changing the phonetic method of printing adopted by Mr."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[phonetically]] | adverb | **1.** By phonetics. | *"Unusual polysyllables of foreign origin she interpreted phonetically or by false analogy or by both: metempsychosis (met him pike hoses), _alias_ (a mendacious person mentioned in sacred scripture)."* — James Joyce, *Ulysses* |
| [[phonetician]] | noun | **1.** A specialist in phonetics. | *"In academic literature, phonetician designates a specialist in phonetics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonetics]] | noun | **1.** The branch of acoustics concerned with speech processes including its production and perception and acoustic analysis. | *"In academic literature, phonetics designates the branch of acoustics concerned with speech processes including its production and perception and acoustic analysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phoney]] | noun | **1.** A person who professes beliefs and opinions that he or she does not hold in order to conceal his or her real feelings or motives.<br>**2.** Fraudulent; having a misleading appearance. | *"In academic literature, phoney designates a person who professes beliefs and opinions that he or she does not hold in order to conceal his or her real feelings or motives."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonic]] | adjective | **1.** Pertaining to the phonic method of teaching reading.<br>**2.** Relating to speech. | *"How was a glyphic comparison of the phonic symbols of both languages made in substantiation of the oral comparison?"* — James Joyce, *Ulysses* |
| [[phonics]] | noun | **1.** Teaching reading by training beginners to associate letters with their sound values. | *"In academic literature, phonics designates teaching reading by training beginners to associate letters with their sound values."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonogram]] | noun | **1.** Any written symbol standing for a sound or syllable or morpheme or word. | *"In academic literature, phonogram designates any written symbol standing for a sound or syllable or morpheme or word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonogramic]] | adjective | **1.** Of or relating to a phonogram. | *"In academic literature, phonogramic designates of or relating to a phonogram."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonograph]] | noun | **1.** Machine in which rotating records cause a stylus to vibrate and the vibrations are amplified acoustically or electronically. | *"Seward’s Diary._ (Kept in phonograph) _25 May._--Ebb tide in appetite to-day."* — Bram Stoker, *Dracula* |
| [[phonologic]] | adjective | **1.** Of or relating to phonology. | *"In academic literature, phonologic designates of or relating to phonology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonological]] | adjective | **1.** Of or relating to phonology. | *"In academic literature, phonological designates of or relating to phonology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonologist]] | noun | **1.** A specialist in phonology. | *"In academic literature, phonologist designates a specialist in phonology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonology]] | noun | **1.** The study of the sound system of a given language and the analysis and classification of its phonemes. | *"In academic literature, phonology designates the study of the sound system of a given language and the analysis and classification of its phonemes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonophobia]] | noun | **1.** A morbid fear of sounds including your own voice. | *"In academic literature, phonophobia designates a morbid fear of sounds including your own voice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phony]] | noun | **1.** A person who professes beliefs and opinions that he or she does not hold in order to conceal his or her real feelings or motives.<br>**2.** Fraudulent; having a misleading appearance. | *"That phony note at the Hotel Granada, for instance."* — Randall Garrett, *Deadly decoy* |
| [[polyphonous]] | adjective | **1.** Of or relating to or characterized by polyphony. | *"In academic literature, polyphonous designates of or relating to or characterized by polyphony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyphony]] | noun | **1.** Music arranged in parts for several voices or instruments. | *"In academic literature, polyphony designates music arranged in parts for several voices or instruments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saxophone]] | noun | **1.** A single-reed woodwind with a conical bore. | *"In academic literature, saxophone designates a single-reed woodwind with a conical bore."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saxophonist]] | noun | **1.** A musician who plays the saxophone. | *"In academic literature, saxophonist designates a musician who plays the saxophone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symphonic]] | adjective | **1.** Relating to or characteristic or suggestive of a symphony.<br>**2.** Harmonious in sound. | *"In academic literature, symphonic designates relating to or characteristic or suggestive of a symphony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symphonious]] | adjective | **1.** Harmonious in sound. | *"In academic literature, symphonious designates harmonious in sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symphonise]] | verb | **1.** Play or sound together, in harmony. | *"In academic literature, symphonise designates play or sound together, in harmony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symphonist]] | noun | **1.** A composer of symphonies. | *"In academic literature, symphonist designates a composer of symphonies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symphonize]] | verb | **1.** Play or sound together, in harmony. | *"In academic literature, symphonize designates play or sound together, in harmony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symphony]] | noun | **1.** A long and complex sonata for symphony orchestra.<br>**2.** A large orchestra; can perform symphonies. | *"Casaubon, or rather from the symphony of hopeful dreams, admiring trust, and passionate self devotion which that learned gentleman had set playing in her soul."* — George Eliot, *Middlemarch* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Speech & Communication]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PHON
  </div>
</div>
