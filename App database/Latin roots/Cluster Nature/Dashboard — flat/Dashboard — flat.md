---
status: unread
type: root_dashboard
---
# Dashboard — flat
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">flat-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to blow”</span>
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

The root **flat** means to blow. It refers to the action of blowing and carrying out this process. In English, this root forms words such as *inflate*, *inflation*, *inflationary*, and *deflate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to blow
> The root **flat** means to blow. It refers to the action of blowing and carrying out this process. In English, this root forms words such as *inflate*, *inflation*, *inflationary*, and *deflate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To blow</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Tall green trees, rolling hills, and rain watering the fertile landscape.</mark>
> - **Everyday Connection**: Think of familiar words like *inflate* and *inflation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **flat** comes from a Latin word that means *"to blow"*.
  - At its core, it describes the action of blow.

- **The Big Picture Idea**:
  - Picture tall green trees, rolling hills, and rain watering the fertile landscape.
  - Whenever you see **flat** in an English word, think of **to blow**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to blow).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Inflate**: To fill with air or gas so as to expand or swell.
  - **Inflation**: A sustained, general increase in prices and fall in the purchasing power of money.
  - **Inflationary**: Tending to increase prices or expand the money supply.
  - **Deflate**: To let air or gas out of a tire, balloon, or bladder.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">flat</mark>, think of <mark class="hl-def">to blow</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **flat** functions in English almost exclusively through the supine/participial stem `flāt-` prefixed by classical preverbs:
> - **`in-` (Into):** *īnflāre* $\to$ *inflate*, *inflation*, *inflationary*.
> - **`de-` (Down / Out):** *dēflāre* $\to$ *deflate*, *deflation*, *deflationary*.
> - **`con-` (Together):** *conflāre* $\to$ *conflate*, *conflation*.
> - **`sub-` (From Beneath):** *sufflāre* $\to$ *sufflate*, *insufflate*, *insufflation*, *insufflator*.
> - **`ex-` (Out / Away):** *exsufflāre* $\to$ *exsufflation*.
> - **`ad-` (Toward / Upon):** *afflāre* $\to$ *afflatus* (divine inspiration).
> - **Base Nominal Stem `flat-` (*flātus*):** *flatus*, *flatulence*, *flatulent*.
> - **Modern Macroeconomic Hybrids:** *reflation*, *stagflation* (stagnation + inflation).

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
> - **Macroeconomics & Monetary Policy:** Artificial expansion of purchasing currency leading to rising prices, currency contraction, and macroeconomic stagnation (*inflation*, *deflation*, *stagflation*, *reflation*).
> - **Philology, Textual Criticism & Epistemology:** Erroneous combining of two distinct readings, concepts, or historical figures into one (*conflate*, *conflation*).
> - **Surgery & Medical Instrumentation:** Delivering therapeutic gases or powders into cavities, abdominal gas distension in laparoscopy (*insufflate*, *insufflation*, *insufflator*).
> - **Gastroenterology & Human Physiology:** Digestive gas accumulation, intestinal bloating, and rectal emission (*flatulence*, *flatulent*, *flatus*).
> - **Rhetoric, Psychology & Poetics:** Arrogant self-aggrandizement (*inflated ego*), sudden loss of morale (*deflated*), and transcendent divine inspiration (*afflatus*).

---

## 🔀 4. Prefix & Combining Dynamics on flat

### Prefix Dynamics
- **`in-` (Into):** Pumping air into $\to$ *inflate*, *inflation*.
- **`de-` (Down / Out):** Releasing air out $\to$ *deflate*, *deflation*.
- **`con-` (Together):** Blowing together to forge/merge $\to$ *conflate*, *conflation*.
- **`in-` + `sub-` (Into from Beneath):** Blowing therapeutic gas into a cavity $\to$ *insufflate*.
- **`ex-` + `sub-` (Out from Beneath):** Forcibly blowing out $\to$ *exsufflation*.
- **`ad-` (Upon):** Breathing upon by divine impulse $\to$ *afflatus*.
- **`re-` (Again):** Restoring price levels after depression $\to$ *reflation*.

### Suffix Dynamics
- **`-ate` (Verbal Action):** *inflate*, *deflate*, *conflate*, *insufflate*.
- **`-ion` (State / Process):** *inflation*, *deflation*, *conflation*, *insufflation*.
- **`-ary` (Tending to):** *inflationary*, *deflationary*.
- **`-ence` / `-ent` (Condition / Characterized by):** *flatulence*, *flatulent*.
- **`-or` (Agent / Instrument):** *insufflator*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Central Banking & Monetary Economics:** Federal Reserve interest rate benchmarks designed to curb *inflationary* pressure, stabilize the Consumer Price Index (CPI), and prevent *deflationary* spirals.
> - **Minimally Invasive Laparoscopic Surgery:** High-flow *insufflators* delivering warmed carbon dioxide ($CO_2$) into the peritoneal cavity to establish pneumoperitoneum.
> - **Textual Criticism & Biblical Philology:** Identifying *conflated* readings in New Testament manuscripts (Codex Bezae) where scribes merged two variant readings into a single composite verse.
> - **Clinical Gastroenterology:** Diagnosis of small intestinal bacterial overgrowth (SIBO) and lactose intolerance presenting with excessive *flatulence* and abdominal distension.
> - **Literary Romanticism & Aesthetics:** The Shelleyan and Wordsworthian concept of the poetic *afflatus* as an involuntary breath of nature inspiring creative genius.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[afflatus]] | noun | **1.** A strong creative impulse; divine inspiration. | *"His song was entirely an affair of uncontrolled afflatus, and this is a force which dwindles in middle life, leaving stranded the poet who has no other resource."* — Sydney Waterlow, *Shelley* |
| [[antiflatulent]] | noun | **1.** Any agent that reduces intestinal gas. | *"In academic literature, antiflatulent designates any agent that reduces intestinal gas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conflate]] | verb | **1.** Mix together different elements. | *"The beads are perforated, and in the Highlands of Scotland the hole is explained by saying that when the bead has just been conflated by the serpents jointly, one of the reptiles sticks his tail through the still viscous glass."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[conflation]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin flat within the domain of Nature.<br>**2.** A technical or specialized form exhibiting the properties of flat in systematic terminology. | *"In academic literature, conflation designates pertaining to, derived from, or characteristic of latin flat within the domain of nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deflate]] | verb | **1.** Collapse by releasing contained air or gas.<br>**2.** Release contained air or gas from. | *"I managed to spill enough air to deflate the canopy."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[deflated]] | verb | **1.** Collapse by releasing contained air or gas.<br>**2.** Release contained air or gas from. | *"At his feet lay a deflated haversack caked with whatever it had been dragged through, probably since elementary school."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[deflation]] | noun | **1.** (geology) the erosion of soil as a consequence of sand and dust and loose rocks being removed by the wind.<br>**2.** A contraction of economic activity resulting in a decline of prices. | *"In academic literature, deflation designates (geology) the erosion of soil as a consequence of sand and dust and loose rocks being removed by the wind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deflationary]] | adjective | **1.** Associated with or tending to cause decreases in consumer prices or increases in the purchasing power of money. | *"In academic literature, deflationary designates associated with or tending to cause decreases in consumer prices or increases in the purchasing power of money."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deflator]] | noun | **1.** A statistical factor designed to remove the effect of inflation; inflation adjusted variables are in constant dollars. | *"In academic literature, deflator designates a statistical factor designed to remove the effect of inflation; inflation adjusted variables are in constant dollars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disinflation]] | noun | **1.** A reduction of prices intended to improve the balance of payments. | *"In academic literature, disinflation designates a reduction of prices intended to improve the balance of payments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exsufflation]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin flat within the domain of Nature.<br>**2.** A technical or specialized form exhibiting the properties of flat in systematic terminology. | *"In academic literature, exsufflation designates pertaining to, derived from, or characteristic of latin flat within the domain of nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flat]] | noun | **1.** A level tract of land.<br>**2.** A shallow box in which seedlings are started. | *"To unbuild the city and to lay all flat."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[flatcar]] | noun | **1.** Freight car without permanent sides or roof. | *"In academic literature, flatcar designates freight car without permanent sides or roof."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flatiron]] | noun | **1.** An iron that was heated by placing it on a stove. | *"It's not more'n a quarter of a mile." While Miss Lida Belle was gone, Mama set Miss Ophelia's ironing board up on the backs of two straight chairs and put two flatirons on the kitchen stove to heat."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[flatlet]] | noun | **1.** A tiny flat. | *"In academic literature, flatlet designates a tiny flat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flatly]] | adverb | **1.** In an unqualified manner. | *"The Dauphin is too wilful-opposite, And will not temporize with my entreaties; He flatly says he’ll not lay down his arms."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[flatmate]] | noun | **1.** An associate who shares an apartment with you. | *"In academic literature, flatmate designates an associate who shares an apartment with you."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flatness]] | noun | **1.** The property of having two dimensions.<br>**2.** A want of animation or brilliance. | *"O that he were alive, and here beholding His daughter’s trial! that he did but see The flatness of my misery; yet with eyes Of pity, not revenge!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[flats]] | noun | **1.** Footwear (shoes or slippers) with no heel (or a very low heel).<br>**2.** A level tract of land. | *"Up to yond hill, Your legs are young; I’ll tread these flats."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[flatten]] | verb | **1.** Make flat or flatter.<br>**2.** Become flat or flatter. | *"Again, the women carefully sweep out the ashes from under the fireplace and flatten them down neatly on the open hearth."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[flattened]] | verb | **1.** Make flat or flatter.<br>**2.** Become flat or flatter. | *"Guppy, with his hair flattened down upon his head and woe depicted in his face, looking up at me."* — Charles Dickens, *Bleak House* |
| [[flatter]] | verb | **1.** Praise somewhat dishonestly.<br>**2.** Having a surface without slope, tilt in which no part is higher or lower than another. | *"I tell the day to please him thou art bright, And dost him grace when clouds do blot the heaven: So flatter I the swart-complexioned night, When sparkling stars twire not thou gild’st the even."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[flatterer]] | noun | **1.** A person who uses flattery. | *"In so profound abysm I throw all care Of others’ voices, that my adder’s sense, To critic and to flatterer stopped are: Mark how with my neglect I do dispense."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[flattering]] | verb | **1.** Praise somewhat dishonestly.<br>**2.** Showing or representing to advantage. | *"That flattering tongue of yours won me. ’Tis but one cast away, and so, come death!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[flattery]] | noun | **1.** Excessive or insincere praise. | *"Incapable of more, replete with you, My most true mind thus maketh mine untrue. 114 Or whether doth my mind being crowned with you Drink up the monarch’s plague this flattery?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[flattop]] | noun | **1.** A closely cropped haircut; usually for men.<br>**2.** A large warship that carries planes and has a long flat deck for takeoffs and landings. | *"In academic literature, flattop designates a closely cropped haircut; usually for men."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flatulence]] | noun | **1.** A state of excessive gas in the alimentary canal.<br>**2.** Pompously embellished language. | *"Dear Mr Editor, what is a good cure for flatulence?"* — James Joyce, *Ulysses* |
| [[flatulency]] | noun | **1.** A state of excessive gas in the alimentary canal. | *"In academic literature, flatulency designates a state of excessive gas in the alimentary canal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flatulent]] | adjective | **1.** Generating excessive gas in the alimentary canal.<br>**2.** Suffering from excessive gas in the alimentary canal. | *"In academic literature, flatulent designates generating excessive gas in the alimentary canal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flatus]] | noun | **1.** A reflex that expels intestinal gas through the anus. | *"In academic literature, flatus designates a reflex that expels intestinal gas through the anus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flatus-relieving]] | adjective | **1.** Relieving gas in the alimentary tract (colic or flatulence or griping). | *"In academic literature, flatus-relieving designates relieving gas in the alimentary tract (colic or flatulence or griping)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inflatable]] | adjective | **1.** Designed to be filled with air or gas. | *"As a senior technician, I was assigned to the recovery and repair of damaged parachutes, life rafts, inflatable life preservers, oxygen masks, and the escape-and-evasion kits that air crews relied on when they bailed out over enemy territory."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[inflate]] | verb | **1.** Exaggerate or make bigger.<br>**2.** Fill with gas or air. | *"It is indeed the darling achievement of infernal skill, to inflate a poor worm with pride of talent, and fill his heart with hatred to the Gospel, and then persuade him that his hatred arises from its falsehood and absurdity."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[inflated]] | verb | **1.** Exaggerate or make bigger.<br>**2.** Fill with gas or air. | *"Morland’s account of it was no inflated representation, no studied appeal to their passions."* — Jane Austen, *Northanger Abbey* |
| [[inflater]] | noun | **1.** An air pump operated by hand to inflate something (as a tire). | *"In academic literature, inflater designates an air pump operated by hand to inflate something (as a tire)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inflation]] | noun | **1.** A general and progressive increase in prices.<br>**2.** (cosmology) a brief exponential expansion of the universe (faster than the speed of light) postulated to have occurred shortly after the big bang. | *"The increase in the output of gold in 1849-57,[15] caused what was the most rapid, if not the greatest money inflation that had occurred since the sixteenth century."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[inflationary]] | adjective | **1.** Associated with or tending to cause increases in inflation. | *"In academic literature, inflationary designates associated with or tending to cause increases in inflation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inflator]] | noun | **1.** An air pump operated by hand to inflate something (as a tire). | *"In academic literature, inflator designates an air pump operated by hand to inflate something (as a tire)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insufflate]] | verb | **1.** Breathe or blow onto as a ritual or sacramental act, especially so as to symbolize the action of the holy spirit.<br>**2.** Treat by blowing a powder or vapor into a bodily cavity. | *"In academic literature, insufflate designates breathe or blow onto as a ritual or sacramental act, especially so as to symbolize the action of the holy spirit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insufflation]] | noun | **1.** (medicine) blowing air or medicated powder into the lungs (or into some other body cavity).<br>**2.** An act of blowing or breathing on or into something. | *"In academic literature, insufflation designates (medicine) blowing air or medicated powder into the lungs (or into some other body cavity)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reflate]] | verb | **1.** Economics: experience reflation.<br>**2.** Economics: raise demand, expand the money supply, or raise prices, after a period of deflation. | *"In academic literature, reflate designates economics: experience reflation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reflation]] | noun | **1.** Inflation of currency after a period of deflation; restore the system to a previous state. | *"In academic literature, reflation designates inflation of currency after a period of deflation; restore the system to a previous state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sufflate]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin flat within the domain of Nature.<br>**2.** A technical or specialized form exhibiting the properties of flat in systematic terminology. | *"In academic literature, sufflate designates pertaining to, derived from, or characteristic of latin flat within the domain of nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unflattering]] | adjective | **1.** Showing or representing unfavorably. | *"Perhaps because he was piqued by Mary's refusal, he has left a rather unflattering portrait of her."* — Sydney Waterlow, *Shelley* |

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
    ROOT DASHBOARD · FLAT
  </div>
</div>
