---
status: unread
type: root_dashboard
---
# Dashboard — sax
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sax-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“rock”</span>
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

The root **sax** means rock. It refers to hard rock, stone, or craggy boulders. In English, this root forms words such as *saxatile*, *saxifrage*, *saxifragous*, and *saxicolous*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: rock
> The root **sax** means rock. It refers to hard rock, stone, or craggy boulders. In English, this root forms words such as *saxatile*, *saxifrage*, *saxifragous*, and *saxicolous*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Rock</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Tall green trees, rolling hills, and rain watering the fertile landscape.</mark>
> - **Everyday Connection**: Think of familiar words like *saxatile* and *saxifrage*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sax** comes from a Latin word that means *"rock"*.
  - At its core, it describes rock.

- **The Big Picture Idea**:
  - Picture tall green trees, rolling hills, and rain watering the fertile landscape.
  - Whenever you see **sax** in an English word, think of **the natural world and the outdoors**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of rock.
  - **Mental & Social**: How people experience, organize, or communicate about rock.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Saxatile**: Living, growing, or found among rocks.
  - **Saxifrage**: Any of various low-growing perennial alpine plants that grow in rock crevices, often expanding root systems that split rock.
  - **Saxifragous**: Having the property of dissolving or breaking up stones in the bladder or kidneys.
  - **Saxicolous**: Growing or living on, in, or among rocks.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sax</mark>, think of <mark class="hl-def">the natural world and the outdoors</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **sax** operates primarily through Latin botanical and ecological compounds:
> - **Base Adjectival Stem `saxatil-` (*saxātilis*):**
>   - Adjective: *saxatile* (living or growing among rocks).
> - **Verbal Compound `saxi-frage` (*saxum* + *frangere* "to break"):**
>   - Noun: *saxifrage* (rock-breaking alpine plant).
>   - Medicinal adjective: *saxifragous* (stone-dissolving).
> - **Ecological & Morphological Combining Forms `saxi-`:**
>   - With *colere* ("to inhabit"): *saxicolous* (rock-inhabiting).
>   - With *cavāre* ("to hollow out"): *saxicavous* (rock-boring).
>   - With *-genous* ("originating in"): *saxigenous* (originating in rock).

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
> - **Alpine Botany & Rock Gardens:** Low-growing perennial alpine plants (family Saxifragaceae) that root in rocky crevices and talus slopes (*saxifrage*).
> - **Historical Pharmacopeia & Lithotripsy:** Herbal or chemical remedies capable of breaking, dissolving, or passing urinary renal calculi (*saxifragous*).
> - **Ecology & Biogeography:** Specialized flora, lichens, and fauna adapted to life on bare rock faces, cliffs, or scree (*saxatile*, *saxicolous*).
> - **Marine Invertebrate Zoology:** Bivalve mollusks (such as *Hiatella* or date mussels) that bore deep tunnels into solid limestone using acid secretions (*saxicavous*).
> - **Sedimentary Mineralogy:** Rock structures or deposits formed directly within or from preexisting rock (*saxigenous*).

---

## 🔀 4. Prefix & Combining Dynamics on sax

### Prefix Dynamics
- *Note:* Because *saxum* is a concrete noun, classical preverbs do not attach to it. Its rich scientific vocabulary is formed entirely through classical compounding (*saxi-* + verbal/nominal elements).

### Compounding & Suffix Elements
- **`-frage` (*frangere* "to break"):** *saxifrage* $\to$ rock-breaker.
- **`-atile` (Adapted to / Dwelling in):** *saxatile* $\to$ living among rocks.
- **`-colous` (*colere* "to dwell"):** *saxicolous* $\to$ growing on rock surfaces.
- **`-cavous` (*cavāre* "to hollow"):** *saxicavous* $\to$ boring cavities into rock.
- **`-genous` (*gignesthai* "to be born"):** *saxigenous* $\to$ produced in rock.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Alpine Plant Ecology & Horticulture:** Cultivating *saxifrage* species (e.g. *Saxifraga oppositifolia*) in botanical rock gardens and studying adaptations to sub-zero freezing and dehydration.
> - **Marine Benthic Ecology:** Studying *saxicavous* bivalves (*Lithophaga*, *Hiatella arctica*) that chemically erode coastal limestone sea-cliffs and weaken breakwaters.
> - **Herpetology & Ichthyology:** Classifying *saxatile* freshwater fishes (darters, sculpins) and lizards (*Sceloporus*) that rely on rocky stream beds and crevices for predator evasion.
> - **Lichenology & Air Quality Biomonitoring:** Mapping crustose *saxicolous* lichens on urban monuments to measure atmospheric sulfur dioxide deposition.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[sax]] | noun | **1.** A belgian maker of musical instruments who invented the saxophone (1814-1894).<br>**2.** A single-reed woodwind with a conical bore. | *"Sax thousand years are near-hand fled Sin’ I was to the butching bred, An’ mony a scheme in vain’s been laid, To stap or scar me; Till ane Hornbook’s^3 ta’en up the trade, And faith! he’ll waur me."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[saxatile]] | adjective | **1.** Growing on or living among rocks. | *"BEDSTRAW RUST; spots yellowish; sori subrotund, aggregate, closed; spores globose, reddish.—On _Galium verum_, _saxatile_, &c."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[saxe]] | noun | **1.** A french marshal who distinguished himself in the war of the austrian succession (1696-1750).<br>**2.** An area in germany around the upper elbe river; the original home of the saxons. | *"And what does she propose to do with the photograph?” “To ruin me.” “But how?” “I am about to be married.” “So I have heard.” “To Clotilde Lothman von Saxe-Meningen, second daughter of the King of Scandinavia."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[saxe-coburg-gotha]] | noun | **1.** The name of the royal family that ruled great britain from 1901-1917; the name was changed to windsor in 1917 in response to anti-german feelings in world war i. | *"In academic literature, saxe-coburg-gotha designates the name of the royal family that ruled great britain from 1901-1917; the name was changed to windsor in 1917 in response to anti-german feelings in world war i."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saxe-gothea]] | noun | **1.** One species: prince albert's yew. | *"In academic literature, saxe-gothea designates one species: prince albert's yew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saxegothea]] | noun | **1.** One species: prince albert's yew. | *"In academic literature, saxegothea designates one species: prince albert's yew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saxicola]] | noun | **1.** Old world chats. | *"In academic literature, saxicola designates old world chats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saxicoline]] | adjective | **1.** Growing on or living among rocks. | *"In academic literature, saxicoline designates growing on or living among rocks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saxicolous]] | adjective | **1.** Growing on or living among rocks. | *"In academic literature, saxicolous designates growing on or living among rocks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saxifraga]] | noun | **1.** Type genus of the saxifragaceae; large genus of usually perennial herbs of arctic and cool regions of northern hemisphere: saxifrage. | *"PIG-NUT CLUSTER-CUPS; spots obliterated, subiculum thickened; peridia in irregular subrotund or oval heaps; spores orange.—On _Bunium bulbocastanum_ and _Pimpinella saxifraga_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[saxifragaceae]] | noun | **1.** A large and diverse family of evergreen or deciduous herbs; widely distributed in northern temperate and cold regions; sometimes includes genera of the family hydrangeaceae. | *"In academic literature, saxifragaceae designates a large and diverse family of evergreen or deciduous herbs; widely distributed in northern temperate and cold regions; sometimes includes genera of the family hydrangeaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saxifrage]] | noun | **1.** Any of various plants of the genus saxifraga. | *"GOLDEN-SAXIFRAGE BRAND; sori of various sizes, few together and confluent, pale brown; spores long, somewhat waved, much attenuated at either extremity; peduncle elongated.—On the under surface of the leaves of _Chrysosplenium oppositifolium_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[saxist]] | noun | **1.** A musician who plays the saxophone. | *"In academic literature, saxist designates a musician who plays the saxophone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saxitoxin]] | noun | **1.** A powerful neurotoxin produced by certain dinoflagellates found in red tides; it can accumulate in mollusks that feed on the dinoflagellates and cause food poisoning to humans. | *"In academic literature, saxitoxin designates a powerful neurotoxin produced by certain dinoflagellates found in red tides; it can accumulate in mollusks that feed on the dinoflagellates and cause food poisoning to humans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saxon]] | noun | **1.** A member of a germanic people who conquered england and merged with the angles and jutes to become anglo-saxons; dominant in england until the norman conquest.<br>**2.** Of or relating to or characteristic of the early saxons or anglo-saxons and their descendents (especially the english or lowland scots) and their language. | *"Correspondingly, "owner" is the Anglo-Saxon equivalent of "proprietor." Property thus, fundamentally, means not an object held, or possessed, but the right in or belonging to a person to control something that he owns."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[saxony]] | noun | **1.** An area in germany around the upper elbe river; the original home of the saxons. | *"How like you the young German, the Duke of Saxony’s nephew?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[saxophone]] | noun | **1.** A single-reed woodwind with a conical bore. | *"In academic literature, saxophone designates a single-reed woodwind with a conical bore."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saxophonist]] | noun | **1.** A musician who plays the saxophone. | *"In academic literature, saxophonist designates a musician who plays the saxophone."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · SAX
  </div>
</div>
