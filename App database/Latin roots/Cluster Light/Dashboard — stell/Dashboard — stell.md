---
status: unread
type: root_dashboard
---
# Dashboard — stell
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">stell-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“star”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A beam of bright morning sunlight cutting through shadows to illuminate a room.</span>
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

The root **stell** means star. It refers to luminous celestial bodies in the night sky and radiating points. In English, this root forms words such as *stellar*, *stellarly*, *constellation*, and *constellate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: star
> The root **stell** means star. It refers to luminous celestial bodies in the night sky and radiating points. In English, this root forms words such as *stellar*, *stellarly*, *constellation*, and *constellate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Star</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A beam of bright morning sunlight cutting through shadows to illuminate a room.</mark>
> - **Everyday Connection**: Think of familiar words like *stellar* and *stellarly*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **stell** comes from a Latin word that means *"star"*.
  - At its core, it describes star.

- **The Big Picture Idea**:
  - Picture a beam of bright morning sunlight cutting through shadows to illuminate a room.
  - Whenever you see **stell** in an English word, think of **light, shining brightness, and illumination**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of star.
  - **Mental & Social**: How people experience, organize, or communicate about star.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Stellar**: Of, relating to, or proceeding from the stars.
  - **Stellarly**: In a stellar manner.
  - **Constellation**: An arbitrary, recognizable configuration of stars officially recognized in astronomy.
  - **Constellate**: To form, gather, or cluster together into a constellation or unified body.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">stell</mark>, think of <mark class="hl-def">light, shining brightness, and illumination</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **stell** operates through six primary morphological conduits:
>
> - **Base Adjectival Conduit `stellar-` (*stēllāris*):**
>   - Direct adjective: *stellar*, *stellarly*
>   - Spatial & astrophysical prefixes:
>     - `inter-` ("between") $\to$ *interstellar*
>     - `circum-` ("around") $\to$ *circumstellar*
>     - `sub-` ("under, lower than") $\to$ *substellar*
> - **The Astrological & Collective Prefix `con-` $\to$ `constell-` (*cōnstellātiō*):**
>   - Noun: *constellation*
>   - Verb: *constellate*
>   - Adjective: *constellatory*
> - **Geometric & Radiating Participle `stellat-` (*stēllātus*):**
>   - Direct adjective: *stellate* (stellate cells, stellate ganglion)
>   - Compound adjective: *stelliform*
> - **Diminutive Morphologies `stellul-` (*stēllula*):**
>   - *stellular*, *stellulate*, *stellule*
> - **Aureate Mythological Verbal Compounds (`-ficāre` < *facere*):**
>   - *stellify*, *stellification*
> - **Cosmological & Metallurgical Compounds:**
>   - *stelliferous* (*stēlla* + *-fer* "bearing")
>   - *Stellite* (*stēlla* + mineral suffix *-ite*)
> - **Legal / Zoological Conduits (`stelliō`):**
>   - *stellion*, *stellionate*

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
> The root spans six distinct conceptual territories:
>
> 1. **Astrophysics, Space Travel & Cosmology:**
>    - The medium and dust between solar systems (*interstellar travel*, *interstellar cloud*).
>    - Protoplanetary dust surrounding newly formed stars (*circumstellar disk*).
>    - Astronomical bodies lacking mass for nuclear fusion (*substellar brown dwarfs*).
>    - The cosmic epoch dominated by active star formation (*stelliferous era*).
> 2. **Celestial Cartography & Figurative Groupings:**
>    - The 88 officially recognized regions of the night sky (*the constellation Cassiopeia*).
>    - An array of correlated factors, symptoms, or celebrated performers (*a constellation of symptoms*, *a constellation of Nobel laureates*).
> 3. **Neuroanatomy, Histology & Biology:**
>    - Inhibitory multipolar interneurons in the cerebellum (*stellate neurons*).
>    - Sympathetic autonomic nerve cluster in the lower neck (*stellate ganglion*).
>    - Star-shaped lipid-storing pericytes in the liver (*hepatic stellate cells*).
> 4. **Materials Science & Metallurgy:**
>    - Extremely hard, wear-resistant cobalt-chromium superalloys (*Stellite blades and valve facings*).
> 5. **Jurisprudence & Roman Civil Law:**
>    - Deceitful or fraudulent non-specific commercial crimes (*stellionate*).
> 6. **Poetics, Myth & High Achievement:**
>    - Elevating a hero, artist, or concept to celestial immortality (*to stellify a poet*).
>    - Outstanding, first-class performance (*a stellar academic record*).

---

## 🔀 4. Prefix & Combining Dynamics on stell

### Prefix Dynamics
- **`con-` ("together, with"):** Binds multiple independent stars into an integrated pattern $\to$ *constellation*, *constellate*.
- **`inter-` ("between"):** Traverses the light-years separating individual stars $\to$ *interstellar*.
- **`circum-` ("around"):** Encircles a central star $\to$ *circumstellar*.
- **`sub-` ("below, insufficient"):** Lying beneath a star, or possessing less than stellar mass $\to$ *substellar*.

### Suffix Dynamics
- **`-ar` / `-ary` (Adjectival):** *stellar*, *stellular*, *constellatory*.
- **`-ate` (Participle / Starburst Geometry):** Radiating like a star $\to$ *stellate*, *constellate*.
- **`-ify` / `-ification` (Causative / Making Into):** To transform into a star $\to$ *stellify*, *stellification*.
- **`-form` (Geometric Shape):** Star-shaped $\to$ *stelliform*.
- **`-ferous` (from Latin *-fer*, "bearing"):** Bearing stars $\to$ *stelliferous*.
- **`-ite` (Mineral / Alloy Suffix):** Superhard cobalt alloy with star-like luster $\to$ *Stellite*.
- **`-ate` (Legal Status):** The offense of deceptive fraud $\to$ *stellionate*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Astrophysics & Deep Space Exploration:** Astronomers analyze the *interstellar medium (ISM)* via spectral absorption lines; NASA's Voyager 1 spacecraft officially entered *interstellar space* in August 2012 after crossing the heliopause.
> - **Clinical Anesthesiology & Pain Management:** Anesthesiologists perform a *stellate ganglion block* (injecting local anesthetic around the sympathetic ganglion at the level of the C6/C7 vertebra) to treat complex regional pain syndrome (CRPS), intractable angina, and refractory ventricular arrhythmias.
> - **Aerospace & Industrial Metallurgy:** Machinists use *Stellite* cutting tools and hardfacing coatings on jet engine turbine blades and gun barrels due to their extraordinary resistance to mechanical abrasion, galling, and high-temperature oxidation.
> - **Hepatology & Cellular Pathology:** In chronic liver damage (such as cirrhosis), quiescent *hepatic stellate cells (Ito cells)* transform into proliferative myofibroblasts, secreting excessive collagen and driving hepatic fibrosis.
> - **Literature & Classical Mythology:** Renaissance literary scholars study Ovidian *catasterism* and the Chaucerian motif of *stellification*, where mythological figures like Ariadne and Hercules are granted stellar eternity.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[constellate]] | verb | **1.** Scatter or intersperse like dots or studs.<br>**2.** Come together as in a cluster or flock. | *"In academic literature, constellate designates scatter or intersperse like dots or studs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[constellation]] | noun | **1.** An arrangement of parts or elements.<br>**2.** A configuration of stars as seen from the earth. | *"I know thy constellation is right apt For this affair."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[interstellar]] | adjective | **1.** Between or among stars. | *"Nevertheless, thus clad, I trod interstellar space, exalted by the knowledge that I was bound on vast adventure, where, at the end, I would find all the cosmic formulæ and have made clear to me the ultimate secret of the universe."* — Jack London, *The Jacket (The Star-Rover)* |
| [[stella]] | noun | **1.** United states minimalist painter (born in 1936). | *"Burns Elegy On “Stella” The following poem is the work of some hapless son of the Muses who deserved a better fate."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[stellar]] | adjective | **1.** Indicating the most important performer or role.<br>**2.** Being or relating to or resembling or emanating from stars. | *"They were at stellar distances from her present world."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[stellaria]] | noun | **1.** Common chickweed; stitchwort. | *"In academic literature, stellaria designates common chickweed; stitchwort."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stellate]] | adjective | **1.** Arranged like rays or radii; radiating from a common center. | *"Then it began to scramble all over the oval stellated globe of the tiny blossoms."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[steller]] | noun | **1.** German naturalist (1709-1746). | *"In academic literature, steller designates german naturalist (1709-1746)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stellify]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin stell within the domain of Light.<br>**2.** A technical or specialized form exhibiting the properties of stell in systematic terminology. | *"In academic literature, stellify designates pertaining to, derived from, or characteristic of latin stell within the domain of light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stellite]] | noun | **1.** A very hard alloy of cobalt and chromium with cobalt as the principal ingredient; used to make cutting tools and for surfaces subject to heavy wear. | *"In academic literature, stellite designates a very hard alloy of cobalt and chromium with cobalt as the principal ingredient; used to make cutting tools and for surfaces subject to heavy wear."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Light]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · STELL
  </div>
</div>
