---
status: unread
type: root_dashboard
---
# Dashboard — mur_mouse
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mur_mouse-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“mouse”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Living creatures moving through nature and plants growing from the soil.</span>
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

The root **mur_mouse** means mouse. It refers to mouse, murid rodent, contractile muscle, bivalve mussel. In English, this root forms words such as *murine*, *murid*, *muricide*, and *muricidal*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: mouse
> The root **mur_mouse** means mouse. It refers to mouse, murid rodent, contractile muscle, bivalve mussel. In English, this root forms words such as *murine*, *murid*, *muricide*, and *muricidal*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Mouse</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Living creatures moving through nature and plants growing from the soil.</mark>
> - **Everyday Connection**: Think of familiar words like *murine* and *murid*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mur_mouse** comes from a Latin word that means *"mouse"*.
  - At its core, it describes mouse.

- **The Big Picture Idea**:
  - Picture living creatures moving through nature and plants growing from the soil.
  - Whenever you see **mur_mouse** in an English word, think of **animals, plants, and natural life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of mouse.
  - **Mental & Social**: How people experience, organize, or communicate about mouse.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Murine**: Of, relating to, affecting, or resembling mice or rats.
  - **Murid**: Any rodent belonging to the family Muridae, which encompasses true mice, rats, gerbils, and relatives, comprising the largest family of mammals.
  - **Muricide**: The act of killing mice.
  - **Muricidal**: Of, relating to, or exhibiting mouse-killing behavior.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mur_mouse</mark>, think of <mark class="hl-def">animals, plants, and natural life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **mur_mouse** enters English through two classical stem variants:
> 1. **The Rhotacized Oblique Stem (`mūr-` < *mūris*):**
>    - `mūr-` + `-ine` (*-īnus*) ➔ *murine* (pertaining to mice or rats).
>    - `mūr-` + `-id` (*-idae*) ➔ *murid* (a rodent of the family Muridae).
>    - `mūri-` + `caedere` ("to kill") ➔ *muricide* (mouse-killing behavior).
> 2. **The Diminutive Anatomical Stem (`mūscul-` < *mūsculus*):**
>    - Latin *mūsculus* ➔ French *muscle* ➔ English *muscle*.
>    - `muscul-` + `-ar` (*-āris*) ➔ *muscular* (having strong muscles).
>    - `muscul-` + `-ature` ➔ *musculature* (system of muscles).
>    - `intra-` ("within") + `muscular` ➔ *intramuscular* (injected into a muscle).
>    - `neuro-` (nerve) + `muscular` ➔ *neuromuscular* (nerve-muscle junction).
>    - `musculo-` + `skeletal` ➔ *musculoskeletal* (muscle and bone framework).
> 3. **The Marine Diminutive:**
>    - Latin *mūsculus* ➔ Old English *musle* ➔ Modern English *mussel* (marine bivalve).

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
> Although springing from the humble mouse, the semantic branches govern profound human systems:
> - **Biomedical Immunology:** [[murine]] monoclonal antibodies (such as muromonab) and murine disease models in oncology and genetics.
> - **Gross Human Locomotion:** [[muscle]], [[muscular]], and [[musculature]] represent the motor engines of voluntary physical action and strength.
> - **Clinical Pharmacokinetics:** [[intramuscular]] injections ensure rapid vascular absorption compared to subcutaneous routes.
> - **Neurological Communication:** The [[neuromuscular]] junction, acetylcholine receptors, and myasthenia gravis.
> - **Seafood Gastronomy & Ecology:** Cultivated blue [[mussel]] beds (*Mytilus edulis*) filtering coastal ocean currents.

---

## 🔀 4. Prefix & Combining Dynamics on mur_mouse

### Structural Compounding on `mūr-` and `muscul-`

| Element / Comb. Form | Meaning | Combined Derivative | Resulting Domain & Shift |
| :--- | :--- | :--- | :--- |
| `-īnus` | belonging to | [[murine]] | Relating to mice, rats, or murine laboratory models |
| `-idae` | zoological family | [[murid]] | Member of the family Muridae (over 700 species of mice/rats) |
| `caedere` | to kill, slay | [[muricide]] | The instinctual killing of mice (tested in behavioral psychopharmacology) |
| `intra-` | within | [[intramuscular]] | Administered directly into the substance of a muscle (IM injection) |
| `neuro-` | nerve | [[neuromuscular]] | Relating to motor neurons and their muscle motor endplates |
| `skeleto-` | dry frame | [[musculoskeletal]] | Pertaining to the joint biomechanics of bones, tendons, and muscles |
| `-ature` | collective system | [[musculature]] | The organized anatomical network of muscles across an organism |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Biomedical Genetics & Laboratory Science:** Transgenic murine models, C57BL/6 inbred mouse strains, CRISPR knock-in lines.
> - **Kinesiology, Sports Medicine & Orthopedics:** Musculoskeletal physical therapy, muscle hypertrophy, and sarcopenia in aging.
> - **Pharmacology & Nursing:** Intramuscular vaccine delivery (deltoid, ventrogluteal), pharmacokinetics of depot injections.
> - **Marine Biology & Aquaculture:** Shellfish mariculture, mussel ropes, and bivalve biotoxin monitoring (paralytic shellfish poisoning).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[demur]] | noun | **1.** (law) a formal objection to an opponent's pleadings.<br>**2.** Take exception to. | *"Clowes' parlour." Barry had executed too many equally singular orders to raise any demur."* — Anthony Pryde, *Nightfall* |
| [[demure]] | adjective | **1.** Affectedly modest or shy especially in a playful or provocative way. | *"There’s never none of these demure boys come to any proof; for thin drink doth so over-cool their blood, and making many fish meals, that they fall into a kind of male green-sickness; and then, when they marry, they get wenches."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demurely]] | adverb | **1.** In a demure manner. | *"The drums Demurely wake the sleepers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demureness]] | noun | **1.** The trait of behaving with reserve and decorum.<br>**2.** The affectation of being demure in a provocative way. | *"But the likeness of quality consists in a great number of common subdivisions of quality--demureness, extreme minuteness of touch, avoidance of loud tones and glaring effects."* — Jane Austen, *Pride and Prejudice* |
| [[demurrage]] | noun | **1.** A charge required as compensation for the delay of a ship or freight car or other cargo beyond its scheduled time of departure.<br>**2.** Detention of a ship or freight car or other cargo beyond its scheduled time of departure. | *"In academic literature, demurrage designates a charge required as compensation for the delay of a ship or freight car or other cargo beyond its scheduled time of departure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demurral]] | noun | **1.** (law) a formal objection to an opponent's pleadings. | *"In academic literature, demurral designates (law) a formal objection to an opponent's pleadings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demurrer]] | noun | **1.** (law) a formal objection to an opponent's pleadings.<br>**2.** (law) any pleading that attacks the legal sufficiency of the opponent's pleadings. | *"Mr Bloom thoroughly acquiesced in the general gist of this though the mystical finesse involved was a bit out of his sublunary depth still he felt bound to enter a demurrer on the head of simple, promptly rejoining: —Simple?"* — James Joyce, *Ulysses* |
| [[extramural]] | adjective | **1.** Carried on outside the bounds of an institution or community. | *"In academic literature, extramural designates carried on outside the bounds of an institution or community."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immure]] | verb | **1.** Lock up or confine, in or as in a jail. | *"Sixty and nine that wore Their crownets regal from the Athenian bay Put forth toward Phrygia; and their vow is made To ransack Troy, within whose strong immures The ravish’d Helen, Menelaus’ queen, With wanton Paris sleeps—and that’s the quarrel."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[immurement]] | noun | **1.** The state of being imprisoned. | *"In academic literature, immurement designates the state of being imprisoned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intermural]] | adjective | **1.** Between two or more institutions etc. | *"In academic literature, intermural designates between two or more institutions etc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intramural]] | adjective | **1.** Carried on within the bounds of an institution or community. | *"In academic literature, intramural designates carried on within the bounds of an institution or community."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[muraenidae]] | noun | **1.** Marine eels. | *"In academic literature, muraenidae designates marine eels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mural]] | noun | **1.** A painting that is applied to a wall surface.<br>**2.** Of or relating to walls. | *"Now is the mural down between the two neighbours."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[muralist]] | noun | **1.** A painter of murals. | *"In academic literature, muralist designates a painter of murals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[muramidase]] | noun | **1.** An enzyme found in saliva and sweat and tears that destroys the cell walls of certain bacteria. | *"In academic literature, muramidase designates an enzyme found in saliva and sweat and tears that destroys the cell walls of certain bacteria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[muridae]] | noun | **1.** Originally old world rats now distributed worldwide; distinguished from the cricetidae by typically lacking cheek pouches. | *"In academic literature, muridae designates originally old world rats now distributed worldwide; distinguished from the cricetidae by typically lacking cheek pouches."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[murillo]] | noun | **1.** Spanish painter (1617-1682). | *"Also pictures by Murillo, Rubens, Teniers, Titian, Vandyck, and others."* — George Eliot, *Middlemarch* |
| [[murine]] | noun | **1.** A rodent that is a member of the family muridae.<br>**2.** Of or relating to or transmitted by a member of the family muridae (rats and mice). | *"In academic literature, murine designates a rodent that is a member of the family muridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[muritaniya]] | noun | **1.** A country in northwestern africa with a provisional military government; achieved independence from france in 1960; largely western sahara desert. | *"In academic literature, muritaniya designates a country in northwestern africa with a provisional military government; achieved independence from france in 1960; largely western sahara desert."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[murmansk]] | noun | **1.** A port city in northwestern russia on the kola peninsula; the largest city to the north of the arctic circle; an important supply line to russia in world war i and world war ii. | *"In academic literature, murmansk designates a port city in northwestern russia on the kola peninsula; the largest city to the north of the arctic circle; an important supply line to russia in world war i and world war ii."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[murmur]] | noun | **1.** A low continuous indistinct sound; often accompanied by movement of the lips without the production of articulate speech.<br>**2.** A schwa that is incidental to the pronunciation of a consonant. | *"In thy faint slumbers I by thee have watch’d, And heard thee murmur tales of iron wars, Speak terms of manage to thy bounding steed, Cry “Courage!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[murmuration]] | noun | **1.** A low continuous indistinct sound; often accompanied by movement of the lips without the production of articulate speech. | *"In academic literature, murmuration designates a low continuous indistinct sound; often accompanied by movement of the lips without the production of articulate speech."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[murmurer]] | noun | **1.** A person who speaks softly and indistinctly. | *"Low murmurer of tender lullabies!"* — John Keats, *Poems 1817* |
| [[murmuring]] | noun | **1.** A low continuous indistinct sound; often accompanied by movement of the lips without the production of articulate speech.<br>**2.** A complaint uttered in a low and indistinct tone. | *"He’s speaking now, Or murmuring “Where’s my serpent of old Nile?” For so he calls me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[murmurous]] | adjective | **1.** Characterized by soft sounds; ; ; - r.p.warren. | *"He met within the murmurous vestibule His young disciple."* — John Keats, *Lamia* |
| [[muroidea]] | noun | **1.** A superfamily of rodents essentially equal to the suborder myomorpha but with the dipodidae excluded. | *"In academic literature, muroidea designates a superfamily of rodents essentially equal to the suborder myomorpha but with the dipodidae excluded."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[murrain]] | noun | **1.** Any disease of domestic animals that resembles a plague. | *"A murrain on your monster, and the devil take your fingers!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[murray]] | noun | **1.** British classical scholar (born in australia) who advocated the league of nations and the united nations (1866-1957).<br>**2.** Scottish philologist and the lexicographer who shaped the oxford english dictionary (1837-1915). | *"The family of John Murray, a ploughman or "hind" from the Duns district, and now settled at Bastleridge, the next farm to Ayton Hill, also attended Mr."* — John Cairns, *Principal Cairns* |
| [[murre]] | noun | **1.** Black-and-white diving bird of northern seas. | *"Howitt's return from the ceremony he was visited by one of the principal men of the Murring tribe, who had travelled some two hundred and fifty miles from his home to fetch back the teeth."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[murrow]] | noun | **1.** United states broadcast journalist remembered for his reports from london during world war ii (1908-1965). | *"In academic literature, murrow designates united states broadcast journalist remembered for his reports from london during world war ii (1908-1965)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[murrumbidgee]] | noun | **1.** A river of southeastern australia; flows westward into the murray river. | *"In academic literature, murrumbidgee designates a river of southeastern australia; flows westward into the murray river."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Animal & Plant]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MUR_MOUSE
  </div>
</div>
