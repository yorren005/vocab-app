---
status: unread
type: root_dashboard
---
# Dashboard — forn
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">forn-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“arch or vault”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Laying bricks to build a sturdy home or resting inside a safe shelter.</span>
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

The root **forn** means arch or vault. It refers to a curved architectural vault, archway, or vaulted roof. In English, this root forms words such as *fornix*, *fornices*, *fornicate*, and *fornication*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: arch or vault
> The root **forn** means arch or vault. It refers to a curved architectural vault, archway, or vaulted roof. In English, this root forms words such as *fornix*, *fornices*, *fornicate*, and *fornication*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Arch or vault</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Laying bricks to build a sturdy home or resting inside a safe shelter.</mark>
> - **Everyday Connection**: Think of familiar words like *fornix* and *fornices*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **forn** comes from a Latin word that means *"arch or vault"*.
  - At its core, it describes arch or vault.

- **The Big Picture Idea**:
  - Picture laying bricks to build a sturdy home or resting inside a safe shelter.
  - Whenever you see **forn** in an English word, think of **building, crafting, and dwelling**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of arch or vault.
  - **Mental & Social**: How people experience, organize, or communicate about arch or vault.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Fornix**: A prominent, C-shaped arched bundle of nerve fibers beneath the corpus callosum that acts as the principal tract carrying signals from the hippocampus to the mammillary bodies.
  - **Fornices**: Plural form of fornix.
  - **Fornicate**: To engage in consensual sexual intercourse with another person when not legally married to each other.
  - **Fornication**: Consensual sexual intercourse between two individuals who are not married to one another.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">forn</mark>, think of <mark class="hl-def">building, crafting, and dwelling</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Engine & Stem Variants
> The root **forn** manifests in English across three primary morphological stems:
> - **Oblique Consonantal Stem:** `fornic-` (from Latin genitive *fornicis* and denominative verb *fornicāre* / *fornicārī*):
>   - Produces the moral/legal vocabulary: *fornic- + -ate* → [[fornicate]], *fornic- + -ation* → [[fornication]], *fornic- + -ator* → [[fornicator]], *fornic- + -atress* → [[fornicatress]], *fornic- + -atory* → [[fornicatory]].
>   - Produces the neoclassical morphological adjective: *fornic- + -i- + -form* → [[forniciform]] ("arch-shaped").
> - **Nominative Classical Base:** `fornix` (plural `fornices` /ˈfɔːrnɪsiːz/):
>   - Preserved verbatim in modern clinical neuroanatomy, ophthalmology, and gynecology.
>   - Neoclassical adjectival derivative: *fornix* → [[fornical]] ("pertaining to the fornix of the brain").
> - **Thermal Substantive Stem:** `fornac-` (Latin *fornāx*, *fornācis* "kiln, oven"):
>   - Transmitted through Old French *fornaise* into Middle English as [[furnace]].

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

> [!tip] 🌈 Spectrum of Meaning Across Three Disciplinary Pillars
> 1. **Architectural & Morphological Curve:** The literal masonry arch, structural vault, and arched shape ([[fornix]], [[forniciform]], [[fornicate]] [adjective in botany]).
> 2. **Moral, Theological & Legal Offence:** Illicit, consensual sexual relations outside the bond of marriage, tracing back to the subterranean vaults of Imperial Rome ([[fornicate]] [verb], [[fornication]], [[fornicator]], [[fornicatress]], [[fornicatory]]).
> 3. **Thermal Combustion & Ordeal:** The intense arched heat of metallurgical and heating ovens, and the metaphorical crucible of severe tribulation ([[furnace]]).

---

## 🔀 4. Prefix & Combining Dynamics on forn

### Prefix Dynamics
Because Latin *fornix* and *fornāx* are root nouns denoting physical structures rather than action verbs, they do not accept directional Latin prefixes (such as *re-*, *con-*, *sub-*); rather, their English derivatives are generated entirely by **grammatical and derivational suffixation**.

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Semantic Realization |
| :--- | :--- | :--- | :--- |
| `-ate` | Verb (Perform action) / Adj. | [[fornicate]] | To commit extramarital sex / (botany) arched over. |
| `-ation` | Noun (Act, Practice, Offence) | [[fornication]] | The voluntary act or state of illicit sexual congress. |
| `-ator` | Noun (Masculine/General Agent) | [[fornicator]] | One who engages in fornication. |
| `-atress` | Noun (Feminine Agent) | [[fornicatress]] | A female who commits fornication (historical/legal). |
| `-atory` | Adjective (Pertaining to) | [[fornicatory]] | Pertaining to, encouraging, or of the nature of fornication. |
| `-al` | Adjective (Anatomical Relation) | [[fornical]] | Pertaining specifically to the anatomical fornix of the brain. |
| `-iform` | Adjective (Morphological Shape) | [[forniciform]] | Having the shape or contour of a vault or arch. |
| `-ace` *(via OF)* | Noun (Enclosed Chamber) | [[furnace]] | An enclosed structure for generating extreme thermal energy. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Real-World Context |
| :--- | :--- | :--- |
| 🧠 **Neuroscience & Medicine** | [[fornix]], [[fornices]], [[fornical]], [[forniciform]] | In neuroanatomy, the **fornix** forms the primary efferent axonal projection of the hippocampus to the mammillary bodies and anterior thalamic nuclei, playing a critical role in episodic memory consolidation (Papez circuit). In ophthalmology, the **conjunctival fornix** is the loose pocket where palpebral and bulbar conjunctiva meet. In gynecology, the **vaginal fornices** surround the uterine cervix. |
| ⚖️ **Law, Canon Law & Theology** | [[fornication]], [[fornicator]], [[fornicatory]] | Central to ecclesiastical jurisdiction, canon law penitentials, and historic common-law statutes distinguishing *fornication* (consensual sex between unmarried partners) from *adultery* (involving at least one married party) and *sodomy*. |
| 🏭 **Metallurgy & Engineering** | [[furnace]] | Blast furnaces, electric arc furnaces, reverberatory smelting, and glassmaking kilns essential to industrial thermodynamics and materials science. |
| 🌿 **Botany & Taxonomy** | [[fornicate]], [[forniciform]] | Describes flora where petals, scales, or corolla appendages arch over stamens or nectar glands to shield pollen from rain (e.g., in Boraginaceae forget-me-nots). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[fornax]] | noun | **1.** A faint constellation in the southern hemisphere near cetus and phoenix. | *"In academic literature, fornax designates a faint constellation in the southern hemisphere near cetus and phoenix."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fornicate]] | verb | **1.** Have sex without being married. | *"Blind to the world up in a shebeen in Bride street after closing time, fornicating with two shawls and a bully on guard, drinking porter out of teacups."* — James Joyce, *Ulysses* |
| [[fornication]] | noun | **1.** Voluntary sexual intercourse between persons not married to each other.<br>**2.** Extramarital sex that willfully and maliciously interferes with marriage relations. | *"Bless me, what a fry of fornication is at door!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fornicator]] | noun | **1.** Someone who commits adultery or fornication. | *"Tho’ now they ca’ me fornicator, An’ tease my name in kintry clatter, The mair they talk, I’m kent the better, E’en let them clash; An auld wife’s tongue’s a feckless matter To gie ane fash."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[fornicatress]] | noun | **1.** A woman adulterer. | *"Well, let her be admitted. [_Exit Servant._] See you the fornicatress be removed; Let her have needful but not lavish means; There shall be order for it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[forniciform]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin forn within the domain of Building & Dwelling.<br>**2.** A technical or specialized form exhibiting the properties of forn in systematic terminology. | *"In academic literature, forniciform designates pertaining to, derived from, or characteristic of latin forn within the domain of building & dwelling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fornix]] | noun | **1.** Generally any arch shaped structure (but often it refers to the arched roof of an anatomical space).<br>**2.** An arched bundle of white fibers at the base of the brain by which the hippocampus of each hemisphere projects to the contralateral hippocampus and to the thalamus and mamillary bodies. | *"In academic literature, fornix designates generally any arch shaped structure (but often it refers to the arched roof of an anatomical space)."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Building & Dwelling]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FORN
  </div>
</div>
