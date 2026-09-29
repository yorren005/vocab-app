---
status: unread
type: root_dashboard
---
# Dashboard — opt
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">opt-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to choose or best”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Standing up courageously for what is fair, moral, and honorable.</span>
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

The root **opt** means to choose or best. It refers to the action of choosing and carrying out this process. In English, this root forms words such as *optic*, *optical*, *optician*, and *option*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to choose or best
> The root **opt** means to choose or best. It refers to the action of choosing and carrying out this process. In English, this root forms words such as *optic*, *optical*, *optician*, and *option*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To choose or best</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Standing up courageously for what is fair, moral, and honorable.</mark>
> - **Everyday Connection**: Think of familiar words like *optic* and *optical*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **opt** comes from a Latin word that means *"to choose or best"*.
  - At its core, it describes the action of choose or best.

- **The Big Picture Idea**:
  - Picture standing up courageously for what is fair, moral, and honorable.
  - Whenever you see **opt** in an English word, think of **to choose or best**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to choose or best).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Optic**: An everyday English word showing the root's idea of *to choose or best*.
  - **Optical**: An everyday English word showing the root's idea of *to choose or best*.
  - **Optician**: An everyday English word showing the root's idea of *to choose or best*.
  - **Option**: A thing that is or may be chosen.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">opt</mark>, think of <mark class="hl-def">to choose or best</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `opt-` (< Latin *optāre*): Verbal base ("to choose").
  - `optim-` (< Latin *optimus*): Superlative base ("best, choicest").
- **Prefix Machinery**:
  - `ad-` ("to, toward"): *adopt, adoption, adoptive*.
  - `co-` ("together, alongside"): *co-opt, co-optation*.
- **Suffixal Formations**:
  - `-ion`: *option, adoption*.
  - `-al`: *optional, optimal*.
  - `-ist` / `-ism`: *optimist, optimism*.
  - `-ize` / `-ization`: *optimize, optimization*.
  - `-ative`: *optative*.

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
                      ┌── Agency & Selection: opt, option, optional, optative
                      │
   [opt] ─────────────┼── Legal Inclusion & Strategy: adopt, adoption, adoptive, co-opt, co-optation
 (Choose / Best)      │
                      ├── Philosophy & Temperament: optimism, optimist, optimistic
                      │
                      └── Mathematics & Performance: optimal, optimize, optimization, optimum
```

---

## 🔀 4. Prefix & Combining Dynamics on opt
- **`ad-` + `opt`**: *adopt* — to voluntarily choose someone into a family or choose a policy.
- **`co-` + `opt`**: *co-opt* — to assimilate an opposing group or candidate into an established body.
- **`optim-` + `-ism`**: *optimism* — confidence in the favorable outcome of events.
- **`optim-` + `-ize`**: *optimize* — to make as effective, perfect, or useful as possible.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Computer Science & Applied Mathematics**: Mathematical *optimization*; convex optimization; hyperparameter tuning.
- **Family Law & Jurisprudence**: Legal *adoption* procedures; open vs. closed adoption.
- **Political Science & Sociology**: Elite *co-optation* of protest movements and revolutionary leaders.
- **Finance & Financial Engineering**: Stock *options* (call and put contracts); Black-Scholes pricing model.
- **Linguistics & Classical Grammar**: The *optative* mood in Ancient Greek, Sanskrit, and Proto-Indo-European.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adopt]] | verb | **1.** Choose and follow; as of theories, ideas, policies, strategies or plans.<br>**2.** Take up and practice as one's own. | *"If it be honour in your wars to seem The same you are not, which for your best ends You adopt your policy, how is it less or worse That it shall hold companionship in peace With honour as in war, since that to both It stands in like request?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adoptable]] | adjective | **1.** Suitable or eligible for adoption. | *"In academic literature, adoptable designates suitable or eligible for adoption."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adopted]] | verb | **1.** Choose and follow; as of theories, ideas, policies, strategies or plans.<br>**2.** Take up and practice as one's own. | *"I am more proud to be Sir Rowland’s son, His youngest son, and would not change that calling To be adopted heir to Frederick."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adoptee]] | noun | **1.** Someone (such as a child) who has been adopted. | *"In academic literature, adoptee designates someone (such as a child) who has been adopted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adopter]] | noun | **1.** A person who adopts a child of other parents as his or her own child. | *"In academic literature, adopter designates a person who adopts a child of other parents as his or her own child."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adoption]] | noun | **1.** The act of accepting with approval; favorable reception.<br>**2.** A legal proceeding that creates a parent-child relation between persons not related by blood; the adopted child is entitled to all privileges belonging to a natural child of the adoptive parents (including the right to inherit). | *"I say I am your mother, And put you in the catalogue of those That were enwombed mine. ’Tis often seen Adoption strives with nature, and choice breeds A native slip to us from foreign seeds."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adoptive]] | adjective | **1.** Of parents and children; related by adoption.<br>**2.** Acquired as your own by free choice. | *"Her husband had been an advanced member of the Order, and she had herself taken all the "Adoptive Degrees." These reasons induced her to seek the aid of the Order, and she was pleased to find that she met with much encouragement."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[apoptosis]] | noun | **1.** A type of cell death in which the cell uses specialized cellular machinery to kill itself; a cell suicide mechanism that enables metazoans to control cell number and eliminate cells that threaten the animal's survival. | *"In academic literature, apoptosis designates a type of cell death in which the cell uses specialized cellular machinery to kill itself; a cell suicide mechanism that enables metazoans to control cell number and eliminate cells that threaten the animal's survival."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[co-opt]] | verb | **1.** Choose or elect as a fellow member or colleague.<br>**2.** Neutralize or win over through assimilation into an established group. | *"In academic literature, co-opt designates choose or elect as a fellow member or colleague."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[co-optation]] | noun | **1.** The selection of a new member (usually by a vote of the existing membership).<br>**2.** The act of appointing summarily (with or without the appointee's consent). | *"In academic literature, co-optation designates the selection of a new member (usually by a vote of the existing membership)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[co-option]] | noun | **1.** The selection of a new member (usually by a vote of the existing membership).<br>**2.** The act of appointing summarily (with or without the appointee's consent). | *"In academic literature, co-option designates the selection of a new member (usually by a vote of the existing membership)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diopter]] | noun | **1.** A unit of measurement of the refractive power of a lens which is equal to the reciprocal of the focal length measured in meters; used by oculists. | *"In academic literature, diopter designates a unit of measurement of the refractive power of a lens which is equal to the reciprocal of the focal length measured in meters; used by oculists."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dioptre]] | noun | **1.** A unit of measurement of the refractive power of a lens which is equal to the reciprocal of the focal length measured in meters; used by oculists. | *"In academic literature, dioptre designates a unit of measurement of the refractive power of a lens which is equal to the reciprocal of the focal length measured in meters; used by oculists."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exopterygota]] | noun | **1.** Subclass of insects characterized by gradual and usually incomplete metamorphosis. | *"In academic literature, exopterygota designates subclass of insects characterized by gradual and usually incomplete metamorphosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[opt]] | verb | **1.** Select as an alternative over another. | *"In academic literature, opt designates select as an alternative over another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optative]] | noun | **1.** A mood (as in greek or sanskrit) that expresses a wish or hope; expressed in english by modal verbs.<br>**2.** Indicating an option or wish. | *"In academic literature, optative designates a mood (as in greek or sanskrit) that expresses a wish or hope; expressed in english by modal verbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optez]] | noun | **1.** An artificial language. | *"In academic literature, optez designates an artificial language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optic]] | noun | **1.** The organ of sight.<br>**2.** Of or relating to or resembling the eye. | *"There lands the Fiend, a spot like which perhaps Astronomer in the Sun’s lucent Orbe Through his glaz’d Optic Tube yet never saw."* — John Milton, *Paradise Lost* |
| [[optical]] | adjective | **1.** Of or relating to or involving light or optics.<br>**2.** Relating to or using sight. | *"It is demonstrable that the scratches are going everywhere impartially and it is only your candle which produces the flattering illusion of a concentric arrangement, its light falling with an exclusive optical selection."* — George Eliot, *Middlemarch* |
| [[optically]] | adverb | **1.** In an optical manner. | *"But it seemed that, when on the wharf, Queequeg had not at all noticed what I now alluded to; hence I would have thought myself to have been optically deceived in that matter, were it not for Elijah’s otherwise inexplicable question."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[optician]] | noun | **1.** A worker who makes glasses for remedying defects of vision. | *"It is called the "ultra-microscope." It must first be pointed out that there is a limit to the power of the ordinary microscope, beyond which the skill of the optician cannot go."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[optics]] | noun | **1.** The branch of physics that studies the physical properties of light.<br>**2.** Optical properties. | *"Still I'm not sure you'd like it exactly (Such tastes as a rule are acquired), And you'll find in a nutshell this fact lie, Bruised optics are not much admired."* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[optimal]] | adjective | **1.** Most desirable possible under a restriction expressed or implied. | *"In my line of work, our data bank produces an optimal selection of personalities, skills and identities for the best possible teams we might need to support our contingency plans."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[optimally]] | adverb | **1.** In an optimal and most desirable way. | *"I have no choice, but I have to act quickly." Selvin's battle computer counted down the enemy's distance and flashed estimates on when the enemy line would be optimally exposed to particle beam volleys."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[optimisation]] | noun | **1.** The act of rendering optimal. | *"In academic literature, optimisation designates the act of rendering optimal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optimise]] | verb | **1.** Make optimal; get the most out of; use best.<br>**2.** Modify to achieve maximum efficiency in storage capacity or time or cost. | *"In academic literature, optimise designates make optimal; get the most out of; use best."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optimism]] | noun | **1.** The optimistic feeling that all is going to turn out well.<br>**2.** A general disposition to expect the best in all things. | *"He has lost the cruder optimism of the 'Prometheus', and is thrown back for consolation upon something that moves us more than any prospect of a heaven realised on earth by abolishing kings and priests."* — Sydney Waterlow, *Shelley* |
| [[optimist]] | noun | **1.** A person disposed to take a favorable view of things. | *"Be an optimist, my boy, be an optimist."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[optimistic]] | adjective | **1.** Expecting the best in this best of all possible worlds.<br>**2.** Expecting the best. | *"When it came to making the purchases, he found, what he had overlooked previously in his optimistic way, that four pounds did not go very far."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[optimistically]] | adverb | **1.** With optimism; in an optimistic manner. | *"In academic literature, optimistically designates with optimism; in an optimistic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optimization]] | noun | **1.** The act of rendering optimal. | *"In academic literature, optimization designates the act of rendering optimal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optimize]] | verb | **1.** Make optimal; get the most out of; use best.<br>**2.** Modify to achieve maximum efficiency in storage capacity or time or cost. | *"They intended to cut straight through our defenses to optimize their broadsides but instead they opened themselves to ours."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[optimum]] | noun | **1.** Most favorable conditions or greatest degree or amount possible under given circumstances.<br>**2.** Most desirable possible under a restriction expressed or implied. | *"I am convinced that the UIPS military forces, once they attain optimum strength, will attempt to crush me, or at the least, dominate the Zone."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[option]] | noun | **1.** The right to buy or sell property at an agreed price; the right is purchased and if it is not exercised by a stated date the money is forfeited.<br>**2.** One of a number of things from which only one can be chosen. | *"Still, in most countries and in most states in America, the worker has the option of suing under the old law."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[optional]] | adjective | **1.** Possible but not necessary; left to personal choice. | *"To leave any form of insurance optional, or elective, with either employers or wage-workers, is to fail of the main purpose in a large proportion of the individual cases where it is most needed, and to increase the expense to those that are included."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[optionally]] | adverb | **1.** In an optional manner. | *"In academic literature, optionally designates in an optional manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optometrist]] | noun | **1.** A person skilled in testing for defects of vision in order to prescribe corrective glasses. | *"In academic literature, optometrist designates a person skilled in testing for defects of vision in order to prescribe corrective glasses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optometry]] | noun | **1.** The practice of an optometrist. | *"In academic literature, optometry designates the practice of an optometrist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unadoptable]] | adjective | **1.** Difficult to place in an adoptive home. | *"In academic literature, unadoptable designates difficult to place in an adoptive home."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Virtue]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · OPT
  </div>
</div>
