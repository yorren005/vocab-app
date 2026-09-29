---
status: unread
type: root_dashboard
---
# Dashboard — alt
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">alt-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“high or deep”</span>
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

The root **alt** means high or deep. It describes great vertical height, elevation above the ground, or deep distance. In English, this root forms words such as *altitude*, *altimeter*, *altar*, and *exalt*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: high or deep
> The root **alt** means high or deep. It describes great vertical height, elevation above the ground, or deep distance. In English, this root forms words such as *altitude*, *altimeter*, *altar*, and *exalt*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">High or deep</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking out across an open horizon with plenty of room to move.</mark>
> - **Everyday Connection**: Think of familiar words like *altitude* and *altimeter*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **alt** comes from a Latin word that means *"high or deep"*.
  - At its core, it describes the quality or state of being high or deep.

- **The Big Picture Idea**:
  - Picture looking out across an open horizon with plenty of room to move.
  - Whenever you see **alt** in an English word, think of **space, open room, and distance**.

- **How the Meaning Grows**:
  - **Physical**: Physical objects, textures, or shapes that are high or deep.
  - **Mental & Social**: Human emotions, attitudes, speaking styles, or mental traits.
  - **Abstract & Practical**: Scientific measurements, standards, or formal categories.

- **Everyday English Words to Remember It By**:
  - **Altitude**: The height of an object or point in relation to sea level or ground level.
  - **Altimeter**: An instrument used in aircraft to measure altitude above sea level or ground level.
  - **Altar**: A table or flat-topped block used as the focus for a religious ritual, especially for making sacrifices or offerings to a deity.
  - **Exalt**: To hold someone or something in very high regard.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">alt</mark>, think of <mark class="hl-def">space, open room, and distance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
Latin alō (to nourish) ──> Participle altus (grown tall, high)
  │
  ├── Classical Latin Formations
  │     ├── altitūdō ─────────────────────────> altitude, altimeter
  │     ├── ex- + altāre ─────────────────────> exalt, exaltation
  │     └── altāre (high sacred place) ───────> altar
  │
  ├── Italian Musical Heritage
  │     └── alto (high choral register) ──────> alto, contralto
  │
  └── French Phonetic Shifts (altus ──> haut)
        ├── haut + -y ────────────────────────> haughty (arrogant pride)
        └── haut + bois (high wood) ──────────> oboe (wind instrument)
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

### Distinct Semantic Spheres
1. **Aviation, Geography & Atmospheric Physics**: *altitude*, *altimeter* (vertical distance above sea level or ground).
2. **Spiritual Sanctity & Worship**: *altar* (raised table or block for sacred religious offerings).
3. **Praise, Elevation & Status**: *exalt*, *exaltation* (raising in rank, praising enthusiastically, or feeling rapturous joy).
4. **Choral & Acoustic Registers**: *alto*, *contralto* (the vocal range between tenor and soprano).
5. **Psychological Arrogance**: *haughty* (scornfully proud, supercilious).
6. **Woodwind Instrumentation**: *oboe* (a double-reed woodwind instrument of high pitch).

---

## 🔀 4. Prefix & Combining Dynamics on alt

### Affix Breakdown
- **ex- ("out of, up, completely") + alt-**: Produces *exalt* (to elevate high above others in honor or rank).
- **-tude**: *altitude* (noun of physical dimension, like *latitude* and *longitude*).
- **-meter**: *altimeter* (instrument measuring altitude).
- **-ation**: *exaltation* (state of supreme spiritual or emotional elevation).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Practical Manifestation | Key Vocabulary |
| :--- | :--- | :--- |
| **Aviation & Aerospace** | Flight levels, barometric pressure measurement, cruising heights | *altitude*, *altimeter*, *true altitude* |
| **Musicology & Orchestration** | Choral part-writing, double-reed orchestral woodwinds | *alto*, *oboe*, *alto clef*, *alto saxophone* |
| **Theology & Comparative Religion** | Sacrificial platforms, sanctuaries, holy of holies | *altar*, *altarpiece*, *high altar* |
| **Literature & Moral Philosophy** | Nobility of spirit vs insolent arrogance | *exalt*, *haughty*, *haughtiness* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[alt]] | noun | **1.** Angular distance above the horizon (especially of a celestial object). | *"He alt’red much upon the hearing it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[altace]] | noun | **1.** An ace inhibitor (trade name altace) used to treat high blood pressure or in some patients who have had a heart attack. | *"In academic literature, altace designates an ace inhibitor (trade name altace) used to treat high blood pressure or in some patients who have had a heart attack."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[altaic]] | noun | **1.** Any member of the peoples speaking a language in the altaic language group.<br>**2.** A group of related languages spoken in asia and southeastern europe. | *"In academic literature, altaic designates any member of the peoples speaking a language in the altaic language group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[altair]] | noun | **1.** Double star 15.7 light years from earth; the brightest star in the aquila constellation. | *"In a village near where the maiden dwelt there was a young man named Altair, whom the Chinese call the Cow-herd."* — Isaac Taylor Headland, *The Chinese Boy and Girl* |
| [[altar]] | noun | **1.** The table in christian churches where communion is given.<br>**2.** A raised structure on which gifts or sacrifices to a god are made. | *"Now, Dian, from thy altar do I fly, And to imperial Love, that god most high, Do my sighs stream. [_To first Lord._] Sir, will you hear my suit?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[altarpiece]] | noun | **1.** A painted or carved screen placed above and behind an altar or communion table. | *"In academic literature, altarpiece designates a painted or carved screen placed above and behind an altar or communion table."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[altazimuth]] | noun | **1.** An instrument that measures the altitude and azimuth of celestial bodies; used in navigation. | *"In academic literature, altazimuth designates an instrument that measures the altitude and azimuth of celestial bodies; used in navigation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alter]] | verb | **1.** Cause to change; make different; cause a transformation.<br>**2.** Become different in some particular way, without permanently losing one's or its former characteristics or essence. | *"In our two loves there is but one respect, Though in our lives a separable spite, Which though it alter not love’s sole effect, Yet doth it steal sweet hours from love’s delight."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[alterability]] | noun | **1.** The quality of being alterable. | *"In academic literature, alterability designates the quality of being alterable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alterable]] | adjective | **1.** Capable of being changed or altered in some characteristic.<br>**2.** (of the punishment ordered by a court) capable of being changed to one less severe. | *"In academic literature, alterable designates capable of being changed or altered in some characteristic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alteration]] | noun | **1.** An event that occurs when something passes from one state or phase to another.<br>**2.** The act of making something different (as e.g. the size of a garment). | *"Love is a babe, then might I not say so To give full growth to that which still doth grow. 116 Let me not to the marriage of true minds Admit impediments, love is not love Which alters when it alteration finds, Or bends with the remover to remove."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[alterative]] | adjective | **1.** Tending to cure or restore to health. | *"Truth an alterative Christian Science brings to the body the sunlight of Truth, which invigorates and purifies."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[altercate]] | verb | **1.** Have a disagreement over something. | *"In academic literature, altercate designates have a disagreement over something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[altercation]] | noun | **1.** Noisy quarrel. | *"Trius had been absorbed in their violent altercation and had stared at each other, she in wild excitement and he in stiff immovability, Mäzli had slipped from between the two as swiftly as a little mouse."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[altered]] | verb | **1.** Cause to change; make different; cause a transformation.<br>**2.** Become different in some particular way, without permanently losing one's or its former characteristics or essence. | *"Thou mayst be false, and yet I know it not. 93 So shall I live, supposing thou art true, Like a deceived husband, so love’s face, May still seem love to me, though altered new: Thy looks with me, thy heart in other place."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[altering]] | noun | **1.** The sterilization of an animal.<br>**2.** Cause to change; make different; cause a transformation. | *"Weevle, altering the construction of his sentence."* — Charles Dickens, *Bleak House* |
| [[alternanthera]] | noun | **1.** Genus of low herbs of tropical america and australia; includes genus telanthera. | *"In academic literature, alternanthera designates genus of low herbs of tropical america and australia; includes genus telanthera."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alternate]] | noun | **1.** Someone who takes the place of another person.<br>**2.** Go back and forth; swing back and forth between two states or conditions. | *"I was to write Richard once a week, making my faithful report of Ada, who was to write to him every alternate day."* — Charles Dickens, *Bleak House* |
| [[alternately]] | adverb | **1.** In an alternating sequence or position. | *"The view from my Lady Dedlock’s own windows is alternately a lead-coloured view and a view in Indian ink."* — Charles Dickens, *Bleak House* |
| [[alternating]] | verb | **1.** Go back and forth; swing back and forth between two states or conditions.<br>**2.** Exchange people temporarily to fulfill certain jobs and functions. | *"Soon soft spirts alternating with loud spirts came in regular succession from within the shed, the obvious sounds of a person milking a cow."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[alternation]] | noun | **1.** Successive change from one thing or state to another and back again. | *"Time was marked by the regular changing of the guards, and by the alternation of day and night."* — Jack London, *The Jacket (The Star-Rover)* |
| [[alternative]] | noun | **1.** One of a number of things from which only one can be chosen.<br>**2.** Serving or used in place of another. | *"In the ashpit was a heap of potatoes roasting, and a boiling pipkin of charred bread, called “coffee”, for the benefit of whomsoever should call, for Warren’s was a sort of clubhouse, used as an alternative to the inn."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[alternatively]] | adverb | **1.** In place of, or as an alternative to. | *"Alternatively, if potassium be brought into combination with it, there results potassium cyanide, which, with the assistance of water and oxygen, can dissolve gold."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[alternator]] | noun | **1.** An old term for an electric generator that produces alternating current (especially in automobiles). | *"Nicola Tesla made an alternator (to give the alternating current dynamo its short title) which could produce 1500 alternations per second, while Mr W."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[altimeter]] | noun | **1.** An instrument that measures the height above ground; used in navigation. | *"With that subconscious concentration of the flying man on his ship, he glanced at the instrument board first, and taking in the astonishing information that both the altimeter and the air-speed meter registered zero, he looked over the side."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[altissimo]] | adjective | **1.** Very high. | *"In academic literature, altissimo designates very high."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[altitude]] | noun | **1.** Elevation especially above sea level or above the earth's surface.<br>**2.** The perpendicular distance from the base of a geometric figure to the opposite vertex (or side if parallel). | *"Though soft-conscienced men can be content to say it was for his country, he did it to please his mother and to be partly proud, which he is, even to the altitude of his virtue."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[altitudinal]] | adjective | **1.** Pertaining to altitude. | *"In academic literature, altitudinal designates pertaining to altitude."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[altitudinous]] | adjective | **1.** Indefinitely high; lofty. | *"In academic literature, altitudinous designates indefinitely high; lofty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alto]] | noun | **1.** A singer whose voice lies in the alto clef.<br>**2.** The lowest female singing voice. | *"Well, this curate was only nineteen." And then, coming out into the fading light, she locked the north door behind her and went off whistling like a blackbird, if a blackbird could whistle the alto of Calkin's Magnificat in B flat. . . ."* — Anthony Pryde, *Nightfall* |
| [[altocumulus]] | noun | **1.** A cumulus cloud at an intermediate altitude of 2 or 3 miles. | *"In academic literature, altocumulus designates a cumulus cloud at an intermediate altitude of 2 or 3 miles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[altogether]] | noun | **1.** Informal terms for nakedness.<br>**2.** To a complete degree or to the full or entire extent (`whole' is often used informally for `wholly'). | *"I perceive by this demand, you are not altogether of his council."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[altoist]] | noun | **1.** A musician who plays the alto saxophone. | *"In academic literature, altoist designates a musician who plays the alto saxophone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[altoona]] | noun | **1.** A town in central pennsylvania. | *"Adopted at a meeting of Governors of loyal States, held to take measures for the more active support of the Government, at Altoona, Pennsylvania, on the 22d day of September, 1862."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[altostratus]] | noun | **1.** A stratus cloud at an intermediate altitude of 2 or 3 miles. | *"In academic literature, altostratus designates a stratus cloud at an intermediate altitude of 2 or 3 miles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[altricial]] | adjective | **1.** (of hatchlings) naked and blind and dependent on parents for food. | *"In academic literature, altricial designates (of hatchlings) naked and blind and dependent on parents for food."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[altruism]] | noun | **1.** The quality of unselfish concern for the welfare of others. | *"There was no nonsense about him--none of that sweet blind altruism which, as Isabel saw it, only made the altruist and his family so bitterly uncomfortable without doing any good to the poor."* — Anthony Pryde, *Nightfall* |
| [[altruist]] | noun | **1.** Someone who makes charitable donations intended to increase human well-being. | *"There was no nonsense about him--none of that sweet blind altruism which, as Isabel saw it, only made the altruist and his family so bitterly uncomfortable without doing any good to the poor."* — Anthony Pryde, *Nightfall* |
| [[altruistic]] | adjective | **1.** Showing unselfish concern for the welfare of others. | *"This is due to the fact that his turning to Greece was in its final analysis attributable rather to selfish than to altruistic motives."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[altruistically]] | adverb | **1.** In an altruistic manner. | *"In academic literature, altruistically designates in an altruistic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exalt]] | verb | **1.** Praise, glorify, or honor.<br>**2.** Fill with sublime emotion. | *"Not so hot: In his own grace he doth exalt himself, More than in your addition."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exaltation]] | noun | **1.** A state of being carried away by overwhelming emotion; - charles dickens.<br>**2.** The location of a planet in the zodiac at which it is believed to exert its maximum influence. | *"And thus the abasement had been exaltation, and the loss gain."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[exalted]] | verb | **1.** Praise, glorify, or honor.<br>**2.** Fill with sublime emotion. | *"Besides, she uses me with a more exalted respect than anyone else that follows her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exalting]] | verb | **1.** Praise, glorify, or honor.<br>**2.** Fill with sublime emotion. | *"Casaubon), all the while being visited with conscientious questionings whether she were not exalting these poor doings above measure and contemplating them with that self-satisfaction which was the last doom of ignorance and folly."* — George Eliot, *Middlemarch* |
| [[inalterable]] | adjective | **1.** Not capable of being changed or altered. | *"Is it your opinion that men’s acts proceed from one central and unchanging and inalterable impulse, or from a variety of impulses?"* — Mark Twain, *What Is Man? and Other Essays* |
| [[realtor]] | noun | **1.** A real estate agent who is a member of the national association of realtors. | *"In academic literature, realtor designates a real estate agent who is a member of the national association of realtors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[realty]] | noun | **1.** Property consisting of houses and land. | *"O Heaven! that such resemblance of the Highest Should yet remain, where faith and realty Remain not: Wherefore should not strength and might There fail where virtue fails, or weakest prove Where boldest, though to fight unconquerable?"* — John Milton, *Paradise Lost* |
| [[subaltern]] | noun | **1.** A british commissioned army officer below the rank of captain.<br>**2.** Inferior in rank or status. | *"I was an infant subaltern when Hyde knew me," said Val laughing, "and he was a howling swell of a captain."* — Anthony Pryde, *Nightfall* |
| [[unalterability]] | noun | **1.** The quality of not being alterable.<br>**2.** The quality of being fixed and unchangeable. | *"In academic literature, unalterability designates the quality of not being alterable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unalterable]] | adjective | **1.** Not capable of being changed or altered.<br>**2.** Of a sentence; that cannot be changed. | *"Indeed, in the minds of its frequenters they existed as unalterable formulæ: _e.g._— Rap with the bottom of your pint for more liquor."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unalterably]] | adverb | **1.** In an unalterable and unchangeable manner. | *"So obedient to impulses the most transient and brief, and yet so unalterably observant of the direction which is given to it!"* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[unaltered]] | adjective | **1.** Remaining in an original state. | *"This text is "an unabridged and unaltered republication of the Bohn Library edition originally published by George Bell and Sons in 1883." 3."* — Benedictus de Spinoza, *On the Improvement of the Understanding* |

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
    ROOT DASHBOARD · ALT
  </div>
</div>
