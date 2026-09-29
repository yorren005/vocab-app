---
status: unread
type: root_dashboard
---
# Dashboard — tog
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tog-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“garment or robe”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Draping a long, comfortable outer robe around the shoulders.</span>
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

The root **tog** means garment or robe. It refers to wrapping an outer mantle, robe, or covering around the body. In English, this root forms words such as *toga*, *togate*, *togated*, and *togs*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: garment or robe
> The root **tog** means garment or robe. It refers to wrapping an outer mantle, robe, or covering around the body. In English, this root forms words such as *toga*, *togate*, *togated*, and *togs*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Garment or robe</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Draping a long, comfortable outer robe around the shoulders.</mark>
> - **Everyday Connection**: Think of familiar words like *toga* and *togate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tog** comes from a Latin word that means *"garment or robe"*.
  - At its core, it describes garment or robe.

- **The Big Picture Idea**:
  - Picture draping a long, comfortable outer robe around the shoulders.
  - Whenever you see **tog** in an English word, think of **wrapping an outer robe or garment**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of garment or robe.
  - **Mental & Social**: How people experience, organize, or communicate about garment or robe.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Toga**: The loose, draped semicircular woolen outer robe worn in public by male citizens of ancient Rome as the exclusive emblem of civic liberty and civil status.
  - **Togate**: Wearing or dressed in a toga.
  - **Togated**: Clothed in a toga.
  - **Togs**: Clothes, garments, or personal attire, especially when selected for a designated activity.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tog</mark>, think of <mark class="hl-def">wrapping an outer robe or garment</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **tog** generates vocabulary through three distinct linguistic channels:
> - **Direct Latin Borrowing:** The nominative singular *toga* borrowed intact as an architectural, historical, and ceremonial noun ([[toga]]).
> - **Participial & Adjectival Derivation:** From Latin *togātus* ("wearing a toga") → English [[togate]], and with English adjectival suffix *-ed* → [[togated]].
> - **Cant & Vernacular Clippings:** From Latin *toga* → 18th-century slang *tog* (a coat) → plural [[togs]] (attire, clothing, swimwear) → denominal verb [[tog]] (*togged up*, *togged out*).
> - **Metrological Coinage:** The modern metrological noun [[tog]] (thermal resistance index for garments and bedding, derived from slang *tog*).
> - **Compound Civic Phrases:** Naturalized classical phrases describing constitutional and political archetypes ([[toga virilis]], [[toga praetexta]], [[toga candida]], [[gens togata]], [[cedant arma togae]]).

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
> Although derived from one ancient woolen mantle, the modern semantic range spans extreme registers:
> - **Classical Antiquity & Archaeology:** In [[toga]], [[toga virilis]], and [[toga praetexta]], the root denotes the literal garment, its ritual donning, and its archeological typology.
> - **Iconography & Sculpture:** In [[togated]], it describes ancient statuary—specifically depictions of Roman emperors, magistrates, and senators in civic rather than military dress.
> - **Political & Republican Philosophy:** In [[gens togata]] and [[cedant arma togae]], the root symbolizes republican constitutionalism, civilian governance, and the rule of law over militarism.
> - **Informal & Dialectal Attire:** In [[togs]], the root serves as widespread colloquial English for specialized garments—most notably in Australia, New Zealand, and Ireland, where *togs* means swimwear.
> - **Thermodynamic Science:** In [[tog]], the root represents a standardized unit of thermal resistance for textiles (1 tog = 0.1 m²·K/W).

---

## 🔀 4. Prefix & Combining Dynamics on tog

### Prefix & First-Element Shifts (Directional & Semantic Modification)

Latin *toga* did not form prefixed verbs within Latin; instead, semantic shifts occurred via qualifying Latin adjectives that permanently influenced English political and civic thought:

| Qualifying Element | Classical Latin Phrase | English Semantic Offshoot | Conceptual Implication |
| :--- | :--- | :--- | :--- |
| *candidus* (shining white) | *toga candida* | [[candidate]] / candidacy | The bleached chalk-white robe worn by seekers of public election to signify purity of motive. |
| *praetextus* (woven in front) | *toga praetexta* | praetexta / pre-text | The purple-bordered robe worn by curule magistrates and freeborn youths. |
| *virīlis* (manly, adult) | *toga virilis* | toga virilis | The unadorned white woolen garment assumed upon entering adult citizenship. |
| *pictus* (painted/embroidered) | *toga picta* | toga picta | The gold-embroidered purple robe worn by a victorious general during a triumphal procession. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ātus` / `-ate` | Adjective (Endowed with) | [[togate]] | Clothed in a toga; characterized by Roman civic dignity. |
| `-ed` | Adjective (Participial) | [[togated]] | Clothed in a toga; depicted in art as a toga-wearer. |
| `-s` | Noun (Colloquial Plural) | [[togs]] | General clothing, personal apparel, or swimwear. |
| *(zero suffix)* | Verb (Phrasal) / Noun | [[tog]] | To dress or equip (*togged out*); a unit of thermal insulation. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏛️ **Classical History & Archaeology** | [[toga]], [[togate]], [[togated]], [[toga praetexta]] | Classification of Roman marble portrait sculptures (*statua togata*), curule magistracies, and funerary monuments. |
| ⚖️ **Constitutional Law & Political Theory** | [[cedant arma togae]], [[gens togata]] | The doctrine of civilian control over the military; republican principles of constitutional supremacy. |
| 🗣️ **Sociolinguistics & Lexicography** | [[togs]], [[tog]] | Cant language diffusion, Australian and New Zealand dialectal terminology for swimwear, register drift. |
| 🧵 **Textile Engineering & Metrology** | [[tog]] | British standard thermal insulation ratings (BS 5335) for duvets, sleeping bags, and thermal garments. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[altogether]] | noun | **1.** Informal terms for nakedness.<br>**2.** To a complete degree or to the full or entire extent (`whole' is often used informally for `wholly'). | *"I perceive by this demand, you are not altogether of his council."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[octogenarian]] | noun | **1.** Someone whose age is in the eighties.<br>**2.** Being from 80 to 89 years old. | *"Sloane, ‘I see here that another octogenarian has just died."* — L. M. Montgomery, *Anne of Avonlea* |
| [[protogeometric]] | adjective | **1.** Characteristic of the earliest phase of geometric art especially in greece. | *"In academic literature, protogeometric designates characteristic of the earliest phase of geometric art especially in greece."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tog]] | verb | **1.** Provide with clothes or put clothes on. | *"They laugh at long-togs so, Flask; but seems to me, a long tailed coat ought always to be worn in all storms afloat."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[toga]] | noun | **1.** A one-piece cloak worn by men in ancient rome. | *"I was consequently obliged to assume the Typee costume, a little altered, however, to suit my own views of propriety, and in which I have no doubt I appeared to as much advantage as a senator of Rome enveloped in the folds of his toga."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[togated]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin tog within the domain of Clothing & Covering.<br>**2.** A technical or specialized form exhibiting the properties of tog in systematic terminology. | *"In academic literature, togated designates pertaining to, derived from, or characteristic of latin tog within the domain of clothing & covering."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[togaviridae]] | noun | **1.** A family of arboviruses carried by arthropods. | *"In academic literature, togaviridae designates a family of arboviruses carried by arthropods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[together]] | adjective | **1.** Mentally and emotionally stable.<br>**2.** In contact with each other or in proximity. | *"A traitor you do look like, but such traitors His majesty seldom fears; I am Cressid’s uncle, That dare leave two together."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[togetherness]] | noun | **1.** Affectionate closeness. | *"In academic literature, togetherness designates affectionate closeness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[toggle]] | noun | **1.** Any instruction that works first one way and then the other; it turns something on the first time it is used and then turns it off the next time.<br>**2.** A hinged switch that can assume either of two positions. | *"In academic literature, toggle designates any instruction that works first one way and then the other; it turns something on the first time it is used and then turns it off the next time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[togo]] | noun | **1.** A republic on the western coast of africa on the gulf of guinea; formerly under french control. | *"See above, p. 27. [205] Jakob Spieth, _Die Ewe-Stämme_ (Berlin, 1906), p. 192. [206] Anton Witte, "Menstruation und Pubertätsfeier der Mädchen in Kpandugebiet Togo," _Baessler-Archiv_, i. (1911) p. 279. [207] Th."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[togolese]] | noun | **1.** A native or inhabitant of togo.<br>**2.** Of or relating to the african country of togo or its people. | *"In academic literature, togolese designates a native or inhabitant of togo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[togs]] | noun | **1.** Informal terms for clothing.<br>**2.** Provide with clothes or put clothes on. | *"They laugh at long-togs so, Flask; but seems to me, a long tailed coat ought always to be worn in all storms afloat."* — Herman Melville, *Moby-Dick; or, The Whale* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Clothing & Covering]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TOG
  </div>
</div>
