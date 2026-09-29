---
status: unread
type: root_dashboard
---
# Dashboard — zo
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">zo-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“animal or living being”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Living creatures moving through nature and plants growing from the soil.</span>
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

The root **zo** means animal or living being. It refers to animal / animate creature. In English, this root forms words such as *zoology*, *zoological*, *zoologist*, and *zoo*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: animal or living being
> The root **zo** means animal or living being. It refers to animal / animate creature. In English, this root forms words such as *zoology*, *zoological*, *zoologist*, and *zoo*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Animal or living being</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Living creatures moving through nature and plants growing from the soil.</mark>
> - **Everyday Connection**: Think of familiar words like *zoology* and *zoological*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **zo** comes from a Latin word that means *"animal or living being"*.
  - At its core, it describes animal or living being.

- **The Big Picture Idea**:
  - Picture living creatures moving through nature and plants growing from the soil.
  - Whenever you see **zo** in an English word, think of **animals, plants, and natural life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of animal or living being.
  - **Mental & Social**: How people experience, organize, or communicate about animal or living being.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Zoology**: The comprehensive scientific study of the behavior, physiology, classification, and distribution of animals.
  - **Zoological**: Of, relating to, or concerning the science of zoology or the characteristics of animal life.
  - **Zoologist**: A biological scientist who specializes in the observation, classification, and laboratory investigation of animal life.
  - **Zoo**: A public park or institutional facility where living wild animals are housed in enclosures for conservation, breeding, study, and public exhibition.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">zo</mark>, think of <mark class="hl-def">animals, plants, and natural life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Mechanics & Combining Forms
> The element **zo-** functions primarily as an initial combining form (*zoo-*), a terminal taxonomic suffix (*-zoon*, plural *-zoa*), or a diminutive root (*zodiac*):
> 1. **Initial Combining Form (`zoo-` / `zo-`):** Prefixed to nouns or relational suffixes denoting study (*zoology*), disease dynamics (*zoonosis*), artistic iconography (*zoomorphic*), ecological assemblages (*zooplankton*), or behavioral instincts (*zoophile*).
> 2. **Terminal Taxonomic Form (`-zoon` / `-zoa`):** Derived directly from singular *ζῷον* and plural *ζῷα*. Employed systematically in biological classification for organismal grades: *Protozoa* ("first/primitive single-celled animals"), *Metazoa* ("subsequent/multicellular animals"), *spermatozoon* ("seed-animal"), and *zooid* (colonial modular individual).
> 3. **Phonetic Realization & Diaeresis:** In traditional scholarly orthography, when paired with another vowel, it carried a diaeresis (e.g., *zoölogy*, *zoöphyte*) to indicate that both vowels are pronounced independently (/zoʊ.ə/ or /zoʊ.ɒ/) rather than coalescing into the single vowel of *zoo* (/zuː/).

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

> [!tip] 🌈 Spectrum of Specialized Applications
> - **Pure Biological Taxonomy & Science:** [[zoology]], [[zoological]], [[zoologist]] — the comprehensive empirical investigation of animal morphology, physiology, and evolutionary lineages.
> - **Microbiology & Evolutionary Grades:** [[protozoa]], [[protozoan]], [[metazoan]], [[spermatozoon]], [[zooid]] — denoting cellular motility and microscopic or colonial units of animal organization.
> - **Public Exhibition & Conservation:** [[zoo]] — urban conservation, breeding sanctuaries, and recreational animal exhibits.
> - **Epidemiology & Veterinary Pathology:** [[zoonosis]], [[zoonotic]], [[epizootic]], [[enzootic]] — viral and bacterial transmission across species barriers between fauna and humans.
> - **Astronomy & Celestial Mythology:** [[zodiac]], [[zodiacal]] — the ecliptic pathway through constellations envisioned as mythological beasts (*zōidiakos kyklos*).
> - **Art, Iconography & Comparative Religion:** [[zoomorphic]], [[zoomorphism]] — conceptualizing divinity, tools, or totems in the physical contours of beasts.
> - **Ecology & Marine Biology:** [[zooplankton]], [[zoophyte]] — drifting trophic consumers and sessile animal colonies that outwardly mirror plant morphologies.
> - **Psychiatry & Behavioral Psychology:** [[zoanthropy]], [[zoophile]], [[zoophobia]] — clinical delusions of animal transformation, profound attachment, or pathological phobias.

---

## 🔀 4. Prefix & Combining Dynamics on zo

### Prefix & Element Combinations

| Combining Element | Affix Meaning | Combined Derivative | Resulting Semantic Shift & Domain |
| :--- | :--- | :--- | :--- |
| `proto-` | first, primitive | [[protozoa]] / [[protozoan]] | Literally "first animals"; motile unicellular eukaryotic organisms. |
| `meta-` | beyond, after, higher | [[metazoan]] | Multicellular organisms with differentiated tissues; animals "beyond" unicellular protozoa. |
| `spermato-` | seed, semen | [[spermatozoon]] | A mature motile male reproductive cell; literally a "seed animal". |
| `epi-` | upon, over, among | [[epizootic]] | An outbreak of contagious disease across an animal population; animal analogue to *epidemic*. |
| `en-` | within, in | [[enzootic]] | A disease continuously prevalent within a localized animal community; animal analogue to *endemic*. |
| `crypto-` | hidden, concealed | [[cryptozoology]] | The empirical pursuit and investigation of folkloric or unconfirmed animals (e.g., yeti, sea serpents). |
| `planktos` | drifting, wandering | [[zooplankton]] | Heterotrophic, passively drifting animal microorganisms in water bodies. |
| `phyton` | plant | [[zoophyte]] | Invertebrates (corals, sponges, sea anemones) resembling vegetative plant growths. |
| `morphē` | shape, form | [[zoomorphic]] | Visual depiction or theological conception taking the physical form of an animal. |
| `anthrōpos` | human being | [[zoanthropy]] | Psychiatric delusion wherein a human subject believes themselves transformed into an animal. |

### Terminal Suffix Dynamics

| Suffix | Grammatical Role | Derivative Example | Functional Role |
| :--- | :--- | :--- | :--- |
| `-ology` / `-ist` | Noun of discipline / agent | [[zoology]], [[zoologist]] | Names the comprehensive scientific discipline and its practicing specialist. |
| `-oid` | Adjective / noun of resemblance | [[zooid]] | "Animal-like" individual forming part of a colonial or polymorphic organism. |
| `-osis` / `-otic` | Noun of medical condition / adj | [[zoonosis]], [[zoonotic]] | Signifies pathological condition transferred from non-human animal reservoirs. |
| `-ic` / `-ical` | Relational adjective | [[zodiacal]], [[zoological]] | Establishes direct attributive association with the base science or celestial belt. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🔬 **Systematics & Evolutionary Biology** | [[zoology]], [[protozoa]], [[metazoan]], [[spermatozoon]] | Phylogenetic mapping of single-celled versus multicellular heterotrophs and reproductive gametes. |
| 🩺 **Public Health & Epidemiology** | [[zoonosis]], [[zoonotic]], [[epizootic]], [[enzootic]] | Surveillance of spillover pathogens (SARS-CoV-2, Ebola, rabies, avian influenza) from wildlife to human populations. |
| 🌌 **Astronomy & History of Science** | [[zodiac]], [[zodiacal]] | Classical celestial cartography delineating constellations along the sun's apparent ecliptic trajectory. |
| 🌊 **Oceanography & Marine Ecology** | [[zooplankton]], [[zoophyte]], [[zooid]] | Pelagic food webs, coral reef calcification dynamics, and colonial siphonophore physiology. |
| 🎨 **Art History & Anthropology** | [[zoomorphic]], [[zoomorphism]] | Analysis of animal totems, Paleolithic cave paintings, and Egyptian animal-headed deities (Anubis, Horus). |
| 🧠 **Clinical Psychiatry & Behavioral Science** | [[zoanthropy]], [[zoophile]], [[zoophobia]] | Diagnosing clinical lycanthropy/zoanthropy and extreme phobic responses toward animals. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[azoic]] | adjective | **1.** Before the appearance of life. | *"They were transported, perhaps, from the Azoic area near Lake Superior."* — W. E. Webb, *Buffalo Land* |
| [[epizootic]] | adjective | **1.** (of animals) epidemic among animals of a single kind within a particular region. | *"The epizootic is a humanly evolved ailment, which a wild horse might never have."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[protozoa]] | noun | **1.** In some classifications considered a superphylum or a subkingdom; comprises flagellates; ciliates; sporozoans; amoebas; foraminifers.<br>**2.** Any of diverse minute acellular or unicellular organisms usually nonphotosynthetic. | *"In academic literature, protozoa designates in some classifications considered a superphylum or a subkingdom; comprises flagellates; ciliates; sporozoans; amoebas; foraminifers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zodiac]] | noun | **1.** A belt-shaped region in the heavens on either side to the ecliptic; divided into 12 constellations or signs for astrological purposes.<br>**2.** (astrology) a circular diagram representing the 12 zodiacal constellations and showing their signs. | *"As when the golden sun salutes the morn, And, having gilt the ocean with his beams, Gallops the zodiac in his glistening coach, And overlooks the highest-peering hills; So Tamora."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[zodiacal]] | adjective | **1.** Relating to or included in the zodiac. | *"My remembrances went to France in the train of those zodiacal stars that would shine in some hours’ time."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Animal & Plant]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ZO
  </div>
</div>
