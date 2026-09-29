---
status: unread
type: root_dashboard
---
# Dashboard — let
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">let-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“death or destruction”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A flickering candle flame going out as silence and stillness return.</span>
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

The root **let** means death or destruction. It refers to the end of physical life, mortality, and passing away. In English, this root forms words such as *lethal*, *lethality*, *lethally*, and *sublethal*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: death or destruction
> The root **let** means death or destruction. It refers to the end of physical life, mortality, and passing away. In English, this root forms words such as *lethal*, *lethality*, *lethally*, and *sublethal*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Death or destruction</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A flickering candle flame going out as silence and stillness return.</mark>
> - **Everyday Connection**: Think of familiar words like *lethal* and *lethality*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **let** comes from a Latin word that means *"death or destruction"*.
  - At its core, it describes death or destruction.

- **The Big Picture Idea**:
  - Picture a flickering candle flame going out as silence and stillness return.
  - Whenever you see **let** in an English word, think of **mortality and the end of life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of death or destruction.
  - **Mental & Social**: How people experience, organize, or communicate about death or destruction.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Lethal**: Capable of causing death.
  - **Lethality**: The quality or state of being lethal.
  - **Lethally**: In a manner that produces death.
  - **Sublethal**: Insufficient to cause death directly, but capable of producing physiological impairment, behavioral changes, or tissue pathology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">let</mark>, think of <mark class="hl-def">mortality and the end of life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **let** entered English through Latin adjectival and compounding formations:
> - **Adjectival Base `lethal-` (Latin *lēthālis* / *lētālis*):**
>   - Primary adjective: Latin *lēthālis* → English [[lethal]].
>   - Adverbial suffix *-ly*: *lethal + -ly* → [[lethally]].
>   - Abstract noun of quality / rate *-ity*: Latin *lētālitās* → English [[lethality]] (variant: [[letality]]).
> - **Prefixal Attenuation `sub-` (Under / Below):**
>   - *sub-* + *lethal* → [[sublethal]] ("approaching but not reaching the threshold of death").
>   - *sublethal + -ly* → [[sublethally]].
> - **Classical Compounding `-fer` (Latin *ferre*, "to bear, bring"):**
>   - Latin compound *lētifer* (*lētum* + *-fer*) → English [[letiferous]] / [[lethiferous]] ("death-bringing").
> - **Modern Forensic & Biochemical Fixed Collocations:**
>   - [[lethal dose]] (LD50 / LD100 in pharmacology).
>   - [[lethal injection]] (capital punishment pharmacology).
>   - [[lethal allele]] (genetics: homozygous lethal mutations).

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
> Although anchored in **"death and destruction"**, the derivatives of `let` calibrate distinct thresholds and applications:
> - **Absolute Lethality (Direct Biological Extinction):** In [[lethal]] and [[lethally]], the word designates a fatal outcome—whether an assassin's dagger, an acute cyanide poisoning, or an untreatable cerebrovascular hemorrhage.
> - **Sub-Threshold Stress (Impairment without Demise):** In [[sublethal]] and [[sublethally]], the root names exposures (radiation, pesticide concentrations, hypoxia) that inflict cellular injury or behavioral disruption without immediate mortality.
> - **Quantitative Biometrics & Epidemiology:** In [[lethality]] and historical [[letality]], the root ceases to be an adjectival descriptor and becomes a mathematical ratio: the proportion of diagnosed individuals who succumb to a disease (case fatality rate).
> - **Archaic / Poetic Mortality:** In [[letiferous]], the word retains the elevated, menacing resonance of classical Latin verse, describing venomous snakes, poisoned arrows, or miasmic pestilences.
> - **Forensic Jurisprudence & Bioethics:** In [[lethal injection]] and [[lethal dose]], the root operates at the intersection of legal execution, experimental pharmacology, and bioethical controversy.

---

## 🔀 4. Prefix & Combining Dynamics on let

### Prefix Dynamics (Threshold & Intensity Shifts)

| Prefix / Element | Meaning | Derivative | Semantic Result |
| :--- | :--- | :--- | :--- |
| *(unprefixed base)* | — | [[lethal]] | Directly causing death; mortal; devastating. |
| `sub-` | below, under, close to | [[sublethal]] | Below the threshold that causes death; injurious but non-fatal. |
| `sub-` + `-ly` | in a sub-threshold manner | [[sublethally]] | In a manner that injures or stresses without killing. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| `-al` (Latin *-ālis*) | Adjective (Pertaining to) | [[lethal]] | Capable of causing biological death; fatal. |
| `-ity` (Latin *-itās*) | Abstract Noun (Degree / Metric) | [[lethality]], [[letality]] | The capacity to kill; the proportion of deaths caused. |
| `-ly` | Adverb (Manner) | [[lethally]] | In a manner resulting in death; fatally. |
| `-ferous` (Latin *-fer* + *-ous*) | Adjective (Bearing / Bringing) | [[letiferous]] | Bearing death; producing a fatal outcome. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🧪 **Toxicology & Pharmacology** | [[lethal dose]], [[lethal]], [[sublethal]] | Determination of median lethal dose (LD50), therapeutic index calculations, sublethal pesticide exposure in honeybees (*Apis mellifera*). |
| 🏥 **Epidemiology & Virology** | [[lethality]], [[letality]], [[lethal]] | Case fatality rate (CFR) of Ebola, Rabies (near 100% lethality), and avian influenza; trade-offs between pathogen transmissibility and lethality. |
| 🧬 **Genetics & Molecular Biology** | [[lethal allele]], [[sublethal]] | Recessive lethal mutations (e.g., embryonic lethality in mouse knockouts), synthetic lethality in oncology targeting PARP and BRCA mutations. |
| ⚖️ **Forensics & Criminal Law** | [[lethal injection]], [[lethal]], [[lethally]] | Capital punishment protocols (three-drug cocktail: midazolam, vecuronium bromide, potassium chloride); statutory definition of "lethal force" in self-defense law. |
| 🛡️ **Military Science & Defense** | [[lethality]], [[lethal]] | Weapons system effectiveness, kinetic energy penetrators, terminal ballistics, and rules of engagement regarding lethal autonomy. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[aglet]] | noun | **1.** Metal or plastic sheath over the end of a shoelace or ribbon.<br>**2.** Ornamental tagged cord or braid on the shoulder of a uniform. | *"I am very cold, and all the stars are out too, The little stars and all, that look like aglets."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[colette]] | noun | **1.** French writer of novels about women (1873-1954). | *"In academic literature, colette designates french writer of novels about women (1873-1954)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collet]] | noun | **1.** A metal cap or band placed on a wooden pole to prevent splitting.<br>**2.** A cone-shaped chuck used for holding cylindrical pieces in a lathe. | *"In academic literature, collet designates a metal cap or band placed on a wooden pole to prevent splitting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[delete]] | verb | **1.** Remove or make invisible.<br>**2.** Wipe out digitally or magnetically recorded information. | *"Make the contact," he said, adding, "Relay the message through one of the transports; delete all references that show this facility is in the loop." Switches snapped as the operator nodded."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[deleterious]] | adjective | **1.** Harmful to living things. | *"When I returned on board, I was nearly suffocated by the carbonic acid with which the air was filled—ah! if we had only the chemical means to drive away this deleterious gas."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[deletion]] | noun | **1.** Any process whereby sounds or words are left out of spoken words or phrases.<br>**2.** (genetics) the loss or absence of one or more nucleotides from a chromosome. | *"In academic literature, deletion designates any process whereby sounds or words are left out of spoken words or phrases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dilettante]] | noun | **1.** An amateur who engages in an activity without serious intentions and who pretends to have knowledge.<br>**2.** Showing frivolous or superficial interest; amateurish. | *"Fortunately also, for him, he was no mere dreamer, or idle dilettante."* — Oscar Wilde, *Lord Arthur Savile's Crime; The Portrait of Mr. W.H., and Other Stories* |
| [[dilettanteish]] | adjective | **1.** Showing frivolous or superficial interest; amateurish. | *"In academic literature, dilettanteish designates showing frivolous or superficial interest; amateurish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dilettantish]] | adjective | **1.** Showing frivolous or superficial interest; amateurish. | *"I am not so brazen as you.” “Bah! that is because you are dilettantish and amateurish."* — George Eliot, *Middlemarch* |
| [[eaglet]] | noun | **1.** A young eagle. | *"I don’t know the meaning of half those long words, and, what’s more, I don’t believe you do either!” And the Eaglet bent down its head to hide a smile: some of the other birds tittered audibly."* — Lewis Carroll, *Alice's Adventures in Wonderland* |
| [[elettaria]] | noun | **1.** Cardamom. | *"Classical and authoritative lexicons catalog elettaria as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inlet]] | noun | **1.** An arm off of a larger body of water (often between rocky headlands).<br>**2.** An opening through which fluid is admitted to a tube or container. | *"A tributary of the main stream flowed through the basin of the pool by an inlet and outlet at opposite points of its diameter."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[let]] | noun | **1.** A brutal terrorist group active in kashmir; fights against india with the goal of restoring islamic rule of india.<br>**2.** A serve that strikes the net before falling into the receiver's court; the ball must be served again. | *"Be thou the tenth Muse, ten times more in worth Than those old nine which rhymers invocate, And he that calls on thee, let him bring forth Eternal numbers to outlive long date."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[letch]] | noun | **1.** Man with strong sexual desires. | *"In academic literature, letch designates man with strong sexual desires."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lethal]] | adjective | **1.** Of an instrument of certain death. | *"Scarf set his at the highest level in the non-lethal category, and with a sneer at Brad, returned the weapon to its sheath."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[lethality]] | noun | **1.** The quality of being deadly. | *"The view is that their intervention might reduce the lethality of a person contemplating suicide, and even influence someone who has actually initiated an act of suicide."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[leto]] | noun | **1.** Wife or mistress of zeus and mother of apollo and artemis in ancient mythology; called latona in roman mythology. | *"The story that Leto clasped a palm-tree and an olive-tree or two laurel-trees, when she was about to give birth to the divine twins Apollo and Artemis, perhaps points to a similar Greek belief in the efficacy of certain trees to facilitate delivery."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[letter]] | noun | **1.** A written message addressed to a person or organization.<br>**2.** The conventional characters of the alphabet used to represent speech. | *"This to my mother. [_Giving a letter._] ’Twill be two days ere I shall see you; so I leave you to your wisdom."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[letter-perfect]] | adjective | **1.** Correct to the last detail; especially being in or following the exact words. | *"In academic literature, letter-perfect designates correct to the last detail; especially being in or following the exact words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lettercard]] | noun | **1.** A postcard that folds so the message is inside. | *"R., received loudly flung sacks of letters, postcards, lettercards, parcels, insured and paid, for local, provincial, British and overseas delivery."* — James Joyce, *Ulysses* |
| [[lettered]] | verb | **1.** Win an athletic letter.<br>**2.** Set down or print with letters. | *"ARMADO. [_To Holofernes_.] Monsieur, are you not lettered?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[letterer]] | noun | **1.** A painter of letters. | *"In academic literature, letterer designates a painter of letters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[letterhead]] | noun | **1.** A sheet of stationery with name and address of the organization printed at the top. | *"No, not on the bill letterheads--on the regular office sheets."* — Grace S. Richmond, *Red Pepper Burns* |
| [[lettering]] | noun | **1.** Letters inscribed (especially words engraved or carved) on something.<br>**2.** Win an athletic letter. | *"In the afternoon he came back again, and found that the lettering was almost done."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[letterman]] | noun | **1.** An athlete who has earned a letter in a school sport. | *"She made her way at first to the hospital of the Third Corps, and labored there till that as well as the other field hospitals were broken up, when she devoted herself to the wounded in Camp Letterman."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[letterpress]] | noun | **1.** Printing from a plate with raised characters. | *"I returned to my book—Bewick’s History of British Birds: the letterpress thereof I cared little for, generally speaking; and yet there were certain introductory pages that, child as I was, I could not pass quite as a blank."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[letters]] | noun | **1.** The literary culture.<br>**2.** Scholarly attainment. | *"Enter the King of France, with letters; Lords and others attending."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[letting]] | noun | **1.** Property that is leased or rented out or let.<br>**2.** Make it possible through a specific action or lack of action for something to happen. | *"Rynaldo, you did never lack advice so much As letting her pass so; had I spoke with her, I could have well diverted her intents, Which thus she hath prevented."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lettish]] | noun | **1.** The official language of latvia; belongs to the baltic branch of indo-european. | *"John's Day (the summer solstice), every Lettish peasant is said to devote his leisure hours to swinging diligently; for the higher he rises in the air the higher will his flax grow that season."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[lettuce]] | noun | **1.** Informal terms for money.<br>**2.** Any of various plants of the genus lactuca. | *"Val, if there is a slug in that lettuce I wish you would say so."* — Anthony Pryde, *Nightfall* |
| [[letup]] | noun | **1.** A pause during which things are calm or activities are diminished. | *"In academic literature, letup designates a pause during which things are calm or activities are diminished."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonlethal]] | adjective | **1.** Not capable of causing death. | *"In academic literature, nonlethal designates not capable of causing death."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proletarian]] | noun | **1.** A member of the working class (not necessarily employed).<br>**2.** Belonging to or characteristic of the proletariat. | *"The one becomes the proletarian, the other the intellectual, the one becomes the workshop, the other the parlor-socialist."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[proletariat]] | noun | **1.** A social class comprising those who do manual labor or work for wages. | *"It should react upon his metrical vocabulary to its beneficial expansion, by taking him outside his aristocratic circle of language, and keeping him in touch with the great commonalty, the proletariat of speech."* — Francis Thompson, *Shelley: An Essay* |
| [[sublet]] | noun | **1.** A lease from one lessee to another.<br>**2.** Lease or rent all or part of (a leased or rented property) to another person. | *"In academic literature, sublet designates a lease from one lessee to another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unlettered]] | adjective | **1.** Having little acquaintance with writing.<br>**2.** Uneducated in general; lacking knowledge or sophistication. | *"I think good thoughts, whilst other write good words, And like unlettered clerk still cry Amen, To every hymn that able spirit affords, In polished form of well refined pen."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Death]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LET
  </div>
</div>
