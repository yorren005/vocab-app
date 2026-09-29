---
status: unread
type: root_dashboard
---
# Dashboard — pen_punish
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pen_punish-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“penalty or punishment”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A community establishing fair rules to ensure order and peaceful living.</span>
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

The root **pen_punish** means penalty or punishment. It refers to repentance, moral contrition, penance, reformative atonement. In English, this root forms words such as *impenitence*, *impenitent*, *impenitently*, and *penance*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: penalty or punishment
> The root **pen_punish** means penalty or punishment. It refers to repentance, moral contrition, penance, reformative atonement. In English, this root forms words such as *impenitence*, *impenitent*, *impenitently*, and *penance*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Penalty or punishment</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community establishing fair rules to ensure order and peaceful living.</mark>
> - **Everyday Connection**: Think of familiar words like *impenitence* and *impenitent*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pen_punish** comes from a Latin word that means *"penalty or punishment"*.
  - At its core, it describes penalty or punishment.

- **The Big Picture Idea**:
  - Picture a community establishing fair rules to ensure order and peaceful living.
  - Whenever you see **pen_punish** in an English word, think of **rules, rights, and the law**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of penalty or punishment.
  - **Mental & Social**: How people experience, organize, or communicate about penalty or punishment.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Impenitence**: The state or quality of being impenitent.
  - **Impenitent**: Adj.** Not feeling or showing remorse or regret for one's sins or offenses.
  - **Impenitently**: In an impenitent, unremorseful, or hardened manner.
  - **Penance**: N.** 1. A voluntary or assigned act of religious devotion to show sorrow for having done wrong.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pen_punish</mark>, think of <mark class="hl-def">rules, rights, and the law</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates via three primary stems:
> 1. **The Contrition Base `penitent-` (from *paenitēns*):**
>    - Adjective & Noun: *penitent*, *penitently*.
>    - Abstract Noun: *penitence*.
>    - Privative Formations: *impenitent*, *impenitently*, *impenitence*.
>    - Institutional Noun: *penitentiary* (suffix `-iary`).
>    - Sacramental Relational: *penitential*, *penitentially*.
> 2. **The French Sacramental Contraction `penance` (from *paenitentia*):**
>    - *penance*.
> 3. **The Intensive Repentance Base `repent-` (from *re-* + *repentir*):**
>    - Verb: *repent*.
>    - Abstract Noun: *repentance*.
>    - Participles: *repentant*, *repentantly*, *unrepentant*, *unrepentantly*, *unrepented*.

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
> - **Moral Contrition & Transformation:** *Penitence*, *penitent*, *repent*, *repentance*, *repentant* — heartfelt remorse for past sins or moral failings.
> - **Sacramental Ritual & Atonement:** *Penance*, *penitential* — prayers, fasting, or restitution assigned by a confessor to repair spiritual harm.
> - **Penology & Prison Reform:** *Penitentiary* — correctional facilities founded on the Enlightenment ideal of solitary self-examination and moral rehabilitation.
> - **Hardened Defiance & Stubbornness:** *Impenitent*, *impenitence*, *unrepentant*, *unrepentantly* — refusal to acknowledge guilt, apologize, or show remorse.

---

## 🔀 4. Prefix & Combining Dynamics on pen_punish

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Sense | Combined Derivative | Resulting Semantic Evolution |
| :--- | :--- | :--- | :--- |
| `re-` | back, again (intensive) | [[repent]], [[repentance]], [[repentant]] | To turn one's heart back from sin; to feel intense remorse for past conduct. |
| `in-` ($\to$ `im-`) | not, un- (privative) | [[impenitent]], [[impenitence]] | Refusing to feel contrition; hardened in guilt or rebellion. |
| `un-` (Germanic) | not | [[unrepentant]], [[unrepentantly]], [[unrepented]] | Showing no remorse, regret, or sorrow; unapologetic. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Representative Derivatives | Morphological Function |
| :--- | :--- | :--- | :--- |
| `-ence` | Abstract Noun (Moral State) | [[penitence]], [[repentance]], [[impenitence]] | The internal moral state of sorrowful remorse or recalcitrant defiance. |
| `-ent` | Adjective / Noun (Person) | [[penitent]], [[repentant]], [[impenitent]] | The individual experiencing contrition, or describing such an attitude. |
| `-iary` | Institutional Noun | [[penitentiary]] | A physical building designed for solitary confinement and moral reform. |
| `-ial` | Adjective (Ritual / Practice) | [[penitential]] | Pertaining to religious penance or expressions of remorse (penitential psalms). |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏛️ **Penology & Criminology** | [[penitentiary]], [[impenitent]], [[unrepentant]] | Historic Auburn and Pennsylvania prison systems; post-sentencing rehabilitation; evaluation of criminal remorse at parole hearings. |
| ⛪ **Theology & Church History** | [[penance]], [[penitence]], [[penitential]], [[repentance]] | The Roman Catholic Sacrament of Penance and Reconciliation; the Seven Penitential Psalms; medieval penitential books (*poenitentiālia*). |
| 🧠 **Moral Psychology & Restorative Justice** | [[repentant]], [[unrepentant]], [[penitence]] | The psychology of remorse; genuine contrition versus public performative apologies; victim-offender restorative mediation. |
| 📖 **Literature & Drama** | [[unrepentant]], [[penitent]], [[impenitent]] | Milton's unrepentant Satan in *Paradise Lost*; Dostoevsky's theme of spiritual regeneration through suffering in *Crime and Punishment*. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[alpena]] | noun | **1.** A town in northern michigan on an arm of lake huron. | *"In academic literature, alpena designates a town in northern michigan on an arm of lake huron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alpenstock]] | noun | **1.** A stout staff with a metal point; used by mountain climbers. | *"In academic literature, alpenstock designates a stout staff with a metal point; used by mountain climbers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antepenult]] | noun | **1.** The 3rd syllable of a word counting back from the end. | *"In academic literature, antepenult designates the 3rd syllable of a word counting back from the end."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antepenultima]] | noun | **1.** The 3rd syllable of a word counting back from the end. | *"In academic literature, antepenultima designates the 3rd syllable of a word counting back from the end."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antepenultimate]] | noun | **1.** The 3rd syllable of a word counting back from the end.<br>**2.** Third from last. | *"In academic literature, antepenultimate designates the 3rd syllable of a word counting back from the end."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arpent]] | noun | **1.** A former french unit of area; equal approximately to an acre. | *"In academic literature, arpent designates a former french unit of area; equal approximately to an acre."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aspen]] | noun | **1.** Any of several trees of the genus populus having leaves on flattened stalks so that they flutter in the lightest wind. | *"Yea, in very truth, do I, an ’twere an aspen leaf."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[compensable]] | adjective | **1.** For which money is paid. | *"In academic literature, compensable designates for which money is paid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compensate]] | verb | **1.** Adjust for.<br>**2.** Make amends for; pay compensation for. | *"What was to ensue when we found her and what could compensate us for this loss of time were questions also that I could not possibly dismiss; my mind was quite tortured by long dwelling on such reflections when we stopped."* — Charles Dickens, *Bleak House* |
| [[compensated]] | verb | **1.** Adjust for.<br>**2.** Make amends for; pay compensation for. | *"I have compensated myself for that disappointment by coming here since and being of some small use to her.” “The kindest physician in the college,” whispered Miss Flite to me."* — Charles Dickens, *Bleak House* |
| [[compensation]] | noun | **1.** Something (such as money) given or received as payment or reparation (as for a service or loss or injury).<br>**2.** (psychiatry) a defense mechanism that conceals your undesirable shortcomings by exaggerating desirable behaviors. | *"I stick by that.” One compensation I learned."* — Jack London, *The Jacket (The Star-Rover)* |
| [[dispensability]] | noun | **1.** The quality possessed by something that you can get along without. | *"In academic literature, dispensability designates the quality possessed by something that you can get along without."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dispensable]] | adjective | **1.** Capable of being dispensed with or done without. | *"In academic literature, dispensable designates capable of being dispensed with or done without."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dispensableness]] | noun | **1.** The quality possessed by something that you can get along without. | *"In academic literature, dispensableness designates the quality possessed by something that you can get along without."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dispensary]] | noun | **1.** Clinic where medicine and medical supplies are dispensed. | *"He told of his power in the prison by virtue of his being trusty in the Warden’s office, and because of the fact that he had the run of the dispensary."* — Jack London, *The Jacket (The Star-Rover)* |
| [[dispensation]] | noun | **1.** An exemption from some rule or obligation.<br>**2.** A share that has been dispensed or distributed. | *"And yet a dispensation may be had."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dispense]] | verb | **1.** Administer or bestow, as in small portions.<br>**2.** Grant a dispensation; grant an exemption. | *"In so profound abysm I throw all care Of others’ voices, that my adder’s sense, To critic and to flatterer stopped are: Mark how with my neglect I do dispense."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dispensed]] | verb | **1.** Administer or bestow, as in small portions.<br>**2.** Grant a dispensation; grant an exemption. | *"He could had dispensed with Coavinses."* — Charles Dickens, *Bleak House* |
| [[dispenser]] | noun | **1.** A container so designed that the contents can be used in prescribed amounts.<br>**2.** A person who dispenses. | *"On these accounts, one man appears to be a more eligible dispenser of the mercy of government, than a body of men."* — Alexander Hamilton, *The Federalist Papers* |
| [[epenthesis]] | noun | **1.** The insertion of a vowel or consonant into a word to make its pronunciation easier. | *"In academic literature, epenthesis designates the insertion of a vowel or consonant into a word to make its pronunciation easier."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epenthetic]] | adjective | **1.** Of or pertaining to epenthesis. | *"In academic literature, epenthetic designates of or pertaining to epenthesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expend]] | verb | **1.** Use up, consume fully.<br>**2.** Pay out. | *"If it will please you To show us so much gentry and good will As to expend your time with us awhile, For the supply and profit of our hope, Your visitation shall receive such thanks As fits a king’s remembrance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[expendable]] | adjective | **1.** Suitable to be expended.<br>**2.** (used of funds) remaining after taxes. | *"You're telling me we're expendable?" "You're in covert intelligence work, Brad, and you'll be in the enemy's camp."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[expender]] | noun | **1.** Someone who spends money to purchase goods or services. | *"In academic literature, expender designates someone who spends money to purchase goods or services."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expending]] | noun | **1.** The act of spending money for goods or services.<br>**2.** Use up, consume fully. | *"One night I was sitting in the chimney corner with my slate, expending great efforts on the production of a letter to Joe."* — Charles Dickens, *Great Expectations* |
| [[expense]] | noun | **1.** Amounts paid for goods and services that may be currently tax deductible (as opposed to capital expenditures).<br>**2.** A detriment or sacrifice. | *"Do so; this jest shall cost me some expense. [_Exeunt._] SCENE II."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[expensive]] | adjective | **1.** High in price or charging high prices. | *"It is a slow, expensive, British, constitutional kind of thing."* — Charles Dickens, *Bleak House* |
| [[expensively]] | adverb | **1.** In an expensive manner. | *"She had found some acquaintance, had been so lucky too as to find in them the family of a most worthy old friend; and, as the completion of good fortune, had found these friends by no means so expensively dressed as herself."* — Jane Austen, *Northanger Abbey* |
| [[expensiveness]] | noun | **1.** The quality of being high-priced. | *"Jeffery, that himself and his brother (both of whom were deemed simpletons), had been ordered to take ass’s milk, but that on account of its expensiveness, he hardly knew what they should do."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[impenetrability]] | noun | **1.** The quality of being impenetrable (by people or light or missiles etc.).<br>**2.** Incomprehensibility by virtue of being too dense to understand. | *"I will put her to some test,” thought I: “such absolute impenetrability is past comprehension.” “Good morning, Grace,” I said."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[impenetrable]] | adjective | **1.** Not admitting of penetration or passage into or through.<br>**2.** Permitting little if any light to pass through because of denseness of matter. | *"It is the most impenetrable cur That ever kept with men."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impenetrableness]] | noun | **1.** Incomprehensibility by virtue of being too dense to understand. | *"In academic literature, impenetrableness designates incomprehensibility by virtue of being too dense to understand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impenitence]] | noun | **1.** The trait of refusing to repent. | *"In academic literature, impenitence designates the trait of refusing to repent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impenitency]] | noun | **1.** The trait of refusing to repent. | *"In academic literature, impenitency designates the trait of refusing to repent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impenitent]] | adjective | **1.** Not penitent or remorseful.<br>**2.** Impervious to moral persuasion. | *"The Gospel has appeared transcendently beautiful and glorious to all who have been savingly enlightened by the Holy Spirit--while, to the impenitent and skeptical, it seems obscure, irrational, and incomprehensible."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[impenitently]] | adverb | **1.** In an impenitent manner. | *"In academic literature, impenitently designates in an impenitent manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indispensability]] | noun | **1.** The quality possessed by something that you cannot possibly do without. | *"In academic literature, indispensability designates the quality possessed by something that you cannot possibly do without."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indispensable]] | adjective | **1.** Not to be dispensed with; essential.<br>**2.** Absolutely necessary; vitally necessary. | *"In short,” says the trooper, folding his arms more resolutely yet, “I mean—TO—scratch me!” “My dear George,” returns his brother, “is it so indispensable that you should undergo that process?” “Quite!"* — Charles Dickens, *Bleak House* |
| [[indispensableness]] | noun | **1.** The quality possessed by something that you cannot possibly do without. | *"In academic literature, indispensableness designates the quality possessed by something that you cannot possibly do without."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inexpensive]] | adjective | **1.** Relatively low in price or charging low prices. | *"I refer to "resonance." It will be a great help if the reader will try for himself a simple, inexpensive little experiment."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[inexpensively]] | adverb | **1.** In a cheap manner.<br>**2.** With little expenditure of money. | *"In academic literature, inexpensively designates in a cheap manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inexpensiveness]] | noun | **1.** The quality of being affordable. | *"In academic literature, inexpensiveness designates the quality of being affordable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interpenetrate]] | verb | **1.** Penetrate mutually or be interlocked.<br>**2.** Spread or diffuse through. | *"And all this mixes with your most mystic mood; so that fact and fancy, half-way meeting, interpenetrate, and form one seamless whole."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[interpenetration]] | noun | **1.** The action of penetrating between or among.<br>**2.** Mutual penetration; diffusion of each through the other. | *"In academic literature, interpenetration designates the action of penetrating between or among."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overcompensate]] | verb | **1.** Make up for shortcomings or a feeling of inferiority by exaggerating good qualities.<br>**2.** Make excessive corrections for fear of making an error. | *"In academic literature, overcompensate designates make up for shortcomings or a feeling of inferiority by exaggerating good qualities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overcompensation]] | noun | **1.** (psychiatry) an attempt to overcome a real or imagined defect or unwanted trait by overly exaggerating its opposite.<br>**2.** Excessive compensation. | *"In academic literature, overcompensation designates (psychiatry) an attempt to overcome a real or imagined defect or unwanted trait by overly exaggerating its opposite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pen]] | noun | **1.** A writing implement with a point from which ink flows.<br>**2.** An enclosure for confining livestock. | *"These offices, so oft as thou wilt look, Shall profit thee, and much enrich thy book. 78 So oft have I invoked thee for my muse, And found such fair assistance in my verse, As every alien pen hath got my use, And under thee their poesy disperse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[penal]] | adjective | **1.** Of or relating to punishment.<br>**2.** Serving as or designed to impose punishment. | *"Sully-Prudhomme, hear a penal sentence in the fiat, “You shall be born,” particularly if addressed to potential issue of hers."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[penalisation]] | noun | **1.** The act of punishing. | *"In academic literature, penalisation designates the act of punishing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penalise]] | verb | **1.** Impose a penalty on; inflict punishment on. | *"In academic literature, penalise designates impose a penalty on; inflict punishment on."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penalization]] | noun | **1.** The act of punishing. | *"In academic literature, penalization designates the act of punishing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penalize]] | verb | **1.** Impose a penalty on; inflict punishment on. | *"In academic literature, penalize designates impose a penalty on; inflict punishment on."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penally]] | adverb | **1.** In a punishing manner. | *"In academic literature, penally designates in a punishing manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penalty]] | noun | **1.** The act of punishing.<br>**2.** A payment required for not fulfilling a contract. | *"Here feel we not the penalty of Adam, The seasons’ difference, as the icy fang And churlish chiding of the winter’s wind, Which when it bites and blows upon my body Even till I shrink with cold, I smile and say: “This is no flattery."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[penance]] | noun | **1.** Remorse for your past conduct.<br>**2.** A catholic sacrament; repentance and confession and atonement and absolution. | *"You, madam, for you are more nobly born, Despoiled of your honour in your life, Shall, after three days’ open penance done, Live in your country here in banishment, With Sir John Stanley in the Isle of Man."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[penchant]] | noun | **1.** A strong liking. | *"I won’t listen to you—you are so profane!” she said, in a restless state between distress at hearing him and a _penchant_ to hear more."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[pencil]] | noun | **1.** A thin cylindrical pointed writing implement; a rod of marking substance encased in wood.<br>**2.** Graphite (or a similar substance) used in such a way as to be a medium of communication. | *"And he told us, with great humour, that when he was wanted to bleed the prince or physic any of his people, he was generally found lying on his back in bed, reading the newspapers or making fancy-sketches in pencil, and couldn’t come."* — Charles Dickens, *Bleak House* |
| [[penciled]] | verb | **1.** Write, draw, or trace with a pencil.<br>**2.** Drawn or written with a pencil. | *"She shall see deeds of honour in their kind, Which sometime show well, penciled."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pencilled]] | verb | **1.** Write, draw, or trace with a pencil.<br>**2.** Drawn or written with a pencil. | *"The painting is almost the natural man, For since dishonour traffics with man’s nature, He is but outside; these pencilled figures are Even such as they give out."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[peneidae]] | noun | **1.** Tropical prawns. | *"In academic literature, peneidae designates tropical prawns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penelope]] | noun | **1.** (greek mythology) the wife of odysseus and a symbol of devotion and fidelity; for 10 years while odysseus fought the trojan war she resisted numerous suitors until odysseus returned and killed them.<br>**2.** A genus of guans (turkey-like arboreal birds valued as game and food birds). | *"You would be another Penelope."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[peneplain]] | noun | **1.** A more or less level land surface representing an advanced stage of erosion undisturbed by crustal movements. | *"In academic literature, peneplain designates a more or less level land surface representing an advanced stage of erosion undisturbed by crustal movements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peneplane]] | noun | **1.** A more or less level land surface representing an advanced stage of erosion undisturbed by crustal movements. | *"In academic literature, peneplane designates a more or less level land surface representing an advanced stage of erosion undisturbed by crustal movements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penetrability]] | noun | **1.** The quality of being penetrable (by people or light or missiles etc.). | *"In academic literature, penetrability designates the quality of being penetrable (by people or light or missiles etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penetrable]] | adjective | **1.** Admitting of penetration or passage into or through.<br>**2.** Capable of being penetrated. | *"Peace, sit you down, And let me wring your heart, for so I shall, If it be made of penetrable stuff; If damned custom have not braz’d it so, That it is proof and bulwark against sense."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[penetralia]] | noun | **1.** The innermost parts. | *"In these penetralia were chairs and a table, which, on candles being lighted, made quite a cozy and luxurious show, with an urn, plated tea and coffee pots, china teacups, and plum cakes."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[penetrate]] | verb | **1.** Pass into or through, often by overcoming resistance.<br>**2.** Come to understand. | *"I am advised to give her music a mornings; they say it will penetrate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[penetrating]] | verb | **1.** Pass into or through, often by overcoming resistance.<br>**2.** Come to understand. | *"The gentleman now threw a penetrating glance at the delicate looking little girl, who hardly dared to raise her large, dark eyes to his."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[penetratingly]] | adverb | **1.** With ability to see into deeply. | *"Skene,” said Lydia then, penetratingly; “when you came to pay me this visit, what object did you propose to yourself?"* — Bernard Shaw, *Cashel Byron's Profession* |
| [[penetration]] | noun | **1.** An attack that penetrates into enemy territory.<br>**2.** Clear or deep perception of a situation. | *"Not that it required much penetration to say that, because I knew that his being there at all was an act of kindness."* — Charles Dickens, *Bleak House* |
| [[penetrative]] | adjective | **1.** Having or demonstrating ability to recognize or draw fine distinctions.<br>**2.** Tending to penetrate; having the power of entering or piercing. | *"Very soon, however, his look became keen and penetrative."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[penetratively]] | adverb | **1.** With ability to see into deeply. | *"In academic literature, penetratively designates with ability to see into deeply."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penetrator]] | noun | **1.** An intruder who passes into or through (often by overcoming resistance). | *"In academic literature, penetrator designates an intruder who passes into or through (often by overcoming resistance)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peneus]] | noun | **1.** Type genus of the family peneidae. | *"In academic literature, peneus designates type genus of the family peneidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penial]] | adjective | **1.** Of or relating to the penis. | *"In academic literature, penial designates of or relating to the penis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penicillamine]] | noun | **1.** A drug (trade name cuprimine) used to treat heavy metal poisoning and wilson's disease and severe arthritis. | *"In academic literature, penicillamine designates a drug (trade name cuprimine) used to treat heavy metal poisoning and wilson's disease and severe arthritis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penicillin]] | noun | **1.** Any of various antibiotics obtained from penicillium molds (or produced synthetically) and used in the treatment of various infections and diseases. | *"In academic literature, penicillin designates any of various antibiotics obtained from penicillium molds (or produced synthetically) and used in the treatment of various infections and diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penicillin-resistant]] | adjective | **1.** Unaffected by penicillin. | *"In academic literature, penicillin-resistant designates unaffected by penicillin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penicillinase]] | noun | **1.** Enzyme produced by certain bacteria that inactivates penicillin and results in resistance to that antibiotic. | *"In academic literature, penicillinase designates enzyme produced by certain bacteria that inactivates penicillin and results in resistance to that antibiotic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penicillium]] | noun | **1.** Genus of fungi commonly growing as green or blue molds on decaying food; used in making cheese and as a source of penicillin. | *"In academic literature, penicillium designates genus of fungi commonly growing as green or blue molds on decaying food; used in making cheese and as a source of penicillin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penile]] | adjective | **1.** Of or relating to the penis. | *"In academic literature, penile designates of or relating to the penis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peninsula]] | noun | **1.** A large mass of land projecting into a body of water. | *"Simons, "An Exploration of the Goajira Peninsula," _Proceedings of the Royal Geographical Society_, N.S., vii. (1885) p. 791."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[peninsular]] | adjective | **1.** Of or forming or resembling a peninsula. | *"Then the war fever laid hold of him, and he enlisted in the regular army, serving in the Rifle Brigade all through the Peninsular War, from Vimiera to Toulouse, and earning a medal with twelve clasps."* — John Cairns, *Principal Cairns* |
| [[penis]] | noun | **1.** The male organ of copulation (`member' is a euphemism). | *"Thought he had a deposit of lead in his penis."* — James Joyce, *Ulysses* |
| [[penitence]] | noun | **1.** Remorse for your past conduct. | *"More will I do; Though all that I can do is nothing worth, Since that my penitence comes after all, Imploring pardon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[penitent]] | noun | **1.** (roman catholic church) a person who repents for wrongdoing (a roman catholic may be admitted to penance under the direction of a confessor).<br>**2.** Feeling or expressing remorse for misdeeds. | *"As nearly as I may I’ll play the penitent to you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[penitential]] | adjective | **1.** Showing or constituting penance. | *"The debilitated cousin, more debilitated by the dreariness of the place, gets into a fearful state of depression, groaning under penitential sofa-pillows in his gunless hours and protesting that such fernal old jail’s—nough t’sew fler up—frever."* — Charles Dickens, *Bleak House* |
| [[penitentially]] | adverb | **1.** Showing remorse. | *"In academic literature, penitentially designates showing remorse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penitentiary]] | noun | **1.** A correctional institution for those convicted of major crimes.<br>**2.** Used for punishment or reform of criminals or wrongdoers. | *"I do not hesitate to say that if you had your deserts you would be in the Penitentiary."* — Jr. Horatio Alger, *Paul Prescott's Charge* |
| [[penitently]] | adverb | **1.** Showing remorse. | *"Hath he borne himself penitently in prison?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[penlight]] | noun | **1.** A small flashlight resembling a fountain pen. | *"In academic literature, penlight designates a small flashlight resembling a fountain pen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penman]] | noun | **1.** Informal terms for journalists. | *"The Captain evidently was not a great penman, and Rosamond reflected that the sisters might have been abroad."* — George Eliot, *Middlemarch* |
| [[penmanship]] | noun | **1.** Beautiful handwriting. | *"He wanted one with slick paper, but Papa said regular ones were plenty good for penmanship practice."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[penn]] | noun | **1.** Englishman and quaker who founded the colony of pennsylvania (1644-1718).<br>**2.** A university in philadelphia, pennsylvania. | *"I did think so too, and would account I had a great penn’orth on’t, to give half my state, that both she and I at this present stood unfeignedly on the same terms."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[penn'orth]] | noun | **1.** The amount that can be bought for a penny. | *"In academic literature, penn'orth designates the amount that can be bought for a penny."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pennant]] | noun | **1.** The award given to the champion.<br>**2.** A flag longer than it is wide (and often tapering). | *"Boemus, _Mores, leges et ritus omnium gentium_ (Lyons, 1541), p. 222; John Brand, _Popular Antiquities of Great Britain_ (London, 1882-1883), i. 22 _sq.; The Scapegoat_, pp. 313 _sqq._ [377] Shaw, in Pennant's "Tour in Scotland," printed in J."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[pennate]] | adjective | **1.** Having feathered wings. | *"In academic literature, pennate designates having feathered wings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pennatula]] | noun | **1.** Type genus of the family pennatulidae: sea pens. | *"In academic literature, pennatula designates type genus of the family pennatulidae: sea pens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pennatulidae]] | noun | **1.** Sea pens. | *"Classical and authoritative lexicons catalog pennatulidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penne]] | noun | **1.** Pasta in short tubes with diagonally cut ends. | *"Read thou this challenge; mark but the penning of it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[penni]] | noun | **1.** 100 pennia formerly equaled 1 markka in finland. | *"The one-pennied Boy has his penny to spare."* — William Wordsworth, *Poems in Two Volumes, Volume 2* |
| [[penniless]] | adjective | **1.** Not having enough money to pay for necessities. | *"I had always thought that some accident might happen which would throw me suddenly, without any relation or any property, on the world and had always tried to keep some little money by me that I might not be quite penniless."* — Charles Dickens, *Bleak House* |
| [[pennilessness]] | noun | **1.** A state of lacking money. | *"In academic literature, pennilessness designates a state of lacking money."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pennines]] | noun | **1.** A system of hills in britain that extend from the scottish border in the north to the trent river in the south; forms the watershed for english rivers. | *"In academic literature, pennines designates a system of hills in britain that extend from the scottish border in the north to the trent river in the south; forms the watershed for english rivers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penning]] | noun | **1.** The act of creating written works.<br>**2.** Produce a literary work. | *"Read thou this challenge; mark but the penning of it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pennisetum]] | noun | **1.** A genus of old world grasses. | *"In academic literature, pennisetum designates a genus of old world grasses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pennon]] | noun | **1.** A long flag; often tapering.<br>**2.** Wing of a bird. | *"The procession was led off by two venerable-looking savages, each provided with a spear, from the end of which streamed a pennon of milk-white tappa."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[pennoncel]] | noun | **1.** A small pennant borne on a lance. | *"In academic literature, pennoncel designates a small pennant borne on a lance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pennoncelle]] | noun | **1.** A small pennant borne on a lance. | *"In academic literature, pennoncelle designates a small pennant borne on a lance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pennsylvania]] | noun | **1.** A mid-atlantic state; one of the original 13 colonies.<br>**2.** One of the british colonies that formed the united states. | *"In 1874, while on my way to see my mother in Pennsylvania--who had just been paralyzed, and died the next week--I was suddenly paralyzed in my left arm, by which, I have since been helpless and useless."* — Classic Author, *The wonders of prayer* |
| [[pennsylvanian]] | noun | **1.** From 310 million to 280 million years ago; warm climate; swampy land.<br>**2.** A native or resident of pennsylvania. | *"Miss Mary Vance is a Pennsylvanian."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[penny]] | noun | **1.** A fractional monetary unit of ireland and the united kingdom; equal to one hundredth of a pound.<br>**2.** A coin worth one-hundredth of the value of the basic unit. | *"And when a man thanks me heartily, methinks I have given him a penny and he renders me the beggarly thanks."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[penny-pinch]] | verb | **1.** Spend money frugally; spend as little as possible. | *"In academic literature, penny-pinch designates spend money frugally; spend as little as possible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penny-pinching]] | noun | **1.** Extreme care in spending money; reluctance to spend money unnecessarily.<br>**2.** Spend money frugally; spend as little as possible. | *"In academic literature, penny-pinching designates extreme care in spending money; reluctance to spend money unnecessarily."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penny-wise]] | adjective | **1.** Thrifty in small matters only. | *"In academic literature, penny-wise designates thrifty in small matters only."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pennycress]] | noun | **1.** Any of several plants of the genus thlaspi. | *"In academic literature, pennycress designates any of several plants of the genus thlaspi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pennyroyal]] | noun | **1.** Eurasian perennial mint have small lilac-blue flowers and ovate leaves; yields an aromatic oil.<br>**2.** Erect hairy branching american herb having purple-blue flowers; yields an essential oil used as an insect repellent and sometimes in folk medicine. | *"Not one came, moreover, without her little pipkin of pennyroyal, sage, balm, or other herb tea, delighted at an opportunity of signalizing her kindness and her doctorship."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[pennyweight]] | noun | **1.** A unit of apothecary weight equal to 24 grains. | *"Pennyweight of powder in a skull."* — James Joyce, *Ulysses* |
| [[pennywhistle]] | noun | **1.** An inexpensive fipple flute. | *"In academic literature, pennywhistle designates an inexpensive fipple flute."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pennyworth]] | noun | **1.** The amount that can be bought for a penny. | *"Nay, but hark you, Francis, for the sugar thou gavest me, ’twas a pennyworth, was’t not?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[penobscot]] | noun | **1.** A member of the algonquian people belonging to the abnaki confederacy and living in the penobscot valley in northern maine.<br>**2.** A river in central maine flowing into penobscot bay. | *"Per vol. 16mo 1 50 Little Bobtail; or, The Wreck of the Penobscot."* — Oliver Optic, *Plane and Plank; or, The Mishaps of a Mechanic* |
| [[penoche]] | noun | **1.** Fudge made with brown sugar and butter and milk and nuts. | *"In academic literature, penoche designates fudge made with brown sugar and butter and milk and nuts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penologist]] | noun | **1.** A person who studies the theory and practice of prison management. | *"In academic literature, penologist designates a person who studies the theory and practice of prison management."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penology]] | noun | **1.** The branch of criminology concerned with prison management and prisoner rehabilitation. | *"In academic literature, penology designates the branch of criminology concerned with prison management and prisoner rehabilitation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penoncel]] | noun | **1.** A small pennant borne on a lance. | *"In academic literature, penoncel designates a small pennant borne on a lance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pensacola]] | noun | **1.** A town in extreme northwest florida. | *"In academic literature, pensacola designates a town in extreme northwest florida."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pension]] | noun | **1.** A regular payment to a person that is intended to allow them to subsist without working.<br>**2.** Grant a pension to. | *"Why, the hot-blooded France, that dowerless took Our youngest born, I could as well be brought To knee his throne, and, squire-like, pension beg To keep base life afoot."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pensionable]] | adjective | **1.** Entitled to receive a pension. | *"In academic literature, pensionable designates entitled to receive a pension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pensionary]] | noun | **1.** The beneficiary of a pension fund.<br>**2.** A person who works only for money. | *"In academic literature, pensionary designates the beneficiary of a pension fund."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pensioner]] | noun | **1.** The beneficiary of a pension fund. | *"Casaubon: it would be at best a pensioner’s eulogy.” “Pray excuse me,” said Dorothea, coloring deeply."* — George Eliot, *Middlemarch* |
| [[pensive]] | adjective | **1.** Deeply or seriously thoughtful.<br>**2.** Showing pensive sadness. | *"Now, brother of Clarence, how like you our choice, That you stand pensive as half malcontent?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pensively]] | adverb | **1.** In a pensive manner. | *"Thanks, my good Lord Chamberlain. [_Exit Lord Chamberlain, and the King draws the curtain and sits reading pensively._] SUFFOLK."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pensiveness]] | noun | **1.** Persistent morbid meditation on a problem.<br>**2.** Deep serious thoughtfulness. | *"So Lucrece set a-work, sad tales doth tell To pencilled pensiveness and coloured sorrow; She lends them words, and she their looks doth borrow."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[penstemon]] | noun | **1.** Large genus of subshrubs or herbs having showy blue or purple or red or yellow or white flowers; mostly western north america. | *"In academic literature, penstemon designates large genus of subshrubs or herbs having showy blue or purple or red or yellow or white flowers; mostly western north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penstock]] | noun | **1.** Regulator consisting of a valve or gate that controls the rate of water flow through a sluice.<br>**2.** Conduit that carries a rapid flow of water controlled by a sluicegate. | *"In academic literature, penstock designates regulator consisting of a valve or gate that controls the rate of water flow through a sluice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pent]] | verb | **1.** Produce a literary work.<br>**2.** Closely confined. | *"Ah, Gloucester, hide thee from their hateful looks, And, in thy closet pent up, rue my shame, And ban thine enemies, both mine and thine!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pent-up]] | adjective | **1.** Characterized by or showing the suppression of impulses or emotions. | *"In academic literature, pent-up designates characterized by or showing the suppression of impulses or emotions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentacle]] | noun | **1.** A star with 5 points; formed by 5 straight lines between the vertices of a pentagon and enclosing another pentagon. | *"In academic literature, pentacle designates a star with 5 points; formed by 5 straight lines between the vertices of a pentagon and enclosing another pentagon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentad]] | noun | **1.** The cardinal number that is the sum of four and one. | *"In academic literature, pentad designates the cardinal number that is the sum of four and one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentaerythritol]] | noun | **1.** A coronary vasodilator (trade name peritrate) used to treat angina pectoris. | *"In academic literature, pentaerythritol designates a coronary vasodilator (trade name peritrate) used to treat angina pectoris."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentagon]] | noun | **1.** A government building with five sides that serves as the headquarters of the united states department of defense.<br>**2.** The united states military establishment. | *"Atch (Copy of letter from) Meyer Moldeven April 26, 1993 To: Secretary of Defense The Pentagon Washington, DC 20301 Honorable Secretary: [The opening paragraph in the original letter cited a number of suicides in a military organization."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[pentagonal]] | adjective | **1.** Of or relating to or shaped like a pentagon. | *"The two pentagonal towers on the right and left were appropriated to the inferior offices of the castle."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[pentagram]] | noun | **1.** A star with 5 points; formed by 5 straight lines between the vertices of a pentagon and enclosing another pentagon. | *"In academic literature, pentagram designates a star with 5 points; formed by 5 straight lines between the vertices of a pentagon and enclosing another pentagon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentahedron]] | noun | **1.** Any polyhedron having five plane faces. | *"In academic literature, pentahedron designates any polyhedron having five plane faces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentail]] | noun | **1.** Brown tree shrew having a naked tail bilaterally fringed with long stiff hairs on the distal third; of malaysia. | *"In academic literature, pentail designates brown tree shrew having a naked tail bilaterally fringed with long stiff hairs on the distal third; of malaysia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentamerous]] | adjective | **1.** Divided into five parts; specifically, having each floral whorl consist of five (or a multiple of five) members. | *"In academic literature, pentamerous designates divided into five parts; specifically, having each floral whorl consist of five (or a multiple of five) members."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentameter]] | noun | **1.** A verse line having five metrical feet. | *"In academic literature, pentameter designates a verse line having five metrical feet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentamethylenetetrazol]] | noun | **1.** A drug used as a circulatory and respiratory stimulant; larger doses cause convulsions in shock therapy; metrazol is a trademark. | *"In academic literature, pentamethylenetetrazol designates a drug used as a circulatory and respiratory stimulant; larger doses cause convulsions in shock therapy; metrazol is a trademark."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentangle]] | noun | **1.** A star with 5 points; formed by 5 straight lines between the vertices of a pentagon and enclosing another pentagon. | *"In academic literature, pentangle designates a star with 5 points; formed by 5 straight lines between the vertices of a pentagon and enclosing another pentagon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentangular]] | adjective | **1.** Of or relating to or shaped like a pentagon. | *"In academic literature, pentangular designates of or relating to or shaped like a pentagon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentastomid]] | noun | **1.** Wormlike arthropod having two pairs of hooks at the sides of the mouth; parasitic in nasal sinuses of mammals. | *"In academic literature, pentastomid designates wormlike arthropod having two pairs of hooks at the sides of the mouth; parasitic in nasal sinuses of mammals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentastomida]] | noun | **1.** Tongue worms. | *"In academic literature, pentastomida designates tongue worms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentasyllabic]] | adjective | **1.** Having or characterized by or consisting of five syllables. | *"In academic literature, pentasyllabic designates having or characterized by or consisting of five syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentateuch]] | noun | **1.** The first of three divisions of the hebrew scriptures comprising the first five books of the hebrew bible considered as a unit. | *"Colenso, Bishop of Natal, in South Africa; he published works questioning the inspiration and historical accuracy of certain parts of the Bible, among which was ‘The Pentateuch, and the Book of Joshua critically examined’. -- Holy-Cross Day."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[pentathlete]] | noun | **1.** An athlete who competes in a pentathlon. | *"In academic literature, pentathlete designates an athlete who competes in a pentathlon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentathlon]] | noun | **1.** An athletic contest consisting of five different events. | *"In academic literature, pentathlon designates an athletic contest consisting of five different events."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentatone]] | noun | **1.** A gapped scale with five notes; usually the fourth and seventh notes of the diatonic scale are omitted. | *"In academic literature, pentatone designates a gapped scale with five notes; usually the fourth and seventh notes of the diatonic scale are omitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentatonic]] | adjective | **1.** Relating to a pentatonic scale. | *"In academic literature, pentatonic designates relating to a pentatonic scale."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentavalent]] | adjective | **1.** Having a valence of five. | *"In academic literature, pentavalent designates having a valence of five."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentazocine]] | noun | **1.** Analgesic drug (trade name talwin) that is less addictive than morphine. | *"In academic literature, pentazocine designates analgesic drug (trade name talwin) that is less addictive than morphine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentecost]] | noun | **1.** Seventh sunday after easter; commemorates the emanation of the holy spirit to the apostles; a quarter day in scotland.<br>**2.** (judaism) jewish holy day celebrated on the sixth of sivan to celebrate moses receiving the ten commandments. | *"You know since Pentecost the sum is due, And since I have not much importun’d you, Nor now I had not, but that I am bound To Persia, and want guilders for my voyage; Therefore make present satisfaction, Or I’ll attach you by this officer."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pentecostal]] | noun | **1.** Any member of a pentecostal religious body.<br>**2.** Of or relating to or characteristic of any of various pentecostal religious bodies or their members. | *"Pentecostal power 46:30 His students then received the Holy Ghost."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[pentecostalism]] | noun | **1.** The principles and practices of pentecostal religious groups; characterized by religious excitement and talking in tongues. | *"In academic literature, pentecostalism designates the principles and practices of pentecostal religious groups; characterized by religious excitement and talking in tongues."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentecostalist]] | noun | **1.** Any member of a pentecostal religious body. | *"In academic literature, pentecostalist designates any member of a pentecostal religious body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penthouse]] | noun | **1.** An apartment located on the top floors of a building. | *"This is the penthouse under which Lorenzo Desired us to make stand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pentimento]] | noun | **1.** The reappearance in a painting of an underlying image that had been painted over (usually when the later painting becomes transparent with age). | *"In academic literature, pentimento designates the reappearance in a painting of an underlying image that had been painted over (usually when the later painting becomes transparent with age)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentlandite]] | noun | **1.** A mineral (iron and nickel sulphide) that is the chief ore of nickel. | *"In academic literature, pentlandite designates a mineral (iron and nickel sulphide) that is the chief ore of nickel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentobarbital]] | noun | **1.** A barbiturate (trade name nembutal) used as a sedative and hypnotic and antispasmodic. | *"In academic literature, pentobarbital designates a barbiturate (trade name nembutal) used as a sedative and hypnotic and antispasmodic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentode]] | noun | **1.** A thermionic tube having five electrodes. | *"In academic literature, pentode designates a thermionic tube having five electrodes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentose]] | noun | **1.** Any monosaccharide sugar containing five atoms of carbon per molecule. | *"There was my pentose and methyl-pentose determination in grapes and wines to which I had devoted my last summer vacation at the Asti Vineyards."* — Jack London, *The Jacket (The Star-Rover)* |
| [[pentothal]] | noun | **1.** Barbiturate that is a hygroscopic powder (trade name pentothal) that is a strong barbiturate that acts rapidly; induces a relaxed state when injected as a general anesthetic. | *"In academic literature, pentothal designates barbiturate that is a hygroscopic powder (trade name pentothal) that is a strong barbiturate that acts rapidly; induces a relaxed state when injected as a general anesthetic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentoxide]] | noun | **1.** An oxide containing five atoms of oxygen in the molecule. | *"In academic literature, pentoxide designates an oxide containing five atoms of oxygen in the molecule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentoxifylline]] | noun | **1.** A drug (trade name trental) used to treat claudication; believed to increase the flexibility of red blood cells so they can flow through the blood vessels to the legs and feet. | *"In academic literature, pentoxifylline designates a drug (trade name trental) used to treat claudication; believed to increase the flexibility of red blood cells so they can flow through the blood vessels to the legs and feet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentylenetetrazol]] | noun | **1.** A drug used as a circulatory and respiratory stimulant; larger doses cause convulsions in shock therapy; metrazol is a trademark. | *"In academic literature, pentylenetetrazol designates a drug used as a circulatory and respiratory stimulant; larger doses cause convulsions in shock therapy; metrazol is a trademark."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penuche]] | noun | **1.** Fudge made with brown sugar and butter and milk and nuts. | *"In academic literature, penuche designates fudge made with brown sugar and butter and milk and nuts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penuchle]] | noun | **1.** A card game played with a pack of forty-eight cards (two of each suit for high cards); play resembles whist. | *"In academic literature, penuchle designates a card game played with a pack of forty-eight cards (two of each suit for high cards); play resembles whist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penult]] | noun | **1.** The next to last syllable in a word. | *"In academic literature, penult designates the next to last syllable in a word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penultima]] | noun | **1.** The next to last syllable in a word. | *"In academic literature, penultima designates the next to last syllable in a word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penultimate]] | noun | **1.** The next to last syllable in a word.<br>**2.** Next to the last. | *"How serene does she now arise, a queen among the Pleiades, in the penultimate antelucan hour, shod in sandals of bright gold, coifed with a veil of what do you call it gossamer."* — James Joyce, *Ulysses* |
| [[penumbra]] | noun | **1.** A fringe region of partial shadow around an umbra. | *"He fancied that he had felt himself in the penumbra of a very deep sadness when touching that slight and fragile creature."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[penumbral]] | adjective | **1.** Of or pertaining to the region of partial shadow around an umbra. | *"In academic literature, penumbral designates of or pertaining to the region of partial shadow around an umbra."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penurious]] | adjective | **1.** Not having enough money to pay for necessities.<br>**2.** Excessively unwilling to spend. | *"I have but little gold of late, brave Timon, The want whereof doth daily make revolt In my penurious band."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[penuriously]] | adverb | **1.** In a penurious manner. | *"In academic literature, penuriously designates in a penurious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penuriousness]] | noun | **1.** A state of lacking money.<br>**2.** A disposition to be niggardly with money. | *"In academic literature, penuriousness designates a state of lacking money."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penury]] | noun | **1.** A state of extreme poverty or destitution. | *"Lean penury within that pen doth dwell, That to his subject lends not some small glory, But he that writes of you, if he can tell, That you are you, so dignifies his story."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[penutian]] | noun | **1.** A family of amerindian language spoken in the great interior valley of california.<br>**2.** A member of a north american indian people speaking one of the penutian languages. | *"In academic literature, penutian designates a family of amerindian language spoken in the great interior valley of california."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[propenal]] | noun | **1.** A pungent colorless unsaturated liquid aldehyde made from propene. | *"In academic literature, propenal designates a pungent colorless unsaturated liquid aldehyde made from propene."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[propene]] | noun | **1.** A flammable gas obtained by cracking petroleum; used in organic synthesis. | *"In academic literature, propene designates a flammable gas obtained by cracking petroleum; used in organic synthesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[propenoate]] | noun | **1.** A salt or ester of propenoic acid. | *"In academic literature, propenoate designates a salt or ester of propenoic acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[propenonitrile]] | noun | **1.** A colorless liquid unsaturated nitrile made from propene. | *"In academic literature, propenonitrile designates a colorless liquid unsaturated nitrile made from propene."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[propensity]] | noun | **1.** An inclination to do something.<br>**2.** A natural inclination. | *"Smallweed is occasioned by a propensity on the part of that unlucky old lady whenever she finds herself on her feet to amble about and “set” to inanimate objects, accompanying herself with a chattering noise, as in a witch dance."* — Charles Dickens, *Bleak House* |
| [[repent]] | verb | **1.** Turn away from sin or do penitence.<br>**2.** Feel remorse for; feel sorry for; be contrite about. | *"I have been, madam, a wicked creature, as you and all flesh and blood are; and indeed I do marry that I may repent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[repentance]] | noun | **1.** Remorse for your past conduct. | *"The one you may do with sterling money, and the other with current repentance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[repentant]] | adjective | **1.** Feeling or expressing remorse for misdeeds. | *"There is no malice in this burning coal; The breath of heaven hath blown his spirit out And strew’d repentant ashes on his head."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[repentantly]] | adverb | **1.** Showing remorse. | *"Who throws me aside and refuses forgiveness when it is repentantly implored?" "What signifies the pardon of a wretch like me?" said he, in a tone of agony."* — Effie Afton, *Eventide* |
| [[resuspend]] | verb | **1.** Put back into suspension. | *"In academic literature, resuspend designates put back into suspension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resuspension]] | noun | **1.** A renewed suspension of insoluble particles after they have been precipitated. | *"In academic literature, resuspension designates a renewed suspension of insoluble particles after they have been precipitated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suspend]] | verb | **1.** Hang freely.<br>**2.** Cause to be held in suspension in a fluid. | *"Suspend thy purpose, if thou didst intend To make this creature fruitful!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[suspended]] | verb | **1.** Hang freely.<br>**2.** Cause to be held in suspension in a fluid. | *"The town awakes; the great tee-totum is set up for its daily spin and whirl; all that unaccountable reading and writing, which has been suspended for a few hours, recommences."* — Charles Dickens, *Bleak House* |
| [[suspender]] | noun | **1.** Elastic straps that hold trousers up (usually used in the plural). | *"Between him and the grave there was seldom anything more than a single suspender and the hope of a meal which would at the same time support life and make it insupportable."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[suspense]] | noun | **1.** Apprehension about what is going to happen.<br>**2.** An uncertain cognitive state. | *"My Lord of Gloucester, ’tis my special hope That you will clear yourself from all suspense."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[suspenseful]] | adjective | **1.** (of a situation) characterized by or causing suspense. | *"In academic literature, suspenseful designates (of a situation) characterized by or causing suspense."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suspension]] | noun | **1.** A mixture in which fine particles are suspended in a fluid where they are supported by buoyancy.<br>**2.** A time interval during which there is a temporary cessation of something. | *"For a few seconds the wayfarer stood with that tense stillness which signifies itself to be not the end, but merely the suspension, of a previous motion."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[suspensive]] | adjective | **1.** (of a situation) characterized by or causing suspense.<br>**2.** Undecided or characterized by indecisiveness. | *"In academic literature, suspensive designates (of a situation) characterized by or causing suspense."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suspensor]] | noun | **1.** A support for the genitals worn by men engaging in strenuous exercise. | *"In academic literature, suspensor designates a support for the genitals worn by men engaging in strenuous exercise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suspensory]] | noun | **1.** A bandage of elastic fabric applied to uplift a dependant part (as the scrotum or a pendulous breast). | *"In academic literature, suspensory designates a bandage of elastic fabric applied to uplift a dependant part (as the scrotum or a pendulous breast)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncompensated]] | adjective | **1.** Not paying a salary. | *"In academic literature, uncompensated designates not paying a salary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unrepentant]] | adjective | **1.** Not penitent or remorseful.<br>**2.** Stubbornly persistent in wrongdoing. | *"Anne carried it to him and sat sorrowfully by him while he ate it with an unrepentant relish."* — L. M. Montgomery, *Anne of Avonlea* |
| [[unrepentantly]] | adverb | **1.** In an impenitent manner. | *"In academic literature, unrepentantly designates in an impenitent manner."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Law]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PEN_PUNISH
  </div>
</div>
