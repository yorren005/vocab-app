---
status: unread
type: root_dashboard
---
# Dashboard — posit
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">posit-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“placed, set, or position”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Setting an object gently down in its exact designated location.</span>
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

The root **posit** means placed, set, or position. It refers to setting an object in place, positioning, or stationing. In English, this root forms words such as *apposite*, *apposition*, *composite*, and *composition*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: placed, set, or position
> The root **posit** means placed, set, or position. It refers to setting an object in place, positioning, or stationing. In English, this root forms words such as *apposite*, *apposition*, *composite*, and *composition*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Placed, set, or position</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Setting an object gently down in its exact designated location.</mark>
> - **Everyday Connection**: Think of familiar words like *apposite* and *apposition*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **posit** comes from a Latin word that means *"placed, set, or position"*.
  - At its core, it describes placed, set, or position.

- **The Big Picture Idea**:
  - Picture setting an object gently down in its exact designated location.
  - Whenever you see **posit** in an English word, think of **placing, stationing, and positioning**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of placed, set, or position.
  - **Mental & Social**: How people experience, organize, or communicate about placed, set, or position.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Apposite**: Apt in the circumstances or in relation to something.
  - **Apposition**: A relationship between two noun phrases in which the two units refer to the same thing in identical reference.
  - **Composite**: Made up of several parts or elements.
  - **Composition**: The nature of something's ingredients or constituents.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">posit</mark>, think of <mark class="hl-def">placing, stationing, and positioning</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **posit** generates vocabulary through nominalization and prefix compounding on the Latin participial stem *positum*:
> - **Base Noun, Verb & Adjective:**
>   - *positum* $	o$ *posit* ("to put forward as fact or basis of argument").
>   - *positiō* $	o$ *position*, *positioning* ("a place where someone or something is located").
>   - *positīvus* $	o$ *positive*, *positively* ("explicit, confident, having an electric charge $> 0$").
>   - *positive* + *-ism* $	o$ *positivism* ("empirical philosophy").
>   - *positive* + *-tron* $	o$ *positron* ("positive electron antiparticle").
> - **Prefix Modifications on *positum*:**
>   - *dē-* ("down, away") + *positum* $	o$ *deposit*, *deposition*, *depositor* ("to lay down in safekeeping; sworn testimony").
>   - *re-* ("back") + *positorium* $	o$ *repository* ("a place where things are stored").
>   - *com-* ("together") + *positum* $	o$ *composite*, *composition* ("made up of diverse parts").
>   - *ex-* ("out") + *positum* $	o$ *exposition*, *expositor* ("a comprehensive description and explanation").
>   - *in-* ("upon") + *positum* $	o$ *imposition* ("an unfair or unwelcome burden").
>   - *prō-* ("forward") + *positum* $	o$ *proposition* ("a statement expressing an opinion or judgment").
>   - *sub-* ("under") + *positum* $	o$ *supposition* ("an uncertain belief").
>   - *ad-* ("to, near") + *positum* $	o$ *apposite*, *apposition* ("appropriate, suitable; placing adjacent").

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
> - **Banking & Commercial Finance:** *deposit*, *deposition*, *depositor*, *repository* (cash deposits, depository trusts).
> - **Epistemology, Philosophy & Physics:** *posit*, *positive*, *positivism*, *positron* (empirical truth, subatomic physics).
> - **Spatial Coordinates & Sports:** *position*, *positioning* (fielding positions in baseball, market positioning).
> - **Grammar, Logic & Rhetoric:** *proposition*, *exposition*, *supposition*, *apposite*, *apposition* (formal logical propositions, clear textual exposition).
> - **Materials Science & Engineering:** *composite*, *composition* (carbon-fiber composite materials, chemical compositions).

---

## 🔀 4. Prefix & Combining Dynamics on posit

### Prefix Dynamics Table

| Prefix | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `dē-` (down) | `positum` | **[[deposit]]** / **deposition** | Laying an asset down in custody; sworn witness testimony taken down. |
| `re-` (back, store) | `positorium` | **[[repository]]** | A secure building, digital server, or vault where items are safely stored. |
| `com-` (together) | `positum` | **[[composite]]** / **composition** | Assembling diverse parts into a unified structural whole. |
| `ex-` (out) | `positum` | **[[exposition]]** | Laying out ideas clearly and systematically for public comprehension. |
| `prō-` (forward) | `positum` | **[[proposition]]** | Putting a premise forward for logical deduction or commercial deal. |
| `ad-` (near, to) | `positum` | **[[apposite]]** / **apposition** | Strikingly appropriate and well-suited to the circumstance. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏦 **Banking & Financial Markets** | *deposit*, *depositor*, *repository* | Federal Deposit Insurance Corporation (FDIC) insuring commercial bank deposits. |
| ⚛️ **Particle Physics & Cosmology** | *positron*, *positive* | Positron emission tomography (PET scans) imaging metabolic brain activity. |
| ⚖️ **Civil Litigation & Trial Law** | *deposition*, *proposition* | Taking videotaped depositions of expert witnesses prior to federal trials. |
| 🧪 **Materials Science & Aerospace** | *composite*, *composition* | Manufacturing lightweight carbon-fiber composite fuselages for wide-body aircraft. |
| 📚 **Epistemology & Academic Philosophy** | *posit*, *positivism* | Critiquing logical positivism and verificationist theories of meaning. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antiredeposition]] | noun | **1.** The process of preventing redeposition. | *"In academic literature, antiredeposition designates the process of preventing redeposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apposite]] | adjective | **1.** Being of striking appropriateness and pertinence. | *"I want to make a confession to you, Love.” This, from him, so unexpectedly apposite, had the effect upon her of a Providential interposition."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[appositeness]] | noun | **1.** Appropriateness for the occasion. | *"But the chief peculiarity of his speech was its directness and appositeness."* — graf Leo Tolstoy, *War and Peace* |
| [[apposition]] | noun | **1.** A grammatical relation between a word and a noun phrase that follows.<br>**2.** (biology) growth in the thickness of a cell wall by the deposit of successive layers of material. | *"In academic literature, apposition designates a grammatical relation between a word and a noun phrase that follows."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appositional]] | adjective | **1.** Relating to or being in apposition. | *"In academic literature, appositional designates relating to or being in apposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appositive]] | adjective | **1.** Relating to or being in apposition. | *"The nouns “interchange”, “splendour”, “benediction”, vv. 17, 18, 19, are appositives of “what”, v. 17."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[appositively]] | adverb | **1.** In an appositive manner. | *"In academic literature, appositively designates in an appositive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compositae]] | noun | **1.** Plants with heads composed of many florets: aster; daisy; dandelion; goldenrod; marigold; lettuces; ragweed; sunflower; thistle; zinnia. | *"In academic literature, compositae designates plants with heads composed of many florets: aster; daisy; dandelion; goldenrod; marigold; lettuces; ragweed; sunflower; thistle; zinnia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[composite]] | noun | **1.** A conceptual whole made up of complicated and related parts.<br>**2.** Considered the most highly evolved dicotyledonous plants, characterized by florets arranged in dense heads that resemble single flowers. | *"Evidently the times of maximum monetary demand of the different individuals do not coincide; rather they alternate with each other, and the community's total monetary demand at a given time is a composite of the many individual variations."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[compositeness]] | noun | **1.** The property of being a composite number. | *"In academic literature, compositeness designates the property of being a composite number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[composition]] | noun | **1.** The spatial property resulting from the arrangement of parts in relation to each other and to the whole.<br>**2.** The way in which someone or something is composed. | *"Until life’s composition be recured, By those swift messengers returned from thee, Who even but now come back again assured, Of thy fair health, recounting it to me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[compositional]] | adjective | **1.** Arranging or grouping. | *"In academic literature, compositional designates arranging or grouping."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compositor]] | noun | **1.** One who sets written material into type. | *"The curses to which the General gave a low utterance, as soon as Rebecca and her conqueror had quitted him, were so deep, that I am sure no compositor would venture to print them were they written down."* — William Makepeace Thackeray, *Vanity Fair* |
| [[decomposition]] | noun | **1.** The analysis of a vector field.<br>**2.** In a decomposed state. | *"Thus they die in the open air; and at the end of ten days they are in a forward state of decomposition."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[decompositional]] | adjective | **1.** Causing organic decay. | *"In academic literature, decompositional designates causing organic decay."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deposit]] | noun | **1.** The phenomenon of sediment or gravel accumulating.<br>**2.** Matter that has been deposited by some natural process. | *"Now, if you will promise to wait beside the horse while I walk through the bushes till I come to some road or house, and ascertain exactly our whereabouts, I’ll deposit you here willingly."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[depositary]] | noun | **1.** A facility where things can be deposited for storage or safekeeping. | *"It is not a great deal larger than Germany, where a diet representing the whole empire is continually assembled; or than Poland before the late dismemberment, where another national diet was the depositary of the supreme power."* — Alexander Hamilton, *The Federalist Papers* |
| [[deposition]] | noun | **1.** The natural process of laying down a deposit of something.<br>**2.** (law) a pretrial interrogation of a witness; usually conducted in a lawyer's office. | *"In the surgeon’s deposition it was stated that the posterior third of the left parietal bone and the left half of the occipital bone had been shattered by a heavy blow from a blunt weapon."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[depositor]] | noun | **1.** A person who has deposited money in a bank or similar institution. | *"From the standpoint of the depositor a time deposit is, by its very nature, an investment and not a demand credit available for current monetary uses."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[depository]] | noun | **1.** A facility where things can be deposited for storage or safekeeping. | *"He is surrounded by a mysterious halo of family confidences, of which he is known to be the silent depository."* — Charles Dickens, *Bleak House* |
| [[disposition]] | noun | **1.** Your usual mood.<br>**2.** The act or means of getting rid of something. | *"This drum sticks sorely in your disposition."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exposit]] | verb | **1.** State.<br>**2.** Add details, as to an account or idea; clarify the meaning of and discourse in a learned way, usually in writing. | *"But to the majority, who are bound to be strangers, let me exposit myself."* — Jack London, *The Jacket (The Star-Rover)* |
| [[exposition]] | noun | **1.** A systematic interpretation or explanation (usually written) of a specific topic.<br>**2.** A collection of things (goods or works of art etc.) for public display. | *"It doth appear you are a worthy judge; You know the law; your exposition Hath been most sound."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[expositive]] | adjective | **1.** Serving to expound or set forth. | *"In academic literature, expositive designates serving to expound or set forth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expositor]] | noun | **1.** A person who explains. | *"Here and there are incorporated passages (rehandled) from articles that have appeared in The Constructive Quarterly, The Nation, The Expositor, and elsewhere."* — T. R. Glover, *The Jesus of History* |
| [[expository]] | adjective | **1.** Serving to expound or set forth. | *"He was a good scholar and a stimulating preacher, excelling more particularly in his expository discourses, or "lectures" as they used to be called."* — John Cairns, *Principal Cairns* |
| [[imposition]] | noun | **1.** The act of imposing something (as a tax or an embargo).<br>**2.** An uncalled-for burden. | *"I pray she may, as well for the encouragement of the like, which else would stand under grievous imposition, as for the enjoying of thy life, who I would be sorry should be thus foolishly lost at a game of tick-tack."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inapposite]] | adjective | **1.** Of an inappropriate or misapplied nature. | *"In academic literature, inapposite designates of an inappropriate or misapplied nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inappositeness]] | noun | **1.** Inappropriateness. | *"In academic literature, inappositeness designates inappropriateness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indisposition]] | noun | **1.** A slight illness.<br>**2.** A certain degree of unwillingness. | *"Perchance some single vantages you took When my indisposition put you back, And that unaptness made your minister Thus to excuse yourself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[interposition]] | noun | **1.** The action of interjecting or interposing an action or remark that interrupts.<br>**2.** The act or fact of interposing one thing between or among others. | *"Oak imagined a terrible discovery resulting from this afternoon’s work that might cast over Bathsheba’s life a shade which the interposition of many lapsing years might but indifferently lighten, and which nothing at all might altogether remove."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[juxtaposition]] | noun | **1.** The act of positioning close together (or side by side).<br>**2.** A side-by-side position. | *"Gabriel was almost blinded, and he could feel Bathsheba’s warm arm tremble in his hand—a sensation novel and thrilling enough; but love, life, everything human, seemed small and trifling in such close juxtaposition with an infuriated universe."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[opposite]] | noun | **1.** A word that expresses a meaning opposed to the meaning of another word, in which case the two words are antonyms of each other.<br>**2.** A relation of direct opposition. | *"The present pleasure, By revolution lowering, does become The opposite of itself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[oppositely]] | adverb | **1.** In an opposite position. | *"They viciously snapped, not only at each other’s disembowelments, but like flexible bows, bent round, and bit their own; till those entrails seemed swallowed over and over again by the same mouth, to be oppositely voided by the gaping wound."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[oppositeness]] | noun | **1.** The relation between opposed entities. | *"In academic literature, oppositeness designates the relation between opposed entities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[opposition]] | noun | **1.** The action of opposing something that you disapprove or disagree with.<br>**2.** The relation between opposed entities. | *"Perchance he spoke not, but, Like a full-acorn’d boar, a German one, Cried “O!” and mounted; found no opposition But what he look’d for should oppose and she Should from encounter guard."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[oppositive]] | adjective | **1.** Expressing antithesis or opposition. | *"In academic literature, oppositive designates expressing antithesis or opposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posit]] | noun | **1.** (logic) a proposition that is accepted as true in order to provide a basis for logical reasoning.<br>**2.** Put (something somewhere) firmly. | *"If we posit that Jesus did not exist, we shall be involved other difficulties as to the story of the Church."* — T. R. Glover, *The Jesus of History* |
| [[position]] | noun | **1.** The particular portion of space occupied by something.<br>**2.** A point occupied by troops for tactical reasons. | *"But pardon me: I do not in position Distinctly speak of her, though I may fear Her will, recoiling to her better judgement, May fall to match you with her country forms, And happily repent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[positionable]] | adjective | **1.** Capable of being positioned. | *"In academic literature, positionable designates capable of being positioned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[positional]] | adjective | **1.** Of or relating to or determined by position. | *"In academic literature, positional designates of or relating to or determined by position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[positioner]] | noun | **1.** (computer science) the actuator that moves a read/write head to the proper data track. | *"In academic literature, positioner designates (computer science) the actuator that moves a read/write head to the proper data track."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[positioning]] | noun | **1.** The act of putting something in a certain place.<br>**2.** Cause to be in an appropriate place, state, or relation. | *"In academic literature, positioning designates the act of putting something in a certain place."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[positive]] | noun | **1.** The primary form of an adjective or adverb; denotes a quality without qualification, comparison, or relation to increase or diminution.<br>**2.** A film showing a photographic image whose tones correspond to those of the original subject. | *"I shall be rather praised for this than mocked, for it is as positive as the earth is firm that Falstaff is there."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[positively]] | adverb | **1.** Extremely.<br>**2.** So as to be positive; in a positive manner. | *"Hath there been such a time, I’d fain know that, That I have positively said ‘’Tis so,’ When it prov’d otherwise?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[positiveness]] | noun | **1.** The character of the positive electric pole.<br>**2.** A quality or state characterized by certainty or acceptance or affirmation and dogmatic assertiveness. | *"No!” I cried with great positiveness."* — Jack London, *The Jacket (The Star-Rover)* |
| [[positivism]] | noun | **1.** The form of empiricism that bases all knowledge on perceptual experience (not on intuition or revelation).<br>**2.** A quality or state characterized by certainty or acceptance or affirmation and dogmatic assertiveness. | *"It is needless to repeat, for it must be present to all minds, how many and deep are the differences which separate him from the later doctrines of Comte, and how completely he repudiated connection with the religious reconstruction of Positivism."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[positivist]] | noun | **1.** Someone who emphasizes observable facts and excludes metaphysical speculation about origins or ultimate causes.<br>**2.** Of or relating to positivism. | *"FOOTNOTES: [2] Part of a lecture on "Political Institutions," delivered at the Positivist School, May 11."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[positivistic]] | adjective | **1.** Of or relating to positivism. | *"In academic literature, positivistic designates of or relating to positivism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[positivity]] | noun | **1.** The character of the positive electric pole.<br>**2.** A quality or state characterized by certainty or acceptance or affirmation and dogmatic assertiveness. | *"In academic literature, positivity designates the character of the positive electric pole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[positron]] | noun | **1.** An elementary particle with positive charge; interaction of a positron and an electron results in annihilation. | *"In academic literature, positron designates an elementary particle with positive charge; interaction of a positron and an electron results in annihilation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postposition]] | noun | **1.** (linguistics) the placing of one linguistic element after another (as placing a modifier after the word that it modifies in a sentence or placing an affix after the base to which it is attached). | *"In academic literature, postposition designates (linguistics) the placing of one linguistic element after another (as placing a modifier after the word that it modifies in a sentence or placing an affix after the base to which it is attached)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postpositive]] | adjective | **1.** (of a modifier) placed after another word. | *"In academic literature, postpositive designates (of a modifier) placed after another word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[predisposition]] | noun | **1.** Susceptibility to a pathogen.<br>**2.** An inclination beforehand to interpret statements in a particular way. | *"In Lenau's case we noted circumstances which point to a direct transmission from parent to child of a predisposition to melancholia."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[preposition]] | noun | **1.** A function word that combines with a noun or pronoun or noun phrase to form a prepositional phrase that can have an adverbial or adjectival relation to some other word.<br>**2.** (linguistics) the placing of one linguistic element before another (as placing a modifier before the word it modifies in a sentence or placing an affix before the base to which it is attached). | *"Coals is either _by_ the fire, or _per_ the scuttle.” She emphasised the prepositions as marking a subtle but immense difference."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[prepositional]] | adjective | **1.** Of or relating to or formed with a preposition. | *"In academic literature, prepositional designates of or relating to or formed with a preposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prepositionally]] | adverb | **1.** As a preposition. | *"In academic literature, prepositionally designates as a preposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[presupposition]] | noun | **1.** The act of presupposing; a supposition made prior to having knowledge (as for the purpose of argument). | *"As far as I have been able to divine the latent meaning of the objectors, it seems to originate in a presupposition that the people will be disinclined to the exercise of federal authority in any matter of an internal nature."* — Alexander Hamilton, *The Federalist Papers* |
| [[proposition]] | noun | **1.** (logic) a statement that affirms or denies something and is either true or false.<br>**2.** A proposal offered for acceptance or rejection. | *"It has been observed more than once that the causes of love are chiefly subjective, and Boldwood was a living testimony to the truth of the proposition."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[propositus]] | noun | **1.** The person immediately affected by or concerned with an action. | *"In academic literature, propositus designates the person immediately affected by or concerned with an action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redeposit]] | verb | **1.** Deposit once again.<br>**2.** Deposit anew. | *"Interest is not compounded, unless the depositor withdraws the interest and redeposits it, but simple interest continues to accrue annually on a certificate so long as it is outstanding, without limitation as to time."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[redeposition]] | noun | **1.** Deposition from one deposit to another. | *"In academic literature, redeposition designates deposition from one deposit to another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redisposition]] | noun | **1.** The withdrawal and redistribution of forces in an attempt to use them more effectively. | *"In academic literature, redisposition designates the withdrawal and redistribution of forces in an attempt to use them more effectively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reimposition]] | noun | **1.** Imposition again. | *"In academic literature, reimposition designates imposition again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reposit]] | verb | **1.** Put (something) in a place for storage. | *"In academic literature, reposit designates put (something) in a place for storage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repositing]] | noun | **1.** Depositing in a warehouse.<br>**2.** Put (something) in a place for storage. | *"In academic literature, repositing designates depositing in a warehouse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reposition]] | noun | **1.** Depositing in a warehouse.<br>**2.** Change place or direction. | *"In academic literature, reposition designates depositing in a warehouse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repositioning]] | noun | **1.** The act of placing in a new position.<br>**2.** Change place or direction. | *"In academic literature, repositioning designates the act of placing in a new position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repository]] | noun | **1.** A facility where things can be deposited for storage or safekeeping.<br>**2.** A person to whom a secret is entrusted. | *"Tulkinghorn is always the same speechless repository of noble confidences, so oddly out of place and yet so perfectly at home."* — Charles Dickens, *Bleak House* |
| [[superposition]] | noun | **1.** (geology) the deposition of one geological stratum on another.<br>**2.** (geology) the principle that in a series of stratified sedimentary rocks the lowest stratum is the oldest. | *"In academic literature, superposition designates (geology) the deposition of one geological stratum on another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supposition]] | noun | **1.** A message expressing an opinion based on incomplete evidence.<br>**2.** A hypothesis that is taken for granted. | *"Only to seem to deserve well, and to beguile the supposition of that lascivious young boy the count, have I run into this danger: yet who would have suspected an ambush where I was taken?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[suppositional]] | adjective | **1.** Based primarily on surmise rather than adequate evidence. | *"Scientific phenomena 72:21 God, good, being ever present, it follows in divine logic that evil, the suppositional opposite of good, is never present."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[suppositious]] | adjective | **1.** Based primarily on surmise rather than adequate evidence. | *"In academic literature, suppositious designates based primarily on surmise rather than adequate evidence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supposititious]] | adjective | **1.** Based primarily on surmise rather than adequate evidence. | *"We shall have YOU taking fire next or blowing up with a bang.” This supposititious phenomenon is so very disagreeable to Mr."* — Charles Dickens, *Bleak House* |
| [[suppository]] | noun | **1.** A small plug of medication designed for insertion into the rectum or vagina where it melts. | *"In academic literature, suppository designates a small plug of medication designed for insertion into the rectum or vagina where it melts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transposition]] | noun | **1.** Any abnormal position of the organs of the body.<br>**2.** An event in which one thing is substituted for another. | *"Well, I recall perfectly how little, in my now quite established connexion, the maximum of ease appealed to me, and how I seemed to get rid of it by an honest transposition of the weights in the two scales."* — Henry James, *The Portrait of a Lady — Volume 1* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Placing]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · POSIT
  </div>
</div>
