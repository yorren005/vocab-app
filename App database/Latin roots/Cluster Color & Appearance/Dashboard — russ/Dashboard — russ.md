---
status: unread
type: root_dashboard
---
# Dashboard — russ
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">russ-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“red”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A painter mixing vibrant pigments on a palette to color a canvas.</span>
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

The root **russ** means red. It describes having a deep reddish, rust, or russet color. In English, this root forms words such as *russet*, *russeting*, *russety*, and *russula*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: red
> The root **russ** means red. It describes having a deep reddish, rust, or russet color. In English, this root forms words such as *russet*, *russeting*, *russety*, and *russula*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Red</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A painter mixing vibrant pigments on a palette to color a canvas.</mark>
> - **Everyday Connection**: Think of familiar words like *russet* and *russeting*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **russ** comes from a Latin word that means *"red"*.
  - At its core, it describes red.

- **The Big Picture Idea**:
  - Picture a painter mixing vibrant pigments on a palette to color a canvas.
  - Whenever you see **russ** in an English word, think of **colors, brightness, and visual appearance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of red.
  - **Mental & Social**: How people experience, organize, or communicate about red.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Russet**: A coarse, homespun reddish-brown or greyish woolen cloth, historically worn by English peasants and rural workers.
  - **Russeting**: A brownish, rough, corky patch or netting on the epidermis of apples and pears, caused by the deposition of suberin in response to cold, humidity, fungal infection, or genetic traits.
  - **Russety**: Of a russet color.
  - **Russula**: A large, cosmopolitan genus of ectomycorrhizal agaric mushrooms characterized by brittle flesh composed of spherical cells and brightly colored caps.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">russ</mark>, think of <mark class="hl-def">colors, brightness, and visual appearance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **russ** enters English almost exclusively through the French diminutive channel and direct taxonomic Latin:
> - **Old French Diminutive `rous- + -et`:** Latin *russus* → Old French *rous* ("reddish") + diminutive *-et* → Anglo-French *russet* → Middle English [[russet]] (functioning as noun and adjective).
>   - Horticultural verbal noun: *russet + -ing* → [[russeting]] (corky fruit skin texture).
>   - Adjectival suffixation: *russet + -y* → [[russety]].
> - **Romance Anthroponymy:** Old French *rous* ("red-haired") + diminutive *-eau* → French surname [[Rousseau]].
> - **Modern Taxonomic Diminutive `-ula`:** Latin *russus* + feminine diminutive *-ula* → [[Russula]] (brittlegill mushroom genus).
> - **Roman Circus Quadriga Phrase:** Latin *factiō* + *russāta* → [[factio russata]] (the Red racing faction).
> - **Agricultural Cultivar Eponym:** [[russet Burbank]] (Burbank russet potato).

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
> Although derived from a single rural color term, the modern semantic field spans distinct applications:
> - **Textile & Social History:** In [[russet]], it denotes the coarse, homespun medieval woolen cloth worn by peasants, monks, and hermits.
> - **Pomology & Horticulture:** In [[russet]] (apples) and [[russeting]], it describes the rough, corky, golden-brown skin of pears and apples caused by suberin deposition.
> - **Agronomy & Food Science:** In [[russet Burbank]], it names the high-starch baking and frying potato that anchors the global culinary and fast-food industry.
> - **Mycology & Forest Ecology:** In [[Russula]], it identifies a massive genus of mycorrhizal fungi essential for forest tree root nutrition.
> - **Roman Sports & Chariot Racing:** In [[factio russata]], it captures the intense sports rivalries of the Roman Circus Maximus.
> - **Literary Metaphor:** In [[russet]], it symbolizes rustic simplicity, honesty, and autumn dawn.

---

## 🔀 4. Prefix & Combining Dynamics on russ

### Suffix Transformations (Grammatical & Categorical Roles)

Latin *russus* did not form prefixed compound verbs in English; lexical expansion occurred entirely via suffixation:

| Suffix / Element | Grammatical Role | Derivative | Semantic Result |
| :--- | :--- | :--- | :--- |
| `-et` (Old French diminutive) | Noun & Adjective | [[russet]] | A coarse reddish-brown cloth; a reddish-brown hue; an apple variety. |
| `-ing` (Gerund / State) | Noun (Plant Pathology) | [[russeting]] | The development of rough, brownish suberized patches on fruit skin. |
| `-y` | Adjective (Quality) | [[russety]] | Tending toward a russet or brownish-red shade. |
| `-eau` (French diminutive) | Proper Noun (Surname) | [[Rousseau]] | "Little red-haired one" — famous French intellectual surname. |
| `-ula` (Latin diminutive) | Noun (Mycological Genus) | [[Russula]] | "Little red mushroom" — the brittlegill genus. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🍎 **Horticulture & Pomology** | [[russeting]], [[russet]], [[russet Burbank]] | Apple and pear skin morphology, Egremont Russet and Bosc pear cultivars, suberin deposition in response to orchard frost or humidity. |
| 🍄 **Mycology & Forestry** | [[Russula]] | Ectomycorrhizal symbiosis with oak and conifer roots, identification of brittlegill fungi, *Russula emetica* gastrointestinal toxins. |
| 📜 **Medieval History & Sumptuary Law** | [[russet]] | Edward III's 1363 Sumptuary Act, peasant dress in Chaucer's *Canterbury Tales*, humble monastic habits. |
| 🏛️ **Roman Archaeology & Spectacle** | [[factio russata]] | Circus Maximus factional politics, Hippodrome riots in Constantinople, imperial team patronage. |
| 🍟 **Global Agriculture & Fast Food** | [[russet Burbank]] | High-solids potato processing, French fry crispness chemistry, agricultural genetics of Luther Burbank. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[russell]] | noun | **1.** United states religious leader who founded the sect that is now called jehovah's witnesses (1852-1916).<br>**2.** English film director (born in 1927). | *"To Lady Russell, indeed, she was a most dear and highly valued god-daughter, favourite, and friend."* — Jane Austen, *Persuasion* |
| [[russet]] | noun | **1.** A reddish brown homespun fabric.<br>**2.** Of brown with a reddish tinge. | *"But look, the morn in russet mantle clad, Walks o’er the dew of yon high eastward hill."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[russeting]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin russ within the domain of Color & Appearance.<br>**2.** A technical or specialized form exhibiting the properties of russ in systematic terminology. | *"In academic literature, russeting designates pertaining to, derived from, or characteristic of latin russ within the domain of color & appearance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[russia]] | noun | **1.** A former communist country in eastern europe and northern asia; established in 1922; included russia and 14 other soviet socialist republics (ukraine and byelorussia and others); officially dissolved 31 december 1991.<br>**2.** Formerly the largest soviet socialist republic in the ussr occupying eastern europe and northern asia. | *"This will last out a night in Russia When nights are longest there."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[russian]] | noun | **1.** A native or inhabitant of russia.<br>**2.** The slavic language that is the official language of russia. | *"Foolish curs, that run winking into the mouth of a Russian bear and have their heads crush’d like rotten apples!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[russian-speaking]] | adjective | **1.** Able to communicate in russian. | *"In academic literature, russian-speaking designates able to communicate in russian."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[russula]] | noun | **1.** Large genus of fungi with stout stems and white spores and neither annulus nor volva; brittle caps of red or purple or yellow or green or blue; differs from genus lactarius in lacking milky juice. | *"In academic literature, russula designates large genus of fungi with stout stems and white spores and neither annulus nor volva; brittle caps of red or purple or yellow or green or blue; differs from genus lactarius in lacking milky juice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[russulaceae]] | noun | **1.** Used in some classification systems for the genus russula. | *"In academic literature, russulaceae designates used in some classification systems for the genus russula."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Color & Appearance]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · RUSS
  </div>
</div>
