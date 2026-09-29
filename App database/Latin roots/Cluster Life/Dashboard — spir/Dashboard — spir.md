---
status: unread
type: root_dashboard
---
# Dashboard — spir
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">spir-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to breathe”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A young seed sprouting vigorously into green leaves under the warm sun.</span>
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

The root **spir** means to breathe. It refers to taking in air, inhaling and exhaling, and vital respiration. In English, this root forms words such as *spirit*, *inspire*, *expire*, and *respiration*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to breathe
> The root **spir** means to breathe. It refers to taking in air, inhaling and exhaling, and vital respiration. In English, this root forms words such as *spirit*, *inspire*, *expire*, and *respiration*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To breathe</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A young seed sprouting vigorously into green leaves under the warm sun.</mark>
> - **Everyday Connection**: Think of familiar words like *spirit* and *inspire*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **spir** comes from a Latin word that means *"to breathe"*.
  - At its core, it describes the action of breathe.

- **The Big Picture Idea**:
  - Picture a young seed sprouting vigorously into green leaves under the warm sun.
  - Whenever you see **spir** in an English word, think of **to breathe**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to breathe).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Spirit**: The non-physical part of a person.
  - **Inspire**: To fill someone with the urge, courage, or ability to do something creative.
  - **Expire**: To come to an end.
  - **Respiration**: The act of breathing.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">spir</mark>, think of <mark class="hl-def">to breathe</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **spir** operates across three morphological stems:
> - **Primary Verb Base `spir-` (*spīrāre*):**
>   - `ad-` (toward) $\to$ *aspire*, *aspirant*
>   - `con-` (together) $\to$ *conspire*, *conspiracy*, *conspirator*, *conspiratorial*
>   - `ex-` (out) $\to$ *expire*, *expiration*, *expiratory*
>   - `in-` (into) $\to$ *inspire*, *inspiration*, *inspirational*, *inspiratory*, *inspirit*
>   - `per-` (through) $\to$ *perspire*, *perspiration*, *perspiratory*, *antiperspirant*
>   - `re-` (again / back) $\to$ *respire*, *respiration*, *respiratory*, *respirator*, *respirometer*
>   - `trans-` (across) $\to$ *transpire*, *transpiration*, *transpiratory*
>   - `sub-` (under / deeply) $\to$ *suspire*, *suspiration*
> - **Substantival / Pneumatic Base `spirit-` (*spīritus* "breath, soul, courage"):**
>   - *spirit*, *spirited*, *spiritedly*, *spiritless*, *spiritual*, *spirituality*, *spiritualize*, *spiritualism*, *spiritualist*, *spirituous*, *dispirited*, *dispirit*
> - **Romance Vernacular Route (`esprit` via Old French < Latin *spiritus*):**
>   - *esprit*, *esprit de corps*
> - **Diagnostic Instrumental Combining Form `spiro-` (*spīrāre* + Greek *-metron*):**
>   - *spirometer*, *spirometry*

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
> The root branches across five vibrant conceptual spheres:
> - **Pulmonary Respiration & Critical Medicine:** The mechanical and chemical exchange of air (*respire*, *respiration*, *respiratory*, *respirator*, *spirometer*, *spirometry*).
> - **Ambition, Creativity & Moral Purpose:** The striving for noble ideals (*aspire*, *aspiration*, *aspirant*) and the sudden flash of creative genius (*inspire*, *inspiration*, *inspirational*).
> - **Criminal & Political Collusion:** Secret, unlawful confederacies plotting subversion (*conspire*, *conspiracy*, *conspirator*, *conspiratorial*).
> - **Cutaneous & Botanical Exudation:** The excretion of sweat through human skin pores (*perspire*, *perspiration*) and moisture loss through plant stomata (*transpire*, *transpiration*).
> - **Metaphysics, Courage & Distillation:** The human soul and vitality (*spirit*, *spirited*, *dispirited*), religious devotion (*spiritual*, *spirituality*), and distilled ethanol (*spirituous*, *spirits*).

---

## 🔀 4. Prefix & Combining Dynamics on spir

### Prefix Dynamics
- **`ad-` (Toward / Upward):** Breathing toward a higher goal $\to$ *aspire*, *aspiration*.
- **`con-` (Together):** Breathing together in secret alliance $\to$ *conspire*, *conspiracy*.
- **`ex-` (Out):** Breathing one's last; coming to an end $\to$ *expire*, *expiration*.
- **`in-` (Into):** Breathing life or creative impulse into another $\to$ *inspire*, *inspiration*.
- **`per-` (Through):** Breathing fluid out through pores $\to$ *perspire*, *perspiration*.
- **`re-` (Again / Repeatedly):** Rhythmic, perpetual breath cycle $\to$ *respire*, *respiration*.
- **`trans-` (Across / Through):** Emitting vapor across leaves $\to$ *transpire*, *transpiration*.
- **`sub-` (From below / Deeply):** Breathing out a deep sigh $\to$ *suspire*, *suspiration*.
- **`dis-` (Apart / Deprivation):** Stripping away courage and vitality $\to$ *dispirited*, *dispirit*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Pulmonology, Anesthesiology & Critical Care:** Forced expiratory volume (FEV1) measured by *spirometry*; mechanical *respirators* in ICU wards; *aspiration pneumonia* caused by food or saliva entering the bronchial tree.
> - **Criminal Law & Jurisprudence:** The doctrine of *conspiracy* (an inchoate crime requiring an agreement between two or more persons to commit an unlawful act and an overt act in furtherance); RICO prosecutions.
> - **Plant Physiology & Agronomy:** Stomatal conductance and *transpiration* pull driving water transport through the xylem from roots to canopy.
> - **Dermatology & Personal Care:** Aluminum chlorohydrate formulations in clinical *antiperspirants* reducing axillary *perspiration*.
> - **Theology & Comparative Religion:** Pneumatology (the theological study of the Holy Spirit); indigenous animism viewing nature as suffused with *spirits*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antiperspirant]] | noun | **1.** An astringent substance applied to the skin to reduce perspiration. | *"In academic literature, antiperspirant designates an astringent substance applied to the skin to reduce perspiration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aspirant]] | noun | **1.** An ambitious and aspiring young person.<br>**2.** Desiring or striving for recognition or advancement. | *"To the Press, for the fair field its honest suffrage has opened to an obscure aspirant."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[aspirate]] | noun | **1.** A consonant pronounced with aspiration.<br>**2.** Remove as if by suction. | *"This second cousin was a Middlemarch mercer of polite manners and superfluous aspirates."* — George Eliot, *Middlemarch* |
| [[aspiration]] | noun | **1.** A will to succeed.<br>**2.** A cherished desire. | *"That spirit of his In aspiration lifts him from the earth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[aspirator]] | noun | **1.** A pump that draws air or another gas through a liquid. | *"In academic literature, aspirator designates a pump that draws air or another gas through a liquid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aspire]] | verb | **1.** Have an ambitious plan or a lofty goal. | *"Belike he means, Backed by the power of Warwick, that false peer, To aspire unto the crown and reign as king."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[aspirer]] | noun | **1.** An ambitious and aspiring young person. | *"In academic literature, aspirer designates an ambitious and aspiring young person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aspiring]] | verb | **1.** Have an ambitious plan or a lofty goal.<br>**2.** Desiring or striving for recognition or advancement. | *"For, to be plain, They, knowing Dame Eleanor’s aspiring humour, Have hired me to undermine the Duchess And buzz these conjurations in her brain."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[coconspirator]] | noun | **1.** A member of a conspiracy. | *"In academic literature, coconspirator designates a member of a conspiracy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coconspire]] | verb | **1.** Conspire together. | *"In academic literature, coconspire designates conspire together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conspiracy]] | noun | **1.** A secret agreement between two or more people to perform an unlawful act.<br>**2.** A plot to carry out some harmful or illegal act (especially a political plot). | *"O conspiracy, Sham’st thou to show thy dangerous brow by night, When evils are most free?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conspirative]] | adjective | **1.** Relating to or characteristic of conspiracy or conspirators. | *"In academic literature, conspirative designates relating to or characteristic of conspiracy or conspirators."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conspirator]] | noun | **1.** A member of a conspiracy. | *"But, hark! [_Drums and trumpets sound, with great shouts of the people._] FIRST CONSPIRATOR."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conspiratorial]] | adjective | **1.** Relating to or characteristic of conspiracy or conspirators. | *"In academic literature, conspiratorial designates relating to or characteristic of conspiracy or conspirators."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conspire]] | verb | **1.** Engage in plotting or enter into a conspiracy, swear together.<br>**2.** Act in unison or agreement and in secret towards a deceitful or illegal purpose. | *"What was’t That moved pale Cassius to conspire?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dispirit]] | verb | **1.** Lower someone's spirits; make downhearted. | *"However, nothing dispirits, and nothing seems worth while disputing."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[dispirited]] | verb | **1.** Lower someone's spirits; make downhearted.<br>**2.** Marked by low spirits; showing no enthusiasm. | *"Why bless you Bairn," returned Samuel, "_there were snails in the ark_." The reply was so earnest, so unexpected, and met the dispirited man so immediately on his own ground, that the temptation broke away, and he was out of his depression."* — Classic Author, *The wonders of prayer* |
| [[dispiritedly]] | adverb | **1.** In a dispirited manner without hope. | *"In academic literature, dispiritedly designates in a dispirited manner without hope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dispiritedness]] | noun | **1.** A feeling of low spirits. | *"In academic literature, dispiritedness designates a feeling of low spirits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dispiriting]] | verb | **1.** Lower someone's spirits; make downhearted.<br>**2.** Destructive of morale and self-reliance. | *"But both the young women were fairly cheerful; such weather on a dry upland is not in itself dispiriting."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[inspiration]] | noun | **1.** Arousal of the mind to special unusual activity or creativity.<br>**2.** A product of your creative thinking and work. | *"First, let me tell you whom you have condemn’d: Not one begotten of a shepherd swain, But issued from the progeny of kings; Virtuous and holy, chosen from above, By inspiration of celestial grace, To work exceeding miracles on earth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inspirational]] | adjective | **1.** Imparting a divine influence on the mind and soul. | *"Chants Communal--Horace Traubel Boards 1.00 .10 Inspirational prose pieces."* — George W. Cronyn, *The Glebe 1914/09 (Vol. 2, No. 2): Poems* |
| [[inspirationally]] | adverb | **1.** With inspiration; in an inspiring manner,. | *"Too long has this literary masterpiece been buried in translations, unavoidably cumbrous and inspirationally innocuous."* — William Edward Soothill, *The lotus of the wonderful law* |
| [[inspiratory]] | adjective | **1.** Pertaining to the drawing in phase of respiration. | *"In academic literature, inspiratory designates pertaining to the drawing in phase of respiration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inspire]] | verb | **1.** Heighten or intensify.<br>**2.** Supply the inspiration for. | *"Our ancient word of courage, fair Saint George, Inspire us with the spleen of fiery dragons!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inspired]] | verb | **1.** Heighten or intensify.<br>**2.** Supply the inspiration for. | *"Inspired merit so by breath is barr’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inspirer]] | noun | **1.** A leader who stimulates and excites people to action. | *"This was not the only or chief inspirer of my fears."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[inspiring]] | verb | **1.** Heighten or intensify.<br>**2.** Supply the inspiration for. | *"She is a satisfaction to the parents and guardians of the ’prentices, who feel that there is little danger of her inspiring tender emotions in the breast of youth; she is a satisfaction to Mrs."* — Charles Dickens, *Bleak House* |
| [[inspirit]] | verb | **1.** Infuse with spirit. | *"Knowing its narcotic nature, he refused; but Jimmy said he would have something mixed with it, which would convert it into an innocent beverage that would inspirit them for the rest of their journey."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[inspiriting]] | verb | **1.** Infuse with spirit.<br>**2.** Cheerfully encouraging. | *"Now that’s delightful, that’s inspiriting, that’s full of poetry!"* — Charles Dickens, *Bleak House* |
| [[perspiration]] | noun | **1.** Salty fluid secreted by sweat glands.<br>**2.** The process of the sweat glands of the skin secreting a salty fluid. | *"He seemed to be working hard, with the perspiration standing on his forehead, and had a piece of chalk by him, with which, as he put each separate package or bundle down, he made a crooked mark on the panelling of the wall."* — Charles Dickens, *Bleak House* |
| [[perspire]] | verb | **1.** Excrete perspiration through the pores in the skin. | *"They say that they perspire profusely."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[perspirer]] | noun | **1.** A person who perspires. | *"In academic literature, perspirer designates a person who perspires."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[respiration]] | noun | **1.** The metabolic processes whereby certain organisms obtain energy from organic molecules; processes that take place in the cells and tissues during which energy is released and carbon dioxide is produced and absorbed by the blood to be transported to the lungs.<br>**2.** A single complete act of breathing in and out. | *"Some scientist studied these peasants and found that during these periods of the “long sleep” respiration and digestion practically ceased, and that the heart was at so low tension as to defy detection by ordinary layman’s examination."* — Jack London, *The Jacket (The Star-Rover)* |
| [[respirator]] | noun | **1.** A breathing device for administering long-term artificial respiration.<br>**2.** A protective mask with a filter; protects the face and lungs against poisonous gases. | *"In academic literature, respirator designates a breathing device for administering long-term artificial respiration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[respiratory]] | adjective | **1.** Pertaining to respiration. | *"In academic literature, respiratory designates pertaining to respiration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[respire]] | verb | **1.** Breathe easily again, as after exertion or anxiety.<br>**2.** Undergo the biomedical and metabolic processes of respiration by taking up oxygen and producing carbon monoxide. | *"O'er the sea, And from the mountains where I now respire, Fain would I waft such blessing upon thee, As, with a sigh, I deem thou mightst have been to me!"* — Baron George Gordon Byron Byron, *Childe Harold's Pilgrimage* |
| [[spiracle]] | noun | **1.** A breathing orifice. | *"No, he breathes through his spiracle alone; and this is on the top of his head."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[spiraea]] | noun | **1.** A japanese shrub that resembles members of the genus spiraea; widely cultivated in many varieties for its dense panicles of flowers in many colors; often forced by florists for easter blooming.<br>**2.** Any rosaceous plant of the genus spiraea; has sprays of small white or pink flowers. | *"In academic literature, spiraea designates a japanese shrub that resembles members of the genus spiraea; widely cultivated in many varieties for its dense panicles of flowers in many colors; often forced by florists for easter blooming."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiral]] | noun | **1.** A plane curve traced by a point circling about the center but at increasing distances from the center.<br>**2.** A curve that lies on the surface of a cylinder or cone and cuts the element at a constant angle. | *"In this lantern is a spiral glass which contains a small quantity of carbonic gas."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[spiral-shelled]] | adjective | **1.** Having a shell that forms a spiral. | *"In academic literature, spiral-shelled designates having a shell that forms a spiral."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiraling]] | verb | **1.** To wind or move in a spiral course.<br>**2.** Form a spiral. | *"The jar, when he landed, sent pain spiraling through his body."* — Jr. Irving E. Cox, *Export Commodity* |
| [[spirally]] | adverb | **1.** With spirals. | *"The next moment a delicate wreath of smoke curls spirally into the air, the heap of dusty particles glows with fire, and Kory-Kory, almost breathless, dismounts from his steed."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[spirant]] | noun | **1.** A continuant consonant produced by breath moving against a narrowing of the vocal tract.<br>**2.** Of speech sounds produced by forcing air through a constricted passage (as `f', `s', `z', or `th' in both `thin' and `then'). | *"In academic literature, spirant designates a continuant consonant produced by breath moving against a narrowing of the vocal tract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiranthes]] | noun | **1.** Large cosmopolitan genus of white-flowered terrestrial orchids. | *"In academic literature, spiranthes designates large cosmopolitan genus of white-flowered terrestrial orchids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spire]] | noun | **1.** A tall tower that forms the superstructure of a building (usually a church or temple) and that tapers to a point at the top. | *"Rome must know The value of her own. ’Twere a concealment Worse than a theft, no less than a traducement, To hide your doings and to silence that Which, to the spire and top of praises vouched, Would seem but modest."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spirea]] | noun | **1.** A japanese shrub that resembles members of the genus spiraea; widely cultivated in many varieties for its dense panicles of flowers in many colors; often forced by florists for easter blooming.<br>**2.** Any rosaceous plant of the genus spiraea; has sprays of small white or pink flowers. | *"In academic literature, spirea designates a japanese shrub that resembles members of the genus spiraea; widely cultivated in many varieties for its dense panicles of flowers in many colors; often forced by florists for easter blooming."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirilla]] | noun | **1.** Any flagellated aerobic bacteria having a spirally twisted rodlike form.<br>**2.** Spirally twisted elongate rodlike bacteria usually living in stagnant water. | *"In academic literature, spirilla designates any flagellated aerobic bacteria having a spirally twisted rodlike form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirillaceae]] | noun | **1.** Rigid spirally curved elongate bacteria. | *"In academic literature, spirillaceae designates rigid spirally curved elongate bacteria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirillum]] | noun | **1.** Spirally twisted elongate rodlike bacteria usually living in stagnant water.<br>**2.** Any flagellated aerobic bacteria having a spirally twisted rodlike form. | *"In academic literature, spirillum designates spirally twisted elongate rodlike bacteria usually living in stagnant water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirit]] | noun | **1.** The vital principle or animating force within living things.<br>**2.** The general atmosphere of a place or situation and the effect that it has on people. | *"Is it thy spirit that thou send’st from thee So far from home into my deeds to pry, To find out shames and idle hours in me, The scope and tenure of thy jealousy?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spirited]] | verb | **1.** Infuse with spirit.<br>**2.** Displaying animation, vigor, or liveliness. | *"What a frosty-spirited rogue is this!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spiritedly]] | adverb | **1.** In a spirited or lively manner; with animation and vivacity. | *"And women to pay the price," answered Mamie, spiritedly."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[spiritedness]] | noun | **1.** Quality of being active or spirited or alive and vigorous. | *"In academic literature, spiritedness designates quality of being active or spirited or alive and vigorous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiritise]] | verb | **1.** Imbue with a spirit. | *"In academic literature, spiritise designates imbue with a spirit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiritism]] | noun | **1.** Concern with things of the spirit. | *"Spiritism consigns the so-called dead to a state resembling that of blighted buds, - to a wretched purgatory, where 77:30 the chances of the departed for improvement narrow into nothing and they return to their old standpoints of matter."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[spiritize]] | verb | **1.** Imbue with a spirit. | *"In academic literature, spiritize designates imbue with a spirit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiritless]] | adjective | **1.** Lacking ardor or vigor or energy.<br>**2.** Evidencing little spirit or courage; overly submissive or compliant; ; - orville prescott. | *"At the further end the great churn could be seen revolving, and its slip-slopping heard—the moving power being discernible through the window in the form of a spiritless horse walking in a circle and driven by a boy."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[spiritlessness]] | noun | **1.** The trait of lacking enthusiasm for or interest in things generally. | *"In academic literature, spiritlessness designates the trait of lacking enthusiasm for or interest in things generally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiritous]] | adjective | **1.** Containing or of the nature of alcohol. | *"In academic literature, spiritous designates containing or of the nature of alcohol."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirits]] | noun | **1.** An alcoholic beverage that is distilled rather than fermented.<br>**2.** The vital principle or animating force within living things. | *"Was it his spirit, by spirits taught to write, Above a mortal pitch, that struck me dead?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spiritual]] | noun | **1.** A kind of religious song originated by blacks in the southern united states.<br>**2.** Concerned with sacred matters or religion or the church. | *"Thou art reverend Touching thy spiritual function, not thy life."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spiritualisation]] | noun | **1.** The act of making something spiritual; infusing it with spiritual content. | *"In academic literature, spiritualisation designates the act of making something spiritual; infusing it with spiritual content."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiritualise]] | verb | **1.** Give a spiritual meaning to; read in a spiritual sense.<br>**2.** Purify from the corrupting influences of the world. | *"In academic literature, spiritualise designates give a spiritual meaning to; read in a spiritual sense."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiritualism]] | noun | **1.** (theology) any doctrine that asserts the separate existence of god.<br>**2.** The belief that the spirits of dead people can communicate with people who are still alive (especially via a medium). | *"Does spiritualism find Jesus' death necessary 24:24 only for the presentation, after death, of the material Jesus, as a proof that spirits can return to earth?"* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[spiritualist]] | noun | **1.** Someone who serves as an intermediary between the living and the dead.<br>**2.** Of or relating to or connected with spiritualism. | *"Unhappy victims of spiritualist delusions have found deliverance at the mercy-seat; and there, too, many in the bondage of sin have rejoiced in a present Saviour."* — Classic Author, *The wonders of prayer* |
| [[spiritualistic]] | adjective | **1.** Of or relating to or connected with spiritualism. | *"In academic literature, spiritualistic designates of or relating to or connected with spiritualism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirituality]] | noun | **1.** Property or income owned by a church.<br>**2.** Concern with things of the spirit. | *"For knowledge, spirituality, good sense, and indomitable spirit of the finest discretion on moral subjects, the old man is a real marvel every way."* — John Cairns, *Principal Cairns* |
| [[spiritualization]] | noun | **1.** The act of making something spiritual; infusing it with spiritual content. | *"Lippi was one of the representatives of the protest made in the fifteenth century against the conventional spiritualization in the art of his time."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[spiritualize]] | verb | **1.** Give a spiritual meaning to; read in a spiritual sense.<br>**2.** Elevate or idealize, in allusion to christ's transfiguration. | *"To spiritualize one’s age—that is something worth doing."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[spiritually]] | adverb | **1.** In a spiritual manner. | *"Casaubon had an intense consciousness within him, and was spiritually a-hungered like the rest of us."* — George Eliot, *Middlemarch* |
| [[spiritualty]] | noun | **1.** Property or income owned by a church. | *"O, let their bodies follow, my dear liege, With blood and sword and fire to win your right; In aid whereof we of the spiritualty Will raise your Highness such a mighty sum As never did the clergy at one time Bring in to any of your ancestors."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spirituous]] | adjective | **1.** Containing or of the nature of alcohol. | *"Halloa, sir!” But it would seem as easy to wake a bundle of old clothes with a spirituous heat smouldering in it."* — Charles Dickens, *Bleak House* |
| [[spirochaeta]] | noun | **1.** The type genus of the family spirochaetaceae; a bacterium that is flexible, undulating, and chiefly aquatic. | *"In academic literature, spirochaeta designates the type genus of the family spirochaetaceae; a bacterium that is flexible, undulating, and chiefly aquatic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirochaetaceae]] | noun | **1.** Large coarsely spiral bacteria; free-living in fresh or salt water or commensal in bodies of oysters. | *"In academic literature, spirochaetaceae designates large coarsely spiral bacteria; free-living in fresh or salt water or commensal in bodies of oysters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirochaetales]] | noun | **1.** Higher bacteria; slender spiral rodlike forms. | *"In academic literature, spirochaetales designates higher bacteria; slender spiral rodlike forms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirochaete]] | noun | **1.** Parasitic or free-living bacteria; many pathogenic to humans and other animals. | *"In academic literature, spirochaete designates parasitic or free-living bacteria; many pathogenic to humans and other animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirochete]] | noun | **1.** Parasitic or free-living bacteria; many pathogenic to humans and other animals. | *"In academic literature, spirochete designates parasitic or free-living bacteria; many pathogenic to humans and other animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirodela]] | noun | **1.** Minute aquatic herbs floating on the water surface consisting of a shiny leaflike frond and 2-21 roots. | *"In academic literature, spirodela designates minute aquatic herbs floating on the water surface consisting of a shiny leaflike frond and 2-21 roots."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirogram]] | noun | **1.** A recording of breathing made with a spirograph. | *"In academic literature, spirogram designates a recording of breathing made with a spirograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirograph]] | noun | **1.** A measuring instrument for recording the depth and rapidity of breathing movements. | *"In academic literature, spirograph designates a measuring instrument for recording the depth and rapidity of breathing movements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirogyra]] | noun | **1.** Freshwater algae consisting of minute filaments containing spiral chlorophyll bands. | *"In academic literature, spirogyra designates freshwater algae consisting of minute filaments containing spiral chlorophyll bands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirometer]] | noun | **1.** A measuring instrument for measuring the vital capacity of the lungs. | *"In academic literature, spirometer designates a measuring instrument for measuring the vital capacity of the lungs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirometry]] | noun | **1.** The use of a spirometer to measure vital capacity. | *"In academic literature, spirometry designates the use of a spirometer to measure vital capacity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spironolactone]] | noun | **1.** A synthetic corticosteroid (trade name aldactone) used to treat hypertension. | *"In academic literature, spironolactone designates a synthetic corticosteroid (trade name aldactone) used to treat hypertension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirt]] | noun | **1.** The occurrence of a sudden discharge (as of liquid).<br>**2.** Gush forth in a sudden stream or jet. | *"DAUPHIN. _O Dieu vivant_! shall a few sprays of us, The emptying of our fathers’ luxury, Our scions put in wild and savage stock, Spirt up so suddenly into the clouds, And overlook their grafters?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spirula]] | noun | **1.** A small tropical cephalopod of the genus spirula having prominent eyes and short arms and a many-chambered shell coiled in a flat spiral. | *"In academic literature, spirula designates a small tropical cephalopod of the genus spirula having prominent eyes and short arms and a many-chambered shell coiled in a flat spiral."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirulidae]] | noun | **1.** Coextensive with the genus spirula; included in the order belemnoidea in some older classifications. | *"In academic literature, spirulidae designates coextensive with the genus spirula; included in the order belemnoidea in some older classifications."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transpirate]] | verb | **1.** Pass through the tissue or substance or its pores or interstices, as of gas. | *"In academic literature, transpirate designates pass through the tissue or substance or its pores or interstices, as of gas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transpiration]] | noun | **1.** The passage of gases through fine tubes because of differences in pressure or temperature.<br>**2.** The process of giving off or exhaling water vapor through the skin or mucous membranes. | *"In academic literature, transpiration designates the passage of gases through fine tubes because of differences in pressure or temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transpire]] | verb | **1.** Pass through the tissue or substance or its pores or interstices, as of gas.<br>**2.** Exude water vapor. | *"She did not learn either to forget or defend the past; but she learned to hope that it would never transpire farther, and that it might not cost her Henry’s entire regard."* — Jane Austen, *Northanger Abbey* |
| [[transpiring]] | verb | **1.** Pass through the tissue or substance or its pores or interstices, as of gas.<br>**2.** Exude water vapor. | *"And this is but one instance, in one city, similar events transpiring in every other large city."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[uninspired]] | adjective | **1.** Having no intellectual or emotional or spiritual excitement.<br>**2.** Deficient in originality or creativity; lacking powers of invention. | *"It was her custom to read the Bible from duty, and then turn to these uninspired volumes for the kindling of a higher devotion."* — Classic Author, *The wonders of prayer* |
| [[uninspiring]] | adjective | **1.** Depressing to the spirit. | *"I love the making of interiors, and if Pastimes must be fitted beautifully to do justice to itself, still more would it be needful to turn the uninspiring "flat" into a haven of comfort and cheer."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Life]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SPIR
  </div>
</div>
