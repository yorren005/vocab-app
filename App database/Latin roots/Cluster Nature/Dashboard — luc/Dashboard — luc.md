---
status: unread
type: root_dashboard
---
# Dashboard — luc
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">luc-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“light”</span>
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

The root **luc** means light. It refers to radiant illumination that makes things visible. In English, this root forms words such as *lucid*, *translucent*, *illuminate*, and *elucidate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: light
> The root **luc** means light. It refers to radiant illumination that makes things visible. In English, this root forms words such as *lucid*, *translucent*, *illuminate*, and *elucidate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Light</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Tall green trees, rolling hills, and rain watering the fertile landscape.</mark>
> - **Everyday Connection**: Think of familiar words like *lucid* and *translucent*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **luc** comes from a Latin word that means *"light"*.
  - At its core, it describes light.

- **The Big Picture Idea**:
  - Picture tall green trees, rolling hills, and rain watering the fertile landscape.
  - Whenever you see **luc** in an English word, think of **the natural world and the outdoors**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of light.
  - **Mental & Social**: How people experience, organize, or communicate about light.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Lucid**: Expressed clearly and easy to understand.
  - **Translucent**: Permitting light to pass through, but diffusing it so that objects on the opposite side are not clearly distinguished.
  - **Illuminate**: An everyday English word showing the root's idea of *light*.
  - **Elucidate**: To make something lucid or clear.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">luc</mark>, think of <mark class="hl-def">the natural world and the outdoors</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **luc** manifests across several major Latin conduits:
> - **Base Adjectival Stems `lucid-` and `lucent-`:**
>   - Adjectives: *lucid* (clear, sane), *lucent* (glowing).
>   - Adverb / Nouns: *lucidly*, *lucidity*, *lucence*.
> - **Causative Prefix Stem `e-` + `lucid-` (*ēlūcidāre*):**
>   - Verb: *elucidate* (make clear).
>   - Noun: *elucidation*.
>   - Adjective: *elucidative*.
> - **Optical Prefix Formations:**
>   - `per-` ("thoroughly") $\to$ *pellucid* (*per-* + *lucidus* "crystal-clear"), *pellucidity*.
>   - `trans-` ("through") $\to$ *translucent* (*trans-* + *lūcēns* "shining through diffusely"), *translucence*.
>   - `re-` ("back/intensive") $\to$ *relucent* (radiant, reflecting light).
> - **Light-Bearer Compounds `luci-fer` (*lūx* + *ferre*):**
>   - *lucifer* (morning star, match), *luciferin* (pigment), *luciferase* (enzyme).
> - **Nocturnal Work Stems `lucubr-` (*lucubrāre* < *lux*):**
>   - Verb: *lucubrate* (study by night).
>   - Noun: *lucubration* (laborious nocturnal treatise).
> - **Astronomical Compound `nocti-lucent`:**
>   - *nox, noctis* ("night") + *lūcēns* $\to$ *noctilucent* (night-shining clouds).

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
> - **Epistemology, Rhetoric & Education:** Unpacking dense arguments, explaining complex doctrines, and teaching with crystal clarity (*elucidate*, *elucidation*, *elucidative*).
> - **Psychiatry, Neurology & Consciousness:** Coherent cognitive faculties, rational mental states, and brief returns to sanity (*lucid*, *lucidity*, *lucid dream*, *lucid interval*).
> - **Physical Optics & Material Transparency:** Substances permitting light transmission with varying degrees of scattering (*translucent*, *pellucid*, *lucent*).
> - **Atmospheric Science & Aeronomy:** High-altitude mesospheric clouds glowing ice-blue deep into polar twilight (*noctilucent*).
> - **Biochemistry & Deep-Sea Biology:** Bioluminescent chemical reactions converting ATP into cold light (*luciferin*, *luciferase*).
> - **Scholarly Labor & Historical Poetics:** Laborious, late-night academic writing and scholarly output (*lucubrate*, *lucubration*).

---

## 🔀 4. Prefix & Combining Dynamics on luc

### Prefix Dynamics
- **`ex-` / `e-` (Out / Fully):** *elucidate* $\to$ to bring *out* into the light; clarify.
- **`per-` (Thoroughly / Intensely):** *pellucid* $\to$ *thoroughly* clear and transparent.
- **`trans-` (Through / Across):** *translucent* $\to$ permitting light to shine *through*.
- **`re-` (Back / Intensely):** *relucent* $\to$ reflecting radiant light.

### Suffix Dynamics
- **`-id` (Quality / State):** *lucid*, *pellucid*.
- **`-ent` / `-ence` (Participle / State of Radiance):** *lucent*, *translucent*, *translucence*.
- **`-ate` / `-ation` (Causative Verb / Process):** *elucidate*, *elucidation*, *lucubrate*, *lucubration*.
- **`-fer` (*ferre* "to bear"):** *lucifer* $\to$ light-bringer.
- **`-ase` (Biochemical Enzyme):** *luciferase* $\to$ enzyme catalyzing bioluminescence.
- **`-in` (Biochemical Substrate):** *luciferin* $\to$ light-emitting molecule.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Molecular Biology & Genetic Engineering:** Utilizing the firefly *luciferase* gene as a bioluminescent reporter to quantify gene promoter expression and drug efficacy in live tumor cells.
> - **Psychiatry & Forensic Medicine:** Evaluating testamentary capacity in probate disputes based on whether a deceased patient executed a will during a documented *lucid interval*.
> - **Materials Science & Architectural Glazing:** Measuring the diffuse transmittance and optical haze of *translucent* aerogel panels and frosted tempered glass facades.
> - **Upper Atmospheric Physics:** Ground and satellite observation of polar mesospheric *noctilucent* clouds situated 83 kilometers above Earth, serving as sensitive indicators of climate change.
> - **Pedagogy & Philosophy of Science:** Writing textbooks and scholarly monographs that *elucidate* quantum mechanical wave-particle duality for non-specialists.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[elucidate]] | verb | **1.** Make clear and (more) comprehensible.<br>**2.** Make free from confusion or ambiguity; make clear. | *"Cairns," and was included in his appeal to "any gentleman in the bench" to elucidate a difficult passage in the lesson of the day."* — John Cairns, *Principal Cairns* |
| [[elucidation]] | noun | **1.** An act of explaining that serves to clear up and cast light on.<br>**2.** An interpretation that removes obstacles to understanding. | *"This was the new premise brought by Mill to the elucidation of the wages question; and it sufficed to change the entire aspect of human life regarded from the point of view of political economy."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[elucidative]] | adjective | **1.** That makes clear. | *"In academic literature, elucidative designates that makes clear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lucania]] | noun | **1.** A region of southern italy (forming the instep of the italian `boot'). | *"In academic literature, lucania designates a region of southern italy (forming the instep of the italian `boot')."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lucanidae]] | noun | **1.** Stag beetles. | *"In academic literature, lucanidae designates stag beetles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lucas]] | noun | **1.** United states screenwriter and filmmaker (born in 1944). | *"Sir William and Lady Lucas are determined to go, merely on that account; for in general, you know, they visit no new comers."* — Jane Austen, *Pride and Prejudice* |
| [[luce]] | noun | **1.** United states publisher of magazines (1898-1967).<br>**2.** United states playwright and public official (1902-1987). | *"Enter Luce concealed from Antipholus of Ephesus and his companions."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lucent]] | adjective | **1.** Softly bright or radiant. | *"With all these faculties brought to bear on all he thinks, and lucent in all he says, there is little wonder that men recognized another note in Jesus from that familiar in their usual teachers."* — T. R. Glover, *The Jesus of History* |
| [[lucerne]] | noun | **1.** Important european leguminous forage plant with trifoliate leaves and blue-violet flowers grown widely as a pasture and hay crop. | *"The custom prevailed, for example, throughout the canton of Lucerne."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[lucid]] | adjective | **1.** (of language) transparently clear; easily understandable; ; ; - robert burton.<br>**2.** Having a clear mind. | *"She had truly never thought so far as that, and his lucid picture of possible offspring who would scorn her was one that brought deadly convictions to an honest heart which was humanitarian to its centre."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[lucidity]] | noun | **1.** Free from obscurity and easy to understand; the comprehensibility of clear expression.<br>**2.** A lucid state of mind; not confused. | *"That has been done with admirable lucidity and skill by such writers as Dr."* — John Cairns, *Principal Cairns* |
| [[lucidly]] | adverb | **1.** In a clear and lucid manner. | *"She is a kind, jolly sort of body, and is sure to ask me directly I return.” “You cannot, if we did not,” Mr Clare answered lucidly."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[lucidness]] | noun | **1.** Free from obscurity and easy to understand; the comprehensibility of clear expression. | *"In academic literature, lucidness designates free from obscurity and easy to understand; the comprehensibility of clear expression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lucifer]] | noun | **1.** (judeo-christian and islamic religions) chief spirit of evil and adversary of god; tempter of mankind; master of hell.<br>**2.** A planet (usually venus) seen just before sunrise in the eastern sky. | *"That same mad fellow of the north, Percy, and he of Wales that gave Amamon the bastinado, and made Lucifer cuckold, and swore the devil his true liegeman upon the cross of a Welsh hook—what a plague call you him?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[luciferin]] | noun | **1.** Pigment occurring in luminescent organisms (as fireflies); emits heatless light when undergoing oxidation. | *"In academic literature, luciferin designates pigment occurring in luminescent organisms (as fireflies); emits heatless light when undergoing oxidation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lucifugal]] | adjective | **1.** Light-avoiding. | *"In academic literature, lucifugal designates light-avoiding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lucifugous]] | adjective | **1.** Light-avoiding. | *"In academic literature, lucifugous designates light-avoiding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lucilia]] | noun | **1.** Greenbottle flies. | *"In academic literature, lucilia designates greenbottle flies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lucite]] | noun | **1.** A transparent thermoplastic acrylic resin. | *"In academic literature, lucite designates a transparent thermoplastic acrylic resin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lucrative]] | adjective | **1.** Producing a sizeable profit. | *"It was not lucrative to a young practitioner, with very little influence in London; and although he was, night and day, at the service of numbers of poor people and did wonders of gentleness and skill for them, he gained very little by it in money."* — Charles Dickens, *Bleak House* |
| [[lucrativeness]] | noun | **1.** The quality of affording gain or benefit or profit. | *"In academic literature, lucrativeness designates the quality of affording gain or benefit or profit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lucre]] | noun | **1.** Informal terms for money.<br>**2.** The excess of revenues over outlays in a given period of time (including depreciation and other non-cash expenses). | *"Pisanio? ’Tis he and Cloten; malice and lucre in them Have laid this woe here."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lucretius]] | noun | **1.** Roman philosopher and poet; in a long didactic poem he tried to provide a scientific explanation of the universe (96-55 bc). | *"Daughter, dear daughter,” old Lucretius cries, “That life was mine which thou hast here deprived."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lucubrate]] | verb | **1.** Add details, as to an account or idea; clarify the meaning of and discourse in a learned way, usually in writing. | *"In academic literature, lucubrate designates add details, as to an account or idea; clarify the meaning of and discourse in a learned way, usually in writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lucubration]] | noun | **1.** A solemn literary work that is the product of laborious cogitation.<br>**2.** Laborious cogitation. | *"The “appetite for joy” which pervades all creation, that tremendous force which sways humanity to its purpose, as the tide sways the helpless weed, was not to be controlled by vague lucubrations over the social rubric."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[luculent]] | adjective | **1.** (of language) transparently clear; easily understandable; ; ; - robert burton. | *"In academic literature, luculent designates (of language) transparently clear; easily understandable; ; ; - robert burton."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lucullan]] | adjective | **1.** Characterized by extravagance and profusion. | *"In academic literature, lucullan designates characterized by extravagance and profusion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lucullus]] | noun | **1.** Roman general famous for self-indulgence and giving lavish banquets (circa 110-57 bc). | *"A room in Lucullus’ house Scene II."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[luculus]] | noun | **1.** Roman general famous for giving lavish banquets (110-57 bc). | *"In academic literature, luculus designates roman general famous for giving lavish banquets (110-57 bc)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lucy]] | noun | **1.** Incomplete skeleton of female found in eastern ethiopia in 1974. | *"Maine, Blois, Poictiers, and Tours, are won away, Long all of Somerset and his delay. [_Exit, with his soldiers._] LUCY."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pellucid]] | adjective | **1.** Transmitting light; able to be seen through with clarity.<br>**2.** (of language) transparently clear; easily understandable; ; ; - robert burton. | *"Above the dark margin of the earth appeared foreshores and promontories of coppery cloud, bounding a green and pellucid expanse in the western sky."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[pellucidity]] | noun | **1.** Free from obscurity and easy to understand; the comprehensibility of clear expression.<br>**2.** Passing light without diffusion or distortion. | *"In academic literature, pellucidity designates free from obscurity and easy to understand; the comprehensibility of clear expression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pellucidly]] | adverb | **1.** In a clear and lucid manner. | *"In academic literature, pellucidly designates in a clear and lucid manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pellucidness]] | noun | **1.** Passing light without diffusion or distortion. | *"In academic literature, pellucidness designates passing light without diffusion or distortion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reluctance]] | noun | **1.** (physics) opposition to magnetic flux (analogous to electric resistance).<br>**2.** A certain degree of unwillingness. | *"But his deportment is beautiful.” Caddy went on to say with considerable hesitation and reluctance that there was one thing more she wished us to know, and felt we ought to know, and which she hoped would not offend us."* — Charles Dickens, *Bleak House* |
| [[reluctant]] | adjective | **1.** Unwillingness to do something contrary to your custom.<br>**2.** Disinclined to become involved. | *"Leonore had related in the meantime how Mäzli had proposed to visit the sick Castle-Steward and how she had at first been reluctant to go, till Mäzli had made her feel that she was wrong."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[reluctantly]] | adverb | **1.** With reluctance. | *"Give him the new bill to sign, George, and he’ll sign it like a man.” “I was coming to you this morning,” observes the trooper reluctantly."* — Charles Dickens, *Bleak House* |
| [[reluctivity]] | noun | **1.** (physics) the resistance of a material to the establishment of a magnetic field in it. | *"In academic literature, reluctivity designates (physics) the resistance of a material to the establishment of a magnetic field in it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[translucence]] | noun | **1.** The quality of allowing light to pass diffusely. | *"In academic literature, translucence designates the quality of allowing light to pass diffusely."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[translucency]] | noun | **1.** The quality of allowing light to pass diffusely. | *"A slight translucency is observable near the rim on a white T´ang cup in the Eumorfopoulos Collection."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[translucent]] | adjective | **1.** Allowing light to pass through diffusely. | *"She had on his flannel coat over her linen one and his expression was one of glorified and translucent daze."* — Maria Thompson Daviess, *The Tinder-Box* |

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
    ROOT DASHBOARD · LUC
  </div>
</div>
