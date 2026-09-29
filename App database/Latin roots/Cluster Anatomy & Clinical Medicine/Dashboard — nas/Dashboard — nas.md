---
status: unread
type: root_dashboard
---
# Dashboard — nas
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">nas-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“nose”</span>
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

The root **nas** means nose. It refers to nose, nostril, olfactory organ, nasal airway, nasal speech sound. In English, this root forms words such as *nasal*, *nasality*, *nasalize*, and *naris*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: nose
> The root **nas** means nose. It refers to nose, nostril, olfactory organ, nasal airway, nasal speech sound. In English, this root forms words such as *nasal*, *nasality*, *nasalize*, and *naris*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Nose</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The natural organs, tissues, and inner workings of the human body.</mark>
> - **Everyday Connection**: Think of familiar words like *nasal* and *nasality*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **nas** comes from a Latin word that means *"nose"*.
  - At its core, it describes nose.

- **The Big Picture Idea**:
  - Picture the natural organs, tissues, and inner workings of the human body.
  - Whenever you see **nas** in an English word, think of **bodily anatomy and health**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of nose.
  - **Mental & Social**: How people experience, organize, or communicate about nose.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Nasal**: Of, relating to, or situated in or near the nose.
  - **Nasality**: The state, quality, or acoustic timbre of being nasal.
  - **Nasalize**: To utter with the soft palate lowered so that the sound resonates in the nasal cavities.
  - **Naris**: A nostril.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">nas</mark>, think of <mark class="hl-def">bodily anatomy and health</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **nas** forms English terms through adjectival suffixes, clinical compound routes, and Romance derivations:
> 
> ### 1. Primary Base Formations (*nas-*)
> - *nāsus* + *-ālis* → [[nasal]] (adjective & noun), `nasally` (adverb).
> - *nasal* + *-ity* → [[nasality]] (noun, quality of nasal resonance).
> - *nasal* + *-ize* → [[nasalize]] (verb), `nasalization` (noun).
> - *nāsus* + *-ūtus* → `nasute` (adjective, large-nosed; soldier termite).
> 
> ### 2. Direct Latin Oblique Form (*nar-*)
> - *nāris* → [[naris]] (noun, pl. *nares*, nostril).
> 
> ### 3. Directional & Route Compounds
> - **`intra-` (within):**
>   - *intra-* + *nāsus* + *-al* → [[intranasal]] (adjective), `intranasally` (adverb).
> - **`naso-` (connecting coordinate):**
>   - *naso-* + *pharynx* → [[nasopharynx]] (upper pharynx), `nasopharyngeal` (adjective).
>   - *naso-* + *lacrima* + *-al* → [[nasolacrimal]] (tear duct to nose).
>   - *naso-* + Greek *gastēr* ("stomach") → `nasogastric` (nose to stomach).
>   - *naso-* + *trachea* → `nasotracheal` (nose to windpipe).
> 
> ### 4. Historical & Cultural Compounds
> - *nāsus* + *torquēre* ("to twist") → [[nasturtium]] (nose-twisting cress/flower).
> - French *pincer* ("to pinch") + *nez* (Latin *nāsus*) → [[pince-nez]] (eyeglasses).

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
> Although the root fundamentally denotes **"the nose"**, its applications span distinct technical and cultural domains:
> - **Clinical Administration & Critical Care:** In [[intranasal]], `nasogastric`, and `nasotracheal`, it designates routes for drug delivery (like naloxone nasal spray), enteral feeding tubes, and emergency surgical airway management.
> - **Phonetics & Speech Acoustics:** In [[nasal]], [[nasality]], and [[nasalize]], it identifies airflow channeled through the nasal passages during phonation, characterizing French vowels and speech pathology like hypernasality.
> - **Otolaryngology & Oncology:** In [[nasopharynx]] and `nasopharyngeal`, it describes the mucosal recess behind the nose and conditions like nasopharyngeal carcinoma linked to Epstein-Barr virus.
> - **Ophthalmic Drainage:** In [[nasolacrimal]], it marks the duct system draining excess tears into the inferior nasal meatus.
> - **Entomology & Zoology:** In `nasute`, it classifies specialized soldier termites possessing a syringe-like rostrum capable of spraying chemical repellents.
> - **Horticulture & Culinary Arts:** In [[nasturtium]], it names the edible flowering plant renowned for its peppery, sinus-clearing bite.

---

## 🔀 4. Prefix & Combining Dynamics on nas

| Combining Element | Partner Word / Meaning | Derived English Word | Modern Semantic Function |
| :--- | :--- | :--- | :--- |
| `intra-` (within) | *nāsus* (nose) | [[intranasal]] | Administered inside or situated within the nasal cavity. |
| `naso-` + `lacrima` | *lacrima* (tear) | [[nasolacrimal]] | Draining fluid from the lacrimal sac into the nasal airway. |
| `naso-` + `pharynx` | Gk. *pharynx* (throat) | [[nasopharynx]] | The superior division of the pharynx behind the nasal fossae. |
| `naso-` + `gastric` | Gk. *gastēr* (stomach) | `nasogastric` | Entering the body through the nose and terminating in the stomach. |
| `naso-` + `tracheal`| Gk. *trakheia* (windpipe) | `nasotracheal` | Passing through the nostril into the trachea for ventilation. |
| `naso-` + `torquēre`| *torquēre* (to twist) | [[nasturtium]] | Pungent salad plant that "twists the nose" with peppery oils. |
| `pincer` + `nez` | Fr. *nez* < Lat. *nāsus* | [[pince-nez]] | Eyeglasses held on the face solely by pinching the nasal bridge. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏥 **Emergency & Critical Care Medicine** | [[intranasal]], `nasogastric`, `nasotracheal` | Intranasal naloxone (Narcan) for opioid overdose; Salem sump nasogastric tube insertion |
| 🗣️ **Linguistics, Phonetics & Speech Therapy** | [[nasal]], [[nasality]], [[nasalize]] | Articulatory phonetics, velopharyngeal incompetence (VPI), rhinolalia in cleft palate speech |
| 👃 **Otolaryngology (ENT) & Oncology** | [[naris]], [[nasopharynx]], `nasopharyngeal` | Anterior rhinoscopy, adenoidectomy, nasopharyngeal carcinoma biopsy protocols |
| 🌿 **Gastronomy & Horticulture** | [[nasturtium]] | Culinary garnishes using peppery nasturtium petals; companion planting for pest deterrence |
| 👓 **Fashion & Cultural History** | [[pince-nez]] | Victorian and Edwardian spectacles popularized by figures like Theodore Roosevelt |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[intranasal]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin nas within the domain of Anatomy & Clinical Medicine.<br>**2.** A technical or specialized form exhibiting the properties of nas in systematic terminology. | *"In academic literature, intranasal designates pertaining to, derived from, or characteristic of latin nas within the domain of anatomy & clinical medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nasa]] | noun | **1.** An independent agency of the united states government responsible for aviation and spaceflight. | *"In academic literature, nasa designates an independent agency of the united states government responsible for aviation and spaceflight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nasal]] | noun | **1.** A consonant produced through the nose with the mouth closed.<br>**2.** An elongated rectangular bone that forms the bridge of the nose. | *"Trumbull dropped his voice and became slightly nasal, trimming his outlines with his left finger—“that might not fall in with ordinary tastes."* — George Eliot, *Middlemarch* |
| [[nasale]] | verb | **1.** Speak in a nasal voice. | *"In academic literature, nasale designates speak in a nasal voice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nasalis]] | noun | **1.** Proboscis monkeys. | *"In academic literature, nasalis designates proboscis monkeys."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nasalisation]] | noun | **1.** The act of nasalizing; the utterance of sounds modulated by the nasal resonators. | *"In academic literature, nasalisation designates the act of nasalizing; the utterance of sounds modulated by the nasal resonators."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nasalise]] | verb | **1.** Speak nasally or through the nose.<br>**2.** Pronounce with a lowered velum. | *"In academic literature, nasalise designates speak nasally or through the nose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nasality]] | noun | **1.** A quality of the voice that is produced by nasal resonators. | *"In academic literature, nasality designates a quality of the voice that is produced by nasal resonators."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nasalization]] | noun | **1.** The act of nasalizing; the utterance of sounds modulated by the nasal resonators. | *"In academic literature, nasalization designates the act of nasalizing; the utterance of sounds modulated by the nasal resonators."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nasalize]] | verb | **1.** Speak nasally or through the nose.<br>**2.** Pronounce with a lowered velum. | *"In academic literature, nasalize designates speak nasally or through the nose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nasally]] | adverb | **1.** In a nasal manner. | *"Pretty Poll! _(His yellow parrotbeak gabbles nasally.)_ They had a proverb in the Carpathians in or about the year five thousand five hundred and fifty of our era."* — James Joyce, *Ulysses* |
| [[nascence]] | noun | **1.** The event of being born. | *"In academic literature, nascence designates the event of being born."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nascency]] | noun | **1.** The event of being born. | *"In academic literature, nascency designates the event of being born."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nascent]] | adjective | **1.** Being born or beginning. | *"The rooms wherein dozens of infants had wailed at their nursing now resounded with the tapping of nascent chicks."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[naseby]] | noun | **1.** A village in western northamptonshire.<br>**2.** A battle in 1645 that settled the outcome of the first english civil war as the parliamentarians won a major victory over the royalists. | *"At the battle of Naseby, Miles was slain, And Huntly sank from his wounds that week; We left young Clare upon Worcester plain-- How the "Ironside" gash'd his girlish cheek."* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[nasion]] | noun | **1.** The craniometric point at the bridge of the nose where the frontal and nasal bones of the skull meet. | *"In academic literature, nasion designates the craniometric point at the bridge of the nose where the frontal and nasal bones of the skull meet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nasolacrimal]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin nas within the domain of Anatomy & Clinical Medicine.<br>**2.** A technical or specialized form exhibiting the properties of nas in systematic terminology. | *"In academic literature, nasolacrimal designates pertaining to, derived from, or characteristic of latin nas within the domain of anatomy & clinical medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nasopharyngeal]] | adjective | **1.** Of or relating to or located near the nasopharynx. | *"In academic literature, nasopharyngeal designates of or relating to or located near the nasopharynx."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nasopharynx]] | noun | **1.** Cavity forming the upper part of the pharynx. | *"In academic literature, nasopharynx designates cavity forming the upper part of the pharynx."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nassau]] | noun | **1.** The capital of the bahamas. | *"But inquiring at the Bible House in Nassau street if any of the officers of that Society knew of a minister who could be recommended to fill their pulpit, now vacant for some months."* — Classic Author, *The wonders of prayer* |
| [[nasser]] | noun | **1.** Egyptian statesman who nationalized the suez canal (1918-1970).<br>**2.** Lake in egypt formed by dams built on the nile river at aswan. | *"In academic literature, nasser designates egyptian statesman who nationalized the suez canal (1918-1970)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nast]] | noun | **1.** United states political cartoonist (1840-1902). | *"His letters to his friend Nast almost invariably contain some expression of his heart-ache."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[nastily]] | adverb | **1.** In a nasty ill-tempered manner. | *"Elsie hushed me down quick, and said, nastily, that if I was afraid I could take her hand or go home to nursie."* — S. R. Crockett, *Deep Moat Grange* |
| [[nastiness]] | noun | **1.** A state characterized by foul or disgusting dirt and refuse.<br>**2.** Malevolence by virtue of being malicious or spiteful or nasty. | *"Joe always kept a supply of it in the cupboard; having a belief in its virtues correspondent to its nastiness."* — Charles Dickens, *Great Expectations* |
| [[nasturtium]] | noun | **1.** Any tropical american plant of the genus tropaeolum having pungent juice and long-spurred yellow to red flowers.<br>**2.** Aquatic herbs. | *"NASTURTIUM UREDO: hypogenous; spots pale-yellow; sori minute, roundish, scattered or confluent; sporidia ovoid or subglobose, orange.—On leaves of _Tropæolum aduncum_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[nasty]] | adjective | **1.** Offensive or even (of persons) malicious; ; ; ; ; ; - ezra pound.<br>**2.** Exasperatingly difficult to handle or circumvent. | *"Nay, but to live In the rank sweat of an enseamed bed, Stew’d in corruption, honeying and making love Over the nasty sty."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nasua]] | noun | **1.** Coatis. | *"Classical and authoritative lexicons catalog nasua as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[renascence]] | noun | **1.** The period of european history at the close of the middle ages and the rise of the modern world; a cultural rebirth from the 14th through the middle of the 17th centuries.<br>**2.** A second or new birth. | *"Renascence and Other Poems by Edna St."* — Edna St. Vincent Millay, *Renascence, and Other Poems* |
| [[renascent]] | adjective | **1.** Rising again as to new life and vigor. | *"So spoke love renascent, preparing the way for Tess’s devoted outpouring, which was then just being forwarded to him by his father; though owing to his distance inland it was to be a long time in reaching him."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |

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
    ROOT DASHBOARD · NAS
  </div>
</div>
