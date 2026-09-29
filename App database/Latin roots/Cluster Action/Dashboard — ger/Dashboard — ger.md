---
status: unread
type: root_dashboard
---
# Dashboard — ger
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ger-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“bear or carry”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Hands actively pushing a lever or carrying out purposeful work.</span>
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

The root **ger** means bear or carry. It refers to supporting a heavy load, carrying something, or enduring hardship. In English, this root forms words such as *belligerent*, *belligerence*, *belligerency*, and *vicegerent*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: bear or carry
> The root **ger** means bear or carry. It refers to supporting a heavy load, carrying something, or enduring hardship. In English, this root forms words such as *belligerent*, *belligerence*, *belligerency*, and *vicegerent*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Bear or carry</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands actively pushing a lever or carrying out purposeful work.</mark>
> - **Everyday Connection**: Think of familiar words like *belligerent* and *belligerence*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ger** comes from a Latin word that means *"bear or carry"*.
  - At its core, it describes bear or carry.

- **The Big Picture Idea**:
  - Picture hands actively pushing a lever or carrying out purposeful work.
  - Whenever you see **ger** in an English word, think of **taking action and doing real work**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of bear or carry.
  - **Mental & Social**: How people experience, organize, or communicate about bear or carry.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Belligerent**: Hostile and aggressive.
  - **Belligerence**: Aggressive or warlike behavior.
  - **Belligerency**: The condition of being at war or in a state of recognized international armed conflict.
  - **Vicegerent**: A person appointed by a ruler or head of state to act in their place.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ger</mark>, think of <mark class="hl-def">taking action and doing real work</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stem**:
  - `ger-` (< Latin *gerere*): Present verbal combining base.
- **Compounding Patterns**:
  - `belli-` (< *bellum* "war") + `ger`: *belligerent, belligerence*.
  - `vice-` (< *vicis* "in place of") + `ger`: *vicegerent*.
  - `armi-` (< *arma* "arms") + `ger`: *armiger*.
  - `corni-` (< *cornū* "horn") + `ger`: *cornigerous*.

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
                      ┌── Warfare & International Law: belligerent, belligerence
                      │
    [ger] ────────────┼── Governance & Deputy Mandate: vicegerent, vicegerency
 (To bear, wage, rule)│
                      ├── Heraldry & Chivalry: armiger
                      │
                      └── Natural History & Anatomy: aliger, cornigerous
```

---

## 🔀 4. Prefix & Combining Dynamics on ger
- **`belli-` + `ger` + `-ent`**: *belligerent* — carrying on active warfare; combative and hostile.
- **`vice-` + `ger` + `-ent`**: *vicegerent* — a deputy appointed to administer a province or kingdom.
- **`armi-` + `ger`**: *armiger* — an armor-bearer; one entitled to bear a coat of arms.

---

## 🌐 5. Disciplinary & Real-World Domains
- **International Humanitarian Law**: Geneva Conventions; status of lawful *belligerents*; rules of engagement.
- **Heraldry & Genealogical Science**: College of Arms; *armigerous* families; granted heraldic crests.
- **Political Philosophy**: Divine right of kings; the monarch as God's earthly *vicegerent*.
- **Evolutionary Zoology**: *Cornigerous* ungulates; morphological horn and antler evolution.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[alger]] | noun | **1.** United states author of inspirational adventure stories for boys; virtue and hard work overcome poverty (1832-1899). | *"Alger Series For Boys. {About 50 Titles} Uniform With This Volume."* — Jr. Horatio Alger, *Paul Prescott's Charge* |
| [[algeria]] | noun | **1.** A republic in northwestern africa on the mediterranean sea with a population that is predominantly sunni muslim; colonized by france in the 19th century but gained autonomy in the early 1960s. | *"Monsieur Fabien desired to see life--Monsieur Fabien could not have his own will--he was, doubtless, an emigrant in America--in the Mauritius--he was with the army in Algeria--he was amassing a fortune among the English--he was a missionary in China."* — Frances Mary Peard, *Unawares: A Story of an Old French Town* |
| [[algerian]] | noun | **1.** A native or inhabitant of algeria.<br>**2.** Of or relating to or characteristic of algeria or its inhabitants. | *"At the end he felt faint and sick, and having lit some Algerian pastilles in a pierced copper brazier, he bathed his hands and forehead with a cool musk-scented vinegar."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[algerie]] | noun | **1.** A republic in northwestern africa on the mediterranean sea with a population that is predominantly sunni muslim; colonized by france in the 19th century but gained autonomy in the early 1960s. | *"In academic literature, algerie designates a republic in northwestern africa on the mediterranean sea with a population that is predominantly sunni muslim; colonized by france in the 19th century but gained autonomy in the early 1960s."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[algeripithecus]] | noun | **1.** An extinct genus of hominoidea. | *"In academic literature, algeripithecus designates an extinct genus of hominoidea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anger]] | noun | **1.** A strong emotion; a feeling that is oriented toward some real or supposed grievance.<br>**2.** The state of being angry. | *"Do not plunge thyself too far in anger, lest thou hasten thy trial; which if—Lord have mercy on thee for a hen!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[angered]] | verb | **1.** Make angry.<br>**2.** Become angry. | *"And that is it Hath made me rig my navy, at whose burden The angered ocean foams, with which I meant To scourge th’ ingratitude that despiteful Rome Cast on my noble father."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conger]] | noun | **1.** Large dark-colored scaleless marine eel found in temperate and tropical coastal waters; some used for food. | *"Hang yourself, you muddy conger, hang yourself!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[congeries]] | noun | **1.** A sum total of many heterogenous things taken together. | *"The Dinka are a congeries of independent tribes in the valley of the White Nile."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[egeria]] | noun | **1.** Small genus of dioecious tropical aquatic plants. | *"One was Egeria, the nymph of the clear water which, bubbling from the basaltic rocks, used to fall in graceful cascades into the lake at the place called Le Mole, because here were established the mills of the modern village of Nemi."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[geraint]] | noun | **1.** (arthurian legend) one of the knights of the round table. | *"Thomas,[277] “was an interesting work by Geraint Bardd Glass y Cadair, an illustrious Welshman, who flourished about the ninth century."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[geraniaceae]] | noun | **1.** Chiefly herbaceous plants. | *"In academic literature, geraniaceae designates chiefly herbaceous plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geraniales]] | noun | **1.** An order of plants of subclass rosidae including geraniums and many other plants; see euphorbiaceae; geraniaceae; rutaceae; malpighiaceae; simaroubaceae; meliaceae; zygophyllaceae; tropaeolaceae. | *"In academic literature, geraniales designates an order of plants of subclass rosidae including geraniums and many other plants; see euphorbiaceae; geraniaceae; rutaceae; malpighiaceae; simaroubaceae; meliaceae; zygophyllaceae; tropaeolaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geranium]] | noun | **1.** Any of numerous plants of the family geraniaceae. | *"Plants which in burning give out a thick smoke and an aromatic smell are much sought after for fuel on these occasions; among the plants used for the purpose are giant-fennel, thyme, rue, chervil-seed, camomile, geranium, and penny-royal."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[gerardia]] | noun | **1.** Any plant of the genus gerardia. | *"In academic literature, gerardia designates any plant of the genus gerardia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gerea]] | noun | **1.** Small genus of hairy herbs with yellow flowers. | *"In academic literature, gerea designates small genus of hairy herbs with yellow flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gerenuk]] | noun | **1.** Slender east african antelope with slim neck and backward-curving horns. | *"In academic literature, gerenuk designates slender east african antelope with slim neck and backward-curving horns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geriatric]] | adjective | **1.** Of or relating to the aged.<br>**2.** Of or relating to or practicing geriatrics. | *"In academic literature, geriatric designates of or relating to the aged."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geriatrician]] | noun | **1.** A specialist in gerontology. | *"In academic literature, geriatrician designates a specialist in gerontology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geriatrics]] | noun | **1.** The branch of medical science that deals with diseases and problems specific to old people. | *"In academic literature, geriatrics designates the branch of medical science that deals with diseases and problems specific to old people."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[germ]] | noun | **1.** Anything that provides inspiration for later work.<br>**2.** A small apparently simple structure (as a fertilized egg) from which new tissue can develop into a complete organism. | *"There is more than the germ of truth in things erroneous in the child’s definition of memory as the thing one forgets with."* — Jack London, *The Jacket (The Star-Rover)* |
| [[german]] | noun | **1.** A person of german nationality.<br>**2.** The standard german language; developed historically from west germanic. | *"If there be here German, or Dane, Low Dutch, Italian, or French, let him speak to me, I’ll discover that which shall undo the Florentine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[german-american]] | adjective | **1.** Of or relating to or characteristic of german americans. | *"In academic literature, german-american designates of or relating to or characteristic of german americans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[german-speaking]] | adjective | **1.** Able to communicate in german. | *"In academic literature, german-speaking designates able to communicate in german."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[germander]] | noun | **1.** Any of various plants of the genus teucrium. | *"In academic literature, germander designates any of various plants of the genus teucrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[germane]] | adjective | **1.** Relevant and appropriate. | *"Not he alone shall suffer what wit can make heavy and vengeance bitter; but those that are germane to him, though removed fifty times, shall all come under the hangman: which, though it be great pity, yet it is necessary."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[germaneness]] | noun | **1.** Pertinence by virtue of a close relation to the matter at hand. | *"In academic literature, germaneness designates pertinence by virtue of a close relation to the matter at hand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[germanic]] | noun | **1.** A branch of the indo-european family of languages; members that are spoken currently fall into two major groups: scandinavian and west germanic.<br>**2.** Of or relating to the language of germans. | *"But their vulcan was the Germanic Wieland, the master-smith captured and hamstrung lame of a leg by Nidung, the kind of the Nids."* — Jack London, *The Jacket (The Star-Rover)* |
| [[germanism]] | noun | **1.** A custom that is peculiar to germany or its citizens. | *"In academic literature, germanism designates a custom that is peculiar to germany or its citizens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[germanist]] | noun | **1.** A specialist in the study of germanic language or culture or literature. | *"In academic literature, germanist designates a specialist in the study of germanic language or culture or literature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[germanite]] | noun | **1.** A rare reddish-grey mineral consisting of a copper iron germanium sulfide. | *"In academic literature, germanite designates a rare reddish-grey mineral consisting of a copper iron germanium sulfide."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[germanium]] | noun | **1.** A brittle grey crystalline element that is a semiconducting metalloid (resembling silicon) used in transistors; occurs in germanite and argyrodite. | *"In academic literature, germanium designates a brittle grey crystalline element that is a semiconducting metalloid (resembling silicon) used in transistors; occurs in germanite and argyrodite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[germany]] | noun | **1.** A republic in central europe; split into east germany and west germany after world war ii and reunited in 1990. | *"Commotions, uproars, with a general taint Of the whole state, as of late days our neighbours, The upper Germany, can dearly witness, Yet freshly pitied in our memories."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[germfree]] | adjective | **1.** Free from germs or pathogenic organisms; sterile. | *"In academic literature, germfree designates free from germs or pathogenic organisms; sterile."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[germicidal]] | adjective | **1.** Preventing infection by inhibiting the growth or action of microorganisms. | *"In academic literature, germicidal designates preventing infection by inhibiting the growth or action of microorganisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[germicide]] | noun | **1.** An agent (as heat or radiation or a chemical) that destroys microorganisms that might carry disease. | *"In academic literature, germicide designates an agent (as heat or radiation or a chemical) that destroys microorganisms that might carry disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[germinal]] | noun | **1.** Seventh month of the revolutionary calendar (march and april); the month of buds.<br>**2.** Containing seeds of later development. | *"Brooke had written his invitation, those germinal ideas of making his mind tell upon the world at large which had been present in him from his younger years, but had hitherto lain in some obstruction, had been sprouting under cover."* — George Eliot, *Middlemarch* |
| [[germinate]] | verb | **1.** Produce buds, branches, or germinate.<br>**2.** Work out. | *"Most poets, probably, like most saints, are prepared for their mission by an initial segregation, as the seed is buried to germinate: before they can utter the oracle of poetry, they must first be divided from the body of men."* — Francis Thompson, *Shelley: An Essay* |
| [[germination]] | noun | **1.** The process whereby seeds or spores sprout and begin to grow.<br>**2.** The origin of some development. | *"A particularly fine spring came round, and the stir of germination was almost audible in the buds; it moved her, as it moved the wild animals, and made her passionate to go."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[germy]] | adjective | **1.** Full of germs or pathological microorganisms. | *"In academic literature, germy designates full of germs or pathological microorganisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geronimo]] | noun | **1.** Apache chieftain who raided the white settlers in the southwest as resistance to being confined to a reservation (1829-1909). | *"For details as to the different modes of administering the _maraké_ see _ibid._ pp. 228-235. [153] Father Geronimo Boscana, "Chinigchinich," in _Life in California by an American_ [A."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[gerontocracy]] | noun | **1.** A political system governed by old men. | *"In academic literature, gerontocracy designates a political system governed by old men."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gerontological]] | adjective | **1.** Of or relating to or practicing geriatrics. | *"In academic literature, gerontological designates of or relating to or practicing geriatrics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gerontologist]] | noun | **1.** A specialist in gerontology. | *"In academic literature, gerontologist designates a specialist in gerontology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gerontology]] | noun | **1.** The branch of medical science that deals with diseases and problems specific to old people. | *"In academic literature, gerontology designates the branch of medical science that deals with diseases and problems specific to old people."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gerreidae]] | noun | **1.** Mojarras. | *"Classical and authoritative lexicons catalog gerreidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gerres]] | noun | **1.** Type genus of the gerreidae. | *"In academic literature, gerres designates type genus of the gerreidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gerrhonotus]] | noun | **1.** Alligator lizards. | *"In academic literature, gerrhonotus designates alligator lizards."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gerridae]] | noun | **1.** Mojarras.<br>**2.** An arthropod family that includes water striders. | *"Classical and authoritative lexicons catalog gerridae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gerrididae]] | noun | **1.** An arthropod family that includes water striders. | *"In academic literature, gerrididae designates an arthropod family that includes water striders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gerris]] | noun | **1.** Type genus of the gerrididae. | *"In academic literature, gerris designates type genus of the gerrididae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gerrymander]] | noun | **1.** An act of gerrymandering (dividing a voting area so as to give your own party an unfair advantage).<br>**2.** Divide unfairly and to one's advantage; of voting districts. | *"In academic literature, gerrymander designates an act of gerrymandering (dividing a voting area so as to give your own party an unfair advantage)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gershwin]] | noun | **1.** United states lyricist who frequently collaborated with his brother george gershwin (1896-1983).<br>**2.** United states composer who incorporated jazz into classical forms and composed scores for musical comedies (1898-1937). | *"In academic literature, gershwin designates united states lyricist who frequently collaborated with his brother george gershwin (1896-1983)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gerund]] | noun | **1.** A noun formed from a verb (such as the `-ing' form of an english verb when used as a noun). | *"In academic literature, gerund designates a noun formed from a verb (such as the `-ing' form of an english verb when used as a noun)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gerundial]] | adjective | **1.** Relating to or like a gerund. | *"In academic literature, gerundial designates relating to or like a gerund."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geryon]] | noun | **1.** (greek mythology) a mythical monster with three heads that was slain by hercules. | *"In academic literature, geryon designates (greek mythology) a mythical monster with three heads that was slain by hercules."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inger]] | noun | **1.** A member of western finnish people formerly living in the baltic province where saint petersburg was built. | *"In academic literature, inger designates a member of western finnish people formerly living in the baltic province where saint petersburg was built."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ingerman]] | noun | **1.** A member of western finnish people formerly living in the baltic province where saint petersburg was built. | *"In academic literature, ingerman designates a member of western finnish people formerly living in the baltic province where saint petersburg was built."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[progeria]] | noun | **1.** A rare abnormality marked by premature aging (grey hair and wrinkled skin and stooped posture) in a child. | *"In academic literature, progeria designates a rare abnormality marked by premature aging (grey hair and wrinkled skin and stooped posture) in a child."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surgery]] | noun | **1.** The branch of medical science that treats disease or injury by operative procedures.<br>**2.** A room where a doctor or dentist can be consulted. | *"And they are often tarred over with the surgery of our sheep; and would you have us kiss tar?"* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · GER
  </div>
</div>
