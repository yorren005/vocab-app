---
status: unread
type: root_dashboard
---
# Dashboard — fend
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fend-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to strike, ward off, or guard”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A protective shield deflecting a blow or soldiers marching in disciplined defense.</span>
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

The root **fend** means to strike, ward off, or guard. It refers to the action of strike,ing and carrying out this process. In English, this root forms words such as *defend*, *defendant*, *defender*, and *defensible*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to strike, ward off, or guard
> The root **fend** means to strike, ward off, or guard. It refers to the action of strike,ing and carrying out this process. In English, this root forms words such as *defend*, *defendant*, *defender*, and *defensible*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To strike, ward off, or guard</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A protective shield deflecting a blow or soldiers marching in disciplined defense.</mark>
> - **Everyday Connection**: Think of familiar words like *defend* and *defendant*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fend** comes from a Latin word that means *"to strike, ward off, or guard"*.
  - At its core, it describes the action of strike, ward off, or guard.

- **The Big Picture Idea**:
  - Picture a protective shield deflecting a blow or soldiers marching in disciplined defense.
  - Whenever you see **fend** in an English word, think of **to strike, ward off, or guard**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to strike, ward off, or guard).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Defend**: To protect from harm, danger, or attack.
  - **Defendant**: An individual, company, or institution sued or accused in a court of law.
  - **Defender**: A person who defends someone or something against attack or criticism.
  - **Defensible**: Justifiable by argument.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fend</mark>, think of <mark class="hl-def">to strike, ward off, or guard</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `fend-`: Present active verbal root.
  - `fens-` (< Latin *fēnsum*): Participial/nominal stem (*defense, offense*).
- **Prefix Machinery**:
  - `de-` ("down, away from"): *defend, defense, defensive, defensible*.
  - `ob-` ("against"): *offend, offense, offensive, offender*.
- **Suffixal Formations**:
  - `-ant`: *defendant*.
  - `-er`: *defender, offender, fender*.
  - `-ible`: *defensible*.
  - `-ive`: *defensive, offensive*.
  - `-less`: *defenseless*.

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
```
                      ┌── Protection & Law: defend, defendant, defender, defense, defensible
                      │
   [fend] ────────────┼── Aggression & Transgression: offend, offender, offense, offensive
 (Strike / Ward Off)  │
                      └── Mechanical & Survival: fend, fender, defenseless
```

---

## 🔀 4. Prefix & Combining Dynamics on fend
- **`de-` + `fend`**: *defend* — to ward off attacks physically or legally.
- **`ob-` + `fend`**: *offend* — to strike against moral standards, laws, or sensibilities.
- **`fend-` + `-er`**: *fender* — a protective cushion on a boat hull or car wheel well.
- **`in-` + `defensible`**: *indefensible* — incapable of being justified or protected.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Criminal Jurisprudence & Litigation**: Public *defenders*; criminal *defendants*; legal self-*defense*.
- **Military Strategy & Ballistics**: National *defense*; *defensive* fortification; missile defense umbrellas.
- **Automotive & Marine Engineering**: Car *fenders*; nautical bumpers and dock fenders.
- **Psychology & Interpersonal Dynamics**: Ego *defense* mechanisms; *offensive* communication.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[codefendant]] | noun | **1.** A defendant who has been joined together with one or more other defendants in a single action. | *"In academic literature, codefendant designates a defendant who has been joined together with one or more other defendants in a single action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[defend]] | verb | **1.** Argue or speak in defense of.<br>**2.** Be on the defensive; act against an attack. | *"Isis else defend, And serving you so long!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[defendable]] | adjective | **1.** Capable of being defended. | *"In academic literature, defendable designates capable of being defended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[defendant]] | noun | **1.** A person or institution against whom an action is brought in a court of law; the person being sued or accused. | *"Lords, let him go.—Please it your majesty, This is the day appointed for the combat, And ready are the appellant and defendant, The armourer and his man, to enter the lists, So please your highness to behold the fight."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[defender]] | noun | **1.** A person who cares for persons or property.<br>**2.** A fighter who holds out against attack. | *"Thou great defender of this Capitol, Stand gracious to the rites that we intend."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[defending]] | verb | **1.** Argue or speak in defense of.<br>**2.** Be on the defensive; act against an attack. | *"BASSANIO. [_Aside._] Why, I were best to cut my left hand off, And swear I lost the ring defending it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[effendi]] | noun | **1.** A former turkish term of respect; especially for government officials. | *"In academic literature, effendi designates a former turkish term of respect; especially for government officials."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fend]] | verb | **1.** Try to manage without help.<br>**2.** Withstand the force of something. | *"Oh, Gabriel,” he continued, “I am weak and foolish, and I don’t know what, and I can’t fend off my miserable grief!..."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[fender]] | noun | **1.** A barrier that surrounds the wheels of a vehicle to block splashing water or mud.<br>**2.** An inclined metal frame at the front of a locomotive to clear the track. | *"Weevle moodily pushes the snuffers-tray from him with his elbow, leans his head on his hand, puts his feet on the fender, and looks at the fire."* — Charles Dickens, *Bleak House* |
| [[fender-bender]] | noun | **1.** A collision between motor vehicles that produces minor damage. | *"In academic literature, fender-bender designates a collision between motor vehicles that produces minor damage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[offend]] | verb | **1.** Cause to feel resentment or indignation.<br>**2.** Act in disregard of laws, rules, contracts, or promises. | *"Thence it came That she whom all men prais’d, and whom myself, Since I have lost, have lov’d, was in mine eye The dust that did offend it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[offended]] | verb | **1.** Cause to feel resentment or indignation.<br>**2.** Act in disregard of laws, rules, contracts, or promises. | *"Be not offended; for it hurts not him That he is lov’d of me; I follow him not By any token of presumptuous suit, Nor would I have him till I do deserve him; Yet never know how that desert should be."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[offender]] | noun | **1.** A person who transgresses moral or civil law. | *"Let him approach A stranger, no offender; and inform him So ’tis our will he should."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[offending]] | verb | **1.** Cause to feel resentment or indignation.<br>**2.** Act in disregard of laws, rules, contracts, or promises. | *"By Jove, I am not covetous for gold, Nor care I who doth feed upon my cost; It yearns me not if men my garments wear; Such outward things dwell not in my desires; But if it be a sin to covet honour, I am the most offending soul alive."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undefendable]] | adjective | **1.** Not defended or capable of being defended. | *"In academic literature, undefendable designates not defended or capable of being defended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undefended]] | adjective | **1.** Not defended or capable of being defended. | *"Stafford, "this isn't true?" "Perfectly true, sir." Undefended, unreserved, stripped even of pride, Val stood up before them all as if before a firing party, for the others had involuntarily fallen back leaving him alone. . . ."* — Anthony Pryde, *Nightfall* |
| [[unoffending]] | adjective | **1.** Not offending.<br>**2.** Not causing anger or annoyance. | *"If I sit here thinking of him,” snarls the old man, holding up his impotent ten fingers, “I want to strangle him now.” And in a sudden access of fury, he throws the cushion at the unoffending Mrs."* — Charles Dickens, *Bleak House* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster War]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FEND
  </div>
</div>
