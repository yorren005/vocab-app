---
status: unread
type: root_dashboard
---
# Dashboard — liber
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">liber-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“free”</span>
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

The root **liber** means free. It describes being free from bonds, unconstrained, or independent. In English, this root forms words such as *liberty*, *liberate*, *liberal*, and *deliver*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: free
> The root **liber** means free. It describes being free from bonds, unconstrained, or independent. In English, this root forms words such as *liberty*, *liberate*, *liberal*, and *deliver*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Free</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Energy moving into action or maintaining an active state.</mark>
> - **Everyday Connection**: Think of familiar words like *liberty* and *liberate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **liber** comes from a Latin word that means *"free"*.
  - At its core, it describes free.

- **The Big Picture Idea**:
  - Picture energy moving into action or maintaining an active state.
  - Whenever you see **liber** in an English word, think of **action, energy, and state of being**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of free.
  - **Mental & Social**: How people experience, organize, or communicate about free.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Liberty**: The state of being free from oppression.
  - **Liberate**: To set free, especially from oppression.
  - **Liberal**: Open to new ideas.
  - **Deliver**: An everyday English word showing the root's idea of *free*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">liber</mark>, think of <mark class="hl-def">action, energy, and state of being</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The adjective *līber* supplies the stem:
> - **Primary Stem:** `liber-` (from *līber*) — the base of freedom words: *liberal*, *liberty*, *libertine*.
> - **Verb Stem:** `līberā-` (from *līberāre*) — *liberate*, *liberation*, *liberator*.
>
> Prefixes (*de-* in *deliberate*) and suffixes (*-al*, *-ty*, *-ine*, *-arian*) shape the family.

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
> Although the root means **"free"**, its register shifts:
> - **Political Sense:** In [[liberate]], [[liberation]], [[liberty]] it is freedom from domination.
> - **Character Sense:** In [[liberal]] it is open-handed and open-minded.
> - **Excess Sense:** In [[libertine]] it is freedom run to self-indulgence.
> - **Philosophy Sense:** In [[libertarian]] it is the doctrine of maximal liberty.

---

## 🔀 4. Prefix & Combining Dynamics on liber

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `de-` (intensive) | thoroughly | [[deliberate]] | (from *lībra*, balance) to weigh fully — consider carefully. |
| *(none)* | — | [[liberal]], [[liberate]], [[liberty]], [[libertine]], [[libertarian]], [[liberator]], [[licit]] | Variants on the base of freedom. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective | [[liberal]] | Of freedom; generous. |
| `-ty` | Noun | [[liberty]] | The state of being free. |
| `-ate` | Verb | [[liberate]] | To set free. |
| `-ine` | Noun / Adj | [[libertine]] | The unrestrained one. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🔬 **Science & Medicine** | — | Not used technically. |
| ⚖️ **Law & Governance** | [[liberate]], [[liberty]], [[libertarian]] | Emancipation, civil liberties, political theory |
| 🎓 **Academic & Rhetoric** | [[deliberate]], [[liberal]] | Deliberative argument, liberal arts |
| 🗣️ **Everyday & Professional** | [[liberate]], [[libertine]] | Personal freedom, conduct |

---


## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[deliberate]] | verb | **1.** Think about carefully; weigh.<br>**2.** Discuss the pros and cons of an issue. | *"To bear all smooth and even, This sudden sending him away must seem Deliberate pause."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deliberately]] | adverb | **1.** With intention; in an intentional manner.<br>**2.** In a deliberate unhurried manner. | *"With two ladies in the coach, this scoundrel has deliberately delayed his arrival six and twenty minutes."* — Charles Dickens, *Bleak House* |
| [[deliberateness]] | noun | **1.** A rate demonstrating an absence of haste or hurry.<br>**2.** The trait of thoughtfulness in action or decision. | *"Oak’s motions, though they had a quiet energy, were slow, and their deliberateness accorded well with his occupation."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[deliberation]] | noun | **1.** (usually plural) discussion of all sides of a question.<br>**2.** Careful consideration. | *"It dwelt on my being young, and he past the prime of life; on his having attained a ripe age, while I was a child; on his writing to me with a silvered head, and knowing all this so well as to set it in full before me for mature deliberation."* — Charles Dickens, *Bleak House* |
| [[deliberative]] | adjective | **1.** Involved in or characterized by deliberation and discussion and examination. | *"Bathsheba’s was an impulsive nature under a deliberative aspect."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[illiberal]] | adjective | **1.** Narrow-minded about cherished opinions. | *"Nobody doubts it; and I hope you do not think I am so illiberal as to want every man to have the same objects and pleasures as myself."* — Jane Austen, *Persuasion* |
| [[illiberality]] | noun | **1.** A disposition not to be liberal (generous) with money. | *"There is, doubtless, considerable political hostility, and a general soreness at the illiberality of the English press; but, collectively speaking, the prepossessions of the people are strongly in favor of England."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[illiberally]] | adverb | **1.** In a narrow-minded manner. | *"In academic literature, illiberally designates in a narrow-minded manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liberal]] | noun | **1.** A person who favors a political philosophy of progress and reform and the protection of civil liberties.<br>**2.** A person who favors an economic theory of laissez-faire and self-regulating markets. | *"I have heard it, Pompey, And am well studied for a liberal thanks Which I do owe you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[liberalisation]] | noun | **1.** The act of making less strict. | *"In academic literature, liberalisation designates the act of making less strict."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liberalise]] | verb | **1.** Become more liberal.<br>**2.** Make liberal or more liberal, of laws and rules. | *"In academic literature, liberalise designates become more liberal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liberalism]] | noun | **1.** A political orientation that favors social progress by reform and by changing laws rather than by revolution.<br>**2.** An economic theory advocating free competition and a self-regulating market. | *"For many years what has been known as the liberalism of young Oxford and Cambridge is in many respects fundamentally different from what is known as liberalism outside the universities."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[liberalist]] | noun | **1.** A person who favors a political philosophy of progress and reform and the protection of civil liberties. | *"In academic literature, liberalist designates a person who favors a political philosophy of progress and reform and the protection of civil liberties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liberalistic]] | adjective | **1.** Having or demonstrating belief in the essential goodness of man and the autonomy of the individual; favoring civil and political liberties, government by law with the consent of the governed, and protection from arbitrary authority. | *"In academic literature, liberalistic designates having or demonstrating belief in the essential goodness of man and the autonomy of the individual; favoring civil and political liberties, government by law with the consent of the governed, and protection from arbitrary authority."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liberality]] | noun | **1.** An inclination to favor progress and individual freedom.<br>**2.** The trait of being generous in behavior and temperament. | *"Over and beside Signior Baptista’s liberality, I’ll mend it with a largess."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[liberalization]] | noun | **1.** The act of making less strict. | *"In academic literature, liberalization designates the act of making less strict."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liberalize]] | verb | **1.** Make liberal or more liberal, of laws and rules.<br>**2.** Become more liberal. | *"The scattered tribes of the Fatherland now worship at the altar of German unity, with a liberalized Empire."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[liberally]] | adverb | **1.** Freely in a nonliteral manner.<br>**2.** In a generous manner. | *"Tulkinghorn, deceased, by attending on the occasion I told you of at his chambers, though she was liberally paid for her time and trouble.” “Lie!” cries mademoiselle."* — Charles Dickens, *Bleak House* |
| [[liberalness]] | noun | **1.** An inclination to favor progress and individual freedom.<br>**2.** The trait of being generous in behavior and temperament. | *"In academic literature, liberalness designates an inclination to favor progress and individual freedom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liberate]] | verb | **1.** Give equal rights to; of women and minorities.<br>**2.** Grant freedom to; free from confinement. | *"Russia is at war with Turkey and calls upon Hellas to liberate itself."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[liberated]] | verb | **1.** Give equal rights to; of women and minorities.<br>**2.** Grant freedom to; free from confinement. | *"The usual reservoirs were filled with the newly-liberated water, and the _Nautilus_ soon descended."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[liberation]] | noun | **1.** The act of liberating someone or something.<br>**2.** The attempt to achieve equal rights or status. | *"The force of the invective, the keenness of the wit, and the fervor of the imagination which they displayed, rendered them an important force in the theological liberation of Scotland."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[liberator]] | noun | **1.** Someone who releases people from captivity or bondage. | *"The results, however, are momentous; for the hero, being a man of action, is no longer content to write and pay for the printing: in his capacity of liberator he has to step into the arena, and, above all, he has to think out a philosophy."* — Sydney Waterlow, *Shelley* |
| [[liberia]] | noun | **1.** A republic in west africa; established in 1822 by americans as a way to free negro slaves. | *"Liberia │Dollar │Gold │ 1 00│ Mexico │do │Silver │ 89.4│Peso or dollar │ │ │ │ 5, 10, 25, and │ │ │ │ 50 centavo."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[liberian]] | noun | **1.** A native or inhabitant of liberia.<br>**2.** Of or relating to liberia or its people. | *"In academic literature, liberian designates a native or inhabitant of liberia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[libertarian]] | noun | **1.** An advocate of libertarianism.<br>**2.** Someone who believes the doctrine of free will. | *"You know our libertarian society."* — Algis Budrys, *Citadel* |
| [[libertarianism]] | noun | **1.** An ideological belief in freedom of thought and speech. | *"In academic literature, libertarianism designates an ideological belief in freedom of thought and speech."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[libertine]] | noun | **1.** A dissolute person; usually a man who is morally unrestrained.<br>**2.** Unrestrained by convention or morality. | *"Let witchcraft join with beauty, lust with both; Tie up the libertine in a field of feasts; Keep his brain fuming."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[liberty]] | noun | **1.** Immunity from arbitrary exercise of authority: political independence.<br>**2.** Freedom of choice. | *"O let me suffer (being at your beck) Th’ imprisoned absence of your liberty, And patience tame to sufferance bide each check, Without accusing you of injury."* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · LIBER
  </div>
</div>
