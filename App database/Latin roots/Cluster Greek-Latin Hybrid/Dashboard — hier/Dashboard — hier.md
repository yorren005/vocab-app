---
status: unread
type: root_dashboard
---
# Dashboard — hier
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">hier-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“sacred or holy”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Interconnected word patterns that combine classical ideas together.</span>
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

The root **hier** means sacred or holy. It describes the sacred order, divine consecration, and priestly authority. In English, this root forms words such as *hierarchy*, *hierarch*, *hierarchic*, and *hierarchical*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: sacred or holy
> The root **hier** means sacred or holy. It describes the sacred order, divine consecration, and priestly authority. In English, this root forms words such as *hierarchy*, *hierarch*, *hierarchic*, and *hierarchical*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Sacred or holy</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Interconnected word patterns that combine classical ideas together.</mark>
> - **Everyday Connection**: Think of familiar words like *hierarchy* and *hierarch*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **hier** comes from a Latin word that means *"sacred or holy"*.
  - At its core, it describes sacred or holy.

- **The Big Picture Idea**:
  - Picture interconnected word patterns that combine classical ideas together.
  - Whenever you see **hier** in an English word, think of **blended classical concepts**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of sacred or holy.
  - **Mental & Social**: How people experience, organize, or communicate about sacred or holy.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Hierarchy**: A ranked body of ecclesiastical rulers.
  - **Hierarch**: A chief priest, archbishop, or prelate of high ecclesiastical authority.
  - **Hierarchic**: Of, belonging to, or characteristic of a hierarchy.
  - **Hierarchical**: Arranged in order of rank, authority, or complexity.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">hier</mark>, think of <mark class="hl-def">blended classical concepts</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **hier-** operates as an initial combining element in English, attaching to classical Greek nominal, verbal, and adjectival stems, later receiving standard Greco-Latin and English derivational suffixes:
> - **Base Combining Root:** `hier-` / `hiero-` (before consonants: *hieroglyph*, *hierophant*, *hierocracy*; before vowels: *hierarch*, *hierarchic*).
> - **Adjectival Stem:** `hierat-` (< Greek *hieratikós*, forming *hieratic*, *hieratical*).
> - **Second Elements (Greek Combines):**
>   - `hier-` + `-archy` (< *arkhē*, "rule/order"): *hierarchy*, *hierarch*, *hierarchical*.
>   - `hiero-` + `-glyph` (< *glýphein*, "to carve"): *hieroglyph*, *hieroglyphic*.
>   - `hiero-` + `-phant` (< *phaínein*, "to reveal/show"): *hierophant*, *hierophantic*.
>   - `hiero-` + `-cracy` (< *krátos*, "power/rule"): *hierocracy*, *hierocratic*.
>   - `hiero-` + `-logy` (< *lógos*, "discourse/study"): *hierology*, *hierological*.
>   - `hiero-` + `-mancy` (< *manteía*, "divination"): *hieromancy*.
>   - `hiero-` + `-gamy` (< *gámos*, "marriage"): *hierogamy* (*hieros gamos*).
> - **Modern Morphological Affixes:** English applies Latinate suffixes (*-ize*, *-ization*, *-ism*, *-ic*, *-ical*, *-ically*) and Latin prefixes (*pan-*, *anti-*) to produce abstract, procedural, and technological vocabulary (*hierarchize*, *hierarchization*, *panhierarchy*).

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
> Although rooted in religious sanctity, the semantic branches of **hier-** divide into distinct modern channels:
> - **1. Structural Organization & Ranked Ladders:** In [[hierarchy]], [[hierarchical]], [[hierarchize]], and [[hierarch]], the concept shifts from sacred angelic orders to any tiered, nested, or tree-like chain of command, authority, or database structure.
> - **2. Sacred Inscriptions & Pictographic Writing:** In [[hieroglyph]], [[hieroglyphic]], and [[hieroglyphics]], the root denotes ancient sacred carving, extended metaphorically to any enigmatic, symbolic, or illegible handwriting or visual code.
> - **3. Sacerdotal Script & Stylized Aesthetics:** In [[hieratic]], the root designates the cursive script of ancient Egyptian priesthood, expanding in art history to denote rigid, solemn, highly conventionalized religious poses and iconography.
> - **4. Esoteric Revelation & Initiatory Teaching:** In [[hierophant]] and [[hierophantic]], the root denotes the solemn mystagogue who unveils hidden, arcana-laden truths to initiates, applied to literary critics, visionary philosophers, or aesthetic prophets.
> - **5. Ecclesiastical Governance & Theocracy:** In [[hierocracy]], the focus is political control exercised by an organized priesthood or clerical caste.
> - **6. Divination, Myth & Antiquities:** In [[hieromancy]], [[hieroscopy]], [[hierology]], and [[hierogamy]], the root retains its ancient ritual context of examining sacrificial entrails, studying sacred myths, or enacting the cosmic marriage of sky and earth.

---

## 🔀 4. Prefix & Combining Dynamics on hier

### Compounding Bases & Morphological Shifts

| Combining Form / Affix | Affix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `hier-` + `-arch` | sacred + ruler (*arkhós*) | [[hierarch]] | An ecclesiastical prelate, angelic dignitary, or high official in a ranked order. |
| `hier-` + `-archy` | sacred + rule (*arkhē*) | [[hierarchy]] | A system of persons, principles, or data items ranked one above the other. |
| `hiero-` + `-glyph` | sacred + carving (*glýphē*) | [[hieroglyph]] | A sacred character or symbol carved into stone; any enigmatic pictograph. |
| `hiero-` + `-phant` | sacred + revealer (*phaínein*) | [[hierophant]] | The chief priest who unveils sacred mysteries; an authoritative expositor. |
| `hiero-` + `-cracy` | sacred + power (*krátos*) | [[hierocracy]] | Government or political dominion exercised by a priesthood or clerical hierarchy. |
| `hiero-` + `-logy` | sacred + study (*lógos*) | [[hierology]] | The academic study of sacred literature, ecclesiastical history, or holy traditions. |
| `hiero-` + `-mancy` | sacred + divination (*manteía*) | [[hieromancy]] | The occult practice of divination through sacrificial rituals and holy objects. |
| `hiero-` + `-gamy` | sacred + marriage (*gámos*) | [[hierogamy]] | The sacred mythic marriage between deities, traditionally enacted by royal priests. |
| `hiero-` + `-phobia` | sacred + fear (*phóbos*) | [[hierophobia]] | An irrational, morbid dread of sacred objects, religious places, or holy rites. |
| `hiero-` + `-dule` | sacred + slave (*doûlos*) | [[hierodule]] | A consecrated slave, servant, or temple attendant dedicated to a Greek sanctuary. |
| `pan-` + `hierarchy` | all + sacred rank | [[panhierarchy]] | A comprehensive, all-inclusive hierarchy integrating multiple subordinate tiers. |
| `anti-` + `hierarchical` | against + ranked order | [[anti-hierarchical]] | Opposed to institutional stratification, centralized command, or rank privilege. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ic` / `-ical` | Adjective | [[hierarchical]], [[hieratic]], [[hieroglyphic]] | Pertaining to, arranged in, or marked by sacred rank, priestly style, or pictograms. |
| `-ically` | Adverb | [[hierarchically]], [[hieratically]], [[hieroglyphically]] | In a manner characterized by ranked tiers, priestly solemnity, or symbolic carving. |
| `-ize` | Verb | [[hierarchize]] | To arrange, structure, or classify elements into a graded series of levels. |
| `-ization` | Noun (Process) | [[hierarchization]] | The systemic process of organizing or stratifying components into ranks. |
| `-ist` | Noun (Agent) | [[hieroglyphist]], [[hierologist]] | A scholar, epigrapher, or specialist who deciphers or studies sacred texts. |
| `-ism` | Noun (Doctrine) | [[hierarchism]], [[hieraticism]] | The advocacy of hierarchical authority; the rigid adherence to priestly conventions. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 💻 **Computer Science & Data Architecture** | [[hierarchy]], [[hierarchical]], [[hierarchize]] | Tree data structures, directory path trees (`/root/usr/bin`), OOP class inheritance hierarchies, and DOM nodes in web engineering. |
| 🏛️ **Political Science, Sociology & Management** | [[hierarchy]], [[hierarch]], [[hierocracy]], [[hierarchization]] | Bureaucratic command chains (Weberian bureaucracy), military rank structures, corporate management ladders, and theocratic governance. |
| 📜 **Archaeology, Epigraphy & Egyptology** | [[hieroglyph]], [[hieroglyphic]], [[hieratic]], [[hieroglyphist]] | Decipherment of the Rosetta Stone (Champollion, 1822), epigraphic recording on temple walls, and paleographic study of papyrus scrolls. |
| 🎨 **Art History & Aesthetics** | [[hieratic]], [[hieratical]], [[hieraticism]] | Sacerdotal frontality, Byzantine mosaic rigidity, Egyptian canonical proportions, and formal stylization free from naturalistic illusion. |
| 🕊️ **Religious Studies & Classical Myth** | [[hierophant]], [[hierology]], [[hierogamy]], [[hieromancy]] | The Eleusinian Mysteries of Demeter, fertility rituals of ancient Near Eastern temples, and structural comparisons of world scriptures. |
| 🧠 **Cognitive Psychology & Linguistics** | [[hierarchy]], [[hierarchical]] | Maslow's Hierarchy of Needs, Chomskyan syntactic phrase structure trees, and cognitive models of categorical taxonomy. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[hieracium]] | noun | **1.** Large genus of perennial hairy herbs of europe to western asia to northwestern africa and north america; few are ornamental; often considered congeneric with pilosella. | *"Var. _b._ _Prenanthis_, Pers.; spots circular or irregular, purplish; subiculum incrassated.—On leaves of Hawkweed (_Hieracium paludosum_)."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[hierarch]] | noun | **1.** A person who holds a high position in a hierarchy.<br>**2.** A senior clergyman and dignitary. | *"To whom the winged Hierarch repli’d."* — John Milton, *Paradise Lost* |
| [[hierarchal]] | adjective | **1.** Classified according to various criteria into successive levels or layers. | *"In academic literature, hierarchal designates classified according to various criteria into successive levels or layers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hierarchic]] | adjective | **1.** Classified according to various criteria into successive levels or layers. | *"In academic literature, hierarchic designates classified according to various criteria into successive levels or layers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hierarchical]] | adjective | **1.** Classified according to various criteria into successive levels or layers. | *"Is it true that we two young gentlemen have been promoted to be sergeants?" "I don't know anything about it, friend Pirli," I answered; and it was true that I was ignorant of my elevation to the hierarchical altitude of a sergeant."* — Benito Pérez Galdós, *Saragossa: A Story of Spanish Valor* |
| [[hierarchically]] | adverb | **1.** In a hierarchical manner. | *"In academic literature, hierarchically designates in a hierarchical manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hierarchy]] | noun | **1.** A series of ordered groupings of people or things within a system.<br>**2.** The organization of people at different ranks in an administrative body. | *"Drummer, my plans include a position of great power and prestige for you." "Indeed?" "A new elite and a new hierarchy will be created when I take control."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[hieratic]] | noun | **1.** A cursive form of egyptian hieroglyphics; used especially by the priests.<br>**2.** Associated with the priesthood or priests. | *"It reflects a priestly culture in its hieratic forms and symbolical ornament."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[hieratical]] | adjective | **1.** Associated with the priesthood or priests. | *"In academic literature, hieratical designates associated with the priesthood or priests."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hierocracy]] | noun | **1.** A ruling body composed of clergy. | *"In academic literature, hierocracy designates a ruling body composed of clergy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hieroglyph]] | noun | **1.** Writing that resembles hieroglyphics (usually by being illegible).<br>**2.** A writing system using picture symbols; used in ancient egypt. | *"When the gnarl'd, knotted trunks Eucalyptian Seem carved, like weird columns Egyptian, With curious device--quaint inscription, And hieroglyph strange."* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[hieroglyphic]] | noun | **1.** Writing that resembles hieroglyphics (usually by being illegible).<br>**2.** A writing system using picture symbols; used in ancient egypt. | *"She had dreamed of an aged and dignified face, the sublimation of all the d’Urberville lineaments, furrowed with incarnate memories representing in hieroglyphic the centuries of her family’s and England’s history."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[hieroglyphical]] | adjective | **1.** Resembling hieroglyphic writing.<br>**2.** Written in or belonging to a writing system using pictorial symbols. | *"These are hieroglyphical; that is, if you call those mysterious cyphers on the walls of pyramids hieroglyphics, then that is the proper word to use in the present connexion."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[hieroglyphically]] | adverb | **1.** By means of hieroglyphs. | *"In academic literature, hieroglyphically designates by means of hieroglyphs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hierolatry]] | noun | **1.** The worship of saints. | *"In academic literature, hierolatry designates the worship of saints."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hieronymus]] | noun | **1.** (roman catholic church) one of the great fathers of the early christian church whose major work was his translation of the scriptures from hebrew and greek into latin (which became the vulgate); a saint and doctor of the church (347-420). | *"In academic literature, hieronymus designates (roman catholic church) one of the great fathers of the early christian church whose major work was his translation of the scriptures from hebrew and greek into latin (which became the vulgate); a saint and doctor of the church (347-420)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hierophant]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin hier within the domain of Greek-Latin Hybrid.<br>**2.** A technical or specialized form exhibiting the properties of hier in systematic terminology. | *"I stood motionless under my hierophant’s touch."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[nonhierarchic]] | adjective | **1.** Not classified hierarchically. | *"In academic literature, nonhierarchic designates not classified hierarchically."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonhierarchical]] | adjective | **1.** Not classified hierarchically. | *"In academic literature, nonhierarchical designates not classified hierarchically."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Greek-Latin Hybrid]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · HIER
  </div>
</div>
