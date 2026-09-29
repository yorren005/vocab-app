---
status: unread
type: root_dashboard
---
# Dashboard — radic
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">radic-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“root”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Plants blossoming in the wild and raw minerals mined from the earth.</span>
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

The root **radic** means root. It refers to the underground anchor of a plant that absorbs nutrients. In English, this root forms words such as *radical*, *radish*, and *eradicate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: root
> The root **radic** means root. It refers to the underground anchor of a plant that absorbs nutrients. In English, this root forms words such as *radical*, *radish*, and *eradicate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Root</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Plants blossoming in the wild and raw minerals mined from the earth.</mark>
> - **Everyday Connection**: Think of familiar words like *radical* and *radish*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **radic** comes from a Latin word that means *"root"*.
  - At its core, it describes root.

- **The Big Picture Idea**:
  - Picture plants blossoming in the wild and raw minerals mined from the earth.
  - Whenever you see **radic** in an English word, think of **plants, minerals, and elements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of root.
  - **Mental & Social**: How people experience, organize, or communicate about root.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Radical**: Proceeding directly from the root.
  - **Radish**: The crisp, pungent, edible taproot of a widely cultivated Eurasian brassica plant , typically eaten raw in salads.
  - **Eradicate**: To pull up, tear out, or remove completely by the roots.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">radic</mark>, think of <mark class="hl-def">plants, minerals, and elements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture
> In Latin, *rādīx* is a third-declension feminine noun:
> - **Nominative Singular:** *rādīx* ("a root")
> - **Genitive Singular:** *rādīcis* ("of a root")
> - **Diminutive:** *rādīcula* ("a little root, radicle")
> - **Prefixed Verb:** *ērādīcāre, ērādīcāvī, ērādīcātus* (*ex-* + *rādīx*, "to pull out by the roots")
>
> ### Three Primary Word Formation Pathways:
> 1. **Direct Nominal & Adjectival Derivatives (`radic-`, `radical-`):**
>    - *radix* (mathematical base; anatomical nerve root; word root).
>    - *radical* (pertaining to roots; foundational; political reformer).
>    - *radically*, *radicalism*, *radicalize*, *radicalization*.
>    - *radicant* (botanical creeping root).
> 2. **Prefixed Eradication Family (`e-radic-` < *ex-* + *rādīx*):**
>    - *eradicate* (to pull up by the roots; completely destroy).
>    - *eradication*, *eradicable*, *ineradicable* / *irradicable*.
> 3. **Diminutive Botanical & Culinary Stems (`radicul-`, `radish`, `radicchio`):**
>    - *radicle* (embryonic plant root).
>    - *radish* (Old English *rædic* < Latin *rādīcem*).
>    - *radicchio* (Italian < *rādīcula*).
> 4. **Clinical Neurology & Spine Pathology (`radicul-`):**
>    - *radicular* (pertaining to spinal nerve roots).
>    - *radiculopathy* (*radicula* + Greek *pathos*, pinched nerve root disease).
>    - *radiculitis* (inflammation of a nerve root).

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

> [!tip] 🌈 Conceptual Radiations of *rādīx*
> 1. **Deepest Foundation & Sweeping Transformation:** Philosophical first principles, thorough political reform, and revolutionary innovation (*radical*, *radically*, *radicalism*, *radicalize*).
> 2. **Complete Extermination & Uprooting:** Obliterating diseases, pests, or institutional evils down to their final remnants (*eradicate*, *eradication*, *ineradicable*).
> 3. **Mathematics & Computing:** Numerical bases, polynomial roots, and radical symbols (*radix*, *radical* sign).
> 4. **Botany & Gastronomy:** Embryonic plant germination, pungent edible taproots, and bitter salad greens (*radicle*, *radish*, *radicchio*, *radicant*).
> 5. **Neurology & Spine Medicine:** The spinal nerve roots branching from the spinal cord, and radiating pinched-nerve pathologies (*radicular*, *radiculopathy*, *radiculitis*).

---

## 🔀 4. Prefix & Combining Dynamics on radic

### Prefix Dynamics

| Prefix | Literal Meaning | Compound Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ex-` $\to$ `e-` | out of, from the bottom | [[eradicate]] | To pull entirely out by the roots; hence to exterminate or wipe out completely. |
| `in-` | not, un- | [[ineradicable]] | Incapable of being uprooted or eradicated; deeply ingrained or permanent. |

### Suffix Dynamics

| Suffix | Grammatical Role | Derivative | Semantic Result |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective (Origin / Nature) | [[radical]] | Arising from or addressing the root; fundamental; extreme. |
| `-ism` | Philosophy / Doctrine Noun | [[radicalism]] | The political doctrine advocating thorough structural reform from the roots. |
| `-ize` | Verb Formative | [[radicalize]] | To cause an individual or group to adopt extreme, root-and-branch beliefs. |
| `-ule` | Latin diminutive suffix | [[radicle]] | The delicate embryonic first root of a germinating seedling. |
| `-ish` | Folk phonetic reflex | [[radish]] | The crunchy, pungent edible taproot (*Raphanus sativus*). |
| `-pathy` | Greek πάθος (*páthos*, disease) | [[radiculopathy]] | A disorder or compression of a spinal nerve root producing radiating limb pain. |
| `-itis` | Medical inflammation suffix | [[radiculitis]] | Inflammatory irritation of an exiting spinal nerve root. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🩺 **Neurology & Orthopedics** | [[radiculopathy]], [[radicular]], [[radiculitis]] | Lumbar disc herniation compressing the L5-S1 nerve root; sciatica diagnosis. |
| 🌍 **Public Health & Epidemiology** | [[eradicate]], [[eradication]] | Global smallpox eradication campaign (1980); poliovirus eradication initiatives. |
| 🗳️ **Political Science & Philosophy** | [[radical]], [[radicalism]], [[radicalize]] | Constitutional reform movements, political radicalization, philosophical first causes. |
| 📐 **Mathematics & Computer Science** | [[radix]], [[radical]] | Radix sort algorithms, binary/hexadecimal radix conversion, radical square roots. |
| 🥗 **Botany & Culinary Arts** | [[radicle]], [[radish]], [[radicchio]] | Seed germination tests, taproot anatomy, Venetian winter chicory farming. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[eradicable]] | adjective | **1.** Able to be eradicated or rooted out. | *"In academic literature, eradicable designates able to be eradicated or rooted out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eradicate]] | verb | **1.** Kill in large numbers.<br>**2.** Destroy completely, as if down to the roots. | *"Prejudices, it is well known, are most difficult to eradicate from the heart whose soil has never been loosened or fertilised by education: they grow there, firm as weeds among stones."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[eradication]] | noun | **1.** The complete destruction of every trace of something. | *"Stoic._ 11, 1037 D. [129] "Unconditional eradication," says Zeller, _Eclectics_, p. 226."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[eradicator]] | noun | **1.** Someone who exterminates (especially someone whose occupation is the extermination of troublesome rodents and insects). | *"In academic literature, eradicator designates someone who exterminates (especially someone whose occupation is the extermination of troublesome rodents and insects)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ineradicable]] | adjective | **1.** Not able to be destroyed or rooted out. | *"Had she known Boldwood’s moods, her blame would have been fearful, and the stain upon her heart ineradicable."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[irradicable]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin radic within the domain of Botany, Minerals & Elements.<br>**2.** A technical or specialized form exhibiting the properties of radic in systematic terminology. | *"In academic literature, irradicable designates pertaining to, derived from, or characteristic of latin radic within the domain of botany, minerals & elements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radical]] | noun | **1.** (chemistry) two or more atoms bound together as a single unit and forming part of a molecule.<br>**2.** An atom or group of atoms with at least one unpaired electron; in the body it is usually an oxygen molecule that has lost an electron and will stabilize itself by stealing an electron from a nearby molecule. | *"It is the Radical of Nature to him."* — Charles Dickens, *Bleak House* |
| [[radicalism]] | noun | **1.** The political orientation of those who favor revolutionary change in government and society. | *"Shelley's Radicalism was not of this drab hue."* — Sydney Waterlow, *Shelley* |
| [[radicalize]] | verb | **1.** Make more radical in social or political outlook. | *"In academic literature, radicalize designates make more radical in social or political outlook."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radically]] | adverb | **1.** In a radical manner. | *"A large share, possibly, in a certain sense, every one of the economic problems that are discussed involve change, limitation, definition, or, more radically, abolition of present laws of property."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[radicchio]] | noun | **1.** Prized variety of chicory having globose heads of red leaves. | *"In academic literature, radicchio designates prized variety of chicory having globose heads of red leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radicle]] | noun | **1.** (anatomy) a small structure resembling a rootlet (such as a fibril of a nerve). | *"In academic literature, radicle designates (anatomy) a small structure resembling a rootlet (such as a fibril of a nerve)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiculitis]] | noun | **1.** Inflammation of the radicle of a nerve. | *"In academic literature, radiculitis designates inflammation of the radicle of a nerve."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Botany, Minerals & Elements]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · RADIC
  </div>
</div>
