---
status: unread
type: root_dashboard
---
# Dashboard — ton
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ton-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to sound, thunder, or pitch”</span>
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

The root **ton** means to sound, thunder, or pitch. It refers to acoustic vibrations that can be heard by the ear. In English, this root forms words such as *astonish*, *astonishing*, *astonishment*, and *attune*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to sound, thunder, or pitch
> The root **ton** means to sound, thunder, or pitch. It refers to acoustic vibrations that can be heard by the ear. In English, this root forms words such as *astonish*, *astonishing*, *astonishment*, and *attune*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To sound, thunder, or pitch</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Two people conversing warmly and exchanging clear spoken words.</mark>
> - **Everyday Connection**: Think of familiar words like *astonish* and *astonishing*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ton** comes from a Latin word that means *"to sound, thunder, or pitch"*.
  - At its core, it describes the action of sound, thunder, or pitch.

- **The Big Picture Idea**:
  - Picture two people conversing warmly and exchanging clear spoken words.
  - Whenever you see **ton** in an English word, think of **to sound, thunder, or pitch**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to sound, thunder, or pitch).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Astonish**: To surprise or impress someone greatly.
  - **Astonishing**: Extremely surprising or impressive.
  - **Astonishment**: Great surprise or amazement.
  - **Attune**: To bring into accord or a sympathetic relationship. 2. To adjust a musical instrument.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ton</mark>, think of <mark class="hl-def">to sound, thunder, or pitch</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **ton** operates via two separate word-formation tracks:
- **Greek & Latin Musical / Acoustic Track (`ton-` < *tonus*)**:
  - *tonus* $\to$ **tone**, **tonic**, **tonal**, **tonality**.
  - *in-* + *tonus* $\to$ Medieval Latin *intonāre* $\to$ **intone**, **intonation**.
  - *ad-* + *tonus* $\to$ Old French *aturner* $\to$ **attune**.
  - *monos* ("single") + *tónos* $\to$ **monotone**, **monotonous**, **monotony**, **monotonic**.
  - *dia-* ("through") + *tónos* $\to$ **diatonic**.
  - *syn-* ("with") + *tónos* $\to$ **syntonic**.
- **Latin Atmospheric / Explosive Track (`tonā-` < *tonāre*)**:
  - *de-* ("down, off") + *tonāre* $\to$ **detonate**, **detonation**, **detonator**.
  - *ex-* ("out") + *tonāre* $\to$ Vulgar Latin *\*extonāre* $\to$ **astonish**, **astonishing**, **astonishment**, **astound**, **stun**.

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

The derivatives of **ton** span four distinct conceptual spheres:
- **Phonetics & Vocal Cadence**: *tone* (pitch, character, or attitude of voice), *intone* (chant or recite with little rise and fall), *intonation* (the rise and fall of voice pitch in speaking), *monotone* (unvarying pitch).
- **Musicology & Harmony**: *tonality* (system of musical keys), *tonic* (the first scale degree or keynote), *diatonic* (involving standard scale intervals).
- **Physiology & Medical Health**: *tonic* (invigorating substance; tension of muscle tissue), *tonus* (normal state of balanced tension in tissues).
- **Explosives & Psychological Shock**: *detonate* (explode with sudden violence), *detonation*, *detonator*, *astonish* (surprise or impress greatly; literally strike with thunder), *astonishment*.

---

## 🔀 4. Prefix & Combining Dynamics on ton

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`in-`** ("in, into") | `in-` + `tonāre` | Chant into a resonant pitch $\to$ chant prayers, recite solemnly | *intone, intonation* |
| **`monos`** ("single") | `monos` + `tónos` | A single unvarying pitch $\to$ boring sameness, tedious repetition | *monotone, monotonous, monotony* |
| **`ad-`** ("to") | `ad-` + `tonus` | Bring into harmonic pitch with $\to$ harmonize, adapt | *attune* |
| **`de-`** ("down, away") | `de-` + *tonāre* | Thunder down violently $\to$ trigger explosive shockwave | *detonate, detonation, detonator* |
| **`ex-`** ("out") | `ex-` + *tonāre* | Strike senseless with a thunderbolt $\to$ bewilder with awe | *astonish, astonishment, astound* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Linguistics, Orthoepy & Prosody**: Pitch contours, lexical tones in tonal languages like Mandarin, and declarative vs interrogative intonation (*intonation*, *tone*).
- **Music Theory & Composition**: Tonal centers, twelve-tone systems, and scale modes (*tonality*, *tonic*, *atonal*, *diatonic*).
- **Mining, Demolition & Military Engineering**: High-explosive shockwaves, blasting caps, and detonation velocities (*detonate*, *detonator*).
- **Psychology & Cognitive Emotion**: Emotional shock, wonder, and sensory overwhelm (*astonishment*, *astounding*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antiproton]] | noun | **1.** An unstable negatively charged proton; the antiparticle of a proton. | *"In academic literature, antiproton designates an unstable negatively charged proton; the antiparticle of a proton."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antoninus]] | noun | **1.** Emperor of rome; nephew and son-in-law and adoptive son of antonius pius; stoic philosopher; the decline of the roman empire began under marcus aurelius (121-180). | *"Justin addressed an _Apology_ to Antoninus Pius, and one-half of his book is occupied with the demonstration that every major characteristic of Christianity had been prophesied and was a fulfilment."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[antonius]] | noun | **1.** Roman general under julius caesar in the gallic wars; repudiated his wife for the egyptian queen cleopatra; they were defeated by octavian at actium (83-30 bc). | *"Is Caesar with Antonius prized so slight?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[antony]] | noun | **1.** Roman general under julius caesar in the gallic wars; repudiated his wife for the egyptian queen cleopatra; they were defeated by octavian at actium (83-30 bc). | *"Another Room in Antony’s House."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[antonym]] | noun | **1.** A word that expresses a meaning opposed to the meaning of another word, in which case the two words are antonyms of each other. | *"In academic literature, antonym designates a word that expresses a meaning opposed to the meaning of another word, in which case the two words are antonyms of each other."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antonymous]] | adjective | **1.** Of words: having opposite meanings. | *"In academic literature, antonymous designates of words: having opposite meanings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antonymy]] | noun | **1.** The semantic relation that holds between two words that can (in a given context) express opposite meanings. | *"In academic literature, antonymy designates the semantic relation that holds between two words that can (in a given context) express opposite meanings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astonied]] | adjective | **1.** Filled with the emotional impact of overwhelming surprise or shock. | *"In academic literature, astonied designates filled with the emotional impact of overwhelming surprise or shock."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astonish]] | verb | **1.** Affect with wonder. | *"He lost a wife Whose beauty did astonish the survey Of richest eyes; whose words all ears took captive; Whose dear perfection hearts that scorn’d to serve Humbly call’d mistress."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[astonished]] | verb | **1.** Affect with wonder.<br>**2.** Filled with the emotional impact of overwhelming surprise or shock. | *"No, neither he, nor his compeers by night Giving him aid, my verse astonished."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[astonishing]] | verb | **1.** Affect with wonder.<br>**2.** Surprising greatly. | *"I am so accustomed and inured to hard work that I don’t know what fatigue is.” We murmured that it was very astonishing and very gratifying, or something to that effect."* — Charles Dickens, *Bleak House* |
| [[astonishingly]] | adverb | **1.** In an amazing manner; to everyone's surprise. | *"More than this—astonishingly more—his head was upon her lap, his face and neck were disagreeably wet, and her fingers were unbuttoning his collar."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[astonishment]] | noun | **1.** The feeling that accompanies something extremely surprising. | *"She dug with growing astonishment into her box, which seemed to be filled with ever new and more marvellous objects."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[cotoneaster]] | noun | **1.** Any shrub of the genus cotoneaster: erect or creeping shrubs having richly colored autumn foliage and many small white to pinkish flowers followed by tiny red or black fruits. | *"In academic literature, cotoneaster designates any shrub of the genus cotoneaster: erect or creeping shrubs having richly colored autumn foliage and many small white to pinkish flowers followed by tiny red or black fruits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cotonou]] | noun | **1.** Chief port of benin on the bight of benin. | *"In academic literature, cotonou designates chief port of benin on the bight of benin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[detonate]] | verb | **1.** Cause to burst with a violent release of energy.<br>**2.** Burst and release energy as through a violent chemical or physical reaction. | *"Can we detonate it with our guns from here?"* — Meyer Moldeven, *The Universe — or Nothing* |
| [[detonation]] | noun | **1.** A violent release of energy caused by a chemical or nuclear reaction.<br>**2.** The act of detonating an explosive. | *"The fireball had a two thousand-kay radius, and the piggybacked neutronic dispenser, once the cloud was released by the detonation, would inflict radiation death throughout tens of thousands of kay in all directions."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[detonative]] | adjective | **1.** Exploding almost instantaneously. | *"In academic literature, detonative designates exploding almost instantaneously."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[detonator]] | noun | **1.** A mechanical or electrical explosive device or a small amount of explosive; can be used to initiate the reaction of a disrupting explosive. | *"The former is comparatively harmless, but it acts as the trigger or detonator which lets loose the force pent up in the innocent-looking coal-dust."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[etonian]] | noun | **1.** A student enrolled in (or graduated from) eton college. | *"In academic literature, etonian designates a student enrolled in (or graduated from) eton college."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intonate]] | verb | **1.** Speak carefully, as with rising and falling pitch or in a particular tone.<br>**2.** Recite with musical intonation; recite as a chant or a psalm. | *"In academic literature, intonate designates speak carefully, as with rising and falling pitch or in a particular tone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intonation]] | noun | **1.** Rise and fall of the voice pitch.<br>**2.** Singing by a soloist of the opening piece of plainsong. | *"I suppose you received a letter from our Rector telling you of the refusal to teach the boys any further." This was said with a less severe intonation."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[intone]] | verb | **1.** Utter monotonously and repetitively and rhythmically.<br>**2.** Recite with musical intonation; recite as a chant or a psalm. | *"M. le Curé stood up in the midst of us and began to intone the psalm: [He has a beautiful voice."* — Mrs. Oliphant, *A Beleaguered City* |
| [[intoned]] | verb | **1.** Utter monotonously and repetitively and rhythmically.<br>**2.** Recite with musical intonation; recite as a chant or a psalm. | *"Lock down, fore and aft," Brad intoned."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[octonary]] | noun | **1.** The cardinal number that is the sum of seven and one. | *"In academic literature, octonary designates the cardinal number that is the sum of seven and one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overtone]] | noun | **1.** (usually plural) an ulterior implicit meaning or quality.<br>**2.** A harmonic with a frequency that is a multiple of the fundamental frequency. | *"There again: the overtone following through the air."* — James Joyce, *Ulysses* |
| [[proton]] | noun | **1.** A stable particle with positive charge equal to the negative charge of an electron. | *"As soon as you pick up anything with it, Ben will throw his switch, and whatever is at the end of it will get a dose of pure protons."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[seton]] | noun | **1.** United states religious leader who was the first person born in the united states to be canonized (1774-1821). | *"The operator takes a very sharp bone of an ape, rubs it with a pungent spice, and then pinching up the skin of his son's arm he pierces it with the bone through and through, as a surgeon might introduce a seton."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[subtonic]] | noun | **1.** (music) the seventh note of the diatonic scale. | *"In academic literature, subtonic designates (music) the seventh note of the diatonic scale."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supertonic]] | noun | **1.** (music) the second note of a diatonic scale. | *"In academic literature, supertonic designates (music) the second note of a diatonic scale."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ton]] | noun | **1.** A united states unit of weight equivalent to 2000 pounds.<br>**2.** A british unit of weight equivalent to 2240 pounds. | *"FRENCH SOLDIER. _Est-il impossible d’échapper la force de ton bras?_ PISTOL."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tonal]] | adjective | **1.** Employing variations in pitch to distinguish meanings of otherwise similar words.<br>**2.** Having tonality; i.e. tones and chords organized in relation to one tone such as a keynote or tonic. | *"In academic literature, tonal designates employing variations in pitch to distinguish meanings of otherwise similar words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonality]] | noun | **1.** Any of 24 major or minor diatonic scales that provide the tonal framework for a piece of music. | *"In academic literature, tonality designates any of 24 major or minor diatonic scales that provide the tonal framework for a piece of music."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tone]] | noun | **1.** The quality of a person's voice.<br>**2.** (linguistics) a pitch or change in pitch of the voice that serves to distinguish words in tonal languages. | *"I am doing the right thing," said Mäzli now in the most decided tone."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[tone-beginning]] | noun | **1.** A decisive manner of beginning a musical tone or phrase. | *"In academic literature, tone-beginning designates a decisive manner of beginning a musical tone or phrase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tone-deaf]] | adjective | **1.** Unable to appreciate music. | *"In academic literature, tone-deaf designates unable to appreciate music."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[toned]] | verb | **1.** Utter monotonously and repetitively and rhythmically.<br>**2.** Vary the pitch of one's speech. | *"But I rather liked him.” “Do you now?” “Of course not—what footsteps are those I hear?” Liddy looked from a back window into the courtyard behind, which was now getting low-toned and dim with the earliest films of night."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[toneless]] | adjective | **1.** Lacking in tone or expression. | *"Halfred Hamundson," she began--and her voice was loud, yet toneless--"Answers I demand to two questions, before these ten hundred hearers in thy hall."* — Felix Dahn, *Saga of Halfred the Sigskald: A Northern Tale of the Tenth Century* |
| [[tonelessly]] | adverb | **1.** In a monotone. | *"In academic literature, tonelessly designates in a monotone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[toner]] | noun | **1.** A solution containing chemicals that can change the color of a photographic print.<br>**2.** A black or colored powder used in a printer to develop a xerographic image. | *"In academic literature, toner designates a solution containing chemicals that can change the color of a photographic print."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonic]] | noun | **1.** Lime- or lemon-flavored carbonated water containing quinine.<br>**2.** A sweet drink containing carbonated water and flavoring. | *"And more needles were missing than it could be regarded as quite wholesome for a patient of such tender years either to apply externally or to take as a tonic."* — Charles Dickens, *Great Expectations* |
| [[tonicity]] | noun | **1.** The elastic tension of living muscles, arteries, etc. that facilitate response to stimuli. | *"In academic literature, tonicity designates the elastic tension of living muscles, arteries, etc. that facilitate response to stimuli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonight]] | noun | **1.** The present or immediately coming night.<br>**2.** During the night of the present day. | *"Good fortune and the favour of the king Smile upon this contract; whose ceremony Shall seem expedient on the now-born brief, And be perform’d tonight."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tonnage]] | noun | **1.** A tax imposed on ships that enter the us; based on the tonnage of the ship. | *"A state tax on railroad tonnage (Pennsylvania, 1860) was declared unconstitutional by the United States Supreme Court."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[tonne]] | noun | **1.** A unit of weight equivalent to 1000 kilograms. | *"In academic literature, tonne designates a unit of weight equivalent to 1000 kilograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonocard]] | noun | **1.** Antiarrhythmic drug (trade name tonocard) used to treat ventricular arrhythmias when less dangerous drugs have failed. | *"In academic literature, tonocard designates antiarrhythmic drug (trade name tonocard) used to treat ventricular arrhythmias when less dangerous drugs have failed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonometer]] | noun | **1.** Measuring instrument for measuring tension or pressure (especially for measuring intraocular pressure in testing for glaucoma). | *"In academic literature, tonometer designates measuring instrument for measuring tension or pressure (especially for measuring intraocular pressure in testing for glaucoma)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonometry]] | noun | **1.** The measurement of intraocular pressure by determining the amount of force needed to make a slight indentation in the cornea. | *"In academic literature, tonometry designates the measurement of intraocular pressure by determining the amount of force needed to make a slight indentation in the cornea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tons]] | noun | **1.** A large number or amount.<br>**2.** A united states unit of weight equivalent to 2000 pounds. | *"Under the church of that there parish lie my ancestors—hundreds of ’em—in coats of mail and jewels, in gr’t lead coffins weighing tons and tons."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[tonsil]] | noun | **1.** Either of two masses of lymphatic tissue one on each side of the oral pharynx. | *"For swollen glands the god told me to use a cold gargle, when I consulted him about it, and he ordered the same treatment for inflamed tonsils."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[tonsilla]] | noun | **1.** Either of two masses of lymphatic tissue one on each side of the oral pharynx. | *"In academic literature, tonsilla designates either of two masses of lymphatic tissue one on each side of the oral pharynx."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonsillectomy]] | noun | **1.** Surgical removal of the palatine tonsils; commonly performed along with adenoidectomy. | *"In academic literature, tonsillectomy designates surgical removal of the palatine tonsils; commonly performed along with adenoidectomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonsillitis]] | noun | **1.** Inflammation of the tonsils (especially the palatine tonsils). | *"In academic literature, tonsillitis designates inflammation of the tonsils (especially the palatine tonsils)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonsorial]] | adjective | **1.** Of or relating to barbers and barbering. | *"In academic literature, tonsorial designates of or relating to barbers and barbering."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonsure]] | noun | **1.** The shaved crown of a monk's or priest's head.<br>**2.** Shaving the crown of the head by priests or members of a monastic order. | *"Near the eastern window is the sculptured head of a friar, with the tonsure, but otherwise quite disfigured."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[tonsured]] | verb | **1.** Shave the head of a newly inducted monk.<br>**2.** Having a bald spot either shaved or natural. | *"On her tower, high up clomb Bramimunde, Around her there the clerks and canons stood Of the false law, whom God ne'er loved nor knew; Orders they'd none, nor were their heads tonsured."* — Classic Author, *The Song of Roland* |
| [[tontine]] | noun | **1.** A form of life insurance whereby on the death or default of a participant his share is distributed to the remaining members.<br>**2.** An annuity scheme wherein participants share certain benefits and on the death of any participant his benefits are redistributed among the remaining participants; can run for a fixed period of time or until the death of all but one participant. | *"In academic literature, tontine designates a form of life insurance whereby on the death or default of a participant his share is distributed to the remaining members."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonus]] | noun | **1.** The elastic tension of living muscles, arteries, etc. that facilitate response to stimuli. | *"In academic literature, tonus designates the elastic tension of living muscles, arteries, etc. that facilitate response to stimuli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undertone]] | noun | **1.** A quiet or hushed tone of voice.<br>**2.** A subdued emotional quality underlying an utterance; implicit meaning. | *"Call the next witness.” And he added in an undertone to the Queen, “Really, my dear, _you_ must cross-examine the next witness."* — Lewis Carroll, *Alice's Adventures in Wonderland* |

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
    ROOT DASHBOARD · TON
  </div>
</div>
