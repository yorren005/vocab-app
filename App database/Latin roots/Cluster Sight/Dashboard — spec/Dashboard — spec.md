---
status: unread
type: root_dashboard
---
# Dashboard — spec
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">spec-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to look at, observe, or behold”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking through clear glass and observing every fine detail in view.</span>
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

The root **spec** means to look at, observe, or behold. It refers to the action of looking and carrying out this process. In English, this root forms words such as *blind*, *special*, *specialist*, and *specialize*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to look at, observe, or behold
> The root **spec** means to look at, observe, or behold. It refers to the action of looking and carrying out this process. In English, this root forms words such as *blind*, *special*, *specialist*, and *specialize*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To look at, observe, or behold</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking through clear glass and observing every fine detail in view.</mark>
> - **Everyday Connection**: Think of familiar words like *blind* and *special*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **spec** comes from a Latin word that means *"to look at, observe, or behold"*.
  - At its core, it describes the action of look at, observe, or behold.

- **The Big Picture Idea**:
  - Picture looking through clear glass and observing every fine detail in view.
  - Whenever you see **spec** in an English word, think of **to look at, observe, or behold**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to look at, observe, or behold).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Blind**: An everyday English word showing the root's idea of *to look at, observe, or behold*.
  - **Special**: Better, greater, or different from what is usual. 2. Something designed for a particular event.
  - **Specialist**: A person who concentrates primarily on a particular subject or activity.
  - **Specialize**: To concentrate on and become an expert in a particular subject, skill, or market.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">spec</mark>, think of <mark class="hl-def">to look at, observe, or behold</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Base Noun (`speciēs`):** *species* (biological category; distinct kind).
- **Adjectival Base (`-al`):** *special* (belonging to a particular kind; exceptional), *specialist*, *specialize*, *specialty*.
- **Factitive Compound (`-fic` < `facere`):** *speciēs* + *facere* $\to$ *specific*, *specify*, *specification*.
- **Deceptive Appearance Base (`-ous`):** *speciōsus* $\to$ *specious* (superficially plausible but wrong).
- **Representative Sample Base (`-men`):** *specimen* (an individual used as an example of its species).
- **Mental Vision Base (`speculārī`):** *speculum* (mirror) $\to$ *speculate*, *speculation*, *speculative*, *speculator*.

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

### 1. Biological Taxonomy & Diversity
- *species* (a group of living organisms consisting of similar individuals capable of exchanging genes).
- *specimen* (an individual animal, plant, or piece of mineral used as an example of its species).

### 2. Particularity & Precision
- *special* (better, greater, or otherwise different from what is usual; dedicated to a distinct purpose).
- *specialist* (a person who concentrates primarily on a particular subject or activity).
- *specialize* (to concentrate on and become an expert in a particular subject).
- *specialty* (a pursuit, product, or area of study in which one specializes).
- *specific* (clearly defined or identified; precise).
- *specify* (to identify clearly and definitely).
- *specification* (an act of identifying something precisely; a detailed description).

### 3. Deceptive Appearance & Fallacy
- *specious* (superficially plausible, but actually wrong; misleading in appearance).

### 4. Theoretical & Financial Vision
- *speculate* (to form a theory or conjecture about a subject without firm evidence; invest with risk).
- *speculation* (the forming of a theory without firm evidence; financial trading with risk of loss).
- *speculative* (engaged in, expressing, or based on conjecture rather than knowledge).
- *speculum* (a medical instrument used to dilate a bodily orifice; a mirror).

---

## 🔀 4. Prefix & Combining Dynamics on spec

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `spec-` + `-ies` | Noun of kind | A fundamental biological category sharing appearance and genetics | *species* |
| `speci-` + `-fic` | Factitive derivation | "Making a species" — precisely delimited, explicit | *specific, specify* |
| `spec-` + `-imen` | Concrete exemplar | A physical sample extracted to represent the entire group | *specimen* |
| `speci-` + `-ous` | Pejorative aesthetic | Superficially attractive, alluring, but fundamentally fraudulent | *specious* |
| `specul-` + `-ate` | Mirror contemplation | Looking into a mirror of possibilities; theoretical/financial risk | *speculate, speculation* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Evolutionary Biology & Ecology:** Speciation mechanisms, allopatric speciation, holotype specimens.
- **Epistemology & Logic:** Specious arguments, specific vs generic distinctions, inductive classification.
- **Financial Markets & Securities:** Speculative bubbles (Tulip Mania, Dot-Com), speculation vs investment.
- **Medical Diagnostics:** Vaginal and nasal speculum examination.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[aspect]] | noun | **1.** A distinct feature or element in a problem.<br>**2.** A characteristic to be considered. | *"And great Pompey Would stand and make his eyes grow in my brow; There would he anchor his aspect, and die With looking on his life."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[aspectual]] | adjective | **1.** Of or belonging to an aspect (as an aspect of the verb). | *"In academic literature, aspectual designates of or belonging to an aspect (as an aspect of the verb)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumspect]] | adjective | **1.** Heedful of potential consequences. | *"Let not his smoothing words Bewitch your hearts; be wise and circumspect."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumspection]] | noun | **1.** Knowing how to avoid embarrassment or distress.<br>**2.** The trait of being circumspect and prudent. | *"His outlook upon time was as a transient flash of the eye now and then: that projection of consciousness into days gone by and to come, which makes the past a synonym for the pathetic and the future a word for circumspection, was foreign to Troy."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[circumspectly]] | adverb | **1.** In a cagey manner. | *"The dairyman himself had been lending a hand; but Mr Crick, as well as his wife, seemed latterly to have acquired a suspicion of mutual interest between these two; though they walked so circumspectly that suspicion was but of the faintest."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[conspecific]] | noun | **1.** An organism belonging to the same species as another organism.<br>**2.** Belonging to the same species. | *"In academic literature, conspecific designates an organism belonging to the same species as another organism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conspectus]] | noun | **1.** An overall summary. | *"In academic literature, conspectus designates an overall summary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disrespect]] | noun | **1.** An expression of lack of respect.<br>**2.** A disrespectful mental attitude. | *"I do not wish to speak with disrespect, M. le Maire.' 'What is it, Jacques, that is said?' I had called him 'thou' not out of contempt, but because, for the moment, he seemed to me as a brother, as one of my friends."* — Mrs. Oliphant, *A Beleaguered City* |
| [[disrespectful]] | adjective | **1.** Exhibiting lack of respect; rude and discourteous.<br>**2.** Neither feeling nor showing respect. | *"ELLIOT.” Such a letter could not be read without putting Anne in a glow; and Mrs Smith, observing the high colour in her face, said— “The language, I know, is highly disrespectful."* — Jane Austen, *Persuasion* |
| [[disrespectfully]] | adverb | **1.** In a disrespectful manner. | *"Upon the hint of having spoken disrespectfully or carelessly of the family and the family honours, he was quite indignant."* — Jane Austen, *Persuasion* |
| [[especial]] | adjective | **1.** Surpassing what is common or usual or expected. | *"Hamlet, this deed, for thine especial safety,— Which we do tender, as we dearly grieve For that which thou hast done,—must send thee hence With fiery quickness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[especially]] | adverb | **1.** To a distinctly greater extent or degree than is common.<br>**2.** In a special manner. | *"I especially think, under Mars."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inspect]] | verb | **1.** Look over carefully.<br>**2.** Come to see in an official or professional capacity. | *"Early this morning they had climbed over the castle hedge to inspect the apples on the other side of the hedge."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[inspection]] | noun | **1.** A formal or official examination. | *"So they go out in a loose procession, something after the manner of a straggling funeral, and make their inspection in Mr."* — Charles Dickens, *Bleak House* |
| [[inspector]] | noun | **1.** A high ranking police officer.<br>**2.** An investigator who observes carefully. | *"Bucket, “you’ll excuse anything that may appear to be disagreeable in this, for my name’s Inspector Bucket of the Detective, and I have a duty to perform."* — Charles Dickens, *Bleak House* |
| [[inspectorate]] | noun | **1.** A body of inspectors. | *"In academic literature, inspectorate designates a body of inspectors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inspectorship]] | noun | **1.** The office of inspector. | *"In academic literature, inspectorship designates the office of inspector."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interspecies]] | adjective | **1.** Arising or occurring between species. | *"In academic literature, interspecies designates arising or occurring between species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interspecific]] | adjective | **1.** Arising or occurring between species. | *"In academic literature, interspecific designates arising or occurring between species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intraspecies]] | adjective | **1.** Arising or occurring within a species; involving the members of one species. | *"In academic literature, intraspecies designates arising or occurring within a species; involving the members of one species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intraspecific]] | adjective | **1.** Arising or occurring within a species; involving the members of one species. | *"In academic literature, intraspecific designates arising or occurring within a species; involving the members of one species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introspect]] | verb | **1.** Reflect on one's own thoughts and feelings. | *"It is introspective, and I want to introspect."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[introspection]] | noun | **1.** The contemplation of your own thoughts and desires and conduct. | *"The fact that this introspection is an inevitable symptom in many mental derangements, hypochondria, melancholia and others, indicates a not very remote relation of Weltschmerz to insanity."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[introspective]] | adjective | **1.** Given to examining own sensory and perceptual experiences. | *"Inward melancholy it was impossible for a man like Oak, introspective far beyond his neighbours, to banish quite, whilst conning the present untoward page of his history."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[introspectively]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin spec within the domain of Sight.<br>**2.** A technical or specialized form exhibiting the properties of spec in systematic terminology. | *"In academic literature, introspectively designates pertaining to, derived from, or characteristic of latin spec within the domain of sight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introspectiveness]] | noun | **1.** Thoughtfulness about your own situation and feelings. | *"In academic literature, introspectiveness designates thoughtfulness about your own situation and feelings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[irrespective]] | adverb | **1.** In spite of everything; without regard to drawbacks. | *"My denying myself the pleasure of the present agreeable conversation may not be wholly irrespective of your own interests, Mr."* — Charles Dickens, *Bleak House* |
| [[nonspecific]] | adjective | **1.** Not caused by a specific agent; used also of staining in making microscope slides. | *"In academic literature, nonspecific designates not caused by a specific agent; used also of staining in making microscope slides."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonspecifically]] | adverb | **1.** Without specificity. | *"In academic literature, nonspecifically designates without specificity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overspecialise]] | verb | **1.** Become overly specialized. | *"In academic literature, overspecialise designates become overly specialized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overspecialize]] | verb | **1.** Become overly specialized. | *"In academic literature, overspecialize designates become overly specialized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perspective]] | noun | **1.** A way of regarding situations or topics etc.<br>**2.** The appearance of things relative to one another as determined by their distance from the viewer. | *"A natural perspective, that is, and is not!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prospect]] | noun | **1.** The possibility of future success.<br>**2.** Belief about (or mental picture of) the future. | *"Their chiefest prospect murdering basilisks; Their softest touch as smart as lizards’ stings!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prospective]] | adjective | **1.** Of or concerned with or related to the future. | *"It is in some respects more searching than a tax on actual rents, for it reaches the prospective, or speculative, rental. (d) Taxes may be on _expenditure_ (sometimes called taxes on consumption)."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[prospector]] | noun | **1.** Someone who explores an area for mineral deposits. | *"Morgan, a prospector, who was roaming over the country in search of minerals, happened to be travelling through a small selection of 640 acres owned by a workingman, who just managed to eke out a living on it, the land being very poor."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[prospectus]] | noun | **1.** A formal written offer to sell securities (filed with the sec) that sets forth a plan for a (proposed) business enterprise.<br>**2.** A catalog listing the courses offered by a college or university. | *"The addition of Karlshaven IV to the list of planets under colonization would be made, and Holliday's asking prices for land would be posted with Emigration, together with a prospectus abstracted from the General Galactic Survey."* — Algis Budrys, *Citadel* |
| [[respect]] | noun | **1.** (usually preceded by `in') a detail or point.<br>**2.** The condition of being honored (esteemed or respected or well regarded). | *"In our two loves there is but one respect, Though in our lives a separable spite, Which though it alter not love’s sole effect, Yet doth it steal sweet hours from love’s delight."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[respectability]] | noun | **1.** Honorableness by virtue of being respectable and having a good reputation. | *"Now, my dear Miss Summerson, if you want common sense, responsibility, and respectability, all united—if you want an exemplary man—Vholes is THE man.” We had not known, we said, that Richard was assisted by any gentleman of that name."* — Charles Dickens, *Bleak House* |
| [[respectable]] | adjective | **1.** Characterized by socially or conventionally acceptable morals.<br>**2.** Deserving of esteem and respect. | *"His family is as old as the hills, and infinitely more respectable."* — Charles Dickens, *Bleak House* |
| [[respectably]] | adverb | **1.** To a tolerably worthy extent.<br>**2.** In a decent and morally reputable manner. | *"Hughes, satisfied with having so respectably settled her young charge, returned to her party."* — Jane Austen, *Northanger Abbey* |
| [[respected]] | verb | **1.** Regard highly; think much of.<br>**2.** Show respect towards. | *"The service of the foot, Being once gangrened, is not then respected For what before it was."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[respecter]] | noun | **1.** A person who respects someone or something; usually used in the negative. | *"He was no respecter of persons; he contradicted the richest burghers without hesitation; he took possession of the sacred elbow chair, which time out of mind had been the seat of sovereignty of the illustrious Ramm Rapelye."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[respectful]] | adjective | **1.** Full of or exhibiting respect.<br>**2.** Feeling or manifesting veneration. | *"If I speak of interest, it is only to recommend myself and my respectful wretchedness."* — Charles Dickens, *Bleak House* |
| [[respectfully]] | adverb | **1.** In a respectful manner. | *"Seated at the same table, though with his chair modestly and uncomfortably drawn a little way from it, sits a bald, mild, shining man who coughs respectfully behind his hand when the lawyer bids him fill his glass."* — Charles Dickens, *Bleak House* |
| [[respectfulness]] | noun | **1.** Courteous regard for people's feelings. | *"In academic literature, respectfulness designates courteous regard for people's feelings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[respective]] | adjective | **1.** Considered individually. | *"Good den, Sir Richard!” “God-a-mercy, fellow!” And if his name be George, I’ll call him Peter; For new-made honour doth forget men’s names: ’Tis too respective and too sociable For your conversion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[respectively]] | adverb | **1.** In the order given. | *"I dreamt of a silver basin and ewer tonight.—Flaminius, honest Flaminius, you are very respectively welcome, sir."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[respects]] | noun | **1.** (often used with `pay') a formal expression of esteem.<br>**2.** (usually preceded by `in') a detail or point. | *"If he shall think it fit A saucy stranger in his court to mart As in a Romish stew, and to expound His beastly mind to us, he hath a court He little cares for, and a daughter who He not respects at all."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[retrospect]] | noun | **1.** Contemplation of things past.<br>**2.** Look back upon (a period of time, sequence of events); remember. | *"She would have fixed him; she would have made him happy for ever.’ My dearest Fanny, I am giving you, I hope, more pleasure than pain by this retrospect of what might have been—but what never can be now."* — Jane Austen, *Mansfield Park* |
| [[retrospection]] | noun | **1.** Reference to things past.<br>**2.** Memory for experiences that are past. | *"He was roused from the reverie of retrospection and regret produced by it, by some inquiry from Edmund as to his plans for the next day’s hunting; and he found it was as well to be a man of fortune at once with horses and grooms at his command."* — Jane Austen, *Mansfield Park* |
| [[retrospective]] | noun | **1.** An exhibition of a representative selection of an artist's life work.<br>**2.** Concerned with or related to the past. | *"Plymdale’s maternal view was, that Rosamond might possibly now have retrospective glimpses of her own folly; and feeling the advantages to be at present all on the side of her son, was too kind a woman not to behave graciously."* — George Eliot, *Middlemarch* |
| [[retrospectively]] | adverb | **1.** In a manner contemplative of past events. | *"Jaggers nodded his head retrospectively two or three times, and actually drew a sigh."* — Charles Dickens, *Great Expectations* |
| [[spec]] | noun | **1.** A detailed description of design criteria for a piece of work. | *"I swore arterwards, sure as ever I spec’lated and got rich, you should get rich."* — Charles Dickens, *Great Expectations* |
| [[special]] | noun | **1.** A special offering (usually temporary and at a reduced price) that is featured in advertising.<br>**2.** A dish or meal given prominence in e.g. a restaurant. | *"So is the time that keeps you as my chest Or as the wardrobe which the robe doth hide, To make some special instant special-blest, By new unfolding his imprisoned pride."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[specialisation]] | noun | **1.** (biology) the structural adaptation of some body part for a particular function.<br>**2.** The act of specializing; making something suitable for a special purpose. | *"In academic literature, specialisation designates (biology) the structural adaptation of some body part for a particular function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[specialise]] | verb | **1.** Devote oneself to a special area of work.<br>**2.** Be specific about. | *"The sources of his figurative wealth are specialised, sources of Shakespeare's are universal."* — Francis Thompson, *Shelley: An Essay* |
| [[specialised]] | verb | **1.** Devote oneself to a special area of work.<br>**2.** Be specific about. | *"The sources of his figurative wealth are specialised, sources of Shakespeare's are universal."* — Francis Thompson, *Shelley: An Essay* |
| [[specialiser]] | noun | **1.** An expert who is devoted to one occupation or branch of learning. | *"In academic literature, specialiser designates an expert who is devoted to one occupation or branch of learning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[specialism]] | noun | **1.** The concentration of your efforts on a particular field of study or occupation.<br>**2.** The special line of work you have adopted as your career. | *"In academic literature, specialism designates the concentration of your efforts on a particular field of study or occupation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[specialist]] | noun | **1.** An expert who is devoted to one occupation or branch of learning.<br>**2.** Practices one branch of medicine. | *"The stage lost a fine actor, even as science lost an acute reasoner, when he became a specialist in crime."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[specialistic]] | adjective | **1.** Of or related to or characteristic of specialists.<br>**2.** Showing focused training. | *"In academic literature, specialistic designates of or related to or characteristic of specialists."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[speciality]] | noun | **1.** An asset of special worth or utility.<br>**2.** A distinguishing trait. | *"This, however, was a speciality on that particular birthday, and not a general solemnity."* — Charles Dickens, *Bleak House* |
| [[specialization]] | noun | **1.** The act of specializing; making something suitable for a special purpose.<br>**2.** The special line of work you have adopted as your career. | *"Gradually there came about a specialization of risk-taking by the men most able to bear it."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[specialize]] | verb | **1.** Become more focus on an area of activity or field of study.<br>**2.** Be specific about. | *"While in the villages and smaller cities the commercial banks perform a number of functions, in the larger cities they usually specialize in a far greater degree."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[specialized]] | verb | **1.** Become more focus on an area of activity or field of study.<br>**2.** Be specific about. | *"Diversified versus specialized farming. § 6."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[specializer]] | noun | **1.** An expert who is devoted to one occupation or branch of learning. | *"In academic literature, specializer designates an expert who is devoted to one occupation or branch of learning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[specially]] | adverb | **1.** In a special manner.<br>**2.** To a distinctly greater extent or degree than is common. | *"Though the nature of our quarrel yet never brooked parle, know now, upon advice, it toucheth us both,—that we may yet again have access to our fair mistress, and be happy rivals in Bianca’s love,—to labour and effect one thing specially."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[specialness]] | noun | **1.** A distinguishing trait.<br>**2.** The quality of being particular and pertaining to a specific case or instance. | *"In academic literature, specialness designates a distinguishing trait."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[specialty]] | noun | **1.** An asset of special worth or utility.<br>**2.** A distinguishing trait. | *"Troy, yet upon his basis, had been down, And the great Hector’s sword had lack’d a master, But for these instances: The specialty of rule hath been neglected; And look how many Grecian tents do stand Hollow upon this plain, so many hollow factions."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[speciate]] | verb | **1.** Evolve so as to lead to a new species or develop in a way most suited to the environment. | *"In academic literature, speciate designates evolve so as to lead to a new species or develop in a way most suited to the environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[speciation]] | noun | **1.** The evolution of a biological species. | *"In academic literature, speciation designates the evolution of a biological species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[specie]] | noun | **1.** Coins collectively. | *"The notes depreciated and drove gold out of circulation, and it was not until 1821 that specie payments were definitely resumed."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[species]] | noun | **1.** (biology) taxonomic group whose members can interbreed.<br>**2.** A specific kind of something. | *"It involves me in correspondence with public bodies and with private individuals anxious for the welfare of their species all over the country."* — Charles Dickens, *Bleak House* |
| [[specifiable]] | adjective | **1.** Capable of being specified. | *"In academic literature, specifiable designates capable of being specified."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[specific]] | noun | **1.** A fact about some part (as opposed to general).<br>**2.** A medicine that has a mitigating effect on a specific disease. | *"This referred to a specific page in the printed book."* — Charles Dickens, *Bleak House* |
| [[specifically]] | adverb | **1.** In distinction from others. | *"Generically man is one, and specifically man means all men."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[specification]] | noun | **1.** A detailed description of design criteria for a piece of work.<br>**2.** Naming explicitly. | *"But what color can the objection have, when a specification of the objects alluded to by these general terms immediately follows, and is not even separated by a longer pause than a semicolon?"* — Alexander Hamilton, *The Federalist Papers* |
| [[specificity]] | noun | **1.** The quality of being specific rather than general.<br>**2.** The quality of being specific to a particular organism. | *"In academic literature, specificity designates the quality of being specific rather than general."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[specified]] | verb | **1.** Specify as a condition or requirement in a contract or agreement; make an express demand or provision in an agreement.<br>**2.** Decide upon or fix definitely. | *"Both were made legalized forms of money (and standards of deferred payments) in units of specified weights and fineness, the weights bearing a certain ratio to each other."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[specifier]] | noun | **1.** Someone who draws up specifications giving details (as for obtaining a patent). | *"In academic literature, specifier designates someone who draws up specifications giving details (as for obtaining a patent)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[specify]] | verb | **1.** Specify as a condition or requirement in a contract or agreement; make an express demand or provision in an agreement.<br>**2.** Decide upon or fix definitely. | *"Here enter’d Pucelle and her practisants; Now she is there, how will she specify Here is the best and safest passage in?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[specimen]] | noun | **1.** An example regarded as typical of its class.<br>**2.** A bit of tissue or blood or urine that is taken for diagnostic purposes. | *"But she was rather took by something about this person, whether by his being unshaved, or by his hair being in want of attention, or by what other ladies’ reasons, I leave you to judge; and she accepted of the specimen, and likewise of the address."* — Charles Dickens, *Bleak House* |
| [[specious]] | adjective | **1.** Plausible but false.<br>**2.** Based on pretense; deceptively pleasing. | *"I am not sure, my dear girl, but that it may be wise and specious to preserve that outward indifference."* — Charles Dickens, *Bleak House* |
| [[speciously]] | adverb | **1.** In a specious manner. | *"I will do what I can for them all three, for so I have promised and I’ll be as good as my word—but speciously for Master Fenton."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[speciousness]] | noun | **1.** An appearance of truth that is false or deceptive; seeming plausibility. | *"In academic literature, speciousness designates an appearance of truth that is false or deceptive; seeming plausibility."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[specs]] | noun | **1.** Optical instrument consisting of a frame that holds a pair of lenses for correcting defective vision.<br>**2.** A detailed description of design criteria for a piece of work. | *"A receding forehead, little specs of eyes, a turned-up nose, and great blubber lips, adown whose corners flowed eternally two miniature cataracts."* — Effie Afton, *Eventide* |
| [[spectacle]] | noun | **1.** Something or someone seen (especially a notable or unusual sight).<br>**2.** An elaborate and remarkable display on a lavish scale. | *"Did he not moralize this spectacle?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spectacled]] | adjective | **1.** Wearing, or having the face adorned with, eyeglasses or an eyeglass. | *"All tongues speak of him, and the bleared sights Are spectacled to see him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spectacles]] | noun | **1.** Optical instrument consisting of a frame that holds a pair of lenses for correcting defective vision.<br>**2.** Something or someone seen (especially a notable or unusual sight). | *"I’ll do well yet.—Thou old and true Menenius, Thy tears are salter than a younger man’s And venomous to thine eyes.—My sometime general, I have seen thee stern, and thou hast oft beheld Heart-hard’ning spectacles."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spectacular]] | noun | **1.** A lavishly produced performance.<br>**2.** Sensational in appearance or thrilling in effect. | *"I am trying to--" "Polk said last night that he thought it would be much more spectacular for all the good looking women in town to go when we are invited to Mrs."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[spectacularly]] | adverb | **1.** In a spectacular manner. | *"Then only was he permitted to be seen, spectacularly poring over large books, and casting his breeches and gaiters into the general weight of the establishment."* — Charles Dickens, *A Tale of Two Cities* |
| [[spectate]] | verb | **1.** Be a spectator in a sports event. | *"In academic literature, spectate designates be a spectator in a sports event."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectator]] | noun | **1.** A close observer; someone who looks at something (such as an exhibition of some kind).<br>**2.** A woman's pump with medium heel; usually in contrasting colors for toe and heel. | *"Oak suddenly ceased from being a mere spectator by discovering the case to be more serious than he had at first imagined."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[specter]] | noun | **1.** A mental representation of some haunting experience.<br>**2.** A ghostly appearing figure. | *"Was It—the dark form with the chain—a creature of this world, or a specter?"* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[spectinomycin]] | noun | **1.** An antibiotic used to treat gonorrhea. | *"In academic literature, spectinomycin designates an antibiotic used to treat gonorrhea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectral]] | adjective | **1.** Of or relating to a spectrum.<br>**2.** Resembling or characteristic of a phantom. | *"He has a yellow look in the spectral darkness of a candle that has guttered down until the whole length of its wick (still burning) has doubled over and left a tower of winding-sheet above it."* — Charles Dickens, *Bleak House* |
| [[spectre]] | noun | **1.** A ghostly appearing figure.<br>**2.** A mental representation of some haunting experience. | *"The purblind day was feebly struggling with the fog when I opened my eyes to encounter those of a dirty-faced little spectre fixed upon me."* — Charles Dickens, *Bleak House* |
| [[spectrogram]] | noun | **1.** A photographic record of a spectrum. | *"In academic literature, spectrogram designates a photographic record of a spectrum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrograph]] | noun | **1.** A spectroscope by which spectra can be photographed.<br>**2.** A photographic record of a spectrum. | *"In academic literature, spectrograph designates a spectroscope by which spectra can be photographed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrographic]] | adjective | **1.** Relating to or employing a spectrograph. | *"In academic literature, spectrographic designates relating to or employing a spectrograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrographically]] | adverb | **1.** By spectrographic means. | *"In academic literature, spectrographically designates by spectrographic means."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrometer]] | noun | **1.** Spectroscope for obtaining a mass spectrum by deflecting ions into a thin slit and measuring the ion current with an electrometer. | *"In academic literature, spectrometer designates spectroscope for obtaining a mass spectrum by deflecting ions into a thin slit and measuring the ion current with an electrometer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrometric]] | adjective | **1.** Of or relating to or involving spectrometry. | *"In academic literature, spectrometric designates of or relating to or involving spectrometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrometry]] | noun | **1.** The use of spectroscopes to analyze spectra. | *"In academic literature, spectrometry designates the use of spectroscopes to analyze spectra."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrophotometer]] | noun | **1.** A photometer for comparing two light radiations wavelength by wavelength. | *"In academic literature, spectrophotometer designates a photometer for comparing two light radiations wavelength by wavelength."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectroscope]] | noun | **1.** An optical instrument for spectrographic analysis. | *"SPECTROSCOPE (THE), AND ITS WORK."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[spectroscopic]] | adjective | **1.** Of or relating to or involving spectroscopy. | *"In academic literature, spectroscopic designates of or relating to or involving spectroscopy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectroscopical]] | adjective | **1.** Of or relating to or involving spectroscopy. | *"In academic literature, spectroscopical designates of or relating to or involving spectroscopy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectroscopy]] | noun | **1.** The use of spectroscopes to analyze spectra. | *"In academic literature, spectroscopy designates the use of spectroscopes to analyze spectra."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrum]] | noun | **1.** An ordered array of the components of an emission or wave.<br>**2.** A broad range of related objects or values or qualities or ideas or activities. | *"In the solar spectrum, beyond the extreme red and extreme violet rays, are whole series of colours, demonstrable, but imperceptible to gross human vision."* — Francis Thompson, *Shelley: An Essay* |
| [[specular]] | adjective | **1.** Capable of reflecting light like a mirror. | *"In academic literature, specular designates capable of reflecting light like a mirror."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[speculate]] | verb | **1.** To believe especially on uncertain or tentative grounds.<br>**2.** Talk over conjecturally, or review in an idle or casual way and with an element of doubt or without sufficient reason to reach a conclusion. | *"I did not speculate upon the source from which it came or wonder whose humanity was so considerate."* — Charles Dickens, *Bleak House* |
| [[speculation]] | noun | **1.** A message expressing an opinion based on incomplete evidence.<br>**2.** A hypothesis that has been formed by speculating or conjecturing (usually with little hard evidence). | *"Thy bones are marrowless, thy blood is cold; Thou hast no speculation in those eyes Which thou dost glare with!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[speculative]] | adjective | **1.** Not financially safe or secure.<br>**2.** Not based on fact or investigation. | *"Thoughts speculative their unsure hopes relate, But certain issue strokes must arbitrate; Towards which advance the war. [_Exeunt, marching._] SCENE V."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[speculatively]] | adverb | **1.** With speculation; in a speculative manner. | *"Before this time he had known it but speculatively; now he thought he knew it as a practical man; though perhaps he did not, even yet."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[speculativeness]] | noun | **1.** Financial risk.<br>**2.** The quality of being a conclusion or opinion based on supposition and conjecture rather than on fact or investigation. | *"In academic literature, speculativeness designates financial risk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[speculator]] | noun | **1.** Someone who makes conjectures without knowing the facts.<br>**2.** Someone who risks losses for the possibility of considerable gains. | *"THE SPECULATOR AS A RISK-TAKER [Sidenote: An element of speculation in all business] 1. _Every enterpriser is to some extent specializing as a risk-taker._ This familiar idea may be taken as a starting point in discussing speculation."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[speculum]] | noun | **1.** A mirror (especially one made of polished metal) for use in an optical instrument.<br>**2.** A medical instrument for dilating a bodily passage or cavity in order to examine the interior. | *"The "Speculum Humanae Salvationes," attributed to Coster by Junius was partly a folio Latin block-book, and partly typographically printed."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[subspecies]] | noun | **1.** (biology) a taxonomic group that is a division of a species; usually arises as a consequence of geographical isolation within a species. | *"In academic literature, subspecies designates (biology) a taxonomic group that is a division of a species; usually arises as a consequence of geographical isolation within a species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suspect]] | noun | **1.** Someone who is under suspicion.<br>**2.** A person or institution against whom an action is brought in a court of law; the person being sued or accused. | *"And whether that my angel be turned fiend Suspect I may, yet not directly tell; But being both from me both to each friend, I guess one angel in another’s hell."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[suspected]] | verb | **1.** Imagine to be the case or true or probable.<br>**2.** Regard as untrustworthy; regard with suspicion; have no faith or confidence in. | *"Only to seem to deserve well, and to beguile the supposition of that lascivious young boy the count, have I run into this danger: yet who would have suspected an ambush where I was taken?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unrespectability]] | noun | **1.** Dishonorableness by virtue of lacking respectability or a good reputation. | *"In academic literature, unrespectability designates dishonorableness by virtue of lacking respectability or a good reputation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unrespectable]] | adjective | **1.** Unworthy of respect. | *"In academic literature, unrespectable designates unworthy of respect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unspecialised]] | adjective | **1.** Not specialized or modified for a particular purpose or function. | *"In academic literature, unspecialised designates not specialized or modified for a particular purpose or function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unspecialized]] | adjective | **1.** Not specialized or modified for a particular purpose or function. | *"In academic literature, unspecialized designates not specialized or modified for a particular purpose or function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unspecific]] | adjective | **1.** Not detailed or specific. | *"In academic literature, unspecific designates not detailed or specific."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unspecified]] | adjective | **1.** Not stated explicitly or in detail. | *"I will add that his finger-nails were scrupulously attended to, and that he meant to marry a well-educated young lady (as yet unspecified) whose person was good, and whose connections, in a solid middle-class way, were undeniable."* — George Eliot, *Middlemarch* |
| [[unspectacular]] | adjective | **1.** Not spectacular. | *"Aside from its effects upon the wage-bargain, unionism finds its greatest justification is in its unspectacular fraternal, mutual-benefit, and educational functions."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unsuspected]] | adjective | **1.** Not suspected or believed likely. | *"Here is the head of that ignoble traitor, The dangerous and unsuspected Hastings."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unsuspecting]] | adjective | **1.** Not suspicious.<br>**2.** (often followed by `of') not knowing or expecting; not thinking likely. | *"That can, with studied, sly, ensnaring art, Betray sweet Jenny’s unsuspecting youth?"* — Robert Burns, *Poems and Songs of Robert Burns* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sight]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SPEC
  </div>
</div>
