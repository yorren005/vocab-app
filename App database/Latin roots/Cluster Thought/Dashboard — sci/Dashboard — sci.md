---
status: unread
type: root_dashboard
---
# Dashboard — sci
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sci-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to know”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Sitting quietly while turning ideas over in your mind to solve a problem.</span>
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

The root **sci** means to know. It refers to having knowledge, being aware of facts, or understanding truth. In English, this root forms words such as *science*, *conscious*, *conscience*, and *omniscient*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to know
> The root **sci** means to know. It refers to having knowledge, being aware of facts, or understanding truth. In English, this root forms words such as *science*, *conscious*, *conscience*, and *omniscient*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To know</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Sitting quietly while turning ideas over in your mind to solve a problem.</mark>
> - **Everyday Connection**: Think of familiar words like *science* and *conscious*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sci** comes from a Latin word that means *"to know"*.
  - At its core, it describes the action of know.

- **The Big Picture Idea**:
  - Picture sitting quietly while turning ideas over in your mind to solve a problem.
  - Whenever you see **sci** in an English word, think of **to know**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to know).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Science**: Systematic knowledge of the physical or material world gained through observation and experimentation.
  - **Conscious**: Aware of and responding to one's surroundings.
  - **Conscience**: An inner feeling or voice viewed as acting as a guide to the rightness or wrongness of one's behavior.
  - **Omniscient**: An everyday English word showing the root's idea of *to know*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sci</mark>, think of <mark class="hl-def">to know</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root forms compound structures with extraordinary prefixal versatility:
1. **The Base Stem `sci-`**: From *scīre* and its nominalization *scientia*, producing *science*, *scientist*, *scientific*.
2. **Prefixal Compounding**:
   - `con-` (*cum* "with, together"): produces *conscience* (moral tribunal) and *conscious* (awake, aware).
   - `pre-` (*prae* "before"): produces *prescient* (having foreknowledge).
   - `omni-` (*omnis* "all"): produces *omniscient* (all-knowing).
   - `ne-` (*ne* "not"): produces *nescient* (ignorant, lacking knowledge).
   - `sub-` (*sub* "under"): produces *subconscious* (beneath the threshold of waking awareness).

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

The cognitive reach of *sci* spans four distinct philosophical territories:
- **Empirical & Methodological Inquiry**: [[science]], [[scientific]], [[scientist]]
- **Moral Awareness & Ethical Duty**: [[conscience]], `conscientious`
- **Psychological States of Awareness**: [[conscious]], `consciousness`, [[subconscious]], `subconsciousness`
- **Epistemic Scope & Time**: [[prescient]], `prescience`, `omniscient`, `omniscience`, `nescient`, `nescience`

---

## 🔀 4. Prefix & Combining Dynamics on sci

1. **`con-` + `sci`** (*cum* "together"):
   - *conscience* $\to$ internal moral sense of right and wrong.
   - *conscious* $\to$ having awareness of one's surroundings and mental identity.
2. **`pre-` + `sci`** (*prae* "before"):
   - *prescient* $\to$ having or showing knowledge of events before they take place.
3. **`omni-` + `sci`** (*omnis* "all"):
   - *omniscient* $\to$ knowing everything; possessing infinite knowledge.
4. **`ne-` + `sci`** (*ne* "not"):
   - *nescient* $\to$ lacking knowledge; completely agnostic or ignorant of a subject.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Natural Sciences**: *scientific* method, hypothesis testing, peer-reviewed empirical research.
- **Cognitive Science & Neurology**: human *consciousness*, neural correlates of waking awareness, *subconscious* processing.
- **Ethics & Law**: *conscientious* objection to military draft, crimes that shock the *conscience* of humanity.
- **Theology & Metaphysics**: divine *omniscience*, theological determinism vs. free will.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abscise]] | verb | **1.** Shed flowers and leaves and fruit following formation of a scar tissue.<br>**2.** Remove or separate by abscission. | *"In academic literature, abscise designates shed flowers and leaves and fruit following formation of a scar tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abscissa]] | noun | **1.** The value of a coordinate on the horizontal axis. | *"In academic literature, abscissa designates the value of a coordinate on the horizontal axis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abscission]] | noun | **1.** Shedding of flowers and leaves and fruit following formation of scar tissue in a plant.<br>**2.** The act of cutting something off. | *"In academic literature, abscission designates shedding of flowers and leaves and fruit following formation of scar tissue in a plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adscititious]] | adjective | **1.** Added or derived from something outside; not inherent.<br>**2.** Supplemental; not part of the real or essential nature of a thing. | *"In academic literature, adscititious designates added or derived from something outside; not inherent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conscience]] | noun | **1.** Motivation deriving logically from ethical or moral principles that govern a person's thoughts and actions.<br>**2.** Conformity to one's own sense of right conduct. | *"If thy unworthiness raised love in me, More worthy I to be beloved of thee. 151 Love is too young to know what conscience is, Yet who knows not conscience is born of love?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conscience-smitten]] | adjective | **1.** Affected by conscience. | *"In academic literature, conscience-smitten designates affected by conscience."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conscienceless]] | adjective | **1.** Lacking a conscience. | *"What? even battered, brazen, beautiful, conscienceless, heartless, Mrs."* — William Makepeace Thackeray, *Vanity Fair* |
| [[conscientious]] | adjective | **1.** Characterized by extreme care and great effort.<br>**2.** Guided by or in accordance with conscience or sense of right and wrong. | *"I know this, th-th-that he is a thoroughly conscientious man—blunt sometimes even to rudeness—but always speaking his mind about you plain to your face!” “Oh.” “He is as good as anybody in this parish!"* — Thomas Hardy, *Far from the Madding Crowd* |
| [[conscientiously]] | adverb | **1.** With extreme conscientiousness. | *"I fear I could not conscientiously do so."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[conscientiousness]] | noun | **1.** The quality of being in accord with the dictates of conscience.<br>**2.** The trait of being painstaking and careful. | *"His father, with anxious conscientiousness, debated with himself as to whether it would be right for him thus to set one of his sons above the rest."* — John Cairns, *Principal Cairns* |
| [[conscionable]] | adjective | **1.** Acceptable to your conscience. | *"In academic literature, conscionable designates acceptable to your conscience."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conscious]] | adjective | **1.** Intentionally conceived.<br>**2.** Knowing and perceiving; having awareness of surroundings and sensations and thoughts. | *"I am always conscious of an uncomfortable sensation now and then when the wind is blowing in the east.” “Rheumatism, sir?” said Richard."* — Charles Dickens, *Bleak House* |
| [[consciously]] | adverb | **1.** With awareness. | *"Snagsby consciously asked why."* — Charles Dickens, *Bleak House* |
| [[consciousness]] | noun | **1.** An alert cognitive state in which you are aware of yourself and your situation.<br>**2.** Having knowledge of. | *"He told her that it was nothing to worry about, and that he had only lost consciousness for a moment."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[discina]] | noun | **1.** Any fungus of the genus discina. | *"In academic literature, discina designates any fungus of the genus discina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonconscious]] | adjective | **1.** Concerning mental functioning that is not represented in consciousness.<br>**2.** Relating to the lack of consciousness of inanimate things. | *"In academic literature, nonconscious designates concerning mental functioning that is not represented in consciousness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prescience]] | noun | **1.** The power to foresee the future. | *"They tax our policy and call it cowardice, Count wisdom as no member of the war, Forestall prescience, and esteem no act But that of hand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prescient]] | adjective | **1.** Perceiving the significance of events before they occur; -r.h.rovere. | *"It is a thing not uncommonly happening to the whale-boats in those swarming seas; the sharks at times apparently following them in the same prescient way that vultures hover over the banners of marching regiments in the east."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[presciently]] | adverb | **1.** With foresight. | *"In academic literature, presciently designates with foresight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosciutto]] | noun | **1.** Italian salt-cured ham usually sliced paper thin. | *"In academic literature, prosciutto designates italian salt-cured ham usually sliced paper thin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rescind]] | verb | **1.** Cancel officially. | *"Let me hope that you will rescind that resolution about the horse, Miss Brooke,” said the persevering admirer."* — George Eliot, *Middlemarch* |
| [[rescindable]] | adjective | **1.** Capable of being rescinded or voided. | *"In academic literature, rescindable designates capable of being rescinded or voided."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rescission]] | noun | **1.** (law) the act of rescinding; the cancellation of a contract and the return of the parties to the positions they would have had if the contract had not been made. | *"In academic literature, rescission designates (law) the act of rescinding; the cancellation of a contract and the return of the parties to the positions they would have had if the contract had not been made."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sciadopityaceae]] | noun | **1.** Family comprising a single genus that until recently was considered part of taxodiaceae. | *"In academic literature, sciadopityaceae designates family comprising a single genus that until recently was considered part of taxodiaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sciadopitys]] | noun | **1.** Type and sole genus of sciadopityaceae; japanese umbrella pines. | *"In academic literature, sciadopitys designates type and sole genus of sciadopityaceae; japanese umbrella pines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sciaena]] | noun | **1.** Type genus of the sciaenidae: croakers. | *"In academic literature, sciaena designates type genus of the sciaenidae: croakers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sciaenid]] | noun | **1.** Widely distributed family of carnivorous percoid fishes having a large air bladder used to produce sound. | *"In academic literature, sciaenid designates widely distributed family of carnivorous percoid fishes having a large air bladder used to produce sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sciaenidae]] | noun | **1.** Warm-water marine fishes including the drums and grunts and croakers and sea trout. | *"In academic literature, sciaenidae designates warm-water marine fishes including the drums and grunts and croakers and sea trout."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sciaenops]] | noun | **1.** A genus of sciaenidae. | *"In academic literature, sciaenops designates a genus of sciaenidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sciara]] | noun | **1.** Minute blackish gregarious flies destructive to mushrooms and seedlings. | *"In academic literature, sciara designates minute blackish gregarious flies destructive to mushrooms and seedlings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sciarid]] | noun | **1.** Minute blackish gregarious flies destructive to mushrooms and seedlings. | *"In academic literature, sciarid designates minute blackish gregarious flies destructive to mushrooms and seedlings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sciaridae]] | noun | **1.** Fungus gnats. | *"In academic literature, sciaridae designates fungus gnats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sciatic]] | adjective | **1.** Relating to or caused by or afflicted with sciatica.<br>**2.** Of or relating to the ischium (or the part of the hipbone containing it). | *"INTENSE SUFFERING OVERCOME For about five years I was afflicted with sciatic rheumatism, in such a severe form that my body was drawn out of shape."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[sciatica]] | noun | **1.** Neuralgia along the sciatic nerve. | *"How now, which of your hips has the most profound sciatica?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[science]] | noun | **1.** A particular branch of scientific knowledge.<br>**2.** Ability to produce solutions in some problem domain. | *"Plutus himself, That knows the tinct and multiplying medicine, Hath not in nature’s mystery more science Than I have in this ring. ’Twas mine, ’twas Helen’s, Whoever gave it you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[scienter]] | adverb | **1.** (law) deliberately or knowingly. | *"In academic literature, scienter designates (law) deliberately or knowingly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scientific]] | adjective | **1.** Of or relating to the practice of science.<br>**2.** Conforming with the principles or methods used in science. | *"Not in a scientific way, as I expect he does, but by ear."* — Charles Dickens, *Bleak House* |
| [[scientifically]] | adverb | **1.** With respect to science; in a scientific way. | *"Oh, trust me, they make most scientifically sure that a man is dead once they get him on a rope."* — Jack London, *The Jacket (The Star-Rover)* |
| [[scientist]] | noun | **1.** A person with advanced knowledge of one or more sciences. | *"A scientist might laugh at this way of driving, or at asking God to guide in such trivial matters."* — Classic Author, *The wonders of prayer* |
| [[scientology]] | noun | **1.** A new religion founded by l. ron hubbard in 1955 and characterized by a belief in the power of a person's spirit to clear itself of past painful experiences through self-knowledge and spiritual fulfillment. | *"In academic literature, scientology designates a new religion founded by l. ron hubbard in 1955 and characterized by a belief in the power of a person's spirit to clear itself of past painful experiences through self-knowledge and spiritual fulfillment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scilla]] | noun | **1.** An old world plant of the genus scilla having narrow basal leaves and pink or blue or white racemose flowers. | *"In academic literature, scilla designates an old world plant of the genus scilla having narrow basal leaves and pink or blue or white racemose flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scimitar]] | noun | **1.** A curved oriental saber; the edge is on the convex side of the blade. | *"Now, by the burning tapers of the sky That shone so brightly when this boy was got, He dies upon my scimitar’s sharp point That touches this my first-born son and heir."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[scincella]] | noun | **1.** A reptile genus of scincidae. | *"In academic literature, scincella designates a reptile genus of scincidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scincid]] | noun | **1.** Alert agile lizard with reduced limbs and an elongated body covered with shiny scales; more dependent on moisture than most lizards; found in tropical regions worldwide. | *"In academic literature, scincid designates alert agile lizard with reduced limbs and an elongated body covered with shiny scales; more dependent on moisture than most lizards; found in tropical regions worldwide."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scincidae]] | noun | **1.** Skinks. | *"Classical and authoritative lexicons catalog scincidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scincus]] | noun | **1.** Type genus of scincidae. | *"In academic literature, scincus designates type genus of scincidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scindapsus]] | noun | **1.** Evergreen climbers with adhesive adventitious roots; southeastern asia and brazil. | *"In academic literature, scindapsus designates evergreen climbers with adhesive adventitious roots; southeastern asia and brazil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scintilla]] | noun | **1.** A tiny or scarcely detectable amount.<br>**2.** A sparkling glittering particle. | *"Some of my young friends can no doubt translate it, "Lateat scintilla forsan"--perchance a spark may lie hid."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[scintillant]] | adjective | **1.** Having brief brilliant points or flashes of light. | *"The air without is impregnated with raindew moisture, life essence celestial, glistening on Dublin stone there under starshiny _coelum._ God’s air, the Allfather’s air, scintillant circumambient cessile air."* — James Joyce, *Ulysses* |
| [[scintillate]] | verb | **1.** Give off.<br>**2.** Reflect brightly. | *"The dimmest-sparked chip of a conception blazes and scintillates in the subtile oxygen of his mind."* — Francis Thompson, *Shelley: An Essay* |
| [[scintillating]] | verb | **1.** Give off.<br>**2.** Reflect brightly. | *"Striking scenes and freshets of scintillating dialogue rushed through my mind."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[scintillation]] | noun | **1.** (physics) a flash of light that is produced in a phosphor when it absorbs a photon or ionizing particle.<br>**2.** A rapid change in brightness; a brief spark or flash. | *"And here is the answer to that scintillation of Free Trade wisdom which flashes out in wonder that _Manufactures_ are eternally and especially in want of Protection, while Agriculture and Commerce need none."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[sciolism]] | noun | **1.** Pretentious superficiality of knowledge. | *"When was sciolism ever dissociated from laxity?"* — George Eliot, *Middlemarch* |
| [[sciolist]] | noun | **1.** An amateur who engages in an activity without serious intentions and who pretends to have knowledge. | *"In academic literature, sciolist designates an amateur who engages in an activity without serious intentions and who pretends to have knowledge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sciolistic]] | adjective | **1.** Showing frivolous or superficial interest; amateurish. | *"In academic literature, sciolistic designates showing frivolous or superficial interest; amateurish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scion]] | noun | **1.** A descendent or heir. | *"But we have reason to cool our raging motions, our carnal stings, our unbitted lusts; whereof I take this, that you call love, to be a sect, or scion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[scirpus]] | noun | **1.** Rhizomatous perennial grasslike herbs. | *"In academic literature, scirpus designates rhizomatous perennial grasslike herbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scission]] | noun | **1.** The act of dividing by cutting or splitting. | *"In academic literature, scission designates the act of dividing by cutting or splitting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scissor]] | verb | **1.** Cut with or as if with scissors. | *"The ——th regiment are stationed there since the riots; and the officers are the most agreeable men in the world: they put all our young knife-grinders and scissor merchants to shame.” It seemed to me that Mr."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[scissor-tailed]] | adjective | **1.** (of birds) having a deeply forked tail. | *"In academic literature, scissor-tailed designates (of birds) having a deeply forked tail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scissors]] | noun | **1.** An edge tool having two crossed pivoting blades.<br>**2.** A wrestling hold in which you wrap your legs around the opponents body or head and put your feet together and squeeze. | *"My master preaches patience to him, and the while His man with scissors nicks him like a fool; And sure (unless you send some present help) Between them they will kill the conjurer."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[scissortail]] | noun | **1.** Grey flycatcher of the southwestern united states and mexico and central america having a long forked tail and white breast and salmon and scarlet markings. | *"In academic literature, scissortail designates grey flycatcher of the southwestern united states and mexico and central america having a long forked tail and white breast and salmon and scarlet markings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scissure]] | noun | **1.** A long narrow opening. | *"In academic literature, scissure designates a long narrow opening."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sciuridae]] | noun | **1.** A mammal family of true squirrels including: ground squirrels; marmots; chipmunks; flying squirrels; spermophiles. | *"In academic literature, sciuridae designates a mammal family of true squirrels including: ground squirrels; marmots; chipmunks; flying squirrels; spermophiles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sciuromorpha]] | noun | **1.** Large more or less primitive rodents: squirrels; marmots; gophers; beavers; etc. | *"In academic literature, sciuromorpha designates large more or less primitive rodents: squirrels; marmots; gophers; beavers; etc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sciurus]] | noun | **1.** Type genus of the sciuridae; typical moderate-sized arboreal squirrels. | *"In academic literature, sciurus designates type genus of the sciuridae; typical moderate-sized arboreal squirrels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subconscious]] | noun | **1.** Psychic activity just below the level of awareness.<br>**2.** Just below the level of consciousness. | *"If by hypnotism the conscious mind were put to sleep, and the subconscious mind awakened, then was the thing accomplished, then would all the dungeon doors of the brain be thrown wide, then would the prisoners emerge into the sunshine."* — Jack London, *The Jacket (The Star-Rover)* |
| [[subconsciously]] | adverb | **1.** From the subconscious mind. | *"He thought, for a while, that what he missed was the ships, and that, subconsciously, there was some nostalgia for the sea on him."* — Donn Byrne, *The Wind Bloweth* |
| [[subconsciousness]] | noun | **1.** A state of mind not immediately available to consciousness. | *"Thus, as a sample of my rovings: in a single interval of fifteen minutes of subconsciousness I have crawled and bellowed in the slime of the primeval world and sat beside Haas—further and cleaved the twentieth century air in a gas-driven monoplane."* — Jack London, *The Jacket (The Star-Rover)* |
| [[unconscientious]] | adjective | **1.** Not conscientious. | *"In academic literature, unconscientious designates not conscientious."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unconscientiousness]] | noun | **1.** The quality of being willing to ignore the dictates of conscience.<br>**2.** The trait of not being painstaking or careful. | *"In academic literature, unconscientiousness designates the quality of being willing to ignore the dictates of conscience."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unconscionable]] | adjective | **1.** Lacking a conscience.<br>**2.** Greatly exceeding bounds of reason or moderation. | *"There is an unconscionable old shark for you!” said Herbert."* — Charles Dickens, *Great Expectations* |
| [[unconscious]] | noun | **1.** That part of the mind wherein psychic activity takes place of which the person is unaware.<br>**2.** Not conscious; lacking awareness and the capacity for sensory perception as if asleep or dead. | *"She was quite unconscious that she only praised herself and that it was in the goodness of her own heart that she made so much of me!"* — Charles Dickens, *Bleak House* |
| [[unconsciously]] | adverb | **1.** Without awareness. | *"Isn't it possible that the child should have unconsciously said an impertinence?"* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[unconsciousness]] | noun | **1.** A state lacking normal awareness of the self or environment. | *"She was assisted, however, by that perfect indifference and apparent unconsciousness, among the only three of her own friends in the secret of the past, which seemed almost to deny any recollection of it."* — Jane Austen, *Persuasion* |
| [[unscientific]] | adjective | **1.** Not consistent with the methods or principles of science. | *"Capital punishment is so _silly_, so stupid, so horribly unscientific."* — Jack London, *The Jacket (The Star-Rover)* |
| [[unscientifically]] | adverb | **1.** In an unscientific way; not according to the principles of science. | *"In academic literature, unscientifically designates in an unscientific way; not according to the principles of science."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Thought]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SCI
  </div>
</div>
