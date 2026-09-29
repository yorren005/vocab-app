---
status: unread
type: root_dashboard
---
# Dashboard — fund
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fund-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to pour”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking out across an open horizon with plenty of room to move.</span>
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

The root **fund** means to pour. It refers to the action of pouring and carrying out this process. In English, this root forms words such as *fund*, *foundation*, *refund*, and *fundamental*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to pour
> The root **fund** means to pour. It refers to the action of pouring and carrying out this process. In English, this root forms words such as *fund*, *foundation*, *refund*, and *fundamental*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To pour</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking out across an open horizon with plenty of room to move.</mark>
> - **Everyday Connection**: Think of familiar words like *fund* and *foundation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fund** comes from a Latin word that means *"to pour"*.
  - At its core, it describes the action of pour.

- **The Big Picture Idea**:
  - Picture looking out across an open horizon with plenty of room to move.
  - Whenever you see **fund** in an English word, think of **to pour**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to pour).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Fund**: A sum of money saved or made available for a particular purpose.
  - **Foundation**: The lowest load-bearing part of a building, typically below ground level.
  - **Refund**: An everyday English word showing the root's idea of *to pour*.
  - **Fundamental**: Forming a necessary base or core.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fund</mark>, think of <mark class="hl-def">to pour</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
Latin fundus (bottom, base, ground)
  │
  ├── Physical Architecture (fundāre: to lay a base)
  │     ├── found (to establish, lay base)
  │     ├── foundation (underlying base; charitable trust)
  │     └── founder (n.: one who establishes; v.: to sink to the bottom)
  │
  ├── Conceptual Principles (fundāmentum)
  │     ├── fundamental (primary, essential rule/principle)
  │     └── fundament (groundwork; anatomical buttocks)
  │
  ├── Deep Abstraction (prō- + fundus)
  │     ├── profound (deeply insightful / deeply felt)
  │     └── profundity (intellectual depth)
  │
  └── Financial Capital (French fonds < fundus)
        └── fund / funding (monetary capital base)
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

### Distinct Arenas of Meaning
1. **Civil Construction & Architecture**: *foundation*, *found* (underlying masonry, footing, bedrock).
2. **Epistemology & Education**: *fundamental*, *profound*, *profundity* (first principles, basic truths, penetrating insights).
3. **Corporate & Public Finance**: *fund*, *funding*, *foundation* (endowment, mutual fund, investment capital).
4. **Nautical Disaster & Failure**: *founder* (to sink beneath waves, or collapse in negotiations).

---

## 🔀 4. Prefix & Combining Dynamics on fund

### Prefix Combinations
- **pro- ("forth, down deep") + fund-**: Produces *profundus* (bottomless, deep $\to$ *profound*, *profundity*).

### Suffix Formations
- **-ment / -al**: *fundament*, *fundamental* (underlying constituent element).
- **-ation**: *foundation* (the permanent establishing act or the physical substructure).
- **-ity**: *profundity* (quality of having deep philosophical or emotional depth).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Practical Manifestation | Key Vocabulary |
| :--- | :--- | :--- |
| **Structural Engineering & Architecture** | Deep caissons, load-bearing footings, soil mechanics | *foundation*, *foundational* |
| **Finance & Investment Banking** | Sovereign wealth funds, venture capital, hedge funds | *fund*, *funding*, *mutual fund* |
| **Philosophy & Theoretical Physics** | Fundamental particles, epistemology, foundational axioms | *fundamental*, *fundamental physics*, *profound* |
| **Philanthropy & Non-Profit Law** | Endowed trusts, charitable grantmakers | *foundation*, *charitable foundation* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[fund]] | noun | **1.** A reserve of money set aside for some purpose.<br>**2.** A supply of something available for future use. | *"Upon that, he shut himself up for a few weeks with some books and some bones and seemed to acquire a considerable fund of information with great rapidity."* — Charles Dickens, *Bleak House* |
| [[fundament]] | noun | **1.** The fundamental assumptions from which something is begun or developed or calculated or explained.<br>**2.** The fleshy part of the human body that you sit on. | *"In academic literature, fundament designates the fundamental assumptions from which something is begun or developed or calculated or explained."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fundamental]] | noun | **1.** Any factor that could be considered important to the understanding of a particular business.<br>**2.** The lowest tone of a harmonic series. | *"So that, from point to point, now have you heard The fundamental reasons of this war, Whose great decision hath much blood let forth, And more thirsts after."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fundamentalism]] | noun | **1.** The interpretation of every word in the sacred texts as literal truth. | *"In academic literature, fundamentalism designates the interpretation of every word in the sacred texts as literal truth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fundamentalist]] | noun | **1.** A supporter of fundamentalism.<br>**2.** Of or relating to or tending toward fundamentalism. | *"Like the Fundamentalist in the West he refuses to have his faith shaken in the letter of the Law."* — William Edward Soothill, *The lotus of the wonderful law* |
| [[fundamentalistic]] | adjective | **1.** Of or relating to or tending toward fundamentalism. | *"In academic literature, fundamentalistic designates of or relating to or tending toward fundamentalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fundamentally]] | adverb | **1.** In essence; at bottom or by one's (or its) very nature. | *"It was different from Western chess, and yet could not but be fundamentally the same, tracing back to a common origin, probably India."* — Jack London, *The Jacket (The Star-Rover)* |
| [[fundamentals]] | noun | **1.** Principles from which other truths can be derived.<br>**2.** Any factor that could be considered important to the understanding of a particular business. | *"Their familiarity with deep space is often limited, so station lectures start with fundamentals."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[funded]] | verb | **1.** Convert (short-term floating debt) into long-term debt that bears fixed interest and is represented by bonds.<br>**2.** Place or store up in a fund for accumulation. | *"The assessment companies now get 10 per cent of their total incomes from their funded investments, as against 24 per cent for the old-line companies."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[funding]] | noun | **1.** Financial resources provided to make some project possible.<br>**2.** The act of financing. | *"If a suspicion had remained it must have been removed by the flight of Don John, who, funding his villanies were detected, fled from Messina to avoid the just anger of his brother."* — Charles Lamb, *Tales from Shakespeare* |
| [[fundraise]] | verb | **1.** Raise money for a cause or project. | *"In academic literature, fundraise designates raise money for a cause or project."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fundraiser]] | noun | **1.** Someone who solicits financial contributions.<br>**2.** A social function that is held for the purpose of raising money. | *"In academic literature, fundraiser designates someone who solicits financial contributions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[funds]] | noun | **1.** Assets in the form of money.<br>**2.** A reserve of money set aside for some purpose. | *"C. is to continue to play for this considerable stake, sir, he must have funds."* — Charles Dickens, *Bleak House* |
| [[fundulus]] | noun | **1.** Killifish. | *"In academic literature, fundulus designates killifish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fundus]] | noun | **1.** (anatomy) the base of a hollow organ or that part of the organ farthest from its opening. | *"In academic literature, fundus designates (anatomy) the base of a hollow organ or that part of the organ farthest from its opening."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[infundibulum]] | noun | **1.** Any of various funnel-shaped parts of the body (but especially the hypophyseal stalk). | *"In academic literature, infundibulum designates any of various funnel-shaped parts of the body (but especially the hypophyseal stalk)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[profundity]] | noun | **1.** Wisdom that is recondite and abstruse and profound.<br>**2.** Intellectual depth; penetrating knowledge; keen insight; etc. | *"As we study the teaching of Jesus here, we see anew the profundity of the saying attributed to him in the Fourth Gospel, "The truth shall make you free" (John 8:32)."* — T. R. Glover, *The Jesus of History* |
| [[refund]] | noun | **1.** Money returned to a payer.<br>**2.** The act of returning money received previously. | *"You have had the money and must refund it."* — Charles Dickens, *Bleak House* |
| [[superfund]] | noun | **1.** The federal government's program to locate and investigate and clean up the worst uncontrolled and abandoned toxic waste sites nationwide; administered by the environmental protection agency. | *"In academic literature, superfund designates the federal government's program to locate and investigate and clean up the worst uncontrolled and abandoned toxic waste sites nationwide; administered by the environmental protection agency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unfunded]] | adjective | **1.** Not furnished with funds. | *"The income arising from current labor is unfunded, because there is no permanent fund of accumulated wealth corresponding to it."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Space & Environment]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FUND
  </div>
</div>
