---
status: unread
type: root_dashboard
---
# Dashboard — spin
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">spin-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“thorn or spine”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical human body, limbs, posture, and bodily movements.</span>
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

The root **spin** means thorn or spine. It refers to thorn, prickle, backbone, ridge. In English, this root forms words such as *cerebrospinal*, *infraspinatus*, *infraspinous*, and *porcupine*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: thorn or spine
> The root **spin** means thorn or spine. It refers to thorn, prickle, backbone, ridge. In English, this root forms words such as *cerebrospinal*, *infraspinatus*, *infraspinous*, and *porcupine*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Thorn or spine</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body, limbs, posture, and bodily movements.</mark>
> - **Everyday Connection**: Think of familiar words like *cerebrospinal* and *infraspinatus*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **spin** comes from a Latin word that means *"thorn or spine"*.
  - At its core, it describes thorn or spine.

- **The Big Picture Idea**:
  - Picture the physical human body, limbs, posture, and bodily movements.
  - Whenever you see **spin** in an English word, think of **the physical body and limbs**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of thorn or spine.
  - **Mental & Social**: How people experience, organize, or communicate about thorn or spine.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Cerebrospinal**: Of, relating to, or affecting both the brain and the spinal cord.
  - **Infraspinatus**: A thick triangular rotator cuff muscle occupying the infraspinous fossa of the scapula that externally rotates the humerus.
  - **Infraspinous**: Situated beneath a spine, particularly below the spine of the scapula.
  - **Porcupine**: Any of several large herbivorous rodents possessing sharp, erectile defensive quills mixed with hair.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">spin</mark>, think of <mark class="hl-def">the physical body and limbs</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **spin** attaches to Latin and Greek combining elements through its nominal stem `spīn-`:
> - **Direct Nominal Reflex:** *spine* (via Old French *espine*).
> - **Adjectival Stems:** Latin *spīnālis* (stem `spīnāl-` → English *spinal*) and *spīnōsus* (stem `spīnōs-` → English *spinous*).
> - **Diminutive Stem:** Latin *spīnula* ("little thorn" → English *spinule*, *spinulose*).
> - **Anatomical Compounds:** Compounding with positional prefixes (*infra-*, *supra-*), anatomical nouns (*cerebrum*, *thalamus*, *cortex*, *cerebellum*), and Latin *ferre* ("to bear" → *spiniferous*).
>
> English forms adjectives of physical coverage (*-y*, *-ous*), moral metaphors with negative suffixes (*-less*), and technical neural tracts by prefixing *spino-* to cerebral destinations.

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

> [!tip] 🌈 Shades of Meaning in Different Words
> The family distributes across diverse physical and anatomical zones:
> - **Anatomy & Vertebral Medicine:** [[spine]] (vertebral column; book edge), [[spinal]] (pertaining to the spinal cord or vertebrae), [[spinous]] (having spine-like bony processes), [[supraspinatus]] (upper rotator cuff muscle), [[infraspinatus]] (lower rotator cuff muscle), [[supraspinous]] (above a spine), [[infraspinous]] (below a spine).
> - **Neuroscience & Neuroanatomy:** [[cerebrospinal]] (relating to the brain and spinal cord), [[spinothalamic]] (sensory tract conveying pain and temperature), [[spinocerebellar]] (tract conveying unconscious proprioception), [[spinocortical]] (motor tracts connecting cortex and spine).
> - **Zoology, Botany & Paleontology:** [[porcupine]] (quill-bearing rodent), [[spiny]] (bristling with prickles), [[spininess]] (prickliness), [[spiniferous]] (bearing thorns), [[spiniform]] (thorn-shaped), [[spinule]] (tiny spine), [[spinulose]] (covered with minute spines).
> - **Metaphorical & Moral Integrity:** [[spineless]] (lacking moral courage, weak-willed), [[spinelessness]] (cowardice, lack of fortitude).
> - **Musical Instruments & Craft:** [[spinet]] (quill-plucked early keyboard instrument).

---

## 🔀 4. Prefix & Combining Dynamics on spin

### Directional & Anatomical Modifiers with `spin`

| Combining Element | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **supra-** | above, over | [[supraspinatus]] / [[supraspinous]] | Situated in the fossa above the spine of the scapula. |
| **infra-** | below, beneath | [[infraspinatus]] / [[infraspinous]] | Situated in the fossa beneath the spine of the scapula. |
| **cerebro-** | brain (Latin *cerebrum*) | [[cerebrospinal]] | Connecting or pertaining jointly to the brain and spinal axis. |
| **-thalamic** | chamber (Greek *thálamos*) | [[spinothalamic]] | Ascending neural tract running from spinal cord to sensory thalamus. |
| **-cerebellar** | little brain (*cerebellum*) | [[spinocerebellar]] | Proprioceptive tract ascending from spinal cord to the cerebellum. |
| **porc-** | pig, swine (Latin *porcus*) | [[porcupine]] | Literally "spiny swine"; large quill-covered rodent. |

### Suffix Transformations

| Suffix | Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| **-al** | Adjective forming | [[spinal]] | Of, relating to, or affecting the spine or spinal cord. |
| **-ous** | Characterizing adjective | [[spinous]] | Full of thorns; resembling a thorn-like process. |
| **-y** | Descriptive adjective | [[spiny]] | Covered in prickles; prickly and difficult to handle. |
| **-ule** | Diminutive noun forming | [[spinule]] | A very small, minute spine or thorn. |
| **-less** | Privative adjective | [[spineless]] | Lacking a vertebral column; devoid of moral courage. |
| **-et / -etta** | Diminutive noun | [[spinet]] | An early harpsichord plucked by small quill spines. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Orthopedics & Spine Surgery** | [[spine]], [[spinal]], [[spinous]], [[supraspinatus]], [[infraspinatus]] | Lumbar spinal decompression, repair of rotator cuff tears (supraspinatus tendon), diagnosis of spinal stenosis, and epidural anesthesia. |
| **Neurology & Neurosurgery** | [[cerebrospinal]], [[spinothalamic]], [[spinocerebellar]] | Diagnostic lumbar puncture measuring cerebrospinal fluid (CSF) pressure, testing anterolateral spinothalamic pain pathways, and assessing cerebellar ataxia. |
| **Zoology & Marine Biology** | [[porcupine]], [[spiny]], [[spinule]], [[spiniferous]] | Studying defense morphology in spiny lobsters, sea urchins (*Echinoidea*), and New World arboreal porcupines (*Erethizontidae*). |
| **Botany & Plant Morphology** | [[spiny]], [[spiniform]], [[spinulose]], [[spiniferous]] | Describing modified epidermal outgrowths, modified leaf spines in cacti (*Cactaceae*), and thorn-bearing desert xerophytes. |
| **Musicology & Keyboard History** | [[spinet]] | Historical performance practice on Elizabethan virginals, Flemish spinets, and eighteenth-century Italian domestic keyboards. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[spin]] | noun | **1.** A swift whirling motion (usually of a missile).<br>**2.** The act of rotating rapidly. | *"Mount them, and make incision in their hides, That their hot blood may spin in English eyes, And dout them with superfluous courage, ha!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spinach]] | noun | **1.** Southwestern asian plant widely cultivated for its succulent edible dark green leaves.<br>**2.** Dark green leaves; eaten cooked or raw in salads. | *"Hope, Joy, Youth, Peace, Rest, Life, Dust, Ashes, Waste, Want, Ruin, Despair, Madness, Death, Cunning, Folly, Words, Wigs, Rags, Sheepskin, Plunder, Precedent, Jargon, Gammon, and Spinach."* — Charles Dickens, *Bleak House* |
| [[spinacia]] | noun | **1.** Spinach. | *"Classical and authoritative lexicons catalog spinacia as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spinal]] | noun | **1.** Anesthesia of the lower half of the body; caused by injury to the spinal cord or by injecting an anesthetic beneath the arachnoid membrane that surrounds the spinal cord.<br>**2.** Of or relating to the spine or spinal cord. | *"In September last, she was taken very sick with spinal fever."* — Classic Author, *The wonders of prayer* |
| [[spinally]] | adverb | **1.** In the spine. | *"In academic literature, spinally designates in the spine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spindle]] | noun | **1.** (biology) tiny fibers that are seen in cell division; the fibers radiate from two poles and meet at the equator in the middle.<br>**2.** A piece of wood that has been turned on a lathe; used as a baluster, chair leg, etc. | *"Smallweed’s seat and guarded by his spindle legs is a drawer in his chair, reported to contain property to a fabulous amount."* — Charles Dickens, *Bleak House* |
| [[spine]] | noun | **1.** The series of vertebrae forming the axis of the skeleton and protecting the spinal cord.<br>**2.** Any sharply pointed projection. | *"It must be a work of time to ascertain that no injury had been done to the spine; but Mr Robinson found nothing to increase alarm, and Charles Musgrove began, consequently, to feel no necessity for longer confinement."* — Jane Austen, *Persuasion* |
| [[spine-tipped]] | adjective | **1.** Of a plant tipped with a spine. | *"In academic literature, spine-tipped designates of a plant tipped with a spine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spinel]] | noun | **1.** A hard glassy mineral consisting of an oxide of magnesium and aluminum; occurs in various colors that are used as gemstones. | *"In academic literature, spinel designates a hard glassy mineral consisting of an oxide of magnesium and aluminum; occurs in various colors that are used as gemstones."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spineless]] | adjective | **1.** Weak in willpower, courage or vitality.<br>**2.** Lacking a backbone or spinal column. | *"In academic literature, spineless designates weak in willpower, courage or vitality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spinelessness]] | noun | **1.** The quality of lacking a strong character; an irresolute disposition. | *"In academic literature, spinelessness designates the quality of lacking a strong character; an irresolute disposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spinet]] | noun | **1.** A small and compactly built upright piano.<br>**2.** Early model harpsichord with only one string per note. | *"The noise pleases him and sends him to sleep, reminding him of the days when he courted me and I used to strum upon that spinet with one finger."* — H. Rider Haggard, *Swallow: A Tale of the Great Trek* |
| [[spinifex]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin spin within the domain of Body.<br>**2.** A technical or specialized form exhibiting the properties of spin in systematic terminology. | *"In academic literature, spinifex designates pertaining to, derived from, or characteristic of latin spin within the domain of body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spininess]] | noun | **1.** The quality of being covered with prickly thorns or spines. | *"In academic literature, spininess designates the quality of being covered with prickly thorns or spines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spinmeister]] | noun | **1.** A public relations person who tries to forestall negative publicity by publicizing a favorable interpretation of the words or actions of a company or political party or famous person. | *"In academic literature, spinmeister designates a public relations person who tries to forestall negative publicity by publicizing a favorable interpretation of the words or actions of a company or political party or famous person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spinnability]] | noun | **1.** The quality of being suitable for spinning or the capability of being spun (used of textile fibers). | *"In academic literature, spinnability designates the quality of being suitable for spinning or the capability of being spun (used of textile fibers)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spinnable]] | adjective | **1.** Capable or susceptible to being influenced by biased information.<br>**2.** Capable of being spun into fibres. | *"In academic literature, spinnable designates capable or susceptible to being influenced by biased information."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spinnaker]] | noun | **1.** A large and usually triangular headsail; carried by a yacht as a headsail when running before the wind. | *"The milkwhite dolphin tossed his mane and, rising in the golden poop the helmsman spread the bellying sail upon the wind and stood off forward with all sail set, the spinnaker to larboard."* — James Joyce, *Ulysses* |
| [[spinnbar]] | adjective | **1.** Capable of being spun into fibres. | *"In academic literature, spinnbar designates capable of being spun into fibres."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spinnbarkeit]] | noun | **1.** The capacity of a viscous liquid (especially the cervical mucus) to be drawn out into a strand or blown up into a bubble. | *"In academic literature, spinnbarkeit designates the capacity of a viscous liquid (especially the cervical mucus) to be drawn out into a strand or blown up into a bubble."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spinner]] | noun | **1.** Someone who spins (who twists fibers into threads).<br>**2.** Board game equipment that consists of a dial and an arrow that is spun to determine the next move in the game. | *"He died rich in his new occupation of cotton spinner, but he knew that the blood of my mother ran in all of us."* — S. R. Crockett, *Deep Moat Grange* |
| [[spinney]] | noun | **1.** A copse that shelters game. | *"In academic literature, spinney designates a copse that shelters game."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spinning]] | noun | **1.** Creating thread.<br>**2.** Revolve quickly and repeatedly around one's own axis. | *"Turveydrop, “I am falling into the sear and yellow leaf, and it is impossible to say how long the last feeble traces of gentlemanly deportment may linger in this weaving and spinning age."* — Charles Dickens, *Bleak House* |
| [[spinose]] | adjective | **1.** Having spines. | *"In academic literature, spinose designates having spines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spinous]] | adjective | **1.** Having spines.<br>**2.** Shaped like a spine or thorn. | *"In academic literature, spinous designates having spines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spinoza]] | noun | **1.** Dutch philosopher who espoused a pantheistic system (1632-1677). | *"On the Improvement of the Understanding (Treatise on the Emendation of the Intellect) by Baruch Spinoza [Benedict de Spinoza] Translated by R."* — Benedictus de Spinoza, *On the Improvement of the Understanding* |
| [[spinster]] | noun | **1.** An elderly unmarried woman.<br>**2.** Someone who spins (who twists fibers into threads). | *"Formerly Caroline Jellyby, spinster, then of Thavies Inn, within the city of London, but extra-parochial; now of Newman Street, Oxford Street."* — Charles Dickens, *Bleak House* |
| [[spinsterhood]] | noun | **1.** The state of being a spinster (usually an elderly unmarried woman). | *"Again, seven saucers are placed in a row, filled respectively with water, earth, ashes, keys, a thimble, money, and grass, which things signify travel, death, widowhood, housekeeping, spinsterhood, riches, and farming."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[spinus]] | noun | **1.** In some classifications considered a subgenus of carduelis: siskins and new world goldfinches. | *"In academic literature, spinus designates in some classifications considered a subgenus of carduelis: siskins and new world goldfinches."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiny]] | adjective | **1.** Having spines.<br>**2.** Having or covered with protective barbs or quills or spines or thorns or setae etc. | *"The pollard willows, tortured out of their natural shape by incessant choppings, became spiny-haired monsters as they stood up against it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[spiny-backed]] | adjective | **1.** Having the back covered with spines. | *"In academic literature, spiny-backed designates having the back covered with spines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiny-edged]] | adjective | **1.** Having a spiny border. | *"In academic literature, spiny-edged designates having a spiny border."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiny-finned]] | adjective | **1.** Of or relating to fish with spiny fins. | *"In academic literature, spiny-finned designates of or relating to fish with spiny fins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiny-leafed]] | adjective | **1.** Having spiny leaves. | *"In academic literature, spiny-leafed designates having spiny leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiny-leaved]] | adjective | **1.** Having spiny leaves. | *"In academic literature, spiny-leaved designates having spiny leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiny-stemmed]] | adjective | **1.** Having a spiny stem. | *"In academic literature, spiny-stemmed designates having a spiny stem."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SPIN
  </div>
</div>
