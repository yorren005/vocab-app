---
status: unread
type: root_dashboard
---
# Dashboard — nat
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">nat-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to be born”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A young seed sprouting vigorously into green leaves under the warm sun.</span>
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

The root **nat** means to be born. It refers to the action of bing and carrying out this process. In English, this root forms words such as *nation*, *native*, *nature*, and *natural*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to be born
> The root **nat** means to be born. It refers to the action of bing and carrying out this process. In English, this root forms words such as *nation*, *native*, *nature*, and *natural*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To be born</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A young seed sprouting vigorously into green leaves under the warm sun.</mark>
> - **Everyday Connection**: Think of familiar words like *nation* and *native*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **nat** comes from a Latin word that means *"to be born"*.
  - At its core, it describes the action of be born.

- **The Big Picture Idea**:
  - Picture a young seed sprouting vigorously into green leaves under the warm sun.
  - Whenever you see **nat** in an English word, think of **to be born**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to be born).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Nation**: A large body of people united by common descent, history, culture, or language, inhabiting a designated country or territory.
  - **Native**: Associated with the place or circumstances of one's birth.
  - **Nature**: The physical world collectively, including plants, animals, landscapes, and natural phenomena.
  - **Natural**: Existing in or caused by nature.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">nat</mark>, think of <mark class="hl-def">to be born</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **nat** operates through several distinct morphological stems:
> - **Primary Participial Base `nat-` (*nātus* "born"):**
>   - Clinical & Temporal: *natal*, *natality*, *prenatal*, *postnatal*, *antenatal*, *perinatal*, *neonatal*, *neonate*
>   - Relational Kinship: *innate*, *cognate*, *cognation*, *agnate*, *agnation*, *enate*, *enation*, *connate*, *adnate*
> - **Constitutional / Physical World Base `natur-` (*nātūra*):**
>   - *nature*, *natural*, *naturally*, *naturalness*, *unnatural*, *supernatural*, *preternatural*, *naturalist*, *naturalism*, *naturalize*, *naturalization*, *denature*, *denaturation*
> - **Sovereign Community Base `nation-` (*nātiō*):**
>   - *nation*, *national*, *nationally*, *nationality*, *nationalism*, *nationalist*, *nationalize*, *nationalization*, *international*, *internationally*, *internationalism*, *transnational*, *supranational*, *multinational*
> - **Indigenous / Birthplace Base `nativ-` (*nātīvus*):**
>   - *native*, *nativeness*, *nativity*, *nativism*, *nativist*
> - **Romance Vernacular Route (`naïf` / `naiv-`):**
>   - Old French *naïf* ("natural, simple, uncorrupted") $\to$ *naive*, *naïve*, *naivety*, *naïveté*

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
> The root manifests across five major domains:
> - **Obstetrics, Gestation & Pediatrics:** The physiological milestones before, during, and immediately following human birth (*natal*, *prenatal*, *perinatal*, *neonatal*).
> - **Natural Philosophy & Environmental Cosmos:** The unmanufactured physical world (*nature*, *natural*), phenomena transcending physical laws (*supernatural*, *preternatural*), and scientific inquiry (*naturalist*).
> - **Geopolitics & International Law:** Sovereign political entities (*nation*), state affiliation (*nationality*), cross-border treaties (*international*), and sovereign bodies transcending state boundaries (*supranational*).
> - **Innate Biology & Kinship:** Faculties inborn from birth (*innate*), words or people sharing linguistic/biological roots (*cognate*), patrilineal kin (*agnate*), and fused plant morphology (*connate*, *adnate*).
> - **Artless Simplicity & Naivety:** Pure, uncorrupted naturalness turning into credulous inexperience (*naive*, *naïveté*).

---

## 🔀 4. Prefix & Combining Dynamics on nat

### Prefix Dynamics
- **`pre-` / `ante-` (Before):** Before birth $\to$ *prenatal*, *antenatal*.
- **`post-` (After):** After birth $\to$ *postnatal*.
- **`peri-` (Around):** Surrounding the time of birth $\to$ *perinatal*.
- **`neo-` (New):** Newly born $\to$ *neonatal*, *neonate*.
- **`in-` (In / Within):** Inborn, present from birth $\to$ *innate*.
- **`con-` / `com-` (Together):** Born together; related by blood or language $\to$ *cognate*, *connate*.
- **`ad-` (Toward / Upon):** Attached from origin $\to$ *adnate*.
- **`de-` (Away / Reverse):** Stripping away the natural state $\to$ *denature*.
- **`inter-` / `trans-` / `supra-` (Relational):** Across nations $\to$ *international*, *transnational*, *supranational*.
- **`super-` / `preter-` (Beyond):** Beyond ordinary natural reality $\to$ *supernatural*, *preternatural*.

### Suffix Dynamics
- **`-ure` (Resultant Quality / Essence):** *nātus* $\to$ *nature*.
- **`-ive` (Relational Attribute):** *nātus* $\to$ *native*.
- **`-ion` (Collective Body):** *nātus* $\to$ *nation*.
- **`-ize` (Causative Verb):** *naturalize*, *nationalize*, *denature*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Obstetrics, Maternal-Fetal Medicine & Neonatology:** Neonatal Intensive Care Units (NICU); management of high-risk prenatal screenings and perinatal asphyxia.
> - **Constitutional Law & Citizenship Doctrines:** *Jus soli* ("right of the soil", birthright citizenship) versus *jus sanguinis* ("right of blood", lineage citizenship); statutory *naturalization* proceedings.
> - **International Relations & Global Governance:** The United Nations (UN); treaties governing international territorial borders, extradition, and supranational trade alliances (EU, WTO).
> - **Biochemistry & Molecular Biophysics:** Denaturation of double-stranded DNA during polymerase chain reaction (PCR); thermal and chemical protein unfolding.
> - **Epistemology & Cognitive Science:** The rationalist thesis of *innate ideas* (Descartes, Leibniz, Chomsky’s Universal Grammar) versus the empiricist *tabula rasa* (Locke).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adnate]] | adjective | **1.** Of unlike parts or organs; growing closely attached. | *"In academic literature, adnate designates of unlike parts or organs; growing closely attached."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agnate]] | noun | **1.** One related on the father's side.<br>**2.** Related on the father's side. | *"In academic literature, agnate designates one related on the father's side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agnatic]] | adjective | **1.** Related on the father's side. | *"In academic literature, agnatic designates related on the father's side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agnation]] | noun | **1.** Line of descent traced through the paternal side of the family. | *"In academic literature, agnation designates line of descent traced through the paternal side of the family."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antenatal]] | adjective | **1.** Occurring or existing before birth. | *"In academic literature, antenatal designates occurring or existing before birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arsenate]] | noun | **1.** A salt or ester of arsenic acid. | *"Also, 2PbO + SO_{3} ➡ PbSO_{4}.PbO (basic sulphate). _Arsenides_ are partly left as the corresponding oxides, whilst some As_{4}O_{6} is evolved, and some basic arsenate generally remains."* — Donald M. Levy, *Modern Copper Smelting* |
| [[connate]] | adjective | **1.** Of similar parts or organs; closely joined or united.<br>**2.** Related in nature. | *"In academic literature, connate designates of similar parts or organs; closely joined or united."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[connatural]] | adjective | **1.** Similar in nature; - john milton.<br>**2.** Normally existing at birth. | *"But is there yet no other way, besides These painful passages, how we may come To Death, and mix with our connatural dust?"* — John Milton, *Paradise Lost* |
| [[denationalisation]] | noun | **1.** Changing something from state to private ownership or control. | *"In academic literature, denationalisation designates changing something from state to private ownership or control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denationalise]] | verb | **1.** Put under private control or ownership. | *"In academic literature, denationalise designates put under private control or ownership."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denationalization]] | noun | **1.** Changing something from state to private ownership or control. | *"In academic literature, denationalization designates changing something from state to private ownership or control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denationalize]] | verb | **1.** Put under private control or ownership. | *"In academic literature, denationalize designates put under private control or ownership."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denaturalise]] | verb | **1.** Make less natural or unnatural.<br>**2.** Strip of the rights and duties of citizenship. | *"In academic literature, denaturalise designates make less natural or unnatural."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denaturalize]] | verb | **1.** Make less natural or unnatural.<br>**2.** Strip of the rights and duties of citizenship. | *"In academic literature, denaturalize designates make less natural or unnatural."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denaturant]] | noun | **1.** Any substance that serves as a denaturing agent. | *"In academic literature, denaturant designates any substance that serves as a denaturing agent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denature]] | verb | **1.** Add nonfissionable material to (fissionable material) so as to make unsuitable for use in an atomic bomb.<br>**2.** Modify (as a native protein) especially by heat, acid, alkali, or ultraviolet radiation so that all of the original properties are removed or diminished. | *"In academic literature, denature designates add nonfissionable material to (fissionable material) so as to make unsuitable for use in an atomic bomb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denatured]] | verb | **1.** Add nonfissionable material to (fissionable material) so as to make unsuitable for use in an atomic bomb.<br>**2.** Modify (as a native protein) especially by heat, acid, alkali, or ultraviolet radiation so that all of the original properties are removed or diminished. | *"In academic literature, denatured designates add nonfissionable material to (fissionable material) so as to make unsuitable for use in an atomic bomb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denaturised]] | adjective | **1.** Changed in nature or natural quality. | *"In academic literature, denaturised designates changed in nature or natural quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denaturized]] | adjective | **1.** Changed in nature or natural quality. | *"In academic literature, denaturized designates changed in nature or natural quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enate]] | noun | **1.** One related on the mother's side.<br>**2.** Related on the mother's side. | *"In academic literature, enate designates one related on the mother's side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enatic]] | adjective | **1.** Related on the mother's side. | *"In academic literature, enatic designates related on the mother's side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enation]] | noun | **1.** Line of descent traced through the maternal side of the family.<br>**2.** A natural projection or outgrowth from a plant body or organ. | *"In academic literature, enation designates line of descent traced through the maternal side of the family."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[innate]] | adjective | **1.** Not established by conditioning or learning.<br>**2.** Being talented through inherited qualities. | *"That innate love of melody, which she had inherited from her ballad-singing mother, gave the simplest music a power over her which could well-nigh drag her heart out of her bosom at times."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[innately]] | adverb | **1.** In an innate manner. | *"There had been something so innately characteristic in this look, that all the dusky years, and the burden of unfit calamity which had fallen upon him, did not suffice utterly to destroy it."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[innateness]] | noun | **1.** The quality of being innate. | *"In academic literature, innateness designates the quality of being innate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[international]] | noun | **1.** Any of several international socialist organizations.<br>**2.** Concerning or belonging to all or at least two or more nations. | *"In this contest silver had proved itself a few centuries ago to be on the whole the fittest medium of exchange for most purposes, though gold was at the same time in use in larger transactions and in international trade. § 5. #Gold-using countries#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[internationale]] | noun | **1.** A revolutionary socialist anthem. | *"In academic literature, internationale designates a revolutionary socialist anthem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationalisation]] | noun | **1.** The act of bringing something under international control. | *"In academic literature, internationalisation designates the act of bringing something under international control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationalise]] | verb | **1.** Put under international control.<br>**2.** Make international in character. | *"In academic literature, internationalise designates put under international control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationalism]] | noun | **1.** The doctrine that nations should cooperate because their common interests are more important than their differences.<br>**2.** Quality of being international in scope. | *"In academic literature, internationalism designates the doctrine that nations should cooperate because their common interests are more important than their differences."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationalist]] | noun | **1.** An advocate of internationalism.<br>**2.** A member of a socialist or communist international. | *"In academic literature, internationalist designates an advocate of internationalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationalistic]] | adjective | **1.** Influenced by or advocating internationalism. | *"In academic literature, internationalistic designates influenced by or advocating internationalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationality]] | noun | **1.** Quality of being international in scope. | *"In academic literature, internationality designates quality of being international in scope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationalization]] | noun | **1.** The act of bringing something under international control. | *"In academic literature, internationalization designates the act of bringing something under international control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationalize]] | verb | **1.** Put under international control.<br>**2.** Make international in character. | *"In academic literature, internationalize designates put under international control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationally]] | adverb | **1.** Throughout the world. | *"That is internationally and universally applicable."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[natal]] | noun | **1.** A region of eastern south africa on the indian ocean.<br>**2.** A port city in northeastern brazil. | *"Canon Henry Callaway, _Nursery Tales, Traditions, and Histories of the Zulus_ (Natal and London, 1868), p. 182, note 20."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[natality]] | noun | **1.** The ratio of live births in an area to the population of that area; expressed per 1000 population per year. | *"In academic literature, natality designates the ratio of live births in an area to the population of that area; expressed per 1000 population per year."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[natantia]] | noun | **1.** Shrimp; prawns; etc. | *"In academic literature, natantia designates shrimp; prawns; etc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[natation]] | noun | **1.** The act of someone who floats on the water. | *"In academic literature, natation designates the act of someone who floats on the water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[natator]] | noun | **1.** A person who travels through the water by swimming. | *"In academic literature, natator designates a person who travels through the water by swimming."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[natatorium]] | noun | **1.** Pool that provides a facility for swimming. | *"In academic literature, natatorium designates pool that provides a facility for swimming."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[natchez]] | noun | **1.** A town in southwest mississippi on the mississippi river. | *"Howe--The Harvey Hospital--At Natchez and Vicksburg--Other appeals for Northern hospitals--At Huntsville with Mrs."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[nates]] | noun | **1.** The fleshy part of the human body that you sit on. | *"Spiritual development germi- 66:12 nates not from seed sown in the soil of material hopes, but when these decay, Love propagates anew the higher joys of Spirit, which have no taint of earth."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[naticidae]] | noun | **1.** Moonshells. | *"In academic literature, naticidae designates moonshells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nation]] | noun | **1.** A politically organized body of people under a single government.<br>**2.** The people who live in a nation or country. | *"If you could find out a country where but women were that had received so much shame, you might begin an impudent nation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[national]] | noun | **1.** A person who owes allegiance to that nation.<br>**2.** Of or relating to or belonging to a nation or country. | *"Sir Leicester in a great chair looks at the file and appears to have a stately liking for the legal repetitions and prolixities as ranging among the national bulwarks."* — Charles Dickens, *Bleak House* |
| [[nationalisation]] | noun | **1.** The action of forming or becoming a nation.<br>**2.** The action of rendering national in character. | *"In academic literature, nationalisation designates the action of forming or becoming a nation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nationalise]] | verb | **1.** Make national in character or scope.<br>**2.** Put under state control or ownership. | *"In academic literature, nationalise designates make national in character or scope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nationalism]] | noun | **1.** Love of country and willingness to sacrifice for it.<br>**2.** The doctrine that your national culture and interests are superior to any other. | *"Besides being advocates of bold action, this section also represented nationalism, which made them still more one-sided in the dispute."* — graf Leo Tolstoy, *War and Peace* |
| [[nationalist]] | noun | **1.** One who loves and defends his or her country.<br>**2.** An advocate of national independence of or a strong national government. | *"Great nationalist meeting in Borris-in-Ossory."* — James Joyce, *Ulysses* |
| [[nationalistic]] | adjective | **1.** Fanatically patriotic.<br>**2.** Devotion to the interests or culture of a particular nation including promoting the interests of one country over those of others. | *"In academic literature, nationalistic designates fanatically patriotic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nationality]] | noun | **1.** People having common origins or traditions and often comprising a nation.<br>**2.** The status of belonging to a particular nation by birth or naturalization. | *"Moreover, in America, differences in nationality and in speech among immigrant workers often effectively prevent a common feeling of their interests and assertion of them."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[nationalization]] | noun | **1.** The action of forming or becoming a nation.<br>**2.** The action of rendering national in character. | *"In academic literature, nationalization designates the action of forming or becoming a nation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nationalize]] | verb | **1.** Put under state control or ownership.<br>**2.** Make national in character or scope. | *"He is our citizen, nationalized, owing us allegiance and we owing him protection."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[nationally]] | adverb | **1.** With regard to a nation taken as a whole.<br>**2.** Extending throughout an entire nation. | *"The party that would succeed nationally must triumph in states—triumph in the state elections, must be prepared by municipal success."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[nationhood]] | noun | **1.** The state of being a nation. | *"In academic literature, nationhood designates the state of being a nation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nationwide]] | adjective | **1.** Occurring or extending throughout a country or nation.<br>**2.** Extending throughout an entire nation. | *"Extensive and ongoing reductions-in-force among military and civil service personnel accompanied a nationwide conversion from war to civilian economies."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[native]] | noun | **1.** An indigenous person who was born in a particular place.<br>**2.** A person born in a particular place or country. | *"The mightiest space in fortune nature brings To join like likes, and kiss like native things."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[native-born]] | adjective | **1.** Belonging to a place by birth. | *"In academic literature, native-born designates belonging to a place by birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nativeness]] | noun | **1.** The quality of belonging to or being connected with a certain place or region by virtue of birth or origin. | *"In academic literature, nativeness designates the quality of belonging to or being connected with a certain place or region by virtue of birth or origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nativism]] | noun | **1.** The policy of perpetuating native cultures (in opposition to acculturation).<br>**2.** (philosophy) the philosophical theory that some ideas are innate. | *"Thereafter for some years, with the exception of a small vote in Pennsylvania and New York, Nativism disappeared."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[nativist]] | noun | **1.** A philosopher who subscribes to nativism.<br>**2.** Advocating the perpetuation of native societies; ; - c.k.kluckhohn. | *"In academic literature, nativist designates a philosopher who subscribes to nativism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nativistic]] | adjective | **1.** Advocating the perpetuation of native societies; ; - c.k.kluckhohn.<br>**2.** Of or relating to or advocating nativism. | *"In academic literature, nativistic designates advocating the perpetuation of native societies; ; - c.k.kluckhohn."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nativity]] | noun | **1.** The event of being born.<br>**2.** The theological doctrine that jesus christ had no human father; christians believe that jesus's birth fulfilled old testament prophecies and was attended by miracles; the nativity is celebrated at christmas. | *"Nativity once in the main of light, Crawls to maturity, wherewith being crowned, Crooked eclipses ’gainst his glory fight, And Time that gave, doth now his gift confound."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nato]] | noun | **1.** An international organization created in 1949 by the north atlantic treaty for purposes of collective security. | *"Military personnel and civilians of all nations involved that were killed or wounded on both sides in those two wars and in other clashes between the US/NATO countries and the USSR have been estimated to be in the hundreds of thousands."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[natriuresis]] | noun | **1.** The presence of abnormally large amounts of sodium in the urine. | *"In academic literature, natriuresis designates the presence of abnormally large amounts of sodium in the urine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[natriuretic]] | adjective | **1.** Of or relating to natriuresis. | *"In academic literature, natriuretic designates of or relating to natriuresis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[natrix]] | noun | **1.** Water snakes; a cosmopolitan genus. | *"In academic literature, natrix designates water snakes; a cosmopolitan genus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[natrolite]] | noun | **1.** A group of minerals of the zeolite family consisting of a hydrous silicate of sodium and aluminum. | *"In academic literature, natrolite designates a group of minerals of the zeolite family consisting of a hydrous silicate of sodium and aluminum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[natta]] | noun | **1.** Italian chemist noted for work on polymers (1903-1979). | *"In academic literature, natta designates italian chemist noted for work on polymers (1903-1979)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[natter]] | verb | **1.** Talk socially without exchanging too much information. | *"In academic literature, natter designates talk socially without exchanging too much information."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[natterjack]] | noun | **1.** Common brownish-yellow short-legged toad of western europe; runs rather than hops. | *"In academic literature, natterjack designates common brownish-yellow short-legged toad of western europe; runs rather than hops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nattily]] | adverb | **1.** In a natty manner; with smartness. | *"In academic literature, nattily designates in a natty manner; with smartness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nattiness]] | noun | **1.** Stylishness as evidenced by a smart appearance. | *"In academic literature, nattiness designates stylishness as evidenced by a smart appearance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[natty]] | adjective | **1.** Marked by up-to-dateness in dress and manners. | *"I just laid back and laughed, not out loud, you understand, but silent, like Natty Bumppo in the Leatherstocking Tales."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[natural]] | noun | **1.** Someone regarded as certain to succeed.<br>**2.** A notation cancelling a previous sharp or flat. | *"COUNTESS. ’Tis past, my liege, And I beseech your majesty to make it Natural rebellion, done i’ the blaze of youth, When oil and fire, too strong for reason’s force, O’erbears it and burns on."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[naturalisation]] | noun | **1.** The quality of being brought into conformity with nature.<br>**2.** The proceeding whereby a foreigner is granted citizenship. | *"In academic literature, naturalisation designates the quality of being brought into conformity with nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[naturalise]] | verb | **1.** Adopt to another place.<br>**2.** Make more natural or lifelike. | *"Some who are cut off from all these proposals are become naturalised to the place, knowing they cannot subsist in any other situation."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |
| [[naturalised]] | verb | **1.** Adopt to another place.<br>**2.** Make more natural or lifelike. | *"Some who are cut off from all these proposals are become naturalised to the place, knowing they cannot subsist in any other situation."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |
| [[naturalism]] | noun | **1.** (philosophy) the doctrine that the world can be understood in scientific terms without recourse to spiritual or supernatural explanations.<br>**2.** An artistic movement in 19th century france; artists and writers strove for detailed realistic and factual description. | *"Naturalism in England," of Dr."* — Sydney Waterlow, *Shelley* |
| [[naturalist]] | noun | **1.** An advocate of the doctrine that the world can be understood in scientific terms.<br>**2.** A biologist knowledgeable about natural history (especially botany and zoology). | *"Maclagan had been originally an army surgeon, but had been long settled in general practice in Berwick in succession to his father-in-law, the eminent naturalist, Dr."* — John Cairns, *Principal Cairns* |
| [[naturalistic]] | adjective | **1.** Representing what is real; not abstract or ideal. | *"This instance serves to illustrate the salient differences between the Chou and Sung art, the two extremes; the Chou art is symbolical and geometrical, the Sung impressionist and naturalistic."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[naturalization]] | noun | **1.** The quality of being brought into conformity with nature.<br>**2.** The proceeding whereby a foreigner is granted citizenship. | *"The dissimilarity in the rules of naturalization has long been remarked as a fault in our system, and as laying a foundation for intricate and delicate questions."* — Alexander Hamilton, *The Federalist Papers* |
| [[naturalize]] | verb | **1.** Make into a citizen.<br>**2.** Explain with reference to nature. | *"The very improper power would still be retained by each State, of naturalizing aliens in every other State."* — Alexander Hamilton, *The Federalist Papers* |
| [[naturalized]] | verb | **1.** Make into a citizen.<br>**2.** Explain with reference to nature. | *"Whatever shall I do?” Not-at-homes were hardly naturalized in Weatherbury farmhouses, so Liddy suggested—“Say you’re a fright with dust, and can’t come down.” “Yes—that sounds very well,” said Mrs."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[naturally]] | adverb | **1.** As might be expected.<br>**2.** According to nature; by natural means; without artificial help. | *"I have forgot your name; but, sure, that part Was aptly fitted and naturally perform’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[naturalness]] | noun | **1.** The quality of being natural or based on natural principles.<br>**2.** The quality of innocent naivete. | *"Naturalness, generosity, and forbearance are shown throughout not by precept but by example."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[nature]] | noun | **1.** The essential qualities or characteristics by which something is recognized.<br>**2.** A causal agent creating and controlling things in the universe. | *"Nature’s bequest gives nothing but doth lend, And being frank she lends to those are free: Then beauteous niggard why dost thou abuse, The bounteous largess given thee to give?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[naturism]] | noun | **1.** Going without clothes as a social practice. | *"In academic literature, naturism designates going without clothes as a social practice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[naturist]] | noun | **1.** A person who practices nudity for reasons of health or religion. | *"In academic literature, naturist designates a person who practices nudity for reasons of health or religion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[naturistic]] | adjective | **1.** In accord with naturism. | *"In academic literature, naturistic designates in accord with naturism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[naturopath]] | noun | **1.** A therapist who practices naturopathy. | *"In academic literature, naturopath designates a therapist who practices naturopathy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[naturopathy]] | noun | **1.** A method of treating disease using food and exercise and heat to assist the natural healing process. | *"In academic literature, naturopathy designates a method of treating disease using food and exercise and heat to assist the natural healing process."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neonatal]] | adjective | **1.** Relating to or affecting the infant during the first month after birth. | *"In academic literature, neonatal designates relating to or affecting the infant during the first month after birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neonate]] | noun | **1.** A baby from birth to four weeks. | *"In academic literature, neonate designates a baby from birth to four weeks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonnative]] | adjective | **1.** Not being or composed of aborigines.<br>**2.** Of persons born in another area or country than that lived in. | *"In academic literature, nonnative designates not being or composed of aborigines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonnatural]] | adjective | **1.** Existing outside of or not in accordance with nature; -aldous huxley. | *"In academic literature, nonnatural designates existing outside of or not in accordance with nature; -aldous huxley."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postnatal]] | adjective | **1.** Occurring immediately after birth. | *"In academic literature, postnatal designates occurring immediately after birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prenatal]] | adjective | **1.** Occurring or existing before birth. | *"In academic literature, prenatal designates occurring or existing before birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preternatural]] | adjective | **1.** Surpassing the ordinary or normal;  - george will.<br>**2.** Existing outside of or not in accordance with nature; -aldous huxley. | *"None of the old colour had as yet come to her cheek, and its absolute paleness was heightened by the jet black of her gown, till it appeared preternatural."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[preternaturally]] | adverb | **1.** In a supernatural manner. | *"It did not need a preternaturally keen observer to deduce what had happened."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[pronate]] | verb | **1.** Turn the forearm or the hand so that the palm is directed downwards. | *"In academic literature, pronate designates turn the forearm or the hand so that the palm is directed downwards."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pronation]] | noun | **1.** Rotation of the hands and forearms so that the palms face downward. | *"In academic literature, pronation designates rotation of the hands and forearms so that the palms face downward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pronator]] | noun | **1.** A muscle that produces or assists in pronation. | *"In academic literature, pronator designates a muscle that produces or assists in pronation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[senate]] | noun | **1.** Assembly possessing high legislative powers.<br>**2.** The upper house of the united states congress. | *"Our business is not unknown to th’ Senate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[senator]] | noun | **1.** A member of a senate. | *"FIRST SENATOR. [_To the Citizens_.] Hence to your homes, begone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[senatorial]] | adjective | **1.** Of or relating to senators. | *"As a result, union labour possessing an important political significance at the time, the time-serving politicians at Sacramento appointed a senatorial committee of investigation of the state prisons."* — Jack London, *The Jacket (The Star-Rover)* |
| [[senatorship]] | noun | **1.** The office of senator. | *"In academic literature, senatorship designates the office of senator."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supernatant]] | noun | **1.** The clear liquid that lies above a sediment or precipitate.<br>**2.** Of a liquid; floating on the surface above a sediment or precipitate. | *"In academic literature, supernatant designates the clear liquid that lies above a sediment or precipitate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supernatural]] | noun | **1.** Supernatural forces and events and beings collectively.<br>**2.** Not existing in nature or subject to explanation according to natural laws; not physical or material. | *"They say miracles are past; and we have our philosophical persons to make modern and familiar things supernatural and causeless."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supernaturalism]] | noun | **1.** A belief in forces beyond ordinary human understanding.<br>**2.** The quality of being attributed to power that seems to violate or go beyond natural forces. | *"Nor, in some things, does the common, hereditary experience of all mankind fail to bear witness to the supernaturalism of this hue."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[supernaturalist]] | adjective | **1.** Of or relating to supernaturalism. | *"Yet you must admit that the footmark is material.” “The original hound was material enough to tug a man’s throat out, and yet he was diabolical as well.” “I see that you have quite gone over to the supernaturalists."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |
| [[supernaturalistic]] | adjective | **1.** Of or relating to supernaturalism. | *"In academic literature, supernaturalistic designates of or relating to supernaturalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supernaturally]] | adverb | **1.** In a supernatural manner. | *"It was now about nine o’clock, and the room seeming almost supernaturally quiet after these orgies, I began to congratulate myself upon a little plan that had occurred to me just previous to the entrance of the seamen."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[supernaturalness]] | noun | **1.** The quality of being attributed to power that seems to violate or go beyond natural forces. | *"Glancing upwards, he cried: “See! see!” and once more the high tapering flames were beheld with what seemed redoubled supernaturalness in their pallor."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[supranational]] | adjective | **1.** Transcending established national boundaries or spheres of interest. | *"In academic literature, supranational designates transcending established national boundaries or spheres of interest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transnational]] | adjective | **1.** Involving or operating in several nations or nationalities. | *"In academic literature, transnational designates involving or operating in several nations or nationalities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultranationalism]] | noun | **1.** Fanatical patriotism. | *"In academic literature, ultranationalism designates fanatical patriotism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultranationalistic]] | adjective | **1.** Fanatically patriotic. | *"In academic literature, ultranationalistic designates fanatically patriotic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unnatural]] | adjective | **1.** Not in accordance with or determined by nature; contrary to nature.<br>**2.** Not normal; not typical or usual or regular or conforming to a norm. | *"O, I have heard him speak of that same brother, And he did render him the most unnatural That lived amongst men."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unnaturalised]] | adjective | **1.** Not having acquired citizenship. | *"In academic literature, unnaturalised designates not having acquired citizenship."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unnaturalized]] | adjective | **1.** Not having acquired citizenship. | *"In academic literature, unnaturalized designates not having acquired citizenship."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unnaturally]] | adverb | **1.** In an unnatural way.<br>**2.** Not according to nature; not by natural means. | *"Not for myself, Lord Warwick, but my son, Whom I unnaturally shall disinherit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unnaturalness]] | noun | **1.** The quality of being unnatural or not based on natural principles. | *"In academic literature, unnaturalness designates the quality of being unnatural or not based on natural principles."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Life]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · NAT
  </div>
</div>
