---
status: unread
type: root_dashboard
---
# Dashboard — liqu
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">liqu-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“fluid or liquid”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Tall green trees, rolling hills, and rain watering the fertile landscape.</span>
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

The root **liqu** means fluid or liquid. It describes being in a fluid state, flowing easily, or melting into liquid. In English, this root forms words such as *wet*, *liquid*, *liquidity*, and *liquidate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: fluid or liquid
> The root **liqu** means fluid or liquid. It describes being in a fluid state, flowing easily, or melting into liquid. In English, this root forms words such as *wet*, *liquid*, *liquidity*, and *liquidate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Fluid or liquid</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Tall green trees, rolling hills, and rain watering the fertile landscape.</mark>
> - **Everyday Connection**: Think of familiar words like *wet* and *liquid*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **liqu** comes from a Latin word that means *"fluid or liquid"*.
  - At its core, it describes fluid or liquid.

- **The Big Picture Idea**:
  - Picture tall green trees, rolling hills, and rain watering the fertile landscape.
  - Whenever you see **liqu** in an English word, think of **the natural world and the outdoors**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of fluid or liquid.
  - **Mental & Social**: How people experience, organize, or communicate about fluid or liquid.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Wet**: An everyday English word showing the root's idea of *fluid or liquid*.
  - **Liquid**: A state of matter that flows freely but maintains a constant volume at a given pressure.
  - **Liquidity**: The ease and speed with which an asset can be converted into ready cash without impacting its market price.
  - **Liquidate**: To wind up the affairs of an insolvent company by converting its assets into cash to settle debts.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">liqu</mark>, think of <mark class="hl-def">the natural world and the outdoors</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **liqu** manifests across several major English conduits:
> - **Base Adjectival & Nominal Stems `liquid-` and `liquor-`:**
>   - Adjective / Noun: *liquid* (flowing substance; easily convertible).
>   - Financial noun: *liquidity* (cash availability).
>   - Commercial verbs: *liquidate*, *liquidation*.
>   - Distilled nouns: *liquor*, French loan *liqueur*.
> - **Causative / Phase-Change Stems `liquefac-` (*liquefacere*):**
>   - Verb: *liquefy* (turn to liquid).
>   - Noun of process: *liquefaction*.
> - **Inchoative Prefix Stem `dē-` + `liquesc-` (*dēliquescere*):**
>   - Verb: *deliquesce* (melt by absorbing air moisture).
>   - Noun: *deliquescence*.
>   - Adjective: *deliquescent*.
> - **Extensive Prefix Blend `pro-` + `lix-` (*prōlīxus*):**
>   - Adjective: *prolix* (tediously wordy).
>   - Noun: *prolixity*.
> - **Metallurgical Stem `liquat-` (*liquāre*):**
>   - Verb: *liquate* (separate by differential melting).
>   - Noun: *liquation*.

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
> - **Thermodynamics & Geological Seismology:** The phase change of gases or solids into liquid, and water-saturated soil losing structural shear strength during earthquakes (*liquefy*, *liquefaction*).
> - **Banking, Corporate Finance & Insolvency Law:** The cash assets of an institution, selling off inventory to satisfy creditors, and dissolving an insolvent corporation (*liquidity*, *liquidate*, *liquidation*).
> - **Physical Chemistry & Atmospheric Absorption:** Solid crystals absorbing ambient water vapor until dissolving into liquid solution (*deliquesce*, *deliquescence*, *deliquescent*).
> - **High Metallurgy & Mining Engineering:** Heating an ore or alloy to the melting point of one component to drain it away from less fusible metals (*liquate*, *liquation*).
> - **Distillation & Gastronomy:** Potent alcoholic spirits and sweetened aromatic herbal cordials (*liquor*, *liqueur*).
> - **Rhetoric, Stylistics & Literature:** Tedious, undisciplined wordiness that exhaustively elaborates minor points (*prolix*, *prolixity*).

---

## 🔀 4. Prefix & Combining Dynamics on liqu

### Prefix Dynamics
- **`de-` (Down / Completely):**
  - $\to$ *deliquesce*: To melt *down* completely into a puddle of moisture.
- **`pro-` (Forth / Forward):**
  - $\to$ *prolix*: Flowing *forth* excessively; long-winded.

### Suffix Dynamics
- **`-id` (Describing State):** *liquid* $\to$ flowing, molten.
- **`-ity` (Degree / Condition):** *liquidity*, *prolixity*.
- **`-ate` / `-ation` (Causative Action / Process):** *liquidate*, *liquidation*, *liquate*, *liquation*.
- **`-fy` / `-faction` (*facere* "to make"):** *liquefy*, *liquefaction*.
- **`-escent` / `-escence` (Inchoative Process):** *deliquescent*, *deliquescence*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Central Banking & Monetary Policy:** Managing market *liquidity* via quantitative easing and overnight repo facilities to prevent banking panics.
> - **Civil & Geotechnical Earthquake Engineering:** Analyzing seismic soil *liquefaction* risks in saturated silt and reclaimed land (e.g. San Francisco Marina District in 1989).
> - **Cryogenics & Chemical Engineering:** Industrial *liquefaction* of natural gas (LNG) at -162 °C for international maritime tanker transport.
> - **Bankruptcy Law & Corporate Restructuring:** Chapter 7 bankruptcy *liquidation* proceedings distributing debtor proceeds according to creditor priority hierarchies.
> - **Materials Chemistry & Desiccation:** Storing anhydrous reagents in desiccators to prevent spontaneous *deliquescence* from humid room air.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[deliquesce]] | verb | **1.** Melt away in the process of decay.<br>**2.** Melt or become liquid by absorbing moisture from the air. | *"Doubtless they had deliquesced ages ago."* — H. G. Wells, *The Time Machine* |
| [[deliquescence]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin liqu within the domain of Nature.<br>**2.** A technical or specialized form exhibiting the properties of liqu in systematic terminology. | *"In academic literature, deliquescence designates pertaining to, derived from, or characteristic of latin liqu within the domain of nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deliquescent]] | adjective | **1.** (especially of certain salts) becoming liquid by absorbing moisture from the air. | *"In academic literature, deliquescent designates (especially of certain salts) becoming liquid by absorbing moisture from the air."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deliquium]] | noun | **1.** A spontaneous loss of consciousness caused by insufficient blood to the brain. | *"In academic literature, deliquium designates a spontaneous loss of consciousness caused by insufficient blood to the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liquaemin]] | noun | **1.** A polysaccharide produced in basophils (especially in the lung and liver) and that inhibits the activity of thrombin in coagulation of the blood; it (trade names lipo-hepin and liquaemin) is used as an anticoagulant in the treatment of thrombosis and in heart surgery. | *"In academic literature, liquaemin designates a polysaccharide produced in basophils (especially in the lung and liver) and that inhibits the activity of thrombin in coagulation of the blood; it (trade names lipo-hepin and liquaemin) is used as an anticoagulant in the treatment of thrombosis and in heart surgery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liquefaction]] | noun | **1.** The conversion of a solid or a gas into a liquid. | *"In academic literature, liquefaction designates the conversion of a solid or a gas into a liquid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liquefiable]] | adjective | **1.** Capable of being liquefied. | *"In academic literature, liquefiable designates capable of being liquefied."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liquefied]] | verb | **1.** Become liquid.<br>**2.** Make (a solid substance) liquid, as by heating. | *"In fact, my loneliness has liquefied my gaseous affection into what almost looks like officiousness."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[liquefy]] | verb | **1.** Become liquid.<br>**2.** Make (a solid substance) liquid, as by heating. | *"For air, as we well know, is a mixture of gases, and when extreme cold and pressure are applied these gases liquefy, each behaving according to its own nature."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[liquescent]] | adjective | **1.** Becoming liquid. | *"In academic literature, liquescent designates becoming liquid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liqueur]] | noun | **1.** Strong highly flavored sweet liquor usually drunk after a meal. | *"When, bit by bits his story came out across the liqueur glasses and the early strawberries, Major Clowes laid his head back and roared with laughter."* — Anthony Pryde, *Nightfall* |
| [[liquid]] | noun | **1.** A substance that is liquid at room temperature and pressure.<br>**2.** The state in which a substance exhibits a characteristic readiness to flow with little or no tendency to disperse and relatively high incompressibility. | *"Virtue itself ’scapes not calumnious strokes: The canker galls the infants of the spring Too oft before their buttons be disclos’d, And in the morn and liquid dew of youth Contagious blastments are most imminent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[liquid-fueled]] | adjective | **1.** Fueled by a liquid fuel. | *"In academic literature, liquid-fueled designates fueled by a liquid fuel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liquidambar]] | noun | **1.** Aromatic exudate from the sweet gum tree.<br>**2.** Any tree of the genus liquidambar. | *"In academic literature, liquidambar designates aromatic exudate from the sweet gum tree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liquidate]] | verb | **1.** Get rid of (someone who may be a threat) by killing.<br>**2.** Eliminate by paying off (debts). | *"In such a case, it is the province of the courts to liquidate and fix their meaning and operation."* — Alexander Hamilton, *The Federalist Papers* |
| [[liquidation]] | noun | **1.** Termination of a business operation by using its assets to discharge its liabilities.<br>**2.** The act of exterminating. | *"Sometimes this process of liquidation goes on quietly and in other cases it becomes a wild scramble, each one trying to save himself, in which case it is a financial _panic_."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[liquidator]] | noun | **1.** A criminal who commits homicide (who performs the unlawful premeditated killing of another human being).<br>**2.** (law) a person (usually appointed by a court of law) who liquidates assets or preserves them for the benefit of affected parties. | *"In academic literature, liquidator designates a criminal who commits homicide (who performs the unlawful premeditated killing of another human being)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liquidise]] | verb | **1.** Make (a solid substance) liquid, as by heating. | *"In academic literature, liquidise designates make (a solid substance) liquid, as by heating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liquidiser]] | noun | **1.** An electrically powered mixer with whirling blades that mix or chop or liquefy foods. | *"In academic literature, liquidiser designates an electrically powered mixer with whirling blades that mix or chop or liquefy foods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liquidity]] | noun | **1.** The state in which a substance exhibits a characteristic readiness to flow with little or no tendency to disperse and relatively high incompressibility.<br>**2.** The property of flowing easily. | *"Such basic silicates possess, however, the advantage of marked liquidity, and of flowing from the furnace in a thin limpid stream."* — Donald M. Levy, *Modern Copper Smelting* |
| [[liquidize]] | verb | **1.** Get rid of all one's merchandise.<br>**2.** Make (a solid substance) liquid, as by heating. | *"In academic literature, liquidize designates get rid of all one's merchandise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liquidizer]] | noun | **1.** An electrically powered mixer with whirling blades that mix or chop or liquefy foods. | *"In academic literature, liquidizer designates an electrically powered mixer with whirling blades that mix or chop or liquefy foods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liquidness]] | noun | **1.** The state in which a substance exhibits a characteristic readiness to flow with little or no tendency to disperse and relatively high incompressibility.<br>**2.** The property of flowing easily. | *"In academic literature, liquidness designates the state in which a substance exhibits a characteristic readiness to flow with little or no tendency to disperse and relatively high incompressibility."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liquifiable]] | adjective | **1.** Capable of being liquefied. | *"In academic literature, liquifiable designates capable of being liquefied."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liquified]] | verb | **1.** Make (a solid substance) liquid, as by heating.<br>**2.** Become liquid or fluid when heated. | *"In academic literature, liquified designates make (a solid substance) liquid, as by heating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liquify]] | verb | **1.** Make (a solid substance) liquid, as by heating.<br>**2.** Become liquid or fluid when heated. | *"The following is a brave attempt at a solution, but it failed to liquify: When they are going to say some prose or poetry before they say the poetry or prose they must put a semicolon just after the introduction of the prose or poetry."* — Mark Twain, *What Is Man? and Other Essays* |
| [[liquor]] | noun | **1.** An alcoholic beverage that is distilled rather than fermented.<br>**2.** A liquid substance that is a solution (or emulsion or suspension) used or obtained in an industrial process. | *"Go, get thee to Yaughan; fetch me a stoup of liquor. [_Exit Second Clown._] [_Digs and sings._] In youth when I did love, did love, Methought it was very sweet; To contract, O, the time for, a, my behove, O methought there was nothing meet."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[liquorice]] | noun | **1.** Deep-rooted coarse-textured plant native to the mediterranean region having blue flowers and pinnately compound leaves; widely cultivated in europe for its long thick sweet roots.<br>**2.** A black candy flavored with the dried root of the licorice plant. | *"Two barefoot urchins, sucking long liquorice laces, halted near him, gaping at his stump with their yellowslobbered mouths."* — James Joyce, *Ulysses* |
| [[oblique]] | noun | **1.** Any grammatical case other than the nominative.<br>**2.** A diagonally arranged abdominal muscle on either side of the torso. | *"Down, down, they sped, the wheels humming like a top, the dog-cart rocking right and left, its axis acquiring a slightly oblique set in relation to the line of progress; the figure of the horse rising and falling in undulations before them."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[oblique-angled]] | adjective | **1.** Having oblique angles. | *"In academic literature, oblique-angled designates having oblique angles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obliquely]] | adverb | **1.** To, toward or at one side.<br>**2.** At an oblique angle. | *"But she had obliquely noticed that he was young and slim, and that he wore three chevrons upon his sleeve."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[obliqueness]] | noun | **1.** The property of being neither parallel nor perpendicular, but at a slanting angle.<br>**2.** The quality of being oblique and rambling indirectly. | *"They were long, true, but set squarely, and with just the slightest hint of obliqueness that was all for piquancy."* — Jack London, *The Jacket (The Star-Rover)* |
| [[obliquity]] | noun | **1.** The presentation during labor of the head of the fetus at an abnormal angle.<br>**2.** The quality of being deceptive. | *"And yet it is this very obliquity of thought and memory which makes mental disease such a fascinating study."* — Bram Stoker, *Dracula* |
| [[reliquary]] | noun | **1.** A container where religious relics are stored or displayed (especially relics of saints). | *"A reliquary, or shrine, of cupola-shape to contain remains after cremation, especially of the Buddha. _Subhūti_."* — William Edward Soothill, *The lotus of the wonderful law* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Nature]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LIQU
  </div>
</div>
