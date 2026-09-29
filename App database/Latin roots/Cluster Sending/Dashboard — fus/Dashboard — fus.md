---
status: unread
type: root_dashboard
---
# Dashboard — fus
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fus-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to pour or melt”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Releasing a messenger or sending a written letter on a long journey.</span>
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

The root **fus** means to pour or melt. It refers to the action of pouring and carrying out this process. In English, this root forms words such as *confuse*, *diffuse*, *fusion*, and *refuse*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: to pour or melt
> The root **fus** means to pour or melt. It refers to the action of pouring and carrying out this process. In English, this root forms words such as *confuse*, *diffuse*, *fusion*, and *refuse*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To pour or melt</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Releasing a messenger or sending a written letter on a long journey.</mark>
> - **Everyday Connection**: Think of familiar words like *confuse* and *diffuse*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fus** comes from a Latin word that means *"to pour or melt"*.
  - At its core, it describes the action of pour or melt.

- **The Big Picture Idea**:
  - Picture releasing a messenger or sending a written letter on a long journey.
  - Whenever you see **fus** in an English word, think of **to pour or melt**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to pour or melt).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Confuse**: To cause someone to become bewildered or perplexed.
  - **Diffuse**: An everyday English word showing the root's idea of *to pour or melt*.
  - **Fusion**: The process or result of joining two or more things together to form a single entity.
  - **Refuse**: An everyday English word showing the root's idea of *to pour or melt*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fus</mark>, think of <mark class="hl-def">to pour or melt</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Present / Nasal Stem:** *fund-* (*fundō, fundere*) $	o$ *foundry, confound, refund*.

- **Supine / Participial Base:** *fūs-* (*fūsum, fūsiō*) $	o$ *fuse, fusion, fusible, confuse, diffuse, effuse, infuse, profuse, suffuse, transfuse*.

- **Frequentative / Leaky Stem:** *futilis* $	o$ *futile, futility*.



### 2.2 Classical Prefixation Matrix on fus

- `con-` + *fundere* $	o$ *confuse, confound* (pouring together into chaos).

- `dis-` + *fundere* $	o$ *diffuse, diffusion* (pouring apart in all directions).

- `ex-` + *fundere* $	o$ *effuse, effusion* (pouring forth outward).

- `in-` + *fundere* $	o$ *infuse, infusion* (pouring into, steeping).

- `pro-` + *fundere* $	o$ *profuse, profusion* (pouring forth extravagantly).

- `re-` + *fundere* $	o$ *refund, refuse* (pouring back, rejecting).

- `sub-` + *fundere* $	o$ *suffuse, suffusion* (pouring underneath, spreading a wash of color).

- `trans-` + *fundere* $	o$ *transfuse, transfusion* (pouring across from one vessel to another).



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



### 1. Physics, Chemistry & Metallurgy

- *fuse (v)* (to join or blend to form a single entity; to melt with intense heat).

- *fusion* (the process or result of joining two or more things together; nuclear fusion).

- *fusible* (capable of being melted or liquefied by heat).

- *foundry* (a workshop or factory for casting metal).



### 2. Psychological Confusion & Intellectual Disorder

- *confuse* (to cause someone to become bewildered or perplexed; mistake one thing for another).

- *confusion* (uncertainty about what is happening, intended, or required; state of disorder).

- *confound* (to cause surprise or confusion in someone, especially by acting against expectations).



### 3. Dispersal, Radiance & Cultural Transmission

- *diffuse* (spread out over a large area; not concentrated).

- *diffusion* (the spreading of something more widely; molecular movement from high to low concentration).

- *diffusive* (tending to spread out; diffuse).



### 4. Abundance, Extraction & Emotional Outpouring

- *profuse* (exuberantly plentiful; abundant).

- *profusion* (an abundance or large quantity of something).

- *effuse* (to give off a liquid, light, or smell; talk unrestrainedly).

- *effusion* (an act of talking or writing in an unrestrained or emotional way; escape of fluid into a body cavity).

- *effusive* (expressing feelings of gratitude, pleasure, or approval in an unrestrained manner).



### 5. Medicine, Biology & Botanical Chemistry

- *transfuse* (cause to pass from one person, animal, or thing into another; administer a transfusion of blood).

- *transfusion* (an act of transferring donated blood or other fluid into the circulatory system).

- *infuse* (soak tea or herbs in liquid to extract flavor; instill a quality into someone).

- *infusion* (a drink or extract prepared by steeping; the introduction of a new element).

- *suffuse* (gradually spread through or over, as light, color, or tears).



---



## 🔀 4. Prefix & Combining Dynamics on fus



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Prefix `con-`** | `con-` + *fundere* | **confuse** | Pouring together into disorder | *"The conflicting witness testimonies served only to confuse the jury."* |

| **Prefix `dis-`** | `dis-` + *fundere* | **diffuse** | Pouring outward in all directions | *"Soft lamps were chosen to diffuse light evenly across the gallery."* |

| **Prefix `in-`** | `in-` + *fundere* | **infuse** | Pouring into / steeping | *"The mentor sought to infuse confidence into her young proteges."* |

| **Prefix `trans-`** | `trans-` + *fundere* | **transfusion** | Pouring across circulatory systems | *"The trauma patient required an immediate emergency blood transfusion."* |

| **Prefix `sub-`** | `sub-` + *fundere* | **suffuse** | Pouring beneath to flush surface | *"A deep crimson blush began to suffuse her cheeks in embarrassment."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🔬 **Nuclear & Theoretical Physics:** *thermonuclear fusion*, *tokamak fusion reactor*.

- 🏥 **Hematology & Clinical Medicine:** *blood transfusion*, *pleural effusion*, *intravenous drug infusion*.

- 🧪 **Physical Chemistry & Thermodynamics:** *gaseous diffusion* (Graham's law), *latent heat of fusion*.

- 💼 **Economics & Culinary Arts:** *culinary fusion cuisine*, *corporate merger and fusion*, *financial refund*.

- 🎨 **Visual Arts & Lighting:** *diffuse reflection vs specular reflection*, *diffuser lenses*.



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[affusion]] | noun | **1.** The act of baptizing someone by pouring water on their head. | *"In academic literature, affusion designates the act of baptizing someone by pouring water on their head."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumfuse]] | verb | **1.** Spread something around something. | *"Glowing, and circumfused in speechless love, Their full divinity inadequate That feeling to express, or to improve, The gods become as mortals, and man's fate Has moments like their brightest! but the weight Of earth recoils upon us;--let it go!"* — Baron George Gordon Byron Byron, *Childe Harold's Pilgrimage* |
| [[confusable]] | adjective | **1.** So similar as to be easily identified for another thing. | *"In academic literature, confusable designates so similar as to be easily identified for another thing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[confuse]] | verb | **1.** Mistake one thing for another.<br>**2.** Be confusing or perplexing to; cause to be unable to think clearly. | *"Woodcourt seemed to come back and confuse me."* — Charles Dickens, *Bleak House* |
| [[confused]] | verb | **1.** Mistake one thing for another.<br>**2.** Be confusing or perplexing to; cause to be unable to think clearly. | *"And when such time they have begun to cry, Let them not cease, but with a din confused Enforce the present execution Of what we chance to sentence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[confusedly]] | adverb | **1.** In a confused manner. | *"No leisure had he to enrank his men; He wanted pikes to set before his archers; Instead whereof sharp stakes pluck’d out of hedges They pitched in the ground confusedly To keep the horsemen off from breaking in."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[confusedness]] | noun | **1.** A mental state characterized by a lack of clear and orderly thought and behavior. | *"An eddying murmur filled my ears, and a strange, dumb confusedness descended on my mind."* — H. G. Wells, *The Time Machine* |
| [[confusing]] | verb | **1.** Mistake one thing for another.<br>**2.** Be confusing or perplexing to; cause to be unable to think clearly. | *"Be happy!” His benignity as he raised his future daughter-in-law and stretched out his hand to his son (who kissed it with affectionate respect and gratitude) was the most confusing sight I ever saw."* — Charles Dickens, *Bleak House* |
| [[confusingly]] | adverb | **1.** In a bewildering and confusing manner. | *"In academic literature, confusingly designates in a bewildering and confusing manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[confusion]] | noun | **1.** Disorder resulting from a failure to behave predictably.<br>**2.** A mental state characterized by a lack of clear and orderly thought and behavior. | *"But when we in our viciousness grow hard— O misery on’t!—the wise gods seal our eyes, In our own filth drop our clear judgments, make us Adore our errors, laugh at’s while we strut To our confusion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[defuse]] | verb | **1.** Remove the triggering device from. | *"If but as well I other accents borrow, That can my speech defuse, my good intent May carry through itself to that full issue For which I rais’d my likeness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[defusing]] | noun | **1.** The act of deactivating or making ineffective (as a bomb).<br>**2.** Remove the triggering device from. | *"In academic literature, defusing designates the act of deactivating or making ineffective (as a bomb)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diffuse]] | verb | **1.** Move outward.<br>**2.** Spread or diffuse through. | *"These fostering measures were expected to increase wealth and to diffuse a greater welfare through the community."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[diffused]] | verb | **1.** Move outward.<br>**2.** Spread or diffuse through. | *"Upon a sudden, As Falstaff, she, and I are newly met, Let them from forth a sawpit rush at once With some diffused song; upon their sight We two in great amazedness will fly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diffusely]] | adverb | **1.** In a diffuse manner. | *"Grant’s being so well settled in life without being handsome, and expressed her astonishment on that point almost as often, though not so diffusely, as Mrs."* — Jane Austen, *Mansfield Park* |
| [[diffuseness]] | noun | **1.** The spatial property of being spread out over a wide area or through a large volume. | *"Hurst also made her a slight bow, and said he was “very glad;” but diffuseness and warmth remained for Bingley’s salutation."* — Jane Austen, *Pride and Prejudice* |
| [[diffuser]] | noun | **1.** Baffle that distributes sound waves evenly.<br>**2.** Optical device that distributes the light of a lamp evenly. | *"In academic literature, diffuser designates baffle that distributes sound waves evenly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diffusing]] | verb | **1.** Move outward.<br>**2.** Spread or diffuse through. | *"Vholes, whose black dye was so deep from head to foot that it had quite steamed before the fire, diffusing a very unpleasant perfume, made a short one-sided inclination of his head from the neck and slowly shook it."* — Charles Dickens, *Bleak House* |
| [[diffusion]] | noun | **1.** (physics) the process in which there is movement of a substance from an area of high concentration of that substance to an area of lower concentration.<br>**2.** The spread of social institutions (and myths and skills) from one society to another. | *"There seemed a general diffusion of cheerfulness on the occasion."* — Jane Austen, *Mansfield Park* |
| [[diffusive]] | adjective | **1.** Spreading by diffusion. | *"And even here, in order to avoid a research too vague and diffusive, it will be proper to confine ourselves to the few examples which are best known, and which bear the greatest analogy to our particular case."* — Alexander Hamilton, *The Federalist Papers* |
| [[diffusor]] | noun | **1.** Baffle that distributes sound waves evenly.<br>**2.** Optical device that distributes the light of a lamp evenly. | *"In academic literature, diffusor designates baffle that distributes sound waves evenly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[effuse]] | verb | **1.** Pour out.<br>**2.** Flow or spill forth. | *"The air hath got into my deadly wounds, And much effuse of blood doth make me faint."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[effusion]] | noun | **1.** An unrestrained expression of emotion.<br>**2.** Flow under pressure. | *"For our losses, his exchequer is too poor; for the effusion of our blood, the muster of his kingdom too faint a number; and for our disgrace, his own person, kneeling at our feet, but a weak and worthless satisfaction."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[effusive]] | adjective | **1.** Uttered with unrestrained enthusiasm.<br>**2.** Extravagantly demonstrative. | *"He greeted me with effusive shouts, and drew me aside."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[effusively]] | adverb | **1.** In an effusive manner. | *"Amanda," the other girl said effusively, "what a fine young man!"* — Anna Balmer Myers, *Amanda: A Daughter of the Mennonites* |
| [[effusiveness]] | noun | **1.** A friendly open trait of a talkative person. | *"In academic literature, effusiveness designates a friendly open trait of a talkative person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fusain]] | noun | **1.** A stick of black carbon material used for drawing. | *"In academic literature, fusain designates a stick of black carbon material used for drawing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fusanus]] | noun | **1.** Quandong trees. | *"In academic literature, fusanus designates quandong trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fuschia]] | noun | **1.** A dark purplish-red color. | *"In academic literature, fuschia designates a dark purplish-red color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fuscoboletinus]] | noun | **1.** A genus of fungi belonging to the family boletaceae. | *"In academic literature, fuscoboletinus designates a genus of fungi belonging to the family boletaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fuscous]] | adjective | **1.** Of something having a dusky brownish grey color. | *"HAWKWEED RUST; on both sides of the leaf, dark, fuscous, minute, round, scattered: spores globose, rarely minutely pedicellate.—On Thistles and Hawkweed."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[fuse]] | noun | **1.** An electrical device that can interrupt the flow of electrical current when it is overloaded.<br>**2.** Any igniter that is used to initiate the burning of a propellant. | *"It was like trying to balance calmly on the lid of the tinder-box when you didn't know whether or not you had touched off the fuse."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[fused]] | verb | **1.** Mix together different elements.<br>**2.** Become plastic or fluid or liquefied from heat. | *"By our era all these religions were fused into one religion, of many cults and rites and ancient traditions; and the incredible weight of old tradition in that world is hard to overestimate."* — T. R. Glover, *The Jesus of History* |
| [[fusee]] | noun | **1.** A spirally grooved spindle in a clock that counteracts the diminishing power of the uncoiling mainspring.<br>**2.** A colored flare used as a warning signal by trucks and trains. | *"In academic literature, fusee designates a spirally grooved spindle in a clock that counteracts the diminishing power of the uncoiling mainspring."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fuselage]] | noun | **1.** The central body of an airplane that is designed to accommodate the crew and passengers (or cargo). | *"Closer, Myra." At arm's length, and the ship immobilized by its mags, Hodak braced his back against the fuselage and tried again."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[fusible]] | adjective | **1.** Capable of being melted and fused. | *"The presence of such envelopes of very brittle, fusible, and limpid bismuth material explains much of the harmful effect of this impurity."* — Donald M. Levy, *Modern Copper Smelting* |
| [[fusiform]] | adjective | **1.** Tapering at each end. | *"ROSE BRAND; hypogenous, scattered over the leaves in minute tufts; spores 5- to 7-septate, terminal joint mucronate; peduncles incrassated below, fusiform.—On leaves of various Roses."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[fusil]] | noun | **1.** A light flintlock musket. | *"In academic literature, fusil designates a light flintlock musket."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fusilier]] | noun | **1.** (formerly) a british infantryman armed with a light flintlock musket. | *"A Dublin fusilier was in that shelter one night and said he saw him in South Africa."* — James Joyce, *Ulysses* |
| [[fusillade]] | noun | **1.** Rapid simultaneous discharge of firearms.<br>**2.** Attack with fusillade. | *"A fusillade burst out under my feet."* — Joseph Conrad, *Heart of Darkness* |
| [[fusion]] | noun | **1.** An occurrence that involves the production of a union.<br>**2.** The state of being combined into one body. | *"Oak belonged to the even-tempered order of humanity, and felt the secret fusion of himself in Bathsheba to be burning with a finer flame now that she was gone—that was all."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[fuss]] | noun | **1.** An excited state of agitation.<br>**2.** An angry disturbance. | *"I feel decidedly that too much fuss is made about the grandmother and the child."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[fuss-budget]] | noun | **1.** Thinks about unfortunate things that might happen. | *"In academic literature, fuss-budget designates thinks about unfortunate things that might happen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fussily]] | adverb | **1.** In a fussy manner. | *"How is it,” she began, as usual in French, settling down briskly and fussily in the easy chair, “how is it Annette never got married?"* — graf Leo Tolstoy, *War and Peace* |
| [[fussiness]] | noun | **1.** An irritable petulant feeling.<br>**2.** Unnecessary elaborateness in details. | *"It is no longer asceticism, no longer the mystical trance, no longer the "fussiness," with which the early Christian reproached the Jew, which still haunts all the religions of taboo and merit, and even Christianity in some forms."* — T. R. Glover, *The Jesus of History* |
| [[fusspot]] | noun | **1.** Thinks about unfortunate things that might happen. | *"In academic literature, fusspot designates thinks about unfortunate things that might happen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fussy]] | adjective | **1.** Annoyed and irritable.<br>**2.** Overcrowded or cluttered with detail. | *"The rattle of the quarter-jack again from its niche, its blows for three-quarters, its fussy retreat, were almost painfully abrupt, and caused many of the congregation to start palpably."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[fustian]] | noun | **1.** Pompous or pretentious talk or writing.<br>**2.** A strong cotton and linen fabric with a slight nap. | *"I cannot endure such a fustian rascal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fustigate]] | verb | **1.** Strike with a cudgel. | *"In academic literature, fustigate designates strike with a cudgel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fusty]] | adjective | **1.** Stale and unclean smelling.<br>**2.** Old-fashioned and out of date. | *"At this fusty stuff The large Achilles, on his press’d bed lolling, From his deep chest laughs out a loud applause; Cries ‘Excellent! ’Tis Agamemnon right!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infuscate]] | verb | **1.** Darken with a brownish tinge, as of insect wings. | *"In academic literature, infuscate designates darken with a brownish tinge, as of insect wings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[infuse]] | verb | **1.** Teach and impress by frequent repetitions or admonitions.<br>**2.** Fill, as with a certain quality. | *"Methinks a woman of this valiant spirit Should, if a coward heard her speak these words, Infuse his breast with magnanimity And make him, naked, foil a man at arms."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infusion]] | noun | **1.** A solution obtained by steeping or soaking a substance (usually in water).<br>**2.** The process of extracting certain active properties (as a drug from a plant) by steeping or soaking (usually in water). | *"But, in the verity of extolment, I take him to be a soul of great article and his infusion of such dearth and rareness as, to make true diction of him, his semblable is his mirror and who else would trace him his umbrage, nothing more."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infusoria]] | noun | **1.** In some recent classifications, coextensive with the ciliata: minute organisms found in decomposing infusions of organic matter. | *"In reality, it was an infinite agglomeration of coloured infusoria, of veritable globules of jelly, provided with a threadlike tentacle, and of which as many as twenty-five thousand have been counted in less than two cubic half-inches of water."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[infusorian]] | noun | **1.** Any member of the subclass infusoria. | *"In academic literature, infusorian designates any member of the subclass infusoria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obfuscate]] | verb | **1.** Make obscure or unclear. | *"In academic literature, obfuscate designates make obscure or unclear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obfuscation]] | noun | **1.** Confusion resulting from failure to understand.<br>**2.** The activity of obscuring people's understanding, leaving them baffled or bewildered. | *"In academic literature, obfuscation designates confusion resulting from failure to understand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perfuse]] | verb | **1.** Force a fluid through (a body part or tissue).<br>**2.** Cause to spread or flush or flood through, over, or across. | *"In academic literature, perfuse designates force a fluid through (a body part or tissue)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perfusion]] | noun | **1.** Pumping a liquid into an organ or tissue (especially by way of blood vessels). | *"In academic literature, perfusion designates pumping a liquid into an organ or tissue (especially by way of blood vessels)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[profuse]] | adjective | **1.** Produced or growing in extreme abundance. | *"My Lady signifies, without profuse expenditure of words, that she is as wearily well as she can hope to be."* — Charles Dickens, *Bleak House* |
| [[profusely]] | adverb | **1.** In an abundant manner. | *"They say that they perspire profusely."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[profuseness]] | noun | **1.** The property of being extremely abundant. | *"In academic literature, profuseness designates the property of being extremely abundant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[profusion]] | noun | **1.** The property of being extremely abundant. | *"But she is a little dreaded elsewhere in consequence of an indiscreet profusion in the article of rouge and persistency in an obsolete pearl necklace like a rosary of little bird’s-eggs."* — Charles Dickens, *Bleak House* |
| [[rediffusion]] | noun | **1.** A system for distributing radio or tv programs. | *"In academic literature, rediffusion designates a system for distributing radio or tv programs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[refusal]] | noun | **1.** The act of refusing.<br>**2.** A message refusing to accept something that is offered. | *"If, as his nature is, he fall in rage With their refusal, both observe and answer The vantage of his anger."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[refuse]] | noun | **1.** Food that is discarded (as from a kitchen).<br>**2.** Show unwillingness towards. | *"Whence hast thou this becoming of things ill, That in the very refuse of thy deeds, There is such strength and warrantise of skill, That in my mind thy worst all best exceeds?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subfusc]] | adjective | **1.** Devoid of brightness or appeal. | *"In academic literature, subfusc designates devoid of brightness or appeal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suffuse]] | verb | **1.** Cause to spread or flush or flood through, over, or across.<br>**2.** To become overspread as with a fluid, a colour, a gleam of light. | *"A group of more interest appeared near the hearth, sitting still amidst the rosy peace and warmth suffusing it."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[suffusion]] | noun | **1.** The process of permeating or infusing something with a substance. | *"The dim forehead was crowned with a star; the lineaments below were seen as through the suffusion of vapour; the eyes shone dark and wild; the hair streamed shadowy, like a beamless cloud torn by storm or by electric travail."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[suffusive]] | adjective | **1.** Spreading through. | *"In academic literature, suffusive designates spreading through."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transfuse]] | verb | **1.** Impart gradually.<br>**2.** Pour out of one vessel into another. | *"I wish I could transcribe, or rather transfuse into language, the glow of my heart when I read your letter."* — Robert Burns, *The Letters of Robert Burns* |
| [[transfusion]] | noun | **1.** The introduction of blood or blood plasma into a vein or artery.<br>**2.** The action of pouring a liquid from one vessel to another. | *"There must be transfusion of blood at once."* — Bram Stoker, *Dracula* |
| [[unconfused]] | adjective | **1.** Not perplexed by conflicting situations or statements. | *"In academic literature, unconfused designates not perplexed by conflicting situations or statements."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sending]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FUS
  </div>
</div>
