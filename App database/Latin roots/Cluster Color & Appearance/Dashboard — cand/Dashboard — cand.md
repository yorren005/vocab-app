---
status: unread
type: root_dashboard
---
# Dashboard — cand
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cand-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to glow or shine white”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A painter mixing vibrant pigments on a palette to color a canvas.</span>
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

The root **cand** means to glow or shine white. It refers to giving off light, being bright or radiant, or standing out clearly. In English, this root forms words such as *candid*, *candor*, *candidate*, and *incandescent*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to glow or shine white
> The root **cand** means to glow or shine white. It refers to giving off light, being bright or radiant, or standing out clearly. In English, this root forms words such as *candid*, *candor*, *candidate*, and *incandescent*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To glow or shine white</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A painter mixing vibrant pigments on a palette to color a canvas.</mark>
> - **Everyday Connection**: Think of familiar words like *candid* and *candor*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cand** comes from a Latin word that means *"to glow or shine white"*.
  - At its core, it describes the action of glow or shine white.

- **The Big Picture Idea**:
  - Picture a painter mixing vibrant pigments on a palette to color a canvas.
  - Whenever you see **cand** in an English word, think of **to glow or shine white**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to glow or shine white).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Candid**: Truthful, straightforward, and frank in speech, especially regarding unpleasant matters.
  - **Candor**: The quality of being open, sincere, and forthright in expression.
  - **Candidate**: A person who seeks or is nominated for an office, honor, or award.
  - **Incandescent**: Emitting visible light as a consequence of being heated to a high temperature.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cand</mark>, think of <mark class="hl-def">to glow or shine white</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **cand** surfaces across four morphological stems:
> - **Stative Verbal & Adjectival Stem `cand-`:** Latin *candēre* → *candidus* ("radiant white, honest") → English [[candid]], with nominal suffixes [[candor]] / [[candour]], and adverbial [[candidly]].
> - **Inchoative Verb Stem `cand-ēsc-`:** Latin *candēscere* ("to begin to glow") → [[candescence]], and prefixed *in- + candēscere* → [[incandescent]], [[incandescence]].
> - **Instrumental Taper Stem `candēl-`:** Latin *candēla* ("candle") → Old English [[candle]], Latin *candēlābrum* → [[candelabra]], French adaptation → [[chandelier]], and modern metrological base unit [[candela]].
> - **Causative / Vowel-Shifted Stem `-cend-`:** From *in- + candēre* → Latin *incendere* ("to set on fire") → [[incendiary]], [[incendiarism]], and participial *incēnsum* ("burnt fragrance / kindled rage") → [[incense]] (both aromatic noun and wrathful verb).
> - **Electoral Participial Stem `candidāt-`:** Latin *candidātus* ("robed in white") → English [[candidate]], with abstract suffix *-cy* → [[candidacy]].
> - **Biological Taxonomy:** Linnaean genus [[Candida]] → medical pathology [[candidiasis]].

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
> Although rooted in a glowing white flame, the semantic range spans distinct disciplines:
> - **Physical Lighting & Optics:** In [[candle]], [[candelabra]], [[chandelier]], and [[candela]], the root provides domestic, sacred, and photometric light.
> - **Thermodynamics & Electrical Engineering:** In [[incandescent]], [[incandescence]], and [[candescence]], it denotes radiation emitted by matter at high temperatures (e.g., tungsten filament lamps).
> - **Ethics, Photography & Rhetoric:** In [[candid]], [[candor]], and [[candidly]], it describes frank, unposed, sincere expression without diplomatic evasion.
> - **Democratic Elections & Governance:** In [[candidate]] and [[candidacy]], it preserves the Roman tradition of public office-seeking.
> - **Pyrotechnics & Military Warfare:** In [[incendiary]] and [[incendiarism]], it describes munitions and criminal acts designed to start catastrophic fires.
> - **Emotions & Liturgy:** In [[incense]], it bridges the holy fragrant smoke of altars and the psychological fire of blinding rage.
> - **Microbiology & Medicine:** In [[Candida]] and [[candidiasis]], it identifies the white opportunistic yeast responsible for oral thrush and systemic fungal infections.

---

## 🔀 4. Prefix & Combining Dynamics on cand

### Prefix & Combining Shifts (Directional & Semantic Modification)

| Prefix / Element | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` (causative) | into, upon, intensifying | [[incandescent]] | Brought into a brilliant, heat-induced white glow. |
| `in-` (with vowel shift `cand-` → `-cend-`) | into, on fire | [[incendiary]], [[incense]] | Literally "set on fire"; causing fire or kindling explosive wrath. |
| `candel-` + `-abra` | candle + holder | [[candelabra]] | A branched stand holding multiple candles or lamps. |
| `candle` + `mass` | taper + sacred liturgy | [[Candlemas]] | The Christian feast day (Feb 2) where candles are blessed. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-id` | Adjective (State / Quality) | [[candid]] | Glowing with honesty; frank, straightforward. |
| `-or` / `-our` | Noun (Abstract State) | [[candor]], [[candour]] | Unreserved honesty, fairness, and openness. |
| `-ate` (< *-ātus*) | Noun (Person Designated) | [[candidate]] | One robed in white; an applicant standing for election. |
| `-acy` | Noun (Status / Office) | [[candidacy]] | The state or campaign of being a candidate. |
| `-escence` / `-escent` | Noun & Adj (Inchoative Process) | [[candescence]], [[incandescent]] | The process of glowing white from intense thermal heat. |
| `-ary` | Adjective & Noun (Pertaining to) | [[incendiary]] | Capable of causing fires; a fire-starting bomb or arsonist. |
| `-iasis` (Medicine) | Noun (Disease / Infection) | [[candidiasis]] | Pathological infection caused by the yeast *Candida*. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚡ **Physics, Optics & Metrology** | [[candela]], [[incandescent]], [[candescence]] | SI base unit of luminous intensity (cd), black-body radiation curves, tungsten filament illumination, thermal emission. |
| 🗳️ **Political Science & Electoral Law** | [[candidate]], [[candidacy]] | Campaign finance regulations, primary ballots, party nominations, electoral candidate debates. |
| 💣 **Military Ordnance & Criminal Law** | [[incendiary]], [[incendiarism]] | White phosphorus and thermite munitions, Geneva Convention Protocol III on incendiary weapons, forensic arson investigation. |
| 📸 **Photography, Journalism & Media** | [[candid]], [[candidly]] | Candid photojournalism (unposed street photography), off-the-record candid interviews with public figures. |
| 🧫 **Mycology & Infectious Disease** | [[Candida]], [[candidiasis]] | *Candida albicans*, antimicrobial resistance in *Candida auris*, cutaneous and invasive candidiasis in immunocompromised patients. |
| ⛪ **Ecclesiology & Liturgy** | [[candelabra]], [[chandelier]], [[incense]], [[Candlemas]] | Burning of frankincense in censers, altar lighting traditions, Feast of the Purification of the Virgin Mary. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[candela]] | noun | **1.** The basic unit of luminous intensity adopted under the systeme international d'unites; equal to 1/60 of the luminous intensity per square centimeter of a black body radiating at the temperature of 2,046 degrees kelvin. | *"In academic literature, candela designates the basic unit of luminous intensity adopted under the systeme international d'unites; equal to 1/60 of the luminous intensity per square centimeter of a black body radiating at the temperature of 2,046 degrees kelvin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candelabra]] | noun | **1.** Branched candlestick; ornamental; has several lights. | *"And in August, high in air, the beautiful and bountiful horse-chestnuts, candelabra-wise, proffer the passer-by their tapering upright cones of congregated blossoms."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[candelabrum]] | noun | **1.** Branched candlestick; ornamental; has several lights. | *"And when within the hall, and without, where the foreign servants were encamped, many fires and pine torches were kindled--before Halfred burned the seven armed candelabrum--it was at first a right jovial sun fire-feast."* — Felix Dahn, *Saga of Halfred the Sigskald: A Northern Tale of the Tenth Century* |
| [[candelilla]] | noun | **1.** Wax-coated mexican shrub related to euphorbia antisyphilitica.<br>**2.** Wax-coated shrub of northern mexico and southwestern united states. | *"In academic literature, candelilla designates wax-coated mexican shrub related to euphorbia antisyphilitica."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candent]] | adjective | **1.** Emitting light as a result of being heated. | *"In academic literature, candent designates emitting light as a result of being heated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candescence]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin cand within the domain of Color & Appearance.<br>**2.** A technical or specialized form exhibiting the properties of cand in systematic terminology. | *"In academic literature, candescence designates pertaining to, derived from, or characteristic of latin cand within the domain of color & appearance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candescent]] | adjective | **1.** Glowing from great heat. | *"Tranquility sudden, vast, candescent: form of forms."* — James Joyce, *Ulysses* |
| [[candid]] | adjective | **1.** Characterized by directness in manner or speech; without subtlety or evasion.<br>**2.** Informal or natural; especially caught off guard or unprepared. | *"I write down these opinions not because I believe that this or any other thing was so because I thought so, but only because I did think so and I want to be quite candid about all I thought and did."* — Charles Dickens, *Bleak House* |
| [[candida]] | noun | **1.** Any of the yeastlike imperfect fungi of the genus candida. | *"September, 1865. * * * * * =Peronospora candida=, Fuckel."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[candidacy]] | noun | **1.** The campaign of a candidate to be elected. | *"They have survived one house cleaning after another and denied candidacy for garage sales and flea markets."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[candidate]] | noun | **1.** A politician who is running for public office.<br>**2.** Someone who is considered for something (for an office or prize or honor etc.). | *"He is not a candidate.” Volumnia had thought he might have been employed."* — Charles Dickens, *Bleak House* |
| [[candidature]] | noun | **1.** The campaign of a candidate to be elected. | *"He threw himself, however, with great ardour into the support of the candidature of his friend Professor P.C."* — John Cairns, *Principal Cairns* |
| [[candidiasis]] | noun | **1.** An infection caused by fungi of the genus monilia or candida (especially candida albicans). | *"In academic literature, candidiasis designates an infection caused by fungi of the genus monilia or candida (especially candida albicans)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candidly]] | adverb | **1.** (used as intensives reflecting the speaker's attitude) it is sincerely the case that. | *"But the kindness of his heart was such that he never resented anything for long, and welcomed his son to-day with a smile which was as candidly sweet as a child’s."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[candidness]] | noun | **1.** The quality of being honest and straightforward in attitude and speech. | *"In academic literature, candidness designates the quality of being honest and straightforward in attitude and speech."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candied]] | verb | **1.** Coat with something sweet, such as a hard sugar glaze.<br>**2.** Encrusted with sugar or syrup. | *"No, let the candied tongue lick absurd pomp, And crook the pregnant hinges of the knee Where thrift may follow fawning."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[candle]] | noun | **1.** Stick of wax with a wick in the middle.<br>**2.** The basic unit of luminous intensity adopted under the systeme international d'unites; equal to 1/60 of the luminous intensity per square centimeter of a black body radiating at the temperature of 2,046 degrees kelvin. | *"What though you have no beauty— As, by my faith, I see no more in you Than without candle may go dark to bed— Must you be therefore proud and pitiless?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[candleberry]] | noun | **1.** Deciduous aromatic shrub of eastern north america with grey-green wax-coated berries. | *"In academic literature, candleberry designates deciduous aromatic shrub of eastern north america with grey-green wax-coated berries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candlelight]] | noun | **1.** The light provided by a burning candle. | *"The dairy had again worked by morning candlelight for a long time; and a fresh renewal of Clare’s pleading occurred one morning between three and four."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[candlemaker]] | noun | **1.** A person who makes or sells candles. | *"In academic literature, candlemaker designates a person who makes or sells candles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candlemas]] | noun | **1.** Feast day commemorating the presentation of christ in the temple; a quarter day in scotland. | *"Then I was three year at Mellstock, and I’ve been here one-and-thirty year come Candlemas."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[candlenut]] | noun | **1.** Large tree native to southeastern asia; the nuts yield oil used in varnishes; nut kernels strung together are used locally as candles.<br>**2.** Seed of candlenut tree; source of soil used in varnishes. | *"In academic literature, candlenut designates large tree native to southeastern asia; the nuts yield oil used in varnishes; nut kernels strung together are used locally as candles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candlepin]] | noun | **1.** A bowling pin that is thin by comparison with a tenpin. | *"In academic literature, candlepin designates a bowling pin that is thin by comparison with a tenpin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candlepins]] | noun | **1.** A bowling game using slender bowling pins.<br>**2.** A bowling pin that is thin by comparison with a tenpin. | *"In academic literature, candlepins designates a bowling game using slender bowling pins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candlepower]] | noun | **1.** Luminous intensity measured in candelas. | *"In academic literature, candlepower designates luminous intensity measured in candelas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candlesnuffer]] | noun | **1.** An implement with a small cup at the end of a handle; used to extinguish the flame of a candle. | *"In academic literature, candlesnuffer designates an implement with a small cup at the end of a handle; used to extinguish the flame of a candle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candlestick]] | noun | **1.** A holder with sockets for candles. | *"I opened it softly and found Miss Jellyby shivering there with a broken candle in a broken candlestick in one hand and an egg-cup in the other."* — Charles Dickens, *Bleak House* |
| [[candlewick]] | noun | **1.** The wick of a candle.<br>**2.** Loops of soft yarn are cut to give a tufted pattern. | *"In academic literature, candlewick designates the wick of a candle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candlewood]] | noun | **1.** Any of several resinous trees or shrubs often burned for light. | *"In academic literature, candlewood designates any of several resinous trees or shrubs often burned for light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candor]] | noun | **1.** Ability to make judgments free from discrimination or dishonesty.<br>**2.** The quality of being honest and straightforward in attitude and speech. | *"Casaubon would take your place, there would be gain, instead of loss.” But there was still a weight on his mind which arrested this cheerful candor."* — George Eliot, *Middlemarch* |
| [[candour]] | noun | **1.** The quality of being honest and straightforward in attitude and speech.<br>**2.** Ability to make judgments free from discrimination or dishonesty. | *"And what with his fine hilarious manner and his engaging candour and his genial way of lightly tossing his own weaknesses about, as if he had said, “I am a child, you know!"* — Charles Dickens, *Bleak House* |
| [[candy]] | noun | **1.** A rich sweet made of flavored sugar and often combined with fruit or nuts.<br>**2.** Coat with something sweet, such as a hard sugar glaze. | *"Why, what a candy deal of courtesy This fawning greyhound then did proffer me!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[candy-like]] | adjective | **1.** Resembling candy. | *"In academic literature, candy-like designates resembling candy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candy-scented]] | adjective | **1.** Smelling of candy. | *"In academic literature, candy-scented designates smelling of candy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candyfloss]] | noun | **1.** A candy made by spinning sugar that has been boiled to a high temperature. | *"In academic literature, candyfloss designates a candy made by spinning sugar that has been boiled to a high temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candymaker]] | noun | **1.** Someone who makes candies and other sweets. | *"In academic literature, candymaker designates someone who makes candies and other sweets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candytuft]] | noun | **1.** Any of various flowering plants of the genus iberis cultivated for their showy clusters of white to red or purple flowers; native to mediterranean region. | *"In academic literature, candytuft designates any of various flowering plants of the genus iberis cultivated for their showy clusters of white to red or purple flowers; native to mediterranean region."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[candyweed]] | noun | **1.** Bog plant of pine barrens of southeastern united states having spikes of irregular yellow-orange flowers. | *"In academic literature, candyweed designates bog plant of pine barrens of southeastern united states having spikes of irregular yellow-orange flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incandesce]] | verb | **1.** Cause to become incandescent or glow.<br>**2.** Become incandescent or glow with heat. | *"In academic literature, incandesce designates cause to become incandescent or glow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incandescence]] | noun | **1.** The phenomenon of light emission by a body as its temperature is raised.<br>**2.** Light from heat. | *"The light is due to the solid matter in the flame, brought to a state of white heat or incandescence by the heat of the flame."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[incandescent]] | adjective | **1.** Emitting light as a result of being heated.<br>**2.** Characterized by ardent emotion or intensity or brilliance. | *"His fire was waiting incandescent, his steam was at high pressure, in a few seconds he could make the long strap move at an invisible velocity."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[noncandidate]] | noun | **1.** Someone who has announced they are not a candidate; especially a politician who has announced that he or she is not a candidate for some political office. | *"In academic literature, noncandidate designates someone who has announced they are not a candidate; especially a politician who has announced that he or she is not a candidate for some political office."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Color & Appearance]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CAND
  </div>
</div>
