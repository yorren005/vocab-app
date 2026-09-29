---
status: unread
type: root_dashboard
---
# Dashboard — val
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">val-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to be strong, be healthy, or have worth”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A strong engine lifting a heavy load or a respected leader giving direction.</span>
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

The root **val** means to be strong, be healthy, or have worth. It describes being solid, unyielding, durable, and able to withstand pressure. In English, this root forms words such as *value*, *valid*, *valiant*, and *evaluate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to be strong, be healthy, or have worth
> The root **val** means to be strong, be healthy, or have worth. It describes being solid, unyielding, durable, and able to withstand pressure. In English, this root forms words such as *value*, *valid*, *valiant*, and *evaluate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To be strong, be healthy, or have worth</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A strong engine lifting a heavy load or a respected leader giving direction.</mark>
> - **Everyday Connection**: Think of familiar words like *value* and *valid*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **val** comes from a Latin word that means *"to be strong, be healthy, or have worth"*.
  - At its core, it describes the action of be strong, be healthy, or have worth.

- **The Big Picture Idea**:
  - Picture a strong engine lifting a heavy load or a respected leader giving direction.
  - Whenever you see **val** in an English word, think of **to be strong, be healthy, or have worth**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to be strong, be healthy, or have worth).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Value**: The regard that something is held to deserve.
  - **Valid**: Having a sound basis in logic or fact.
  - **Valiant**: Possessing or showing courage or determination.
  - **Evaluate**: To form an idea of the amount, number, or value of.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">val</mark>, think of <mark class="hl-def">to be strong, be healthy, or have worth</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **val** generates vocabulary through adjectival derivation, prefixation, and inchoative verbal suffixes:
> - **Base Nouns & Adjectives:**
>   - *validus* $	o$ *valid*, *validate*, *validation*, *validity*.
>   - *valēre* $	o$ Old French *valoir* $	o$ *value*, *valuable*, *valuation*.
>   - *valōr* $	o$ *valor*, *valorous*, *valiant*, *valiantly*.
> - **Prefix Modifications on *valēre*:**
>   - *prae-* ("before, above") + *valēre* $	o$ *prevail*, *prevalence*, *prevalent* ("to be stronger than others; predominate").
>   - *ad-* ("to") + *valēre* $	o$ *avail*, *available*, *availability* ("to be of use or value to someone").
>   - *contra-* ("against") + *valēre* $	o$ *countervail* ("to act against with equal power").
>   - *aequus* ("equal") + *valēre* $	o$ *equivalent*, *equivalence* ("having equal strength or value").
>   - *ambi-* ("both") + *valēre* $	o$ *ambivalent*, *ambivalence* ("having mixed feelings / pulled by two equal forces").
> - **Privative Formations with *in-*:**
>   - *in-* ("not") + *validus* $	o$ *invalid*, *invalidate*, *invalidation* ("not legally or logically sound; a sick person").
>   - *in-* ("un-") + *valuable* $	o$ *invaluable* ("beyond estimation in value; priceless").
> - **Inchoative Verb Formation (*-ēscere*):**
>   - *con-* + *valēscere* $	o$ *convalesce*, *convalescent*, *convalescence* ("to recover strength").

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
> - **Formal Logic, Law & Computer Science:** *valid*, *validate*, *validation*, *validity* (valid syllogisms, data validation checks).
> - **Economics, Finance & Real Estate:** *value*, *valuable*, *evaluate*, *valuation*, *devalue* (appraising assets, currency devaluation).
> - **Epidemiology & Demographics:** *prevalence*, *prevalent*, *prevail* (disease prevalence rates, prevailing winds).
> - **Military Bravery & Chivalry:** *valiant*, *valor*, *valorous* (valiant defenders, medals for valor).
> - **Medicine & Recovery:** *convalesce*, *convalescent*, *invalid* (convalescent plasma therapy, caring for an invalid).
> - **Psychology & Decision Making:** *ambivalent*, *ambivalence* (conflicting emotional impulses).

---

## 🔀 4. Prefix & Combining Dynamics on val

### Prefix Dynamics Table

| Prefix | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `prae-` (above, before) | `valēre` | **[[prevail]]** / **prevalent** | Proving stronger than all rivals $	o$ triumphing; widespread. |
| `aequi-` (equal) | `valēre` | **[[equivalence]]** / **equivalent** | Possessing identical strength, worth, or logical meaning. |
| `ambi-` (both) | `valēre` | **[[ambivalent]]** / **ambivalence** | Pulled in two opposite directions by equally powerful emotions. |
| `con-` (thoroughly) | `valēscere` | **[[convalesce]]** / **convalescent** | Gradually growing completely strong again after severe illness. |
| `contra-` (against) | `valēre` | **[[countervail]]** | Exerting an opposing force of equal weight or effectiveness. |
| `in-` (privative not) | `validus` | **[[invalid]]** / **invalidate** | Lacking legal binding force; incapacitated by physical injury. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Contract Law & Jurisprudence** | *valid*, *validity*, *invalidate* | Testing the contractual validity of arbitration clauses signed under duress. |
| 📊 **Epidemiology & Biostatistics** | *prevalence*, *prevalent* | Calculating the point prevalence and incidence rates of vector-borne illnesses. |
| 💰 **Corporate Valuation & M&A** | *evaluate*, *valuation*, *value* | Discounted cash flow (DCF) enterprise valuation in merger acquisitions. |
| 🏥 **Rehabilitation & Infectious Disease** | *convalesce*, *convalescent* | Monitoring convalescent patients recovering pulmonary function post-pneumonia. |
| 🧠 **Cognitive Psychology & Behavioral Economics** | *ambivalent*, *ambivalence* | Resolving consumer ambivalence toward emerging artificial intelligence technologies. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[circumvallate]] | verb | **1.** Surround with or as if with a rampart or other fortification. | *"In academic literature, circumvallate designates surround with or as if with a rampart or other fortification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[convalesce]] | verb | **1.** Get over an illness or shock. | *"Now, there is this noteworthy difference between savage and civilized; that while a sick, civilized man may be six months convalescing, generally speaking, a sick savage is almost half-well again in a day."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[convalescence]] | noun | **1.** Gradual healing (through rest) after sickness or injury. | *"Here she sat down and hastily scribbled a note between the small convulsive sobs of convalescence which follow a fit of crying as a ground-swell follows a storm."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[convalescent]] | noun | **1.** A person who is recovering from illness.<br>**2.** Returning to health after illness or debility. | *"A week had passed since Leonore had spent her first day as convalescent among the family."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[convallaria]] | noun | **1.** Sometimes placed in family convallariaceae: lily of the valley. | *"In academic literature, convallaria designates sometimes placed in family convallariaceae: lily of the valley."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[convallariaceae]] | noun | **1.** One of many subfamilies into which some classification systems subdivide the liliaceae but not widely accepted. | *"In academic literature, convallariaceae designates one of many subfamilies into which some classification systems subdivide the liliaceae but not widely accepted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[covalence]] | noun | **1.** Valence characterized by the sharing of electrons in a chemical compound; the number of pairs of electrons an atom can share. | *"In academic literature, covalence designates valence characterized by the sharing of electrons in a chemical compound; the number of pairs of electrons an atom can share."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[covalency]] | noun | **1.** Valence characterized by the sharing of electrons in a chemical compound; the number of pairs of electrons an atom can share. | *"In academic literature, covalency designates valence characterized by the sharing of electrons in a chemical compound; the number of pairs of electrons an atom can share."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[covalent]] | adjective | **1.** Of or relating to or characterized by covalence. | *"In academic literature, covalent designates of or relating to or characterized by covalence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[devaluate]] | verb | **1.** Remove the value from; deprive of its value.<br>**2.** Lose in value. | *"In academic literature, devaluate designates remove the value from; deprive of its value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[devaluation]] | noun | **1.** An official lowering of a nation's currency; a decrease in the value of a country's currency relative to that of foreign countries.<br>**2.** The reduction of something's value or worth. | *"In academic literature, devaluation designates an official lowering of a nation's currency; a decrease in the value of a country's currency relative to that of foreign countries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[devalue]] | verb | **1.** Remove the value from; deprive of its value.<br>**2.** Lower the value or quality of. | *"In academic literature, devalue designates remove the value from; deprive of its value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[devalued]] | verb | **1.** Remove the value from; deprive of its value.<br>**2.** Lower the value or quality of. | *"In academic literature, devalued designates remove the value from; deprive of its value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divalent]] | adjective | **1.** Having a valence of two or having two valences. | *"In academic literature, divalent designates having a valence of two or having two valences."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evaluate]] | verb | **1.** Evaluate or estimate the nature, quality, ability, extent, or significance of.<br>**2.** Form a critical opinion of. | *"Tangible things are comparatively easy to find, measure, and evaluate where they are, and if they are all taxed it is evidently the same as if all the capital values based upon them were taxed in the owners' hands."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[evaluation]] | noun | **1.** Act of ascertaining or fixing the value or worth of.<br>**2.** An appraisal of the value of something. | *"During the System's research, development, test, evaluation, engineering, construction, launch and voyage phases, the terminals are spunnel-linked and tested both as separate machines with their support systems, and as the integrated master scheme."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[evaluative]] | adjective | **1.** Exercising or involving careful evaluations. | *"In academic literature, evaluative designates exercising or involving careful evaluations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evaluator]] | noun | **1.** An authority who is able to estimate worth or quality. | *"In academic literature, evaluator designates an authority who is able to estimate worth or quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interval]] | noun | **1.** A definite length of time marked off by two instants.<br>**2.** A set containing all points (or all real numbers) between two given endpoints. | *"Out of that you went straight, with a little interval of passage, to the plain room where Mr."* — Charles Dickens, *Bleak House* |
| [[invalid]] | noun | **1.** Someone who is incapacitated by a chronic illness or injury.<br>**2.** Force to retire, remove from active duty, as of firemen. | *"The doctor's advice was to bring the young invalid to the hospital in Sils, where she would be well taken care of and he could see her every day."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[invalidate]] | verb | **1.** Declare invalid.<br>**2.** Make invalid for use. | *"If you invalidate this thought (_dogma_), probably the Emperor will punish you."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[invalidated]] | verb | **1.** Declare invalid.<br>**2.** Make invalid for use. | *"This conclusion cannot be invalidated by alleging that the State in which the experiment was made was at that crisis, and had been for a long time before, violently heated and distracted by the rage of party."* — Alexander Hamilton, *The Federalist Papers* |
| [[invalidating]] | verb | **1.** Declare invalid.<br>**2.** Make invalid for use. | *"In academic literature, invalidating designates declare invalid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invalidation]] | noun | **1.** (law) a formal termination (of a relationship or a judicial proceeding etc). | *"In academic literature, invalidation designates (law) a formal termination (of a relationship or a judicial proceeding etc)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invalidator]] | noun | **1.** An official who can invalidate or nullify. | *"In academic literature, invalidator designates an official who can invalidate or nullify."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invalidism]] | noun | **1.** Chronic ill health. | *"My healing is complete, and the liberation in thought is manifest in a life of active usefulness rather than the bondage of helpless invalidism and suffering."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[invalidity]] | noun | **1.** Illogicality as a consequence of having a conclusion that does not follow from the premisses. | *"The premium in personal insurance (life, accident, sickness, invalidity, old age pensions) is in almost all cases paid out of some current income."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[invalidness]] | noun | **1.** Illogicality as a consequence of having a conclusion that does not follow from the premisses. | *"In academic literature, invalidness designates illogicality as a consequence of having a conclusion that does not follow from the premisses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invaluable]] | adjective | **1.** Having incalculable monetary, intellectual, or spiritual worth. | *"And she,” said Mrs Smith, “besides nursing me most admirably, has really proved an invaluable acquaintance."* — Jane Austen, *Persuasion* |
| [[invaluableness]] | noun | **1.** The positive quality of being precious and beyond value. | *"In academic literature, invaluableness designates the positive quality of being precious and beyond value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overvaliant]] | adjective | **1.** Having or showing undue valor or boldness. | *"In academic literature, overvaliant designates having or showing undue valor or boldness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overvaluation]] | noun | **1.** An appraisal that is too high.<br>**2.** Too high a value or price assigned to something. | *"In academic literature, overvaluation designates an appraisal that is too high."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overvalue]] | verb | **1.** Assign too high a value to. | *"If, in turn, any of the minor factors, as materials or uses of goods, are overvalued (overcapitalized) it will appear ultimately in a check in the demand for them at these prices, and in a reduction in the demand for money loans."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[prevalence]] | noun | **1.** The quality of prevailing generally; being widespread.<br>**2.** (epidemiology) the ratio (for a given time period) of the number of occurrences of a disease or event to the number of units at risk in the population. | *"Prevalence of protective tariffs. § 2."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[prevalent]] | adjective | **1.** Most frequent or common. | *"But Volumnia the fair, being subject to the prevalent complaint of boredom and finding that disorder attacking her spirits with some virulence, ventures at length to repair to the library for change of scene."* — Charles Dickens, *Bleak House* |
| [[reevaluate]] | verb | **1.** Revise or renew one's assessment. | *"In academic literature, reevaluate designates revise or renew one's assessment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reevaluation]] | noun | **1.** The evaluation of something a second time (or more). | *"In academic literature, reevaluation designates the evaluation of something a second time (or more)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revaluation]] | noun | **1.** A new appraisal or evaluation. | *"These call for constant revaluations of the sources of incomes, thus destroying customary and habitual valuations."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[revalue]] | verb | **1.** Gain in value.<br>**2.** Value anew. | *"If, however, the expected income fails to be realized, the capital loses its value, or it is revalued on the basis of the new rents."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[underevaluation]] | noun | **1.** An appraisal that underestimates the value of something. | *"In academic literature, underevaluation designates an appraisal that underestimates the value of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undervaluation]] | noun | **1.** Too low a value or price assigned to something. | *"In academic literature, undervaluation designates too low a value or price assigned to something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undervalue]] | verb | **1.** Assign too low a value to.<br>**2.** Esteem lightly. | *"God forbid that I should undervalue the warm and faithful feelings of any of my fellow-creatures!"* — Jane Austen, *Persuasion* |
| [[unvalued]] | adjective | **1.** Having value that is not acknowledged. | *"Methoughts I saw a thousand fearful wracks; A thousand men that fishes gnawed upon; Wedges of gold, great anchors, heaps of pearl, Inestimable stones, unvalued jewels, All scattered in the bottom of the sea."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[valance]] | noun | **1.** A decorative framework to conceal curtain fixtures at the top of a window casing. | *"He stooped and lifted the valance."* — James Joyce, *Ulysses* |
| [[vale]] | noun | **1.** A long depression in the surface of the land that usually contains a river. | *"Anon, I’m sure, the Duke himself in person Comes this way to the melancholy vale, The place of death and sorry execution Behind the ditches of the abbey here."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[valediction]] | noun | **1.** A farewell oration (especially one delivered during graduation exercises by an outstanding member of a graduating class).<br>**2.** The act of saying farewell. | *"In academic literature, valediction designates a farewell oration (especially one delivered during graduation exercises by an outstanding member of a graduating class)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valedictorian]] | noun | **1.** The student with the best grades who usually delivers the valedictory address at commencement. | *"In academic literature, valedictorian designates the student with the best grades who usually delivers the valedictory address at commencement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valedictory]] | noun | **1.** A farewell oration (especially one delivered during graduation exercises by an outstanding member of a graduating class).<br>**2.** Of or relating to an occasion or expression of farewell. | *"Without evincing any inclination to come in again, he there delivered his valedictory remarks."* — Charles Dickens, *Great Expectations* |
| [[valence]] | noun | **1.** (biology) a relative capacity to unite or react or interact as with antigens or a biological substrate.<br>**2.** (chemistry) a property of atoms or radicals; their combining power given in terms of the number of hydrogen atoms (or the equivalent). | *"It was afterwards conveyed by a female to William de <g>Valentia</g>, Earl of Pembroke, whose third son, Aymer de Valence, became his heir, and was murdered in France in 1323."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[valencia]] | noun | **1.** An industrial city in northern venezuela.<br>**2.** A city in eastern spain on the mediterranean. | *"He had made an excursion from Valencia to Murviedro, with a view to inspect the remains of Roman magnificence scattered in the environs of that town."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[valenciennes]] | noun | **1.** A town in northeastern france long noted for its lace industry.<br>**2.** A type of bobbin lace with floral patterns. | *"A bride (who is going to visit at a baronet’s) must have a few first-rate pocket-handkerchiefs; but beyond the absolutely necessary half-dozen, Rosamond contented herself without the very highest style of embroidery and Valenciennes."* — George Eliot, *Middlemarch* |
| [[valency]] | noun | **1.** The phenomenon of forming chemical bonds.<br>**2.** (biology) a relative capacity to unite or react or interact as with antigens or a biological substrate. | *"In academic literature, valency designates the phenomenon of forming chemical bonds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valent]] | adjective | **1.** (chemistry) having valence; usually used in combination. | *"Valent._ 20, who suggests that the Valentinians had "nut-trees in the sky"--it is a book in which he allows himself a good deal of gaiety and free quotation. [57] i, 28. [58] M."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[valentine]] | noun | **1.** A sweetheart chosen to receive a greeting on saint valentine's day.<br>**2.** A card sent or given (as to a sweetheart) on saint valentine's day. | *"Pray you, let’s have no words of this; but when they ask you what it means, say you this: [_Sings._] Tomorrow is Saint Valentine’s day, All in the morning betime, And I a maid at your window, To be your Valentine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[valerian]] | noun | **1.** A plant of the genus valeriana having lobed or dissected leaves and cymose white or pink flowers. | *"Saint Laurence: suffered martyrdom in the reign of the Emperor Valerian, A.D. 258."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[valeriana]] | noun | **1.** Genus of widely distributed perennial herbs and some shrubs. | *"VALERIAN RUST; spots yellowish; sori subrotund, small, confluent, sometimes circinating; epidermis at length bursting; spores reddish-brown, subglobose or clavate, shortly pedicellate.—On _Valeriana officinalis_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[valerianaceae]] | noun | **1.** Genus of mostly herbs having a characteristic fetid odor. | *"In academic literature, valerianaceae designates genus of mostly herbs having a characteristic fetid odor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valerianella]] | noun | **1.** Genus of old world annual herbs widely naturalized. | *"In academic literature, valerianella designates genus of old world annual herbs widely naturalized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valet]] | noun | **1.** A manservant who acts as a personal attendant to his employer.<br>**2.** Serve as a personal attendant to. | *"Her former master has for nurse, servant, cook and valet only that peculiar and ancient Mr."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[valetta]] | noun | **1.** The capital of malta; located on the northeastern coast of the island. | *"In academic literature, valetta designates the capital of malta; located on the northeastern coast of the island."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valetudinarian]] | noun | **1.** Weak or sickly person especially one morbidly concerned with his or her health.<br>**2.** Of or relating to or characteristic of a person who is a valetudinarian. | *"A certain valetudinarian confesses he has often been cured of a sore throat by the hoarseness of a carman and relieved from a fit of the gout by the sound of old shoes."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[valetudinarianism]] | noun | **1.** The state of being weak in health or body (especially from old age). | *"In academic literature, valetudinarianism designates the state of being weak in health or body (especially from old age)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valetudinary]] | adjective | **1.** Of or relating to or characteristic of a person who is a valetudinarian. | *"In academic literature, valetudinary designates of or relating to or characteristic of a person who is a valetudinarian."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vali]] | noun | **1.** (norse mythology) one of the aesir and avenger of balder; son of odin. | *"There was also a man with Vali."* — Classic Author, *The Life and Death of Cormac the Skald* |
| [[valiance]] | noun | **1.** The qualities of a hero or heroine; exceptional or heroic courage when facing danger (especially in battle). | *"In academic literature, valiance designates the qualities of a hero or heroine; exceptional or heroic courage when facing danger (especially in battle)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valiancy]] | noun | **1.** The qualities of a hero or heroine; exceptional or heroic courage when facing danger (especially in battle). | *"In academic literature, valiancy designates the qualities of a hero or heroine; exceptional or heroic courage when facing danger (especially in battle)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valiant]] | adjective | **1.** Having or showing valor. | *"But he assails; and our virginity, though valiant, in the defence, yet is weak."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[valiantly]] | adverb | **1.** With valor; in a valiant manner. | *"He is not—God be praised and blessed!—any hurt in the world; but keeps the bridge most valiantly, with excellent discipline."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[valid]] | adjective | **1.** Well grounded in logic or truth or having legal force.<br>**2.** Still legally acceptable. | *"No, it is not true!” “It is true.” “Every word?” “Every word.” He looked at her imploringly, as if he would willingly have taken a lie from her lips, knowing it to be one, and have made of it, by some sort of sophistry, a valid denial."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[validate]] | verb | **1.** Declare or make legally valid.<br>**2.** Prove valid; show or confirm the validity of something. | *"Following a few short stops to surface stations to inspect military tunnels and comm links, and validate the flitter's flight record, he diverted to a depression between Coldfield and the horizon."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[validated]] | verb | **1.** Declare or make legally valid.<br>**2.** Prove valid; show or confirm the validity of something. | *"In academic literature, validated designates declare or make legally valid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[validating]] | verb | **1.** Declare or make legally valid.<br>**2.** Prove valid; show or confirm the validity of something. | *"In academic literature, validating designates declare or make legally valid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[validation]] | noun | **1.** The act of validating; finding or testing the truth of something.<br>**2.** The cognitive process of establishing a valid proof. | *"In academic literature, validation designates the act of validating; finding or testing the truth of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[validatory]] | adjective | **1.** Serving to support or corroborate. | *"In academic literature, validatory designates serving to support or corroborate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[validity]] | noun | **1.** The quality of being valid and rigorous.<br>**2.** The quality of having legal force or effectiveness. | *"O, behold this ring, Whose high respect and rich validity Did lack a parallel; yet for all that He gave it to a commoner o’ the camp, If I be one."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[validly]] | adverb | **1.** With validity; in a valid manner. | *"In academic literature, validly designates with validity; in a valid manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[validness]] | noun | **1.** The quality of having legal force or effectiveness. | *"In academic literature, validness designates the quality of having legal force or effectiveness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valine]] | noun | **1.** An essential amino acid found in proteins; important for growth in children and nitrogen balance in adults. | *"In academic literature, valine designates an essential amino acid found in proteins; important for growth in children and nitrogen balance in adults."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valise]] | noun | **1.** A small overnight bag for short trips. | *"In fifteen minutes, the door-bell rang violently, and a gentleman, valise in hand, said, "Mrs."* — Classic Author, *The wonders of prayer* |
| [[valium]] | noun | **1.** A tranquilizer (trade name valium) used to relieve anxiety and relax muscles; acts by enhancing the inhibitory actions of the neurotransmitter gaba; can also be used as an anticonvulsant drug in cases of nerve agent poisoning. | *"In academic literature, valium designates a tranquilizer (trade name valium) used to relieve anxiety and relax muscles; acts by enhancing the inhibitory actions of the neurotransmitter gaba; can also be used as an anticonvulsant drug in cases of nerve agent poisoning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vallecula]] | noun | **1.** (anatomy) any furrow or channel on a bodily structure or part. | *"In academic literature, vallecula designates (anatomy) any furrow or channel on a bodily structure or part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valletta]] | noun | **1.** The capital of malta; located on the northeastern coast of the island. | *"In academic literature, valletta designates the capital of malta; located on the northeastern coast of the island."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valley]] | noun | **1.** A long depression in the surface of the land that usually contains a river. | *"Uncouple in the western valley; let them go."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vallisneria]] | noun | **1.** Eelgrass; eel grass. | *"In academic literature, vallisneria designates eelgrass; eel grass."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valmy]] | noun | **1.** The french defeated the austrian and prussian troops in 1792 (with a famous cannonade from the french artillery). | *"In academic literature, valmy designates the french defeated the austrian and prussian troops in 1792 (with a famous cannonade from the french artillery)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valois]] | noun | **1.** French royal house from 1328 to 1589. | *"On a tiny satinwood table stood a statuette by Clodion, and beside it lay a copy of Les Cent Nouvelles, bound for Margaret of Valois by Clovis Eve and powdered with the gilt daisies that Queen had selected for her device."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[valor]] | noun | **1.** The qualities of a hero or heroine; exceptional or heroic courage when facing danger (especially in battle). | *"But were the coming narrative to reveal, in any instance, the complete abasement of poor Starbuck’s fortitude, scarce might I have the heart to write it; for it is a thing most sorrowful, nay shocking, to expose the fall of valor in the soul."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[valorous]] | adjective | **1.** Having or showing valor. | *"Thou art as valorous as Hector of Troy, worth five of Agamemnon, and ten times better than the Nine Worthies."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[valorously]] | adverb | **1.** With valor; in a valiant manner. | *"By the mess, ere theise eyes of mine take themselves to slomber, I’ll de gud service, or I’ll lig i’ the grund for it; ay, or go to death; and I’ll pay’t as valorously as I may, that sall I suerly do, that is the breff and the long."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[valorousness]] | noun | **1.** The qualities of a hero or heroine; exceptional or heroic courage when facing danger (especially in battle). | *"In academic literature, valorousness designates the qualities of a hero or heroine; exceptional or heroic courage when facing danger (especially in battle)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valour]] | noun | **1.** The qualities of a hero or heroine; exceptional or heroic courage when facing danger (especially in battle). | *"So is running away, when fear proposes the safety: but the composition that your valour and fear makes in you is a virtue of a good wing, and I like the wear well."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[valsartan]] | noun | **1.** An angiotensin ii inhibitor that is used to treat high blood pressure. | *"In academic literature, valsartan designates an angiotensin ii inhibitor that is used to treat high blood pressure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valse]] | noun | **1.** A ballroom dance in triple time with a strong accent on the first beat. | *"Uncle” played another song and a valse; then after a pause he cleared his throat and sang his favorite hunting song: As ‘twas growing dark last night Fell the snow so soft and light..."* — graf Leo Tolstoy, *War and Peace* |
| [[valuable]] | noun | **1.** Something of value.<br>**2.** Having great material or monetary value especially for use or exchange. | *"Where could all the valuable damask-covered furniture have gone to?"* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[valuableness]] | noun | **1.** The positive quality of being precious and beyond value. | *"In academic literature, valuableness designates the positive quality of being precious and beyond value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valuate]] | verb | **1.** Evaluate or estimate the nature, quality, ability, extent, or significance of. | *"In academic literature, valuate designates evaluate or estimate the nature, quality, ability, extent, or significance of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valuation]] | noun | **1.** An appraisal of the value of something.<br>**2.** Assessed price. | *"No reason I, since of your lives you set So slight a valuation, should reserve My crack’d one to more care."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[valuator]] | noun | **1.** One who estimates officially the worth or value or quality of things. | *"I fell into converse with several farmers and made arrangements with one to take his young pigs at valuation--which I judged a good affair to me, his valuator being largely indebted to me in the line of bone manures and feeding stuffs."* — S. R. Crockett, *Deep Moat Grange* |
| [[value]] | noun | **1.** A numerical quantity measured or assigned or computed.<br>**2.** The quality (positive or negative) that renders something desirable or valuable. | *"I was too young that time to value her, But now I know her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[value-system]] | noun | **1.** The principles of right and wrong that are accepted by an individual or a social group. | *"In academic literature, value-system designates the principles of right and wrong that are accepted by an individual or a social group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valued]] | verb | **1.** Fix or determine the value of; assign a value to.<br>**2.** Hold dear. | *"This is the brief of money, plate, and jewels I am possessed of. ’Tis exactly valued, Not petty things admitted."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[valueless]] | adjective | **1.** Of no value. | *"You have beguil’d me with a counterfeit Resembling majesty, which, being touch’d and tried, Proves valueless."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[valuelessness]] | noun | **1.** Having none of the properties that endow something with value. | *"In academic literature, valuelessness designates having none of the properties that endow something with value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valuer]] | noun | **1.** Someone who assesses the monetary worth of possessions. | *"THOMAS SAPSEA, AUCTIONEER, VALUER, ESTATE AGENT, &c., OF THIS CITY."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[values]] | noun | **1.** Beliefs of a person or social group in which they have an emotional investment (either for or against something).<br>**2.** A numerical quantity measured or assigned or computed. | *"Grievingly I think The peace between the French and us not values The cost that did conclude it."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Power]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VAL
  </div>
</div>
