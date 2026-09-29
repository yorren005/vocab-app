---
status: unread
type: root_dashboard
---
# Dashboard — top
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">top-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“place”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Interconnected word patterns that combine classical ideas together.</span>
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

The root **top** means place. It refers to a localized point, geographical place, or regional spot. In English, this root forms words such as *topic*, *topical*, *topically*, and *topicality*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: place
> The root **top** means place. It refers to a localized point, geographical place, or regional spot. In English, this root forms words such as *topic*, *topical*, *topically*, and *topicality*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Place</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Interconnected word patterns that combine classical ideas together.</mark>
> - **Everyday Connection**: Think of familiar words like *topic* and *topical*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **top** comes from a Latin word that means *"place"*.
  - At its core, it describes place.

- **The Big Picture Idea**:
  - Picture interconnected word patterns that combine classical ideas together.
  - Whenever you see **top** in an English word, think of **blended classical concepts**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of place.
  - **Mental & Social**: How people experience, organize, or communicate about place.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Topic**: A matter dealt with in a text, discourse, or conversation.
  - **Topical**: Of immediate relevance, interest, or importance at the present time.
  - **Topically**: With reference to current topics.
  - **Topicality**: The state or quality of being of current interest or immediate relevance.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">top</mark>, think of <mark class="hl-def">blended classical concepts</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **top** serves as an initial combining prefix (`topo-`), a terminal combining suffix (`-tope`, `-topic`, `-topy`), and an independent root (`topos`, `topic`):
> - **1. Independent Words:** `topic` (subject of conversation), `topos` (a traditional literary motif or rhetorical convention).
> - **2. Initial Combining Form:** `topo-` (before consonants) / `top-` (before vowels):
>   - `topo-` + `-logy` (< *lógos* "study") → *topology* (geometry of spatial properties).
>   - `topo-` + `-graphy` (< *gráphein* "to write/map") → *topography* (mapping surface contours).
>   - `topo-` + `-nym` (< *ónoma* "name") → *toponym* (place name).
>   - `topo-` + `-centric` (< *kéntron* "center") → *topocentric* (centered on the observer's place).
> - **3. Speculative Political Prefixes with "-topia":**
>   - `u-` (< *ou-* "not") + `-topia` → *utopia* (ideal non-existent society).
>   - `dys-` (bad, abnormal) + `-topia` → *dystopia* (oppressive, nightmare society).
>   - `hetero-` (other, different) + `-topia` → *heterotopia* (Foucault's spaces of alternate otherness).
>   - `eu-` (good) + `-topia` → *eutopia* (place of happiness).
> - **4. Terminal Combining Forms in Physical Science & Medicine:**
>   - `iso-` (equal) + `-tope` → *isotope* (same place in periodic table).
>   - `ec-` (out of) + `-topic` → *ectopic* (displaced from natural anatomical site).
>   - `bio-` (life) + `-tope` → *biotope* (uniform biological habitat).
>   - `ortho-` (correct) + `-topic` → *orthotopic* (implanted in the correct anatomical location).
>   - `epi-` (upon) + `-tope` → *epitope* (molecular surface site recognized by antibodies).

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
> The semantic manifestations of **top** branch into six foundational disciplines:
> - **1. Rhetoric, Discourse & Literature:** In [[topic]], [[topical]], [[topos]], and [[topicality]], the root denotes the conceptual subject under discussion, immediate current events, or conventional narrative tropes.
> - **2. Political Philosophy & Sociological Speculation:** In [[utopia]], [[dystopia]], and [[heterotopia]], the root moves into political architecture: idealized visions of justice, oppressive totalitarian nightmares, or physical spaces of cultural divergence.
> - **3. Cartography, Geography & Onomastics:** In [[topography]], [[topographer]], and [[toponym]], the root records physical landscape features, elevation contour lines, and the linguistic origin of city and mountain names.
> - **4. Abstract Mathematics & Topology:** In [[topology]], [[topological]], and [[topologist]], the root designates spatial invariants preserved under continuous deformation (homeomorphism), such as knots, manifolds, and topological vector spaces.
> - **5. Nuclear Physics & Radiochemistry:** In [[isotope]], [[isotopic]], and [[radioisotope]], the root captures elemental nuclides possessing the same atomic number (occupying the same periodic table box) but differing in neutron count.
> - **6. Clinical Medicine, Immunology & Neuroanatomy:** In [[topical]] (ointments), [[ectopic]] (tubal pregnancy), [[epitope]] (antigenic determinant), and [[somatotopic]] (cortical body mapping), the root specifies precise anatomical or immunological locations.

---

## 🔀 4. Prefix & Combining Dynamics on top

### Compounding Bases & Morphological Shifts

| Combining Form / Affix | Affix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ou-` + `-topia` | no, not (*ou*) + place | [[utopia]] | An imagined place or state of things in which everything is perfect. |
| `dys-` + `-topia` | bad, disordered (*dys-*) + place | [[dystopia]] | An imagined state or society in which there is great suffering or injustice. |
| `hetero-` + `-topia` | other (*héteros*) + place | [[heterotopia]] | A physical space that exists outside all other spaces, harboring alterity (Foucault). |
| `iso-` + `-tope` | equal (*ísos*) + place | [[isotope]] | Each of two or more forms of the same element having the same periodic position. |
| `ek-` + `top-` + `-ic` | out of (*ek*) + place | [[ectopic]] | In an abnormal place or position (e.g., ectopic pregnancy, ectopic heartbeat). |
| `ortho-` + `-topic` | straight, correct (*orthós*) + place | [[orthotopic]] | Occurring at or grafted into the normal, natural anatomical location. |
| `epi-` + `-tope` | upon (*epí*) + place | [[epitope]] | The specific part of an antigen molecule to which an antibody attaches itself. |
| `para-` + `-tope` | beside (*pará*) + place | [[paratope]] | The specific site on an antibody that recognizes and binds to an antigen's epitope. |
| `bio-` + `-tope` | life (*bíos*) + place | [[biotope]] | An area of uniform environmental conditions providing a living place for plants and animals. |
| `somato-` + `-topic` | body (*sôma*) + place | [[somatotopic]] | Point-for-point correspondence of an area of the body to a specific point in the brain. |
| `syn-` + `-topic` | together (*syn-*) + place | [[syntopic]] | Pertaining to two or more related species living together in the exact same habitat. |
| `allo-` + `-topic` | other (*állos*) + place | [[allotopic]] | Occurring in different geographical regions or distinct habitats; geographically separated. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective | [[topical]], [[topographical]], [[topological]] | Pertaining to a local site, thematic matter, surface map, or continuous deformation. |
| `-ally` | Adverb | [[topically]], [[topographically]], [[isotopically]] | In a manner relating to location, local medical application, or isotopic composition. |
| `-graphy` | Noun (Mapping / Recording) | [[topography]] | The detailed description or mapping of the surface features of an area. |
| `-nym` / `-nymy` | Noun (Name / Nomenclature) | [[toponym]], [[toponymy]] | A place name; the etymological study of place names in a geographic region. |
| `-logy` / `-logist` | Noun (Science / Practitioner) | [[topology]], [[topologist]] | The mathematical study of spatial invariants; a specialist in topology. |
| `-ism` | Noun (Philosophy / Movement) | [[utopianism]], [[dystopianism]] | The pursuit of an ideal social order; the cultural depiction of dystopian tyranny. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🗺️ **Cartography, Surveying & GIS** | [[topography]], [[topographer]], [[topographic]], [[toponymy]] | USGS topographic elevation quadrangle maps, lidar digital elevation models, and geographic place-name etymologies. |
| 🧮 **Pure Mathematics & Geometry** | [[topology]], [[topologist]], [[topological]], [[topologize]] | Möbius strips, Klein bottles, Poincaré conjecture, manifold surgery, and topological quantum computing. |
| ⚛️ **Nuclear Chemistry & Geochronology** | [[isotope]], [[isotopic]], [[radioisotope]], [[isotopy]] | Carbon-14 archaeological dating, uranium-235 enrichment centrifuges, and stable oxygen isotope climate proxies in ice cores. |
| 🏥 **Medicine, Pharmacology & Surgery** | [[topical]], [[ectopic]], [[orthotopic]], [[epitope]] | Topical hydrocortisone skin ointments, emergency laparoscopy for ruptured ectopic pregnancy, and orthotopic heart transplantation. |
| 🧠 **Neuroscience & Sensory Physiology** | [[somatotopic]], [[retinotopic]], [[tonotopic]] | Penfield's sensory homunculus, primary visual cortex (V1) retinotopy, and cochlear tonotopic frequency maps. |
| 📚 **Literature, Political Theory & Philosophy** | [[utopia]], [[dystopia]], [[heterotopia]], [[topos]], [[topic]] | George Orwell's *1984*, Aldous Huxley's *Brave New World*, Michel Foucault's spatial theory, and rhetorical motifs. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[biotope]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin top within the domain of Greek-Latin Hybrid.<br>**2.** A technical or specialized form exhibiting the properties of top in systematic terminology. | *"In academic literature, biotope designates pertaining to, derived from, or characteristic of latin top within the domain of greek-latin hybrid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contopus]] | noun | **1.** Pewees. | *"Classical and authoritative lexicons catalog contopus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cotopaxi]] | noun | **1.** The world's largest active volcano; located in the andes in north central ecuador. | *"In academic literature, cotopaxi designates the world's largest active volcano; located in the andes in north central ecuador."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[countertop]] | noun | **1.** The top side of a counter. | *"Keep out of trouble and you'll get by OK." As he finished each weapon inspection he returned it to the countertop, pointing the muzzle into a shielded enclosure and stepped back behind a barrier."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[dystopia]] | noun | **1.** State in which the conditions of life are extremely bad as from deprivation or oppression or terror.<br>**2.** A work of fiction describing an imaginary place where life is extremely bad because of deprivation or oppression or terror. | *"In academic literature, dystopia designates state in which the conditions of life are extremely bad as from deprivation or oppression or terror."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dystopian]] | adjective | **1.** Of or pertaining to or resembling a dystopia.<br>**2.** As bad as can be; characterized by human misery; - susan sontag. | *"In academic literature, dystopian designates of or pertaining to or resembling a dystopia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ectopia]] | noun | **1.** Abnormal position of a part or organ (especially at the time of birth). | *"In academic literature, ectopia designates abnormal position of a part or organ (especially at the time of birth)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ectopic]] | adjective | **1.** Exhibiting ectopia. | *"In academic literature, ectopic designates exhibiting ectopia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isotope]] | noun | **1.** One of two or more atoms with the same atomic number but with different numbers of neutrons. | *"In academic literature, isotope designates one of two or more atoms with the same atomic number but with different numbers of neutrons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isotopic]] | adjective | **1.** Of or relating to or having the relation of an isotope. | *"In academic literature, isotopic designates of or relating to or having the relation of an isotope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octopod]] | noun | **1.** A cephalopod with eight arms but lacking an internal shell. | *"In academic literature, octopod designates a cephalopod with eight arms but lacking an internal shell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octopoda]] | noun | **1.** Octopuses and paper nautilus. | *"In academic literature, octopoda designates octopuses and paper nautilus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octopodidae]] | noun | **1.** A family of octopoda. | *"In academic literature, octopodidae designates a family of octopoda."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octopus]] | noun | **1.** Tentacles of octopus prepared as food.<br>**2.** Bottom-living cephalopod having a soft oval body with eight long tentacles. | *"Well,” said Conseil, with the most serious air in the world, “I remember perfectly to have seen a large vessel drawn under the waves by an octopus’s arm.” “You saw that?” said the Canadian."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[overtop]] | verb | **1.** Look down on. | *"I saw clearly the cultivated ranges, and the several mountain-chains that run parallel with the side, and the volcanoes that overtop Mouna-Rea, which rise 5,000 yards above the level of the sea."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[protoplasm]] | noun | **1.** The substance of a living cell (including cytoplasm and nucleus). | *"The oogonia are large spherical or ovoid cells, with a thickish membrane containing a granular protoplasm, or formative fluid."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[protoplast]] | noun | **1.** A biological unit consisting of a nucleus and the body of cytoplasm with which it interacts. | *"Those forms, unalterable first as last, proved him her copier, not the protoplast of nature: what could come of being free by action to exhibit tree for tree, bird, beast, for beast and bird, or prove earth bore one veritable man or woman more?"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[subtopia]] | noun | **1.** Monotonous urban sprawl of standardized buildings. | *"In academic literature, subtopia designates monotonous urban sprawl of standardized buildings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[top]] | noun | **1.** The upper part of anything.<br>**2.** The highest or uppermost side of anything. | *"Who were below him He us’d as creatures of another place, And bow’d his eminent top to their low ranks, Making them proud of his humility, In their poor praise he humbled."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[topaz]] | noun | **1.** A yellow quartz.<br>**2.** A mineral (fluosilicate of aluminum) that occurs in crystals of various colors and is used as a gemstone. | *"It shone also on the countless globes of the oranges and lemons, making them glow like lighted lamps of pale topaz and transparent red-gold among the dark-green leaves."* — C. N. Williamson, *Angel Unawares: A Story of Christmas Eve* |
| [[topcoat]] | noun | **1.** A heavy coat worn over clothes in winter. | *"In academic literature, topcoat designates a heavy coat worn over clothes in winter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tope]] | noun | **1.** A dome-shaped shrine erected by buddhists.<br>**2.** Drink excessive amounts of alcohol; be an alcoholic. | *"Jasper was that, Tope?” “Yes, Mr."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[topee]] | noun | **1.** A lightweight hat worn in tropical countries for protection from the sun. | *"In academic literature, topee designates a lightweight hat worn in tropical countries for protection from the sun."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topeka]] | noun | **1.** The capital of the state of kansas; located in eastern kansas on the kansas river. | *"Our party entered the State at Kansas City, and took the cars for Topeka, its capital."* — W. E. Webb, *Buffalo Land* |
| [[toper]] | noun | **1.** A person who drinks alcoholic beverages (especially to excess). | *"It may be observed that such a class of mug is called a God-forgive-me in Weatherbury and its vicinity for uncertain reasons; probably because its size makes any given toper feel ashamed of himself when he sees its bottom in drinking it empty."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[topi]] | noun | **1.** A lightweight hat worn in tropical countries for protection from the sun.<br>**2.** A large south african antelope; considered the swiftest hoofed mammal. | *"In academic literature, topi designates a lightweight hat worn in tropical countries for protection from the sun."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topiary]] | noun | **1.** A garden having shrubs clipped or trimmed into decorative shapes especially of animals.<br>**2.** Making decorative shapes by trimming shrubs or trees. | *"In academic literature, topiary designates a garden having shrubs clipped or trimmed into decorative shapes especially of animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topic]] | noun | **1.** The subject matter of a conversation or discussion.<br>**2.** Some situation or event that is thought about. | *"At Blaze and Sparkle’s the jewellers and at Sheen and Gloss’s the mercers, it is and will be for several hours the topic of the age, the feature of the century."* — Charles Dickens, *Bleak House* |
| [[topical]] | adjective | **1.** Pertaining to the surface of a body part.<br>**2.** Of or relating to or arranged by topics. | *"Union citizen Harrison was unavailable for comment at this time, but Topical News will present his views and such other clues when more ensues."* — Algis Budrys, *Citadel* |
| [[topicality]] | noun | **1.** The attribute of being of interest at the present time. | *"In academic literature, topicality designates the attribute of being of interest at the present time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topicalization]] | noun | **1.** (linguistics) emphasis placed on the topic or focus of a sentence by preposing it to the beginning of the sentence; placing the topic at the beginning of the sentence is typical for english. | *"In academic literature, topicalization designates (linguistics) emphasis placed on the topic or focus of a sentence by preposing it to the beginning of the sentence; placing the topic at the beginning of the sentence is typical for english."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topicalize]] | verb | **1.** Emphasize by putting heavy stress on or by moving to the front of the sentence. | *"In academic literature, topicalize designates emphasize by putting heavy stress on or by moving to the front of the sentence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topically]] | adverb | **1.** To a restricted area of the body. | *"In academic literature, topically designates to a restricted area of the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topless]] | adjective | **1.** Having no top.<br>**2.** Having the breasts uncovered or featuring such nudity. | *"In academic literature, topless designates having no top."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topmast]] | noun | **1.** The mast next above a lower mast and topmost in a fore-and-aft rig. | *"And Montague our topmast; what of him?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[topminnow]] | noun | **1.** Small usually brightly-colored viviparous surface-feeding fishes of fresh or brackish warm waters; often used in mosquito control.<br>**2.** Freshwater fish of central america having a long swordlike tail; popular aquarium fish. | *"In academic literature, topminnow designates small usually brightly-colored viviparous surface-feeding fishes of fresh or brackish warm waters; often used in mosquito control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topmost]] | adjective | **1.** At or nearest to the top. | *"See and do that; and take out the topmost paper—Last Will and Testament—big printed.” “No, sir,” said Mary, in a firm voice, “I cannot do that.” “Not do it?"* — George Eliot, *Middlemarch* |
| [[topnotch]] | adjective | **1.** Of the highest quality. | *"In academic literature, topnotch designates of the highest quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topognosia]] | noun | **1.** Recognition of the location of a stimulus on the skin. | *"In academic literature, topognosia designates recognition of the location of a stimulus on the skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topognosis]] | noun | **1.** Recognition of the location of a stimulus on the skin. | *"In academic literature, topognosis designates recognition of the location of a stimulus on the skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topographic]] | adjective | **1.** Concerned with topography. | *"In academic literature, topographic designates concerned with topography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topographical]] | adjective | **1.** Concerned with topography. | *"But in her topographical ignorance as a late comer to the place, she misreckoned the distance of her journey as not much more than half what it really was."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[topographically]] | adverb | **1.** With regard to topography. | *"In academic literature, topographically designates with regard to topography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topography]] | noun | **1.** The configuration of a surface and the relations among its man-made and natural features.<br>**2.** Precise detailed study of the surface features of a region. | *"I don’t know whether you have given much study to the topography."* — George Eliot, *Middlemarch* |
| [[topolatry]] | noun | **1.** The worship of places. | *"In academic literature, topolatry designates the worship of places."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topologic]] | adjective | **1.** Of or relating to topology. | *"In academic literature, topologic designates of or relating to topology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topological]] | adjective | **1.** Of or relating to topology. | *"In academic literature, topological designates of or relating to topology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topologically]] | adverb | **1.** From the point of view of topology. | *"In academic literature, topologically designates from the point of view of topology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topology]] | noun | **1.** Topographic study of a given place (especially the history of the place as indicated by its topography).<br>**2.** The study of anatomy based on regions or divisions of the body and emphasizing the relations between various structures (muscles and nerves and arteries etc.) in that region. | *"In academic literature, topology designates topographic study of a given place (especially the history of the place as indicated by its topography)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[toponomy]] | noun | **1.** The nomenclature of regional anatomy.<br>**2.** The branch of lexicology that studies the place names of a region or a language. | *"In academic literature, toponomy designates the nomenclature of regional anatomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[toponym]] | noun | **1.** The name by which a geographical place is known. | *"In academic literature, toponym designates the name by which a geographical place is known."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[toponymy]] | noun | **1.** The nomenclature of regional anatomy.<br>**2.** The branch of lexicology that studies the place names of a region or a language. | *"In academic literature, toponymy designates the nomenclature of regional anatomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topos]] | noun | **1.** A traditional theme or motif or literary convention. | *"In academic literature, topos designates a traditional theme or motif or literary convention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topped]] | verb | **1.** Be superior or better than some standard.<br>**2.** Pass by, over, or under without making contact. | *"The shot of a rifle loses its sharpness in the moist air, and its smoke moves in a tardy little cloud towards the green rise, coppice-topped, that makes a background for the falling rain."* — Charles Dickens, *Bleak House* |
| [[topper]] | noun | **1.** A worker who makes or adds the top to something.<br>**2.** A worker who cuts tops off (of trees or vegetables etc.). | *"In the black topper the light was completely hidden, and they flew on in silence."* — J. M. Barrie, *Peter Pan* |
| [[topping]] | noun | **1.** A flavorful addition on top of a dish.<br>**2.** Be superior or better than some standard. | *"And topping all others in boasting."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tops]] | noun | **1.** The upper part of anything.<br>**2.** The highest or uppermost side of anything. | *"What valiant foemen, like to autumn’s corn, Have we mowed down in tops of all their pride!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[topsail]] | noun | **1.** A sail (or either of a pair of sails) immediately above the lowermost sail of a mast and supported by a topmast. | *"At times junks of Japan were sighted, but never lifted a familiar topsail of old Europe above the sea-rim."* — Jack London, *The Jacket (The Star-Rover)* |
| [[topside]] | noun | **1.** (usually plural) weather deck; the part of a ship's hull that is above the waterline. | *"Circle them, Brad, let's see what's on the other side." Brad took the utility around to starboard, then topside and below."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[topsoil]] | noun | **1.** The layer of soil on the surface. | *"In academic literature, topsoil designates the layer of soil on the surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topspin]] | noun | **1.** Forward spin (usually of a moving ball) that is imparted by an upward stroke. | *"In academic literature, topspin designates forward spin (usually of a moving ball) that is imparted by an upward stroke."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topsy-turvily]] | adverb | **1.** In disorderly haste. | *"In academic literature, topsy-turvily designates in disorderly haste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topsy-turvy]] | adjective | **1.** In utter disorder.<br>**2.** In a disordered manner. | *"In academic literature, topsy-turvy designates in utter disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topsy-turvydom]] | noun | **1.** A state of extreme confusion and disorder. | *"In academic literature, topsy-turvydom designates a state of extreme confusion and disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topsy-turvyness]] | noun | **1.** A state of extreme confusion and disorder. | *"In academic literature, topsy-turvyness designates a state of extreme confusion and disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[utopia]] | noun | **1.** A book written by sir thomas more (1516) describing the perfect society on an imaginary island.<br>**2.** Ideally perfect state; especially in its social and political and moral aspects. | *"But utopian (from _utopia_, Greek for no place) means nonexistent, and Marxian socialism surely was that."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[utopian]] | noun | **1.** An idealistic (but usually impractical) social reformer.<br>**2.** Of or pertaining to or resembling a utopia. | *"Utopian nature of "scientific" socialism. § 19."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[utopianism]] | noun | **1.** The political orientation of a utopian who believes in impossibly idealistic schemes of social perfection. | *"In academic literature, utopianism designates the political orientation of a utopian who believes in impossibly idealistic schemes of social perfection."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Greek-Latin Hybrid]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TOP
  </div>
</div>
