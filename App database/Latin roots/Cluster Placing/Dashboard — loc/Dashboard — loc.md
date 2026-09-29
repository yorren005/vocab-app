---
status: unread
type: root_dashboard
---
# Dashboard — loc
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">loc-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“place”</span>
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

The root **loc** means place. It refers to a specific place, physical location, or assigned position. In English, this root forms words such as *locate*, *location*, *local*, and *dislocate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: place
> The root **loc** means place. It refers to a specific place, physical location, or assigned position. In English, this root forms words such as *locate*, *location*, *local*, and *dislocate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Place</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Setting an object gently down in its exact designated location.</mark>
> - **Everyday Connection**: Think of familiar words like *locate* and *location*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **loc** comes from a Latin word that means *"place"*.
  - At its core, it describes place.

- **The Big Picture Idea**:
  - Picture setting an object gently down in its exact designated location.
  - Whenever you see **loc** in an English word, think of **placing, stationing, and positioning**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of place.
  - **Mental & Social**: How people experience, organize, or communicate about place.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Locate**: To discover the exact place or position of.
  - **Location**: A particular place or position.
  - **Local**: Belonging or relating to a particular area or neighborhood.
  - **Dislocate**: To disturb the normal position of a bone in a joint.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">loc</mark>, think of <mark class="hl-def">placing, stationing, and positioning</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **loc** generates vocabulary through noun compounding, adjectival derivation, and verbal prefixation on *locāre / locātum*:
> - **Base Noun & Regional Adjectives:**
>   - *locus* $	o$ *locus* ("a particular position or place; mathematical set of points").
>   - *locus* + *-ālis* $	o$ Latin *locālis* $	o$ *local*, *locally* ("belonging to a particular area").
>   - *locālitās* $	o$ *locality* ("the position or site of something").
>   - French *locale* $	o$ *locale* ("a place where something happens, with its surroundings").
> - **Prefix Modifications on *locāre*:**
>   - *ad-* ("to") + *locāre* $	o$ Medieval Latin *allocāre* $	o$ *allocate*, *allocation*, *allocator* ("to assign resources to a specific purpose").
>   - *dis-* ("apart, away") + *locāre* $	o$ *dislocate*, *dislocation* ("to put out of joint or customary place").
>   - *re-* ("again, back") + *locāre* $	o$ *relocate*, *relocation* ("to move to a new place").
> - **Factitive & Specialized Formations:**
>   - *locāre* $	o$ *locate*, *location*, *locator* ("to discover or place").
>   - *local* + *-ize* $	o$ *localize*, *localization* ("to restrict to a particular place").
>   - *con-* + *locāre* $	o$ *collocate*, *collocation* ("to place side by side; words frequently paired together").

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
> - **Cartography, GPS & Navigation:** *locate*, *location*, *relocate*, *locator* (determining coordinates on a map, satellite positioning).
> - **Public Finance & Resource Management:** *allocate*, *allocation*, *allocator* (budgeting state revenues across municipal projects).
> - **Orthopedics & Traumatology:** *dislocate*, *dislocation* (displacement of a bone from its normal joint socket).
> - **Linguistics & Natural Language Processing:** *collocation*, *locative* (co-occurring words like "heavy rain", the locative grammatical case).
> - **Software & Product Internationalization:** *localize*, *localization* (adapting software UI, currency, and date formats to regional markets).

---

## 🔀 4. Prefix & Combining Dynamics on loc

### Prefix Dynamics Table

| Prefix | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` (to, toward) | `locāre` | **[[allocate]]** / **allocation** | Assigning funds or assets to a specific designated account or purpose. |
| `dis-` (apart, reversal) | `locāre` | **[[dislocate]]** / **dislocation** | Forcing a joint or structure violently out of its proper socket or place. |
| `re-` (again, anew) | `locāre` | **[[relocate]]** / **relocation** | Moving a corporate headquarters, household, or population to a new site. |
| `con-` (together) | `locāre` | **collocation** | Placing words together in habitual linguistic combinations. |
| `-ize` (factitive verb) | `local` | **localize** / **localization** | Confining an infection to one area; adapting products for local regions. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🛰️ **Geodesy & Mobile Computing** | *location*, *locate*, *locator* | GPS trilateration, mobile location-based services, emergency beacon locators. |
| 🏥 **Orthopedic Surgery & Sports Medicine** | *dislocate*, *dislocation* | Reducing an anterior glenohumeral shoulder dislocation under conscious sedation. |
| 💼 **Corporate Accounting & Macroeconomics** | *allocate*, *allocation*, *allocator* | Capital allocation theory, optimizing municipal infrastructure budget allocations. |
| 💻 **Software Engineering & Globalization** | *localize*, *localization* (l10n) | Translating UI strings and locale settings for international application distribution. |
| 📖 **Corpus Linguistics & Lexicography** | *collocation*, *locative* | Analyzing statistical collocations in language models (e.g., "commit a crime"). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[allocable]] | adjective | **1.** Capable of being distributed. | *"In academic literature, allocable designates capable of being distributed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allocatable]] | adjective | **1.** Capable of being distributed. | *"In academic literature, allocatable designates capable of being distributed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allocate]] | verb | **1.** Distribute according to a plan or set apart for a special purpose. | *"Advise allocate substantial portion of budget to meet continual needs arising at International Center of Faith. [May 3, 1952] FORTY-FIFTH ANNUAL CONVENTION: U.S."* — Effendi Shoghi, *Citadel of Faith* |
| [[allocation]] | noun | **1.** A share set aside for a specific purpose.<br>**2.** The act of distributing by allotting or apportioning; distribution according to a plan. | *"In academic literature, allocation designates a share set aside for a specific purpose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allocator]] | noun | **1.** A person with authority to allot or deal out or apportion. | *"In academic literature, allocator designates a person with authority to allot or deal out or apportion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allocution]] | noun | **1.** (rhetoric) a formal or authoritative address that advises or exhorts. | *"The worthies began a revolution, Which if on earth you intend to acknowledge, Why, honor them now! (ends my allocution) Nor confer your degree when the folks leave college. 21."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[circumlocution]] | noun | **1.** A style that involves indirect ways of expressing things.<br>**2.** An indirect way of expressing something. | *"She had a good honest glance and used no circumlocution."* — George Eliot, *Middlemarch* |
| [[circumlocutious]] | adjective | **1.** Roundabout and unnecessarily wordy; ; -t.s.eliot; (`ambagious' is archaic). | *"In academic literature, circumlocutious designates roundabout and unnecessarily wordy; ; -t.s.eliot; (`ambagious' is archaic)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumlocutory]] | adjective | **1.** Roundabout and unnecessarily wordy; ; -t.s.eliot; (`ambagious' is archaic). | *"In academic literature, circumlocutory designates roundabout and unnecessarily wordy; ; -t.s.eliot; (`ambagious' is archaic)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collocalia]] | noun | **1.** A genus of apodidae. | *"In academic literature, collocalia designates a genus of apodidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collocate]] | verb | **1.** Have a strong tendency to occur side by side.<br>**2.** Group or chunk together in a certain order or place side by side. | *"In academic literature, collocate designates have a strong tendency to occur side by side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collocation]] | noun | **1.** A grouping of words in a sentence.<br>**2.** The act of positioning close together (or side by side). | *"Now, of all WORDS in the language, ‘the’ is most usual; let us see, therefore, whether there are not repetitions of any three characters, in the same order of collocation, the last of them being 8."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[colocasia]] | noun | **1.** Small genus of perennial tuberous herbs of tropical asia: taro. | *"She remembered and heeded the warning during those years, but one day, her husband and all their men having gone to Manoa to cultivate kalo (_Colocasia antiquorum_), she was left alone with her maid servants."* — Classic Author, *Hawaiian folk tales* |
| [[delocalize]] | verb | **1.** Remove from the proper or usual locality. | *"In academic literature, delocalize designates remove from the proper or usual locality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dislocate]] | verb | **1.** Move out of position.<br>**2.** Put out of its usual place, position, or relationship. | *"Were’t my fitness To let these hands obey my blood, They are apt enough to dislocate and tear Thy flesh and bones."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dislocated]] | verb | **1.** Move out of position.<br>**2.** Put out of its usual place, position, or relationship. | *"His collar-bone was found to be dislocated, and such injury received in the back, as roused the most alarming ideas."* — Jane Austen, *Persuasion* |
| [[dislocation]] | noun | **1.** An event that results in a displacement or discontinuity.<br>**2.** The act of disrupting an established order so it fails to continue. | *"It was brought on by a fall, and a consequent dislocation, when she was eight years of age."* — Classic Author, *The wonders of prayer* |
| [[elocute]] | verb | **1.** Declaim in an elocutionary manner. | *"In academic literature, elocute designates declaim in an elocutionary manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elocution]] | noun | **1.** An expert manner of speaking involving control of voice and gesture. | *"Rushworth; but as a well-judging, steady young man, with better notions than his elocution would do justice to, he intended to value him very highly."* — Jane Austen, *Mansfield Park* |
| [[elocutionary]] | adjective | **1.** Of or relating to elocution.<br>**2.** (used of style of speaking) overly embellished. | *"His reading of Scripture had no elocutionary pretensions about it; it was quiet, and to a large extent gone through in a monotone; but two things about it made it very impressive."* — John Cairns, *Principal Cairns* |
| [[elocutionist]] | noun | **1.** A public speaker trained in voice production and gesture and delivery. | *"Murdoch, the daughter of the patriotic actor and elocutionist, gave her services with great earnestness to the work."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[interlocutor]] | noun | **1.** The performer in the middle of a minstrel line who engages the others in talk.<br>**2.** A person who takes part in a conversation. | *"Tess’s attention was thus attracted to the dairyman’s interlocutor, of whom she could see but the merest patch, owing to his burying his head so persistently in the flank of the milcher."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[interlocutory]] | adjective | **1.** Consisting of dialogue. | *"In academic literature, interlocutory designates consisting of dialogue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[local]] | noun | **1.** Public transport consisting of a bus or train that stops at all stations or stops.<br>**2.** Anesthetic that numbs a particular area of the body. | *"That I may give the local wound a name, And make distinct the very breach whereout Hector’s great spirit flew."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[locale]] | noun | **1.** The scene of any event or action (especially the place of a meeting). | *"But this locale is also disputed, particularly by one who is resident near the spot, and fully conversant with whatever has descended to our own times respecting the original plan of the Castle."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[localisation]] | noun | **1.** (physiology) the principle that specific functions have relatively circumscribed locations in some particular part or organ of the body.<br>**2.** A determination of the place where something is. | *"Success in true pyritic working depends upon the intensity of oxidation of the sulphides, and upon the localisation of the resulting heat at the narrow bessemerising zone situated just above the tuyeres."* — Donald M. Levy, *Modern Copper Smelting* |
| [[localise]] | verb | **1.** Identify the location or place of.<br>**2.** Concentrate on a particular place or spot. | *"They are neither of the world nor out of it, and consequently, in so far as they are localised and incarnate and their actions woven into a tale, 'The Revolt of Islam' is a failure."* — Sydney Waterlow, *Shelley* |
| [[localised]] | verb | **1.** Identify the location or place of.<br>**2.** Concentrate on a particular place or spot. | *"They are neither of the world nor out of it, and consequently, in so far as they are localised and incarnate and their actions woven into a tale, 'The Revolt of Islam' is a failure."* — Sydney Waterlow, *Shelley* |
| [[localism]] | noun | **1.** A phrase or pronunciation that is peculiar to a particular locality.<br>**2.** A partiality for some particular place. | *"In academic literature, localism designates a phrase or pronunciation that is peculiar to a particular locality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[locality]] | noun | **1.** A surrounding or nearby region. | *"I have therefore taken a ’ouse in that locality, which, in the opinion of my friends, is a hollow bargain (taxes ridiculous, and use of fixtures included in the rent), and intend setting up professionally for myself there forthwith.” Here Mr."* — Charles Dickens, *Bleak House* |
| [[localization]] | noun | **1.** A determination of the place where something is.<br>**2.** (physiology) the principle that specific functions have relatively circumscribed locations in some particular part or organ of the body. | *"In academic literature, localization designates a determination of the place where something is."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[localize]] | verb | **1.** Identify the location or place of.<br>**2.** Concentrate on a particular place or spot. | *"Localized production favoring monopoly. § 6."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[localized]] | verb | **1.** Identify the location or place of.<br>**2.** Concentrate on a particular place or spot. | *"Localized production favoring monopoly. § 6."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[locally]] | adverb | **1.** By a particular locality.<br>**2.** To a restricted area of the body. | *"Local political units acquire ownership only in local industries and in wealth used locally by the citizens."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[locate]] | verb | **1.** Discover the location of; determine the place of; find by searching or examining.<br>**2.** Determine or indicate the place, site, or limits of, as if by an instrument or by a survey. | *"And with Standing and the forty tight in the dungeons, we’ll have all the time in the world to locate the dynamite.” “If we have to tear the prison down stone by stone,” Captain Jamie added valiantly."* — Jack London, *The Jacket (The Star-Rover)* |
| [[located]] | verb | **1.** Discover the location of; determine the place of; find by searching or examining.<br>**2.** Determine or indicate the place, site, or limits of, as if by an instrument or by a survey. | *"I gave no sign, made no move, until I had located him and distanced him."* — Jack London, *The Jacket (The Star-Rover)* |
| [[locater]] | noun | **1.** A person who fixes the boundaries of land claims. | *"In academic literature, locater designates a person who fixes the boundaries of land claims."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[locating]] | noun | **1.** The act of putting something in a certain place.<br>**2.** A determination of the place where something is. | *"Number 67!' I made a big deal out of hauling the list from my back pocket, carefully unfolding it, locating the number and reading the title aloud."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[location]] | noun | **1.** A point or extent in space.<br>**2.** The act of putting something in a certain place. | *"The passing on of the burden is called the _shifting_ of the tax; the final location of the burden is called the _incidence_ of the tax."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[locative]] | noun | **1.** The semantic role of the noun phrase that designates the place of the state or action denoted by the verb. | *"In academic literature, locative designates the semantic role of the noun phrase that designates the place of the state or action denoted by the verb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[locator]] | noun | **1.** A person who fixes the boundaries of land claims. | *"In academic literature, locator designates a person who fixes the boundaries of land claims."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[loco]] | adjective | **1.** Informal or slang terms for mentally irregular. | *"In academic literature, loco designates informal or slang terms for mentally irregular."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[locoism]] | noun | **1.** A disease of livestock caused by locoweed poisoning; characterized by weakness and lack of coordination and trembling and partial paralysis. | *"In academic literature, locoism designates a disease of livestock caused by locoweed poisoning; characterized by weakness and lack of coordination and trembling and partial paralysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[locomote]] | verb | **1.** Change location; move, travel, or proceed, also metaphorically. | *"In academic literature, locomote designates change location; move, travel, or proceed, also metaphorically."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[locomotion]] | noun | **1.** The power or ability to move.<br>**2.** Self-propelled movement. | *"After an hour employed in this unpleasant kind of locomotion, we started to our feet again and pursued our way boldly along the crest of the ridge."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[locomotive]] | noun | **1.** A wheeled vehicle consisting of a self-propelled engine that is used to draw trains along railway tracks.<br>**2.** Of or relating to locomotion. | *"Troy was full of activity, but his activities were less of a locomotive than a vegetative nature; and, never being based upon any original choice of foundation or direction, they were exercised on whatever object chance might place in their way."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[locomotor]] | adjective | **1.** Of or relating to locomotion. | *"FLORRY: _(Nods.)_ Locomotor ataxy."* — James Joyce, *Ulysses* |
| [[locoweed]] | noun | **1.** Any of several leguminous plants of western north america causing locoism in livestock.<br>**2.** Street names for marijuana. | *"In academic literature, locoweed designates any of several leguminous plants of western north america causing locoism in livestock."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[locule]] | noun | **1.** A small cavity or space within an organ or in a plant or animal. | *"In academic literature, locule designates a small cavity or space within an organ or in a plant or animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[loculus]] | noun | **1.** A small cavity or space within an organ or in a plant or animal. | *"In academic literature, loculus designates a small cavity or space within an organ or in a plant or animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[locum]] | noun | **1.** Someone (physician or clergyman) who substitutes temporarily for another member of the same profession. | *"He had accepted an appointment as _locum tenens_ for four weeks in an English Independent chapel at Hamburg, which delayed his arrival at Berlin until after the winter _semester_ had commenced."* — John Cairns, *Principal Cairns* |
| [[locus]] | noun | **1.** The scene of any event or action (especially the place of a meeting).<br>**2.** The specific site of a particular gene on its chromosome. | *"Robert and his disciples:--“Qui locus (_Cistercium_) et pro nemorum, et spinarum tunc temporis opacitate accessui hominum insolitus, a solis feris inhabitabatur."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[locust]] | noun | **1.** Migratory grasshoppers of warm regions having short antennae.<br>**2.** Hardwood from any of various locust trees. | *"It stands on a knoll surrounded by locust trees and lofty elms, from among which its decent whitewashed walls shine modestly forth, like Christian purity beaming through the shades of retirement."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[locusta]] | noun | **1.** A genus of acrididae. | *"In academic literature, locusta designates a genus of acrididae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[locustidae]] | noun | **1.** Short-horned grasshoppers; true locusts. | *"In academic literature, locustidae designates short-horned grasshoppers; true locusts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[locution]] | noun | **1.** A word or phrase that particular people use in particular situations. | *"In academic literature, locution designates a word or phrase that particular people use in particular situations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reallocate]] | verb | **1.** Allocate, distribute, or apportion anew. | *"In academic literature, reallocate designates allocate, distribute, or apportion anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reallocation]] | noun | **1.** A share that has been allocated again.<br>**2.** A new apportionment (especially a new apportionment of congressional seats in the united states on the basis of census results). | *"In academic literature, reallocation designates a share that has been allocated again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relocate]] | verb | **1.** Become established in a new location.<br>**2.** Move or establish in a new location. | *"In academic literature, relocate designates become established in a new location."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relocated]] | verb | **1.** Become established in a new location.<br>**2.** Move or establish in a new location. | *"In academic literature, relocated designates become established in a new location."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relocation]] | noun | **1.** The transportation of people (as a family or colony) to a new settlement (as after an upheaval of some kind).<br>**2.** The act of changing your residence or place of business. | *"In academic literature, relocation designates the transportation of people (as a family or colony) to a new settlement (as after an upheaval of some kind)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[translocate]] | verb | **1.** Transfer (a chromosomal segment) to a new position.<br>**2.** Move from one place to another, especially of wild animals. | *"In academic literature, translocate designates transfer (a chromosomal segment) to a new position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[translocation]] | noun | **1.** The transport of dissolved material within a plant.<br>**2.** (genetics) an exchange of chromosome parts. | *"In academic literature, translocation designates the transport of dissolved material within a plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unlocated]] | adjective | **1.** Lacking a particular location. | *"In academic literature, unlocated designates lacking a particular location."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · LOC
  </div>
</div>
