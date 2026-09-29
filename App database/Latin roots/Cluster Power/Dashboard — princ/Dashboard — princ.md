---
status: unread
type: root_dashboard
---
# Dashboard — princ
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">princ-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“first or chief”</span>
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

The root **princ** means first or chief. It refers to the chief leader, foremost guide, or first in authority. In English, this root forms words such as *prince*, *princely*, *princess*, and *principal*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: first or chief
> The root **princ** means first or chief. It refers to the chief leader, foremost guide, or first in authority. In English, this root forms words such as *prince*, *princely*, *princess*, and *principal*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">First or chief</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A strong engine lifting a heavy load or a respected leader giving direction.</mark>
> - **Everyday Connection**: Think of familiar words like *prince* and *princely*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **princ** comes from a Latin word that means *"first or chief"*.
  - At its core, it describes first or chief.

- **The Big Picture Idea**:
  - Picture a strong engine lifting a heavy load or a respected leader giving direction.
  - Whenever you see **princ** in an English word, think of **power, ability, and authority**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of first or chief.
  - **Mental & Social**: How people experience, organize, or communicate about first or chief.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Prince**: The son of a monarch.
  - **Princely**: Relating to or suitable for a prince.
  - **Princess**: The daughter of a monarch.
  - **Principal**: First in order of importance.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">princ</mark>, think of <mark class="hl-def">power, ability, and authority</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **princ** generates vocabulary through nominalization, adjectival derivation, and Romance development:
> - **Royal Titles & Aristocratic Domains:**
>   - *prīnceps* $	o$ Old French *prince* $	o$ *prince* ("a male royal ruler or monarch's son").
>   - *prince* + *-ess* $	o$ *princess* ("a female royal ruler or monarch's daughter").
>   - *prince* + *-ly* $	o$ *princely* ("lavish, generous, befitting a prince").
>   - *prīncipātus* $	o$ *principality* ("a state ruled by a prince, e.g., Monaco or Andorra").
> - **Executive & Educational Formations:**
>   - *prīncipālis* $	o$ *principal*, *principally* ("first in order of importance; the head of a school; a sum of money invested").
> - **Ethical & Axiomatic Formations:**
>   - *prīncipium* $	o$ French *principe* $	o$ *principle* ("a fundamental truth or proposition that serves as the foundation for a system of belief").
>   - *principle* + *-ed* $	o$ *principled* ("acting in accordance with moral principles").
>   - *un-* + *principled* $	o$ *unprincipled* ("not acting in accordance with moral principles; unscrupulous").

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
> - **Moral Philosophy & Ethics:** *principle*, *principled*, *unprincipled* (first principles, unwavering moral rectitude).
> - **Royalty & Aristocracy:** *prince*, *princess*, *princely*, *principality* (crown prince, sovereign principality of Liechtenstein).
> - **Education & Institutional Leadership:** *principal* (high school principal, principal investigator on research grant).
> - **Finance & Investment Banking:** *principal* (principal loan balance vs. accrued interest).
> - **Theoretical Physics & Mathematics:** *principle*, *first principles* (Heisenberg uncertainty principle, Newton's *Principia*).

---

## 🔀 4. Prefix & Combining Dynamics on princ

### Suffix & Compound Matrix

| Form | Base Meaning | Combined Derivative | Morphological Shift |
| :--- | :--- | :--- | :--- |
| `-al` (relating to first) | `prīnceps` | **[[principal]]** / **principally** | Foremost in authority; the headmaster or capital loan sum. |
| `-le` (abstract rule) | `prīncipium` | **[[principle]]** | A foundational law of nature, logic, or moral conduct. |
| `-ed` (possessing) | *principle* | **[[principled]]** | Characterized by strict adherence to moral integrity. |
| `un-` (privative not) | *principled* | **[[unprincipled]]** | Completely lacking moral standards; corrupt and opportunistic. |
| `-ality` (territorial domain) | `prīncipātus` | **[[principality]]** | A sovereign microstate or territory governed by a prince. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Jurisprudence & Constitutional Ethics** | *principle*, *principled*, *unprincipled* | Adhering to the legal principle of *stare decisis*; condemning unprincipled judicial activism. |
| 🎓 **Educational Administration & Research** | *principal* | High school principals managing faculty; principal investigators (PIs) directing clinical trials. |
| 💰 **Corporate Finance & Banking** | *principal* | Amortization schedules allocating monthly payments between principal debt reduction and interest. |
| ⚛️ **Theoretical Physics & Epistemology** | *principle* | Formulating theories from first principles; Pauli exclusion principle in quantum mechanics. |
| 👑 **Monarchical Diplomacy & Microstates** | *principality*, *prince*, *princely* | Diplomatic relations with the sovereign Principality of Monaco; receiving princely hospitality. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[prince]] | noun | **1.** A male member of a royal family other than the sovereign (especially the son of a sovereign). | *"Why, sir, if I cannot serve you, I can serve as great a prince as you are."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prince's-feather]] | noun | **1.** Annual with broadly ovate leaves and slender drooping spikes of crimson flowers; southeastern asia and australia; naturalized in north america.<br>**2.** Tall showy tropical american annual having hairy stems and long spikes of usually red flowers above leaves deeply flushed with purple; seeds often used as cereal. | *"In academic literature, prince's-feather designates annual with broadly ovate leaves and slender drooping spikes of crimson flowers; southeastern asia and australia; naturalized in north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prince's-plume]] | noun | **1.** Annual with broadly ovate leaves and slender drooping spikes of crimson flowers; southeastern asia and australia; naturalized in north america.<br>**2.** Perennial of southwestern united states having leathery blue-green pinnatifid leaves and thick plumelike spikes of yellow flowers; sometimes placed in genus cleome. | *"In academic literature, prince's-plume designates annual with broadly ovate leaves and slender drooping spikes of crimson flowers; southeastern asia and australia; naturalized in north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prince-of-wales'-heath]] | noun | **1.** South african shrub grown for its profusion of white flowers. | *"In academic literature, prince-of-wales'-heath designates south african shrub grown for its profusion of white flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[princedom]] | noun | **1.** The dignity or rank or position of a prince.<br>**2.** Territory ruled by a prince. | *"Hear all ye Angels, Progenie of Light, Thrones, Dominations, Princedoms, Vertues, Powers, Hear my Decree, which unrevok’t shall stand."* — John Milton, *Paradise Lost* |
| [[princeling]] | noun | **1.** A petty or insignificant prince who rules some unimportant principality.<br>**2.** A young prince. | *"In academic literature, princeling designates a petty or insignificant prince who rules some unimportant principality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[princely]] | adjective | **1.** Rich and superior in quality.<br>**2.** Having the rank of or befitting a prince. | *"You are fallen into a princely hand; fear nothing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[princess]] | noun | **1.** A female member of a royal family other than the queen (especially the daughter of a sovereign). | *"It is well done, and fitting for a princess Descended of so many royal kings."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[princeton]] | noun | **1.** A university town in central new jersey.<br>**2.** A university in new jersey. | *"Paragraph Numbers, shown thus [1], are from Edwin Curley's translation in his "The Collected Works of Spinoza", Volume 1, 1985, Princeton University Press; ISBN 0-691-07222-1. 4."* — Benedictus de Spinoza, *On the Improvement of the Understanding* |
| [[princewood]] | noun | **1.** Tropical american timber tree.<br>**2.** Large tropical american tree of the genus cordia grown for its abundant creamy white flowers and valuable wood. | *"In academic literature, princewood designates tropical american timber tree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[principal]] | noun | **1.** The original amount of a debt on which interest is calculated.<br>**2.** The educator who has executive authority for a school. | *"Within the year it will make itself two, which is a goodly increase, and the principal itself not much the worse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[principality]] | noun | **1.** Territory ruled by a prince. | *"Then speak the truth by her; if not divine, Yet let her be a principality, Sovereign to all the creatures on the earth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[principally]] | adverb | **1.** For the most part. | *"She carries some small litter in a reticule which she calls her documents, principally consisting of paper matches and dry lavender."* — Charles Dickens, *Bleak House* |
| [[principalship]] | noun | **1.** The post of principal. | *"The Principalship of the University became vacant by the death of Dr."* — John Cairns, *Principal Cairns* |
| [[principe]] | noun | **1.** An island in the gulf of guinea that is part of sao tome and principe. | *"I am an admirer of Montesquieu,” replied Prince Andrew, “and his idea that le principe des monarchies est l’honneur me paraît incontestable."* — graf Leo Tolstoy, *War and Peace* |
| [[principen]] | noun | **1.** Semisynthetic penicillin (trade names principen and polycillin and sk-ampicillin). | *"In academic literature, principen designates semisynthetic penicillin (trade names principen and polycillin and sk-ampicillin)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[principle]] | noun | **1.** A basic generalization that is accepted as true and that can be used as a basis for reasoning or conduct.<br>**2.** A rule or standard especially of good behavior. | *"If I had a thousand sons, the first humane principle I would teach them should be to forswear thin potations and to addict themselves to sack."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[principled]] | adjective | **1.** Based on or manifesting objectively defined standards of rightness or morality. | *"You think me an unfeeling, loose-principled rake: don’t you?” “I don’t like you so well as I have done sometimes, indeed, sir."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[unprincipled]] | adjective | **1.** Lacking principles or moral scruples; - a.e.stevenson.<br>**2.** Having little or no integrity. | *"A warmth overspread his face: surely she was not so unprincipled as to flirt in a fair!"* — Thomas Hardy, *Far from the Madding Crowd* |

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
    ROOT DASHBOARD · PRINC
  </div>
</div>
