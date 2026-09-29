---
status: unread
type: root_dashboard
---
# Dashboard — noxa
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">noxa-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“harm or injury”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Comparing a fresh, wholesome fruit against a damaged or spoiled one.</span>
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

The root **noxa** means harm or injury. It refers to harm, injure; damage, guilt, liability. In English, this root forms words such as *injury*, *damage*, *fault*, and *offense*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: harm or injury
> The root **noxa** means harm or injury. It refers to harm, injure; damage, guilt, liability. In English, this root forms words such as *injury*, *damage*, *fault*, and *offense*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Harm or injury</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Comparing a fresh, wholesome fruit against a damaged or spoiled one.</mark>
> - **Everyday Connection**: Think of familiar words like *injury* and *damage*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **noxa** comes from a Latin word that means *"harm or injury"*.
  - At its core, it describes harm or injury.

- **The Big Picture Idea**:
  - Picture comparing a fresh, wholesome fruit against a damaged or spoiled one.
  - Whenever you see **noxa** in an English word, think of **goodness, benefits, or harm**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of harm or injury.
  - **Mental & Social**: How people experience, organize, or communicate about harm or injury.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Injury**: An everyday English word showing the root's idea of *harm or injury*.
  - **Damage**: An everyday English word showing the root's idea of *harm or injury*.
  - **Fault**: An everyday English word showing the root's idea of *harm or injury*.
  - **Offense**: An everyday English word showing the root's idea of *harm or injury*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">noxa</mark>, think of <mark class="hl-def">goodness, benefits, or harm</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates through two closely allied stems: the nominal stem **nox-** (from noun *noxa*, adj. *noxius*) and the verbal stem **noc-** (from *noceō*, participle *nocēns*, adj. *nocuus*):
> - **Verbal Present / Participial Stem:** `noc-` / `nocent-` (giving *nocent*, *innocent*, *innocence*, *nociceptor*)
> - **Adjectival Stems:** `nocu-` (giving *nocuous*, *innocuous*) and `noxi-` (giving *noxious*, *innoxious*, *obnoxious*)
> - **Legal / Nominal Root:** `nox-` / `noxa-` (giving *noxa*, *noxal*, *actio noxalis*)
> - **First-Person Future Indicative:** `noceb-` (giving the medical term *nocebo*, literally "I shall harm")
>
> English systematically modulates these stems using the privative prefix `in-` (meaning "not, free from"), the directional-adversative prefix `ob-` (meaning "towards, exposed to, in the path of"), and functional adjectival and substantival suffixes (`-ous`, `-ence`, `-ity`, `-ive`, `-or`).

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
> The semantic spectrum of `noxa` / `noc-` radiates across five primary branches:
> - **Legal Culpability & Moral Blamelessness:** From *innocent* (free from legal guilt, unacquainted with evil) and *innocence* to archaic *nocent* (guilty, criminal).
> - **Mild Harmlessness & Social Offensiveness:** *innocuous* (causing no harm or offense; mild, insipid) contrasts with *obnoxious* (originally exposed to punishment, now odiously offensive and grating).
> - **Active Toxicity & Physical Destruction:** *noxious* (poisonous, physically destructive, as in noxious gases or effluents; morally corrupting).
> - **Sensory Neurobiology & Pain Physiology:** *nociceptor* (nerve receptor detecting noxious stimuli) and *nociception* (the neurological transduction of physical damage).
> - **Psychology & Pharmacology:** *nocebo* (an inert substance triggering harmful symptoms purely through negative mental anticipation).

---

## 🔀 4. Prefix & Combining Dynamics on noxa

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` (privative) | not, un-, without | [[innocent]], [[innocence]] | "Not harming"; free from legal guilt, sin, or malice. |
| `in-` (privative) | not, un-, without | [[innocuous]], [[innocuity]] | "Not harmful"; benign, causing no physical injury or social displeasure. |
| `in-` (privative) | not, un-, without | [[innoxious]] | Direct negation of *noxious*; completely devoid of harmful or poisonous properties. |
| `ob-` | toward, before, exposed to | [[obnoxious]], [[obnoxiety]] | Originally "exposed/liable to harm or punishment" (*ob noxam*); shifted semantically to "openly offensive, detestable." |
| *(root alone)* | harm, hurt, injury | [[nocent]], [[noxious]], [[nocuous]] | Directly exhibiting the capacity to inflict physical, moral, or environmental damage. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ent` | Adjective (Present Participle) | [[innocent]], [[nocent]] | Performing or not performing the act of injuring (*nocēns* / *innocēns*). |
| `-ence` / `-ency` | Noun (State / Quality) | [[innocence]], [[innocency]], [[nocence]] | The abstract condition of being guiltless, harmless, or culpably harmful. |
| `-ous` | Adjective (Abounding in / Possessing) | [[noxious]], [[nocuous]], [[innocuous]], [[obnoxious]] | Characterized by or possessing the quality of harm, harmlessness, or offensiveness. |
| `-ity` | Noun (Condition / State) | [[innocuity]], [[obnoxiety]] | The abstract quality or degree of being innocuous or exposed to censure. |
| `-ive` | Adjective (Tending to) | [[nocive]], [[nociceptive]] | Exhibiting an active tendency to hurt or mediate the perception of hurt. |
| `-al` | Adjective (Pertaining to) | [[noxal]] | Pertaining to legal actions or surrender arising from tortious damage. |
| `-or` | Noun (Agent / Instrument) | [[nociceptor]] | A biological organ or neural structure that receives noxious stimuli. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Law & Jurisprudence** | [[innocent]], [[innocence]], [[nocent]], [[noxal]] | Criminal trials (*presumption of innocence*); Roman law tort liabilities (*noxal surrender*); archaic indictments distinguishing nocent from innocent parties. |
| 🔬 **Medicine & Toxicology** | [[noxious]], [[innocuous]], [[innoxious]], [[noxa]] | Environmental toxins (*noxious fumes*); pharmacology (*innocuous placebo carriers*); pathology (*cellular response to biological noxae*). |
| 🧠 **Neuroscience & Physiology** | [[nociceptor]], [[nociception]], [[nociceptive]] | Pain pathways, sensory transduction of thermal, mechanical, and chemical tissue damage; specialized pain receptors in peripheral nerves. |
| 💊 **Psychology & Clinical Trials** | [[nocebo]], [[nocebic]] | Clinical pharmacology; negative anticipatory outcomes where patients experience adverse side effects from inert substances due to psychological dread. |
| 🗣️ **Sociology & Everyday Discourse** | [[obnoxious]], [[obnoxiously]], [[innocuous]] | Interpersonal etiquette, public behavior (*an obnoxious passenger*), and harmless social pleasantries (*an innocuous remark*). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[conocarpus]] | noun | **1.** Monotypic genus of tropical american trees: button tree. | *"In academic literature, conocarpus designates monotypic genus of tropical american trees: button tree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conoclinium]] | noun | **1.** Mistflower. | *"In academic literature, conoclinium designates mistflower."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dinoceras]] | noun | **1.** A variety of dinocerate. | *"In academic literature, dinoceras designates a variety of dinocerate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dinocerata]] | noun | **1.** Small order of primitive ungulates of the paleocene and eocene. | *"In academic literature, dinocerata designates small order of primitive ungulates of the paleocene and eocene."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dinocerate]] | noun | **1.** An extinct ungulate. | *"In academic literature, dinocerate designates an extinct ungulate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[innocence]] | noun | **1.** The quality of innocent naivete.<br>**2.** The state of being unsullied by sin or moral wrong; lacking a knowledge of evil. | *"And God in justice hath revealed to us The truth and innocence of this poor fellow, Which he had thought to have murdered wrongfully."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[innocency]] | noun | **1.** An innocent quality or thing or act. | *"Thou knowest in the state of innocency Adam fell, and what should poor Jack Falstaff do in the days of villainy?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[innocense]] | noun | **1.** White and lavender to pale-blue flowers grow in perfect rings of widely spaced bands around the stems forming a kind of pagoda; california. | *"In academic literature, innocense designates white and lavender to pale-blue flowers grow in perfect rings of widely spaced bands around the stems forming a kind of pagoda; california."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[innocent]] | noun | **1.** A person who lacks knowledge of evil.<br>**2.** Free from evil or guilt. | *"I know him: he was a botcher’s ’prentice in Paris, from whence he was whipped for getting the shrieve’s fool with child, a dumb innocent that could not say him nay. [_First Lord lifts up his hand in anger._] BERTRAM."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[innocently]] | adverb | **1.** In a not unlawful manner.<br>**2.** In a naively innocent manner. | *"The latter looked innocently up at the gray towers, remarking that anybody who owned a castle like that would simply be the happiest man in the world."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[innocuous]] | adjective | **1.** Not injurious to physical or mental health.<br>**2.** Not causing disapproval. | *"In this particular case, however mechanical and innocuous it might be at other times, Hepzibah’s contortion of brow served her in good stead."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[innoxious]] | adjective | **1.** Having no adverse effect. | *"Lady Dalrymple and Miss Carteret—they would soon be innoxious cousins to her."* — Jane Austen, *Persuasion* |
| [[noc]] | noun | **1.** An undercover agent who is given no official cover. | *"KATHARINE. _Les dames et demoiselles pour être baisées devant leurs noces, il n’est pas la coutume de France._ KING HENRY."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nocent]] | adjective | **1.** Having a tendency to cause harm. | *"In academic literature, nocent designates having a tendency to cause harm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nociceptive]] | adjective | **1.** Caused by or in response to pain. | *"In academic literature, nociceptive designates caused by or in response to pain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noctambulation]] | noun | **1.** Walking by a person who is asleep. | *"In academic literature, noctambulation designates walking by a person who is asleep."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noctambulism]] | noun | **1.** Walking by a person who is asleep. | *"In academic literature, noctambulism designates walking by a person who is asleep."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noctambulist]] | noun | **1.** Someone who walks about in their sleep. | *"Roads, garden-paths, the house-fronts, the barton-walls were warm as hearths, and reflected the noontime temperature into the noctambulist’s face."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[noctiluca]] | noun | **1.** Large bioluminescent marine protozoan. | *"In academic literature, noctiluca designates large bioluminescent marine protozoan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noctilucent]] | adjective | **1.** Shining or glowing by night. | *"In academic literature, noctilucent designates shining or glowing by night."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noctua]] | noun | **1.** Type genus of the noctuidae: moths whose larvae are cutworms. | *"In academic literature, noctua designates type genus of the noctuidae: moths whose larvae are cutworms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noctuid]] | noun | **1.** Usually dull-colored medium-sized nocturnal moth; the usually smooth-bodied larvae are destructive agricultural pests. | *"In academic literature, noctuid designates usually dull-colored medium-sized nocturnal moth; the usually smooth-bodied larvae are destructive agricultural pests."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noctuidae]] | noun | **1.** Cutworms; armyworms. | *"In academic literature, noctuidae designates cutworms; armyworms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nocturia]] | noun | **1.** Excessive urination at night; especially common in older men. | *"In academic literature, nocturia designates excessive urination at night; especially common in older men."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nocturnal]] | adjective | **1.** Belonging to or active during the night.<br>**2.** Of or relating to or occurring in the night. | *"Snagsby’s breast, prompting her to nocturnal examinations of Mr."* — Charles Dickens, *Bleak House* |
| [[nocturnally]] | adverb | **1.** At night. | *"Classical and authoritative lexicons catalog nocturnally as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nocturne]] | noun | **1.** A pensive lyrical piece of music (especially for the piano). | *"Play me a nocturne, Dorian, and, as you play, tell me, in a low voice, how you have kept your youth."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[nox]] | noun | **1.** Roman goddess of night; daughter of erebus; counterpart of greek nyx. | *"I think Horace says somewhere _nox longa_."* — Anne Gilchrist, *Mary Lamb* |
| [[noxious]] | adjective | **1.** Injurious to physical or mental health. | *"Brocklehurst’s eye into an artful, noxious child, and what could I do to remedy the injury?"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[noxiously]] | adverb | **1.** In a detrimental manner. | *"In academic literature, noxiously designates in a detrimental manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noxiousness]] | noun | **1.** The quality of being noxious. | *"In academic literature, noxiousness designates the quality of being noxious."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obnoxious]] | adjective | **1.** Causing disapproval or protest. | *"Still unconverted, but, to satisfy his mother, he consented to remain in the room during a visit of the missionary of that district; a man with sufficient tact not to make his efforts obnoxious."* — Classic Author, *The wonders of prayer* |
| [[obnoxiously]] | adverb | **1.** In an obnoxious manner. | *"In academic literature, obnoxiously designates in an obnoxious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obnoxiousness]] | noun | **1.** The quality of being hateful. | *"In academic literature, obnoxiousness designates the quality of being hateful."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Good & Bad]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · NOXA
  </div>
</div>
