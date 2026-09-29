---
status: unread
type: root_dashboard
---
# Dashboard — plen
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">plen-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“full or to fill”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking at a large overflowing basket filled to the brim with goods.</span>
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

The root **plen** means full or to fill. It refers to containing as much as possible or being completely filled. In English, this root forms words such as *plenary*, *plenipotentiary*, *plenitude*, and *plenty*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: full or to fill
> The root **plen** means full or to fill. It refers to containing as much as possible or being completely filled. In English, this root forms words such as *plenary*, *plenipotentiary*, *plenitude*, and *plenty*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Full or to fill</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking at a large overflowing basket filled to the brim with goods.</mark>
> - **Everyday Connection**: Think of familiar words like *plenary* and *plenipotentiary*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **plen** comes from a Latin word that means *"full or to fill"*.
  - At its core, it describes full or to fill.

- **The Big Picture Idea**:
  - Picture looking at a large overflowing basket filled to the brim with goods.
  - Whenever you see **plen** in an English word, think of **amounts, quantities, and sizes**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of full or to fill.
  - **Mental & Social**: How people experience, organize, or communicate about full or to fill.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Plenary**: Unqualified.
  - **Plenipotentiary**: A diplomatic agent invested with full power to act on behalf of a sovereign ruler.
  - **Plenitude**: An abundance or sufficiency.
  - **Plenty**: A large or sufficient amount or quantity.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">plen</mark>, think of <mark class="hl-def">amounts, quantities, and sizes</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Adjectival Stem:** *plēn-* (masculine *plēnus*, feminine *plēna*, neuter *plēnum*) $\to$ *plenary, plenitude, plenty, plentiful*.

- **Compound Diplomatic Stem:** *plēni-* + *potēns, potentis* ("powerful") $\to$ *plenipotentiary*.

- **Re-verbalized Romance Stem:** Old French *replenir* (< *re-* + *plein*) $\to$ *replenish, replenishment*.



### 2.2 Complementary Distinction: `plen` vs `plet`

The Latin root system split PIE *\*pleh₁-* into two distinct lexical branches:

1. **Adjectival / State Branch (`plen`):** Focused on the *state of fullness, abundance, and total presence* (*plēnus* $\to$ *plenty, plenary, plenitude*).

2. **Verbal / Participial Branch (`plet`):** Focused on the *action of filling, completing, or draining* (*plēre, plētus* $\to$ *complete, deplete, replete, implement*).



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



### 1. Societal Governance & Diplomacy

- *plenary* (fully attended by all qualified members; absolute and unqualified in authority).

- *plenipotentiary* (a diplomatic envoy invested with full, sovereign authority to transact business).

- *plenitude* (an abundance or fullness; completeness of power).



### 2. General Abundance & Wealth

- *plenty* (a large or sufficient amount or quantity; abundance).

- *plentiful* (existing in great quantities; yielding abundant crops).

- *plentifully* (in large quantities; abundantly).



### 3. Renewal & Environmental Restoration

- *replenish* (to fill up again; restore a stock or supply to a former level).

- *replenishment* (the restoration of depleted inventory, aquifers, or resources).

- *unreplenished* (not filled or restored again; remaining exhausted).



---



## 🔀 4. Prefix & Combining Dynamics on plen



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Adjectival `-ary`** | *plēnus* + *-ārius* | **plenary** | Pertaining to full membership/power | *"The United Nations General Assembly convened for a plenary session."* |

| **Compound `pot-`** | *plēni-* + *potēns* | **plenipotentiary** | Bearing full sovereign authority | *"The ambassador was dispatched as envoy extraordinary and minister plenipotentiary."* |

| **Abstract `-tude`** | *plēnus* + *-tūdō* | **plenitude** | The condition of ultimate fullness | *"Spinoza wrote of the infinite plenitude of the divine substance."* |

| **Prefix `re-`** | `re-` + Old French *plein* | **replenish** | Restoring to maximum capacity | *"Rainstorms helped replenish the arid region's subterranean aquifers."* |

| **Suffix `-ful`** | *plenty* + *-ful* | **plentiful** | Characterized by rich abundance | *"A plentiful harvest relieved the famine-stricken frontier."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🏛️ **International Relations & Diplomacy:** *plenipotentiary powers*, *plenary session of parliament*.

- ⚖️ **Constitutional Law:** *plenary jurisdiction* (complete, unreviewable legislative power over a specific subject matter).

- 🔬 **Ecology & Resource Management:** *aquifer replenishment*, *replenishment cycles of renewable fisheries*.

- 💼 **Supply Chain & Logistics:** *stock replenishment*, *automated continuous replenishment systems*.

- ✝️ **Ecclesiastical History:** *plenary indulgence* (full remission of temporal punishment in Catholic doctrine).



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[aspleniaceae]] | noun | **1.** One of a number of families into which polypodiaceae has been subdivided in some classification systems; includes genera asplenium, pleurosorus, schaffneria. | *"In academic literature, aspleniaceae designates one of a number of families into which polypodiaceae has been subdivided in some classification systems; includes genera asplenium, pleurosorus, schaffneria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asplenium]] | noun | **1.** In some classification systems placed in family polypodiaceae. | *"In academic literature, asplenium designates in some classification systems placed in family polypodiaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plenarily]] | adverb | **1.** In a plenary manner. | *"In academic literature, plenarily designates in a plenary manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plenary]] | adjective | **1.** Full in all respects. | *"The clerk several times used the word “plenary” (of the service), a word Pétya did not understand."* — graf Leo Tolstoy, *War and Peace* |
| [[plenipotentiary]] | noun | **1.** A diplomat who is fully authorized to represent his or her government. | *"I'll notify them all that you are my Ambassador Plenipotentiary, and that you carry a personal message from me."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[plenitude]] | noun | **1.** A full supply. | *"Then--one saw it coming--she leaned forward till the diamonds in her plenitude of fair hair sparkled like a crown of flame, and beckoned Lawrence to join her."* — Anthony Pryde, *Nightfall* |
| [[plenteous]] | adjective | **1.** Affording an abundant supply. | *"So holy and so perfect is my love, And I in such a poverty of grace, That I shall think it a most plenteous crop To glean the broken ears after the man That the main harvest reaps."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[plenteously]] | adverb | **1.** In a bountiful manner. | *"Thy due from me Is tears and heavy sorrows of the blood, Which nature, love, and filial tenderness, Shall, O dear father, pay thee plenteously."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[plenteousness]] | noun | **1.** A full supply. | *"The plenteousness of all--that there are no bounds; To emerge, and be of the sky--of the sun and moon and the flying clouds, as one with them."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[plentiful]] | adjective | **1.** Existing in great number or quantity.<br>**2.** Affording an abundant supply. | *"Why is Time such a niggard of hair, being, as it is, so plentiful an excrement?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[plentifully]] | adverb | **1.** In a bountiful manner. | *"Besides this nothing that he so plentifully gives me, the something that nature gave me his countenance seems to take from me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[plentifulness]] | noun | **1.** A full supply. | *"And now I speak not of the love that has been turned to hatred, the honor to ignominy, the ease and plentifulness of all things to danger, want, and nakedness."* — Nathaniel Hawthorne, *Twice-Told Tales* |
| [[plentitude]] | noun | **1.** A full supply. | *"For seven years I had lived on seal meat, so that at sight of the enormous plentitude of different and succulent food I fell a victim to my weakness and ate of such quantities that once again I was well nigh to dying."* — Jack London, *The Jacket (The Star-Rover)* |
| [[plenty]] | noun | **1.** A full supply.<br>**2.** (often followed by `of') a large number or amount or extent. | *"As it is a spare life, look you, it fits my humour well; but as there is no more plenty in it, it goes much against my stomach."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[plenum]] | noun | **1.** A meeting of a legislative body at which all members are present.<br>**2.** An enclosed space in which the air pressure is higher than outside. | *"Jackson_ currit _plenum sed_ Et laesit meum _magnum ad_. _R."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[replenish]] | verb | **1.** Fill something that had previously been emptied. | *"Should a villain say so, The most replenish’d villain in the world, He were as much more villain: you, my lord, Do but mistake."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[replenishment]] | noun | **1.** Filling again by supplying what has been used up. | *"Fully aware that vital minerals and other substances were beyond replenishment from within the Solar System, the solar community nevertheless squandered its rapidly diminishing resources."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[suppleness]] | noun | **1.** The gracefulness of a person or animal that is flexible and supple.<br>**2.** The property of being pliant and flexible. | *"That very sweet language will be gone soon, if not gone already, and no book learning will revive the suppleness of idiom, that haunting misty loveliness...."* — Donn Byrne, *The Wind Bloweth* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Quantity]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PLEN
  </div>
</div>
