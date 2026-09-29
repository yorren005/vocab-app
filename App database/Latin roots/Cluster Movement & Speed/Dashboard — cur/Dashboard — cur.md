---
status: unread
type: root_dashboard
---
# Dashboard — cur
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cur-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to run, care, or heal”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A runner sprinting rapidly across an open field with swift agility.</span>
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

The root **cur** means to run, care, or heal. It refers to moving rapidly on foot, flowing smoothly, or operating continuously. In English, this root forms words such as *notice*, *cure*, *curable*, and *incurable*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to run, care, or heal
> The root **cur** means to run, care, or heal. It refers to moving rapidly on foot, flowing smoothly, or operating continuously. In English, this root forms words such as *notice*, *cure*, *curable*, and *incurable*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To run, care, or heal</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A runner sprinting rapidly across an open field with swift agility.</mark>
> - **Everyday Connection**: Think of familiar words like *notice* and *cure*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cur** comes from a Latin word that means *"to run, care, or heal"*.
  - At its core, it describes the action of run, care, or heal.

- **The Big Picture Idea**:
  - Picture a runner sprinting rapidly across an open field with swift agility.
  - Whenever you see **cur** in an English word, think of **to run, care, or heal**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to run, care, or heal).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Notice**: An everyday English word showing the root's idea of *to run, care, or heal*.
  - **Cure**: To restore an individual or tissue to health, soundness, or normal physiological function.
  - **Curable**: Capable of being healed, restored to health, or corrected through medical treatment or appropriate remedial measures.
  - **Incurable**: Incapable of being cured, healed, or remediated by medical science.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cur</mark>, think of <mark class="hl-def">to run, care, or heal</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **cur** expands into English vocabulary across four morphological engines and specialized compound prefixes:
> - **Primary Nominal & Verbal Base (`cur-` / `cura-`):** Inherited from Latin noun *cūra* and verb *cūrāre*, forming core terms of medical healing and cultural custody: [[cure]], [[curable]], [[incurable]], [[curative]].
> - **Participial / Agentive Stem (`curat-`):** Derived from the Latin past participle *cūrātus* and agent noun *cūrātor*, generating titles of custodial authority and ministerial office: [[curator]], [[curatorial]], [[curatorship]], [[curate]], [[curacy]], [[curation]].
> - **Prefixal Compounds:**
>   - `se-` (*apart, without*) + *cūra* $\to$ *sēcūrus* ("without care, safe"): generates [[secure]], [[securely]], [[security]], and privatives [[insecure]], [[insecurity]].
>   - `ad-` (*to, toward*) + *cūrāre* $\to$ *accūrāre* ("to attend to with care") $\to$ participle *accūrātus*: yields [[accurate]], [[accurately]], [[accuracy]], and privatives [[inaccurate]], [[inaccuracy]].
>   - `ad-` + *sēcūrāre* $\to$ Vulgar Latin *\*assēcūrāre* $\to$ Anglo-Norman *asseurer*: generates [[assure]], [[assurance]], [[assured]], and iterative [[reassure]], [[reassurance]].
>   - `pro-` (*forward, on behalf of*) + *cūrāre* $\to$ *prōcūrāre* ("to manage for another"): produces [[procure]], [[procurement]], [[procurable]], [[procurator]], [[procuratorial]].
>   - `sine` (*without*) + *cūra* (ablative) $\to$ Medieval Latin *sine cūrā*: yields [[sinecure]] and [[sinecurist]].
> - **Somatic Compounds (Hand & Foot Grooming):**
>   - Latin *manus* ("hand") + *cūra* $\to$ French *manucure* $\to$ English [[manicure]], [[manicurist]].
>   - Latin *pēs, pedis* ("foot") + *cūra* $\to$ French *pédicure* $\to$ English [[pedicure]], [[pedicurist]].
> - **The Inquisitive Adjectival Vector (`curios-`):** From *cūriōsus* ("full of care, painstaking, inquiring"): produces [[curious]], [[curiously]], [[curiosity]].

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
> Although the root fundamentally denotes **"care, solicitude, and attentive guardianship"**, its operational plane expands across eight distinct conceptual vectors:
> - **Therapeutic Healing & Bodily Restoration:** In [[cure]], [[curable]], [[incurable]], [[incurably]], [[incurability]], [[curative]], and [[curativeness]], care manifests as medical intervention, pharmacology, and the eradication of pathology.
> - **Custodial Stewardship & Cultural Preservation:** In [[curator]], [[curatorial]], [[curatorship]], [[curate]] (v.), and [[curation]], care becomes the safeguarding, scholarship, and public interpretation of museum collections, archives, and digital media.
> - **Ecclesiastical Governance & Pastoral Care:** In [[curate]] (n.), [[curacy]], [[sinecure]], and [[sinecurist]], care operates as the sacred *cura animarum* (spiritual stewardship of souls) or its institutional absence in lucrative sinecures.
> - **Meticulous Calibration & Epistemic Precision:** In [[accurate]], [[accurately]], [[accurateness]], [[accuracy]], [[inaccurate]], [[inaccurately]], and [[inaccuracy]], care is cognitive: the painstaking elimination of deviation, bias, and error from data and measurement.
> - **Defensive Fortification & Psychological Equanimity:** In [[secure]], [[securely]], [[secureness]], [[security]], [[insecure]], [[insecurely]], [[insecurity]], [[assure]], [[assurance]], [[assured]], [[assuredly]], [[reassure]], [[reassurance]], [[reassuring]], and [[reassuringly]], care transforms through *sē-cūrus* into freedom from hazard, robust protection, and serenity.
> - **Intellectual Inquisitiveness & Heuristic Wonder:** In [[curious]], [[curiously]], [[curiousness]], and [[curiosity]], care turns inward and outward as intense mental appetite, exploratory hunger, and fascination with novelty.
> - **Administrative Representation & Supply-Chain Acquisition:** In [[procure]], [[procurer]], [[procurement]], [[procurable]], [[procurator]], and [[procuratorial]], care denotes formal stewardship exercised to acquire resources, negotiate contracts, or govern provinces by proxy.
> - **Somatic Hygiene & Aesthetic Grooming:** In [[manicure]], [[manicurist]], [[pedicure]], and [[pedicurist]], care is applied directly to the extremities of the human body through professional cosmetic maintenance.

---

## 🔀 4. Prefix & Combining Dynamics on cur

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| *(root alone)* | care, healing, charge | [[cure]], [[curator]], [[curate]] | Fundamental stewardship, custodial oversight, and bodily restoration. |
| `ad-` | to, toward (intensive) | `ad-` + `curare` $\to$ **[[accurate]]**, **[[accuracy]]** | Care applied directly to a task; worked upon until exact and free from error. |
| `se-` | apart from, without | `se-` + `cura` $\to$ **[[secure]]**, **[[security]]** | Untroubled by care or anxiety; safe from physical hazard, attack, or collapse. |
| `ad-` + `se-` | to + apart from | `ad-` + `securus` $\to$ **[[assure]]**, **[[assurance]]** | To render safe or certain to someone; to banish doubt through a pledge. |
| `re-` + `ad-` + `se-` | again + to + apart from | `re-` + `assure` $\to$ **[[reassure]]**, **[[reassurance]]** | To restore confidence and serenity anew; to calm recurring fears. |
| `pro-` | for, on behalf of, forward | `pro-` + `curare` $\to$ **[[procure]]**, **[[procurator]]** | To manage or acquire on behalf of another; executive agency and logistics. |
| `sine-` | without (preposition) | `sine` + `cura` $\to$ **[[sinecure]]**, **[[sinecurist]]** | An office devoid of administrative or pastoral care, yet bearing revenue. |
| `in-` | not, un- (privative) | `in-` + derivatives $\to$ **[[incurable]]**, **[[inaccurate]]**, **[[insecure]]** | Reversing the root state: untreatable, full of error, or exposed to danger. |
| `manus-` | hand (Latin *manus*) | `manus` + `cura` $\to$ **[[manicure]]**, **[[manicurist]]** | Specialized cosmetic and hygienic care directed to the human hand. |
| `pedis-` | foot (Latin *pes, pedis*) | `pes` + `cura` $\to$ **[[pedicure]]**, **[[pedicurist]]** | Specialized cosmetic and podiatric care directed to the human foot. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-able` / `-ability` | Adjective / Abstract Noun | [[curable]], [[incurability]], [[procurable]] | Denoting the capacity or incapacity to be healed, obtained, or managed. |
| `-ive` / `-iveness` | Adjective / Quality Noun | [[curative]], [[curativeness]] | Possessing the active medicinal power or tendency to restore health. |
| `-or` | Noun (Agent / Magistrate) | [[curator]], [[procurator]] | The designated person entrusted with custodial, administrative, or legal charge. |
| `-ial` / `-ship` | Adjective / Office Noun | [[curatorial]], [[curatorship]], [[procuratorial]] | Pertaining to the jurisdictional duties, tenure, or scope of a curator. |
| `-ate` | Noun / Verb Formative | [[curate]] (n.), [[curate]] (v.) | A cleric with cure of souls; or the act of selecting and organizing an exhibition. |
| `-acy` / `-ation` | Noun (State / Process) | [[curacy]], [[curation]], [[accuracy]], [[inaccuracy]] | The formal office held, the methodical process executed, or state achieved. |
| `-ity` | Noun (Essential Condition) | [[security]], [[insecurity]], [[curiosity]] | The state of safety, vulnerability, or inquisitive mental drive. |
| `-ous` / `-osity` | Adjective / Noun of Quality | [[curious]], [[curiosity]] | Full of care, painstakingly made, or possessed by an urge to investigate. |
| `-ment` | Noun (Action / System) | [[procurement]] | The formal administrative apparatus of requisitioning and purchasing. |
| `-ist` | Noun (Practitioner / Agent) | [[sinecurist]], [[manicurist]], [[pedicurist]] | A person holding a sinecure, or professionally practicing cosmetic care. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏛️ **Museum & Archival Studies** | [[curator]], [[curation]], [[curatorial]], [[curatorship]], [[curate]] (v.) | Acquiring, conserving, cataloging, researching, and staging fine art, historical artifacts, natural history specimens, and digital repositories. |
| 💊 **Medicine & Pharmacology** | [[cure]], [[curative]], [[curativeness]], [[curable]], [[incurable]], [[incurability]] | Clinical therapeutics, oncology protocols, antimicrobial regimens, palliative care for terminal syndromes, and pharmacology trials. |
| 🔒 **Cybersecurity & Defense** | [[secure]], [[security]], [[insecure]], [[insecurity]], [[securely]], [[secureness]] | Cryptographic encryption protocols, zero-trust network architectures, physical perimeter defense, border integrity, and national counterintelligence. |
| ⛪ **Ecclesiastical & Religious Offices** | [[curate]] (n.), [[curacy]], [[sinecure]], [[sinecurist]] | Canon law jurisdiction, the historical *cura animarum* (pastoral cure of souls), Anglican parish ministries, and historical critique of unearned ecclesiastical benefices. |
| 📐 **Metrology & Scientific Data** | [[accurate]], [[accuracy]], [[inaccurate]], [[inaccuracy]], [[accurately]], [[accurateness]] | Calibration of atomic clocks, geodetic satellite surveying, error margin bounds, statistical regression, and empirical validation in experimental physics. |
| 💅 **Aesthetics & Personal Care** | [[manicure]], [[pedicure]], [[manicurist]], [[pedicurist]] | Professional cosmetic hygiene, podiatric nail debridement, dermatological cuticle treatments, and spa grooming industries. |
| 📦 **Supply Chain & Corporate Governance** | [[procure]], [[procurement]], [[procurer]], [[procurable]] | Strategic sourcing, government defense requisitioning, vendor contract negotiation, international logistics, and compliance auditing. |
| ⚖️ **Roman Civil Law & Legal Representation** | [[procurator]], [[procuratorial]], [[curator]] | Imperial tax administration in classical Rome, court-appointed curatela for incapacitated individuals, and attorneys acting under power of attorney. |
| 🧠 **Cognitive Psychology & Human Motivation** | [[curious]], [[curiosity]], [[assure]], [[reassure]], [[reassurance]] | Epistemic drive theory, childhood exploratory behavior, anxiety mitigation, trauma reassurance, and interpersonal confidence reinforcement. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[accuracy]] | noun | **1.** The quality of being near to the true value.<br>**2.** (mathematics) the number of significant figures given in a number. | *"He told us, however, that as he had always been a mere child in point of weights and measures and had never known anything about them (except that they disgusted him), he had never been able to prescribe with the requisite accuracy of detail."* — Charles Dickens, *Bleak House* |
| [[accurate]] | adjective | **1.** Conforming exactly or almost exactly to fact or to a standard or performing with total accuracy.<br>**2.** (of ideas, images, representations, expressions) characterized by perfect conformity to fact or truth ; strictly correct. | *"The schoolmaster at this time was John M'Gregor, a man of ripe and accurate scholarship and quite separate individuality."* — John Cairns, *Principal Cairns* |
| [[accurately]] | adverb | **1.** With few mistakes.<br>**2.** Strictly correctly. | *"I can lie down on the grass—in fine weather—and float along an African river, embracing all the natives I meet, as sensible of the deep silence and sketching the dense overhanging tropical growth as accurately as if I were there."* — Charles Dickens, *Bleak House* |
| [[accurse]] | verb | **1.** Curse or declare to be evil or anathema or threaten with divine punishment. | *"I am accursed to rob in that thief’s company."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accursed]] | verb | **1.** Curse or declare to be evil or anathema or threaten with divine punishment.<br>**2.** Under a curse. | *"I am accursed to rob in that thief’s company."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accurst]] | adjective | **1.** Under a curse. | *"In second husband let me be accurst!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[co-occurrence]] | noun | **1.** An event or situation that happens at the same time as or in connection with another.<br>**2.** The temporal property of two things happening at the same time. | *"In academic literature, co-occurrence designates an event or situation that happens at the same time as or in connection with another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concur]] | verb | **1.** Be in accord; be in agreement.<br>**2.** Happen simultaneously. | *"First, all you peers of Greece, go to my tent; There in the full convive we; afterwards, As Hector’s leisure and your bounties shall Concur together, severally entreat him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[concurrence]] | noun | **1.** Agreement of results or opinions.<br>**2.** Acting together, as agents or circumstances or events. | *"Jarndyce,” he went on, “makes no condition beyond expressing his expectation that our young friend will not at any time remove herself from the establishment in question without his knowledge and concurrence."* — Charles Dickens, *Bleak House* |
| [[concurrency]] | noun | **1.** Agreement of results or opinions.<br>**2.** Acting together, as agents or circumstances or events. | *"In academic literature, concurrency designates agreement of results or opinions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concurrent]] | adjective | **1.** Occurring or operating at the same time. | *"Let but a flute Play ’neath the fine-mixed metal: listen close Till the right note flows forth, a silvery rill: Then shall the huge bell tremble—then the mass With myriad waves concurrent shall respond In low soft unison."* — George Eliot, *Middlemarch* |
| [[concurrently]] | adverb | **1.** Overlapping in duration. | *"Concurrently, at a signal from the UIPS President's ship Eagle, the station flashed an array of multicolored beacons."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[concurring]] | verb | **1.** Be in accord; be in agreement.<br>**2.** Happen simultaneously. | *"A line descending from the vital, beneath the congress of it and the hepatica, to the tuberculum of Saturn, shows an envious man, who rejoices at another’s calamity, the sight of others concurring."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[cooccur]] | verb | **1.** Go with, fall together. | *"In academic literature, cooccur designates go with, fall together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[countercurrent]] | noun | **1.** A stretch of turbulent water in a river or the sea caused by one current flowing into or across another current.<br>**2.** Actions counter to the main group activity. | *"In academic literature, countercurrent designates a stretch of turbulent water in a river or the sea caused by one current flowing into or across another current."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cur]] | noun | **1.** An inferior dog or one of mixed breed.<br>**2.** A cowardly and despicable person. | *"Good faith, across; But, my good lord, ’tis thus: will you be cur’d Of your infirmity?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curability]] | noun | **1.** Capability of being cured or healed. | *"In academic literature, curability designates capability of being cured or healed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curable]] | adjective | **1.** Curing or healing is possible.<br>**2.** Capable of being hardened by some additive or other agent. | *"Usually to admit that you are sick, renders your case less curable, while to recognize your sin, aids in destroying it."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[curableness]] | noun | **1.** Capability of being cured or healed. | *"In academic literature, curableness designates capability of being cured or healed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curacao]] | noun | **1.** A popular island resort in the netherlands antilles.<br>**2.** Flavored with sour orange peel. | *"She drank cherry-brandy after dinner," continued his Reverence, "and took curacao with her coffee."* — William Makepeace Thackeray, *Vanity Fair* |
| [[curacoa]] | noun | **1.** Flavored with sour orange peel. | *"Lashings of stuff we put up: port wine and sherry and curacoa to which we did ample justice."* — James Joyce, *Ulysses* |
| [[curacy]] | noun | **1.** The position of a curate. | *"He had the curacy of Monkford, you know, Sir Walter, some time back, for two or three years."* — Jane Austen, *Persuasion* |
| [[curandera]] | noun | **1.** A mexican woman who practices healing techniques inherited from the mayans. | *"In academic literature, curandera designates a mexican woman who practices healing techniques inherited from the mayans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curandero]] | noun | **1.** A mexican man who practices healing techniques inherited from the mayans. | *"In academic literature, curandero designates a mexican man who practices healing techniques inherited from the mayans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curare]] | noun | **1.** A toxic alkaloid found in certain tropical south american trees that is a powerful relaxant for striated muscles. | *"In academic literature, curare designates a toxic alkaloid found in certain tropical south american trees that is a powerful relaxant for striated muscles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curassow]] | noun | **1.** Large crested arboreal game bird of warm parts of the americas having long legs and tails; highly esteemed as game and food. | *"In academic literature, curassow designates large crested arboreal game bird of warm parts of the americas having long legs and tails; highly esteemed as game and food."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curate]] | noun | **1.** A person authorized to conduct religious worship. | *"Now, understanding that the curate and your sweet self are good at such eruptions and sudden breaking-out of mirth, as it were, I have acquainted you withal, to the end to crave your assistance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curative]] | noun | **1.** A medicine or therapy that cures disease or relieve pain.<br>**2.** Tending to cure or restore to health. | *"Since then this system has gradually gained ground, and has proved itself, whenever scien- 112:1 tifically employed, to be the most effective curative agent in medical practice."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[curator]] | noun | **1.** The custodian of a collection (as a museum or library). | *"Once, with a guard, and once with a short-timer in solitary, I entrusted, by memorization, a letter of inquiry addressed to the curator of the Museum."* — Jack London, *The Jacket (The Star-Rover)* |
| [[curatorial]] | adjective | **1.** Of or relating to a curator or the duties of a curator. | *"In academic literature, curatorial designates of or relating to a curator or the duties of a curator."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curatorship]] | noun | **1.** The position of curator. | *"In academic literature, curatorship designates the position of curator."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curaçao]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin cur within the domain of Movement & Speed.<br>**2.** A technical or specialized form exhibiting the properties of cur in systematic terminology. | *"In academic literature, curaçao designates pertaining to, derived from, or characteristic of latin cur within the domain of movement & speed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curculionidae]] | noun | **1.** True weevils: snout beetles. | *"In academic literature, curculionidae designates true weevils: snout beetles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curcuma]] | noun | **1.** Tropical asiatic perennial herbs. | *"In academic literature, curcuma designates tropical asiatic perennial herbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cure]] | noun | **1.** A medicine or therapy that cures disease or relieve pain.<br>**2.** Provide a cure for, make healthy again. | *"Past cure I am, now reason is past care, And frantic-mad with evermore unrest, My thoughts and my discourse as mad men’s are, At random from the truth vainly expressed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cure-all]] | noun | **1.** Hypothetical remedy for all ills or diseases; once sought by the alchemists. | *"In academic literature, cure-all designates hypothetical remedy for all ills or diseases; once sought by the alchemists."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cured]] | verb | **1.** Provide a cure for, make healthy again.<br>**2.** Prepare by drying, salting, or chemical processing in order to preserve. | *"Thus policy in love t’ anticipate The ills that were not, grew to faults assured, And brought to medicine a healthful state Which rank of goodness would by ill be cured."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curet]] | noun | **1.** A surgical instrument shaped like a scoop to remove tissue from a bodily cavity. | *"The guards referred to are the mythical Curetes who danced a war-dance round the infant Dionysus, as they are said to have done round the infant Zeus."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[curettage]] | noun | **1.** Surgery to remove tissue or growths from a bodily cavity (as the uterus) by scraping with a curette. | *"In academic literature, curettage designates surgery to remove tissue or growths from a bodily cavity (as the uterus) by scraping with a curette."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curette]] | noun | **1.** A surgical instrument shaped like a scoop to remove tissue from a bodily cavity. | *"In academic literature, curette designates a surgical instrument shaped like a scoop to remove tissue from a bodily cavity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curettement]] | noun | **1.** Surgery to remove tissue or growths from a bodily cavity (as the uterus) by scraping with a curette. | *"In academic literature, curettement designates surgery to remove tissue or growths from a bodily cavity (as the uterus) by scraping with a curette."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curia]] | noun | **1.** (roman catholic church) the central administration governing the roman catholic church. | *"In academic literature, curia designates (roman catholic church) the central administration governing the roman catholic church."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curie]] | noun | **1.** A unit of radioactivity equal to the amount of a radioactive isotope that decays at the rate of 37,000,000,000 disintegrations per second.<br>**2.** French physicist; husband of marie curie (1859-1906). | *"Some years ago, when radium was being much talked about and the names of M. and Madame Curie were in everyone's mouth, little toys were sold, the invention, I believe, of Sir William Crookes, called spinthariscopes."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[curietherapy]] | noun | **1.** The use of radium in radiation therapy. | *"In academic literature, curietherapy designates the use of radium in radiation therapy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curing]] | noun | **1.** The process of becoming hard or solid by cooling or drying or crystallization.<br>**2.** Provide a cure for, make healthy again. | *"Yet I profess curing it by counsel."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curio]] | noun | **1.** Something unusual -- perhaps worthy of collecting. | *"VALENTINE, Gentleman attending on the Duke CURIO, Gentleman attending on the Duke VIOLA, in love with the Duke."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curiosa]] | noun | **1.** Books on strange or unusual subjects (especially erotica). | *"With a fa, la, la, la, la.” --_Campbell’s British Poets_, p. 316. [216] Peck’s Curiosa. [217] Ibid. [218] Opus citatum in Pict."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[curiosity]] | noun | **1.** A state in which you want to learn more about something.<br>**2.** Something unusual -- perhaps worthy of collecting. | *"It did always seem so to us; but now, in the division of the kingdom, it appears not which of the Dukes he values most, for qualities are so weighed that curiosity in neither can make choice of either’s moiety."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curious]] | adjective | **1.** Beyond or deviating from the usual or expected.<br>**2.** Eager to investigate and learn or learn more (sometimes about others' concerns). | *"If my slight Muse do please these curious days, The pain be mine, but thine shall be the praise. 39 O how thy worth with manners may I sing, When thou art all the better part of me?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curiously]] | adverb | **1.** In a manner differing from the usual or expected.<br>**2.** With curiosity. | *"I would gladly have him see his company anatomized, that he might take a measure of his own judgments, wherein so curiously he had set this counterfeit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curiousness]] | noun | **1.** A state of active curiosity.<br>**2.** The quality of being alien or not native. | *"In academic literature, curiousness designates a state of active curiosity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curitiba]] | noun | **1.** A city in southeastern brazil. | *"In academic literature, curitiba designates a city in southeastern brazil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curium]] | noun | **1.** A radioactive transuranic metallic element; produced by bombarding plutonium with helium nuclei. | *"In academic literature, curium designates a radioactive transuranic metallic element; produced by bombarding plutonium with helium nuclei."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curl]] | noun | **1.** A round shape formed by a series of concentric circles (as formed by leaves or flower petals).<br>**2.** American chemist who with richard smalley and harold kroto discovered fullerenes and opened a new branch of chemistry (born in 1933). | *"I come To answer thy best pleasure; be’t to fly, To swim, to dive into the fire, to ride On the curl’d clouds, to thy strong bidding task Ariel and all his quality."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curled]] | verb | **1.** Form a curl, curve, or kink.<br>**2.** Shape one's body into a curl. | *"A serving-man, proud in heart and mind; that curled my hair; wore gloves in my cap; served the lust of my mistress’ heart, and did the act of darkness with her; swore as many oaths as I spake words, and broke them in the sweet face of heaven."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curler]] | noun | **1.** A mechanical device consisting of a cylindrical tube around which the hair is wound to curl it. | *"Curler, one who plays at curling."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[curlew]] | noun | **1.** Large migratory shorebirds of the sandpiper family; closely related to woodcocks but having a down-curved bill. | *"And your cry would be heard no more than the whinnying of the curlew...."* — Donn Byrne, *The Wind Bloweth* |
| [[curlicue]] | noun | **1.** A round shape formed by a series of concentric circles (as formed by leaves or flower petals).<br>**2.** A short twisting line. | *"It was pure white except that at one end, where there was something that looked like a handle, there were figures and funny curlicues carved, and down the whole length of it was a row of things that looked like the Hebrew letters in our family Bible."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[curliness]] | noun | **1.** (of hair) a tendency to curl. | *"In academic literature, curliness designates (of hair) a tendency to curl."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curling]] | noun | **1.** A game played on ice in which heavy stones with handles are slid toward a target.<br>**2.** Form a curl, curve, or kink. | *"Well I could have wrestled— The best men called it excellent—and run Swifter than wind upon a field of corn, Curling the wealthy ears, never flew."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curly]] | adjective | **1.** (of hair) having curls or waves. | *"Her thick, curly hair was falling far down below her shoulders, and her dark, solemn eyes were gazing with surprise at Apollonie."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[curly-coated]] | adjective | **1.** Covered with curly hair. | *"In academic literature, curly-coated designates covered with curly hair."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curly-grained]] | adjective | **1.** Of timber; having fibers running irregularly rather than in parallel. | *"In academic literature, curly-grained designates of timber; having fibers running irregularly rather than in parallel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curly-haired]] | adjective | **1.** Covered with curly hair. | *"In academic literature, curly-haired designates covered with curly hair."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curly-heads]] | noun | **1.** Shrubby clematis of the eastern united states having curly foliage. | *"In academic literature, curly-heads designates shrubby clematis of the eastern united states having curly foliage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curly-leafed]] | adjective | **1.** Having curly leaves. | *"In academic literature, curly-leafed designates having curly leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curly-leaved]] | adjective | **1.** Having curly leaves. | *"In academic literature, curly-leaved designates having curly leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curmudgeon]] | noun | **1.** A crusty irascible cantankerous old person full of stubborn ideas. | *"No churlish old curmudgeon could have been the owner of that grove of bread-fruit trees, or of these gloriously yellow bunches of bananas."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[curmudgeonly]] | adjective | **1.** Brusque and surly and forbidding. | *"In academic literature, curmudgeonly designates brusque and surly and forbidding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[currajong]] | noun | **1.** Widely distributed tree of eastern australia yielding a tough durable fiber and soft light attractively grained wood; foliage is an important emergency food for cattle. | *"In academic literature, currajong designates widely distributed tree of eastern australia yielding a tough durable fiber and soft light attractively grained wood; foliage is an important emergency food for cattle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[currant]] | noun | **1.** Any of several tart red or black berries used primarily for jellies and jams.<br>**2.** Any of various deciduous shrubs of the genus ribes bearing currants. | *"We don't live in the rectory now, but where there is a garden with lots of paths, and where the big currant-bushes are in the corners, here and here and here." Mäzli traced the position of the bushes exactly on the lionskin."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[currawong]] | noun | **1.** Bluish black fruit-eating bird with a bell-like call. | *"In academic literature, currawong designates bluish black fruit-eating bird with a bell-like call."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[currency]] | noun | **1.** The metal or paper medium of exchange that is presently used.<br>**2.** General acceptance or use. | *"This properly belongs in a complete theoretical treatment of the subject.] [Footnote 8: See "Modern Currency Reforms" (1916), by E.W."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[current]] | noun | **1.** A flow of electricity through a conductor.<br>**2.** A steady flow of a fluid (usually from natural causes). | *"This bald unjointed chat of his, my lord, I answered indirectly, as I said, And I beseech you, let not his report Come current for an accusation Betwixt my love and your high Majesty."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[currently]] | adverb | **1.** At this time or period; now. | *"I examined, too, in thought, the possibility of my ever being able to translate currently a certain little French story which Madame Pierrot had that day shown me; nor was that problem solved to my satisfaction ere I fell sweetly asleep."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[currentness]] | noun | **1.** The property of belonging to the present time. | *"In academic literature, currentness designates the property of belonging to the present time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curricular]] | adjective | **1.** Of or relating to an academic course of study. | *"In academic literature, curricular designates of or relating to an academic course of study."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curriculum]] | noun | **1.** An integrated course of academic studies. | *"The curriculum of the "Divinity Hall," as it was called, consisted of five of these short sessions."* — John Cairns, *Principal Cairns* |
| [[currier]] | noun | **1.** United states lithographer who (with his partner james ives) produced thousands of prints signed `currier & ives' (1813-1888).<br>**2.** A craftsman who curries leather for use. | *"In academic literature, currier designates united states lithographer who (with his partner james ives) produced thousands of prints signed `currier & ives' (1813-1888)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[currish]] | adjective | **1.** Base and cowardly.<br>**2.** Resembling a cur; snarling and rude. | *"Let Aesop fable in a winter’s night; His currish riddle sorts not with this place."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[currishly]] | adverb | **1.** In a currish manner; meanspiritedly. | *"In academic literature, currishly designates in a currish manner; meanspiritedly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curry]] | noun | **1.** (east indian cookery) a pungent dish of vegetables or meats flavored with curry powder and usually eaten with rice.<br>**2.** Season with a mixture of spices; typical of indian cooking. | *"If I had a suit to Master Shallow, I would humour his men with the imputation of being near their master: if to his men, I would curry with Master Shallow that no man could better command his servants."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[currycomb]] | noun | **1.** A square comb with rows of small teeth; used to curry horses.<br>**2.** Clean (a horse) with a currycomb. | *"In academic literature, currycomb designates a square comb with rows of small teeth; used to curry horses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curse]] | noun | **1.** Profane or obscene expression usually of surprise or anger.<br>**2.** An appeal to some supernatural power to inflict evil on someone or some group. | *"Ah, but I think him better than I say, And yet would herein others’ eyes were worse: Far from her nest the lapwing cries away; My heart prays for him, though my tongue do curse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cursed]] | verb | **1.** Utter obscenities or profanities.<br>**2.** Heap obscenities upon. | *"Some villain, Ay, and singular in his art, hath done you both This cursed injury."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cursedly]] | adverb | **1.** In a damnable manner. | *"I married; But never honest man’s intent Sane cursedly miscarried."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[cursive]] | noun | **1.** Rapid handwriting in which letters are set down in full and are cursively connected within words without lifting the writing implement from the paper.<br>**2.** Having successive letter joined together. | *"In academic literature, cursive designates rapid handwriting in which letters are set down in full and are cursively connected within words without lifting the writing implement from the paper."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cursively]] | adverb | **1.** In a cursive manner. | *"In academic literature, cursively designates in a cursive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cursor]] | noun | **1.** (computer science) indicator consisting of a movable spot of light (an icon) on a visual display; moving it allows the user to point to commands or screen positions. | *"In academic literature, cursor designates (computer science) indicator consisting of a movable spot of light (an icon) on a visual display; moving it allows the user to point to commands or screen positions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cursorial]] | adjective | **1.** (of limbs and feet) adapted for running. | *"In academic literature, cursorial designates (of limbs and feet) adapted for running."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cursorily]] | adverb | **1.** Without taking pains. | *"She cursorily signified the direction of the church, and went on, d’Urberville saying that he would see them again, in case they should be still unsuccessful in their search for shelter, of which he had just heard."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[cursorius]] | noun | **1.** Coursers. | *"Classical and authoritative lexicons catalog cursorius as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cursory]] | adjective | **1.** Hasty and without attention to detail; not thorough. | *"When I come back I’ll give you full directions, and if you insist upon walking you may; or you may ride—at your pleasure.” She accepted these terms, and slid off on the near side, though not till he had stolen a cursory kiss."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[curst]] | verb | **1.** Utter obscenities or profanities.<br>**2.** Heap obscenities upon. | *"Why hast thou lost the fresh blood in thy cheeks, And given my treasures and my rights of thee To thick-eyed musing and curst melancholy?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curt]] | adjective | **1.** Marked by rude or peremptory shortness.<br>**2.** Brief and to the point; effectively cut short. | *"Forbidden," was the curt reply."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[curtail]] | verb | **1.** Place restrictions on.<br>**2.** Terminate or abbreviate before its intended or proper end or its full extent. | *"When a gentleman is dispos’d to swear, it is not for any standers-by to curtail his oaths."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curtailment]] | noun | **1.** The temporal property of being cut short.<br>**2.** The act of withholding or withdrawing some book or writing from publication or circulation. | *"But, perhaps, such a sacrifice as the curtailment of your education will not be required of you.” “But, my DEAR!” gasped Nan."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[curtain]] | noun | **1.** Hanging cloth used as a blind (especially for a window).<br>**2.** Any barrier to communication or vision. | *"This absence of your father’s draws a curtain That shows the ignorant a kind of fear Before not dreamt of."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curtained]] | verb | **1.** Provide with drapery.<br>**2.** Furnished or concealed with curtains or draperies. | *"The pensive character which the curtained hood lent to their bent heads would have reminded the observer of some early Italian conception of the two Marys."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[curtainless]] | adjective | **1.** Not provided with curtains. | *"Then I rose up on my curtainless bed, trembling and quivering; and then the still, dark night witnessed the convulsion of despair, and heard the burst of passion."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[curtal]] | adjective | **1.** (obsolete) cut short. | *"I’d give bay curtal and his furniture My mouth no more were broken than these boys’, And writ as little beard."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curtilage]] | noun | **1.** The enclosed land around a house or other building. | *"In academic literature, curtilage designates the enclosed land around a house or other building."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curtis]] | noun | **1.** English botanical writer and publisher (1746-1799). | *"Curtis, ay; and therefore fire, fire; cast on no water."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curtisia]] | noun | **1.** A large evergreen tree of south africa. | *"In academic literature, curtisia designates a large evergreen tree of south africa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curtiss]] | noun | **1.** United states industrialist and aviation pioneer (1878-1930).<br>**2.** English botanical writer and publisher (1746-1799). | *"In the United States explosives have been used for years, owing to the exertions of the Du Pont Powder Company, while Messrs Curtiss' and Harvey, and Messrs Nobels, the great explosive manufacturers, are busy introducing them in Great Britain."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[curtly]] | adverb | **1.** In a curt, abrupt and discourteous manner. | *"What is it called?" "This is Castle Wildenstein," the boy's companion curtly answered, throwing a searching glance at the young Baron."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[curtness]] | noun | **1.** An abrupt discourteous manner. | *"Hawley’s mode of speech, even when public decorum repressed his “awful language,” was formidable in its curtness and self-possession."* — George Eliot, *Middlemarch* |
| [[curtsey]] | noun | **1.** Bending the knees; a gesture of respect made by women.<br>**2.** Bend the knees in a gesture of respectful greeting. | *"Please, Ma’am, is this New Zealand or Australia?” (and she tried to curtsey as she spoke—fancy _curtseying_ as you’re falling through the air!"* — Lewis Carroll, *Alice's Adventures in Wonderland* |
| [[curtsy]] | noun | **1.** Bending the knees; a gesture of respect made by women.<br>**2.** Bend the knees in a gesture of respectful greeting. | *"Thou that art like enough, through vassal fear, Base inclination, and the start of spleen, To fight against me under Percy’s pay, To dog his heels, and curtsy at his frowns, To show how much thou art degenerate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discursive]] | adjective | **1.** Proceeding to a conclusion by reason or argument rather than intuition.<br>**2.** (of e.g. speech and writing) tending to depart from the main point or cover a wide range of subjects. | *"I had not got far into it, when I judged from her looks that she was thinking in a discursive way of me, rather than of what I said."* — Charles Dickens, *Great Expectations* |
| [[discursively]] | adverb | **1.** In a rambling manner. | *"In academic literature, discursively designates in a rambling manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discursiveness]] | noun | **1.** The quality of being discursive. | *"The moment was too propitious for the display of that discursiveness which seemed the only bond of union among tempers so divergent."* — James Joyce, *Ulysses* |
| [[excursion]] | noun | **1.** A journey taken for pleasure.<br>**2.** Wandering from the main path of a journey. | *"Jarndyce, Ada, and Richard took advantage of a very fine day to make a little excursion, Mr."* — Charles Dickens, *Bleak House* |
| [[excursionist]] | noun | **1.** A tourist who is visiting sights of interest. | *"To the great mass of cheap excursionists the characteristic scenery of the Lakes is in itself hardly a pleasure at all."* — F. W. H. Myers, *Wordsworth* |
| [[excursive]] | adjective | **1.** (of e.g. speech and writing) tending to depart from the main point or cover a wide range of subjects. | *"There, grasping all the eye beheld, Thought into mingling anguish swell’d, And checked the wild excursive wing, O’er dust or bones of priest or king; Or rais’d some <g>Strongbow</g> warrior’s ghost, To shout before his banner’d host."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[excursus]] | noun | **1.** A message that departs from the main subject. | *"Ukridge, sir." Ukridge was in the middle of a very eloquent excursus on the feeding of fowls."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[extracurricular]] | adjective | **1.** Outside the regular academic curriculum.<br>**2.** Outside the regular duties of your job or profession. | *"In academic literature, extracurricular designates outside the regular academic curriculum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inaccuracy]] | noun | **1.** The quality of being inaccurate and having errors. | *"Waiving any exception that might be taken to the inaccuracy or inexplicitness of the distinction between internal and external, let us inquire what ground there is to presuppose that disinclination in the people."* — Alexander Hamilton, *The Federalist Papers* |
| [[inaccurate]] | adjective | **1.** Not exact. | *"Through the operation of its act New Zealand came to be called the "land without strikes," tho the description was inaccurate, especially after 1907."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[inaccurately]] | adverb | **1.** In an inaccurate manner. | *"Hoelderlin calls it "ein Roman," but it would be rather inaccurately described by the usual translation of that term."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[incur]] | verb | **1.** Make oneself subject to; bring upon oneself; become liable to.<br>**2.** Receive a specified treatment (abstract). | *"If the King come, I shall incur I know not How much of his displeasure. [_Aside._] Yet I’ll move him To walk this way."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incurability]] | noun | **1.** Incapability of being cured or healed.<br>**2.** Incapability of being altered in disposition or habits. | *"In academic literature, incurability designates incapability of being cured or healed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incurable]] | noun | **1.** A person whose disease is incurable.<br>**2.** Incapable of being cured. | *"That gave him out incurable,— PAROLLES."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incurableness]] | noun | **1.** Incapability of being cured or healed. | *"In academic literature, incurableness designates incapability of being cured or healed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incurably]] | adverb | **1.** To an incurable degree.<br>**2.** In a manner impossible to cure. | *"Her manner was incurably gentle; and she was not aware how much it concealed the sternness of her purpose."* — Jane Austen, *Mansfield Park* |
| [[incurious]] | adjective | **1.** Showing absence of intellectual inquisitiveness or natural curiosity. | *"The vision of all this as what ought to be done seemed to Dorothea like a sudden letting in of daylight, waking her from her previous stupidity and incurious self-absorbed ignorance about her husband’s relation to others."* — George Eliot, *Middlemarch* |
| [[incurrence]] | noun | **1.** The act of incurring (making yourself subject to something undesirable). | *"In academic literature, incurrence designates the act of incurring (making yourself subject to something undesirable)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incurring]] | noun | **1.** Acquiring or coming into something (usually undesirable).<br>**2.** Make oneself subject to; bring upon oneself; become liable to. | *"In fact, and I who am about to die have the right to say it without incurring the charge of immodesty, the three best minds in San Quentin from the Warden down were the three that rotted there together in solitary."* — Jack London, *The Jacket (The Star-Rover)* |
| [[incursion]] | noun | **1.** The act of entering some territory or domain (often in large numbers).<br>**2.** An attack that penetrates into enemy territory. | *"The results which follow on a large incursion of visitors into the Lake country may be considered under two heads, as affecting the residents, or as affecting the visitors themselves."* — F. W. H. Myers, *Wordsworth* |
| [[incursive]] | adjective | **1.** Involving invasion or aggressive attack. | *"In academic literature, incursive designates involving invasion or aggressive attack."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insecure]] | adjective | **1.** Not firm or firmly fixed; likely to fail or give way.<br>**2.** Lacking in security or safety. | *"These powerful creatures often hurled themselves at the windows of the saloon with such violence as to make us feel very insecure."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[insecurely]] | adverb | **1.** In a tentative and self-conscious manner.<br>**2.** In a manner involving risk. | *"And now let's get in and have something to eat, for goodness' sake." The kitchen window proved to be insecurely latched."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[insecureness]] | noun | **1.** The state of being exposed to risk or anxiety. | *"In academic literature, insecureness designates the state of being exposed to risk or anxiety."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insecurity]] | noun | **1.** The state of being subject to danger or injury.<br>**2.** The anxiety you experience when you feel vulnerable and insecure. | *"I have certainly never borrowed any money on such an insecurity."* — George Eliot, *Middlemarch* |
| [[manicure]] | noun | **1.** Professional care for the hands and fingernails.<br>**2.** Trim carefully and neatly. | *"She laughed at the gold brushes and gold manicure set, the polished array of boots, the fine silk and linen laid out on his bed, the perfume of sandalwood and Russian leather and eau de cologne."* — Anthony Pryde, *Nightfall* |
| [[manicurist]] | noun | **1.** A beautician who cleans and trims and polishes the fingernails. | *"In academic literature, manicurist designates a beautician who cleans and trims and polishes the fingernails."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncurrent]] | adjective | **1.** Not current or belonging to the present time. | *"In academic literature, noncurrent designates not current or belonging to the present time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonoccurrence]] | noun | **1.** Absence by virtue of not occurring. | *"In academic literature, nonoccurrence designates absence by virtue of not occurring."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[occur]] | verb | **1.** Come to pass.<br>**2.** Come to one's mind; suggest itself. | *"We have a Ramification meeting, too, on Wednesday afternoon, and the inconvenience is very serious.” “It is not likely to occur again,” said I, smiling."* — Charles Dickens, *Bleak House* |
| [[occurrence]] | noun | **1.** An event that happens.<br>**2.** An instance of something occurring. | *"All the occurrence of my fortune since Hath been between this lady and this lord."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[occurrent]] | noun | **1.** An event that happens.<br>**2.** Presently occurring (either causally or incidentally). | *"So tell him, with the occurrents more and less, Which have solicited."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[overcurious]] | adjective | **1.** Showing excessive curiosity. | *"The second question is not less delicate; and the flattering prospect of its being merely hypothetical forbids an overcurious discussion of it."* — Alexander Hamilton, *The Federalist Papers* |
| [[pedicure]] | noun | **1.** Professional care for the feet and toenails.<br>**2.** Care for one's feet by cutting and shaping the nails, etc. | *"In academic literature, pedicure designates professional care for the feet and toenails."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precursor]] | noun | **1.** A substance from which another substance is formed (especially by a metabolic reaction).<br>**2.** A person who goes before or announces the coming of another. | *"We are concerned less with John as precursor than as teacher and thinker."* — T. R. Glover, *The Jesus of History* |
| [[precursory]] | adjective | **1.** Warning of future misfortune. | *"In academic literature, precursory designates warning of future misfortune."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[procurable]] | adjective | **1.** Capable of being obtained. | *"Hong Kong, where East and West meet, 4; essentials of outfit procurable cheap at, 4, 5; 240."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[procural]] | noun | **1.** The act of getting possession of something. | *"In academic literature, procural designates the act of getting possession of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[procurance]] | noun | **1.** The act of getting possession of something. | *"In academic literature, procurance designates the act of getting possession of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[procurator]] | noun | **1.** A person authorized to act for another.<br>**2.** (ancient rome) someone employed by the roman emperor to manage finance and taxes. | *"As well had Pilate and I been known to each other before ever he journeyed out to be procurator over the Semitic volcano of Jerusalem."* — Jack London, *The Jacket (The Star-Rover)* |
| [[procure]] | verb | **1.** Get by special effort.<br>**2.** Arrange for sexual partners for others. | *"Proceed, Solinus, to procure my fall, And by the doom of death end woes and all."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[procurement]] | noun | **1.** The act of getting possession of something. | *"The man who understands those principles best will be least likely to resort to oppressive expedients, or sacrifice any particular class of citizens to the procurement of revenue."* — Alexander Hamilton, *The Federalist Papers* |
| [[procurer]] | noun | **1.** Someone who procures customers for whores (in england they call a pimp a ponce).<br>**2.** Someone who obtains or acquires. | *"In academic literature, procurer designates someone who procures customers for whores (in england they call a pimp a ponce)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[procuress]] | noun | **1.** A woman pimp. | *"In academic literature, procuress designates a woman pimp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recur]] | verb | **1.** Happen or occur again.<br>**2.** Return in thought or speech to something. | *"I was not free to resume the interrupted chain of my reflections till bedtime: even then a teacher who occupied the same room with me kept me from the subject to which I longed to recur, by a prolonged effusion of small talk."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[recurrence]] | noun | **1.** Happening again (especially at regular intervals). | *"And then, for half-an-hour, ten minutes, or as long as an hour or so, I would wander erratically and foolishly through the stored memories of my eternal recurrence on earth."* — Jack London, *The Jacket (The Star-Rover)* |
| [[recurrent]] | adjective | **1.** Recurring again and again. | *"You had better go down.” Bathsheba said nothing; but he could distinctly hear her rhythmical pants, and the recurrent rustle of the sheaf beside her in response to her frightened pulsations."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[recurrently]] | adverb | **1.** In a recurrent manner. | *"In academic literature, recurrently designates in a recurrent manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recurring]] | verb | **1.** Happen or occur again.<br>**2.** Return in thought or speech to something. | *"Especially at the recurring periods of financial stress, such as occurred in 1893, 1903, and 1907, our banking machinery showed itself to be wofully unequal to the strain put upon it."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[recursion]] | noun | **1.** (mathematics) an expression such that each term is generated by repeating a particular mathematical operation. | *"In academic literature, recursion designates (mathematics) an expression such that each term is generated by repeating a particular mathematical operation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recursive]] | adjective | **1.** Of or relating to a recursion. | *"In academic literature, recursive designates of or relating to a recursion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secure]] | verb | **1.** Get by special effort.<br>**2.** Cause to be firmly attached. | *"Sons, We’ll higher to the mountains; there secure us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[securely]] | adverb | **1.** In a secure manner; in a manner free from danger.<br>**2.** In a confident and unselfconscious manner. | *"By heaven, these scroyles of Angiers flout you, kings, And stand securely on their battlements As in a theatre, whence they gape and point At your industrious scenes and acts of death."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[secureness]] | noun | **1.** The state of freedom from fear or danger.<br>**2.** The quality of being fixed in place as by some firm attachment. | *"In academic literature, secureness designates the state of freedom from fear or danger."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[securer]] | noun | **1.** Someone who obtains or acquires.<br>**2.** Free from fear or doubt; easy in mind. | *"It was pierced in the brim for a hat-securer, but the elastic was missing."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[security]] | noun | **1.** The state of being free from danger or injury.<br>**2.** Defense against financial failure; financial independence. | *"He would not take his band and yours, he liked not the security."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sinecure]] | noun | **1.** A benefice to which no spiritual or pastoral duties are attached.<br>**2.** An office that involves minimal duties. | *"By some writers this office is called a sinecure."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[uncured]] | adjective | **1.** Not seasoned. | *"Madam M----, the mother of twelve children, had been quite shattered in mind by the death of her husband, and had been actually sent away uncured from an asylum."* — Classic Author, *The wonders of prayer* |
| [[uncurl]] | verb | **1.** Move out of a curled position. | *"What signifies my deadly-standing eye, My silence and my cloudy melancholy, My fleece of woolly hair that now uncurls Even as an adder when she doth unroll To do some fatal execution?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uncurled]] | verb | **1.** Move out of a curled position.<br>**2.** Not curled. | *"Would you mind if I wear you to the party just this once?" The poor little caterpillar uncurled himself."* — Charlotte B. Herr, *How Freckle Frog Made Herself Pretty* |
| [[uncurtained]] | adjective | **1.** Not provided with curtains. | *"M. showed her husband in some ridiculous light, or mercilessly uncurtained his crude, narrow-minded opinions and ideas."* — Effie Afton, *Eventide* |
| [[undercurrent]] | noun | **1.** A subdued emotional quality underlying an utterance; implicit meaning.<br>**2.** A current below the surface of a fluid. | *"For even when I was there the undercurrent of discontent in the province was visible."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[unprocurable]] | adjective | **1.** Not capable of being obtained. | *"In academic literature, unprocurable designates not capable of being obtained."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Movement & Speed]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CUR
  </div>
</div>
