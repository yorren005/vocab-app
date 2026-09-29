---
status: unread
type: root_dashboard
---
# Dashboard — pos
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pos-</span>
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

The root **pos** means placed, set, or position. It refers to placing something down, fixing a position, or setting an arrangement. In English, this root forms words such as *pose*, *position*, *deposit*, and *compose*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: placed, set, or position
> The root **pos** means placed, set, or position. It refers to placing something down, fixing a position, or setting an arrangement. In English, this root forms words such as *pose*, *position*, *deposit*, and *compose*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Placed, set, or position</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Setting an object gently down in its exact designated location.</mark>
> - **Everyday Connection**: Think of familiar words like *pose* and *position*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pos** comes from a Latin word that means *"placed, set, or position"*.
  - At its core, it describes placed, set, or position.

- **The Big Picture Idea**:
  - Picture setting an object gently down in its exact designated location.
  - Whenever you see **pos** in an English word, think of **placing, stationing, and positioning**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of placed, set, or position.
  - **Mental & Social**: How people experience, organize, or communicate about placed, set, or position.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Pose**: To present or constitute a problem or danger.
  - **Position**: An everyday English word showing the root's idea of *placed, set, or position*.
  - **Deposit**: An everyday English word showing the root's idea of *placed, set, or position*.
  - **Compose**: To write or create a work of art, especially music or poetry.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pos</mark>, think of <mark class="hl-def">placing, stationing, and positioning</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **pos** generates vocabulary primarily through prefix compounding inherited from French *poser*:
> - **Base Noun & Verbs:**
>   - *poser* $	o$ *pose* ("to assume a stance; present a problem").
>   - *postūra* $	o$ *posture* ("manner of standing or holding the body; attitude").
> - **Prefix Modifications on *poser*:**
>   - *com-* ("together") + *poser* $	o$ *compose*, *composer*, *composure* ("to place together; bring to calm order").
>   - *dē-* ("down, away") + *poser* $	o$ *depose* ("to remove from high office; testify").
>   - *dis-* ("apart") + *poser* $	o$ *dispose*, *disposable* ("to arrange, settle; throw away").
>   - *ex-* ("out") + *poser* $	o$ *expose* ("to lay bare to view, reveal").
>   - *in-* ("upon, into") + *poser* $	o$ *impose*, *imposing* ("to place a burden or duty upon").
>   - *inter-* ("between") + *poser* $	o$ *interpose* ("to place between, intervene").
>   - *juxta* ("next to") + *poser* $	o$ *juxtapose* ("to place side by side for contrast").
>   - *ob-* ("against") + *poser* $	o$ *oppose* ("to set against, resist").
>   - *prō-* ("forward") + *poser* $	o$ *propose*, *proposal* ("to put forward for consideration").
>   - *re-* ("back, again") + *poser* $	o$ *repose* ("to rest, lie at peace").
>   - *sub-* ("under") + *poser* $	o$ *suppose* ("to assume to be true").
>   - *trans-* ("across") + *poser* $	o$ *transpose* ("to shift across positions").

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
> - **Music, Literature & Emotional Balance:** *compose*, *composer*, *composure* (symphonic scores, calm presence of mind).
> - **Journalism & Whistleblowing:** *expose*, *exposure* (uncovering corporate fraud or political corruption).
> - **Authoritarian Governance & Taxation:** *impose*, *imposition* (imposing tariffs, martial law, or religious dogma).
> - **Comparative Analysis & Art:** *juxtapose*, *juxtaposition* (contrasting light and shadow, comparing rival theories).
> - **Political Power & Monarchy:** *depose*, *oppose* (deposing a tyrannical king, parliamentary opposition).
> - **Tranquility & Bodily Rest:** *repose* (peaceful sleep, dignified stillness).

---

## 🔀 4. Prefix & Combining Dynamics on pos

### Prefix Dynamics Table

| Prefix | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `com-` (together) | `poser` | **[[compose]]** / **composure** | Placing elements together harmoniously; maintaining emotional serenity. |
| `dē-` (down from) | `poser` | **[[depose]]** | Stripping an authority figure of office; removing from the throne. |
| `dis-` (apart) | `poser` | **[[dispose]]** / **disposable** | Distributing items systematically; discarding unwanted items. |
| `ex-` (out) | `poser` | **[[expose]]** | Laying an object or hidden truth open to external light and scrutiny. |
| `in-` (upon) | `poser` | **[[impose]]** | Forcibly laying a tax, burden, or moral obligation upon others. |
| `inter-` (between) | `poser` | **[[interpose]]** | Placing oneself or an object between opposing parties or obstacles. |
| `juxta` (near) | `poser` | **[[juxtapose]]** | Placing two contrasting objects side by side for critical comparison. |
| `prō-` (forward) | `poser` | **[[propose]]** / **proposal** | Putting a plan, marriage offer, or thesis forward for adoption. |
| `sub-` (under) | `poser` | **[[suppose]]** | Placing an assumption beneath an argument as a working premise. |
| `trans-` (across) | `poser` | **[[transpose]]** | Switching positions across an axis; shifting musical keys. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🎵 **Musicology & Fine Arts** | *compose*, *composer*, *juxtapose* | Composing polyphonic fugues; juxtaposing contrasting pigments in oil painting. |
| ⚖️ **Constitutional Law & Governance** | *depose*, *impose* | Deposing an authoritarian dictator; imposing emergency curfew regulations. |
| 📰 **Investigative Journalism & Media** | *expose*, *exposure* | Publishing a front-page exposé exposing illegal offshore financial accounts. |
| 🧠 **Cognitive Psychology & Psychiatry** | *composure*, *posture* | Maintaining emotional composure during crisis management simulations. |
| 💻 **Mathematics & Data Architecture** | *transpose*, *juxtapose* | Transposing matrix rows and columns ($A^T$) in linear algebra algorithms. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antiredeposition]] | noun | **1.** The process of preventing redeposition. | *"In academic literature, antiredeposition designates the process of preventing redeposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apposable]] | adjective | **1.** Capable of being placed opposite to something. | *"In academic literature, apposable designates capable of being placed opposite to something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appose]] | verb | **1.** Place side by side or in close proximity. | *"In academic literature, appose designates place side by side or in close proximity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apposite]] | adjective | **1.** Being of striking appropriateness and pertinence. | *"I want to make a confession to you, Love.” This, from him, so unexpectedly apposite, had the effect upon her of a Providential interposition."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[appositeness]] | noun | **1.** Appropriateness for the occasion. | *"But the chief peculiarity of his speech was its directness and appositeness."* — graf Leo Tolstoy, *War and Peace* |
| [[apposition]] | noun | **1.** A grammatical relation between a word and a noun phrase that follows.<br>**2.** (biology) growth in the thickness of a cell wall by the deposit of successive layers of material. | *"In academic literature, apposition designates a grammatical relation between a word and a noun phrase that follows."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appositional]] | adjective | **1.** Relating to or being in apposition. | *"In academic literature, appositional designates relating to or being in apposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appositive]] | adjective | **1.** Relating to or being in apposition. | *"The nouns “interchange”, “splendour”, “benediction”, vv. 17, 18, 19, are appositives of “what”, v. 17."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[appositively]] | adverb | **1.** In an appositive manner. | *"In academic literature, appositively designates in an appositive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compose]] | verb | **1.** Form the substance of.<br>**2.** Write music. | *"If we compose well here, to Parthia."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[composed]] | verb | **1.** Form the substance of.<br>**2.** Write music. | *"That I might see what the old world could say, To this composed wonder of your frame, Whether we are mended, or whether better they, Or whether revolution be the same."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[composedly]] | adverb | **1.** In a self-collected or self-possessed manner. | *"I,” he said, beating one hand on the other passionately, “am the man from Shropshire.” “I believe I and my family have also had the honour of furnishing some entertainment in the same grave place,” said my guardian composedly."* — Charles Dickens, *Bleak House* |
| [[composer]] | noun | **1.** Someone who composes music as a profession. | *"Skimpole could play on the piano and the violoncello, and he was a composer—had composed half an opera once, but got tired of it—and played what he composed with taste."* — Charles Dickens, *Bleak House* |
| [[composing]] | noun | **1.** The spatial property resulting from the arrangement of parts in relation to each other and to the whole.<br>**2.** Musical creation. | *"There was no perceptible motion in the air, not a visible drop of water fell upon a leaf of the beeches, birches, and firs composing the wood on either side."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[compositae]] | noun | **1.** Plants with heads composed of many florets: aster; daisy; dandelion; goldenrod; marigold; lettuces; ragweed; sunflower; thistle; zinnia. | *"In academic literature, compositae designates plants with heads composed of many florets: aster; daisy; dandelion; goldenrod; marigold; lettuces; ragweed; sunflower; thistle; zinnia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[composite]] | noun | **1.** A conceptual whole made up of complicated and related parts.<br>**2.** Considered the most highly evolved dicotyledonous plants, characterized by florets arranged in dense heads that resemble single flowers. | *"Evidently the times of maximum monetary demand of the different individuals do not coincide; rather they alternate with each other, and the community's total monetary demand at a given time is a composite of the many individual variations."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[compositeness]] | noun | **1.** The property of being a composite number. | *"In academic literature, compositeness designates the property of being a composite number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[composition]] | noun | **1.** The spatial property resulting from the arrangement of parts in relation to each other and to the whole.<br>**2.** The way in which someone or something is composed. | *"Until life’s composition be recured, By those swift messengers returned from thee, Who even but now come back again assured, Of thy fair health, recounting it to me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[compositional]] | adjective | **1.** Arranging or grouping. | *"In academic literature, compositional designates arranging or grouping."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compositor]] | noun | **1.** One who sets written material into type. | *"The curses to which the General gave a low utterance, as soon as Rebecca and her conqueror had quitted him, were so deep, that I am sure no compositor would venture to print them were they written down."* — William Makepeace Thackeray, *Vanity Fair* |
| [[compost]] | noun | **1.** A mixture of decaying vegetation and manure; used as a fertilizer.<br>**2.** Convert to compost. | *"Confess yourself to heaven, Repent what’s past, avoid what is to come; And do not spread the compost on the weeds, To make them ranker."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[composure]] | noun | **1.** Steadiness of mind under stress. | *"Say this becomes him— As his composure must be rare indeed Whom these things cannot blemish—yet must Antony No way excuse his foils when we do bear So great weight in his lightness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corposant]] | noun | **1.** An electrical discharge accompanied by ionization of surrounding atmosphere. | *"They had played around him as the corposant flickers around the mast-head of a ship...."* — Donn Byrne, *The Wind Bloweth* |
| [[counterpose]] | verb | **1.** Constitute a counterweight or counterbalance to. | *"It is to be hoped that it will not often happen that improper views will govern so large a proportion as two thirds of both branches of the legislature at the same time; and this, too, in spite of the counterposing weight of the Executive."* — Alexander Hamilton, *The Federalist Papers* |
| [[counterproposal]] | noun | **1.** A proposal offered as an alternative to an earlier proposal. | *"What counterproposals were alternately advanced, accepted, modified, declined, restated in other terms, reaccepted, ratified, reconfirmed?"* — James Joyce, *Ulysses* |
| [[decomposable]] | adjective | **1.** Capable of being partitioned. | *"In academic literature, decomposable designates capable of being partitioned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decompose]] | verb | **1.** Separate (substances) into constituent elements or parts.<br>**2.** Lose a stored charge, magnetic flux, or current. | *"You cannot get anything out of iron but iron; you cannot decompose iron."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[decomposition]] | noun | **1.** The analysis of a vector field.<br>**2.** In a decomposed state. | *"Thus they die in the open air; and at the end of ten days they are in a forward state of decomposition."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[decompositional]] | adjective | **1.** Causing organic decay. | *"In academic literature, decompositional designates causing organic decay."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[depose]] | verb | **1.** Force to leave (an office).<br>**2.** Make a deposition; declare under oath. | *"The duke yet lives that Henry shall depose, But him outlive and die a violent death. [_As the Spirit speaks, Southwell writes the answer._] BOLINGBROKE. [_Reads_.] _What fates await the Duke of Suffolk?_ SPIRIT."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deposer]] | noun | **1.** A person who testifies or gives a deposition. | *"In academic literature, deposer designates a person who testifies or gives a deposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deposit]] | noun | **1.** The phenomenon of sediment or gravel accumulating.<br>**2.** Matter that has been deposited by some natural process. | *"Now, if you will promise to wait beside the horse while I walk through the bushes till I come to some road or house, and ascertain exactly our whereabouts, I’ll deposit you here willingly."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[depositary]] | noun | **1.** A facility where things can be deposited for storage or safekeeping. | *"It is not a great deal larger than Germany, where a diet representing the whole empire is continually assembled; or than Poland before the late dismemberment, where another national diet was the depositary of the supreme power."* — Alexander Hamilton, *The Federalist Papers* |
| [[deposition]] | noun | **1.** The natural process of laying down a deposit of something.<br>**2.** (law) a pretrial interrogation of a witness; usually conducted in a lawyer's office. | *"In the surgeon’s deposition it was stated that the posterior third of the left parietal bone and the left half of the occipital bone had been shattered by a heavy blow from a blunt weapon."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[depositor]] | noun | **1.** A person who has deposited money in a bank or similar institution. | *"From the standpoint of the depositor a time deposit is, by its very nature, an investment and not a demand credit available for current monetary uses."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[depository]] | noun | **1.** A facility where things can be deposited for storage or safekeeping. | *"He is surrounded by a mysterious halo of family confidences, of which he is known to be the silent depository."* — Charles Dickens, *Bleak House* |
| [[discompose]] | verb | **1.** Cause to lose one's composure. | *"Men who possess all the advantages of life, are in a state where there are many accidents to disorder and discompose, but few to please them."* — Jonathan Swift, *The Battle of the Books, and other Short Pieces* |
| [[discomposed]] | verb | **1.** Cause to lose one's composure.<br>**2.** Having your composure disturbed. | *"You will not be discomposed by the Lord Chancellor, I dare say?” “No, sir,” I said, “I don’t think I shall,” really not seeing on consideration why I should be."* — Charles Dickens, *Bleak House* |
| [[discomposure]] | noun | **1.** Anxious embarrassment.<br>**2.** A temperament that is perturbed and lacking in composure. | *"Darcy, who, though extremely surprised, was not unwilling to receive it, when she instantly drew back, and said with some discomposure to Sir William,-- “Indeed, sir, I have not the least intention of dancing."* — Jane Austen, *Pride and Prejudice* |
| [[disposable]] | noun | **1.** An item that can be disposed of after it has been used.<br>**2.** Free or available for use or disposition. | *"The insulation of his heart by reserve during these many years, without a channel of any kind for disposable emotion, had worked its effect."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[disposal]] | noun | **1.** The power to use something or someone.<br>**2.** A method of tending to or managing the affairs of a some group of people (especially the group's business affairs). | *"Guppy concludes by resigning the adventure to Tony Jobling and informing him that during the vacation and while things are slack, his purse, “as far as three or four or even five pound goes,” will be at his disposal."* — Charles Dickens, *Bleak House* |
| [[dispose]] | verb | **1.** Give, sell, or transfer to another.<br>**2.** Throw or cast away. | *"No, dear queen; For we intend so to dispose you as Yourself shall give us counsel."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disposed]] | verb | **1.** Give, sell, or transfer to another.<br>**2.** Throw or cast away. | *"He was disposed to mirth; but on the sudden A Roman thought hath struck him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disposition]] | noun | **1.** Your usual mood.<br>**2.** The act or means of getting rid of something. | *"This drum sticks sorely in your disposition."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dispossess]] | verb | **1.** Deprive of the possession of real estate. | *"Shall then my father’s will be of no force To dispossess that child which is not his?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dispossessed]] | verb | **1.** Deprive of the possession of real estate.<br>**2.** Physically or spiritually homeless or deprived of security; - james stern. | *"They have been dispossessed of their hereditary possessions by mercenary and frequently wanton warfare, and their characters have been traduced by bigoted and interested writers."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[dispossession]] | noun | **1.** The expulsion of someone (such as a tenant) from the possession of land by process of law.<br>**2.** Freeing from evil spirits. | *"If only Momsey's great fortune came true, Nan was sure that Gedney Raffer would be paid off and Toby would no longer have the threat of dispossession held over him."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[epos]] | noun | **1.** A body of poetry that conveys the traditions of a society by treating some epic theme.<br>**2.** A long narrative poem telling of a hero's deeds. | *"She found her epos in the reform of a religious order."* — George Eliot, *Middlemarch* |
| [[expose]] | noun | **1.** The exposure of an impostor or a fraud.<br>**2.** Expose or make accessible to some action or influence. | *"Poor lord, is’t I That chase thee from thy country, and expose Those tender limbs of thine to the event Of the none-sparing war?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exposed]] | verb | **1.** Expose or make accessible to some action or influence.<br>**2.** Make known to the public information that was previously known only to a few people or that was meant to be kept a secret. | *"Call the creatures Whose naked natures live in all the spite Of wreakful heaven, whose bare unhoused trunks, To the conflicting elements exposed, Answer mere nature, bid them flatter thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exposit]] | verb | **1.** State.<br>**2.** Add details, as to an account or idea; clarify the meaning of and discourse in a learned way, usually in writing. | *"But to the majority, who are bound to be strangers, let me exposit myself."* — Jack London, *The Jacket (The Star-Rover)* |
| [[exposition]] | noun | **1.** A systematic interpretation or explanation (usually written) of a specific topic.<br>**2.** A collection of things (goods or works of art etc.) for public display. | *"It doth appear you are a worthy judge; You know the law; your exposition Hath been most sound."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[expositive]] | adjective | **1.** Serving to expound or set forth. | *"In academic literature, expositive designates serving to expound or set forth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expositor]] | noun | **1.** A person who explains. | *"Here and there are incorporated passages (rehandled) from articles that have appeared in The Constructive Quarterly, The Nation, The Expositor, and elsewhere."* — T. R. Glover, *The Jesus of History* |
| [[expository]] | adjective | **1.** Serving to expound or set forth. | *"He was a good scholar and a stimulating preacher, excelling more particularly in his expository discourses, or "lectures" as they used to be called."* — John Cairns, *Principal Cairns* |
| [[expostulate]] | verb | **1.** Reason with (somebody) for the purpose of dissuasion. | *"My liege and madam, to expostulate What majesty should be, what duty is, Why day is day, night night, and time is time Were nothing but to waste night, day and time."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[expostulation]] | noun | **1.** The act of expressing earnest opposition or protest.<br>**2.** An exclamation of protest or remonstrance or reproof. | *"Nay, we must use expostulation kindly, For it is parting from us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exposure]] | noun | **1.** Vulnerability to the elements; to the action of heat or cold or wind or rain;  or.<br>**2.** The act of subjecting someone to an influencing experience. | *"Look to the lady:— [_Lady Macbeth is carried out._] And when we have our naked frailties hid, That suffer in exposure, let us meet, And question this most bloody piece of work To know it further."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impose]] | verb | **1.** Compel to behave in a certain way.<br>**2.** Impose something unpleasant. | *"What fates impose, that men must needs abide; It boots not to resist both wind and tide. [_Exit King Edward, led out; Somerset with him._] OXFORD."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[imposed]] | verb | **1.** Compel to behave in a certain way.<br>**2.** Impose something unpleasant. | *"Therefore, indeed, my father, I have on Angelo imposed the office; Who may in th’ ambush of my name strike home, And yet my nature never in the fight To do in slander."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[imposing]] | verb | **1.** Compel to behave in a certain way.<br>**2.** Impose something unpleasant. | *"It was not a very good day for a visit, he said; he would have preferred the first day of term; but it was imposing, it was imposing."* — Charles Dickens, *Bleak House* |
| [[imposingly]] | adverb | **1.** In an impressive manner. | *"Real strength never impairs beauty or harmony, but it often bestows it; and in everything imposingly beautiful, strength has much to do with the magic."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[imposition]] | noun | **1.** The act of imposing something (as a tax or an embargo).<br>**2.** An uncalled-for burden. | *"I pray she may, as well for the encouragement of the like, which else would stand under grievous imposition, as for the enjoying of thy life, who I would be sorry should be thus foolishly lost at a game of tick-tack."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impossibility]] | noun | **1.** Incapability of existing or occurring.<br>**2.** An alternative that is not available. | *"Methinks in thee some blessed spirit doth speak His powerful sound within an organ weak; And what impossibility would slay In common sense, sense saves another way."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impossible]] | noun | **1.** Something that cannot be done.<br>**2.** Not capable of occurring or being accomplished or dealt with. | *"Impossible be strange attempts to those That weigh their pains in sense, and do suppose What hath been cannot be."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impossibleness]] | noun | **1.** Incapability of existing or occurring. | *"In academic literature, impossibleness designates incapability of existing or occurring."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impossibly]] | adverb | **1.** To a degree impossible of achievement. | *"Troy does not come back again, which he may not impossibly do!"* — Thomas Hardy, *Far from the Madding Crowd* |
| [[impost]] | noun | **1.** Money collected under a tariff.<br>**2.** The lowest stone in an arch -- from which it springs. | *"We will presume, for argument’s sake, that the revenue arising from the impost duties answers the purposes of a provision for the public debt and of a peace establishment for the Union."* — Alexander Hamilton, *The Federalist Papers* |
| [[imposter]] | noun | **1.** A person who makes deceitful pretenses. | *"He looked upon her as a species of imposter; a guilty woman in the guise of an innocent one."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[impostor]] | noun | **1.** A person who makes deceitful pretenses. | *"I am not an impostor, that proclaim Myself against the level of mine aim, But know I think, and think I know most sure, My art is not past power nor you past cure."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[imposture]] | noun | **1.** Pretending to be another person. | *"This, though I had myself suggested an imposture, made it very unlikely to my quiet thoughts."* — Mrs. Oliphant, *A Beleaguered City* |
| [[inapposite]] | adjective | **1.** Of an inappropriate or misapplied nature. | *"In academic literature, inapposite designates of an inappropriate or misapplied nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inappositeness]] | noun | **1.** Inappropriateness. | *"In academic literature, inappositeness designates inappropriateness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indispose]] | verb | **1.** Make unwilling.<br>**2.** Make unfit or unsuitable. | *"The capricious operation of so dissimilar a method of trial in the same cases, under the same government, is of itself sufficient to indispose every wellregulated judgment towards it."* — Alexander Hamilton, *The Federalist Papers* |
| [[indisposed]] | verb | **1.** Make unwilling.<br>**2.** Make unfit or unsuitable. | *"Truly I am not much to boast of, Sir Leicester, and I—I should still, Sir Leicester, if you was not so indisposed—which I hope you will not be long—I should still hope for the favour of being allowed to remain unknown in general."* — Charles Dickens, *Bleak House* |
| [[indisposition]] | noun | **1.** A slight illness.<br>**2.** A certain degree of unwillingness. | *"Perchance some single vantages you took When my indisposition put you back, And that unaptness made your minister Thus to excuse yourself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[interpose]] | verb | **1.** Be or come between.<br>**2.** Introduce. | *"What watchful cares do interpose themselves Betwixt your eyes and night?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[interposition]] | noun | **1.** The action of interjecting or interposing an action or remark that interrupts.<br>**2.** The act or fact of interposing one thing between or among others. | *"Oak imagined a terrible discovery resulting from this afternoon’s work that might cast over Bathsheba’s life a shade which the interposition of many lapsing years might but indifferently lighten, and which nothing at all might altogether remove."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[juxtapose]] | verb | **1.** Place side by side. | *"When they were together the Jacobean and the Victorian ages were juxtaposed."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[juxtaposed]] | verb | **1.** Place side by side.<br>**2.** Placed side by side often for comparison. | *"When they were together the Jacobean and the Victorian ages were juxtaposed."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[juxtaposition]] | noun | **1.** The act of positioning close together (or side by side).<br>**2.** A side-by-side position. | *"Gabriel was almost blinded, and he could feel Bathsheba’s warm arm tremble in his hand—a sensation novel and thrilling enough; but love, life, everything human, seemed small and trifling in such close juxtaposition with an infuriated universe."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[nondisposable]] | adjective | **1.** (of assets) unavailable for use.<br>**2.** Not designed to be thrown away after use. | *"In academic literature, nondisposable designates (of assets) unavailable for use."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[opposable]] | adjective | **1.** Capable of being placed opposite to something. | *"In academic literature, opposable designates capable of being placed opposite to something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oppose]] | verb | **1.** Be against; express opposition to.<br>**2.** Fight against or resist strongly. | *"Caesar sits down in Alexandria, where I will oppose his fate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[opposed]] | verb | **1.** Be against; express opposition to.<br>**2.** Fight against or resist strongly. | *"The itch of his affection should not then Have nicked his captainship, at such a point, When half to half the world opposed, he being The mered question. ’Twas a shame no less Than was his loss, to course your flying flags And leave his navy gazing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[opposer]] | noun | **1.** Someone who offers opposition. | *"Holy seems the quarrel Upon your Grace’s part; black and fearful On the opposer."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[opposing]] | verb | **1.** Be against; express opposition to.<br>**2.** Fight against or resist strongly. | *"What you have seen him do and heard him speak, Beating your officers, cursing yourselves, Opposing laws with strokes, and here defying Those whose great power must try him—even this, So criminal and in such capital kind, Deserves th’ extremest death."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[opposite]] | noun | **1.** A word that expresses a meaning opposed to the meaning of another word, in which case the two words are antonyms of each other.<br>**2.** A relation of direct opposition. | *"The present pleasure, By revolution lowering, does become The opposite of itself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[oppositely]] | adverb | **1.** In an opposite position. | *"They viciously snapped, not only at each other’s disembowelments, but like flexible bows, bent round, and bit their own; till those entrails seemed swallowed over and over again by the same mouth, to be oppositely voided by the gaping wound."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[oppositeness]] | noun | **1.** The relation between opposed entities. | *"In academic literature, oppositeness designates the relation between opposed entities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[opposition]] | noun | **1.** The action of opposing something that you disapprove or disagree with.<br>**2.** The relation between opposed entities. | *"Perchance he spoke not, but, Like a full-acorn’d boar, a German one, Cried “O!” and mounted; found no opposition But what he look’d for should oppose and she Should from encounter guard."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[oppositive]] | adjective | **1.** Expressing antithesis or opposition. | *"In academic literature, oppositive designates expressing antithesis or opposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overexpose]] | verb | **1.** Expose to too much light.<br>**2.** Expose excessively. | *"In academic literature, overexpose designates expose to too much light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overexposure]] | noun | **1.** The act of exposing film to too much light or for too long a time.<br>**2.** The act of exposing someone excessively to an influencing experience. | *"In academic literature, overexposure designates the act of exposing film to too much light or for too long a time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pose]] | noun | **1.** Affected manners intended to impress others.<br>**2.** A posture assumed by models for photographic or artistic purposes. | *"Then I shall pose you quickly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[posed]] | verb | **1.** Introduce.<br>**2.** Assume a posture as for artistic purposes. | *"It posed the lad, made him more perfect, as it were."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[poseidon]] | noun | **1.** (greek mythology) the god of the sea and earthquakes in ancient mythology; brother of zeus and hades and hera; identified with roman neptune. | *"At an Athenian festival called Scira the priestess of Athena, the priest of Poseidon, and the priest of the Sun walked from the Acropolis under the shade of a huge white umbrella which was borne over their heads by the Eteobutads."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[poser]] | noun | **1.** A person who habitually pretends to be something he is not.<br>**2.** A person who poses for a photographer or painter or sculptor. | *"I should humbly call it a poser, sir."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[poseur]] | noun | **1.** A person who habitually pretends to be something he is not. | *"He's a poseur and a toadier, no doubt of that, and I've always despised him for it, but he has real ability and he's worked like a fiend through this muss, and not all for his rich patients, either."* — Grace S. Richmond, *Red Pepper Burns* |
| [[poseuse]] | noun | **1.** A woman poseur. | *"In academic literature, poseuse designates a woman poseur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posing]] | noun | **1.** (photography) the act of assuming a certain position (as for a photograph or portrait).<br>**2.** Introduce. | *"None in the world, Evelina," he answered with a nice, straight, intellectuality showing over his whole face and even his lazy, posing figure."* — Maria Thompson Daviess, *The Tinder-Box* |
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
| [[posology]] | noun | **1.** The pharmacological determination of appropriate doses of drugs and medicines. | *"In academic literature, posology designates the pharmacological determination of appropriate doses of drugs and medicines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posse]] | noun | **1.** A temporary police force. | *"But him outlive and die a violent death._ Why, this is just _Aio te, Aeacida, Romanos vincere posse._ Well, to the rest: _Tell me what fate awaits the Duke of Suffolk?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[posseman]] | noun | **1.** An able-bodied man serving as a member of a posse. | *"In academic literature, posseman designates an able-bodied man serving as a member of a posse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[possess]] | verb | **1.** Have as an attribute, knowledge, or skill.<br>**2.** Have ownership or possession of. | *"I will possess you of that ship and treasure."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[possessed]] | verb | **1.** Have as an attribute, knowledge, or skill.<br>**2.** Have ownership or possession of. | *"This is the brief of money, plate, and jewels I am possessed of. ’Tis exactly valued, Not petty things admitted."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[possession]] | noun | **1.** The act of having and controlling property.<br>**2.** Anything owned or possessed. | *"Mad in pursuit and in possession so, Had, having, and in quest, to have extreme, A bliss in proof, and proved, a very woe; Before a joy proposed behind a dream."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[possessive]] | noun | **1.** The case expressing ownership.<br>**2.** Serving to express or indicate possession. | *"Smallweed’s favourite adjective of disparagement is so close to his tongue that he begins the words “my dear friend” with the monosyllable “brim,” thus converting the possessive pronoun into brimmy and appearing to have an impediment in his speech."* — Charles Dickens, *Bleak House* |
| [[possessively]] | adverb | **1.** In a possessive manner. | *"In academic literature, possessively designates in a possessive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[possessiveness]] | noun | **1.** Excessive desire to possess or dominate. | *"In academic literature, possessiveness designates excessive desire to possess or dominate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[possessor]] | noun | **1.** A person who owns something. | *"When Jacob graz’d his uncle Laban’s sheep,— This Jacob from our holy Abram was As his wise mother wrought in his behalf, The third possessor; ay, he was the third."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[posset]] | noun | **1.** Sweet spiced hot milk curdled with ale or beer. | *"Go; and we’ll have a posset for’t soon at night, in faith, at the latter end of a sea-coal fire. [_Exit Rugby._] An honest, willing, kind fellow, as ever servant shall come in house withal; and, I warrant you, no tell-tale nor no breed-bate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[possibility]] | noun | **1.** A future prospect or potential.<br>**2.** Capability of existing or happening or being true. | *"I know th’art valiant; and to the possibility of thy soldiership, will subscribe for thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[possible]] | noun | **1.** Something that can be done.<br>**2.** An applicant who might be suitable. | *"FIRST LORD. [_Aside._] Is it possible he should know what he is, and be that he is?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[possibleness]] | noun | **1.** Capability of existing or happening or being true. | *"In academic literature, possibleness designates capability of existing or happening or being true."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[possibly]] | adverb | **1.** By chance.<br>**2.** To a degree possible of achievement or by possible means. | *"Now do I long to hear how you were found: How possibly preserved; and who to thank, Besides the gods, for this great miracle."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[possum]] | noun | **1.** Nocturnal arboreal marsupial having a naked prehensile tail found from southern north america to northern south america.<br>**2.** Small furry australian arboreal marsupials having long usually prehensile tails. | *"It got so that Unc' Billy Possum and Jimmy Skunk didn't dare go to the henhouse for eggs any more, for fear that they would get into one of the traps set for Reddy Fox."* — Thornton W. Burgess, *The Adventures of Reddy Fox* |
| [[possumwood]] | noun | **1.** Medium-sized tree of dry woodlands in the southern and eastern united states bearing yellow or orange very astringent fruit that is edible when fully ripe. | *"In academic literature, possumwood designates medium-sized tree of dry woodlands in the southern and eastern united states bearing yellow or orange very astringent fruit that is edible when fully ripe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[post]] | noun | **1.** The position where someone (as a guard or sentry) stands or is assigned to stand.<br>**2.** Military installation at which a body of troops is stationed. | *"His highness comes post from Marseilles, of as able body as when he number’d thirty; he will be here tomorrow, or I am deceived by him that in such intelligence hath seldom fail’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[post-communist]] | adjective | **1.** No longer communist; subsequent to being communistic. | *"In academic literature, post-communist designates no longer communist; subsequent to being communistic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[post-free]] | adjective | **1.** Postpaid.<br>**2.** Having the postage paid by the sender. | *"Classical and authoritative lexicons catalog post-free as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[post-haste]] | adverb | **1.** As fast as possible; with all possible haste. | *"In academic literature, post-haste designates as fast as possible; with all possible haste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[post-horse]] | noun | **1.** A horse kept at an inn or post house for use by mail carriers or for rent to travelers. | *"In academic literature, post-horse designates a horse kept at an inn or post house for use by mail carriers or for rent to travelers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[post-impressionist]] | noun | **1.** An artist of the postimpressionist school who revolted against impressionism. | *"In academic literature, post-impressionist designates an artist of the postimpressionist school who revolted against impressionism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[post-it]] | noun | **1.** Brand name for a slip of notepaper that has an adhesive that allows it to stick to a surface and be removed without damaging the surface. | *"In academic literature, post-it designates brand name for a slip of notepaper that has an adhesive that allows it to stick to a surface and be removed without damaging the surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[post-maturity]] | noun | **1.** The state in which women have stopped ovulating. | *"In academic literature, post-maturity designates the state in which women have stopped ovulating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[post-menopause]] | noun | **1.** The state in which women have stopped ovulating. | *"In academic literature, post-menopause designates the state in which women have stopped ovulating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[post-mortem]] | noun | **1.** Discussion of an event after it has occurred.<br>**2.** An examination and dissection of a dead body to determine cause of death or the changes produced by disease. | *"In academic literature, post-mortem designates discussion of an event after it has occurred."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[post-paid]] | adverb | **1.** Having the postage paid by the sender. | *"In academic literature, post-paid designates having the postage paid by the sender."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postage]] | noun | **1.** The charge for mailing something.<br>**2.** A small adhesive token stuck on a letter or package to indicate that that postal fees have been paid. | *"The letters that passed between the student and his family were also sent in the box, for as yet there was no penny post, and the postage of a letter between Dunglass and Edinburgh cost as much as sixpence halfpenny or sevenpence."* — John Cairns, *Principal Cairns* |
| [[postal]] | adjective | **1.** Of or relating to the system for delivering mail. | *"_I am afraid I did not direct that letter right_." He sent a second postal card, asking if a letter had been received at her home; if not, to go to her post office and inquire."* — Classic Author, *The wonders of prayer* |
| [[postbag]] | noun | **1.** Letter carrier's shoulder bag. | *"The postbag, that evening—it came late—contained a letter for me, which, however, in the hand of my employer, I found to be composed but of a few words enclosing another, addressed to himself, with a seal still unbroken."* — Henry James, *The Turn of the Screw* |
| [[postbiblical]] | adjective | **1.** Subsequent to biblical times. | *"In academic literature, postbiblical designates subsequent to biblical times."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postbox]] | noun | **1.** Public box for deposit of mail. | *"In academic literature, postbox designates public box for deposit of mail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postcard]] | noun | **1.** A card for sending messages by post without an envelope. | *"Send her a picture postcard explaining that you forgot all about her until it was too--” The last word was jerked back into his throat by the jump of the Green Imp."* — Grace S. Richmond, *Red Pepper Burns* |
| [[postcava]] | noun | **1.** Receives blood from lower limbs and abdominal organs and empties into the posterior part of the right atrium of the heart; formed from the union of the two iliac veins. | *"In academic literature, postcava designates receives blood from lower limbs and abdominal organs and empties into the posterior part of the right atrium of the heart; formed from the union of the two iliac veins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postcode]] | noun | **1.** A code of letters and digits added to a postal address to aid in the sorting of mail. | *"In academic literature, postcode designates a code of letters and digits added to a postal address to aid in the sorting of mail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postdate]] | verb | **1.** Be later in time.<br>**2.** Establish something as being later relative to something else. | *"In academic literature, postdate designates be later in time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postdiluvian]] | noun | **1.** Anything living after noah's flood.<br>**2.** Existing or occurring after noah's flood. | *"In academic literature, postdiluvian designates anything living after noah's flood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postdoc]] | noun | **1.** A grant that funds postdoctoral study or research.<br>**2.** A scholar or researcher who is involved in academic study beyond the level of a doctoral degree. | *"In academic literature, postdoc designates a grant that funds postdoctoral study or research."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postdoctoral]] | noun | **1.** A grant that funds postdoctoral study or research.<br>**2.** Of or relating to study or research that is done after work for the doctoral degree has been completed. | *"In academic literature, postdoctoral designates a grant that funds postdoctoral study or research."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posted]] | verb | **1.** Affix in a public place or for public notice.<br>**2.** Publicize with, or as if with, a poster. | *"The swiftest harts have posted you by land, And winds of all the corners kiss’d your sails, To make your vessel nimble."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[poster]] | noun | **1.** A sign posted in a public place as an advertisement.<br>**2.** Someone who pastes up bills or placards on walls or billboards. | *"Here’s the announcement.” He drew from his breast-pocket a poster whereon was printed the day, hour, and place of meeting, at which he, d’Urberville, would preach the Gospel as aforesaid."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[posterboard]] | noun | **1.** A cardboard suitable for making posters. | *"In academic literature, posterboard designates a cardboard suitable for making posters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posterior]] | noun | **1.** The fleshy part of the human body that you sit on.<br>**2.** A tooth situated at the back of the mouth. | *"The posterior of the day, most generous sir, is liable, congruent, and measurable for the afternoon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[posteriority]] | noun | **1.** The quality of being toward the back or toward the rear end.<br>**2.** Following in time. | *"In academic literature, posteriority designates the quality of being toward the back or toward the rear end."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posterity]] | noun | **1.** All of the offspring of a given progenitor.<br>**2.** All future generations. | *"Or who is he so fond will be the tomb Of his self-love to stop posterity?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[postern]] | noun | **1.** A small gate in the rear of a fort or castle. | *"That spirit’s possessed with haste That wounds th’ unsisting postern with these strokes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[postexilic]] | adjective | **1.** Of or relating to the period in jewish history after 539 bc (after the babylonian captivity). | *"Accepting the analogy implied in his guest’s parable which examples of postexilic eminence did he adduce?"* — James Joyce, *Ulysses* |
| [[postfix]] | noun | **1.** An affix that is added at the end of the word. | *"In academic literature, postfix designates an affix that is added at the end of the word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postganglionic]] | adjective | **1.** Beyond or distal to a ganglion (referring especially to the unmyelinated fibers that originate from cells in autonomic ganglia). | *"In academic literature, postganglionic designates beyond or distal to a ganglion (referring especially to the unmyelinated fibers that originate from cells in autonomic ganglia)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postglacial]] | adjective | **1.** Relating to or occurring during the time following a glacial period. | *"In academic literature, postglacial designates relating to or occurring during the time following a glacial period."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postgraduate]] | noun | **1.** A student who continues studies after graduation.<br>**2.** Of or relating to studies beyond a bachelor's degree. | *"In academic literature, postgraduate designates a student who continues studies after graduation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posthitis]] | noun | **1.** Inflammation of the foreskin of the penis; usually caused by bacterial infection. | *"In academic literature, posthitis designates inflammation of the foreskin of the penis; usually caused by bacterial infection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posthole]] | noun | **1.** A hole dug in the ground to hold a fence post. | *"In academic literature, posthole designates a hole dug in the ground to hold a fence post."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posthouse]] | noun | **1.** An inn for exchanging post horses and accommodating riders. | *"In academic literature, posthouse designates an inn for exchanging post horses and accommodating riders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posthumous]] | adjective | **1.** Occurring or coming into existence after a person's death. | *"This help on his part was continued by his seeing through the press Wilson's posthumous book, _Counsels of an Invalid_, which appeared in 1862."* — John Cairns, *Principal Cairns* |
| [[posthumously]] | adverb | **1.** After death. | *"In academic literature, posthumously designates after death."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postiche]] | noun | **1.** A covering or bunch of human or artificial hair used for disguise or adornment.<br>**2.** Something that is a counterfeit; not what it seems to be. | *"In academic literature, postiche designates a covering or bunch of human or artificial hair used for disguise or adornment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postictal]] | adjective | **1.** Pertaining to the period following a seizure or convulsion. | *"In academic literature, postictal designates pertaining to the period following a seizure or convulsion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postilion]] | noun | **1.** Someone who rides the near horse of a pair in order to guide the horses pulling a carriage (especially a carriage without a coachman). | *"Our postilion is looking after the waggoner,” said Richard, “and the waggoner is coming back after us."* — Charles Dickens, *Bleak House* |
| [[postillion]] | noun | **1.** Someone who rides the near horse of a pair in order to guide the horses pulling a carriage (especially a carriage without a coachman). | *"Robinson was a tall, uncouth man, and his stature was often rendered still more remarkable by his hunting dress, and postillion’s cap, a tight green jacket, and buckskin breeches."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[postimpressionist]] | noun | **1.** An artist of the postimpressionist school who revolted against impressionism. | *"In academic literature, postimpressionist designates an artist of the postimpressionist school who revolted against impressionism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postindustrial]] | adjective | **1.** Of or relating to a society or economy marked by a lessened importance of manufacturing and an increase of services, information, and research. | *"In academic literature, postindustrial designates of or relating to a society or economy marked by a lessened importance of manufacturing and an increase of services, information, and research."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posting]] | noun | **1.** A sign posted in a public place as an advertisement.<br>**2.** (bookkeeping) a listing on the company's records. | *"Till I return of posting is no need."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[postlude]] | noun | **1.** A voluntary played at the end of a religious service. | *"In academic literature, postlude designates a voluntary played at the end of a religious service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postman]] | noun | **1.** A man who delivers the mail. | *"She watched till the postman passed by, ran out to him with her epistle, and then again took her listless place inside the window-panes."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[postmark]] | noun | **1.** A cancellation mark stamped on mail by postal officials; indicates the post office and date of mailing.<br>**2.** Stamp with a postmark to indicate date and time of mailing. | *"It bore the London postmark, and came from Edmund."* — Jane Austen, *Mansfield Park* |
| [[postmaster]] | noun | **1.** The person in charge of a post office. | *"I went to her in white and cried “mum”, and she cried “budget”, as Anne and I had appointed, and yet it was not Anne, but a postmaster’s boy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[postmenopausal]] | adjective | **1.** Subsequent to menopause. | *"In academic literature, postmenopausal designates subsequent to menopause."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmeridian]] | adjective | **1.** After noon. | *"In academic literature, postmeridian designates after noon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmillennial]] | adjective | **1.** Of or relating to the period following the millennium. | *"In academic literature, postmillennial designates of or relating to the period following the millennium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmistress]] | noun | **1.** A woman postmaster. | *"While the postmistress searched a pigeonhole he gazed at the recruiting poster with soldiers of all arms on parade: and held the tip of his baton against his nostrils, smelling freshprinted rag paper."* — James Joyce, *Ulysses* |
| [[postmodern]] | adjective | **1.** Of or relating to postmodernism. | *"In academic literature, postmodern designates of or relating to postmodernism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmodernism]] | noun | **1.** Genre of art and literature and especially architecture in reaction against principles and practices of established modernism. | *"In academic literature, postmodernism designates genre of art and literature and especially architecture in reaction against principles and practices of established modernism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmodernist]] | adjective | **1.** Of or relating to postmodernism. | *"In academic literature, postmodernist designates of or relating to postmodernism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmortal]] | adjective | **1.** Occurring or done after death. | *"In academic literature, postmortal designates occurring or done after death."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmortem]] | noun | **1.** Discussion of an event after it has occurred.<br>**2.** An examination and dissection of a dead body to determine cause of death or the changes produced by disease. | *"Good idea a postmortem for doctors."* — James Joyce, *Ulysses* |
| [[postnatal]] | adjective | **1.** Occurring immediately after birth. | *"In academic literature, postnatal designates occurring immediately after birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postnuptial]] | adjective | **1.** Relating to events after a marriage. | *"In academic literature, postnuptial designates relating to events after a marriage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postoperative]] | adjective | **1.** Happening or done after a surgical operation. | *"In academic literature, postoperative designates happening or done after a surgical operation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postoperatively]] | adverb | **1.** After the operation. | *"In academic literature, postoperatively designates after the operation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postpaid]] | adjective | **1.** Used especially of mail; paid in advance. | *"In academic literature, postpaid designates used especially of mail; paid in advance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postpartum]] | adjective | **1.** Occurring immediately after birth. | *"In academic literature, postpartum designates occurring immediately after birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postpone]] | verb | **1.** Hold back to a later time. | *"He had to hang it up because the mother insisted that they should go to lunch and postpone everything else till the afternoon."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[postponement]] | noun | **1.** Time during which some action is awaited.<br>**2.** Act of putting off to a future time. | *"If so, there must be a week’s postponement, and that was unlucky."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[postponer]] | noun | **1.** Someone who postpones work (especially out of laziness or habitual carelessness). | *"In academic literature, postponer designates someone who postpones work (especially out of laziness or habitual carelessness)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postpose]] | verb | **1.** Place after another constituent in the sentence. | *"In academic literature, postpose designates place after another constituent in the sentence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postposition]] | noun | **1.** (linguistics) the placing of one linguistic element after another (as placing a modifier after the word that it modifies in a sentence or placing an affix after the base to which it is attached). | *"In academic literature, postposition designates (linguistics) the placing of one linguistic element after another (as placing a modifier after the word that it modifies in a sentence or placing an affix after the base to which it is attached)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postpositive]] | adjective | **1.** (of a modifier) placed after another word. | *"In academic literature, postpositive designates (of a modifier) placed after another word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postprandial]] | adjective | **1.** Following a meal (especially dinner). | *"Your postprandial, do you know that word?"* — James Joyce, *Ulysses* |
| [[postscript]] | noun | **1.** A note appended to a letter after the signature.<br>**2.** Textual matter that is added onto a publication; usually at the end. | *"KING. ’Tis Hamlet’s character. ‘Naked!’ And in a postscript here he says ‘alone.’ Can you advise me?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[postulant]] | noun | **1.** One submitting a request or application especially one seeking admission into a religious order. | *"During these wanderings, Pierre noticed that he was spoken of now as the “Seeker,” now as the “Sufferer,” and now as the “Postulant,” to the accompaniment of various knockings with mallets and swords."* — graf Leo Tolstoy, *War and Peace* |
| [[postulate]] | noun | **1.** (logic) a proposition that is accepted as true in order to provide a basis for logical reasoning.<br>**2.** Maintain or assert. | *"This is the very postulate of living Christianity."* — John Cairns, *Principal Cairns* |
| [[postulation]] | noun | **1.** (logic) a declaration of something self-evident; something that can be assumed as the basis for argument.<br>**2.** A formal message requesting something that is submitted to an authority. | *"In academic literature, postulation designates (logic) a declaration of something self-evident; something that can be assumed as the basis for argument."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postulational]] | adjective | **1.** Of or relating to or derived from axioms; ; - s.s.stevens. | *"In academic literature, postulational designates of or relating to or derived from axioms; ; - s.s.stevens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postulator]] | noun | **1.** (roman catholic church) someone who proposes or pleads for a candidate for beatification or canonization.<br>**2.** Someone who assumes or takes something for granted as the basis of an argument. | *"In academic literature, postulator designates (roman catholic church) someone who proposes or pleads for a candidate for beatification or canonization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postum]] | noun | **1.** Trade mark for a coffee substitute invented by c. w. post and made with chicory and roasted grains. | *"In academic literature, postum designates trade mark for a coffee substitute invented by c. w. post and made with chicory and roasted grains."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postural]] | adjective | **1.** Of or relating to or involving posture. | *"In academic literature, postural designates of or relating to or involving posture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posture]] | noun | **1.** The arrangement of the body and its limbs.<br>**2.** Characteristic way of bearing one's body. | *"The quick comedians Extemporally will stage us and present Our Alexandrian revels; Antony Shall be brought drunken forth, and I shall see Some squeaking Cleopatra boy my greatness I’ th’ posture of a whore."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[posturer]] | noun | **1.** Someone who behaves in a manner calculated to impress or mislead others. | *"In academic literature, posturer designates someone who behaves in a manner calculated to impress or mislead others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posturing]] | noun | **1.** Adopting a vain conceited posture.<br>**2.** Behave affectedly or unnaturally in order to impress others. | *"But after I had had my new suit on some half an hour, and had gone through an immensity of posturing with Mr."* — Charles Dickens, *Great Expectations* |
| [[postwar]] | adjective | **1.** Belonging to the period after a war. | *"In academic literature, postwar designates belonging to the period after a war."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posy]] | noun | **1.** An arrangement of flowers that is usually given as a present. | *"Is this a prologue, or the posy of a ring?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[predispose]] | verb | **1.** Make susceptible. | *"The predisposing cause and the exciting cause are 178:12 mental."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[predisposed]] | verb | **1.** Make susceptible.<br>**2.** Made susceptible. | *"Semi-starvation and neglected colds had predisposed most of the pupils to receive infection: forty-five out of the eighty girls lay ill at one time."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[predisposition]] | noun | **1.** Susceptibility to a pathogen.<br>**2.** An inclination beforehand to interpret statements in a particular way. | *"In Lenau's case we noted circumstances which point to a direct transmission from parent to child of a predisposition to melancholia."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[prepose]] | verb | **1.** Place before another constituent in the sentence. | *"In academic literature, prepose designates place before another constituent in the sentence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preposition]] | noun | **1.** A function word that combines with a noun or pronoun or noun phrase to form a prepositional phrase that can have an adverbial or adjectival relation to some other word.<br>**2.** (linguistics) the placing of one linguistic element before another (as placing a modifier before the word it modifies in a sentence or placing an affix before the base to which it is attached). | *"Coals is either _by_ the fire, or _per_ the scuttle.” She emphasised the prepositions as marking a subtle but immense difference."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[prepositional]] | adjective | **1.** Of or relating to or formed with a preposition. | *"In academic literature, prepositional designates of or relating to or formed with a preposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prepositionally]] | adverb | **1.** As a preposition. | *"In academic literature, prepositionally designates as a preposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prepossess]] | verb | **1.** Possess beforehand.<br>**2.** Cause to be preoccupied. | *"Krempe was a little squat man with a gruff voice and a repulsive countenance; the teacher, therefore, did not prepossess me in favour of his pursuits."* — Mary Wollstonecraft Shelley, *Frankenstein; or, the modern prometheus* |
| [[prepossessing]] | verb | **1.** Possess beforehand.<br>**2.** Cause to be preoccupied. | *"Gusher, being a flabby gentleman with a moist surface and eyes so much too small for his moon of a face that they seemed to have been originally made for somebody else, was not at first sight prepossessing; yet he was scarcely seated before Mr."* — Charles Dickens, *Bleak House* |
| [[prepossession]] | noun | **1.** The condition of being prepossessed.<br>**2.** An opinion formed beforehand without adequate evidence. | *"She could not help thinking much of the extraordinary circumstances attending their acquaintance, of the right which he seemed to have to interest her, by everything in situation, by his own sentiments, by his early prepossession."* — Jane Austen, *Persuasion* |
| [[preposterous]] | adjective | **1.** Incongruous;inviting ridicule. | *"Ay, my good lord—my lord, I should say rather. ’Tis sin to flatter; “good” was little better: “Good Gloucester” and “good devil” were alike, And both preposterous; therefore, not “good lord”."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preposterously]] | adverb | **1.** So as to arouse or deserve laughter. | *"Methinks you prescribe to yourself very preposterously."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[presuppose]] | verb | **1.** Take for granted or as a given; suppose beforehand.<br>**2.** Require as a necessary antecedent or precondition. | *"I shall have to presuppose your attachment to her; and to enter on the subject as you wish me to do, will be asking her to tell me whether she returns it.” “That is what I want her to tell you,” said Fred, bluntly."* — George Eliot, *Middlemarch* |
| [[presupposition]] | noun | **1.** The act of presupposing; a supposition made prior to having knowledge (as for the purpose of argument). | *"As far as I have been able to divine the latent meaning of the objectors, it seems to originate in a presupposition that the people will be disinclined to the exercise of federal authority in any matter of an internal nature."* — Alexander Hamilton, *The Federalist Papers* |
| [[proposal]] | noun | **1.** Something proposed (such as a plan or assumption).<br>**2.** An offer of marriage. | *"Mea had sent a proposal of peace to Elvira through Loneli, for she hated the constant sulking of her friend and the unpleasant new manner she exhibited in turning her back upon her."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[propose]] | verb | **1.** Make a proposal, declare a plan for something.<br>**2.** Present for consideration, examination, criticism, etc. | *"What to ourselves in passion we propose, The passion ending, doth the purpose lose."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[proposer]] | noun | **1.** Someone who advances a suggestion or proposal.<br>**2.** (parliamentary procedure) someone who makes a formal motion. | *"As, on the one hand, the form of the provision would not fulfil the intent of its proposers, so, on the other, if I apprehend that intent rightly, it would be in itself inexpedient."* — Alexander Hamilton, *The Federalist Papers* |
| [[proposition]] | noun | **1.** (logic) a statement that affirms or denies something and is either true or false.<br>**2.** A proposal offered for acceptance or rejection. | *"It has been observed more than once that the causes of love are chiefly subjective, and Boldwood was a living testimony to the truth of the proposition."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[propositus]] | noun | **1.** The person immediately affected by or concerned with an action. | *"In academic literature, propositus designates the person immediately affected by or concerned with an action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purpose]] | noun | **1.** An anticipated outcome that is intended or that guides your planned actions.<br>**2.** What something is used for. | *"And for a woman wert thou first created, Till nature as she wrought thee fell a-doting, And by addition me of thee defeated, By adding one thing to my purpose nothing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[purposely]] | adverb | **1.** With intention; in an intentional manner. | *"Ay, good my lord; for purposely therefore Left I the court to see this quarrel tried."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[purposive]] | adjective | **1.** Having or showing or acting with a purpose or design.<br>**2.** Having a purpose. | *"In academic literature, purposive designates having or showing or acting with a purpose or design."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redeposit]] | verb | **1.** Deposit once again.<br>**2.** Deposit anew. | *"Interest is not compounded, unless the depositor withdraws the interest and redeposits it, but simple interest continues to accrue annually on a certificate so long as it is outstanding, without limitation as to time."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[redeposition]] | noun | **1.** Deposition from one deposit to another. | *"In academic literature, redeposition designates deposition from one deposit to another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redispose]] | verb | **1.** Dispose anew. | *"In academic literature, redispose designates dispose anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redisposition]] | noun | **1.** The withdrawal and redistribution of forces in an attempt to use them more effectively. | *"In academic literature, redisposition designates the withdrawal and redistribution of forces in an attempt to use them more effectively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reimpose]] | verb | **1.** Impose anew. | *"In academic literature, reimpose designates impose anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reimposition]] | noun | **1.** Imposition again. | *"In academic literature, reimposition designates imposition again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repose]] | noun | **1.** Freedom from activity (work or strain or responsibility).<br>**2.** The absence of mental stress or anxiety. | *"He that unbuckles this, till we do please To daff’t for our repose, shall hear a storm."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reposeful]] | adjective | **1.** Affording physical or mental rest. | *"I chose a reposeful Sabbath-day sort of a back street which was about thirty yards wide between the curbstones."* — Mark Twain, *What Is Man? and Other Essays* |
| [[reposit]] | verb | **1.** Put (something) in a place for storage. | *"In academic literature, reposit designates put (something) in a place for storage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repositing]] | noun | **1.** Depositing in a warehouse.<br>**2.** Put (something) in a place for storage. | *"In academic literature, repositing designates depositing in a warehouse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reposition]] | noun | **1.** Depositing in a warehouse.<br>**2.** Change place or direction. | *"In academic literature, reposition designates depositing in a warehouse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repositioning]] | noun | **1.** The act of placing in a new position.<br>**2.** Change place or direction. | *"In academic literature, repositioning designates the act of placing in a new position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repository]] | noun | **1.** A facility where things can be deposited for storage or safekeeping.<br>**2.** A person to whom a secret is entrusted. | *"Tulkinghorn is always the same speechless repository of noble confidences, so oddly out of place and yet so perfectly at home."* — Charles Dickens, *Bleak House* |
| [[repossess]] | verb | **1.** Claim back.<br>**2.** Regain possession of something. | *"Her suit is now to repossess those lands, Which we in justice cannot well deny, Because in quarrel of the house of York The worthy gentleman did lose his life."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[repossession]] | noun | **1.** The action of regaining possession (especially the seizure of collateral securing a loan that is in default). | *"In academic literature, repossession designates the action of regaining possession (especially the seizure of collateral securing a loan that is in default)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superimpose]] | verb | **1.** Place on top of. | *"The sight, coming as it did, superimposed upon the other dark scenery of the previous days, formed a sort of climax to the whole panorama, and it was more than he could endure."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[superimposed]] | verb | **1.** Place on top of.<br>**2.** Placed on or over something else. | *"The sight, coming as it did, superimposed upon the other dark scenery of the previous days, formed a sort of climax to the whole panorama, and it was more than he could endure."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[superposable]] | adjective | **1.** Coinciding exactly when superimposed. | *"In academic literature, superposable designates coinciding exactly when superimposed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superpose]] | verb | **1.** Place (one geometric figure) upon another so that their perimeters coincide.<br>**2.** Place on top of. | *"There is not space here to detail how, by another current superposed upon those referred to already, the receiving-pen is made to dip itself periodically into the inkwell at the will of the sender."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[superposition]] | noun | **1.** (geology) the deposition of one geological stratum on another.<br>**2.** (geology) the principle that in a series of stratified sedimentary rocks the lowest stratum is the oldest. | *"In academic literature, superposition designates (geology) the deposition of one geological stratum on another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supposable]] | adjective | **1.** Capable of being inferred on slight grounds. | *"As to corruption, the case is not supposable."* — Alexander Hamilton, *The Federalist Papers* |
| [[supposal]] | noun | **1.** A hypothesis that is taken for granted.<br>**2.** The cognitive process of supposing. | *"In academic literature, supposal designates a hypothesis that is taken for granted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suppose]] | verb | **1.** Express a supposition.<br>**2.** Expect, believe, or suppose. | *"Nor dare I question with my jealous thought, Where you may be, or your affairs suppose, But like a sad slave stay and think of nought Save where you are, how happy you make those."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supposed]] | verb | **1.** Express a supposition.<br>**2.** Expect, believe, or suppose. | *"But think you, Helen, If you should tender your supposed aid, He would receive it?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supposedly]] | adverb | **1.** Believed or reputed to be the case. | *"The moment Rafe caught sight of her he began to squall, supposedly like an infant, crying: “Ma-ma!"* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[supposition]] | noun | **1.** A message expressing an opinion based on incomplete evidence.<br>**2.** A hypothesis that is taken for granted. | *"Only to seem to deserve well, and to beguile the supposition of that lascivious young boy the count, have I run into this danger: yet who would have suspected an ambush where I was taken?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[suppositional]] | adjective | **1.** Based primarily on surmise rather than adequate evidence. | *"Scientific phenomena 72:21 God, good, being ever present, it follows in divine logic that evil, the suppositional opposite of good, is never present."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[suppositious]] | adjective | **1.** Based primarily on surmise rather than adequate evidence. | *"In academic literature, suppositious designates based primarily on surmise rather than adequate evidence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supposititious]] | adjective | **1.** Based primarily on surmise rather than adequate evidence. | *"We shall have YOU taking fire next or blowing up with a bang.” This supposititious phenomenon is so very disagreeable to Mr."* — Charles Dickens, *Bleak House* |
| [[suppository]] | noun | **1.** A small plug of medication designed for insertion into the rectum or vagina where it melts. | *"In academic literature, suppository designates a small plug of medication designed for insertion into the rectum or vagina where it melts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transposability]] | noun | **1.** Ability to change sequence. | *"In academic literature, transposability designates ability to change sequence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transposable]] | adjective | **1.** Capable of changing sequence. | *"In academic literature, transposable designates capable of changing sequence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transpose]] | noun | **1.** A matrix formed by interchanging the rows and columns of a given matrix.<br>**2.** Change the order or arrangement of. | *"That which you are, my thoughts cannot transpose."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[transposed]] | verb | **1.** Change the order or arrangement of.<br>**2.** Transfer from one place or period to another. | *"You have only knowledge enough of the language to translate at sight these inverted, transposed, curtailed Italian lines, into clear, comprehensible, elegant English."* — Jane Austen, *Persuasion* |
| [[transposition]] | noun | **1.** Any abnormal position of the organs of the body.<br>**2.** An event in which one thing is substituted for another. | *"Well, I recall perfectly how little, in my now quite established connexion, the maximum of ease appealed to me, and how I seemed to get rid of it by an honest transposition of the weights in the two scales."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[transposon]] | noun | **1.** A segment of dna that can become integrated at many different sites along a chromosome (especially a segment of bacterial dna that can be translocated as a whole). | *"In academic literature, transposon designates a segment of dna that can become integrated at many different sites along a chromosome (especially a segment of bacterial dna that can be translocated as a whole)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undecomposable]] | adjective | **1.** Representing the furthest possible extent of analysis or division into parts; - g.s.brett; -m.r.cohen. | *"But mind, whether it be diamond, or black-lead, or this porous charcoal, each and all have the same chemical composition; they are what we call the elementary undecomposable substance carbon."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[undecomposed]] | adjective | **1.** Not left to spoil. | *"Consequently, the products from the roasting of chalcopyrite consist principally of oxides of iron and copper, together with a certain amount of copper sulphate, very little iron sulphate, and some undecomposed sulphides."* — Donald M. Levy, *Modern Copper Smelting* |
| [[underexpose]] | verb | **1.** Expose to too little light.<br>**2.** Expose insufficiently. | *"In academic literature, underexpose designates expose to too little light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underexposure]] | noun | **1.** The act of exposing film to too little light or for too short a time.<br>**2.** Inadequate publicity. | *"In academic literature, underexposure designates the act of exposing film to too little light or for too short a time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unimposing]] | adjective | **1.** Lacking in impressiveness. | *"The scene is unimposing; there is nought Of grandeur or magnificence displayed; But by its quiet prettiness is brought A sense of calm enjoyment--hill and glade And peaceful meadow, all alike suggest Sweet thoughts of still serenity and rest."* — Wilfred S. Skeats, *The song of the exile* |
| [[unopposable]] | adjective | **1.** Not opposable. | *"In academic literature, unopposable designates not opposable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unopposed]] | adjective | **1.** Not having opposition or an opponent. | *"Both were suddenly converted when Fengtai, only six miles away, was burned, and the Boxers were reported marching unopposed upon Peking."* — Robert Coltman, *Beleaguered in Pekin: The Boxer's War Against the Foreigner* |
| [[unposed]] | adjective | **1.** Not arranged for pictorial purposes. | *"In academic literature, unposed designates not arranged for pictorial purposes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unprepossessing]] | adjective | **1.** Creating an unfavorable or neutral first impression. | *"Then he screwed his features up someway sideways and glared out into the night with an unprepossessing cast of countenance. —Pom! he then shouted once."* — James Joyce, *Ulysses* |

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
    ROOT DASHBOARD · POS
  </div>
</div>
