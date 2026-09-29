---
status: unread
type: root_dashboard
---
# Dashboard — cid
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cid-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to cut, kill, or to fall”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Untying a tight knot and separating two parts from each other.</span>
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

The root **cid** means to cut, kill, or to fall. It refers to dropping downward by gravity, collapsing, or tumbling. In English, this root forms words such as *incident*, *accident*, *decide*, and *homicide*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to cut, kill, or to fall
> The root **cid** means to cut, kill, or to fall. It refers to dropping downward by gravity, collapsing, or tumbling. In English, this root forms words such as *incident*, *accident*, *decide*, and *homicide*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To cut, kill, or to fall</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Untying a tight knot and separating two parts from each other.</mark>
> - **Everyday Connection**: Think of familiar words like *incident* and *accident*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cid** comes from a Latin word that means *"to cut, kill, or to fall"*.
  - At its core, it describes the action of cut, kill, or fall.

- **The Big Picture Idea**:
  - Picture untying a tight knot and separating two parts from each other.
  - Whenever you see **cid** in an English word, think of **to cut, kill, or to fall**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to cut, kill, or to fall).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Incident**: An everyday English word showing the root's idea of *to cut, kill, or to fall*.
  - **Accident**: An everyday English word showing the root's idea of *to cut, kill, or to fall*.
  - **Decide**: To resolve or settle a dispute or question. 2. To make a definitive choice between alternatives.
  - **Homicide**: The killing of one human being by another. 2. The police division investigating suspicious deaths.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cid</mark>, think of <mark class="hl-def">to cut, kill, or to fall</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Combining Verbal Form:** *-cīdō, -cīdere* $\to$ *decide* (to resolve).
- **Nominal Agent Suffix (`-cide`):** *-cīda* $\to$ one who kills (e.g., *regicide* = king-slayer).
- **Nominal Act Suffix (`-cide`):** *-cīdium* $\to$ the act of killing (e.g., *homicide* = manslaughter).
- **Chemical Eradication System (`-cide`):** Attached to biological targets to denote lethal chemical agents (*pesticide*, *insecticide*, *fungicide*, *herbicide*, *biocide*).

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

### 1. Mental & Volitional Resolution
- *decide* (to settle a question by cutting away alternative possibilities; make a choice).

### 2. Interpersonal & Kinship Slaying
- *homicide* (the killing of one human being by another).
- *suicide* (the act of intentionally causing one's own death).
- *patricide* (the murder of one's father).
- *matricide* (the murder of one's mother).
- *fratricide* (the murder of one's brother).
- *sororicide* (the murder of one's sister).
- *infanticide* (the killing of an infant).
- *parricide* (the killing of a parent or near relative).

### 3. Political & Sovereign Slaying
- *regicide* (the deliberate killing of a king or monarch).
- *tyrannicide* (the assassination of a tyrant in defense of liberty).
- *genocide* (the deliberate and systematic destruction of a racial, political, or cultural group).

### 4. Agricultural & Chemical Eradication
- *pesticide* (a chemical substance used to destroy insects or other organisms harmful to cultivated plants).
- *insecticide* (a substance used for killing insects).
- *herbicide* (a toxic chemical substance used to destroy unwanted vegetation).
- *fungicide* (a chemical that destroys or inhibits the growth of fungi).
- *germicide* (an agent that destroys microorganisms).

---

## 🔀 4. Prefix & Combining Dynamics on cid

| Target Category | Combining Element | Resulting Compound | Semantic Outcome |
| :--- | :--- | :--- | :--- |
| Mental | `dē-` (down/off) | *decide* | Severing debate; arriving at an immutable choice |
| Universal Human | `homō` (human) | *homicide* | The slaying of a human being |
| Self | `sui` (of oneself) | *suicide* | Self-inflicted intentional death |
| Nation / Tribe | Greek `genos` (race) | *genocide* | Systematic extermination of an ethnic populace |
| Monarch | `rēx, rēgis` (king) | *regicide* | Killing the sovereign head of state |
| Father | `pater` (father) | *patricide* | The murder of one's paternal progenitor |
| Mother | `māter` (mother) | *matricide* | The murder of one's maternal progenitor |
| Agronomic Pest | `pestis` (plague) | *pesticide* | Agricultural chemical agent destroying pests |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Criminal Jurisprudence:** Homicide statutes (manslaughter vs murder), parricide aggravating circumstances, forensic pathology.
- **International Law & Human Rights:** The 1948 UN Convention on the Prevention and Punishment of the Crime of Genocide.
- **Agriculture & Toxicology:** Synthetic insecticides (organophosphates, neonicotinoids), herbicide resistance, biocidal safety data sheets (MSDS).
- **Philosophy of Decision Making:** Decisional latency, decision paralysis, executive cognitive control.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[accidence]] | noun | **1.** The part of grammar that deals with the inflections of words. | *"I pray you ask him some questions in his accidence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accident]] | noun | **1.** An unfortunate mishap; especially one causing damage or injury.<br>**2.** Anything that happens suddenly or by chance without an apparent cause. | *"The day Was yours by accident; had it gone with us, We should not, when the blood was cool, have threaten’d Our prisoners with the sword."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accident-prone]] | adjective | **1.** Having more than the average number of accidents. | *"In academic literature, accident-prone designates having more than the average number of accidents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[accidental]] | noun | **1.** A musical notation that makes a note sharp or flat or natural although that is not part of the key signature.<br>**2.** Happening by chance or unexpectedly or unintentionally. | *"So shall you hear Of carnal, bloody and unnatural acts, Of accidental judgements, casual slaughters, Of deaths put on by cunning and forc’d cause, And, in this upshot, purposes mistook Fall’n on the inventors’ heads."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accidentally]] | adverb | **1.** Without advance planning.<br>**2.** Of a minor or subordinate nature. | *"These are the parents to these children, Which accidentally are met together."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[alcidae]] | noun | **1.** Web-footed diving seabirds of northern seas: auks; puffins; guillemots; murres; etc. | *"In academic literature, alcidae designates web-footed diving seabirds of northern seas: auks; puffins; guillemots; murres; etc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alcides]] | noun | **1.** (classical mythology) a hero noted for his strength; performed 12 immense labors to gain immortality. | *"Teach me, Alcides, thou mine ancestor, thy rage."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arcidae]] | noun | **1.** Ark shells. | *"In academic literature, arcidae designates ark shells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ascidiaceae]] | noun | **1.** Sometimes classified as an order: sea squirts. | *"In academic literature, ascidiaceae designates sometimes classified as an order: sea squirts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ascidian]] | noun | **1.** Minute sedentary marine invertebrate having a saclike body with siphons through which water enters and leaves. | *"In academic literature, ascidian designates minute sedentary marine invertebrate having a saclike body with siphons through which water enters and leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cid]] | noun | **1.** The united states army's principal law enforcement agency responsible for the conduct of criminal investigations for all levels of the army anywhere in the world. | *"In academic literature, cid designates the united states army's principal law enforcement agency responsible for the conduct of criminal investigations for all levels of the army anywhere in the world."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cider]] | noun | **1.** A beverage made from juice pressed from apples. | *"On a triangular shelf across the corner stood bread, bacon, cheese, and a cup for ale or cider, which was supplied from a flagon beneath."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[ciderpress]] | noun | **1.** A press that is used to extract the juice from apples. | *"In academic literature, ciderpress designates a press that is used to extract the juice from apples."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coincide]] | verb | **1.** Go with, fall together.<br>**2.** Happen simultaneously. | *"But as long as our plans seem to coincide so well, I shall ask you if it would be inconvenient to you if we put off the date of our return a week longer."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[coincidence]] | noun | **1.** An event that might have been arranged although it was really accidental.<br>**2.** The quality of occupying the same position or area in space. | *"It is a coincidence,” said Mr."* — Charles Dickens, *Bleak House* |
| [[coincident]] | adjective | **1.** Occurring or operating at the same time.<br>**2.** Matching point for point. | *"On each soft side—coincident with the parted swell, that but once leaving him, then flowed so wide away—on each bright side, the whale shed off enticings."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[coincidental]] | adjective | **1.** Occurring or operating at the same time. | *"In academic literature, coincidental designates occurring or operating at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coincidentally]] | adverb | **1.** Happening at the same time. | *"In academic literature, coincidentally designates happening at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coincidently]] | adverb | **1.** Happening at the same time. | *"From that time the method has developed coincidently with the more empirical practice at many works of replacing coke fuel by sulphides to as great an extent as possible."* — Donald M. Levy, *Modern Copper Smelting* |
| [[coinciding]] | verb | **1.** Go with, fall together.<br>**2.** Happen simultaneously. | *"A deed done is irrevocable, and its result coinciding in time with the actions of millions of other men assumes an historic significance."* — graf Leo Tolstoy, *War and Peace* |
| [[decide]] | verb | **1.** Reach, make, or come to a decision about something.<br>**2.** Bring to an end; settle conclusively. | *"Or to the place of difference call the swords Which must decide it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decided]] | verb | **1.** Reach, make, or come to a decision about something.<br>**2.** Bring to an end; settle conclusively. | *"I am doing the right thing," said Mäzli now in the most decided tone."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[decidedly]] | adverb | **1.** Without question and beyond doubt. | *"But the mother now explained decidedly to the little girl that she never needed to undertake such actions in the future as she could not possibly judge which clothes she still needed and which could be given away."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[deciding]] | noun | **1.** The cognitive process of reaching a decision.<br>**2.** Reach, make, or come to a decision about something. | *"The ladies wanted my opinion before deciding."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[decidua]] | noun | **1.** The epithelial tissue of the endometrium. | *"In academic literature, decidua designates the epithelial tissue of the endometrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deciduous]] | adjective | **1.** (of plants and shrubs) shedding foliage at the end of the growing season.<br>**2.** (of teeth, antlers, etc.) being shed at the end of a period of growth. | *"Under foot the leaves were dry, and the foliage of some holly bushes which grew among the deciduous trees was dense enough to keep off draughts."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[incidence]] | noun | **1.** The relative frequency of occurrence of something.<br>**2.** The striking of a light beam on a surface. | *"At one end one sees innumerable masses of grey weather-beaten stones in every grotesque angle of incidence and coincidence, but all rude and mean, covered with mystic Hebrew letters and half-buried amid long grass, nettles, and weeds."* — John Cairns, *Principal Cairns* |
| [[incident]] | noun | **1.** A single distinct event.<br>**2.** A public disturbance. | *"Plagues incident to men, Your potent and infectious fevers heap On Athens, ripe for stroke!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incidental]] | noun | **1.** (frequently plural) an expense not budgeted or not specified.<br>**2.** An item that is incidental. | *"Bucket walks upstairs to the little library within the larger one with the face of a man who receives some scores of letters every day, it happens that much correspondence is not incidental to his life."* — Charles Dickens, *Bleak House* |
| [[incidentally]] | adverb | **1.** Introducing a different topic; in point of fact.<br>**2.** Of a minor or subordinate nature. | *"The prison doctor, a likable chap, has just been in to have a yarn with me, incidentally to proffer me his good offices in the matter of dope."* — Jack London, *The Jacket (The Star-Rover)* |
| [[occident]] | noun | **1.** The countries of (originally) europe and (now including) north america and south america.<br>**2.** The hemisphere that includes north america and south america. | *"I may wander From east to occident; cry out for service; Try many, all good; serve truly; never Find such another master."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[occidental]] | noun | **1.** A native inhabitant of the occident.<br>**2.** An artificial language. | *"A sort of halo, an occidental glow, came over life then."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[occidentalise]] | verb | **1.** Make western in character. | *"In academic literature, occidentalise designates make western in character."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[occidentalism]] | noun | **1.** The scholarly knowledge of western cultures and languages and people.<br>**2.** The quality or customs or mannerisms characteristic of western civilizations. | *"In academic literature, occidentalism designates the scholarly knowledge of western cultures and languages and people."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[occidentalize]] | verb | **1.** Make western in character. | *"In academic literature, occidentalize designates make western in character."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[percidae]] | noun | **1.** Active freshwater fishes; true perches and pike perches. | *"In academic literature, percidae designates active freshwater fishes; true perches and pike perches."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recidivate]] | verb | **1.** Go back to bad behavior. | *"In academic literature, recidivate designates go back to bad behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recidivism]] | noun | **1.** Habitual relapse into crime. | *"In academic literature, recidivism designates habitual relapse into crime."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recidivist]] | noun | **1.** Someone who is repeatedly arrested for criminal behavior (especially for the same criminal behavior).<br>**2.** Someone who lapses into previous undesirable patterns of behavior. | *"In academic literature, recidivist designates someone who is repeatedly arrested for criminal behavior (especially for the same criminal behavior)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undecided]] | adjective | **1.** Not brought to a conclusion; subject to further thought.<br>**2.** Characterized by indecision. | *"The suit, still undecided, has fallen into rack, and ruin, and despair, with everything else—and here I stand, this day!"* — Charles Dickens, *Bleak House* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Separation & Loosening]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CID
  </div>
</div>
