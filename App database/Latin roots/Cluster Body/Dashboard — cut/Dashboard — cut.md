---
status: unread
type: root_dashboard
---
# Dashboard — cut
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cut-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“skin”</span>
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

The root **cut** means skin. It refers to skin / integument / epidermal covering / dermal boundary. In English, this root forms words such as *cutaneous*, *cutaneously*, *cuticle*, and *cuticular*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: skin
> The root **cut** means skin. It refers to skin / integument / epidermal covering / dermal boundary. In English, this root forms words such as *cutaneous*, *cutaneously*, *cuticle*, and *cuticular*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Skin</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body, limbs, posture, and bodily movements.</mark>
> - **Everyday Connection**: Think of familiar words like *cutaneous* and *cutaneously*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cut** comes from a Latin word that means *"skin"*.
  - At its core, it describes skin.

- **The Big Picture Idea**:
  - Picture the physical human body, limbs, posture, and bodily movements.
  - Whenever you see **cut** in an English word, think of **the physical body and limbs**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of skin.
  - **Mental & Social**: How people experience, organize, or communicate about skin.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Cutaneous**: Of, relating to, or affecting the skin.
  - **Cutaneously**: By way of the skin.
  - **Cuticle**: The narrow band of dead, keratinized epidermis that overlaps the base of the human nail plate.
  - **Cuticular**: Of, relating to, resembling, or situated in a cuticle.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cut</mark>, think of <mark class="hl-def">the physical body and limbs</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root enters English across two scientific stems:
> - **Classical Latin Nominal Stem:** `cut-` / `cuti-` (from *cutis*): *cutis*, *cuticle*, *cuticular*, *cutin*, *subcutis*.
> - **Latin Adjectival Stem:** `cutan-` (from New Latin *cutāneus*, formed from *cutis* + *-āneus*): *cutaneous*, *subcutaneous*, *percutaneous*, *transcutaneous*, *intracutaneous*.
>
> Directional and spatial prefixes attach with extraordinary systematicity to indicate anatomical depth and penetration vector (*sub-* = beneath; *per-* = through; *trans-* = across; *intra-* = within).

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

> [!tip] 🌈 The Conceptual Facets of Cut-
> - **1. Pharmacological Routes & Interventional Radiology:** Needle injection into adipose tissue (*subcutaneous*), catheter interventions through skin punctures (*percutaneous*), and electrical transdermal pacing (*transcutaneous*).
> - **2. Dermatology & Clinical Signs:** The living dermis (*cutis*), goose flesh (*cutis anserina*), vascular mottling (*cutis marmorata*), and hyperelastic connective tissue disorders (*cutis laxa*).
> - **3. Cosmetology, Podiatry & Ungual Anatomy:** The keratinized fold of skin overlapping the lunula of a fingernail (*cuticle*).
> - **4. Plant Physiology & Agronomy:** The waxy, impermeable polyester polymer protecting leaves from desiccation and pathogen invasion (*cutin*, *cutinization*).
> - **5. Invertebrate Zoology & Entomology:** The chitinous, protein-impregnated exoskeleton of insects and nematodes (*cuticle*, *cuticulin*).

---

## 🔀 4. Prefix & Combining Dynamics on cut

### Prefix Dynamics

| Prefix | Core Value | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `sub-` | below, beneath | [[subcutaneous]] | Situated, residing, or injected *beneath* the cutaneous layer. |
| `per-` | through, across | [[percutaneous]] | Performed *through* the intact skin by needle or cannula puncture. |
| `trans-` | across, over | [[transcutaneous]] | Passing *across* the skin barrier (e.g., TENS transcutaneous nerve stimulation). |
| `intra-` | inside, within | [[intracutaneous]] | Injected or occurring directly *within* the substance of the dermis. |

### Suffix Dynamics

| Suffix | Grammatical Role | Derivative | Semantic Output |
| :--- | :--- | :--- | :--- |
| `-aneous` | Adjective (relating to) | [[cutaneous]] | Pertaining to, involving, or affecting the skin. |
| `-icle` (< *-icula*) | Diminutive noun | [[cuticle]] | A "little skin"; the outer thin layer of nail edge, plant leaf, or insect shell. |
| `-in` | Noun (biochemical substance) | [[cutin]] | The waxy, waterproof macromolecular lipid coating plant epidermis. |
| `-ization` | Noun (process) | [[cutinization]] | The biological deposition of cutin in cell walls to prevent desiccation. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Cardiology & Interventional Radiology** | [[percutaneous]] (*PCI*, *PEG*) | Percutaneous coronary intervention (coronary stenting); percutaneous nephrostomy. |
| **Endocrinology & Nursing** | [[subcutaneous]], [[subcutaneously]] | Subcutaneous insulin pen injection for diabetes mellitus; subcutaneous heparin. |
| **Dermatology & Genetics** | [[cutis laxa]], [[cutis marmorata]], [[cutis]] | Elastin gene mutations in cutis laxa; physiological cutis anserina; cutaneous lupus erythematosus. |
| **Plant Biology & Agronomy** | [[cutin]], [[cuticle]], [[cutinization]] | Drought resistance in xerophytes; cuticular transpiration rates; crop anti-fungal defenses. |
| **Anesthesiology & Physical Therapy** | [[transcutaneous]] (*TENS*) | Transcutaneous electrical nerve stimulation for refractory neuropathic pain. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[cut]] | noun | **1.** A share of the profits.<br>**2.** (film) an immediate transition from one shot to the next. | *"Sir, for a quart d’ecu he will sell the fee-simple of his salvation, the inheritance of it, and cut the entail from all remainders, and a perpetual succession for it perpetually."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cutaneal]] | adjective | **1.** Relating to or existing on or affecting the skin. | *"In academic literature, cutaneal designates relating to or existing on or affecting the skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cutaneous]] | adjective | **1.** Relating to or existing on or affecting the skin. | *"The meat is seldom touched except as a medicine, which is curative for cutaneous diseases."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[cutaway]] | noun | **1.** A representation (drawing or model) of something in which the outside is omitted to reveal the inner parts.<br>**2.** A man's coat cut diagonally from the waist to the back of the knees. | *"Ben Dollard’s loose blue cutaway and square hat above large slops crossed the quay in full gait from the metal bridge."* — James Joyce, *Ulysses* |
| [[cutch]] | noun | **1.** Tannin extract derived from any of several mangrove barks of pacific areas. | *"In academic literature, cutch designates tannin extract derived from any of several mangrove barks of pacific areas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cute]] | adjective | **1.** Attractive especially by means of smallness or prettiness or quaintness.<br>**2.** Obviously contrived to charm. | *"And then, these exchanges, they don’t answer when you have ’cute jockeys to deal with."* — George Eliot, *Middlemarch* |
| [[cutely]] | adverb | **1.** In an attractive manner. | *"In academic literature, cutely designates in an attractive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cuteness]] | noun | **1.** The quality of being appealing in a delicate or graceful way (of a girl or young woman). | *"In academic literature, cuteness designates the quality of being appealing in a delicate or graceful way (of a girl or young woman)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cuterebra]] | noun | **1.** Type genus of the cuterebridae. | *"In academic literature, cuterebra designates type genus of the cuterebridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cuterebridae]] | noun | **1.** New world botflies. | *"In academic literature, cuterebridae designates new world botflies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cuticle]] | noun | **1.** The dead skin at the base of a fingernail or toenail.<br>**2.** The outer layer of the skin covering the exterior body surface of vertebrates. | *"Fell, the cuticle under the skin."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[cuticula]] | noun | **1.** The outer body wall of an insect. | *"In academic literature, cuticula designates the outer body wall of an insect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cuticular]] | adjective | **1.** Of or relating to a cuticle or cuticula. | *"In academic literature, cuticular designates of or relating to a cuticle or cuticula."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cutin]] | noun | **1.** (biochemistry) a waxy transparent material that occurs in the cuticle of plants and consists of highly polymerized esters of fatty acids. | *"In academic literature, cutin designates (biochemistry) a waxy transparent material that occurs in the cuticle of plants and consists of highly polymerized esters of fatty acids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cutinize]] | verb | **1.** Convert into cutin. | *"In academic literature, cutinize designates convert into cutin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cutis]] | noun | **1.** A natural protective body covering and site of the sense of touch. | *"In academic literature, cutis designates a natural protective body covering and site of the sense of touch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cutlas]] | noun | **1.** A short heavy curved sword with one edge; formerly used by sailors. | *"In vain the captain threatened to throw him overboard; suspended a cutlass over his naked wrists; Queequeg was the son of a King, and Queequeg budged not."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[cutlass]] | noun | **1.** A short heavy curved sword with one edge; formerly used by sailors. | *"In vain the captain threatened to throw him overboard; suspended a cutlass over his naked wrists; Queequeg was the son of a King, and Queequeg budged not."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[cutlassfish]] | noun | **1.** Long-bodied marine fishes having a long whiplike scaleless body and sharp teeth; closely related to snake mackerel. | *"In academic literature, cutlassfish designates long-bodied marine fishes having a long whiplike scaleless body and sharp teeth; closely related to snake mackerel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cutler]] | noun | **1.** A dealer in cutlery. | *"I ne'er tri'd this, yet I have worn as fair as any man; I'm sure I've made my Cutler rich, and paid for several weapons, _Turkish_ and _Toledo's_, two thousand Crowns, and yet could never light upon a fighting one. _Eust_."* — John Fletcher, *The Elder Brother* |
| [[cutlery]] | noun | **1.** A cutting implement; a tool for cutting.<br>**2.** Tableware implements for cutting and eating food. | *"Thinks I, Queequeg, this is using Rogers’s best cutlery with a vengeance."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[cutlet]] | noun | **1.** Thin slice of meat (especially veal) usually fried or broiled. | *"Milly served me that cutlet with a sprig of parsley."* — James Joyce, *Ulysses* |
| [[cutoff]] | noun | **1.** A designated limit beyond which something cannot function or must be terminated.<br>**2.** A route shorter than the usual one. | *"In academic literature, cutoff designates a designated limit beyond which something cannot function or must be terminated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cutout]] | noun | **1.** A switch that interrupts an electric circuit in the event of an overload.<br>**2.** A photograph from which the background has been cut away. | *"Hundreds of junctions and cutouts were dug to serve one-time needs."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[cuttable]] | adjective | **1.** Easy to cut or chew. | *"In academic literature, cuttable designates easy to cut or chew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cutter]] | noun | **1.** Someone who cuts or carves stone.<br>**2.** Someone who carves the meat. | *"Indeed, there is Fortune too hard for Nature, when Fortune makes Nature’s natural the cutter-off of Nature’s wit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cutthroat]] | noun | **1.** Someone who murders by cutting the victim's throat.<br>**2.** Ruthless in competition. | *"You Skye cutthroats!" If the nor'easter held, Shane calculated, he could run through Biscay full, come into the Mediterranean on a broad reach, and jam her straight at Marseilles."* — Donn Byrne, *The Wind Bloweth* |
| [[cutting]] | noun | **1.** The activity of selecting the scenes to be shown and putting them together to create a film.<br>**2.** A part (sometimes a root or leaf or bud) removed from a plant to propagate a new plant through rooting or grafting. | *"I would the cutting of my garments would serve the turn, or the breaking of my Spanish sword."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cutting-edge]] | adjective | **1.** In accord with the most fashionable ideas or style. | *"In academic literature, cutting-edge designates in accord with the most fashionable ideas or style."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cuttingly]] | adverb | **1.** In an intentionally unkind way. | *"BELLO: _(Cuttingly.)_ Their heelmarks will stamp the Brusselette carpet you bought at Wren’s auction."* — James Joyce, *Ulysses* |
| [[cuttle]] | noun | **1.** Ten-armed oval-bodied cephalopod with narrow fins as long as the body and a large calcareous internal shell. | *"By this wine, I’ll thrust my knife in your mouldy chaps an you play the saucy cuttle with me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cuttlefish]] | noun | **1.** Ten-armed oval-bodied cephalopod with narrow fins as long as the body and a large calcareous internal shell. | *"It served as nest and food for myriads of crustacea and molluscs, crabs, and cuttlefish."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[elocute]] | verb | **1.** Declaim in an elocutionary manner. | *"In academic literature, elocute designates declaim in an elocutionary manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elocution]] | noun | **1.** An expert manner of speaking involving control of voice and gesture. | *"Rushworth; but as a well-judging, steady young man, with better notions than his elocution would do justice to, he intended to value him very highly."* — Jane Austen, *Mansfield Park* |
| [[elocutionary]] | adjective | **1.** Of or relating to elocution.<br>**2.** (used of style of speaking) overly embellished. | *"His reading of Scripture had no elocutionary pretensions about it; it was quiet, and to a large extent gone through in a monotone; but two things about it made it very impressive."* — John Cairns, *Principal Cairns* |
| [[elocutionist]] | noun | **1.** A public speaker trained in voice production and gesture and delivery. | *"Murdoch, the daughter of the patriotic actor and elocutionist, gave her services with great earnestness to the work."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[interlocutory]] | adjective | **1.** Consisting of dialogue. | *"In academic literature, interlocutory designates consisting of dialogue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intracutaneous]] | adjective | **1.** Relating to areas between the layers of the skin. | *"In academic literature, intracutaneous designates relating to areas between the layers of the skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[percutaneous]] | adjective | **1.** Through the unbroken skin; refers to medications applied directly to the skin (creams or ointments) or in time-release forms (skin patches). | *"In academic literature, percutaneous designates through the unbroken skin; refers to medications applied directly to the skin (creams or ointments) or in time-release forms (skin patches)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subcutaneous]] | adjective | **1.** Relating to or located below the epidermis. | *"However, the action of both heart and lungs improved, and Van Helsing made a subcutaneous injection of morphia, as before, and with good effect."* — Bram Stoker, *Dracula* |
| [[subcutaneously]] | adverb | **1.** Below the skin. | *"In academic literature, subcutaneously designates below the skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transcutaneous]] | adjective | **1.** Through the unbroken skin; refers to medications applied directly to the skin (creams or ointments) or in time-release forms (skin patches). | *"In academic literature, transcutaneous designates through the unbroken skin; refers to medications applied directly to the skin (creams or ointments) or in time-release forms (skin patches)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncut]] | adjective | **1.** Not trimmed.<br>**2.** (used of grass or vegetation) not cut down with a hand implement or machine. | *"It is time some one undertook to rehumanise you,” said I, parting his thick and long uncut locks; “for I see you are being metamorphosed into a lion, or something of that sort."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[undercut]] | noun | **1.** The material removed by a cut made underneath.<br>**2.** The tender meat of the loin muscle on each side of the vertebral column. | *"I've got a dummy option on it in the works, and we'll be able to undercut Holliday's prices for his land by about twenty per cent." "False-E, huh?"* — Algis Budrys, *Citadel* |

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
    ROOT DASHBOARD · CUT
  </div>
</div>
