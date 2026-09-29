---
status: unread
type: root_dashboard
---
# Dashboard — hal
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">hal-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“breathe”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A young seed sprouting vigorously into green leaves under the warm sun.</span>
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

The root **hal** means breathe. It refers to taking in air, inhaling and exhaling, and vital respiration. In English, this root forms words such as *inhale*, *inhalation*, *inhalant*, and *inhaler*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: breathe
> The root **hal** means breathe. It refers to taking in air, inhaling and exhaling, and vital respiration. In English, this root forms words such as *inhale*, *inhalation*, *inhalant*, and *inhaler*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Breathe</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A young seed sprouting vigorously into green leaves under the warm sun.</mark>
> - **Everyday Connection**: Think of familiar words like *inhale* and *inhalation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **hal** comes from a Latin word that means *"breathe"*.
  - At its core, it describes breathe.

- **The Big Picture Idea**:
  - Picture a young seed sprouting vigorously into green leaves under the warm sun.
  - Whenever you see **hal** in an English word, think of **living energy and vital life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of breathe.
  - **Mental & Social**: How people experience, organize, or communicate about breathe.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Inhale**: To draw air, gas, smoke, or vapor into the lungs.
  - **Inhalation**: The physical act or process of drawing air or other substances into the lungs.
  - **Inhalant**: A medicinal preparation or volatile chemical inhaled through the nose or mouth.
  - **Inhaler**: A portable medical device used for delivering medication directly into the lungs, commonly used by individuals with asthma or COPD.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">hal</mark>, think of <mark class="hl-def">living energy and vital life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **hal** generates words through three morphological bases:
> - **Active Verb Base `hal-` (*hālāre*):**
>   - Prefixed with `in-` (into) $\to$ *inhale*, *inhaler*, *inhalant*, *inhalation*, *inhalational*, *inhalatorium*
>   - Prefixed with `ex-` (out of) $\to$ *exhale*, *exhalation*, *exhalant*, *exhalable*, *exhalative*
>   - Prefixed with `trans-` (across/through) $\to$ *transhalation*
> - **Noun / Participial Base `halit-` (*hālitus* "breath"):**
>   - Combined with Greek medical suffix `-osis` $\to$ *halitosis*, *halitotic*
>   - Preserved as archaic physiological terms $\to$ *halitus*, *halituous*
> - **Compound Stem `anhel-` (*an-* + *hālāre* $\to$ *anhēlāre* "to pant"):**
>   - *anhelation*, *anhelous*, *anhelose*

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
> The root encompasses four clinical and descriptive spheres:
> - **Voluntary & Involuntary Respiration:** Drawing ambient atmosphere into the pulmonary alveoli (*inhale*) and expelling air from the thorax (*exhale*).
> - **Pharmacology & Aerosol Drug Delivery:** Therapeutic mists administered to bronchodilate constricted airways (*inhaler*, *inhalant*, *inhalational anesthesia*).
> - **Oral Pathology & Clinical Malodor:** Persistent, chronic bad breath resulting from volatile sulfur compounds produced by oral bacteria (*halitosis*, *halitotic*).
> - **Pathological Respiration & Exertion:** Severe panting, gasping, or dyspnea resulting from cardiovascular or pulmonary distress (*anhelation*, *anhelous*).

---

## 🔀 4. Prefix & Combining Dynamics on hal

### Prefix Mechanics (Directional Shift)
- **`in-` (Into / Inside):** Inward inspiratory draft $\to$ *inhale*, *inhalation*.
- **`ex-` (Out / Away):** Outward expiratory release $\to$ *exhale*, *exhalation*.
- **`trans-` (Across / Through):** Passage of vapor through porous bodily surfaces $\to$ *transhalation*.
- **`an-` (Intensive / Gasping):** Violent or difficult respiration $\to$ *anhelation*.

### Suffix Dynamics (Functional Shift)
- **`-er` (Instrument):** The handheld canister or vaporization device: *inhaler*.
- **`-ant` (Agent / Substance):** An aerosolized chemical or volatile substance inhaled: *inhalant*.
- **`-orium` (Place):** A clinical facility designed for inhaling therapeutic vapors: *inhalatorium*.
- **`-osis` (Morbid State):** Medicalization of breath odor: *halitosis*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Pulmonology & Respiratory Therapy:** Management of asthma and chronic obstructive pulmonary disease (COPD) via metered-dose inhalers (MDIs) and dry powder inhalers (DPIs); pulmonary function testing (inspiratory and expiratory volume).
> - **Anesthesiology:** Volatile inhalational anesthetics (sevoflurane, isoflurane, desflurane) delivered via mechanical vaporizers during surgical procedures.
> - **Dentistry & Periodontology:** Clinical etiology of halitosis, centered on anaerobic bacterial degradation of cysteine and methionine into volatile sulfur compounds (VSCs: hydrogen sulfide, methyl mercaptan).
> - **Occupational Health & Toxicological Safety:** OSHA regulations governing workplace inhalation limits for airborne particulates, volatile organic compounds (VOCs), and toxic exhalations.
> - **Zoology & Marine Biology:** Morphology of bivalves, cephalopods, and mollusks possessing *inhalant* and *exhalant* siphons for water circulation and respiration.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[exhalation]] | noun | **1.** Exhaled breath.<br>**2.** The act of expelling air from the lungs. | *"I shall fall Like a bright exhalation in the evening, And no man see me more."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exhale]] | verb | **1.** Expel air.<br>**2.** Give out (breath or an odor). | *"The grave doth gape, and doting death is near, Therefore exhale."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[halab]] | noun | **1.** A city in northwestern syria. | *"In academic literature, halab designates a city in northwestern syria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halacha]] | noun | **1.** Talmudic literature that deals with law and with the interpretation of the laws on the hebrew scriptures. | *"In academic literature, halacha designates talmudic literature that deals with law and with the interpretation of the laws on the hebrew scriptures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halaka]] | noun | **1.** Talmudic literature that deals with law and with the interpretation of the laws on the hebrew scriptures. | *"In academic literature, halaka designates talmudic literature that deals with law and with the interpretation of the laws on the hebrew scriptures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halakah]] | noun | **1.** Talmudic literature that deals with law and with the interpretation of the laws on the hebrew scriptures. | *"In academic literature, halakah designates talmudic literature that deals with law and with the interpretation of the laws on the hebrew scriptures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halal]] | noun | **1.** (islam) meat from animals that have been slaughtered in the prescribed way according to the shariah.<br>**2.** Proper or legitimate. | *"In academic literature, halal designates (islam) meat from animals that have been slaughtered in the prescribed way according to the shariah."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halchidhoma]] | noun | **1.** A member of a north american indian people of the colorado river valley near the mouth of the gila river; allied to the maricopa. | *"In academic literature, halchidhoma designates a member of a north american indian people of the colorado river valley near the mouth of the gila river; allied to the maricopa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halcion]] | noun | **1.** A form of benzodiazepine (trade name halcion) frequently prescribed as a sleeping pill; usually given to people who have trouble falling asleep. | *"In academic literature, halcion designates a form of benzodiazepine (trade name halcion) frequently prescribed as a sleeping pill; usually given to people who have trouble falling asleep."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halcyon]] | noun | **1.** (greek mythology) a woman who was turned into a kingfisher.<br>**2.** A large kingfisher widely distributed in warmer parts of the old world. | *"Expect Saint Martin’s summer, halcyon’s days, Since I have entered into these wars."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hale]] | noun | **1.** A soldier of the american revolution who was hanged as a spy by the british; his last words were supposed to have been `i only regret that i have but one life to give for my country' (1755-1776).<br>**2.** United states astronomer who discovered that sunspots are associated with strong magnetic fields (1868-1938). | *"The plebeians have got your fellow tribune And hale him up and down, all swearing if The Roman ladies bring not comfort home, They’ll give him death by inches."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[haleness]] | noun | **1.** A state of robust good health. | *"In academic literature, haleness designates a state of robust good health."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halenia]] | noun | **1.** Genus of herbs of eurasia and the americas: spurred gentians. | *"In academic literature, halenia designates genus of herbs of eurasia and the americas: spurred gentians."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haler]] | noun | **1.** 100 halers equal 1 koruna slovakia.<br>**2.** 100 halers equal 1 koruna in czech republic. | *"In academic literature, haler designates 100 halers equal 1 koruna slovakia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halesia]] | noun | **1.** Deciduous small trees or shrubs of china and eastern north america. | *"In academic literature, halesia designates deciduous small trees or shrubs of china and eastern north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halevy]] | noun | **1.** French operatic composer (1799-1862). | *"In academic literature, halevy designates french operatic composer (1799-1862)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haley]] | noun | **1.** United states rock singer who was one of the first to popularize rock'n'roll music (1925-1981).<br>**2.** United states writer and afro-american who wrote a fictionalized account of tracing his family roots back to africa (1921-1992). | *"Haley glared at Polk for an hour out here on my porch, when he interrupted us in one of our Epworth League talks, in such an unspiritual manner that Polk said he felt as if he had been introduced to the Apostle Paul while he was still Saul of Tarsus."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[haliaeetus]] | noun | **1.** A genus of accipitridae. | *"In academic literature, haliaeetus designates a genus of accipitridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halibut]] | noun | **1.** Lean flesh of very large flatfish of atlantic or pacific.<br>**2.** Marine food fish of the northern atlantic or northern pacific; the largest flatfish and one of the largest teleost fishes. | *"Let me see, halibut, I guess, with egg sauce."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[halicarnassus]] | noun | **1.** An ancient greek city on the southwestern coast of asia minor in what is now turkey; site of the mausoleum at halicarnassus. | *"In academic literature, halicarnassus designates an ancient greek city on the southwestern coast of asia minor in what is now turkey; site of the mausoleum at halicarnassus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halicoeres]] | noun | **1.** A genus of labridae. | *"In academic literature, halicoeres designates a genus of labridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halictidae]] | noun | **1.** A family of small solitary bees; many are valuable pollinators for agriculture. | *"In academic literature, halictidae designates a family of small solitary bees; many are valuable pollinators for agriculture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halide]] | noun | **1.** A salt of any halogen acid. | *"In academic literature, halide designates a salt of any halogen acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halifax]] | noun | **1.** Provincial capital and largest city of nova scotia. | *"Prior to the Revolution there is a dearth of records; the earlier documents and archives of the Custom-House having, probably, been carried off to Halifax, when all the king’s officials accompanied the British army in its flight from Boston."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[halimodendron]] | noun | **1.** One species: salt tree. | *"In academic literature, halimodendron designates one species: salt tree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haliotidae]] | noun | **1.** Abalones. | *"Classical and authoritative lexicons catalog haliotidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haliotis]] | noun | **1.** Type genus of the family haliotidae. | *"In academic literature, haliotis designates type genus of the family haliotidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halite]] | noun | **1.** Naturally occurring crystalline sodium chloride. | *"In academic literature, halite designates naturally occurring crystalline sodium chloride."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halitosis]] | noun | **1.** Offensive breath. | *"In academic literature, halitosis designates offensive breath."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halitus]] | noun | **1.** Exhaled breath. | *"The place, by the bye, was very stuffy and oppressive, and the faint halitus of freshly-shed blood was in the air."* — H. G. Wells, *The Time Machine* |
| [[hall]] | noun | **1.** An interior passage or corridor onto which rooms open.<br>**2.** A large entrance or reception room or area. | *"A hall in the Duke’s palace Scene II."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hallah]] | noun | **1.** (judaism) a loaf of white bread containing eggs and leavened with yeast; often formed into braided loaves and glazed with eggs before baking. | *"In academic literature, hallah designates (judaism) a loaf of white bread containing eggs and leavened with yeast; often formed into braided loaves and glazed with eggs before baking."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halle]] | noun | **1.** A city in the saxony region of germany on the saale river; a member of the hanseatic league during the 13th and 14th centuries. | *"Das Beste muss hier die Presse thun zur Intimidation, und die ersten Kotwuerfe auf Karl Heine und namentlich auf Adolf Halle werden schon wirken."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[halle-an-der-saale]] | noun | **1.** A city in the saxony region of germany on the saale river; a member of the hanseatic league during the 13th and 14th centuries. | *"In academic literature, halle-an-der-saale designates a city in the saxony region of germany on the saale river; a member of the hanseatic league during the 13th and 14th centuries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hallel]] | noun | **1.** (judaism) a chant of praise (psalms 113 through 118) used at passover and shabuoth and sukkoth and hanukkah and rosh hodesh. | *"In academic literature, hallel designates (judaism) a chant of praise (psalms 113 through 118) used at passover and shabuoth and sukkoth and hanukkah and rosh hodesh."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hallelujah]] | noun | **1.** A shout or song of praise to god. | *"Hell fire and a hallelujah chorus, if she's beautiful," he answered me promptly."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[halley]] | noun | **1.** English astronomer who used newton's laws of motion to predict the period of a comet (1656-1742). | *"In academic literature, halley designates english astronomer who used newton's laws of motion to predict the period of a comet (1656-1742)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halliard]] | noun | **1.** A rope for raising or lowering a sail or flag. | *"In academic literature, halliard designates a rope for raising or lowering a sail or flag."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hallmark]] | noun | **1.** A distinctive characteristic or attribute.<br>**2.** A mark on an article of trade to indicate its origin and authenticity. | *"Above and beyond them all, unsleeping, ever-solicitous, unerring, is the Pilot of their bark, the Charterer of their course, the Founder of their spiritual fellowship, the Bestower of that primacy which is the hallmark of their destiny."* — Effendi Shoghi, *Citadel of Faith* |
| [[halloo]] | noun | **1.** A shout to attract attention.<br>**2.** Urge on with shouts. | *"Backing their oars and putting the boat about, they pulled towards him with a will, and in five or six minutes from the time of his first halloo, two of the sailors hauled him in over the stern."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[hallow]] | verb | **1.** Render holy by means of religious rites. | *"But this lies all within the will of God, To whom I do appeal; and in whose name Tell you the Dauphin I am coming on To venge me as I may, and to put forth My rightful hand in a well-hallow’d cause."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hallowe'en]] | noun | **1.** The evening before all saints' day; often devoted to pranks played by young people. | *"In academic literature, hallowe'en designates the evening before all saints' day; often devoted to pranks played by young people."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hallowed]] | verb | **1.** Render holy by means of religious rites.<br>**2.** Worthy of religious veneration. | *"Nothing sweet boy, but yet like prayers divine, I must each day say o’er the very same, Counting no old thing old, thou mine, I thine, Even as when first I hallowed thy fair name."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[halloween]] | noun | **1.** The evening before all saints' day; often devoted to pranks played by young people. | *"Then, first an’ foremost, thro’ the kail, Their stocks^5 maun a’ be sought ance; [Footnote 5: The first ceremony of Halloween is pulling each a “stock,” or plant of kail."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[hallowmas]] | noun | **1.** A christian feast day honoring all the saints; first observed in 835. | *"And I beseech you, look into Master Froth here, sir, a man of fourscore pound a year; whose father died at Hallowmas—was’t not at Hallowmas, Master Froth?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hallowmass]] | noun | **1.** A christian feast day honoring all the saints; first observed in 835. | *"As bleak-fac’d Hallowmass returns, They get the jovial, rantin kirns, When rural life, of ev’ry station, Unite in common recreation; Love blinks, Wit slaps, an’ social Mirth Forgets there’s Care upo’ the earth."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[hallstand]] | noun | **1.** A piece of furniture where coats and hats and umbrellas can be hung; usually has a mirror. | *"In academic literature, hallstand designates a piece of furniture where coats and hats and umbrellas can be hung; usually has a mirror."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hallucinate]] | verb | **1.** Perceive what is not there; have illusions. | *"In academic literature, hallucinate designates perceive what is not there; have illusions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hallucinating]] | verb | **1.** Perceive what is not there; have illusions.<br>**2.** Experiencing delirium. | *"In academic literature, hallucinating designates perceive what is not there; have illusions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hallucination]] | noun | **1.** Illusory perception; a common symptom of severe mental disorder.<br>**2.** A mistaken or unfounded opinion or idea. | *"It was very terrible if true; if a temporary hallucination, sad."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[hallucinatory]] | adjective | **1.** Characterized by or characteristic of hallucination ; - jean stafford. | *"In academic literature, hallucinatory designates characterized by or characteristic of hallucination ; - jean stafford."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hallucinogen]] | noun | **1.** A psychoactive drug that induces hallucinations or altered sensory experiences. | *"In academic literature, hallucinogen designates a psychoactive drug that induces hallucinations or altered sensory experiences."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hallucinogenic]] | adjective | **1.** Capable of producing hallucinations. | *"In academic literature, hallucinogenic designates capable of producing hallucinations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hallucinosis]] | noun | **1.** A mental state in which the person has continual hallucinations. | *"In academic literature, hallucinosis designates a mental state in which the person has continual hallucinations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hallux]] | noun | **1.** The first largest innermost toe. | *"In academic literature, hallux designates the first largest innermost toe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hallway]] | noun | **1.** An interior passage or corridor onto which rooms open. | *"As soon as our lessons were done at twelve o'clock, they ran to the garden and, getting the whip I had hidden in the hallway, I ran after them."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[halm]] | noun | **1.** Stems of beans and peas and potatoes and grasses collectively as used for thatching and bedding. | *"In academic literature, halm designates stems of beans and peas and potatoes and grasses collectively as used for thatching and bedding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halma]] | noun | **1.** A board game in which players try to move their pieces into their opponent's bases. | *"In academic literature, halma designates a board game in which players try to move their pieces into their opponent's bases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halo]] | noun | **1.** An indication of radiant light drawn around the head of a saint.<br>**2.** A toroidal shape. | *"He is surrounded by a mysterious halo of family confidences, of which he is known to be the silent depository."* — Charles Dickens, *Bleak House* |
| [[haloalkane]] | noun | **1.** Organic compound in which halogen atoms have been substituted for hydrogen atoms in an alkane. | *"In academic literature, haloalkane designates organic compound in which halogen atoms have been substituted for hydrogen atoms in an alkane."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halobacter]] | noun | **1.** Halophiles in saline environments such as the dead sea or salt flats. | *"In academic literature, halobacter designates halophiles in saline environments such as the dead sea or salt flats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halobacteria]] | noun | **1.** Halophiles in saline environments such as the dead sea or salt flats. | *"In academic literature, halobacteria designates halophiles in saline environments such as the dead sea or salt flats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halobacterium]] | noun | **1.** Halophiles in saline environments such as the dead sea or salt flats. | *"In academic literature, halobacterium designates halophiles in saline environments such as the dead sea or salt flats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halocarbon]] | noun | **1.** One of various compounds of carbon and any of the halogens. | *"In academic literature, halocarbon designates one of various compounds of carbon and any of the halogens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halocarpus]] | noun | **1.** Dioecious trees or shrubs of new zealand; similar in habit to dacrydium. | *"In academic literature, halocarpus designates dioecious trees or shrubs of new zealand; similar in habit to dacrydium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haloform]] | noun | **1.** Compounds with the formula chx3, where x is a halogen atom. | *"In academic literature, haloform designates compounds with the formula chx3, where x is a halogen atom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halogen]] | noun | **1.** Any of five related nonmetallic elements (fluorine or chlorine or bromine or iodine or astatine) that are all monovalent and readily form negative ions. | *"In academic literature, halogen designates any of five related nonmetallic elements (fluorine or chlorine or bromine or iodine or astatine) that are all monovalent and readily form negative ions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halogeton]] | noun | **1.** A coarse annual herb introduced into north america from siberia; dangerous to sheep and cattle on western rangelands because of its high oxalate content. | *"In academic literature, halogeton designates a coarse annual herb introduced into north america from siberia; dangerous to sheep and cattle on western rangelands because of its high oxalate content."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halon]] | noun | **1.** A compound in which the hydrogen atoms of a hydrocarbon have been replaced by bromine and other halogen atoms; very stable; used in fire extinguishers although it is thought to release bromine that depletes the ozone layer. | *"In academic literature, halon designates a compound in which the hydrogen atoms of a hydrocarbon have been replaced by bromine and other halogen atoms; very stable; used in fire extinguishers although it is thought to release bromine that depletes the ozone layer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haloperidol]] | noun | **1.** Tranquilizer (trade name haldol) used to treat some psychotic disorders and tourette's syndrome. | *"In academic literature, haloperidol designates tranquilizer (trade name haldol) used to treat some psychotic disorders and tourette's syndrome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halophil]] | noun | **1.** Archaebacteria requiring a salt-rich environment for growth and survival. | *"In academic literature, halophil designates archaebacteria requiring a salt-rich environment for growth and survival."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halophile]] | noun | **1.** Archaebacteria requiring a salt-rich environment for growth and survival. | *"In academic literature, halophile designates archaebacteria requiring a salt-rich environment for growth and survival."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halophyte]] | noun | **1.** Plant growing naturally in very salty soil. | *"In academic literature, halophyte designates plant growing naturally in very salty soil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haloragaceae]] | noun | **1.** A family of dicotyledonous plants of the order myrtales. | *"In academic literature, haloragaceae designates a family of dicotyledonous plants of the order myrtales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haloragidaceae]] | noun | **1.** A family of dicotyledonous plants of the order myrtales. | *"In academic literature, haloragidaceae designates a family of dicotyledonous plants of the order myrtales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halothane]] | noun | **1.** A nonflammable inhalation anesthetic that produces general anesthesia; used along with analgesics and muscle relaxants for many types of surgical procedures. | *"In academic literature, halothane designates a nonflammable inhalation anesthetic that produces general anesthesia; used along with analgesics and muscle relaxants for many types of surgical procedures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hals]] | noun | **1.** Dutch portrait and genre painter who endowed his portraits with vitality and humor (1580?-1666). | *"In academic literature, hals designates dutch portrait and genre painter who endowed his portraits with vitality and humor (1580?-1666)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[halt]] | noun | **1.** The state of inactivity following an interruption.<br>**2.** The event of something ending. | *"I’ll halt after. [_Exeunt._] SCENE VIII."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[halter]] | noun | **1.** Rope or canvas headgear for a horse, with a rope for leading.<br>**2.** A rope that is used by a hangman to execute persons who have been condemned to death by hanging. | *"I hope I shall as soon be strangled with a halter as another."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[haltere]] | noun | **1.** Either of the rudimentary hind wings of dipterous insects; used for maintaining equilibrium during flight. | *"Here he halted for the night, knee-haltering the horse, and leaving it loose to graze, though he himself had nothing to eat."* — H. Rider Haggard, *Swallow: A Tale of the Great Trek* |
| [[halting]] | verb | **1.** Cause to stop.<br>**2.** Come to a halt, stop moving. | *"Your brooches, pearls, and ouches:”—for to serve bravely is to come halting off, you know; to come off the breach with his pike bent bravely, and to surgery bravely; to venture upon the charged chambers bravely— DOLL."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[haltingly]] | adverb | **1.** In a halting manner. | *"Now tell me," she urged, "the whole story." Haltingly he told the tale, though the process hurt."* — Anna Balmer Myers, *Amanda: A Daughter of the Mennonites* |
| [[halyard]] | noun | **1.** A rope for raising or lowering a sail or flag. | *"Suspended from his ears were two golden hoops, so large that the sailors called them ring-bolts, and would talk of securing the top-sail halyards to them."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[inhalant]] | noun | **1.** Something that is inhaled.<br>**2.** A medication to be taken by inhaling it. | *"In academic literature, inhalant designates something that is inhaled."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhalation]] | noun | **1.** The act of inhaling; the drawing in of air (or other gases) as in breathing.<br>**2.** A medication to be taken by inhaling it. | *"In academic literature, inhalation designates the act of inhaling; the drawing in of air (or other gases) as in breathing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhalator]] | noun | **1.** A breathing device for administering long-term artificial respiration.<br>**2.** A dispenser that produces a chemical vapor to be inhaled in order to relieve nasal congestion. | *"In academic literature, inhalator designates a breathing device for administering long-term artificial respiration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhale]] | verb | **1.** Draw deep into the lungs in by breathing.<br>**2.** Draw in (air). | *"Of yourself you could come with soft flight and nestle against my heart, if you would: seized against your will, you will elude the grasp like an essence—you will vanish ere I inhale your fragrance."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[inhaler]] | noun | **1.** A dispenser that produces a chemical vapor to be inhaled in order to relieve nasal congestion. | *"In academic literature, inhaler designates a dispenser that produces a chemical vapor to be inhaled in order to relieve nasal congestion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unhallow]] | verb | **1.** Remove the consecration from a person or an object. | *"State holy or unhallow’d, what of that?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unhallowed]] | verb | **1.** Remove the consecration from a person or an object.<br>**2.** Not hallowed or consecrated. | *"Let never day nor night unhallowed pass, But still remember what the Lord hath done."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Life]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · HAL
  </div>
</div>
