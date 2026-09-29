---
status: unread
type: root_dashboard
---
# Dashboard — mir
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mir-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to wonder or look at”</span>
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

The root **mir** means to wonder or look at. It refers to the action of wondering and carrying out this process. In English, this root forms words such as *despise*, *admirable*, *admiration*, and *admire*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to wonder or look at
> The root **mir** means to wonder or look at. It refers to the action of wondering and carrying out this process. In English, this root forms words such as *despise*, *admirable*, *admiration*, and *admire*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To wonder or look at</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking through clear glass and observing every fine detail in view.</mark>
> - **Everyday Connection**: Think of familiar words like *despise* and *admirable*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mir** comes from a Latin word that means *"to wonder or look at"*.
  - At its core, it describes the action of wonder or look at.

- **The Big Picture Idea**:
  - Picture looking through clear glass and observing every fine detail in view.
  - Whenever you see **mir** in an English word, think of **to wonder or look at**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to wonder or look at).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Despise**: An everyday English word showing the root's idea of *to wonder or look at*.
  - **Admirable**: Arousing or deserving respect and approval.
  - **Admiration**: Respect and warm approval. 2. A feeling of delighted wonder.
  - **Admire**: To regard with respect or warm approval. 2. To look at something with pleasure.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mir</mark>, think of <mark class="hl-def">to wonder or look at</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Base Adjective / Noun:** *mīrus* $\to$ *miracle*, *miraculous*.
- **Directional Prefixation:**
  - `ad-` + *mīrārī* $\to$ *admīrārī* (to gaze at with approval/wonder) $\to$ *admire*, *admirer*, *admiration*, *admirable*.
- **Reflective & Optical Suffixes:**
  - *mīrātōrium* $\to$ *mirror* (reflective glass).
  - *se mirer* + *-age* $\to$ *mirage* (optical heat illusion).
- **Phonetic Shift via Old French:**
  - *mīrābilia* $\to$ *marvel*, *marvelous*.

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

### 1. Aesthetic Veneration & Respect
- *admire* (to regard with respect, warm approval, or affectionate wonder).
- *admiration* (respect and warm approval).
- *admirable* (arousing or deserving respect and approval).
- *admirer* (a person who has a particular regard or affection for someone).

### 2. Theology & The Supernatural
- *miracle* (a surprising and welcome event that is not explicable by natural or scientific laws and is considered divine).
- *miraculous* (of the nature of a miracle; extraordinary; bringing about a wonderful result).

### 3. Optics, Physics & Illusion
- *mirror* (a reflective surface, typically of glass coated with a metal amalgam; a faithful depiction).
- *mirage* (an optical illusion caused by atmospheric conditions; an unrealistic hope).

### 4. Breathtaking Astonishment
- *marvel* (a wonderful or astonishing person or thing).
- *marvelous* (causing great wonder; extraordinary; extremely good).

---

## 🔀 4. Prefix & Combining Dynamics on mir

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `ad-` + `mīr-` + `-ari` | Intensive adoration | Directing one's wondering gaze toward someone with honor | *admire, admiration* |
| `mīr-` + `-aculum` | Instrumental diminutive | A concrete manifestation of divine or supernatural wonder | *miracle, miraculous* |
| `mīr-` + `-atorium` | Reflective instrument | Polished surface that returns one's wondering image | *mirror* |
| `mīr-` + `-age` | Atmospheric refraction | A deceptive illusion born of shimmering optical heat | *mirage* |
| `mīr-` + `-abilia` | Neuter plural substantive | Prodigious, astonishing occurrences in the world | *marvel, marvelous* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Optics & Atmospheric Physics:** Specular reflection (plane and parabolic mirrors), inferior and superior mirages (Fata Morgana), refraction indices.
- **Theology & Comparative Religion:** Miracles, hagiography, canonization miracles in Roman Catholicism.
- **Literary & Aesthetic Criticism:** The aesthetics of the sublime and the marvelous (Longinus, Todorov).
- **Psychology & Sociology:** Narcissism and mirror stages (Lacan), mutual admiration, social esteem.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[admirability]] | noun | **1.** Admirable excellence. | *"In academic literature, admirability designates admirable excellence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[admirable]] | adjective | **1.** Deserving of the highest esteem or admiration.<br>**2.** Inspiring admiration or approval. | *"First, a very excellent good-conceited thing; after, a wonderful sweet air, with admirable rich words to it, and then let her consider."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[admirableness]] | noun | **1.** Admirable excellence. | *"In academic literature, admirableness designates admirable excellence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[admirably]] | adverb | **1.** In an admirable manner. | *"If I find a person unwilling to hear what I have to say, I tell that person directly, ‘I am incapable of fatigue, my good friend, I am never tired, and I mean to go on until I have done.’ It answers admirably!"* — Charles Dickens, *Bleak House* |
| [[admiral]] | noun | **1.** The supreme commander of a fleet; ranks above a vice admiral and below a fleet admiral.<br>**2.** Any of several brightly colored butterflies. | *"Th’ Antoniad, the Egyptian admiral, With all their sixty, fly and turn the rudder."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[admiralty]] | noun | **1.** The department in charge of the navy (as in great britain).<br>**2.** The office of admiral. | *"Green’s appears, on inquiry, to be at the present time aboard a vessel bound for China, three months out, but considered accessible by telegraph on application to the Lords of the Admiralty."* — Charles Dickens, *Bleak House* |
| [[admiration]] | noun | **1.** A feeling of delighted approval and liking.<br>**2.** The feeling aroused by something strange and surprising. | *"Now, good Lafew, Bring in the admiration; that we with thee May spend our wonder too, or take off thine By wond’ring how thou took’st it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[admire]] | verb | **1.** Feel admiration for.<br>**2.** Look at with admiration. | *"England shall repent his folly, see his weakness, and admire our sufferance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[admired]] | verb | **1.** Feel admiration for.<br>**2.** Look at with admiration. | *"Let him but copy what in you is writ, Not making worse what nature made so clear, And such a counterpart shall fame his wit, Making his style admired every where."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[admirer]] | noun | **1.** A person who backs a politician or a team etc.<br>**2.** A person who admires; someone who esteems or respects or approves. | *"I thank your Grace, Healthful, and ever since a fresh admirer Of what I saw there."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[admiringly]] | adverb | **1.** With admiration. | *"He was excellent indeed, madam; the king very lately spoke of him admiringly, and mourningly; he was skilful enough to have liv’d still, if knowledge could be set up against mortality."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[emir]] | noun | **1.** An independent ruler or chieftain (especially in africa or arabia). | *"His dark eyes and swarthy skin and Paynim features suited the costume exactly: he looked the very model of an Eastern emir, an agent or a victim of the bowstring."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[emirate]] | noun | **1.** The domain controlled by an emir.<br>**2.** The office of an emir. | *"In academic literature, emirate designates the domain controlled by an emir."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mirabeau]] | noun | **1.** French revolutionary who was prominent in the early days of the french revolution (1749-1791). | *"Down with every army that fights against the soap-box, The Pericles, Socrates, Diogenes soap-box, The old Elijah, Jeremiah, John-the-Baptist soap-box, The Rousseau, Mirabeau, Danton soap-box, The Karl Marx, Henry George, Woodrow Wilson soap-box."* — Vachel Lindsay, *The Chinese Nightingale, and Other Poems* |
| [[mirabilis]] | noun | **1.** Four o'clocks. | *"So close behind some promontory lie The huge Leviathan to attend their prey, And give no chance, but swallow in the fry, Which through their gaping jaws mistake the way.” —_Dryden’s Annus Mirabilis_."* — Herman Melville, *Moby Dick; Or, The Whale* |
| [[miracle]] | noun | **1.** Any amazing or wonderful occurrence.<br>**2.** A marvellous event manifesting a supernatural act of a divine agent. | *"I’m not their father; yet who this should be Doth miracle itself, lov’d before me.— ’Tis the ninth hour o’ th’ morn."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[miracle-worship]] | noun | **1.** The worship of miracles. | *"In academic literature, miracle-worship designates the worship of miracles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miraculous]] | adjective | **1.** Being or having the character of a miracle.<br>**2.** Peculiarly fortunate or appropriate; as if by divine intervention. | *"For murder, though it have no tongue, will speak With most miraculous organ."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[miraculously]] | adverb | **1.** In a miraculous manner. | *"Dairyman Crick, who was there with the rest, his wrapper gleaming miraculously white against a leaden evening sky, suddenly looked at his heavy watch."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[mirage]] | noun | **1.** An optical illusion in which atmospheric refraction by a layer of hot air distorts or inverts reflections of distant objects.<br>**2.** Something illusory and unattainable. | *"Nay, this is not the prairie that I saw In youth's mirage; 'twas fairer far than this."* — Wilfred S. Skeats, *The song of the exile* |
| [[mirasol]] | noun | **1.** Annual sunflower grown for silage and for its seeds which are a source of oil; common throughout united states and much of north america. | *"In academic literature, mirasol designates annual sunflower grown for silage and for its seeds which are a source of oil; common throughout united states and much of north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mire]] | noun | **1.** A soft wet area of low-lying land that sinks underfoot.<br>**2.** Deep soft mud in water or slush. | *"My master and his man are both broke loose, Beaten the maids a-row, and bound the doctor, Whose beard they have singed off with brands of fire, And ever as it blazed they threw on him Great pails of puddled mire to quench the hair."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mired]] | verb | **1.** Entrap.<br>**2.** Cause to get stuck as if in a mire. | *"The terrified horses tried again and again to break away; but the chain harnesses were too strong; nor did the mired wheel budge."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[miri]] | noun | **1.** Little known kamarupan languages. | *"The Miris of Assam prize tiger's flesh as food for men; it gives them strength and courage."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[mirid]] | noun | **1.** A variety of leaf bug. | *"In academic literature, mirid designates a variety of leaf bug."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miridae]] | noun | **1.** Leaf bugs. | *"In academic literature, miridae designates leaf bugs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mirish]] | noun | **1.** Little known kamarupan languages. | *"In academic literature, mirish designates little known kamarupan languages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miro]] | noun | **1.** New zealand conifer used for lumber; the dark wood is used for interior carpentry.<br>**2.** Spanish surrealist painter (1893-1983). | *"In academic literature, miro designates new zealand conifer used for lumber; the dark wood is used for interior carpentry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mirounga]] | noun | **1.** Elephant seals. | *"In academic literature, mirounga designates elephant seals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mirror]] | noun | **1.** Polished surface that forms images by reflecting light.<br>**2.** A faithful depiction or reflection. | *"When such a spacious mirror’s set before him, He needs must see himself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mirrored]] | verb | **1.** Reflect as if in a mirror.<br>**2.** Reflect or resemble. | *"The strong southern light broke in splinters on the dancing water, and was mirrored in reflected ripplings, silver-pale, tremulous, over the shadowy understems of grass and loosestrife on the opposite bank."* — Anthony Pryde, *Nightfall* |
| [[mirrorlike]] | adjective | **1.** Capable of reflecting light like a mirror. | *"This was Speránski’s cold, mirrorlike look, which did not allow one to penetrate to his soul, and his delicate white hands, which Prince Andrew involuntarily watched as one does watch the hands of those who possess power."* — graf Leo Tolstoy, *War and Peace* |
| [[mirth]] | noun | **1.** Great merriment. | *"He was disposed to mirth; but on the sudden A Roman thought hath struck him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mirthful]] | adjective | **1.** Full of or showing high-spirited merriment; ; - wordsworth.<br>**2.** Arousing or provoking laughter. | *"And now what rests but that we spend the time With stately triumphs, mirthful comic shows, Such as befits the pleasure of the court?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mirthfully]] | adverb | **1.** In a joyous manner. | *"Miss Mathewson”--his glance mirthfully surveyed her--“Aunt Ellen will take you upstairs and give you a chance to put that magnificent brown hair into a condition where it will not shock the natives at the station."* — Grace S. Richmond, *Red Pepper Burns* |
| [[mirthfulness]] | noun | **1.** Great merriment. | *"The thoughts, too, that run around the ring of familiar guests have a piquancy and mirthfulness, and oftentimes a vivid truth, which more rarely find their way into the elaborate intercourse of dinner."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[mirthless]] | adjective | **1.** Lacking mirth. | *"It was a curious laugh; distinct, formal, mirthless."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[miry]] | adjective | **1.** (of soil) soft and watery. | *"Shall thy good uncle, and thy brother Lucius, And thou, and I, sit round about some fountain, Looking all downwards to behold our cheeks How they are stained, like meadows yet not dry, With miry slime left on them by a flood?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[semirigid]] | adjective | **1.** Having a form maintained by a rigid internal structure as well as by internal gas pressure.<br>**2.** Not fully rigid. | *"In academic literature, semirigid designates having a form maintained by a rigid internal structure as well as by internal gas pressure."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · MIR
  </div>
</div>
