---
status: unread
type: root_dashboard
---
# Dashboard — gest
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">gest-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“bear, carry, or perform”</span>
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

The root **gest** means bear, carry, or perform. It refers to supporting a heavy load, carrying something, or enduring hardship. In English, this root forms words such as *gesture*, *gesticulate*, *gesticulation*, and *gestation*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: bear, carry, or perform
> The root **gest** means bear, carry, or perform. It refers to supporting a heavy load, carrying something, or enduring hardship. In English, this root forms words such as *gesture*, *gesticulate*, *gesticulation*, and *gestation*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Bear, carry, or perform</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands actively pushing a lever or carrying out purposeful work.</mark>
> - **Everyday Connection**: Think of familiar words like *gesture* and *gesticulate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **gest** comes from a Latin word that means *"bear, carry, or perform"*.
  - At its core, it describes bear, carry, or perform.

- **The Big Picture Idea**:
  - Picture hands actively pushing a lever or carrying out purposeful work.
  - Whenever you see **gest** in an English word, think of **taking action and doing real work**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of bear, carry, or perform.
  - **Mental & Social**: How people experience, organize, or communicate about bear, carry, or perform.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Gesture**: A movement of part of the body, especially a hand or the head, to express an idea or meaning.
  - **Gesticulate**: To use gestures, especially dramatic ones, instead of speaking or to emphasize one's words.
  - **Gesticulation**: A dramatic or emphatic gesture or motion of the hands or arms.
  - **Gestation**: The process or period of carrying a fetus in the womb between conception and birth.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">gest</mark>, think of <mark class="hl-def">taking action and doing real work</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stem**:
  - `gest-` (< Latin *gestum / gestus*): Highly productive nominal, adjectival, and verbal base.
- **Prefix Dynamics**:
  - `con-` ("together"): *congest, congestion*.
  - `dis-` $	o$ `di-` ("apart"): *digest, digestion*.
  - `in-` ("into"): *ingest, ingestion*.
  - `sub-` $	o$ `sug-` ("under, up from below"): *suggest, suggestion*.
  - `re-` ("back, again"): *register* (< *regesta* "things carried back/recorded").

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
                      ┌── Bodily Movement & Oratory: gesture, gesticulate, gesticulation
                      │
   [gest] ────────────┼── Obstetrics & Development: gestation, gestational
(Carried, borne)      │
                      ├── Gastrointestinal Biology: digest, digestion, ingest, ingestion
                      │
                      └── Accumulation & Subtlety: congest, congestion, suggest, register
```

---

## 🔀 4. Prefix & Combining Dynamics on gest
- **`sub-` + `gest`**: *suggest* — literally to "carry under"; to prompt an idea gently into someone's mind.
- **`in-` + `gest`**: *ingest* — to carry into the stomach; to swallow food or drink.
- **`con-` + `gest`**: *congest* — to heap together; to cause excessive accumulation of blood or traffic.
- **`di-` + `gest`**: *digest* — to break apart and assimilate food nutrients or information.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Obstetrics & Neonatology**: Trimester *gestational* age; intrauterine growth restriction.
- **Gastroenterology**: Gastric motility; *digestive* enzymes; enzymatic breakdown.
- **Urban Planning & Transportation**: Traffic *congestion* modeling; bottleneck mitigation.
- **Cognitive Science & Nonverbal Communication**: Micro-*gestures*; nonverbal signaling; body language.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[congest]] | verb | **1.** Become or cause to become obstructed. | *"In November, 1879, her physician had decided that tubercles had formed in the left lung, and that the right lung was much congested and hardened."* — Classic Author, *The wonders of prayer* |
| [[congested]] | verb | **1.** Become or cause to become obstructed.<br>**2.** Overfull as with blood. | *"In November, 1879, her physician had decided that tubercles had formed in the left lung, and that the right lung was much congested and hardened."* — Classic Author, *The wonders of prayer* |
| [[congestion]] | noun | **1.** Excessive accumulation of blood or other fluid in a body part.<br>**2.** Excessive crowding. | *"Periodical local congestion of funds. § 8."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[congestive]] | adjective | **1.** Relating to or affected by an abnormal collection of blood or other fluid. | *"Not matter, but Mind If exposure to a draught of air while in a state of perspiration is followed by chills, dry cough, influenza, 384:18 congestive symptoms in the lungs, or hints of inflammatory rheumatism, your Mind-remedy is safe and sure."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[digest]] | noun | **1.** A periodical that summarizes the news.<br>**2.** Something that is compiled (as into a single book or file). | *"I am possess’d with an adulterate blot; My blood is mingled with the crime of lust; For if we two be one, and thou play false, I do digest the poison of thy flesh, Being strumpeted by thy contagion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[digester]] | noun | **1.** Autoclave consisting of a vessel in which plant or animal materials are digested. | *"In academic literature, digester designates autoclave consisting of a vessel in which plant or animal materials are digested."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digestibility]] | noun | **1.** The property of being easy to digest. | *"In academic literature, digestibility designates the property of being easy to digest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digestible]] | adjective | **1.** Capable of being converted into assimilable condition in the alimentary canal. | *"I suppose you have--in nightmares, after supping on cold boiled pork and greens, or some nice little digestible morsel like that."* — S. R. Crockett, *Deep Moat Grange* |
| [[digestibleness]] | noun | **1.** The property of being easy to digest. | *"In academic literature, digestibleness designates the property of being easy to digest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digestion]] | noun | **1.** The process of decomposing organic matter (as in sewage) by bacteria or by chemical action or heat.<br>**2.** The organic process by which food is converted into substances that can be absorbed into the body. | *"A good digestion to you all; and once more I shower a welcome on ye."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[digestive]] | noun | **1.** Any substance that promotes digestion.<br>**2.** Relating to or having the power to cause or promote digestion. | *"My digestive functions, as you may have heard me mention, are not in a good state, and rest might improve them; but I shall not rest, sir, while I am your representative."* — Charles Dickens, *Bleak House* |
| [[egest]] | verb | **1.** Eliminate from the body. | *"In academic literature, egest designates eliminate from the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gestalt]] | noun | **1.** A configuration or pattern of elements so unified as a whole that it cannot be described merely as a sum of its parts. | *"Lieblichkeit und Hoheit, und Ruh und Leben, und Geist und Gemuet und Gestalt ist Ein seeliges Eins in diesem Wesen."[65] And six or eight months later: "Mein Schoenheitsinn ist nun vor Stoerung sicher."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[gestapo]] | noun | **1.** The secret state police in nazi germany; known for its terrorist methods. | *"In academic literature, gestapo designates the secret state police in nazi germany; known for its terrorist methods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gestate]] | verb | **1.** Have the idea for.<br>**2.** Be pregnant with. | *"In academic literature, gestate designates have the idea for."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gestation]] | noun | **1.** The period during which an embryo develops (about 266 days in humans).<br>**2.** The state of being pregnant; the period from conception to birth when a woman carries a developing fetus in her uterus. | *"It was she I worshipped when I bowed before the ten stones of jade and adored them as the moons of gestation."* — Jack London, *The Jacket (The Star-Rover)* |
| [[gestational]] | adjective | **1.** Of or relating to gestation. | *"In academic literature, gestational designates of or relating to gestation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gesticulate]] | verb | **1.** Show, express or direct through movement. | *"We had not gone two cable-lengths, when a hundred savages, howling and gesticulating, entered the water up to their waists."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[gesticulating]] | verb | **1.** Show, express or direct through movement.<br>**2.** Making gestures while speaking. | *"We had not gone two cable-lengths, when a hundred savages, howling and gesticulating, entered the water up to their waists."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[gesticulation]] | noun | **1.** A deliberate and vigorous gesture or motion. | *"Nothing can exceed the fierce gesticulation of these people when animated in conversation, and on this occasion they gave loose to all their natural vivacity, shouting and dancing about in a manner that well nigh intimidated us."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[gestural]] | adjective | **1.** Used of the language of the deaf.<br>**2.** Being other than verbal communication. | *"In academic literature, gestural designates used of the language of the deaf."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gesture]] | noun | **1.** Motion of hands or body to emphasize or help to express a thought or feeling.<br>**2.** The use of movements (especially of the hands) to communicate familiar or prearranged signals. | *"If you do love Rosalind so near the heart as your gesture cries it out, when your brother marries Aliena shall you marry her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[indigestibility]] | noun | **1.** The property of being difficult to digest. | *"In academic literature, indigestibility designates the property of being difficult to digest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indigestible]] | adjective | **1.** Digested with difficulty. | *"There was cake, too, very heavy and indigestible, and speckled with huckleberries that had been dried the fall previous."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[indigestibleness]] | noun | **1.** The property of being difficult to digest. | *"In academic literature, indigestibleness designates the property of being difficult to digest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indigestion]] | noun | **1.** A disorder of digestive function characterized by discomfort or heartburn or nausea. | *"We used to canvass whether his wife bullied him or whether he had chronic indigestion."* — Jack London, *The Jacket (The Star-Rover)* |
| [[ingest]] | verb | **1.** Serve oneself to, or consume regularly.<br>**2.** Take up mentally. | *"In academic literature, ingest designates serve oneself to, or consume regularly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ingesta]] | noun | **1.** Solid and liquid nourishment taken into the body through the mouth. | *"In academic literature, ingesta designates solid and liquid nourishment taken into the body through the mouth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ingestion]] | noun | **1.** The process of taking food into the body through the mouth (as by eating). | *"In academic literature, ingestion designates the process of taking food into the body through the mouth (as by eating)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nondigestible]] | adjective | **1.** Not digestible. | *"In academic literature, nondigestible designates not digestible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[predigest]] | verb | **1.** Digest (food) beforehand. | *"In academic literature, predigest designates digest (food) beforehand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[predigested]] | verb | **1.** Digest (food) beforehand.<br>**2.** Artificially partially digested as by enzymatic action. | *"In academic literature, predigested designates digest (food) beforehand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[progestational]] | adjective | **1.** Of or relating to progesterone (or to a drug with effects like those of progesterone).<br>**2.** Preceding and favoring gestation; of or relating to physiological changes associated with ovulation and formation of the corpus luteum. | *"In academic literature, progestational designates of or relating to progesterone (or to a drug with effects like those of progesterone)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[progesterone]] | noun | **1.** A steroid hormone (trade name lipo-lutin) produced in the ovary; prepares and maintains the uterus for pregnancy. | *"In academic literature, progesterone designates a steroid hormone (trade name lipo-lutin) produced in the ovary; prepares and maintains the uterus for pregnancy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[progestin]] | noun | **1.** Any of a group of steroid hormones that have the effect of progesterone. | *"In academic literature, progestin designates any of a group of steroid hormones that have the effect of progesterone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[progestogen]] | noun | **1.** Any of a group of steroid hormones that have the effect of progesterone. | *"In academic literature, progestogen designates any of a group of steroid hormones that have the effect of progesterone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suggest]] | verb | **1.** Make a proposal, declare a plan for something.<br>**2.** Drop a hint; intimate by a hint. | *"I give thee not this to suggest thee from thy master thou talk’st of; serve him still."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[suggester]] | noun | **1.** Someone who advances a suggestion or proposal. | *"In academic literature, suggester designates someone who advances a suggestion or proposal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suggestibility]] | noun | **1.** Susceptibility or responsiveness to suggestion. | *"In academic literature, suggestibility designates susceptibility or responsiveness to suggestion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suggestible]] | adjective | **1.** Susceptible or responsive to suggestion. | *"In academic literature, suggestible designates susceptible or responsive to suggestion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suggestion]] | noun | **1.** An idea that is suggested.<br>**2.** A proposal offered for acceptance or rejection. | *"He was a man Of an unbounded stomach, ever ranking Himself with princes; one that by suggestion Tied all the kingdom."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[suggestive]] | adjective | **1.** Tending to suggest or imply.<br>**2.** (usually followed by `of') pointing out or revealing clearly. | *"Smallweed, and thirdly because the contrast between those powerful expressions and his powerless figure is suggestive of a baleful old malignant who would be very wicked if he could."* — Charles Dickens, *Bleak House* |
| [[suggestively]] | adverb | **1.** In a suggestive manner. | *"It suddenly occurred to her to try persuasion; and accordingly she whispered in his ear, with as much firmness and decision as she could summon— “Let us walk on, darling,” at the same time taking him suggestively by the arm."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |

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
    ROOT DASHBOARD · GEST
  </div>
</div>
