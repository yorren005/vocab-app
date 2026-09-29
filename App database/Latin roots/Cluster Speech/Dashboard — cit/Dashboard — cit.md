---
status: unread
type: root_dashboard
---
# Dashboard — cit
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cit-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to call, summon, rouse, or urge”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Speaking words clearly so that an audience understands every sentence.</span>
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

The root **cit** means to call, summon, rouse, or urge. It refers to the action of call,ing and carrying out this process. In English, this root forms words such as *cite*, *excite*, *incite*, and *recite*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to call, summon, rouse, or urge
> The root **cit** means to call, summon, rouse, or urge. It refers to the action of call,ing and carrying out this process. In English, this root forms words such as *cite*, *excite*, *incite*, and *recite*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To call, summon, rouse, or urge</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Speaking words clearly so that an audience understands every sentence.</mark>
> - **Everyday Connection**: Think of familiar words like *cite* and *excite*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cit** comes from a Latin word that means *"to call, summon, rouse, or urge"*.
  - At its core, it describes the action of call, summon, rouse, or urge.

- **The Big Picture Idea**:
  - Picture speaking words clearly so that an audience understands every sentence.
  - Whenever you see **cit** in an English word, think of **to call, summon, rouse, or urge**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to call, summon, rouse, or urge).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Cite**: To quote a passage, book, or author as evidence for or justification of an argument.
  - **Excite**: To cause strong feelings of enthusiasm and eagerness in someone.
  - **Incite**: To encourage or stir up violent or unlawful behavior.
  - **Recite**: To repeat aloud or declaim from memory before an audience.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cit</mark>, think of <mark class="hl-def">to call, summon, rouse, or urge</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
PIE *ḱey- (to set in motion) ──> Latin citāre (to summon, urge, cite)
  │
  ├── Scholarly Authority & Law
  │     ├── cite (to summon as evidence / quote)
  │     └── citation (formal mention / reference)
  │
  ├── Dynamic Arousal & Energy
  │     ├── ex- + citāre ───────────> excite, excitement, excitable
  │     └── in- + citāre ───────────> incite, incitement (spur to action)
  │
  ├── Memory Recall
  │     └── re- + citāre ───────────> recite, recitation
  │
  └── Medical Revival
        └── re- + sub- + citāre ────> resuscitate, resuscitation
```

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

### Distinct Spheres of Manifestation
1. **Academic Scholarship & Legal Evidence**: *cite* (quoting authoritative texts, academic referencing).
2. **Emotional & Neurological Arousal**: *excite* (heightening sensory focus, stimulating enthusiasm).
3. **Provocation & Public Order**: *incite* (goading mobs into rebellion or riots).
4. **Oral Performance & Memory**: *recite* (declaiming poetry, repeating prayer litanies).
5. **Emergency Medicine & Resuscitation**: *resuscitate* (cardiopulmonary resuscitation, reviving from clinical shock).

---

## 🔀 4. Prefix & Combining Dynamics on cit

### Prefix Formations
- **ex- ("out, up") + cit-**: *excite* (to call forth energy from within).
- **in- ("into, toward") + cit-**: *incite* (to urge forward into aggressive action).
- **re- ("again, back") + cit-**: *recite* (to call forth again from memory).
- **re- + sub- + cit-**: *resuscitate* (to summon back up from underneath).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Practical Manifestation | Key Vocabulary |
| :--- | :--- | :--- |
| **Academic Publishing & Law** | Bibliography styles (APA/MLA), legal citations, case law precedents | *cite*, *citation*, *authoritative citation* |
| **Criminal Law & National Security** | Incitement to violence, sedition statutes, riotous behavior | *incite*, *incitement* |
| **Physics & Quantum Chemistry** | Excited states, electron orbital transitions, nuclear excitation | *excite*, *excitation*, *excited state* |
| **Critical Care & Emergency Medicine** | CPR (cardiopulmonary resuscitation), advanced cardiac life support | *resuscitate*, *resuscitation* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[ascites]] | noun | **1.** Accumulation of serous fluid in peritoneal cavity. | *"In academic literature, ascites designates accumulation of serous fluid in peritoneal cavity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ascitic]] | adjective | **1.** Of or relating to or resulting from an abnormal accumulation of protein and electrolyte rich fluid in the peritoneal cavity. | *"In academic literature, ascitic designates of or relating to or resulting from an abnormal accumulation of protein and electrolyte rich fluid in the peritoneal cavity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[citadel]] | noun | **1.** A stronghold into which people could go for shelter during a battle. | *"Though I swore I leap’d from the window of the citadel,— FIRST LORD. [_Aside._] How deep?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[citation]] | noun | **1.** An official award (as for bravery or service) usually given as formal public statement.<br>**2.** (law) the act of citing (as of spoken words or written passages or legal precedents etc.). | *"Is Richard a monster in all this, or would Chancery be found rich in such precedents too if they could be got for citation from the Recording Angel?"* — Charles Dickens, *Bleak House* |
| [[cite]] | noun | **1.** A short note recognizing a source of information or of a quoted passage.<br>**2.** Make reference to. | *"Mark you this, Bassanio, The devil can cite Scripture for his purpose."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[citellus]] | noun | **1.** Typical ground squirrels. | *"In academic literature, citellus designates typical ground squirrels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[citified]] | verb | **1.** Accustom to urban ways.<br>**2.** Being or having the customs or manners or dress of a city person. | *"He had a citified air about him that ate into Tom’s vitals."* — Mark Twain, *The Adventures of Tom Sawyer, Complete* |
| [[citify]] | verb | **1.** Accustom to urban ways. | *"He had a citified air about him that ate into Tom’s vitals."* — Mark Twain, *The Adventures of Tom Sawyer, Complete* |
| [[citizen]] | noun | **1.** A native or naturalized member of a state or other political community. | *"The belly answered— FIRST CITIZEN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[citizenry]] | noun | **1.** The body of citizens of a state or country. | *"I will govern well, and we shall prosper," President Narval glibly promised the Plutonian citizenry."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[citizenship]] | noun | **1.** The status of a citizen with rights and duties.<br>**2.** Conduct as a citizen. | *"The economic groupings of men connected by a network of trades never have and never will correspond very nearly with political groupings of men bound together by common citizenship in particular states."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[citlaltepetl]] | noun | **1.** An extinct volcano in southern mexico between mexico city and veracruz; the highest peak in mexico (18,695 feet). | *"In academic literature, citlaltepetl designates an extinct volcano in southern mexico between mexico city and veracruz; the highest peak in mexico (18,695 feet)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[citole]] | noun | **1.** A 16th century musical instrument resembling a guitar with a pear-shaped soundbox and wire strings. | *"In academic literature, citole designates a 16th century musical instrument resembling a guitar with a pear-shaped soundbox and wire strings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[citrange]] | noun | **1.** More aromatic and acidic than oranges.<br>**2.** More aromatic and acid tasting than oranges; used in beverages and marmalade. | *"In academic literature, citrange designates more aromatic and acidic than oranges."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[citrate]] | noun | **1.** A salt or ester of citric acid.<br>**2.** Cause to form a salt or ester of citric acid. | *"In academic literature, citrate designates a salt or ester of citric acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[citric]] | adjective | **1.** Of or related to citric acid. | *"In academic literature, citric designates of or related to citric acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[citrin]] | noun | **1.** A vitamin that maintains the resistance of cell and capillary walls to permeation. | *"In academic literature, citrin designates a vitamin that maintains the resistance of cell and capillary walls to permeation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[citrine]] | noun | **1.** Semiprecious yellow quartz resembling topaz. | *"In academic literature, citrine designates semiprecious yellow quartz resembling topaz."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[citron]] | noun | **1.** Large lemonlike fruit with thick aromatic rind; usually preserved.<br>**2.** Thorny evergreen small tree or shrub of india widely cultivated for its large lemonlike fruits that have thick warty rind. | *"It is plums of rubies, in pictures of citron."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[citroncirus]] | noun | **1.** A cross between citrus sinensis and poncirus trifoliata. | *"In academic literature, citroncirus designates a cross between citrus sinensis and poncirus trifoliata."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[citronwood]] | noun | **1.** Wood of a citron tree.<br>**2.** Durable fragrant wood; used in building (as in the roof of the cathedral at cordova, spain). | *"In academic literature, citronwood designates wood of a citron tree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[citrous]] | adjective | **1.** Of or relating to plants of the genus citrus.<br>**2.** Of or relating to or producing fruit of the plants of the genus citrus. | *"In academic literature, citrous designates of or relating to plants of the genus citrus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[citrulline]] | noun | **1.** An amino acid that does not occur in proteins but is an intermediate in the conversion of ornithine to arginine. | *"In academic literature, citrulline designates an amino acid that does not occur in proteins but is an intermediate in the conversion of ornithine to arginine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[citrullus]] | noun | **1.** A dicot genus of the family cucurbitaceae including watermelons. | *"In academic literature, citrullus designates a dicot genus of the family cucurbitaceae including watermelons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[citrus]] | noun | **1.** Any of numerous fruits of the genus citrus having thick rind and juicy pulp; grown in warm regions.<br>**2.** Any of numerous tropical usually thorny evergreen trees of the genus citrus having leathery evergreen leaves and widely cultivated for their juicy edible fruits having leathery aromatic rinds. | *"The membership of the former is made up entirely of the local citrus growers' associations in California."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[cittern]] | noun | **1.** A 16th century musical instrument resembling a guitar with a pear-shaped soundbox and wire strings. | *"In academic literature, cittern designates a 16th century musical instrument resembling a guitar with a pear-shaped soundbox and wire strings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[city]] | noun | **1.** A large and densely populated urban area; may include several independent administrative districts.<br>**2.** An incorporated administrative district established by state charter. | *"Virginity being blown down, man will quicklier be blown up; marry, in blowing him down again, with the breach yourselves made, you lose your city."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[city-born]] | adjective | **1.** Being or having the customs or manners or dress of a city person. | *"In academic literature, city-born designates being or having the customs or manners or dress of a city person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[city-bred]] | adjective | **1.** Being or having the customs or manners or dress of a city person. | *"In academic literature, city-bred designates being or having the customs or manners or dress of a city person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[city-like]] | adjective | **1.** Resembling a city. | *"In academic literature, city-like designates resembling a city."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[city-state]] | noun | **1.** A state consisting of a sovereign city. | *"In academic literature, city-state designates a state consisting of a sovereign city."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cityfied]] | adjective | **1.** Being or having the customs or manners or dress of a city person. | *"In academic literature, cityfied designates being or having the customs or manners or dress of a city person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cityscape]] | noun | **1.** A viewpoint toward a city or other heavily populated area.<br>**2.** Painting depicting a city or urban area. | *"In academic literature, cityscape designates a viewpoint toward a city or other heavily populated area."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[citywide]] | adjective | **1.** Occurring or extending throughout a city. | *"In academic literature, citywide designates occurring or extending throughout a city."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[excitability]] | noun | **1.** Excessive sensitivity of an organ or body part.<br>**2.** Being easily excited. | *"Feeling uneasy and dissatisfied with himself for this nervous excitability, he returned to bed."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[excitable]] | adjective | **1.** Easily excited.<br>**2.** Capable of responding to stimuli. | *"Jarndyce was constantly beset by the crowd of excitable ladies and gentlemen whose proceedings had so much astonished us."* — Charles Dickens, *Bleak House* |
| [[excitableness]] | noun | **1.** Being easily excited. | *"Snagsby; “I was sure you would feel it yourself and would excuse the reasonableness of MY feelings when coupled with the known excitableness of my little woman."* — Charles Dickens, *Bleak House* |
| [[excitant]] | noun | **1.** A drug that temporarily quickens some vital process.<br>**2.** (of drugs e.g.) able to excite or stimulate. | *"In academic literature, excitant designates a drug that temporarily quickens some vital process."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[excitation]] | noun | **1.** The state of being emotionally aroused and worked up.<br>**2.** The neural or electrical arousal of an organ or muscle or gland. | *"The influence that had passed into Clare like an excitation from the sky did not die down."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[excitative]] | adjective | **1.** (of drugs e.g.) able to excite or stimulate. | *"In academic literature, excitative designates (of drugs e.g.) able to excite or stimulate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[excitatory]] | adjective | **1.** (of drugs e.g.) able to excite or stimulate. | *"In academic literature, excitatory designates (of drugs e.g.) able to excite or stimulate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[excite]] | verb | **1.** Arouse or elicit a feeling.<br>**2.** Act as a stimulant. | *"Revenges burn in them; for their dear causes Would to the bleeding and the grim alarm Excite the mortified man."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[excited]] | verb | **1.** Arouse or elicit a feeling.<br>**2.** Act as a stimulant. | *"Beaten for loyalty Excited me to treason."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[excitedly]] | adverb | **1.** With excitement; in an excited manner. | *"Mea, come quick," the young spy exclaimed excitedly, "look!"* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[excitement]] | noun | **1.** The feeling of lively and cheerful joy.<br>**2.** The state of being emotionally aroused and worked up. | *"I should be extremely sorry if she scolded Loneli in the first excitement about the spilled milk."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[exciting]] | verb | **1.** Arouse or elicit a feeling.<br>**2.** Act as a stimulant. | *"But it is so exciting to imagine that an old, old Baron of Wallerstätten might wander around the battlements in his armor."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[excitingly]] | adverb | **1.** In an exciting manner. | *"I have talked, and let you talk, too much and too excitingly."* — Martha Finley, *Elsie's Kith and Kin* |
| [[incitation]] | noun | **1.** Something that incites or provokes; a means of arousing or stirring to action.<br>**2.** An act of urging on or spurring on or rousing to action or instigating. | *"In academic literature, incitation designates something that incites or provokes; a means of arousing or stirring to action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incite]] | verb | **1.** Give an incentive for action.<br>**2.** Provoke or stir up. | *"No blown ambition doth our arms incite, But love, dear love, and our ag’d father’s right: Soon may I hear and see him! [_Exeunt._] SCENE V."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incitement]] | noun | **1.** An act of urging on or spurring on or rousing to action or instigating.<br>**2.** Needed encouragement. | *"The hope of impunity is a strong incitement to sedition; the dread of punishment, a proportionably strong discouragement to it."* — Alexander Hamilton, *The Federalist Papers* |
| [[inciter]] | noun | **1.** Someone who deliberately foments trouble. | *"In academic literature, inciter designates someone who deliberately foments trouble."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incitive]] | adjective | **1.** Arousing to action or rebellion. | *"In academic literature, incitive designates arousing to action or rebellion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncitizen]] | noun | **1.** A person who comes from a foreign country; someone who does not owe allegiance to your country. | *"In academic literature, noncitizen designates a person who comes from a foreign country; someone who does not owe allegiance to your country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[occitan]] | noun | **1.** The medieval dialects of langue d'oc (southern france). | *"In academic literature, occitan designates the medieval dialects of langue d'oc (southern france)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overexcited]] | adjective | **1.** Unduly excited. | *"In academic literature, overexcited designates unduly excited."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recital]] | noun | **1.** The act of giving an account describing incidents or a course of events.<br>**2.** Performance of music or dance especially by soloists. | *"The recital of his adventure obliterated for the time all sense of their own desires, and they thanked God together that their loss had been the widow's gain."* — Classic Author, *The wonders of prayer* |
| [[recitalist]] | noun | **1.** A musician who gives recitals. | *"In academic literature, recitalist designates a musician who gives recitals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recitation]] | noun | **1.** Written matter that is recited from memory.<br>**2.** A public instance of reciting or repeating (from memory) something prepared in advance. | *"Well," said he, "when I came in from recitation a short time ago, I found this envelope on the floor and that five dollar bill in it."* — Classic Author, *The wonders of prayer* |
| [[recitative]] | noun | **1.** A vocal passage of narrative text that a singer delivers with natural rhythms of speech. | *"Here, John, don’t ’ee see me?” She nudged him, while he, looking through her as through a window-pane, went on with his recitative."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[recite]] | verb | **1.** Recite in elocution.<br>**2.** Repeat aloud from memory. | *"I'll recite it to you: A SONG ABOUT A WELL KNOWN YOUNG LADY."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[reciter]] | noun | **1.** Someone who recites from memory. | *"In academic literature, reciter designates someone who recites from memory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unexcitable]] | adjective | **1.** Not easily excited. | *"In academic literature, unexcitable designates not easily excited."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unexcited]] | adjective | **1.** Not excited. | *"In academic literature, unexcited designates not excited."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unexciting]] | adjective | **1.** Not stimulating.<br>**2.** Not exciting. | *"Not that he bears the desk any ill will, but he must do something, and it must be something of an unexciting nature, which will lay neither his physical nor his intellectual energies under too heavy contribution."* — Charles Dickens, *Bleak House* |
| [[unexcitingly]] | adverb | **1.** In an unexciting manner. | *"In academic literature, unexcitingly designates in an unexciting manner."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Speech]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CIT
  </div>
</div>
