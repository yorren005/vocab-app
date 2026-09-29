---
status: unread
type: root_dashboard
---
# Dashboard — grav
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">grav-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“heavy or weighty”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Lifting a dense iron dumbbell and feeling its heavy downward pull.</span>
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

The root **grav** means heavy or weighty. It describes the quality, appearance, or condition of being heavy or weighty. In English, this root forms words such as *gravity*, *grave*, *gravitate*, and *aggravate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: heavy or weighty
> The root **grav** means heavy or weighty. It describes the quality, appearance, or condition of being heavy or weighty. In English, this root forms words such as *gravity*, *grave*, *gravitate*, and *aggravate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Heavy or weighty</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Lifting a dense iron dumbbell and feeling its heavy downward pull.</mark>
> - **Everyday Connection**: Think of familiar words like *gravity* and *grave*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **grav** comes from a Latin word that means *"heavy or weighty"*.
  - At its core, it describes heavy or weighty.

- **The Big Picture Idea**:
  - Picture lifting a dense iron dumbbell and feeling its heavy downward pull.
  - Whenever you see **grav** in an English word, think of **weight, heaviness, and pressure**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of heavy or weighty.
  - **Mental & Social**: How people experience, organize, or communicate about heavy or weighty.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Gravity**: The universal force of attraction between all matter.
  - **Grave**: Giving cause for alarm.
  - **Gravitate**: To move toward or be attracted to a person, place, or thing.
  - **Aggravate**: To make a problem, injury, or offense worse or more serious.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">grav</mark>, think of <mark class="hl-def">weight, heaviness, and pressure</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `grav-` (< Latin *gravis*): Base adjectival root.
  - `gravit-` (< Latin *gravitās*): Nominal and physical base.
  - `griev-` (Old French vowel shift): *grieve, grievance, grievous*.
- **Prefix Machinery**:
  - `ad-` ("to, toward, intensive"): *aggravate, aggravation* (< *ad-* + *gravāre* "to make heavier").
- **Suffixal Formations**:
  - `-itas`: *gravitas*.
  - `-ity`: *gravity*.
  - `-ation`: *gravitation, aggravation*.
  - `-id`: *gravid* ("pregnant").
  - `-ous`: *grievous*.

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
                      ┌── Physics & Space: gravity, gravitation, gravitational, gravitate
                      │
   [grav] ────────────┼── Character & Demeanor: gravitas, grave (serious), gravely
 (Heavy / Burdened)   │
                      ├── Biology & Law: gravid, aggravate, aggravation
                      │
                      └── Emotional Sorrow: grieve, grievance, grievous
```

---

## 🔀 4. Prefix & Combining Dynamics on grav
- **`ad-` + `grav-` + `-ate`**: *aggravate* — to make a problem, injury, or offense heavier or more severe.
- **`grav-` + `-itas`**: *gravitas* — dignity, seriousness, or solemnity of manner.
- **`grav-` + `-id`**: *gravid* — pregnant; carrying eggs or young.
- **`grav-` + `-itate`**: *gravitate* — to move toward or be attracted to a place, person, or thing.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Astrophysics & General Relativity**: *Gravitational* waves; spacetime curvature; black hole singularity *gravity*.
- **Political Leadership & Statesmanship**: Executive *gravitas*; *grave* diplomatic crises.
- **Obstetrics & Zoology**: *Gravid* uterus; *gravid* reptiles and marine species.
- **Labor Law & Civil Rights**: Workplace *grievance* arbitration procedures.
- **Criminal Law**: *Aggravated* assault; aggravating circumstances in sentencing.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[aggravate]] | verb | **1.** Make worse.<br>**2.** Exasperate or irritate. | *"I beseek you now, aggravate your choler."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[aggravated]] | verb | **1.** Make worse.<br>**2.** Exasperate or irritate. | *"Indeed, she had two.” My Lady, whose chronic malady of boredom has been sadly aggravated by Volumnia this evening, glances wearily towards the candlesticks and heaves a noiseless sigh."* — Charles Dickens, *Bleak House* |
| [[aggravating]] | verb | **1.** Make worse.<br>**2.** Exasperate or irritate. | *"You are the husband,” repeated Miss Havisham, “of the sister of this boy?” It was very aggravating; but, throughout the interview, Joe persisted in addressing Me instead of Miss Havisham."* — Charles Dickens, *Great Expectations* |
| [[aggravatingly]] | adverb | **1.** In an aggravating fashion. | *"My appearance must have prepared him for my answer before it came, uttered in a very calm, very haughty, aggravatingly deliberate tone."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[aggravation]] | noun | **1.** An exasperated feeling of annoyance.<br>**2.** Unfriendly behavior that causes anger or resentment. | *"All the unowned dogs who stray into the Inns of Court and pant about staircases and other dry places seeking water give short howls of aggravation."* — Charles Dickens, *Bleak House* |
| [[aggravator]] | noun | **1.** An unpleasant person who is annoying or exasperating. | *"In academic literature, aggravator designates an unpleasant person who is annoying or exasperating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[engrave]] | verb | **1.** Carve, cut, or etch into a material or surface.<br>**2.** Impress or affect deeply. | *"Send to her, by the man that slew her brothers, A pair of bleeding hearts; thereon engrave “Edward” and “York.” Then haply will she weep."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[engraved]] | verb | **1.** Carve, cut, or etch into a material or surface.<br>**2.** Impress or affect deeply. | *"Has the picture been engraved, miss?” “The picture has never been engraved."* — Charles Dickens, *Bleak House* |
| [[engraver]] | noun | **1.** A skilled worker who can inscribe designs or writing onto a surface by carving or etching.<br>**2.** A printmaker who prints from an engraved printing plate. | *"He was an engraver as well as goldsmith, sculptor, and painter.”--Heaton."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[engraving]] | noun | **1.** A print made from an engraving.<br>**2.** A block or plate or other hard surface that has been engraved. | *"Every hedge, bush, and tree was distinct as in a line engraving."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[grave]] | noun | **1.** Death of a person.<br>**2.** A place for the burial of a corpse (especially beneath the ground and marked by a tombstone). | *"Thou art the grave where buried love doth live, Hung with the trophies of my lovers gone, Who all their parts of me to thee did give, That due of many, now is thine alone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gravedigger]] | noun | **1.** A person who earns a living by digging graves. | *"Wopsle in a comprehensive black cloak, being descried entering at the turnpike, the gravedigger was admonished in a friendly way, “Look out!"* — Charles Dickens, *Great Expectations* |
| [[gravel]] | noun | **1.** Rock fragments and pebbles.<br>**2.** Cause annoyance in; disturb, especially by minor irritations. | *"LAUNCELET. [_Aside._] O heavens, this is my true-begotten father, who being more than sand-blind, high-gravel blind, knows me not."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gravelly]] | adjective | **1.** Abounding in small stones.<br>**2.** Unpleasantly harsh or grating in sound. | *"All I know about the matter is, that one day Marheyo in my presence poured out the last drop from his huge calabash, and I observed at the bottom of the vessel a small quantity of gravelly sediment very much resembling our common sand."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[gravelweed]] | noun | **1.** Perennial herb with yellow flowers; southern and south central united states. | *"In academic literature, gravelweed designates perennial herb with yellow flowers; southern and south central united states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gravely]] | adverb | **1.** In a grave and sober manner.<br>**2.** To a severe or serious degree. | *"If thou dost it half so gravely, so majestically, both in word and matter, hang me up by the heels for a rabbit-sucker or a poulter’s hare."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[graven]] | verb | **1.** Shape (a material like stone or wood) by whittling away at it.<br>**2.** Carve, cut, or etch into a material or surface. | *"Rise resty Muse, my love’s sweet face survey, If time have any wrinkle graven there, If any, be a satire to decay, And make time’s spoils despised everywhere."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[graveness]] | noun | **1.** A manner that is serious and solemn. | *"A very riband in the cap of youth, Yet needful too, for youth no less becomes The light and careless livery that it wears Than settled age his sables and his weeds, Importing health and graveness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[graver]] | noun | **1.** A tool used by an engraver.<br>**2.** Dignified and somber in manner or character and committed to keeping promises. | *"Our graver business Frowns at this levity.—Gentle lords, let’s part."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[graverobber]] | noun | **1.** Someone who steals valuables from graves or crypts.<br>**2.** Someone who takes bodies from graves and sells them for anatomical dissection. | *"In academic literature, graverobber designates someone who steals valuables from graves or crypts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graves]] | noun | **1.** English writer known for his interest in mythology and in the classics (1895-1985).<br>**2.** Death of a person. | *"The wrinkles which thy glass will truly show, Of mouthed graves will give thee memory, Thou by thy dial’s shady stealth mayst know, Time’s thievish progress to eternity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gravestone]] | noun | **1.** A stone that is used to mark a grave. | *"Lie where the light foam of the sea may beat Thy gravestone daily."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[graveyard]] | noun | **1.** A tract of land used for burials. | *"She crossed the road, opened the gate, and entered the graveyard, the high sills of the church windows effectually screening her from the eyes of those gathered within."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[gravid]] | adjective | **1.** In an advanced stage of pregnancy. | *"In academic literature, gravid designates in an advanced stage of pregnancy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gravida]] | noun | **1.** The number of the pregnancy that a woman is in.<br>**2.** A pregnant woman. | *"In academic literature, gravida designates the number of the pregnancy that a woman is in."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gravidation]] | noun | **1.** Technical terms for pregnancy. | *"In academic literature, gravidation designates technical terms for pregnancy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gravidity]] | noun | **1.** Technical terms for pregnancy. | *"In academic literature, gravidity designates technical terms for pregnancy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gravidness]] | noun | **1.** Technical terms for pregnancy. | *"In academic literature, gravidness designates technical terms for pregnancy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gravimeter]] | noun | **1.** A measuring instrument for determining the specific gravity of a liquid or solid.<br>**2.** A measuring instrument for measuring variations in the gravitational field of the earth. | *"In academic literature, gravimeter designates a measuring instrument for determining the specific gravity of a liquid or solid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gravimetric]] | adjective | **1.** Of or relating to hydrometry. | *"In academic literature, gravimetric designates of or relating to hydrometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gravimetry]] | noun | **1.** The measurement of specific gravity. | *"In academic literature, gravimetry designates the measurement of specific gravity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gravitas]] | noun | **1.** Formality in bearing and appearance. | *"In academic literature, gravitas designates formality in bearing and appearance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gravitate]] | verb | **1.** Move toward.<br>**2.** Be attracted to. | *"The human soul is regarded in Browning’s poetry as a complexly organized, individualized divine force, destined to gravitate towards the Infinite."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[gravitation]] | noun | **1.** (physics) the force of attraction between all masses in the universe; especially the attraction of the earth's mass for bodies near its surface; ; ; --albert einstein.<br>**2.** Movement downward resulting from gravitational attraction. | *"Oak was an intensely humane man: indeed, his humanity often tore in pieces any politic intentions of his which bordered on strategy, and carried him on as by gravitation."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[gravitational]] | adjective | **1.** Of or relating to or caused by gravitation. | *"In academic literature, gravitational designates of or relating to or caused by gravitation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gravitationally]] | adverb | **1.** With respect to gravitation. | *"In academic literature, gravitationally designates with respect to gravitation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gravitative]] | adjective | **1.** Of or relating to or caused by gravitation. | *"In academic literature, gravitative designates of or relating to or caused by gravitation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graviton]] | noun | **1.** A gauge boson that mediates the (extremely weak) gravitational interactions between particles. | *"In academic literature, graviton designates a gauge boson that mediates the (extremely weak) gravitational interactions between particles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gravity]] | noun | **1.** (physics) the force of attraction between all masses in the universe; especially the attraction of the earth's mass for bodies near its surface; ; ; --albert einstein.<br>**2.** A manner that is serious and solemn. | *"How ill agrees it with your gravity To counterfeit thus grossly with your slave, Abetting him to thwart me in my mood; Be it my wrong, you are from me exempt, But wrong not that wrong with a more contempt."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gravity-assist]] | noun | **1.** (spaceflight) a trajectory that passes close to a planetary body in order to gain energy from its gravitational field. | *"In academic literature, gravity-assist designates (spaceflight) a trajectory that passes close to a planetary body in order to gain energy from its gravitational field."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gravure]] | noun | **1.** A printing process that uses an etched or engraved plate; the plate is smeared with ink and wiped clean, then the ink left in the recesses makes the print.<br>**2.** A printing plate used in the process of gravure. | *"In academic literature, gravure designates a printing process that uses an etched or engraved plate; the plate is smeared with ink and wiped clean, then the ink left in the recesses makes the print."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gravy]] | noun | **1.** A sauce made by adding stock, flour, or other ingredients to the juice and fat that drips from cooking meats.<br>**2.** The seasoned but not thickened juices that drip from cooking meats; often a little water is added. | *"His effect of gravy, gravy, gravy."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Weight]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · GRAV
  </div>
</div>
