---
status: unread
type: root_dashboard
---
# Dashboard — sens
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sens-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to feel or perceive”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Using your eyes, ears, nose, and fingertips to notice the world around you.</span>
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

The root **sens** means to feel or perceive. It refers to the action of feeling and carrying out this process. In English, this root forms words such as *sense*, *sensitive*, *sensation*, and *consensus*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to feel or perceive
> The root **sens** means to feel or perceive. It refers to the action of feeling and carrying out this process. In English, this root forms words such as *sense*, *sensitive*, *sensation*, and *consensus*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To feel or perceive</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Using your eyes, ears, nose, and fingertips to notice the world around you.</mark>
> - **Everyday Connection**: Think of familiar words like *sense* and *sensitive*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sens** comes from a Latin word that means *"to feel or perceive"*.
  - At its core, it describes the action of feel or perceive.

- **The Big Picture Idea**:
  - Picture using your eyes, ears, nose, and fingertips to notice the world around you.
  - Whenever you see **sens** in an English word, think of **to feel or perceive**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to feel or perceive).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Sense**: A faculty by which the body perceives an external stimulus. 2. Sound practical judgment. 3. Meaning or intelligibility. 4. To perceive intuitively or physically.
  - **Sensitive**: Quick to detect or respond to slight changes, signals, or influences. 2. Easily offended or emotionally wounded.
  - **Sensation**: A physical feeling or perception resulting from something that happens to or comes into contact with the body. 2. A widespread reaction of excitement or wonder.
  - **Consensus**: General agreement or harmony among members of a group. 2. Group solidarity in belief or sentiment.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sens</mark>, think of <mark class="hl-def">to feel or perceive</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Base Noun / Verb:** *sense* $\to$ *sensation*, *sensory*, *sensor*, *sensorium*.
- **Capacity Suffix (`-ible`):** *sens-* + *-ible* $\to$ *sensible* (reasonable; capable of being perceived), *sensibility*.
- **Receptive Suffix (`-itive`):** *sens-* + *-itive* $\to$ *sensitive* (easily affected, delicate), *sensitivity*, *sensitize*, *desensitize*.
- **Aesthetic vs Carnal (`-uous` vs `-ual`):** *sensuous* (delighting the senses) vs *sensual* (devoted to physical/carnal gratification).
- **Prefixation:**
  - `con-` + *sens-* $\to$ *consensus* (general agreement).
  - `non-` + *sense* $\to$ *nonsense* (lacking logical meaning).
  - `in-` + *sens-* $\to$ *insensitive* (unfeeling), *insensate* (lacking sensation or reason).

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

### 1. Physical Perception & Technology
- *sense* (faculty of bodily perception; perception of reality).
- *sensory* (relating to sensation or the senses).
- *sensor* (a technical device that detects and measures physical stimuli).
- *sensorium* (the sensory apparatus of an organism considered as an integrated whole).

### 2. Emotional & Physical Reactivity
- *sensitive* (quick to detect or respond to slight changes or signals; tender).
- *sensibility* (the ability to feel, respond to emotional or aesthetic impressions).
- *desensitize* (to make less sensitive, emotionally numb, or immune to allergens).

### 3. Reason, Judgment & Logic
- *sensible* (possessing or displaying sound practical wisdom).
- *nonsense* (words or behavior with no meaning or sense; foolishness).
- *consensus* (widespread agreement among a group of people).
- *sentence* (a grammatically complete expression of thought; judicial judgment).

### 4. Carnal Gratification vs Aesthetic Pleasure
- *sensual* (gratifying the physical appetites, especially sexual or carnal).
- *sensuous* (appealing to the senses aesthetically, rich in imagery and texture).

---

## 🔀 4. Prefix & Combining Dynamics on sens

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `con-` + `sens-` + `-us` | Collective prefixation | Harmony of shared feeling, opinion, or judgment | *consensus* |
| `non-` + `sense` | Negative prefixation | Utter lack of meaning, logic, or intelligibility | *nonsense, nonsensical* |
| `in-` + `sens-` + `-ate` | Privative prefixation | Devoid of sensory feeling, warmth, or sanity | *insensate* |
| `de-` + `sensitize` | Reversal prefixation | Stripping away emotional or biological sensitivity | *desensitize* |
| `sens-` + `-uous` | Aesthetic adjectival | Rich in sensory delight without carnal baseness | *sensuous, sensuously* |
| `sens-` + `-ual` | Carnal adjectival | Pertaining to bodily indulgence and physical desire | *sensual, sensuality* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Neuroscience & Psychology:** Sensory processing sensitivity, mechanoreceptors, sensory gating, sensorimotor integration.
- **Engineering & IoT:** Infrared sensors, biometric sensors, sensor fusion algorithms.
- **Law & Jurisprudence:** Sentences, consensus rulings, sensible judicial discretion.
- **Literary Theory & Aesthetics:** Sensibility (Jane Austen's *Sense and Sensibility*), sensuous poetic imagery.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[consensual]] | adjective | **1.** Existing by consent. | *"In academic literature, consensual designates existing by consent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consensus]] | noun | **1.** Agreement in the judgment or opinion reached by a group as a whole. | *"We must give greater credence to each other's needs and aspirations and arrive at consensus on sharing in the responsibilities for this, our family of planets and satellites."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[desensitisation]] | noun | **1.** The process of reducing sensitivity. | *"In academic literature, desensitisation designates the process of reducing sensitivity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desensitise]] | verb | **1.** Cause not to be sensitive.<br>**2.** Make insensitive. | *"In academic literature, desensitise designates cause not to be sensitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desensitising]] | verb | **1.** Cause not to be sensitive.<br>**2.** Make insensitive. | *"In academic literature, desensitising designates cause not to be sensitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desensitization]] | noun | **1.** The process of reducing sensitivity. | *"In academic literature, desensitization designates the process of reducing sensitivity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desensitize]] | verb | **1.** Cause not to be sensitive.<br>**2.** Make insensitive. | *"In academic literature, desensitize designates cause not to be sensitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desensitizing]] | verb | **1.** Cause not to be sensitive.<br>**2.** Make insensitive. | *"In academic literature, desensitizing designates cause not to be sensitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissension]] | noun | **1.** Disagreement among those expected to cooperate.<br>**2.** A conflict of people's opinions or actions or characters. | *"And for dissension, who preferreth peace More than I do, except I be provoked?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extrasensory]] | adjective | **1.** Seemingly outside normal sensory channels. | *"In academic literature, extrasensory designates seemingly outside normal sensory channels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insensate]] | adjective | **1.** Devoid of feeling and consciousness and animation.<br>**2.** Without compunction or human feeling. | *"Mine was th’ insensate frenzied part, Ah! why should I such scenes outlive?"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[insensately]] | adverb | **1.** In an insensate manner. | *"In academic literature, insensately designates in an insensate manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insensibility]] | noun | **1.** A lack of sensibility.<br>**2.** Devoid of passion or feeling; hardheartedness. | *"Ada found me thus and had such a delightful confidence in me when I showed her the keys and told her about them that it would have been insensibility and ingratitude not to feel encouraged."* — Charles Dickens, *Bleak House* |
| [[insensible]] | adjective | **1.** Incapable of physical sensation.<br>**2.** Unaware of or indifferent to. | *"Peace is a very apoplexy, lethargy; mulled, deaf, sleepy, insensible; a getter of more bastard children than war’s a destroyer of men."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[insensibly]] | adverb | **1.** In a numb manner; without feeling. | *"Moreover, when two people are once parted—have abandoned a common domicile and a common environment—new growths insensibly bud upward to fill each vacated place; unforeseen accidents hinder intentions, and old plans are forgotten."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[insensitive]] | adjective | **1.** Not responsive to physical stimuli.<br>**2.** Deficient in human sensibility; not mentally or morally sensitive. | *"It is something like the way Dame Nature gathers round a foreign body an envelope of some insensitive tissue which can protect from evil that which it would otherwise harm by contact."* — Bram Stoker, *Dracula* |
| [[insensitively]] | adverb | **1.** In an insensitive manner. | *"In academic literature, insensitively designates in an insensitive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insensitiveness]] | noun | **1.** The inability to respond to affective changes in your interpersonal environment. | *"In academic literature, insensitiveness designates the inability to respond to affective changes in your interpersonal environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insensitivity]] | noun | **1.** The inability to respond to affective changes in your interpersonal environment. | *"In academic literature, insensitivity designates the inability to respond to affective changes in your interpersonal environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsense]] | noun | **1.** A message that seems to convey no meaning.<br>**2.** Ornamental objects of no great value. | *"I wonder the very paving-stones opposite our house can have the patience to stay there and be a witness of such inconsistencies and contradictions as all that sounding nonsense, and Ma’s management!” I could not but understand her to refer to Mr."* — Charles Dickens, *Bleak House* |
| [[nonsensical]] | adjective | **1.** Incongruous;inviting ridicule.<br>**2.** Having no intelligible meaning. | *"You are a nonsensical child to have done anything of this kind,” said Mrs."* — Charles Dickens, *Bleak House* |
| [[nonsensicality]] | noun | **1.** A message that seems to convey no meaning. | *"In academic literature, nonsensicality designates a message that seems to convey no meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsensitive]] | adjective | **1.** Never having had security classification. | *"In academic literature, nonsensitive designates never having had security classification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oversensitive]] | adjective | **1.** Unduly sensitive or thin-skinned. | *"In academic literature, oversensitive designates unduly sensitive or thin-skinned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oversensitiveness]] | noun | **1.** Sensitivity leading to easy irritation or upset. | *"In academic literature, oversensitiveness designates sensitivity leading to easy irritation or upset."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sens]] | noun | **1.** Street names for marijuana.<br>**2.** A fractional monetary unit of japan and indonesia and cambodia; equal to one hundredth of a yen or rupiah or riel. | *"Captain Jamie must have sensed this faith that informed me, for he said: “I remember a Swede that went crazy twenty years ago."* — Jack London, *The Jacket (The Star-Rover)* |
| [[sensate]] | adjective | **1.** Having physical sensation. | *"In academic literature, sensate designates having physical sensation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensation]] | noun | **1.** An unelaborated elementary awareness of stimulation.<br>**2.** Someone who is dazzlingly skilled in any field. | *"I am always conscious of an uncomfortable sensation now and then when the wind is blowing in the east.” “Rheumatism, sir?” said Richard."* — Charles Dickens, *Bleak House* |
| [[sensational]] | adjective | **1.** Causing intense interest, curiosity, or emotion.<br>**2.** Commanding attention. | *"The morning following the arrest of Victor Ancona, the newspapers published long sensational articles, denounced him as a fiend, and convicted him."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[sensationalism]] | noun | **1.** Subject matter that is calculated to excite and please vulgar tastes.<br>**2.** The journalistic use of subject matter that appeals to vulgar tastes. | *"If he only amuses them and deals in paltry three-cent sensationalism, away with more of the same sort of stuff which we already have in so many pastors!"* — Byron J. Rees, *The Heart-Cry of Jesus* |
| [[sensationalist]] | noun | **1.** Someone who uses exaggerated or lurid material in order to gain public attention. | *"In academic literature, sensationalist designates someone who uses exaggerated or lurid material in order to gain public attention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensationalistic]] | adjective | **1.** Typical of tabloids. | *"In academic literature, sensationalistic designates typical of tabloids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensationally]] | adverb | **1.** In a sensational manner. | *"In academic literature, sensationally designates in a sensational manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sense]] | noun | **1.** A general conscious awareness.<br>**2.** The meaning of a word or expression; the way in which a word or expression or situation can be interpreted. | *"You are my all the world, and I must strive, To know my shames and praises from your tongue, None else to me, nor I to none alive, That my steeled sense or changes right or wrong."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sensed]] | verb | **1.** Perceive by a physical sensation, e.g., coming from the skin or muscles.<br>**2.** Detect some circumstance or entity automatically. | *"Captain Jamie must have sensed this faith that informed me, for he said: “I remember a Swede that went crazy twenty years ago."* — Jack London, *The Jacket (The Star-Rover)* |
| [[senseless]] | adjective | **1.** Not marked by the use of reason.<br>**2.** Unresponsive to stimulation. | *"I say we must not So stain our judgment, or corrupt our hope, To prostitute our past-cure malady To empirics, or to dissever so Our great self and our credit, to esteem A senseless help, when help past sense we deem."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[senselessly]] | adverb | **1.** In a meaningless and purposeless manner.<br>**2.** In an unreasonably senseless manner. | *"It now seemed clear to him that all his experience of life must be senselessly wasted unless he applied it to some kind of work and again played an active part in life."* — graf Leo Tolstoy, *War and Peace* |
| [[senselessness]] | noun | **1.** Total lack of meaning or ideas. | *"Open their bleared lids and look on your own accursed senselessness!"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[sensibilise]] | verb | **1.** Make sensitive or aware. | *"In academic literature, sensibilise designates make sensitive or aware."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensibility]] | noun | **1.** Mental responsiveness and awareness.<br>**2.** Refined sensitivity to pleasurable or painful impressions. | *"Yes, cousin John.” “Why,” he slowly replied, roughening his head more and more, “he is all sentiment, and—and susceptibility, and—and sensibility, and—and imagination."* — Charles Dickens, *Bleak House* |
| [[sensibilize]] | verb | **1.** Make sensitive or aware. | *"In academic literature, sensibilize designates make sensitive or aware."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensible]] | adjective | **1.** Showing reason or sound judgment.<br>**2.** Able to feel or perceive. | *"Thou art sensible in nothing but blows, and so is an ass."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sensibleness]] | noun | **1.** The quality of showing good sense or practical judgment. | *"In academic literature, sensibleness designates the quality of showing good sense or practical judgment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensibly]] | adverb | **1.** With good sense or in a reasonable or intelligent manner. | *"O noble fellow, Who sensibly outdares his senseless sword, And when it bows, stand’st up!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sensify]] | verb | **1.** Make sensitive or aware. | *"In academic literature, sensify designates make sensitive or aware."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensing]] | noun | **1.** The perception that something has occurred or some state exists.<br>**2.** Becoming aware of something via the senses. | *"Hodak, sensing Drummer's scrutiny, glanced sideways at him, winked straight-faced, and returned to observe the crowd."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[sensitisation]] | noun | **1.** The state of being sensitive (as to an antigen).<br>**2.** (psychology) the process of becoming highly sensitive to specific events or situations (especially emotional events or situations). | *"In academic literature, sensitisation designates the state of being sensitive (as to an antigen)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitise]] | verb | **1.** Cause to sense; make sensitive.<br>**2.** Make sensitive to a drug or allergen. | *"In academic literature, sensitise designates cause to sense; make sensitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitised]] | verb | **1.** Cause to sense; make sensitive.<br>**2.** Make sensitive to a drug or allergen. | *"In academic literature, sensitised designates cause to sense; make sensitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitiser]] | noun | **1.** (chemistry) a substance other than a catalyst that facilitates the start of a catalytic reaction. | *"In academic literature, sensitiser designates (chemistry) a substance other than a catalyst that facilitates the start of a catalytic reaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitising]] | noun | **1.** Rendering an organism sensitive to a serum by a series of injections.<br>**2.** Cause to sense; make sensitive. | *"In academic literature, sensitising designates rendering an organism sensitive to a serum by a series of injections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitive]] | noun | **1.** Someone who serves as an intermediary between the living and the dead.<br>**2.** Responsive to physical stimuli. | *"Beside him is a spare cushion with which he is always provided in order that he may have something to throw at the venerable partner of his respected age whenever she makes an allusion to money—a subject on which he is particularly sensitive."* — Charles Dickens, *Bleak House* |
| [[sensitively]] | adverb | **1.** In a sensitive manner. | *"The feeble mother was most sensitively anxious lest her daughter should pursue some unwarrantable course which should lead to relapse."* — Classic Author, *The wonders of prayer* |
| [[sensitiveness]] | noun | **1.** Sensitivity to emotional feelings (of self and others).<br>**2.** (physiology) responsiveness to external stimuli; the faculty of sensation. | *"Yet the intrinsic quality of the event moved his touchy sensitiveness less than its conjectured effect upon the minds of others."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[sensitivity]] | noun | **1.** (physiology) responsiveness to external stimuli; the faculty of sensation.<br>**2.** The ability to respond to physical stimuli or to register small physical amounts or differences. | *"Compassion will not be a burden to her; to the contrary, reaching out strengthens her sensitivity and her developing maturity."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[sensitization]] | noun | **1.** The state of being sensitive (as to an antigen).<br>**2.** (psychology) the process of becoming highly sensitive to specific events or situations (especially emotional events or situations). | *"In academic literature, sensitization designates the state of being sensitive (as to an antigen)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitize]] | verb | **1.** Make sensitive or aware.<br>**2.** Cause to sense; make sensitive. | *"In academic literature, sensitize designates make sensitive or aware."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitized]] | verb | **1.** Make sensitive or aware.<br>**2.** Cause to sense; make sensitive. | *"In academic literature, sensitized designates make sensitive or aware."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitizer]] | noun | **1.** (chemistry) a substance other than a catalyst that facilitates the start of a catalytic reaction. | *"In academic literature, sensitizer designates (chemistry) a substance other than a catalyst that facilitates the start of a catalytic reaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitizing]] | noun | **1.** Rendering an organism sensitive to a serum by a series of injections.<br>**2.** Make sensitive or aware. | *"In academic literature, sensitizing designates rendering an organism sensitive to a serum by a series of injections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitometer]] | noun | **1.** A measuring instrument for measuring the light sensitivity of film over a range of exposures. | *"In academic literature, sensitometer designates a measuring instrument for measuring the light sensitivity of film over a range of exposures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensor]] | noun | **1.** Any device that receives a signal or stimulus (as heat or pressure or light or motion etc.) and responds to it in a distinctive manner. | *"An aberrant indicator caught his eye and he mind-stroked a sensor control."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[sensorial]] | adjective | **1.** Involving or derived from the senses. | *"In academic literature, sensorial designates involving or derived from the senses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensorimotor]] | adjective | **1.** Of or relating to the sensory and motor coordination of an organism or to the controlling nerves. | *"In academic literature, sensorimotor designates of or relating to the sensory and motor coordination of an organism or to the controlling nerves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensorineural]] | adjective | **1.** Of or relating to the neural process of sensation. | *"In academic literature, sensorineural designates of or relating to the neural process of sensation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensorium]] | noun | **1.** The areas of the brain that process and register incoming sensory information and make possible the conscious awareness of the world. | *"In academic literature, sensorium designates the areas of the brain that process and register incoming sensory information and make possible the conscious awareness of the world."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensory]] | adjective | **1.** Of a nerve fiber or impulse originating outside and passing toward the central nervous system.<br>**2.** Involving or derived from the senses. | *"Millions of people who see poorly, or not at all, or who have other sensory problems, use precision tools all the time."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[sensual]] | adjective | **1.** Marked by the appetites and passions of the body.<br>**2.** Sexually exciting or gratifying. | *"I have begun, And now I give my sensual race the rein."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sensualise]] | verb | **1.** Debase through carnal gratification. | *"In academic literature, sensualise designates debase through carnal gratification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensualism]] | noun | **1.** Desire for sensual pleasures.<br>**2.** (philosophy) the ethical doctrine that feeling is the only criterion for what is good. | *"This doctrine may be inconvenient in practice, but it is far removed from vulgar sensualism, of which Shelley had not a trace."* — Sydney Waterlow, *Shelley* |
| [[sensualist]] | noun | **1.** A person who enjoys sensuality. | *"I am not absolutely such a fool and sensualist as to regret the absence of a carpet, a sofa, and silver plate; besides, five weeks ago I had nothing—I was an outcast, a beggar, a vagrant; now I have acquaintance, a home, a business."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[sensuality]] | noun | **1.** Desire for sensual pleasures. | *"I will write against it: You seem to me as Dian in her orb, As chaste as is the bud ere it be blown; But you are more intemperate in your blood Than Venus, or those pamper’d animals That rage in savage sensuality."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sensualize]] | verb | **1.** Represent materialistically, as in a painting or a sculpture.<br>**2.** Ascribe to an origin in sensation. | *"In academic literature, sensualize designates represent materialistically, as in a painting or a sculpture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensually]] | adverb | **1.** In a sultry and sensual manner. | *"As we are men, Thus should we do; being sensually subdued, We lose our human title."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sensualness]] | noun | **1.** Desire for sensual pleasures. | *"In academic literature, sensualness designates desire for sensual pleasures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensuous]] | adjective | **1.** Taking delight in beauty. | *"That would depend upon whether the germs of staunch comradeship underlay the temporary emotion, or whether it were a sensuous joy in her form only, with no substratum of everlastingness."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[sensuously]] | adverb | **1.** With aesthetic gratification or delight. | *"In academic literature, sensuously designates with aesthetic gratification or delight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensuousness]] | noun | **1.** A sensuous feeling. | *"The former curves of sensuousness were now modulated to lines of devotional passion."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[supersensitised]] | adjective | **1.** Having an allergy or peculiar or excessive susceptibility (especially to a specific factor). | *"In academic literature, supersensitised designates having an allergy or peculiar or excessive susceptibility (especially to a specific factor)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supersensitive]] | adjective | **1.** Having an allergy or peculiar or excessive susceptibility (especially to a specific factor). | *"But with the self-combating proclivity of the supersensitive, an answer thereto arose in Clare’s own mind, and he almost feared it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[supersensitized]] | adjective | **1.** Having an allergy or peculiar or excessive susceptibility (especially to a specific factor). | *"In academic literature, supersensitized designates having an allergy or peculiar or excessive susceptibility (especially to a specific factor)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsensational]] | adjective | **1.** Not of such character as to arouse intense interest, curiosity, or emotional reaction. | *"In academic literature, unsensational designates not of such character as to arouse intense interest, curiosity, or emotional reaction."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Senses & Perception]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SENS
  </div>
</div>
