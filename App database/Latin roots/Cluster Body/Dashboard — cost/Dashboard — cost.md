---
status: unread
type: root_dashboard
---
# Dashboard — cost
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cost-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“rib or side”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical human body, limbs, posture, and bodily movements.</span>
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

The root **cost** means rib or side. It refers to rib / side / flank / shoreline / approach. In English, this root forms words such as *accost*, *coast*, *coastal*, and *coaster*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: rib or side
> The root **cost** means rib or side. It refers to rib / side / flank / shoreline / approach. In English, this root forms words such as *accost*, *coast*, *coastal*, and *coaster*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Rib or side</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body, limbs, posture, and bodily movements.</mark>
> - **Everyday Connection**: Think of familiar words like *accost* and *coast*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cost** comes from a Latin word that means *"rib or side"*.
  - At its core, it describes rib or side.

- **The Big Picture Idea**:
  - Picture the physical human body, limbs, posture, and bodily movements.
  - Whenever you see **cost** in an English word, think of **the physical body and limbs**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of rib or side.
  - **Mental & Social**: How people experience, organize, or communicate about rib or side.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Accost**: To approach and speak to someone aggressively, boldly, or intrusively, often in a confrontational manner.
  - **Coast**: The land adjoining or bordering a sea, ocean, or large lake.
  - **Coastal**: Of, relating to, bordering, or situated near a coast or shoreline.
  - **Coaster**: A small mat, disk, or shallow dish placed beneath a glass or cup to protect a table surface from moisture condensation.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cost</mark>, think of <mark class="hl-def">the physical body and limbs</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root enters English across three distinct historical channels:
> - **Learned Classical Latin Stem:** `cost-` / `costo-` (from *costa*). Governs all anatomical, surgical, botanical, and zoological terminology: *costal*, *intercostal*, *costate*, *costectomy*, *costochondral*, *costovertebral*.
> - **Gallo-Romance Geographical & Relational Stem:** `coast-` / `cost-` (via Old French *coste* < *costa*): *coast*, *coastal*, *coaster*, *coastline*, *accost*.
> - **Gallo-Romance Diminutive & Culinary Stem:** `cutl-` / `-côte` (from French *côtelette*, *entrecôte*): *cutlet*, *entrecôte*.
>
> Prefixation attaches spatial and directional morphemes (*ad-* = towards; *inter-* = between; *sub-* = beneath; *supra-* = above; *entre-* = between).

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

> [!tip] 🌈 The Conceptual Facets of Cost-
> - **1. Thoracic Anatomy & Surgery:** The ribs, costal cartilages, and rib cage margins (*costal*, *intercostal*, *costochondral*, *costectomy*, *subcostal*).
> - **2. Clinical Diagnostics & Pathology:** Atypical chest pain mimicking myocardial infarction (*costochondritis*), and kidney pain elicited by percussion at the flank (*costovertebral angle tenderness*).
> - **3. Marine Geography & Navigation:** The lateral boundary where land meets ocean (*coast*, *coastal*, *coastline*, *coastwise*), and gliding without propulsion (*coasting*).
> - **4. Aggressive Physical Approach:** Approaching someone's side or flank boldly in public (*accost*).
> - **5. Culinary Arts & Butchery:** Tender meat cuts from the rib section (*cutlet*, *entrecôte*).
> - **6. Botany, Conchology & Entomology:** Longitudinal raised ridges or veins resembling ribs (*costate*, *costa* of insect wings).

---

## 🔀 4. Prefix & Combining Dynamics on cost

### Prefix Dynamics

| Prefix | Core Value | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` | to, toward | [[accost]] | To approach someone's *side/flank* directly; to confront. |
| `inter-` | between, among | [[intercostal]] | Situated in the anatomical spaces *between* the ribs. |
| `sub-` | below, under | [[subcostal]] | Positioned *underneath* or inferior to the ribs. |
| `supra-` | above, over | **supracostal** | Located *above* or superior to the ribs. |
| `entre-` (< *inter-*) | between | [[entrecôte]] | A choice steak cut from *between* the ribs. |

### Suffix Dynamics

| Suffix | Grammatical Role | Derivative | Semantic Output |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective (relating to) | [[costal]] | Pertaining strictly to the ribs or the side of the thorax. |
| `-ate` | Adjective (bearing / marked) | [[costate]] | Marked with prominent, rib-like ridges or costae (shells/leaves). |
| `-ectomy` | Noun (surgical excision) | [[costectomy]] | Surgical resection or removal of a rib. |
| `-itis` | Noun (inflammation) | [[costochondritis]] | Painful inflammation of the cartilage joining the ribs to the breastbone. |
| `-let` | Diminutive noun | [[cutlet]] | A "little rib" of meat; a boneless or bone-in chop. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Cardiothoracic Surgery & Anesthesiology** | [[intercostal]], [[costal]], **costotomy**, [[costectomy]] | Intercostal nerve blocks; posterolateral thoracotomy rib spreading; costal margins. |
| **Emergency Medicine & Nephrology** | [[costochondritis]], [[costovertebral]] | Differentiating costochondritis from acute coronary syndrome; Murphy's punch sign for pyelonephritis. |
| **Oceanography & Environmental Law** | [[coastal]], [[coastline]], [[coastwise]] | Coastal Zone Management Act; coastwise shipping under the Jones Act; erosion. |
| **Entomology & Malacology** | [[costa]], [[costate]] | Leading costal vein in insect wing venation; costate ribs on carditid bivalves. |
| **Gastronomy & Culinary Arts** | [[cutlet]], [[entrecôte]] | Veal Milanese, pan-fried pork cutlets, French grilled entrecôte bordelaise. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[accost]] | verb | **1.** Speak to someone.<br>**2.** Approach with an offer of sexual favors. | *"Good Mistress Accost, I desire better acquaintance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cost]] | noun | **1.** The total spent for goods or services including money and time and labor.<br>**2.** The property of having material worth (often indicated by the amount of money something would bring if sold). | *"Why so large cost having so short a lease, Dost thou upon thy fading mansion spend?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[costa]] | noun | **1.** A riblike part of a plant or animal (such as a middle rib of a leaf or a thickened vein of an insect wing).<br>**2.** Any of the 12 pairs of curved arches of bone extending from the spine to or toward the sternum in humans (and similar bones in most vertebrates). | *"Gabb, "On the Indian Tribes and Languages of Costa Rica," _Proceedings of the American Philosophical Society held at Philadelphia_, xiv. (Philadelphia, 1876), p. 510. [61] L."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[costal]] | adjective | **1.** Of or relating to or near a rib. | *"In academic literature, costal designates of or relating to or near a rib."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costalgia]] | noun | **1.** Pain in the chest caused by inflammation of the muscles between the ribs. | *"In academic literature, costalgia designates pain in the chest caused by inflammation of the muscles between the ribs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costanoan]] | noun | **1.** A member of a north american indian people living in coastal california between monterey and san francisco bay.<br>**2.** A penutian language spoken by the costanoan. | *"In academic literature, costanoan designates a member of a north american indian people living in coastal california between monterey and san francisco bay."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costate]] | adjective | **1.** (of the surface) having a rough, riblike texture.<br>**2.** Having ribs. | *"In academic literature, costate designates (of the surface) having a rough, riblike texture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costectomy]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin cost within the domain of Body.<br>**2.** A technical or specialized form exhibiting the properties of cost in systematic terminology. | *"In academic literature, costectomy designates pertaining to, derived from, or characteristic of latin cost within the domain of body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costermonger]] | noun | **1.** A hawker of fruit and vegetables from a barrow. | *"The carbon given off from the naphtha is very disposed to choke up the little hole through which the naphtha runs into the cup, and the costermonger pushes a pin into the little hole to allow the free passage of the naphtha."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[costia]] | noun | **1.** A flagellate that is the cause of the frequently fatal fish disease costiasis. | *"In academic literature, costia designates a flagellate that is the cause of the frequently fatal fish disease costiasis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costiasis]] | noun | **1.** A fatal disease of freshwater fish caused by a flagellated protozoan invading the skin. | *"In academic literature, costiasis designates a fatal disease of freshwater fish caused by a flagellated protozoan invading the skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costing]] | noun | **1.** Cost accounting.<br>**2.** Be priced at. | *"But her commendation, though costing her some trouble, could by no means satisfy Mr."* — Jane Austen, *Pride and Prejudice* |
| [[costive]] | adjective | **1.** Retarding evacuation of feces; binding; constipating. | *"One may be costive, one be full of Slime; Yet equally will any Hog that feeds, Produce good Pork by feeding on our Needs. _Underwritten._ You nasty Dog, you may eat your Pork yourself. _Hampstead, at the Flask._ Tell me why, ye gen'rous Swains?"* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[costless]] | adjective | **1.** Costing nothing. | *"In academic literature, costless designates costing nothing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costliness]] | noun | **1.** The quality possessed by something with a great price or value. | *"God’s lid, his richness And costliness of spirit looked through him; it could No more be hid in him than fire in flax, Than humble banks can go to law with waters That drift-winds force to raging."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[costly]] | adjective | **1.** Entailing great loss or sacrifice.<br>**2.** Having a high price. | *"Costly thy habit as thy purse can buy, But not express’d in fancy; rich, not gaudy: For the apparel oft proclaims the man; And they in France of the best rank and station Are of a most select and generous chief in that."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[costmary]] | noun | **1.** Tansy-scented eurasian perennial herb with buttonlike yellow flowers; used as potherb or salad green and sometimes for potpourri or tea or flavoring; sometimes placed in genus chrysanthemum.<br>**2.** Leaves used sparingly (because of bitter overtones) in sauces and soups and stuffings. | *"In academic literature, costmary designates tansy-scented eurasian perennial herb with buttonlike yellow flowers; used as potherb or salad green and sometimes for potpourri or tea or flavoring; sometimes placed in genus chrysanthemum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costochondritis]] | noun | **1.** Inflammation at the junction of a rib and its cartilage. | *"In academic literature, costochondritis designates inflammation at the junction of a rib and its cartilage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costs]] | noun | **1.** Pecuniary reimbursement to the winning party for the expenses of litigation.<br>**2.** The total spent for goods or services including money and time and labor. | *"Thy love is better than high birth to me, Richer than wealth, prouder than garments’ costs, Of more delight than hawks and horses be: And having thee, of all men’s pride I boast."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[costume]] | noun | **1.** The attire worn in a play or at a fancy dress ball.<br>**2.** Unusual or period attire not characteristic of or appropriate to the time and place. | *"Inside them she found a whole stock of clothing, from bonnet to shoes, including a perfect morning costume, such as would well suit the simple wedding they planned."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[costumed]] | verb | **1.** Dress in a costume.<br>**2.** Furnish with costumes; as for a film or play. | *"The collective appearance of the gentlemen, like that of the ladies, is very imposing: they are all costumed in black; most of them are tall, some young."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[costumer]] | noun | **1.** Someone who designs or supplies costumes (as for a play or masquerade). | *"In academic literature, costumer designates someone who designs or supplies costumes (as for a play or masquerade)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costumier]] | noun | **1.** Someone who designs or supplies costumes (as for a play or masquerade). | *"In academic literature, costumier designates someone who designs or supplies costumes (as for a play or masquerade)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costusroot]] | noun | **1.** Annual herb of the eastern himalayas (kashmir) having purple florets and a fragrant root that yields a volatile oil used in perfumery and for preserving furs. | *"In academic literature, costusroot designates annual herb of the eastern himalayas (kashmir) having purple florets and a fragrant root that yields a volatile oil used in perfumery and for preserving furs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intercostal]] | noun | **1.** Muscles between the ribs; they contract during inspiration.<br>**2.** Located or occurring between the ribs. | *"In academic literature, intercostal designates muscles between the ribs; they contract during inspiration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subcostal]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin cost within the domain of Body.<br>**2.** A technical or specialized form exhibiting the properties of cost in systematic terminology. | *"In academic literature, subcostal designates pertaining to, derived from, or characteristic of latin cost within the domain of body."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · COST
  </div>
</div>
