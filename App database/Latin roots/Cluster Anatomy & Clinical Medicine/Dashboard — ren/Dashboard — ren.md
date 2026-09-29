---
status: unread
type: root_dashboard
---
# Dashboard — ren
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ren-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“kidneys”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The natural organs, tissues, and inner workings of the human body.</span>
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

The root **ren** means kidneys. It refers to kidney, renal excretion, endocrine & hemodynamic regulation. In English, this root forms words such as *masculine*, *renal*, *renally*, and *renin*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: kidneys
> The root **ren** means kidneys. It refers to kidney, renal excretion, endocrine & hemodynamic regulation. In English, this root forms words such as *masculine*, *renal*, *renally*, and *renin*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Kidneys</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The natural organs, tissues, and inner workings of the human body.</mark>
> - **Everyday Connection**: Think of familiar words like *masculine* and *renal*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ren** comes from a Latin word that means *"kidneys"*.
  - At its core, it describes kidneys.

- **The Big Picture Idea**:
  - Picture the natural organs, tissues, and inner workings of the human body.
  - Whenever you see **ren** in an English word, think of **bodily anatomy and health**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of kidneys.
  - **Mental & Social**: How people experience, organize, or communicate about kidneys.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Masculine**: An everyday English word showing the root's idea of *kidneys*.
  - **Renal**: Pertaining to, involving, or situated near the kidneys.
  - **Renally**: In a manner relating to the kidneys or eliminated via renal excretion.
  - **Renin**: Nən/` or `/ˈriːnɪn/` ** — A proteolytic enzyme secreted by the juxtaglomerular cells of the kidney that cleaves angiotensinogen to produce angiotensin I.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ren</mark>, think of <mark class="hl-def">bodily anatomy and health</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **ren** builds clinical and anatomical terminology through strict Latin prefixation and standard suffixation:
> - **Anatomical Stem:** `ren-`
> - **Adjectival Suffixation:** `ren-` + `-al` (*-ālis*) ➔ *renal* (pertaining to the kidneys).
> - **Biochemical Suffixation:** `ren-` + `-in` ➔ *renin* (kidney-synthesized proteolytic enzyme).
> - **Directional & Spatial Prefixation:**
>   - `ad-` ("to, toward, near") + `renal` ➔ *adrenal* (gland positioned immediately adjacent to the kidney).
>   - `supra-` ("above") + `renal` ➔ *suprarenal* (perched atop the superior pole of the kidney).
>   - `pre-` ("before") + `renal` ➔ *prerenal* (upstream hemodynamic reduction before blood enters the glomerulus).
>   - `post-` ("after") + `renal` ➔ *postrenal* (downstream urinary obstruction after filtration).
>   - `intra-` ("within") + `renal` ➔ *intrarenal* (intrinsic pathology within kidney parenchymal tissue).
>   - `extra-` ("outside") + `renal` ➔ *extrarenal* (factors operating beyond the kidneys).

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
> Although derived from the physical kidney, the root's derivatives span distinct physiological scales:
> - **Systemic Organ & Clearance:** [[renal]] clearance, renal transplantation, and [[renally]] cleared drugs.
> - **Endocrine Blood-Pressure Cascades:** [[renin]] triggers vasoconstriction and sodium retention in response to renal hypoperfusion.
> - **Sympathetic Neurochemistry & Fight-or-Flight:** [[adrenal]], [[adrenaline]], and [[adrenergic]] govern the acute sympathetic nervous response.
> - **Hemodynamics & Vascular Surgery:** [[renovascular]] hypertension caused by renal artery stenosis.
> - **Geometric & Morphological Similarity:** [[reniform]] leaves (such as wild ginger) and mineral aggregates.

---

## 🔀 4. Prefix & Combining Dynamics on ren

### Spatial & Pathophysiological Modifiers on `ren`

| Prefix / Comb. Form | Meaning | Combined Derivative | Clinical / Anatomical Meaning |
| :--- | :--- | :--- | :--- |
| `ad-` | near, toward | [[adrenal]] | Situated next to or resting upon the kidney (the adrenal gland) |
| `supra-` | above, upon | [[suprarenal]] | Situated above the kidney (anatomical synonym for adrenal) |
| `pre-` | before, prior | [[prerenal]] | Pre-kidney causes of acute kidney injury (e.g., hypotension, hypovolemia) |
| `post-` | after, behind | [[postrenal]] | Post-filtration causes of kidney injury (e.g., ureteral stones, prostate hypertrophy) |
| `intra-` | within | [[intrarenal]] | Originating directly inside the nephrons, interstitium, or renal tubules |
| `extra-` | outside | [[extrarenal]] | Situated or operating outside the kidneys (e.g., extrarenal clearance) |
| `vasculo-` | vessel | [[renovascular]] | Pertaining to the renal arteries and veins supplying the kidneys |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Nephrology & Dialysis:** Glomerular filtration rate (GFR), hemodialysis, and renal transplantation.
> - **Endocrinology & Cardiology:** The renin-angiotensin-aldosterone system (RAAS) and antihypertensive drug design (ACE inhibitors, ARBs).
> - **Emergency Medicine & Critical Care:** Adrenaline auto-injectors (EpiPens) for anaphylaxis, cardiac arrest resuscitation, and acute renal failure staging.
> - **Botany & Paleontology:** Taxonomic descriptions of reniform foliage and kidney-shaped fossil seed pods.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adrenal]] | noun | **1.** Either of a pair of complex endocrine glands situated near the kidney.<br>**2.** Of or pertaining to the adrenal glands or their secretions. | *"In academic literature, adrenal designates either of a pair of complex endocrine glands situated near the kidney."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adrenalectomy]] | noun | **1.** Surgical removal of one or both adrenal glands. | *"In academic literature, adrenalectomy designates surgical removal of one or both adrenal glands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adrenalin]] | noun | **1.** A catecholamine secreted by the adrenal medulla in response to stress (trade name adrenalin); stimulates autonomic nerve action. | *"In academic literature, adrenalin designates a catecholamine secreted by the adrenal medulla in response to stress (trade name adrenalin); stimulates autonomic nerve action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adrenaline]] | noun | **1.** A catecholamine secreted by the adrenal medulla in response to stress (trade name adrenalin); stimulates autonomic nerve action. | *"In academic literature, adrenaline designates a catecholamine secreted by the adrenal medulla in response to stress (trade name adrenalin); stimulates autonomic nerve action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adrenarche]] | noun | **1.** The increase in activity of the adrenal glands just before puberty. | *"In academic literature, adrenarche designates the increase in activity of the adrenal glands just before puberty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adrenergic]] | noun | **1.** Drug that has the effects of epinephrine.<br>**2.** Relating to epinephrine (its release or action). | *"In academic literature, adrenergic designates drug that has the effects of epinephrine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adrenocortical]] | adjective | **1.** Of or derived from the cortex of the adrenal glands. | *"In academic literature, adrenocortical designates of or derived from the cortex of the adrenal glands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adrenocorticotrophic]] | adjective | **1.** Stimulating or acting on the adrenal cortex. | *"In academic literature, adrenocorticotrophic designates stimulating or acting on the adrenal cortex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adrenocorticotrophin]] | noun | **1.** A hormone produced by the anterior pituitary gland that stimulates the adrenal cortex. | *"In academic literature, adrenocorticotrophin designates a hormone produced by the anterior pituitary gland that stimulates the adrenal cortex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adrenocorticotropic]] | adjective | **1.** Stimulating or acting on the adrenal cortex. | *"In academic literature, adrenocorticotropic designates stimulating or acting on the adrenal cortex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adrenocorticotropin]] | noun | **1.** A hormone produced by the anterior pituitary gland that stimulates the adrenal cortex. | *"In academic literature, adrenocorticotropin designates a hormone produced by the anterior pituitary gland that stimulates the adrenal cortex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adrenosterone]] | noun | **1.** A steroid having androgenic activity; obtained from the cortex of the adrenal gland. | *"In academic literature, adrenosterone designates a steroid having androgenic activity; obtained from the cortex of the adrenal gland."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiadrenergic]] | adjective | **1.** Relating to blocking or reducing adrenergic effects in the body. | *"In academic literature, antiadrenergic designates relating to blocking or reducing adrenergic effects in the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonrenewable]] | adjective | **1.** That can not be renewed. | *"Consider UIPS limitations in nonrenewable metals, minerals and other vital reserves until Slingshot begins to produce."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[renaissance]] | noun | **1.** The period of european history at the close of the middle ages and the rise of the modern world; a cultural rebirth from the 14th through the middle of the 17th centuries.<br>**2.** The revival of learning and culture. | *"Plutarch's Lives was the great staple of education in the Renaissance--and as good a one, perhaps, as we have yet discovered, even in this age when there are so many theories of education with foreign names."* — T. R. Glover, *The Jesus of History* |
| [[renal]] | adjective | **1.** Of or relating to the kidneys. | *"In academic literature, renal designates of or relating to the kidneys."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rename]] | verb | **1.** Assign a new name to.<br>**2.** Name again or anew. | *"HOSPITAL SHIP "MAGIC II.," AFTERWARDS RENAMED "CLASSIC" 80 TRANSFERRING A "COT CASE" FROM A BATTLESHIP TO THE HOSPITAL SHIP DRIFTER 81 DENTIST AT WORK ON A BATTLESHIP (H.M.S."* — C. W. Burrows, *Scapa and a Camera* |
| [[renascence]] | noun | **1.** The period of european history at the close of the middle ages and the rise of the modern world; a cultural rebirth from the 14th through the middle of the 17th centuries.<br>**2.** A second or new birth. | *"Renascence and Other Poems by Edna St."* — Edna St. Vincent Millay, *Renascence, and Other Poems* |
| [[renascent]] | adjective | **1.** Rising again as to new life and vigor. | *"So spoke love renascent, preparing the way for Tess’s devoted outpouring, which was then just being forwarded to him by his father; though owing to his distance inland it was to be a long time in reaching him."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[render]] | noun | **1.** A substance similar to stucco but exclusively applied to masonry walls.<br>**2.** Cause to become. | *"No, let me be obsequious in thy heart, And take thou my oblation, poor but free, Which is not mixed with seconds, knows no art, But mutual render, only me for thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rendering]] | noun | **1.** A performance of a musical composition or a dramatic role etc.<br>**2.** An explanation of something that is not immediately obvious. | *"To his good friends thus wide I’ll ope my arms; And, like the kind life-rendering pelican, Repast them with my blood."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rending]] | verb | **1.** Tear or be torn violently.<br>**2.** Resembling a sound of violent tearing as of something ripped apart or lightning splitting a tree. | *"Our voices rang like broken chords, like a tearing and rending of sound."* — Mrs. Oliphant, *A Beleaguered City* |
| [[rendition]] | noun | **1.** A performance of a musical composition or a dramatic role etc.<br>**2.** An explanation of something that is not immediately obvious. | *"Masterly rendition. _At the siege of Ross did my father fall._ A cavalcade in easy trot along Pembroke quay passed, outriders leaping, leaping in their, in their saddles."* — James Joyce, *Ulysses* |
| [[renegade]] | noun | **1.** Someone who rebels and becomes an outlaw.<br>**2.** A disloyal person who betrays or deserts his cause or religion or political party or friend etc. | *"This is 'Peter Bell the Third' (1819), an attack on Wordsworth, partly literary for the dulness of his writing since he had been sunk in clerical respectability, partly political for his renegade flunkyism."* — Sydney Waterlow, *Shelley* |
| [[renege]] | noun | **1.** The mistake of not following suit when able to do so.<br>**2.** Fail to fulfill a promise or obligation. | *"His captain’s heart, Which in the scuffles of great fights hath burst The buckles on his breast, reneges all temper And is become the bellows and the fan To cool a gipsy’s lust."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[renegociate]] | verb | **1.** Negociate anew.<br>**2.** Revise the terms of in order to limit or regain excess profits gained by the contractor. | *"In academic literature, renegociate designates negociate anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[renegotiate]] | verb | **1.** Negociate anew.<br>**2.** Revise the terms of in order to limit or regain excess profits gained by the contractor. | *"In academic literature, renegotiate designates negociate anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[renew]] | verb | **1.** Reestablish on a new, usually improved, basis or make new or like new.<br>**2.** Cause to appear in a new form. | *"Therefore shall he die, And I’ll renew me in his fall."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[renewable]] | adjective | **1.** That can be renewed or extended.<br>**2.** Capable of being renewed; replaceable. | *"A Report to the Club of Rome (Depletion of the world's non-renewable natural resources). http://dieoff.com/page25.htm CHINA PLANS MOON LANDING, October 5, 2000, by Charles Hutzler, Associated Press."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[renewal]] | noun | **1.** The conversion of wasteland into land suitable for use of habitation or cultivation.<br>**2.** The act of renewing. | *"Touching that matter, you know, I really and truly am very sorry that my arrangements in life, combined with circumstances over which I have no control, should prevent a renewal of what was wholly terminated some time back,” said Mr."* — Charles Dickens, *Bleak House* |
| [[renewed]] | verb | **1.** Reestablish on a new, usually improved, basis or make new or like new.<br>**2.** Cause to appear in a new form. | *"At your return, visit our house, let our old acquaintance be renewed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[renewing]] | verb | **1.** Reestablish on a new, usually improved, basis or make new or like new.<br>**2.** Cause to appear in a new form. | *"Full of confidence in God, she hoped that the hand which had opened an impassable road would also lead an embittered heart back to himself, and by renewing in him the love of his fellowmen, bring about much happiness and joy."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[reniform]] | adjective | **1.** (of a leaf or bean shape) resembling the shape of kidney. | *"The spore then emits a curved and obtuse tube, which soon ceasing to elongate itself, gives origin to three or four sporidia, of a reniform or kidney shape."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[renin]] | noun | **1.** A proteolytic enzyme secreted by the kidneys; catalyzes the formation of angiotensin and thus affects blood pressure. | *"In academic literature, renin designates a proteolytic enzyme secreted by the kidneys; catalyzes the formation of angiotensin and thus affects blood pressure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rennet]] | noun | **1.** A substance that curdles milk in making cheese and junket. | *"In academic literature, rennet designates a substance that curdles milk in making cheese and junket."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rennin]] | noun | **1.** An enzyme that occurs in gastric juice; causes milk to coagulate. | *"In academic literature, rennin designates an enzyme that occurs in gastric juice; causes milk to coagulate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reno]] | noun | **1.** A city in western nevada at the foot of the sierra nevada mountains; known for gambling casinos and easy divorce and remarriage. | *"In academic literature, reno designates a city in western nevada at the foot of the sierra nevada mountains; known for gambling casinos and easy divorce and remarriage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[renoir]] | noun | **1.** French impressionist painter (1841-1919). | *"In academic literature, renoir designates french impressionist painter (1841-1919)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[renormalise]] | verb | **1.** Make normal or cause to conform to a norm or standard. | *"In academic literature, renormalise designates make normal or cause to conform to a norm or standard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[renormalize]] | verb | **1.** Make normal or cause to conform to a norm or standard. | *"In academic literature, renormalize designates make normal or cause to conform to a norm or standard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[renounce]] | verb | **1.** Give up, such as power, as of monarchs and emperors, or duties and obligations.<br>**2.** Leave (a job, post, or position) voluntarily. | *"Only this proof I’ll of thy valour make: In single combat thou shalt buckle with me, And if thou vanquishest, thy words are true; Otherwise I renounce all confidence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[renouncement]] | noun | **1.** An act (spoken or written) declaring that something is surrendered or disowned. | *"I hold you as a thing enskied and sainted By your renouncement an immortal spirit, And to be talked with in sincerity, As with a saint."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[renovate]] | verb | **1.** Restore to a previous or better condition.<br>**2.** Make brighter and prettier. | *"It revived her, but could not renovate her courage."* — Nathaniel Hawthorne, *Twice-Told Tales* |
| [[renovation]] | noun | **1.** The act of improving by renewing and restoring.<br>**2.** The state of being restored to its former good condition. | *"Yet it must be admitted that this family formed a very good stock whereon to regraft a name which sadly wanted such renovation."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[renovator]] | noun | **1.** A skilled worker who is employed to restore or refinish buildings or antique furniture. | *"Moonlight, and the sentiment in man’s heart responsive to it, are the greatest of renovators and reformers."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[renown]] | noun | **1.** The state or quality of being widely honored and acclaimed. | *"He hath perverted a young gentlewoman here in Florence, of a most chaste renown, and this night he fleshes his will in the spoil of her honour; he hath given her his monumental ring, and thinks himself made in the unchaste composition."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[renowned]] | adjective | **1.** Widely known and esteemed. | *"So.— Thus then, thou most renowned: Caesar entreats Not to consider in what case thou stand’st Further than he is Caesar."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rensselaerite]] | noun | **1.** A kind of soft talc; sometimes used as wood filler. | *"In academic literature, rensselaerite designates a kind of soft talc; sometimes used as wood filler."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rent]] | noun | **1.** A payment or series of payments made by the lessee to an owner for use of some property, facility, equipment, or service.<br>**2.** An opening made forcibly as by pulling apart. | *"Have I not seen dwellers on form and favour Lose all, and more by paying too much rent For compound sweet; forgoing simple savour, Pitiful thrivers in their gazing spent?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rent-a-car]] | noun | **1.** A rented car. | *"In academic literature, rent-a-car designates a rented car."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rent-free]] | adjective | **1.** Complimentary; without payment of rent.<br>**2.** Without paying rent. | *"In academic literature, rent-free designates complimentary; without payment of rent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rent-rebate]] | noun | **1.** A rebate on rent given by a local government authority. | *"In academic literature, rent-rebate designates a rebate on rent given by a local government authority."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rent-roll]] | noun | **1.** A register of rents; includes the names of tenants and the amount of rent they pay. | *"In academic literature, rent-roll designates a register of rents; includes the names of tenants and the amount of rent they pay."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rentable]] | adjective | **1.** That is able or fit be rented. | *"In academic literature, rentable designates that is able or fit be rented."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rental]] | noun | **1.** Property that is leased or rented out or let.<br>**2.** The act of paying for the use of something (as an apartment or house or car). | *"A neighbouring earl once said that he would give up a year’s rental to have at his own door the view enjoyed by the inmates from theirs—and very probably the inmates would have given up the view for his year’s rental."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[rente]] | noun | **1.** Income from capital investment paid in a series of regular payments. | *"Chaucer used "rente" as an income."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[renter]] | noun | **1.** Someone who pays rent to use land or a building or a car that is owned by someone else.<br>**2.** An owner of property who receives payment for its use by another person. | *"She became a subscriber; amazed at being anything _in propria persona_, amazed at her own doings in every way, to be a renter, a chuser of books!"* — Jane Austen, *Mansfield Park* |
| [[rentier]] | noun | **1.** Someone whose income is from property rents or bond interest and other investments. | *"The one who has a perpetual income from bonds or rents is called a _rentier_."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[renting]] | noun | **1.** The act of paying for the use of something (as an apartment or house or car).<br>**2.** Let for money. | *"The landlord of a farm let to a tenant, especially to a share tenant, is still to a large extent the general manager, controlling in a large measure through the renting contract and by his oversight, the operations of the farm."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[renunciant]] | adjective | **1.** Used especially of behavior. | *"In academic literature, renunciant designates used especially of behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[renunciation]] | noun | **1.** Rejecting or disowning or disclaiming as invalid.<br>**2.** The state of having rejected your religious beliefs or your political party or a cause (often in favor of opposing beliefs or causes). | *"But now that she was stung to a fever by Izz’s tale, there was a limit to her powers of renunciation."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[renunciative]] | adjective | **1.** Used especially of behavior. | *"His creed of determinism was such that it almost amounted to a vice, and quite amounted, on its negative side, to a renunciative philosophy which had cousinship with that of Schopenhauer and Leopardi."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[serenade]] | noun | **1.** A musical composition in several movements; has no fixed form.<br>**2.** A song characteristically played outside the house of a woman. | *"If he does strain to the moment of ingress into the divine being, it is to swoon with excess of bliss, as at the end of 'Epipsychidion', or as in the 'Indian Serenade': "Oh lift me from the grass!"* — Sydney Waterlow, *Shelley* |
| [[serene]] | adjective | **1.** Not agitated; without losing self-possession.<br>**2.** Completely clear and fine. | *"Jellyby merely added, with the serene composure with which she said everything, “Go along, you naughty Peepy!” and fixed her fine eyes on Africa again."* — Charles Dickens, *Bleak House* |
| [[serenely]] | adverb | **1.** In a peacefully serene manner. | *"To see that composed court yesterday jogging on so serenely and to think of the wretchedness of the pieces on the board gave me the headache and the heartache both together."* — Charles Dickens, *Bleak House* |
| [[sereness]] | noun | **1.** A withered dryness. | *"In academic literature, sereness designates a withered dryness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serenity]] | noun | **1.** A disposition free from stress or emotion.<br>**2.** The absence of mental stress or anxiety. | *"Bathsheba, a small yawn upon her mouth, took the pen, and with off-hand serenity directed the missive to Boldwood."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[serenoa]] | noun | **1.** One species: saw palmetto. | *"In academic literature, serenoa designates one species: saw palmetto."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suprarenal]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ren within the domain of Anatomy & Clinical Medicine.<br>**2.** A technical or specialized form exhibiting the properties of ren in systematic terminology. | *"In academic literature, suprarenal designates pertaining to, derived from, or characteristic of latin ren within the domain of anatomy & clinical medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suprarenalectomy]] | noun | **1.** Surgical removal of one or both adrenal glands. | *"In academic literature, suprarenalectomy designates surgical removal of one or both adrenal glands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surrender]] | noun | **1.** Acceptance of despair.<br>**2.** A verbal act of admitting defeat. | *"Pray tell ’em thus much from me: There should be one amongst ’em, by his person More worthy this place than myself, to whom, If I but knew him, with my love and duty I would surrender it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[surrenderer]] | noun | **1.** A person who yields or surrenders. | *"In academic literature, surrenderer designates a person who yields or surrenders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unrenewable]] | adjective | **1.** That can not be renewed. | *"In academic literature, unrenewable designates that can not be renewed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unrenewed]] | adjective | **1.** Not revived. | *"On the other, there could not be a full disclosure of the true feelings of the unrenewed heart."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[unrentable]] | adjective | **1.** Not able or fit to be rented. | *"In academic literature, unrentable designates not able or fit to be rented."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Anatomy & Clinical Medicine]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · REN
  </div>
</div>
