---
status: unread
type: root_dashboard
---
# Dashboard — nerv
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">nerv-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“sinew or nerve”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The natural organs, tissues, and inner workings of the human body.</span>
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

The root **nerv** means sinew or nerve. It refers to sinew, tendon, physical vigor, neurological conduit, fortitude or anxiety. In English, this root forms words such as *nerve*, *nervous*, *nervousness*, and *nervine*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: sinew or nerve
> The root **nerv** means sinew or nerve. It refers to sinew, tendon, physical vigor, neurological conduit, fortitude or anxiety. In English, this root forms words such as *nerve*, *nervous*, *nervousness*, and *nervine*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Sinew or nerve</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The natural organs, tissues, and inner workings of the human body.</mark>
> - **Everyday Connection**: Think of familiar words like *nerve* and *nervous*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **nerv** comes from a Latin word that means *"sinew or nerve"*.
  - At its core, it describes sinew or nerve.

- **The Big Picture Idea**:
  - Picture the natural organs, tissues, and inner workings of the human body.
  - Whenever you see **nerv** in an English word, think of **bodily anatomy and health**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of sinew or nerve.
  - **Mental & Social**: How people experience, organize, or communicate about sinew or nerve.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Nerve**: Any of the whitish cordlike bundles of myelinated or unmyelinated fibers transmitting sensory and motor impulses between the central nervous system and body parts.
  - **Nervous**: Easily agitated, excitable, apprehensive, or fearful.
  - **Nervousness**: The state, quality, or subjective feeling of being agitated, anxious, or apprehensive.
  - **Nervine**: A medicinal remedy, herbal extract, or therapeutic agent that soothes, calms, or tonifies the nervous system.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">nerv</mark>, think of <mark class="hl-def">bodily anatomy and health</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **nerv** combines classical prefixes and functional suffixes across several domains:
> 
> ### 1. Primary Base Formations
> - *nervus* → [[nerve]] (noun & verb).
> - *nervus* + *-ōsus* → [[nervous]] (adjective), `nervously` (adverb), [[nervousness]] (noun).
> - *nervus* + *-y* → `nervy` (adjective, bold/anxious).
> - *nervus* + *-īna* → [[nervine]] (noun & adjective, nerve tonic).
> - *nervus* + *-itās* → [[nervosity]] (noun, nervous excitability).
> - *nervus* + *-ūra* → [[nervure]] (noun, wing vein/leaf rib), `nervate` (adjective).
> 
> ### 2. Prefix Directional Compounds
> - **`in-` (into, upon):**
>   - *in-* + *nervus* + *-āre* → [[innervate]] (verb: to supply with nerves), [[innervation]] (noun).
> - **`ex-` / `e-` (out of, away from):**
>   - *ex-* + *nervus* + *-āre* → Latin *ēnervāre* → [[enervate]] (verb: to drain of strength/vitality), [[enervation]] (noun).
> - **`de-` (removal):**
>   - *de-* + *nervus* + *-āre* → `denervate` (verb: to sever nerve supply), `denervation` (noun).
> - **Native Germanic Prefix `un-`:**
>   - *un-* + *nerve* → [[unnerve]] (verb: to deprive of composure), `unnerving` (adjective), `unnervingly` (adverb).

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
> Although the root fundamentally denotes **"fibrous cord and nerve conduit"**, its semantic register spans polar conceptual opposites:
> - **Electrophysiology & Neurobiology:** In [[nerve]], [[innervate]], and `denervate`, it describes the sensory and motor axonal pathways connecting the brain and spinal cord to muscles and sensory receptors.
> - **Psychological Fortitude & Resilience:** In [[nerve]] ("to keep one's nerve") and `nervy`, it signifies steel-like courage, unflinching resolution under extreme duress, or brassy insolence.
> - **Autonomic Anxiety & Stress:** In [[nervous]], `nervously`, [[nervousness]], and [[nervosity]], it captures sympathetic nervous system hyperarousal, trembling, butterflies in the stomach, and apprehension.
> - **Debilitation & Exhaustion:** In [[enervate]] and [[enervation]], it describes the insidious draining of physical stamina, intellectual vigor, or moral resolve (often by oppressive heat, illness, or luxury).
> - **Cognitive Discomposure:** In [[unnerve]] and `unnerving`, it describes psychological destabilization caused by shocking or eerie developments.
> - **Morphology & Entomology:** In [[nervure]], it characterizes the stiffening structural venation of dragonfly or cicada wings.

---

## 🔀 4. Prefix & Combining Dynamics on nerv

| Prefix | Classical Latin Etymon | Derived English Word | Literal Etymological Meaning | Modern Conceptual Shift |
| :--- | :--- | :--- | :--- | :--- |
| `in-` (into) | *innervāre* | [[innervate]] / [[innervation]] | "to put nerves/sinews into" | To supply nerve fibers to a target muscle or organ. |
| `ex-` / `e-` (out of) | *ēnervāre* | [[enervate]] / [[enervation]] | "to pull the sinews out of" | To completely drain of vitality, energy, or stamina. |
| `de-` (away) | *dēnervāre* | `denervate` / `denervation` | "to strip away the nerve supply" | Pathological or surgical disconnection of nerve fibers. |
| `un-` (reversal) | Eng. *un-* + *nerve* | [[unnerve]] / `unnerving` | "to strip of courage/nerve" | To throw into confusion; dismantle emotional composure. |
| `-ine` | Lat. *-īna* (medicinal) | [[nervine]] | "pertaining to the nerve" | A calming medicinal agent acting upon nervous tension. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚡ **Neurology & Electrophysiology** | [[nerve]], [[innervate]], `denervation` | Vagus nerve stimulation, motor unit innervation ratio, electromyographic denervation potentials |
| 🧠 **Clinical Psychology & Psychiatry** | [[nervous]], [[nervousness]], [[unnerve]] | Generalized anxiety disorder, sympathetic nervous arousal, performance anxiety in stagecraft |
| 🌿 **Pharmacognosy & Herbal Medicine** | [[nervine]] | Botanical nervines (valerian root, chamomile, passionflower) for mild insomnia and nervous exhaustion |
| 🪶 **Entomology & Botany** | [[nervure]], `nervate` | Insect flight mechanics, aerodynamic wing venation, parallel vs. reticulate leaf venation |
| 📜 **Literary Criticism & Rhetoric** | [[enervate]], [[enervation]], [[nerve]] | Critiques of enervating, decadent literature; Cicero’s "sinews of the state" political metaphors |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[enervate]] | verb | **1.** Weaken mentally or morally.<br>**2.** Disturb the composure of. | *"An artful cabal in that council would be able to distract and to enervate the whole system of administration."* — Alexander Hamilton, *The Federalist Papers* |
| [[enervated]] | verb | **1.** Weaken mentally or morally.<br>**2.** Disturb the composure of. | *"It has enervated their strength, multiplied their diseases, and superinduced upon their original barbarity the low vices of artificial life."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[enervating]] | verb | **1.** Weaken mentally or morally.<br>**2.** Disturb the composure of. | *"The air of the place, so fresh in the spring and early summer, was stagnant and enervating now."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[enervation]] | noun | **1.** Lack of vitality.<br>**2.** Serious weakening and loss of energy. | *"In academic literature, enervation designates lack of vitality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[innervate]] | verb | **1.** Supply nerves to (some organ or body part).<br>**2.** Stimulate to action. | *"In academic literature, innervate designates supply nerves to (some organ or body part)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[innervation]] | noun | **1.** The neural or electrical arousal of an organ or muscle or gland.<br>**2.** The distribution of nerve fibers to an organ or body region. | *"In academic literature, innervation designates the neural or electrical arousal of an organ or muscle or gland."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nerva]] | noun | **1.** Emperor of rome who introduced a degree of freedom after the repressive reign of domitian; adopted trajan as his successor (30-98). | *"In academic literature, nerva designates emperor of rome who introduced a degree of freedom after the repressive reign of domitian; adopted trajan as his successor (30-98)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nerve]] | noun | **1.** Any bundle of nerve fibers running to various organs and tissues of the body.<br>**2.** The courage to carry on. | *"My fate cries out, And makes each petty artery in this body As hardy as the Nemean lion’s nerve. [_Ghost beckons._] Still am I call’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nerve-racking]] | adjective | **1.** Extremely irritating to the nerves. | *"In academic literature, nerve-racking designates extremely irritating to the nerves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nerve-wracking]] | adjective | **1.** Extremely irritating to the nerves. | *"In academic literature, nerve-wracking designates extremely irritating to the nerves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nerveless]] | adjective | **1.** Marked by calm self-control (especially in trying circumstances); unemotional.<br>**2.** Lacking strength; - nathaniel hawthorne. | *"As soon as the nerveless pause of her surprise would allow her to stir, her impulse was to pass on out of his sight."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[nervelessly]] | adverb | **1.** In a composed and unconcerned manner. | *"In academic literature, nervelessly designates in a composed and unconcerned manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nervelessness]] | noun | **1.** Fearless self-possession in the face of danger. | *"In academic literature, nervelessness designates fearless self-possession in the face of danger."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nerveroot]] | noun | **1.** Once common rose pink woodland orchid of eastern north america. | *"In academic literature, nerveroot designates once common rose pink woodland orchid of eastern north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nerves]] | noun | **1.** An uneasy psychological state.<br>**2.** Control of your emotions. | *"Though grey Do something mingle with our younger brown, yet ha’ we A brain that nourishes our nerves and can Get goal for goal of youth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nervi]] | noun | **1.** Italian architect who pioneered in the use of reinforced concrete (1891-1979). | *"In academic literature, nervi designates italian architect who pioneered in the use of reinforced concrete (1891-1979)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nervily]] | adverb | **1.** In a brash cheeky manner. | *"In academic literature, nervily designates in a brash cheeky manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nervine]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin nerv within the domain of Anatomy & Clinical Medicine.<br>**2.** A technical or specialized form exhibiting the properties of nerv in systematic terminology. | *"In academic literature, nervine designates pertaining to, derived from, or characteristic of latin nerv within the domain of anatomy & clinical medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nervosity]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin nerv within the domain of Anatomy & Clinical Medicine.<br>**2.** A technical or specialized form exhibiting the properties of nerv in systematic terminology. | *"In academic literature, nervosity designates pertaining to, derived from, or characteristic of latin nerv within the domain of anatomy & clinical medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nervous]] | adjective | **1.** Easily agitated.<br>**2.** Causing or fraught with or showing anxiety. | *"By that time we were so anxious and nervous that even Richard confessed, as we rattled over the stones of the old street, to feeling an irrational desire to drive back again."* — Charles Dickens, *Bleak House* |
| [[nervously]] | adverb | **1.** In an anxiously nervous manner.<br>**2.** With nervous excitement. | *"Guppy sat down at the table and began nervously sharpening the carving-knife on the carving-fork, still looking at me (as I felt quite sure without looking at him) in the same unusual manner."* — Charles Dickens, *Bleak House* |
| [[nervousness]] | noun | **1.** The anxious feeling you have when you have the jitters.<br>**2.** An uneasy psychological state. | *"The women threw off their nervousness, and titters and giggling became more frequent."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[nervure]] | noun | **1.** Any of the vascular bundles or ribs that form the branching framework of conducting and supporting tissues in a leaf or other plant organ.<br>**2.** One of the horny ribs that stiffen and support the wing of an insect. | *"In academic literature, nervure designates any of the vascular bundles or ribs that form the branching framework of conducting and supporting tissues in a leaf or other plant organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nervus]] | noun | **1.** Any bundle of nerve fibers running to various organs and tissues of the body. | *"In academic literature, nervus designates any bundle of nerve fibers running to various organs and tissues of the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nervy]] | adjective | **1.** Being in a tense state.<br>**2.** Showing or requiring courage and contempt of danger. | *"Val's one of your nervy men." "Not after he was ten years old," said Laura smiling."* — Anthony Pryde, *Nightfall* |
| [[unnerve]] | verb | **1.** Disturb the composure of. | *"As he did it he avoided glancing at the sleeper, but not lest pity should unnerve him; merely to avoid spilling."* — J. M. Barrie, *Peter Pan* |
| [[unnerved]] | verb | **1.** Disturb the composure of.<br>**2.** Deprived of courage and strength. | *"Unequal match’d, Pyrrhus at Priam drives, in rage strikes wide; But with the whiff and wind of his fell sword Th’unnerved father falls."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unnerving]] | verb | **1.** Disturb the composure of.<br>**2.** Inspiring fear; ; - g.h.johnston. | *"At the start it was a kind of bellow, then it toned down to a succession of hog-like grunts, and at last, with a startling and unnerving suddenness, it flattened to a sharp, explosive hiss."* — F. H. Costello, *Sure-dart* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Anatomy & Clinical Medicine]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · NERV
  </div>
</div>
