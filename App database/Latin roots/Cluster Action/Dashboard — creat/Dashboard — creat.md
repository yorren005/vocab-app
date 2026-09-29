---
status: unread
type: root_dashboard
---
# Dashboard — creat
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">creat-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“made or created”</span>
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

The root **creat** means made or created. It refers to bringing something into existence, making, or producing. In English, this root forms words such as *creation*, *creative*, *creatively*, and *creativity*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: made or created
> The root **creat** means made or created. It refers to bringing something into existence, making, or producing. In English, this root forms words such as *creation*, *creative*, *creatively*, and *creativity*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Made or created</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands actively pushing a lever or carrying out purposeful work.</mark>
> - **Everyday Connection**: Think of familiar words like *creation* and *creative*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **creat** comes from a Latin word that means *"made or created"*.
  - At its core, it describes made or created.

- **The Big Picture Idea**:
  - Picture hands actively pushing a lever or carrying out purposeful work.
  - Whenever you see **creat** in an English word, think of **taking action and doing real work**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of made or created.
  - **Mental & Social**: How people experience, organize, or communicate about made or created.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Creation**: The act of causing to exist, or the fact of being brought into existence.
  - **Creative**: Having the ability or power to create.
  - **Creatively**: In an imaginative, inventive, or original manner.
  - **Creativity**: The ability to transcend traditional ideas to create meaningful new ideas, methods, or art.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">creat</mark>, think of <mark class="hl-def">taking action and doing real work</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stem**:
  - `creat-` (< Latin *creātus*): Primary nominal and adjectival base.
- **Suffix Transformations**:
  - `-ion` (result/action): *creation, procreation, recreation*.
  - `-ive` (tendency/capacity): *creative*.
  - `-ity` (abstract quality): *creativity*.
  - `-or` (agent): *creator*.
  - `-ure` (living product): *creature*.

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
                      ┌── Theology & Ontology: creation, creator, uncreated
                      │
   [creat] ───────────┼── Human Intellect: creative, creatively, creativity
  (Made, created)     │
                      ├── Zoology & Biology: creature, procreation
                      │
                      └── Leisure & Renewal: recreate, recreation
```

---

## 🔀 4. Prefix & Combining Dynamics on creat
- **`pro-` + `creat` + `-ion`**: *procreation* — the generation and reproduction of biological offspring.
- **`re-` + `creat` + `-ion`**: *recreation* — the refreshing and re-creating of vital powers through leisure.
- **`un-` + `creat` + `-ed`**: *uncreated* — existing without having been created; eternal and unbegotten.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Theology & Metaphysics**: Creationism vs. evolutionary cosmology; the *uncreated* light of theology.
- **Cognitive Science & Psychology**: Divergent thinking; metrics of *creativity*; cognitive lateral synthesis.
- **Media & Copyright Law**: *Creative* Commons licenses; authorship rights; derivative *creations*.
- **Industrial Design & Advertising**: Creative directors; corporate branding; inventive engineering.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[create]] | verb | **1.** Make or cause to be or to become.<br>**2.** Bring into existence. | *"If thou canst like this creature as a maid, I can create the rest."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[creatin]] | noun | **1.** An amino acid that does not occur in proteins but is found in the muscle tissue of vertebrates both in the free form and as phosphocreatine; supplies energy for muscle contraction. | *"In academic literature, creatin designates an amino acid that does not occur in proteins but is found in the muscle tissue of vertebrates both in the free form and as phosphocreatine; supplies energy for muscle contraction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creatine]] | noun | **1.** An amino acid that does not occur in proteins but is found in the muscle tissue of vertebrates both in the free form and as phosphocreatine; supplies energy for muscle contraction. | *"In academic literature, creatine designates an amino acid that does not occur in proteins but is found in the muscle tissue of vertebrates both in the free form and as phosphocreatine; supplies energy for muscle contraction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creation]] | noun | **1.** The human act of creating.<br>**2.** An artifact that has been brought into existence by someone. | *"But heaven in thy creation did decree, That in thy face sweet love should ever dwell, Whate’er thy thoughts, or thy heart’s workings be, Thy looks should nothing thence, but sweetness tell."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[creationism]] | noun | **1.** The literal belief in the account of creation given in the book of genesis. | *"In academic literature, creationism designates the literal belief in the account of creation given in the book of genesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creative]] | adjective | **1.** Having the ability or power to create.<br>**2.** Promoting construction or creation. | *"When he emerged from them he was fifty-four years of age, he had passed beyond the time of life when his creative powers were at their freshest, and the general habits of his life and lines of his activity had become settled and stereotyped."* — John Cairns, *Principal Cairns* |
| [[creatively]] | adverb | **1.** In a creative manner. | *"In academic literature, creatively designates in a creative manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creativeness]] | noun | **1.** The ability to create. | *"There is some unsuffusing thing beyond thee, thou clear spirit, to whom all thy eternity is but time, all thy creativeness mechanical."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[creativity]] | noun | **1.** The ability to create. | *"The give-and-take stimulated our imaginations and creativity, and often provided me with opportunities to pass along family history."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[creator]] | noun | **1.** Terms referring to the judeo-christian god.<br>**2.** A person who grows or makes or invents things. | *"I make you both Protectors of this land, While I myself will lead a private life And in devotion spend my latter days, To sin’s rebuke and my Creator’s praise."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[creature]] | noun | **1.** A living organism characterized by voluntary movement.<br>**2.** A human being; `wight' is an archaic term. | *"I have been, madam, a wicked creature, as you and all flesh and blood are; and indeed I do marry that I may repent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[miscreate]] | verb | **1.** Shape or form or make badly. | *"In academic literature, miscreate designates shape or form or make badly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miscreation]] | noun | **1.** Something abnormal or anomalous. | *"In academic literature, miscreation designates something abnormal or anomalous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonrecreational]] | adjective | **1.** Involving gainful employment in something often done as a hobby. | *"In academic literature, nonrecreational designates involving gainful employment in something often done as a hobby."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[procreate]] | verb | **1.** Have offspring or produce more individuals of a given animal or plant. | *"In the begin- ing God created man in His, God's, image; but mor- 140:30 tals would procreate man, and make God in their own human image."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[procreation]] | noun | **1.** The sexual activity of conceiving and bearing offspring. | *"Twinned brothers of one womb, Whose procreation, residence and birth Scarce is dividant, touch them with several fortunes, The greater scorns the lesser."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[procreative]] | adjective | **1.** Producing new life or offspring. | *"In academic literature, procreative designates producing new life or offspring."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recreate]] | verb | **1.** Give new life or energy to.<br>**2.** Engage in recreational activities rather than work; occupy oneself in a diversion. | *"Moreover, he hath left you all his walks, His private arbors, and new-planted orchards, On this side Tiber; he hath left them you, And to your heirs forever; common pleasures, To walk abroad, and recreate yourselves."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recreation]] | noun | **1.** An activity that diverts or amuses or stimulates.<br>**2.** Activity that refreshes and recreates; activity that renews your health and spirits by enjoyment and relaxation. | *"Sweet recreation barr’d, what doth ensue But moody and dull melancholy, Kinsman to grim and comfortless despair, And at her heels a huge infectious troop Of pale distemperatures and foes to life?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recreational]] | adjective | **1.** Of or relating to recreation.<br>**2.** Engaged in as a pastime. | *"They, as well as the general population, would be cared for and supported by a host of administrative, health care, educational, recreational, life support and community services."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[uncreative]] | adjective | **1.** Not creative. | *"In academic literature, uncreative designates not creative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncreativeness]] | noun | **1.** A lack of creativity. | *"In academic literature, uncreativeness designates a lack of creativity."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · CREAT
  </div>
</div>
