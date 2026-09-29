---
status: unread
type: root_dashboard
---
# Dashboard — pale
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pale-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to be pale”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A beam of bright morning sunlight cutting through shadows to illuminate a room.</span>
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

The root **pale** means to be pale. It refers to the action of bing and carrying out this process. In English, this root forms words such as *whitish*, *palely*, *paleness*, and *palish*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to be pale
> The root **pale** means to be pale. It refers to the action of bing and carrying out this process. In English, this root forms words such as *whitish*, *palely*, *paleness*, and *palish*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To be pale</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A beam of bright morning sunlight cutting through shadows to illuminate a room.</mark>
> - **Everyday Connection**: Think of familiar words like *whitish* and *palely*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pale** comes from a Latin word that means *"to be pale"*.
  - At its core, it describes the action of be pale.

- **The Big Picture Idea**:
  - Picture a beam of bright morning sunlight cutting through shadows to illuminate a room.
  - Whenever you see **pale** in an English word, think of **to be pale**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to be pale).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Whitish**: An everyday English word showing the root's idea of *to be pale*.
  - **Palely**: In a pale, wan, faint, or dim manner.
  - **Paleness**: The quality, condition, or state of being pale.
  - **Palish**: Somewhat pale.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pale</mark>, think of <mark class="hl-def">to be pale</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root manifests across three primary morphological conduits:
>
> - **The Gallicized Nominal / Adjectival Base `pale-` (via Old French *pale* < Latin *pallidus*):**
>   - Adjective: *pale*, *palish*
>   - Adverb: *palely*
>   - Noun: *paleness*
>   - Idiomatic compound: *pale-hearted* (cowardly, bloodless)
> - **The Direct Latin Learned Base `pall-` (*pallidus*, *pallor*):**
>   - Stative noun: *pallor* (the physical condition of bloodlessness)
>   - Adjective: *pallid* (unhealthily pale)
>   - Adverb / Nouns: *pallidly*, *pallidness*, *pallidity*
>   - Inchoative stem `pallēsc-` (*pallēscō, pallēscere*): *pallescent*, *pallescence*
> - **The Intensified Causative French Stem `appall-` (*apalir* < *ad-* + *palir*):**
>   - Verb: *appall* (American), *appal* (British)
>   - Participle / Adjective: *appalling*, *appallingly*
>   - Privative / Resilient compound: *unappalled* (unshaken by horror)

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
> The root spans four distinct semantic registers:
>
> 1. **Visual Optics & Luminescence:**
>    - Faint, dilute, or desaturated light (*a pale winter dawn*, *the pale crescent of the moon*).
>    - Muted pastels and desaturated colors (*pale blue*, *pale yellow*).
> 2. **Clinical Pathology & Hematology:**
>    - Cutaneous vasoconstriction caused by hemorrhagic shock, arterial hypoperfusion, severe anemia, or terminal illness (*ashen pallor*, *pallid extremities*).
> 3. **Emotional Shock & Somatic Panic:**
>    - The sudden physical reflex of blood rushing inward from the face during fear or grief (*turning pale as a ghost*, *a face stricken with pallor*).
> 4. **Moral Indignation & Existential Horror:**
>    - Actions, atrocities, or systemic abuses that violently insult human decency and provoke horrified recoil (*an appalling human rights catastrophe*, *appalled by the negligence*).

---

## 🔀 4. Prefix & Combining Dynamics on pale

### Prefix Dynamics
- **`ad-` (assimilated to `ap-`, "to, toward, intensive"):** Attaching to Old French *palir* to form *apalir* $\to$ *appall* (literally, to drive into complete pallor; to strike with overwhelming dread).
- **`un-` ("not, reversal"):** Negating the shock of terror $\to$ *unappalled* (fearless, unflinching, refusing to blanch before danger).

### Suffix Dynamics
- **`-or` (Latin Abstract Stative Noun):** Physical state of being pale $\to$ *pallor*.
- **`-id` (Latin Stative Adjective):** Characterized by unnatural whiteness $\to$ *pallid*.
- **`-escent` / `-escence` (Inchoative Process):** Beginning or progressing toward paleness $\to$ *pallescent*, *pallescence*.
- **`-ity` / `-ness` (Abstract Noun of Quality):** *pallidity*, *pallidness*, *paleness*.
- **`-ish` (Diminutive / Approximative):** Somewhat pale $\to$ *palish*.
- **`-ing` / `-ingly` (Participle / Evaluative Manner):** Causing shock $\to$ *appalling*, *appallingly*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Emergency Medicine & Critical Care:** Clinicians evaluate *conjunctival pallor* and *palmar pallor* as rapid bedside markers for acute hypovolemia, severe hemoglobin deficiency, and septic shock.
> - **Human Rights & International Law:** Diplomatic cables, NGO white papers, and war crimes tribunals characterize severe atrocities, starvation blockades, and torture facilities as *appalling violations* of the Geneva Conventions.
> - **Gothic & Romantic Literature:** Authors such as Edgar Allan Poe, Mary Shelley, and Samuel Taylor Coleridge employed *pallor*, *pallid*, and *appall* as central atmospheric anchors to evoke spectral apparitions, consumption, and mortal dread (*"his pallid brow"*, *"the appalling silence"*).
> - **Fine Arts & Color Theory:** Portrait artists modulate *pallor* through titanium white, ochre, and viridian glazes to convey death, divine transcendence, or melancholy in neoclassical and pre-Raphaelite painting.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[empale]] | verb | **1.** Pierce with a sharp stake or point. | *"Attend me where I wheel; Strike not a stroke, but keep yourselves in breath; And when I have the bloody Hector found, Empale him with your weapons round about; In fellest manner execute your arms."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impale]] | verb | **1.** Pierce with a sharp stake or point.<br>**2.** Kill by piercing with a spear or sharp pole. | *"Did I impale him with the regal crown?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impalement]] | noun | **1.** The act of piercing with a sharpened stake as a form of punishment or torture. | *"In academic literature, impalement designates the act of piercing with a sharpened stake as a form of punishment or torture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pale]] | noun | **1.** A wooden strip forming part of a fence.<br>**2.** Turn pale, as if in fear. | *"What was’t That moved pale Cassius to conspire?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[paleacrita]] | noun | **1.** Geometrid moths. | *"In academic literature, paleacrita designates geometrid moths."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleencephalon]] | noun | **1.** The more primitive parts of the brain phylogenetically; most structures other than the cerebral cortex. | *"In academic literature, paleencephalon designates the more primitive parts of the brain phylogenetically; most structures other than the cerebral cortex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palely]] | adverb | **1.** In a manner lacking interest or vitality.<br>**2.** In a pale manner; without physical or emotional color. | *"The fire glows brightly on the panelled wall and palely on the window-glass, where, through the cold reflection of the blaze, the colder landscape shudders in the wind and a grey mist creeps along, the only traveller besides the waste of clouds."* — Charles Dickens, *Bleak House* |
| [[paleness]] | noun | **1.** Unnatural lack of color in the skin (as from bruising or sickness or emotional distress).<br>**2.** The property of having a naturally light complexion. | *"I wish you to go elsewhere,” she commanded, a paleness of face invisible to the eye being suggested by the trembling words."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[paleo-american]] | noun | **1.** A member of the paleo-american peoples who were the earliest human inhabitants of north america and south america during the late pleistocene epoch. | *"In academic literature, paleo-american designates a member of the paleo-american peoples who were the earliest human inhabitants of north america and south america during the late pleistocene epoch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleo-amerind]] | noun | **1.** A member of the paleo-american peoples who were the earliest human inhabitants of north america and south america during the late pleistocene epoch. | *"In academic literature, paleo-amerind designates a member of the paleo-american peoples who were the earliest human inhabitants of north america and south america during the late pleistocene epoch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleo-indian]] | noun | **1.** A member of the paleo-american peoples who were the earliest human inhabitants of north america and south america during the late pleistocene epoch. | *"In academic literature, paleo-indian designates a member of the paleo-american peoples who were the earliest human inhabitants of north america and south america during the late pleistocene epoch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleoanthropological]] | adjective | **1.** Of or concerned with the scientific study of human fossils. | *"In academic literature, paleoanthropological designates of or concerned with the scientific study of human fossils."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleoanthropology]] | noun | **1.** The scientific study of human fossils. | *"In academic literature, paleoanthropology designates the scientific study of human fossils."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleobiology]] | noun | **1.** A branch of paleontology that deals with the origin and growth and structure of fossil animals and plants as living organisms. | *"In academic literature, paleobiology designates a branch of paleontology that deals with the origin and growth and structure of fossil animals and plants as living organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleobotany]] | noun | **1.** The study of fossil plants. | *"In academic literature, paleobotany designates the study of fossil plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleocene]] | noun | **1.** From 63 million to 58 million years ago; appearance of birds and earliest mammals. | *"In academic literature, paleocene designates from 63 million to 58 million years ago; appearance of birds and earliest mammals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleocerebellum]] | noun | **1.** The anterior lobe of the cerebellum which was one of the earliest parts of the hindbrain to develop in mammals. | *"In academic literature, paleocerebellum designates the anterior lobe of the cerebellum which was one of the earliest parts of the hindbrain to develop in mammals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleoclimatology]] | noun | **1.** The study of the climate of past ages. | *"In academic literature, paleoclimatology designates the study of the climate of past ages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleocortex]] | noun | **1.** The olfactory cortex of the cerebrum. | *"In academic literature, paleocortex designates the olfactory cortex of the cerebrum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleocortical]] | adjective | **1.** Of or relating to the olfactory cortex of the cerebrum. | *"In academic literature, paleocortical designates of or relating to the olfactory cortex of the cerebrum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleodendrology]] | noun | **1.** The branch of paleobotany that studies fossil trees. | *"In academic literature, paleodendrology designates the branch of paleobotany that studies fossil trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleoecology]] | noun | **1.** The branch of ecology that studies ancient ecology. | *"In academic literature, paleoecology designates the branch of ecology that studies ancient ecology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleoencephalon]] | noun | **1.** The more primitive parts of the brain phylogenetically; most structures other than the cerebral cortex. | *"In academic literature, paleoencephalon designates the more primitive parts of the brain phylogenetically; most structures other than the cerebral cortex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleoethnography]] | noun | **1.** The ethnography of paleolithic humans. | *"In academic literature, paleoethnography designates the ethnography of paleolithic humans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleogeography]] | noun | **1.** The study of the geography of ancient times or ancient epochs. | *"In academic literature, paleogeography designates the study of the geography of ancient times or ancient epochs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleogeology]] | noun | **1.** The study of geologic features once at the surface of the earth but now buried beneath rocks. | *"In academic literature, paleogeology designates the study of geologic features once at the surface of the earth but now buried beneath rocks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleographer]] | noun | **1.** An archeologist skilled in paleography. | *"In academic literature, paleographer designates an archeologist skilled in paleography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleographist]] | noun | **1.** An archeologist skilled in paleography. | *"In academic literature, paleographist designates an archeologist skilled in paleography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleography]] | noun | **1.** The study of ancient forms of writing (and the deciphering of them). | *"In academic literature, paleography designates the study of ancient forms of writing (and the deciphering of them)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleolith]] | noun | **1.** A stone tool from the paleolithic age. | *"In academic literature, paleolith designates a stone tool from the paleolithic age."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleolithic]] | noun | **1.** Second part of the stone age beginning about 750,00 to 500,000 years bc and lasting until the end of the last ice age about 8,500 years bc.<br>**2.** Of or relating to the second period of the stone age (following the eolithic). | *"I have lived through the ages known to-day among the scientists as the Paleolithic, the Neolithic, and the Bronze."* — Jack London, *The Jacket (The Star-Rover)* |
| [[paleology]] | noun | **1.** The study of (especially prehistoric) antiquities. | *"In academic literature, paleology designates the study of (especially prehistoric) antiquities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleomammalogy]] | noun | **1.** The paleobiology of ancient mammals. | *"In academic literature, paleomammalogy designates the paleobiology of ancient mammals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleontological]] | adjective | **1.** Of or relating to paleontology. | *"In academic literature, paleontological designates of or relating to paleontology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleontologist]] | noun | **1.** A specialist in paleontology. | *"In academic literature, paleontologist designates a specialist in paleontology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleontology]] | noun | **1.** The earth science that studies fossil organisms and related remains. | *"In academic literature, paleontology designates the earth science that studies fossil organisms and related remains."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleopathology]] | noun | **1.** The study of disease of former times (as inferred from fossil evidence). | *"In academic literature, paleopathology designates the study of disease of former times (as inferred from fossil evidence)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleornithology]] | noun | **1.** The paleobiology of birds. | *"In academic literature, paleornithology designates the paleobiology of birds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleostriatum]] | noun | **1.** The inner pale yellow part of the lenticular nucleus. | *"In academic literature, paleostriatum designates the inner pale yellow part of the lenticular nucleus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleozoic]] | noun | **1.** From 544 million to about 230 million years ago.<br>**2.** Of or relating to or denoting the paleozoic era. | *"Our leader, Professor Paleozoic, ordinarily existed in a sort of transition state between the primary and tertiary formations."* — W. E. Webb, *Buffalo Land* |
| [[paleozoology]] | noun | **1.** The study of fossil animals. | *"In academic literature, paleozoology designates the study of fossil animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palermo]] | noun | **1.** The capital of sicily; located in northwestern sicily; an important port for 3000 years. | *"Lecoeur, _Esquisses du Bocage Normand_, ii. 8; A. de Nore, _Coutumes, Mythes et Traditions des Provinces de France_, p. 150; Gennaro Finamore, _Credenze, Usi e Costumi Abruzzesi_ (Palermo, 1890), p. 157. [534] M."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[palestine]] | noun | **1.** A former british mandate on the east coast of the mediterranean; divided between jordan and israel in 1948.<br>**2.** An ancient country in southwestern asia on the east coast of the mediterranean sea; a place of pilgrimage for christianity and islam and judaism. | *"Arthur, that great forerunner of thy blood, Richard, that robb’d the lion of his heart And fought the holy wars in Palestine, By this brave duke came early to his grave."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[palestinian]] | noun | **1.** A descendant of the arabs who inhabited palestine.<br>**2.** Of or relating to the area of palestine and its inhabitants. | *"In academic literature, palestinian designates a descendant of the arabs who inhabited palestine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palestra]] | noun | **1.** A public place in ancient greece or rome devoted to the training of wrestlers and other athletes. | *"In academic literature, palestra designates a public place in ancient greece or rome devoted to the training of wrestlers and other athletes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palestrina]] | noun | **1.** Italian composer (1526-1594). | *"She professed herself delighted to be left at peace in Florence; she had locked up her apartment and sent her cook home to Palestrina."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[paletiology]] | noun | **1.** The explanation of past events in terms of scientific causes (as geological causes). | *"In academic literature, paletiology designates the explanation of past events in terms of scientific causes (as geological causes)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palette]] | noun | **1.** The range of colour characteristic of a particular artist or painting or school of art.<br>**2.** Board that provides a flat surface on which artists mix paints and the range of colors used. | *"The translation of a few pages of German occupied an hour; then I got my palette and pencils, and fell to the more soothing, because easier occupation, of completing Rosamond Oliver’s miniature."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Light]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PALE
  </div>
</div>
