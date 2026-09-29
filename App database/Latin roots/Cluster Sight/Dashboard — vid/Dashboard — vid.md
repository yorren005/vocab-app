---
status: unread
type: root_dashboard
---
# Dashboard — vid
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vid-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to see, look, or perceive”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Opening your eyes in a dark room as bright light reveals everything clearly.</span>
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

The root **vid** means to see, look, or perceive. It refers to observing with the eyes or noticing and understanding things clearly. In English, this root forms words such as *video*, *visible*, *vision*, and *evidence*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to see, look, or perceive
> The root **vid** means to see, look, or perceive. It refers to observing with the eyes or noticing and understanding things clearly. In English, this root forms words such as *video*, *visible*, *vision*, and *evidence*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To see, look, or perceive</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Opening your eyes in a dark room as bright light reveals everything clearly.</mark>
> - **Everyday Connection**: Think of familiar words like *video* and *visible*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vid** comes from a Latin word that means *"to see, look, or perceive"*.
  - At its core, it describes the action of see, look, or perceive.

- **The Big Picture Idea**:
  - Picture opening your eyes in a dark room as bright light reveals everything clearly.
  - Whenever you see **vid** in an English word, think of **clear vision and noticing details**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to see, look, or perceive).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Video**: The recording, reproducing, or broadcasting of moving visual images. 2. Relating to video media.
  - **Visible**: An everyday English word showing the root's idea of *to see, look, or perceive*.
  - **Vision**: An everyday English word showing the root's idea of *to see, look, or perceive*.
  - **Evidence**: The available facts indicating whether a proposition is true. 2. To indicate clearly.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vid</mark>, think of <mark class="hl-def">clear vision and noticing details</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Latin 1st Person Present:** *video* (I see $\to$ television/recording medium).
- **Directional Prefixation:**
  - `ex-` + *vidēns* $\to$ *ēvidēns* $\to$ *evident*, *evidence*, *evidential*, *evidentiary*.
  - `pro-` + *vidēre* $\to$ *provide*, *provider*, *providence*, *provident*, *providential*, *improvident*.
  - `in-` + *vidēre* $\to$ *invidia* (looking with ill will) $\to$ *invidious* (envious, discriminatory).
- **Latin Syncopated Contraction:**
  - *prōvidēns* $\to$ *prūdēns* $\to$ *prudent*, *prudence*, *imprudent*, *prudential*.

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

### 1. Electronic Media & Visual Technology
- *video* (the recording, reproducing, or broadcasting of moving visual images).
- *videotape* (magnetic tape for recording visual images and sound).
- *videoconference* (a conference in which participants in different locations are connected by video).

### 2. Legal Proof & Undeniable Clarity
- *evident* (plain or obvious; clearly seen or understood).
- *evidence* (the available body of facts or information indicating whether a belief or proposition is true).
- *evidentiary* (constituting or providing evidence; relating to evidence in court).

### 3. Economic Preparedness & Foresight
- *provide* (to make available for use; supply; make adequate preparation for).
- *provider* (a person or thing that provides something).
- *provident* (making or indicating timely preparation for the future; thrifty).
- *providence* (the protective care of God or nature as a spiritual power; prudent management).
- *providential* (occurring at a favorable time; opportune; involving divine foresight).
- *improvident* (not having or showing foresight; spendthrift or thoughtless).

### 4. Wisdom, Discretion & Envy
- *prudent* (acting with or showing care and thought for the future; circumspect).
- *prudence* (the quality of being prudent; cautiousness).
- *imprudent* (not showing care for the consequences of an action; rash).
- *invidious* (likely to arouse or incur resentment or anger in others; unfair).

---

## 🔀 4. Prefix & Combining Dynamics on vid

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `ex-` + `vid-` + `-ent` | Outward clarity | Standing out into visible view; undeniable | *evident, evidence* |
| `pro-` + `vid-` + `-e` | Forward vision | Looking forward into future needs; supplying | *provide, provider* |
| `pro-` + `vid-` + `-ent` | Foresighted adjective | Frugal, preparing wisely for upcoming contingencies | *provident, providence* |
| `in-` + `vid-` + `-ious` | Malevolent gaze | Casting a hostile eye upon another's fortune | *invidious* |
| `im-` + `provident` | Privative prefixation | Living rashly for today without looking ahead | *improvident* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Telecommunications & Streaming Media:** Digital video compression (H.264, HEVC), video codecs, frame rates.
- **Law of Evidence & Criminal Justice:** Direct vs circumstantial evidence, rules of evidence (hearsay, exclusionary rule).
- **Theology & Philosophy:** Divine Providence (theodicy), Boethius's *Consolation of Philosophy* on divine foresight.
- **Economics & Personal Finance:** Provident funds, prudent investor rule in trust law.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[corvidae]] | noun | **1.** Crow; raven; rook; jackdaw; chough; magpie; jay. | *"In academic literature, corvidae designates crow; raven; rook; jackdaw; chough; magpie; jay."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dividable]] | adjective | **1.** Can be divided usually without leaving a remainder. | *"How could communities, Degrees in schools, and brotherhoods in cities, Peaceful commerce from dividable shores, The primogenity and due of birth, Prerogative of age, crowns, sceptres, laurels, But by degree stand in authentic place?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divide]] | noun | **1.** A serious disagreement between two groups of people (typically producing tension or hostility).<br>**2.** A ridge of land that separates two adjacent river systems. | *"The world and my great office will sometimes Divide me from your bosom."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divided]] | verb | **1.** Separate into parts or portions.<br>**2.** Perform a division. | *"Most noble Antony!” Then in the midst a tearing groan did break The name of Antony; it was divided Between her heart and lips."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dividend]] | noun | **1.** That part of the earnings of a corporation that is distributed to its shareholders; usually paid quarterly.<br>**2.** A number to be divided by another number. | *"Whenever the question comes before them, the courts maintain the right of the railroads to earn a fair dividend."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[divider]] | noun | **1.** A taxonomist who classifies organisms into many groups on the basis of relatively minor characteristics.<br>**2.** A person who separates something into parts or groups. | *"His majesty laughing, said, Faith, you are no equal divider."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[evidence]] | noun | **1.** Your basis for belief or disbelief; knowledge on which to base belief.<br>**2.** An indication that makes something evident. | *"Thou hast spoken all already, unless thou canst say they are married; but thou art too fine in thy evidence; therefore stand aside."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[evidenced]] | verb | **1.** Provide evidence for; stand as proof of; show by one's behavior, attitude, or external attributes.<br>**2.** Provide evidence for. | *"That he expressed the general feeling in our train was evidenced by the many women who leaned from the wagons, thrusting out gaunt forearms and shaking bony, labour-malformed fists at the last of Mormondom."* — Jack London, *The Jacket (The Star-Rover)* |
| [[evident]] | adjective | **1.** Clearly revealed to the mind or the senses or judgment.<br>**2.** Capable of being seen or noticed. | *"So our virtues Lie in th’ interpretation of the time, And power, unto itself most commendable, Hath not a tomb so evident as a chair T’ extol what it hath done."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[evidential]] | adjective | **1.** Serving as or based on evidence. | *"The evidential value of a good hymn book will stand investigation."* — T. R. Glover, *The Jesus of History* |
| [[evidentiary]] | adjective | **1.** Pertaining to or constituting evidence.<br>**2.** Serving as or based on evidence. | *"In academic literature, evidentiary designates pertaining to or constituting evidence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evidently]] | adverb | **1.** Unmistakably (`plain' is often used informally for `plainly'). | *"Everything was just as we had left it last night and was evidently intended to remain so."* — Charles Dickens, *Bleak House* |
| [[improvidence]] | noun | **1.** A lack of prudence and care by someone in the management of resources. | *"But when by improvidence I have cast myself into necessities of using more upon myself or upon things in themselves of less importance, I have prospered much less than when I did otherwise."* — Classic Author, *The wonders of prayer* |
| [[improvident]] | adjective | **1.** Not provident; not providing for the future.<br>**2.** Not given careful consideration. | *"Improvident soldiers, had your watch been good, This sudden mischief never could have fall’n."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[improvidently]] | adverb | **1.** In an improvident manner. | *"In academic literature, improvidently designates in an improvident manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invidia]] | noun | **1.** Spite and resentment at seeing the success of another (personified as one of the deadly sins). | *"In academic literature, invidia designates spite and resentment at seeing the success of another (personified as one of the deadly sins)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invidious]] | adjective | **1.** Containing or implying a slight or showing prejudice. | *"Either the change in the quality of the air from heavy to light, or the sense of being amid new scenes where there were no invidious eyes upon her, sent up her spirits wonderfully."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[invidiously]] | adverb | **1.** In a manner arousing resentment. | *"What she felt was that a territorial, a political, a social magnate had conceived the design of drawing her into the system in which he rather invidiously lived and moved."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[provide]] | verb | **1.** Give something useful or necessary to.<br>**2.** Give what is desired or needed, especially support, food or sustenance. | *"Go, go, provide. [_Exeunt._] SCENE II."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[providence]] | noun | **1.** The capital and largest city of rhode island; located in northeastern rhode island on narragansett bay; site of brown university.<br>**2.** The guardianship and control exercised by a deity. | *"It will be laid to us, whose providence Should have kept short, restrain’d, and out of haunt This mad young man."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[provident]] | adjective | **1.** Providing carefully for the future.<br>**2.** Careful in regard to your own interests. | *"It fits us then to be as provident As fears may teach us out of late examples Left by the fatal and neglected English Upon our fields."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[providential]] | adjective | **1.** Peculiarly fortunate or appropriate; as if by divine intervention.<br>**2.** Relating to or characteristic of providence; - m.r.cohen. | *"I want to make a confession to you, Love.” This, from him, so unexpectedly apposite, had the effect upon her of a Providential interposition."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[providentially]] | adverb | **1.** In a fortunately providential manner.<br>**2.** In a providential manner; as determined by providence. | *"Men had come to look upon the ratio of 15 to 1 as the natural order, determined (it was sometimes said) providentially by the deposit of the two metals in due proportion in the earth's surface."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[providently]] | adverb | **1.** In a provident manner. | *"Take that, and He that doth the ravens feed, Yea, providently caters for the sparrow, Be comfort to my age."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[provider]] | noun | **1.** Someone whose business is to supply a particular service or commodity.<br>**2.** Someone who provides the means for subsistence. | *"I would have left it on the board, so soon As I had made my meal, and parted With pray’rs for the provider."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subdivide]] | verb | **1.** Form into subdivisions.<br>**2.** Divide into smaller and smaller pieces. | *"At the middle of the forehead horizontally subdivide this upper quoin, and then you have two almost equal parts, which before were naturally divided by an internal wall of a thick tendinous substance. [17] Quoin is not a Euclidean term."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[subdivider]] | noun | **1.** Someone who divides parts into smaller parts (especially a divider of land into building sites). | *"In academic literature, subdivider designates someone who divides parts into smaller parts (especially a divider of land into building sites)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undividable]] | adjective | **1.** Cannot be divided without leaving a remainder. | *"Thyself I call it, being strange to me, That, undividable, incorporate, Am better than thy dear self’s better part."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undivided]] | adjective | **1.** Not parted by conflict of opinion.<br>**2.** Not shared by or among others. | *"XXXVI Let me confess that we two must be twain, Although our undivided loves are one: So shall those blots that do with me remain, Without thy help, by me be borne alone."* — William Shakespeare, *Shakespeare's Sonnets* |
| [[vidal]] | noun | **1.** United states writer (born in 1925). | *"In academic literature, vidal designates united states writer (born in 1925)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vidalia]] | noun | **1.** A town in central georgia; the origin of vidalia onions. | *"In academic literature, vidalia designates a town in central georgia; the origin of vidalia onions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vidar]] | noun | **1.** (norse mythology) one of the aesir; son of odin; avenges his parent by slaying fenrir at ragnarok. | *"And I remember me, when I was of the Assir, and of the Vanir, that Odin sat in judgment over men in the court of the twelve gods, and that their names were Thor, Baldur, Niord, Frey, Tyr, Bregi, Heimdal, Hoder, Vidar, Ull, Forseti, and Loki."* — Jack London, *The Jacket (The Star-Rover)* |
| [[videlicet]] | adverb | **1.** As follows. | *"The poor world is almost six thousand years old, and in all this time there was not any man died in his own person, _videlicet_, in a love-cause."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[video]] | noun | **1.** The visible part of a television transmission.<br>**2.** A recording of both the visual and audible components (especially one containing a recording of a movie or television program). | *"NATHANIEL. _Videsne quis venit?_ HOLOFERNES. _Video, et gaudeo._ ARMADO. _Chirrah!_ HOLOFERNES. _Quare_ “chirrah”, not “sirrah”?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[videocassette]] | noun | **1.** A cassette for videotape. | *"In academic literature, videocassette designates a cassette for videotape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[videodisc]] | noun | **1.** A digital recording (as of a movie) on an optical disk that can be played on a computer or a television set. | *"In academic literature, videodisc designates a digital recording (as of a movie) on an optical disk that can be played on a computer or a television set."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[videodisk]] | noun | **1.** A digital recording (as of a movie) on an optical disk that can be played on a computer or a television set. | *"In academic literature, videodisk designates a digital recording (as of a movie) on an optical disk that can be played on a computer or a television set."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[videotape]] | noun | **1.** A video recording made on magnetic tape.<br>**2.** A relatively wide magnetic tape for use in recording visual images and associated sound. | *"In academic literature, videotape designates a video recording made on magnetic tape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vidua]] | noun | **1.** Whydahs. | *"In the Lord Treasurer’s Remembrancer’s office is the following:--“Uske: De Elizea John ap Jevan vidua, occasionat. ad ostendendum quo titulo tenet domum et situm Prioratus de Uske, et alias terras in comitatu Monmouth."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sight]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VID
  </div>
</div>
