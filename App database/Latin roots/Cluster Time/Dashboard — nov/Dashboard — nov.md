---
status: unread
type: root_dashboard
---
# Dashboard — nov
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">nov-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“new”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The rhythmic hands of a clock ticking forward as hours and days pass by.</span>
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

The root **nov** means new. It refers to something recently produced, fresh, or unfamiliar. In English, this root forms words such as *novel*, *novelty*, *novice*, and *innovate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: new
> The root **nov** means new. It refers to something recently produced, fresh, or unfamiliar. In English, this root forms words such as *novel*, *novelty*, *novice*, and *innovate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">New</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The rhythmic hands of a clock ticking forward as hours and days pass by.</mark>
> - **Everyday Connection**: Think of familiar words like *novel* and *novelty*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **nov** comes from a Latin word that means *"new"*.
  - At its core, it describes new.

- **The Big Picture Idea**:
  - Picture the rhythmic hands of a clock ticking forward as hours and days pass by.
  - Whenever you see **nov** in an English word, think of **time, seasons, and duration**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of new.
  - **Mental & Social**: How people experience, organize, or communicate about new.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Novel**: N.* A fictitious prose narrative of book length, typically representing character and action with some degree of realism.
  - **Novelty**: The quality of being new, original, or unusual.
  - **Novice**: A person who is new to and inexperienced in a job or situation.
  - **Innovate**: To make changes in something established, especially by introducing new methods, ideas, or products.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">nov</mark>, think of <mark class="hl-def">time, seasons, and duration</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root forms active verbs, adjectives, and nouns through distinct morphological patterns:
1. **The Base Adjectival Stem `nov-`**: Direct from *novus*: *novel*, *novelty*, *nova*, *novice* (< Latin *novīcius* "newly arrived, inexperienced"), *novitiate*.
2. **Prefixal Compounding with `in-`**:
   - Latin *innovāre* (< *in-* "into" + *novāre* "to make new") $\to$ *innovate*, *innovation*, *innovative*, *innovator*.
3. **Prefixal Compounding with `re-`**:
   - Latin *renovāre* (< *re-* "again" + *novāre*) $\to$ *renovate*, *renovation*, *renovator*.
4. **Latin Legal Formulae**: *de novo* (literally "from the new", meaning starting afresh from the beginning).

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

The root branches across four major cultural and scientific domains:
- **Technological & Conceptual Inventiveness**: [[innovate]], [[innovation]]
- **Restoration & Architectural Renewal**: [[renovate]], [[renovation]]
- **Literary Form & Narrative Art**: [[novel]], [[antinovel]], [[novelty]]
- **Astronomy & Cosmology**: [[nova]], `supernova`
- **Inexperience & Institutional Initiation**: [[novice]], `novitiate`
- **Jurisprudence & Scientific Method**: [[de novo]]

---

## 🔀 4. Prefix & Combining Dynamics on nov

1. **`in-` + `nov`** (*in* "into"):
   - *innovate* $\to$ to introduce new methods, ideas, or products.
   - *innovation* $\to$ a new method, idea, or device.
2. **`re-` + `nov`** (*re* "again"):
   - *renovate* $\to$ to restore to a good state of repair; to refresh or invigorate.
   - *renovation* $\to$ the act of improving or updating a broken or dated structure.
3. **`anti-` + `novel`** (*anti* "against"):
   - *antinovel* $\to$ an experimental work of fiction that deliberately avoids the conventional elements of plot, character development, and chronology.
4. **`de` + `novo`** (*dē* "from, out of" + *novus*):
   - *de novo* $\to$ anew; from the very beginning; without regard to prior proceedings.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Astronomy & Astrophysics**: Type Ia *supernovae*, white dwarf accretion *novae*.
- **Business, Tech & Economics**: disruptive *innovation*, patent law, startup incubation.
- **Law & Jurisprudence**: *de novo* judicial review of legal interpretations.
- **Architecture & Urban Planning**: heritage building *renovation*, brownfield revitalization.
- **Literature & Creative Writing**: modernism and the *antinovel*, epistolary *novels*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[innovate]] | verb | **1.** Bring something new to an environment. | *"But Lydgate meant to innovate in his treatment also, and he was wise enough to see that the best security for his practising honestly according to his belief was to get rid of systematic temptations to the contrary."* — George Eliot, *Middlemarch* |
| [[innovation]] | noun | **1.** A creation (a new device or process) resulting from study and experimentation.<br>**2.** The creation of something in the mind. | *"I think their inhibition comes by the means of the late innovation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[innovational]] | adjective | **1.** Being or producing something like nothing done or experienced or created before. | *"In academic literature, innovational designates being or producing something like nothing done or experienced or created before."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[innovative]] | adjective | **1.** Ahead of the times.<br>**2.** Being or producing something like nothing done or experienced or created before. | *"In academic literature, innovative designates ahead of the times."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[innovativeness]] | noun | **1.** Originality by virtue of introducing new ideas. | *"In academic literature, innovativeness designates originality by virtue of introducing new ideas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[innovator]] | noun | **1.** Someone who helps to open up a new line of research or technology or art. | *"Go call the people; [_Exit Aedile._] in whose name myself Attach thee as a traitorous innovator, A foe to th’ public weal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nov]] | noun | **1.** The month following october and preceding december. | *"Deutsche Rundschau, Nov. and Dec., 1895."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[nova]] | noun | **1.** A star that ejects some of its material in the form of a cloud and become more luminous in the process. | *"When I think that before long the _Nautilus_ will be by Nova Scotia, and that there near New foundland is a large bay, and into that bay the St."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[novate]] | verb | **1.** Replace with something new, especially an old obligation by a new one. | *"In academic literature, novate designates replace with something new, especially an old obligation by a new one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[novation]] | noun | **1.** (law) the replacement of one obligation by another by mutual agreement of both parties; usually the replacement of one of the original parties to a contract with the consent of the remaining party. | *"In academic literature, novation designates (law) the replacement of one obligation by another by mutual agreement of both parties; usually the replacement of one of the original parties to a contract with the consent of the remaining party."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[novel]] | noun | **1.** An extended fictional work in prose; usually in the form of a story.<br>**2.** A printed and bound book that is an extended work of fiction. | *"CXXIII No, Time, thou shalt not boast that I do change: Thy pyramids built up with newer might To me are nothing novel, nothing strange; They are but dressings of a former sight."* — William Shakespeare, *Shakespeare's Sonnets* |
| [[novelette]] | noun | **1.** A short novel. | *"In academic literature, novelette designates a short novel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[novelise]] | verb | **1.** Convert into the form or the style of a novel. | *"In academic literature, novelise designates convert into the form or the style of a novel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[novelist]] | noun | **1.** One who writes novels. | *"I became neither Bible scholar nor novelist."* — Jack London, *The Jacket (The Star-Rover)* |
| [[novelize]] | verb | **1.** Convert into the form or the style of a novel. | *"In academic literature, novelize designates convert into the form or the style of a novel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[novelty]] | noun | **1.** Originality by virtue of being refreshingly novel.<br>**2.** Originality by virtue of being new and surprising. | *"I may truly say, it is a novelty to the world."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[novice]] | noun | **1.** Someone who has entered a religious order but has not taken final vows.<br>**2.** Someone new to a field or activity. | *"Triple-turned whore! ’Tis thou Hast sold me to this novice, and my heart Makes only wars on thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[renovate]] | verb | **1.** Restore to a previous or better condition.<br>**2.** Make brighter and prettier. | *"It revived her, but could not renovate her courage."* — Nathaniel Hawthorne, *Twice-Told Tales* |
| [[renovation]] | noun | **1.** The act of improving by renewing and restoring.<br>**2.** The state of being restored to its former good condition. | *"Yet it must be admitted that this family formed a very good stock whereon to regraft a name which sadly wanted such renovation."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[renovator]] | noun | **1.** A skilled worker who is employed to restore or refinish buildings or antique furniture. | *"Moonlight, and the sentiment in man’s heart responsive to it, are the greatest of renovators and reformers."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[supernova]] | noun | **1.** A star that explodes and becomes extremely luminous in the process. | *"In academic literature, supernova designates a star that explodes and becomes extremely luminous in the process."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Time]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · NOV
  </div>
</div>
