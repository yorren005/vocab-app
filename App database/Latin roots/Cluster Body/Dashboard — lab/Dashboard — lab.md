---
status: unread
type: root_dashboard
---
# Dashboard — lab
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">lab-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“lip”</span>
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

The root **lab** means lip. It refers to lip / articular fibrocartilage rim / floral landing petal / phonetics. In English, this root forms words such as *bilabial*, *bilabiate*, *labella*, and *labellar*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: lip
> The root **lab** means lip. It refers to lip / articular fibrocartilage rim / floral landing petal / phonetics. In English, this root forms words such as *bilabial*, *bilabiate*, *labella*, and *labellar*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Lip</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body, limbs, posture, and bodily movements.</mark>
> - **Everyday Connection**: Think of familiar words like *bilabial* and *bilabiate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **lab** comes from a Latin word that means *"lip"*.
  - At its core, it describes lip.

- **The Big Picture Idea**:
  - Picture the physical human body, limbs, posture, and bodily movements.
  - Whenever you see **lab** in an English word, think of **the physical body and limbs**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of lip.
  - **Mental & Social**: How people experience, organize, or communicate about lip.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Bilabial**: Articulated using both lips together.
  - **Bilabiate**: Divided into two unequal lip-like parts or lobes.
  - **Labella**: Plural of labellum.
  - **Labellar**: Of, relating to, or situated on the labellum of an orchid flower or insect proboscis.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">lab</mark>, think of <mark class="hl-def">the physical body and limbs</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root operates across three morphological variants:
> - **Primary Latin Nominal Stem:** `labi-` (from *labium*). Governs phonetics, linguistics, and gynecology: *labium*, *labial*, *labialize*, *bilabial*, *labiodental*, *labioplasty*.
> - **Augmentative / Cartilage Stem:** `labr-` (from *labrum*). Governs orthopedic joint anatomy, anthropology, and entomology: *labrum*, *labral*, *paralabral*, *labret*.
> - **Diminutive Latin Stem:** `labell-` (from *labellum* "little lip"). Governs orchid botany: *labellum*, *labellar*.
>
> Compound prefixes specify phonological co-articulation (*bi-* = two lips; *dent-* = teeth; *vel-* = soft palate) or joint proximity (*para-* = adjacent to labrum).

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

> [!tip] 🌈 The Conceptual Facets of Lab-
> - **1. Phonetics & Articulatory Linguistics:** Consonants formed with the lips (*labial*, *bilabial*, *labiodental*, *labiovelar*, *labialize*).
> - **2. Sports Medicine & Orthopedic Surgery:** The fibrocartilaginous socket lip of the shoulder and hip (*labrum*, *labral tear*, *paralabral cyst*).
> - **3. Orchid Botany & Floral Architecture:** Two-lipped corollas (*labiate*, *bilabiate*), and the insect-landing petal (*labellum*).
> - **4. Invertebrate Entomology:** The sclerotized upper lip (*labrum*) and lower lip (*labium*) of insect mouthparts.
> - **5. Cultural Anthropology & Adornment:** Traditional facial piercings and lip plugs (*labret*).
> - **6. Gynecological & Plastic Surgery:** The cutaneous labial folds of the vulva (*labia majora*, *labia minora*, *labiaplasty*).

---

## 🔀 4. Prefix & Combining Dynamics on lab

### Prefix Dynamics

| Prefix | Core Value | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `bi-` | two | [[bilabial]], **bilabiate** | Involving *both lips*; having two lip-like floral petals. |
| `para-` | beside, adjacent | **paralabral** | Situated *beside* or immediately adjacent to a joint labrum. |
| `labio-` + `dental` | lip + tooth | [[labiodental]] | Articulated simultaneously with the lower *lip* and upper *teeth*. |
| `labio-` + `velar` | lip + soft palate | [[labiovelar]] | Articulated with rounded *lips* while raising back of tongue to *velum*. |

### Suffix Dynamics

| Suffix | Grammatical Role | Derivative | Semantic Output |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective (relating to) | [[labial]] | Pertaining strictly to the lips or lip-formed speech sounds. |
| `-ize` | Verb (action / phonetics) | [[labialize]] | To round or purse the lips while pronouncing a consonant. |
| `-ellum` | Diminutive noun | [[labellum]] | A "little lip"; the landing petal of an orchid flower. |
| `-et` | Diminutive / Ornament noun | [[labret]] | A decorative plug worn in an incision through the lower lip. |
| `-plasty` | Noun (surgical repair) | [[labiaplasty]] | Surgical reduction or reconstruction of the labial folds. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Orthopedic Sports Medicine** | [[labrum]], [[labral]], **paralabral** | Arthroscopic SLAP repairs (Superior Labral anterior to posterior); hip acetabular impingement. |
| **Phonology, Linguistics & Speech Pathology** | [[bilabial]], [[labiodental]], [[labialize]] | International Phonetic Alphabet (IPA) place of articulation; speech apraxia therapy. |
| **Systematic Botany & Orchidology** | [[labellum]], [[labiate]], **bilabiate** | Pseudocopulation mechanisms in Ophrys orchids; identifying Lamiaceae (mint family) herbs. |
| **Comparative Entomology** | [[labrum]], [[labium]] | Chewing vs. piercing-sucking insect mouthpart morphology in hemipterans and grasshoppers. |
| **Anthropology & Ethnography** | [[labret]] | Traditional lip-plug body modifications among Haida, Tlingit, and Mursi cultures. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[bilabial]] | noun | **1.** A consonant that is articulated using both lips; /p/ or /b/ or /w/.<br>**2.** Of or relating to or being a speech sound that is articulated using both lips. | *"In academic literature, bilabial designates a consonant that is articulated using both lips; /p/ or /b/ or /w/."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bilabiate]] | adjective | **1.** Having two lips. | *"In academic literature, bilabiate designates having two lips."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collaborate]] | verb | **1.** Work together on a common enterprise of project.<br>**2.** Cooperate as a traitor. | *"Also, Professor Schleimer had similarly been collaborating with me in the detection of phytosterol in mixtures of animal and vegetable fats."* — Jack London, *The Jacket (The Star-Rover)* |
| [[collaboration]] | noun | **1.** Act of working jointly.<br>**2.** Act of cooperating traitorously with an enemy that is occupying your country. | *"To President Camari, I herewith declare that the original understandings on cooperation and collaboration with the Government of Planet Pluto until Slingshot is launched remain in effect."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[collaborationism]] | noun | **1.** Act of cooperating traitorously with an enemy that is occupying your country. | *"In academic literature, collaborationism designates act of cooperating traitorously with an enemy that is occupying your country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collaborationist]] | noun | **1.** Someone who collaborates with an enemy occupying force. | *"In academic literature, collaborationist designates someone who collaborates with an enemy occupying force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collaborative]] | adjective | **1.** Accomplished by collaboration. | *"In academic literature, collaborative designates accomplished by collaboration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collaborator]] | noun | **1.** Someone who assists in a plot.<br>**2.** Someone who collaborates with an enemy occupying force. | *"In academic literature, collaborator designates someone who assists in a plot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elaborate]] | verb | **1.** Add details, as to an account or idea; clarify the meaning of and discourse in a learned way, usually in writing.<br>**2.** Produce from basic elements or sources; change into a more developed product. | *"To fling elaborate sarcasms at Tess, however, was much like flinging them at a dog or cat."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[elaborated]] | verb | **1.** Add details, as to an account or idea; clarify the meaning of and discourse in a learned way, usually in writing.<br>**2.** Produce from basic elements or sources; change into a more developed product. | *"On Sundays, she went to church elaborated."* — Charles Dickens, *Great Expectations* |
| [[elaborately]] | adverb | **1.** With elaboration. | *"He worked his way through a goodly number of the Greek and Latin classics, in copies borrowed from the libraries of the two ministers; and he not only read, but analysed and elaborately annotated what he read."* — John Cairns, *Principal Cairns* |
| [[elaborateness]] | noun | **1.** Marked by elaborately complex detail.<br>**2.** An ornate appearance; being elaborately (even excessively) decorated. | *"In academic literature, elaborateness designates marked by elaborately complex detail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elaboration]] | noun | **1.** Addition of extra material or illustration or clarifying detail.<br>**2.** The result of improving something. | *"Now,” she adds, “show me the spot again!” Jo thrusts the handle of his broom between the bars of the gate, and with his utmost power of elaboration, points it out."* — Charles Dickens, *Bleak House* |
| [[inelaborate]] | adjective | **1.** Not elaborate; lacking rich or complex detail. | *"In academic literature, inelaborate designates not elaborate; lacking rich or complex detail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lab]] | noun | **1.** A workplace for the conduct of scientific research. | *"To lower orders are assign’d The humbler ranks of human-kind, The rustic bard, the lab’ring hind, The artisan; All choose, as various they’re inclin’d, The various man."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[laban]] | noun | **1.** Hungarian choreographer who developed labanotation (1879-1958). | *"When Jacob graz’d his uncle Laban’s sheep,— This Jacob from our holy Abram was As his wise mother wrought in his behalf, The third possessor; ay, he was the third."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[labanotation]] | noun | **1.** A system of notation for dance movements that uses symbols to represent points on a dancer's body and the direction of the dancer's movement and the tempo and the dynamics. | *"In academic literature, labanotation designates a system of notation for dance movements that uses symbols to represent points on a dancer's body and the direction of the dancer's movement and the tempo and the dynamics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[label]] | noun | **1.** A brief description given for purposes of identification.<br>**2.** Trade name of a company that produces musical recordings. | *"When I wak’d, I found This label on my bosom; whose containing Is so from sense in hardness that I can Make no collection of it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[labeled]] | verb | **1.** Assign a label to; designate with a label.<br>**2.** Attach a tag or label to. | *"He ought at least to be labeled "poison for the very young." I was very young out on the porch that night."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[labelled]] | verb | **1.** Assign a label to; designate with a label.<br>**2.** Attach a tag or label to. | *"It shall be inventoried and every particle and utensil labelled to my will: as, item, two lips indifferent red; item, two grey eyes with lids to them; item, one neck, one chin, and so forth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[labetalol]] | noun | **1.** Antihypertensive drug (trade names trandate and normodyne) that blocks alpha and beta-adrenergic receptors of the sympathetic nervous system (leading to a decrease in blood pressure). | *"In academic literature, labetalol designates antihypertensive drug (trade names trandate and normodyne) that blocks alpha and beta-adrenergic receptors of the sympathetic nervous system (leading to a decrease in blood pressure)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labial]] | noun | **1.** A consonant whose articulation involves movement of the lips.<br>**2.** Of or relating to the lips of the mouth. | *"The labial melody with which the Typee girls carry on an ordinary conversation, giving a musical prolongation to the final syllable of every sentence, and chirping out some of the words with a liquid, bird-like accent, was singularly pleasing."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[labialise]] | verb | **1.** Pronounce with rounded lips. | *"In academic literature, labialise designates pronounce with rounded lips."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labialize]] | verb | **1.** Pronounce with rounded lips. | *"In academic literature, labialize designates pronounce with rounded lips."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labiatae]] | noun | **1.** A large family of aromatic herbs and shrubs having flowers resembling the lips of a mouth and four-lobed ovaries yielding four one-seeded nutlets and including mint; thyme; sage; rosemary. | *"In academic literature, labiatae designates a large family of aromatic herbs and shrubs having flowers resembling the lips of a mouth and four-lobed ovaries yielding four one-seeded nutlets and including mint; thyme; sage; rosemary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labiate]] | adjective | **1.** Having lips or parts that resemble lips. | *"A similar circumstance may befall the student in examining the rust of labiate plants (_Trichobasis Labiatarum_, Lev.), which occurs on different species of mint, especially the water-mint, about the month of August."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[labile]] | adjective | **1.** (chemistry, physics, biology) readily undergoing change or breakdown.<br>**2.** Liable to change. | *"In academic literature, labile designates (chemistry, physics, biology) readily undergoing change or breakdown."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labiodental]] | noun | **1.** A consonant whose articulation involves the lips and teeth. | *"In academic literature, labiodental designates a consonant whose articulation involves the lips and teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labium]] | noun | **1.** A liplike structure that bounds a bodily orifice (especially any of the four labiate folds of a woman's vulva). | *"In academic literature, labium designates a liplike structure that bounds a bodily orifice (especially any of the four labiate folds of a woman's vulva)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lablab]] | noun | **1.** One species: hyacinth bean. | *"In academic literature, lablab designates one species: hyacinth bean."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lablink]] | noun | **1.** A defense laboratory that provides essential services in fundamental science for national security and environmental protection and provides technologies that contribute to industrial competitiveness. | *"In academic literature, lablink designates a defense laboratory that provides essential services in fundamental science for national security and environmental protection and provides technologies that contribute to industrial competitiveness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labor]] | noun | **1.** A social class comprising those who do manual labor or work for wages.<br>**2.** Productive work (especially physical work done for wages). | *"Laws, indeed, are fixed in their operation and results as subserving the highest good in the training and the disciplining of the race, giving them hope in their labor and sure expectation of fruit from their toil."* — Classic Author, *The wonders of prayer* |
| [[labor-intensive]] | adjective | **1.** Requiring a large expenditure of labor but not much capital. | *"In academic literature, labor-intensive designates requiring a large expenditure of labor but not much capital."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[laboratory]] | noun | **1.** A workplace for the conduct of scientific research.<br>**2.** A region resembling a laboratory inasmuch as it offers opportunities for observation and practice and experimentation. | *"I was a farmer, an agriculturist, a desk-tied professor, a laboratory slave, interested only in the soil and the increase of the productiveness of the soil."* — Jack London, *The Jacket (The Star-Rover)* |
| [[labored]] | verb | **1.** Strive and make an effort to reach a goal.<br>**2.** Work hard. | *"But mark: as in this haughty great attempt They labored to plant the rightful heir, I lost my liberty and they their lives."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[laborer]] | noun | **1.** Someone who works with their hands; someone engaged in manual labor. | *"Familiar with the various organizations of the benevolent societies, and only too happy to have an agency in supplying the wants of a laborer in Christ's vineyard, he soon started the money on its appointed errand."* — Classic Author, *The wonders of prayer* |
| [[laboring]] | verb | **1.** Strive and make an effort to reach a goal.<br>**2.** Work hard. | *"While laboring with my wife as a missionary in Northern Mexico, we supported ourselves for nearly four years by teaching and such other ways as the Lord opened up to us."* — Classic Author, *The wonders of prayer* |
| [[laborious]] | adjective | **1.** Characterized by effort to the point of exhaustion; especially physical effort. | *"They dance in the academy, and at this time of year we do figures at five every morning.” “Why, what a laborious life!” I exclaimed."* — Charles Dickens, *Bleak House* |
| [[laboriously]] | adverb | **1.** In a laborious manner. | *"She had the mobile face frequent in those whose sight has decayed by stages, has been laboriously striven after, and reluctantly let go, rather than the stagnant mien apparent in persons long sightless or born blind."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[laboriousness]] | noun | **1.** The quality of requiring extended effort. | *"I was very sorry.” Will only thought of giving a good pinch that would annihilate that vaunted laboriousness, and was unable to imagine the mode in which Dorothea would be wounded."* — George Eliot, *Middlemarch* |
| [[laborsaving]] | adjective | **1.** Designed to replace or conserve human and especially manual labor. | *"In academic literature, laborsaving designates designed to replace or conserve human and especially manual labor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labour]] | noun | **1.** A social class comprising those who do manual labor or work for wages.<br>**2.** Concluding state of pregnancy; from the onset of contractions to the birth of a child. | *"It is reported that he has taken their great’st commander, and that with his own hand he slew the duke’s brother. [_A tucket afar off._] We have lost our labour; they are gone a contrary way."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[labour-intensive]] | adjective | **1.** Requiring a large expenditure of labor but not much capital. | *"In academic literature, labour-intensive designates requiring a large expenditure of labor but not much capital."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[laboured]] | verb | **1.** Work hard.<br>**2.** Strive and make an effort to reach a goal. | *"I had myself notice of my brother’s purpose herein, and have by underhand means laboured to dissuade him from it; but he is resolute."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[labourer]] | noun | **1.** Someone who works with their hands; someone engaged in manual labor. | *"What might be toward, that this sweaty haste Doth make the night joint-labourer with the day: Who is’t that can inform me?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[labouring]] | verb | **1.** Work hard.<br>**2.** Strive and make an effort to reach a goal. | *"We thank you, maiden, But may not be so credulous of cure, When our most learned doctors leave us, and The congregated college have concluded That labouring art can never ransom nature From her inaidable estate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[labourite]] | noun | **1.** A member of the british labour party. | *"In academic literature, labourite designates a member of the british labour party."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[laboursaving]] | adjective | **1.** Designed to replace or conserve human and especially manual labor. | *"Laboursaving apparatuses, supplanters, bugbears, manufactured monsters for mutual murder, hideous hobgoblins produced by a horde of capitalistic lusts upon our prostituted labour."* — James Joyce, *Ulysses* |
| [[labrador]] | noun | **1.** The mainland part of the province of newfoundland and labrador in the eastern part of the large labrador-ungava peninsula in northeastern canada. | *"Enveloped in their shaggy watch coats, and with their heads muffled in woollen comforters, all bedarned and ragged, and their beards stiff with icicles, they seemed an eruption of bears from Labrador."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[labret]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin lab within the domain of Body.<br>**2.** A technical or specialized form exhibiting the properties of lab in systematic terminology. | *"In academic literature, labret designates pertaining to, derived from, or characteristic of latin lab within the domain of body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labridae]] | noun | **1.** Wrasses. | *"Classical and authoritative lexicons catalog labridae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labrocyte]] | noun | **1.** A large connective tissue cell that contains histamine and heparin and serotonin which are released in allergic reactions or in response to injury or inflammation. | *"In academic literature, labrocyte designates a large connective tissue cell that contains histamine and heparin and serotonin which are released in allergic reactions or in response to injury or inflammation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labrouste]] | noun | **1.** French architect who was among the first to use metal construction successfully (1801-1875). | *"In academic literature, labrouste designates french architect who was among the first to use metal construction successfully (1801-1875)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labrum]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin lab within the domain of Body.<br>**2.** A technical or specialized form exhibiting the properties of lab in systematic terminology. | *"In academic literature, labrum designates pertaining to, derived from, or characteristic of latin lab within the domain of body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[laburnum]] | noun | **1.** Flowering shrubs or trees having bright yellow flowers; all parts of the plant are poisonous. | *"The laburnum will be as yellow next June as it is now."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[labyrinth]] | noun | **1.** Complex system of paths or tunnels in which it is easy to get lost.<br>**2.** A complex system of interconnecting cavities; concerned with hearing and equilibrium. | *"But, Suffolk, stay; Thou mayst not wander in that labyrinth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[labyrinthian]] | adjective | **1.** Resembling a labyrinth in form or complexity. | *"In academic literature, labyrinthian designates resembling a labyrinth in form or complexity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labyrinthine]] | adjective | **1.** Relating to or affecting or originating in the inner ear.<br>**2.** Resembling a labyrinth in form or complexity. | *"The winter was spent in poverty, dodging creditors through the labyrinthine gloom of the town."* — Sydney Waterlow, *Shelley* |
| [[labyrinthitis]] | noun | **1.** Inflammation of the inner ear; can cause vertigo and vomiting. | *"In academic literature, labyrinthitis designates inflammation of the inner ear; can cause vertigo and vomiting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labyrinthodont]] | noun | **1.** An amphibian of the superorder labyrinthodontia. | *"In academic literature, labyrinthodont designates an amphibian of the superorder labyrinthodontia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labyrinthodonta]] | noun | **1.** Extinct amphibians typically resembling heavy-bodied salamanders or crocodiles and having a solid flattened skull and conical teeth; devonian through triassic. | *"In academic literature, labyrinthodonta designates extinct amphibians typically resembling heavy-bodied salamanders or crocodiles and having a solid flattened skull and conical teeth; devonian through triassic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[labyrinthodontia]] | noun | **1.** Extinct amphibians typically resembling heavy-bodied salamanders or crocodiles and having a solid flattened skull and conical teeth; devonian through triassic. | *"In academic literature, labyrinthodontia designates extinct amphibians typically resembling heavy-bodied salamanders or crocodiles and having a solid flattened skull and conical teeth; devonian through triassic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mislabeled]] | adjective | **1.** Branded or labeled falsely and in violation of statutory requirements. | *"In academic literature, mislabeled designates branded or labeled falsely and in violation of statutory requirements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unelaborate]] | adjective | **1.** Not elaborate; lacking rich or complex detail. | *"In academic literature, unelaborate designates not elaborate; lacking rich or complex detail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unelaborated]] | adjective | **1.** Giving only major points; lacking completeness. | *"In academic literature, unelaborated designates giving only major points; lacking completeness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unlabeled]] | adjective | **1.** Lacking a label or tag. | *"In academic literature, unlabeled designates lacking a label or tag."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unlabelled]] | adjective | **1.** Lacking a label or tag. | *"For none of their ancient marks remained, and their bones were alike, uncertain, unlabelled, undistinguishable."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |

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
    ROOT DASHBOARD · LAB
  </div>
</div>
