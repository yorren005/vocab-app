---
status: unread
type: root_dashboard
---
# Dashboard — ars
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ars-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“burnt or inflamed”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Energy moving into action or maintaining an active state.</span>
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

The root **ars** means burnt or inflamed. It refers to burn, be set alight. In English, this root forms words such as *arson* and *arsonist*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: burnt or inflamed
> The root **ars** means burnt or inflamed. It refers to burn, be set alight. In English, this root forms words such as *arson* and *arsonist*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Burnt or inflamed</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Energy moving into action or maintaining an active state.</mark>
> - **Everyday Connection**: Think of familiar words like *arson* and *arsonist*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ars** comes from a Latin word that means *"burnt or inflamed"*.
  - At its core, it describes burnt or inflamed.

- **The Big Picture Idea**:
  - Picture energy moving into action or maintaining an active state.
  - Whenever you see **ars** in an English word, think of **action, energy, and state of being**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of burnt or inflamed.
  - **Mental & Social**: How people experience, organize, or communicate about burnt or inflamed.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Arson**: The criminal act of deliberately setting fire to property, especially a building.
  - **Arsonist**: A person who commits arson.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ars</mark>, think of <mark class="hl-def">action, energy, and state of being</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> Unlike a productive root, **ars** enters English through a single fossilized channel rather than a living stem paradigm:
> - **Primary Active Stem:** `ard-` (from *ardēre*) — this stem stays in Latin/Romance and does **not** generate the English fire-words on this dashboard (its English descendants, e.g. *ardent*, *ardour*, sit under a separate entry).
> - **Participial / Secondary Stem:** `ars-`/`ārsus` (from the participle *ārsus*, "burnt") — the sole stem feeding this family. Via the derived Latin noun *ārsiōnem* → Old French *arson*, it enters English as the ready-made noun **arson**.
>
> Word formation here is therefore additive on the English side only: the borrowed noun *arson* takes the native agent suffix *-ist* to yield *arsonist*. No Latin prefixes are active on this root in English.

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
> Although the root means **"to burn, be set alight,"** its English descendants cluster tightly around a single legal-destructive sense rather than fanning across domains:
> - **Physical / Destructive Sense:** In [[arson]], the root denotes the literal setting-alight and consuming of property by fire — the material event of combustion applied to a building or possession.
> - **Legal / Criminal Sense:** In [[arson]], it names a specific statutory offence — the *malicious, willful* burning of property — where the fire is not accident but intended act.
> - **Agentive / Human Sense:** In [[arsonist]], it shifts to the person who performs the act — the one who deliberately sets the fire.
> - **Forensic / Criminological Sense:** In [[arsonist]], it anchors a field of investigation and profiling — motive analysis, fire-scene forensics, and the clinical distinction from compulsive fire-setting (pyromania).

---

## 🔀 4. Prefix & Combining Dynamics on ars

> [!info] Honest note: this is a small, non-productive root. No Latin prefixes attach to `ars` in living English formation — the family grows only by English suffixation on the borrowed noun *arson*.

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| *(none active)* | — | — | The English fire-family takes no productive Latin prefix; *arson* enters as a whole borrowed noun from Old French. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| *(base noun)* | Noun (Act / Result) | [[arson]] | The criminal act or result of burning property. |
| `-ist` | Noun (Agent) | [[arsonist]] | The person who commits the act of arson. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Law & Criminal Justice** | [[arson]], [[arsonist]] | A named felony in most criminal codes; charging, prosecution, and sentencing of willful property-burning |
| 🔍 **Forensics & Fire Investigation** | [[arson]], [[arsonist]] | Fire-scene analysis, accelerant detection, cause-and-origin determination |
| 🧠 **Criminology & Psychology** | [[arsonist]] | Offender profiling and motive typologies; clinical distinction from pyromania |
| 🏢 **Insurance & Everyday** | [[arson]] | Insurance-fraud investigation, coverage exclusions, and common reporting of suspicious fires |

---


## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[arse]] | noun | **1.** The fleshy part of the human body that you sit on.<br>**2.** Vulgar slang for anus. | *"O Romeo, that she were, O that she were An open-arse and thou a poperin pear!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arsehole]] | noun | **1.** Vulgar slang for anus. | *"In academic literature, arsehole designates vulgar slang for anus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arsenal]] | noun | **1.** All the weapons and equipment that a country has.<br>**2.** A military structure where arms and ammunition and other military equipment are stored and training is given in the use of arms. | *"She was forced to resign from the Service, and offered a choice to either join a penetration team to the Outer Region or work in an arsenal under tight supervision."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[arsenate]] | noun | **1.** A salt or ester of arsenic acid. | *"Also, 2PbO + SO_{3} ➡ PbSO_{4}.PbO (basic sulphate). _Arsenides_ are partly left as the corresponding oxides, whilst some As_{4}O_{6} is evolved, and some basic arsenate generally remains."* — Donald M. Levy, *Modern Copper Smelting* |
| [[arsenic]] | noun | **1.** A white powdered poisonous trioxide of arsenic; used in manufacturing glass and as a pesticide (rat poison) and weed killer.<br>**2.** A very poisonous metallic element that has three allotropic forms; arsenic and arsenic compounds are used as herbicides and insecticides and various alloys; found in arsenopyrite and orpiment and realgar. | *"As to his religious notions—why, as Voltaire said, incantations will destroy a flock of sheep if administered with a certain quantity of arsenic."* — George Eliot, *Middlemarch* |
| [[arsenical]] | noun | **1.** A pesticide or drug containing arsenic.<br>**2.** Relating to or containing arsenic. | *"Rigidity of arsenical copper, 33, 41."* — Donald M. Levy, *Modern Copper Smelting* |
| [[arsenide]] | noun | **1.** A compound of arsenic with a more positive element. | *"Also, 2PbO + SO_{3} ➡ PbSO_{4}.PbO (basic sulphate). _Arsenides_ are partly left as the corresponding oxides, whilst some As_{4}O_{6} is evolved, and some basic arsenate generally remains."* — Donald M. Levy, *Modern Copper Smelting* |
| [[arsenious]] | adjective | **1.** Relating to compounds in which arsenic is trivalent. | *"In academic literature, arsenious designates relating to compounds in which arsenic is trivalent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arsenopyrite]] | noun | **1.** A silver-white or grey ore of arsenic. | *"In academic literature, arsenopyrite designates a silver-white or grey ore of arsenic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arsine]] | noun | **1.** A poisonous colorless flammable gas used in organic synthesis and to dope transistors and as a poison gas in warfare. | *"In academic literature, arsine designates a poisonous colorless flammable gas used in organic synthesis and to dope transistors and as a poison gas in warfare."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arson]] | noun | **1.** Malicious burning to destroy property. | *"He didn't even have time to explain to me what he meant about "a plain case of arson," and "just circumstantial evidence that wouldn't stand up in court," and about the Law giving him some kind of run-around."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[arsonist]] | noun | **1.** A criminal who illegally sets fire to property. | *"In academic literature, arsonist designates a criminal who illegally sets fire to property."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[binoculars]] | noun | **1.** An optical instrument designed for simultaneous use by both eyes. | *"I had taken up my binoculars while we talked, and was looking at the shore, sweeping the limit of the forest at each side and at the back of the house."* — Joseph Conrad, *Heart of Darkness* |
| [[coarse]] | adjective | **1.** Of textures that are rough to the touch or substances consisting of relatively large particles.<br>**2.** Lacking refinement or cultivation or taste. | *"Now I feel Of what coarse metal ye are moulded, envy!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[coarse-furred]] | adjective | **1.** Having coarse hair or fur. | *"In academic literature, coarse-furred designates having coarse hair or fur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coarse-grained]] | adjective | **1.** Composed of or covered with particles resembling meal in texture or consistency.<br>**2.** Not having a fine texture. | *"In academic literature, coarse-grained designates composed of or covered with particles resembling meal in texture or consistency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coarse-haired]] | adjective | **1.** Having coarse hair or fur. | *"In academic literature, coarse-haired designates having coarse hair or fur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coarse-textured]] | adjective | **1.** Having surface roughness. | *"In academic literature, coarse-textured designates having surface roughness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coarsely]] | adverb | **1.** In coarse pieces. | *"There is a gentleman that serves the count Reports but coarsely of her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[coarsen]] | verb | **1.** Make or become coarse or coarser.<br>**2.** Make less subtle or refined. | *"He saw its effects in broken homes and aching hearts, in coarsened minds and reckless lives."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[coarsened]] | verb | **1.** Make or become coarse or coarser.<br>**2.** Make less subtle or refined. | *"He saw its effects in broken homes and aching hearts, in coarsened minds and reckless lives."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[coarseness]] | noun | **1.** Language or humor that is down-to-earth.<br>**2.** The quality of being composed of relatively large particles. | *"Her manners were open, easy, and decided, like one who had no distrust of herself, and no doubts of what to do; without any approach to coarseness, however, or any want of good humour."* — Jane Austen, *Persuasion* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action & State]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ARS
  </div>
</div>
