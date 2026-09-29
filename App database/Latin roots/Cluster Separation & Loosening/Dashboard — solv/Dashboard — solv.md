---
status: unread
type: root_dashboard
---
# Dashboard — solv
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">solv-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to loosen, untie, or free”</span>
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

The root **solv** means to loosen, untie, or free. It refers to the action of loosen,ing and carrying out this process. In English, this root forms words such as *binding*, *tying*, *absolute*, and *absolutely*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to loosen, untie, or free
> The root **solv** means to loosen, untie, or free. It refers to the action of loosen,ing and carrying out this process. In English, this root forms words such as *binding*, *tying*, *absolute*, and *absolutely*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To loosen, untie, or free</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Untying a tight knot and separating two parts from each other.</mark>
> - **Everyday Connection**: Think of familiar words like *binding* and *tying*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **solv** comes from a Latin word that means *"to loosen, untie, or free"*.
  - At its core, it describes the action of loosen, untie, or free.

- **The Big Picture Idea**:
  - Picture untying a tight knot and separating two parts from each other.
  - Whenever you see **solv** in an English word, think of **to loosen, untie, or free**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to loosen, untie, or free).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Binding**: An everyday English word showing the root's idea of *to loosen, untie, or free*.
  - **Tying**: An everyday English word showing the root's idea of *to loosen, untie, or free*.
  - **Absolute**: Not qualified or diminished in any way.
  - **Absolutely**: With no qualification, restriction, or limitation.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">solv</mark>, think of <mark class="hl-def">to loosen, untie, or free</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Present Verbal Base:** *solv-* $\to$ *solve*, *dissolve*, *absolve*, *resolve*.
- **Supine / Participial Base (`-ut-`):** *solut-* $\to$ *solution*, *solute*, *absolute*, *resolute*, *dissolute*.
- **Financial Participle (`-ent`):** *solvent* (liquid dissolver; able to pay debts), *solvency*, *insolvent*, *insolvency*.
- **Prefixation:**
  - `ab-` + *solvere* $\to$ *absolve* (to release from guilt/sin), *absolution*, *absolute* (unbound, perfect), *absolutism*.
  - `dis-` + *solvere* $\to$ *dissolve* (melt into liquid; disperse assembly), *dissolution*, *dissolute* (lax, unrestrained).
  - `re-` + *solvere* $\to$ *resolve* (break down into parts; make a firm choice), *resolution*, *resolute*, *resolutely*, *irresolute*.
- **Capability Suffix (`-uble`):** *solūbilis* $\to$ *soluble*, *solubility*, *insoluble*, *insolubility*, *resoluble*.

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

### 1. Chemistry & Physics
- *solution* (a liquid mixture in which the solute is uniformly distributed within the solvent).
- *solute* (the minor component in a solution, dissolved in the solvent).
- *solvent* (able to dissolve other substances; a liquid in which solutes are dissolved).
- *dissolve* (to incorporate a solid into a liquid so as to form a solution; to disintegrate).
- *soluble* (able to be dissolved, especially in water).
- *insoluble* (incapable of being dissolved).

### 2. Finance & Commercial Law
- *solvent* (having assets in excess of liabilities; able to pay one's debts).
- *solvency* (the possession of assets in excess of liabilities; ability to pay debts).
- *insolvent* (unable to pay debts owed; bankrupt).
- *insolvency* (the state of being insolvent or bankrupt).

### 3. Theology, Jurisprudence & Governance
- *absolve* (to set or declare free from blame, guilt, or religious sin).
- *absolution* (formal release from guilt, obligation, or religious punishment).
- *absolute* (not qualified or diminished in any way; total; unconstrained by laws).
- *absolutism* (the acceptance of or belief in absolute principles in politics, philosophy, or ethics).

### 4. Cognition, Moral Character & Problem Solving
- *solve* (to find an answer to, explanation for, or means of dealing with a problem).
- *resolve* (to settle or find a solution to a problem; to decide firmly on a course of action).
- *resolution* (a firm decision to do or not do something; the action of solving a problem; optical clarity).
- *resolute* (admirably purposeful, determined, and unwavering).
- *irresolute* (hesitant, indecisive, uncertain).
- *dissolute* (lax in morals; licentious; dissoluteness).

---

## 🔀 4. Prefix & Combining Dynamics on solv

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `ab-` + `solv-` | Separation release | Loosened entirely from the shackles of sin or legal debt | *absolve, absolution* |
| `ab-` + `solut-` + `-e` | Detached completeness | Untethered by limitations; pure, autocratic, total | *absolute, absolutism* |
| `dis-` + `solv-` | Dispersing liquefaction | Melting into fluid; dissolving parliament; moral laxity | *dissolve, dissolution, dissolute* |
| `re-` + `solv-` | Intensive unraveling | Deconstructing into elements; forging immutable will | *resolve, resolution, resolute* |
| `in-` + `solv-` + `-ent` | Financial privative | Unbound by payment capacity; bankrupt, insolvent | *insolvent, insolvency* |
| `solv-` + `-ent` | Chemical / fiscal capacity | Capable of dissolving solutes or paying commercial debts | *solvent, solvency* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **General & Analytical Chemistry:** Aqueous solutions, molarity, hydrophilic/hydrophobic solutes, organic solvents.
- **Bankruptcy & Corporate Law:** Chapter 7 liquidation, Chapter 11 reorganization, corporate insolvency proceedings.
- **Political Theory & History:** European absolute monarchies (Louis XIV's *L'État, c'est moi*), totalitarian absolutism.
- **Optics & Imaging:** Display resolution (4K, 8K), resolving power of optical microscopes.
- **Theology & Canon Law:** Sacramental absolution in the confessional.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[absolve]] | verb | **1.** Grant remission of a sin to.<br>**2.** Let off the hook. | *"His crime makes guiltie all his Sons, thy merit Imputed shall absolve them who renounce Thir own both righteous and unrighteous deeds, And live in thee transplanted, and from thee Receive new life."* — John Milton, *Paradise Lost* |
| [[absolved]] | verb | **1.** Grant remission of a sin to.<br>**2.** Let off the hook. | *"Lord Cardinal, The willing’st sin I ever yet committed May be absolved in English."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[absolver]] | noun | **1.** Someone who grants absolution. | *"How hast thou the heart, Being a divine, a ghostly confessor, A sin-absolver, and my friend profess’d, To mangle me with that word banished?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[absolvitory]] | adjective | **1.** Providing absolution. | *"In academic literature, absolvitory designates providing absolution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissolvable]] | adjective | **1.** Capable of dissolving. | *"In academic literature, dissolvable designates capable of dissolving."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissolve]] | noun | **1.** (film) a gradual transition from one scene to the next; the next scene is gradually superimposed as the former scene fades out.<br>**2.** Become weaker. | *"Ah, dear, if I be so, From my cold heart let heaven engender hail And poison it in the source, and the first stone Drop in my neck; as it determines, so Dissolve my life!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dissolved]] | verb | **1.** Become weaker.<br>**2.** Cause to go into a solution. | *"I, after him, do after him wish too, Since I nor wax nor honey can bring home, I quickly were dissolved from my hive To give some labourers room."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dissolvent]] | noun | **1.** A liquid substance capable of dissolving other substances. | *"In academic literature, dissolvent designates a liquid substance capable of dissolving other substances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissolver]] | noun | **1.** A liquid substance capable of dissolving other substances. | *"In academic literature, dissolver designates a liquid substance capable of dissolving other substances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissolving]] | noun | **1.** The process of going into solution.<br>**2.** Become weaker. | *"Ev’n Wedlock asks not love beyond Death’s tie-dissolving portal; But thou, omnipotently fond, May’st promise love immortal!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[insolvable]] | adjective | **1.** Not easily solved; ; - c.l.jones. | *"I pondered the mystery a minute or two; but finding it insolvable, and being certain it could not be of much moment, I dismissed, and soon forgot it."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[insolvency]] | noun | **1.** The lack of financial resources. | *"Won’t she feel forsaken and deserted?” “Impossible!—when I told you how she, on the contrary, deserted me: the idea of my insolvency cooled, or rather extinguished, her flame in a moment.” “You have a curious, designing mind, Mr."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[insolvent]] | noun | **1.** Someone who has insufficient assets to cover their debts.<br>**2.** Unable to meet or discharge financial obligations. | *"A fractional reserve is therefore ordinarily fully adequate, altho with any less than a 100 per cent reserve any bank would be insolvent if all of its demand obligations were presented at the same instant."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[resolvable]] | adjective | **1.** Capable of being solved.<br>**2.** Capable of being settled or resolved. | *"In academic literature, resolvable designates capable of being solved."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resolve]] | noun | **1.** The trait of being resolute.<br>**2.** A formal expression by a meeting; agreed to by a vote. | *"It is as easy to count atomies as to resolve the propositions of a lover."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[resolved]] | verb | **1.** Bring to an end; settle conclusively.<br>**2.** Reach a conclusion after a discussion or deliberation. | *"I have myself resolved upon a course Which has no need of you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[resolvent]] | noun | **1.** A liquid substance capable of dissolving other substances. | *"In academic literature, resolvent designates a liquid substance capable of dissolving other substances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resolving]] | noun | **1.** Analysis into clear-cut components.<br>**2.** Bring to an end; settle conclusively. | *"As one of which doth Tarquin lie revolving The sundry dangers of his will’s obtaining, Yet ever to obtain his will resolving, Though weak-built hopes persuade him to abstaining."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[solvability]] | noun | **1.** The property (of a problem or difficulty) that makes it possible to solve. | *"In academic literature, solvability designates the property (of a problem or difficulty) that makes it possible to solve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[solvable]] | adjective | **1.** Capable of being solved. | *"In academic literature, solvable designates capable of being solved."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[solvate]] | noun | **1.** A compound formed by solvation (the combination of solvent molecules with molecules or ions of the solute).<br>**2.** Cause a solvation in (a substance). | *"In academic literature, solvate designates a compound formed by solvation (the combination of solvent molecules with molecules or ions of the solute)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[solvation]] | noun | **1.** A chemical process in which solvent molecules and molecules or ions of the solute combine to form a compound. | *"In academic literature, solvation designates a chemical process in which solvent molecules and molecules or ions of the solute combine to form a compound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[solvay]] | noun | **1.** Belgian chemist who developed the solvay process and built factories exploiting it (1838-1922). | *"In academic literature, solvay designates belgian chemist who developed the solvay process and built factories exploiting it (1838-1922)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[solve]] | verb | **1.** Find the solution to (a problem or question) or understand the meaning of.<br>**2.** Find the solution. | *"This is the central problem which a study of his life presents, and it is one of no ordinary complexity; but there are some considerations relating to it which go far to solve it, and these it may be worth while for us at this point to examine."* — John Cairns, *Principal Cairns* |
| [[solved]] | verb | **1.** Find the solution to (a problem or question) or understand the meaning of.<br>**2.** Find the solution. | *"I am sure that you will be grateful if the question is solved for Bruno, as you would otherwise be obliged to settle it yourself." Frau Maxa's heart was very heavy at this news."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[solvency]] | noun | **1.** The ability to meet maturing obligations as they come due. | *"The total reserve is essential to the solvency of the company and the payment of all the policies as they fall due."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[solvent]] | noun | **1.** A liquid substance capable of dissolving other substances.<br>**2.** A statement that solves a problem or explains how to solve the problem. | *"But every man’s not obliged to be solvent?"* — Charles Dickens, *Bleak House* |
| [[solver]] | noun | **1.** A thinker who focuses on the problem as stated and tries to synthesize information and knowledge to achieve a solution. | *"In academic literature, solver designates a thinker who focuses on the problem as stated and tries to synthesize information and knowledge to achieve a solution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[solving]] | noun | **1.** Finding a solution to a problem.<br>**2.** Find the solution to (a problem or question) or understand the meaning of. | *"Gracious God! what dreadful thoughts entered my head; in solving this mystery perhaps I had solved another, and the fate of my lost companion might be revealed in the shocking spectacle I had just witnessed."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[undissolved]] | adjective | **1.** Retaining a solid form. | *"After the proper time, which is found by experiment, the liquid is drawn off, and in some cases the concentrates are given a second dose to ensure that the gold shall be thoroughly removed and none left undissolved."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[unresolvable]] | adjective | **1.** Not easily solved; ; - c.l.jones.<br>**2.** Not capable of being resolved. | *"In academic literature, unresolvable designates not easily solved; ; - c.l.jones."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unresolved]] | adjective | **1.** Not solved.<br>**2.** Not brought to a conclusion; subject to further thought. | *"In academic literature, unresolved designates not solved."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsolvability]] | noun | **1.** The property (of a problem or difficulty) that makes it impossible to solve. | *"In academic literature, unsolvability designates the property (of a problem or difficulty) that makes it impossible to solve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsolvable]] | adjective | **1.** Not easily solved; ; - c.l.jones. | *"In academic literature, unsolvable designates not easily solved; ; - c.l.jones."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsolved]] | adjective | **1.** Not solved. | *"Several parties were arrested on suspicion, but nothing could be proved, and the mystery remained unsolved."* — Classic Author, *The wonders of prayer* |

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
    ROOT DASHBOARD · SOLV
  </div>
</div>
