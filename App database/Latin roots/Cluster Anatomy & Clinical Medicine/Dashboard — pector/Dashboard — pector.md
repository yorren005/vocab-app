---
status: unread
type: root_dashboard
---
# Dashboard — pector
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pector-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“chest or breast”</span>
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

The root **pector** means chest or breast. It refers to chest, breast, thorax, seat of courage, respiratory ejection. In English, this root forms words such as *pectoral*, *pectoralis*, *expectorate*, and *expectoration*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: chest or breast
> The root **pector** means chest or breast. It refers to chest, breast, thorax, seat of courage, respiratory ejection. In English, this root forms words such as *pectoral*, *pectoralis*, *expectorate*, and *expectoration*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Chest or breast</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The natural organs, tissues, and inner workings of the human body.</mark>
> - **Everyday Connection**: Think of familiar words like *pectoral* and *pectoralis*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pector** comes from a Latin word that means *"chest or breast"*.
  - At its core, it describes chest or breast.

- **The Big Picture Idea**:
  - Picture the natural organs, tissues, and inner workings of the human body.
  - Whenever you see **pector** in an English word, think of **bodily anatomy and health**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of chest or breast.
  - **Mental & Social**: How people experience, organize, or communicate about chest or breast.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Pectoral**: Of, relating to, or situated in or on the chest or breast.
  - **Pectoralis**: Either of two large skeletal muscles situated on each side of the anterior chest wall: the *pectoralis major* and *pectoralis minor*.
  - **Expectorate**: To eject, cough up, and spit out phlegm, mucus, or fluid from the lungs and respiratory tract.
  - **Expectoration**: The act or process of coughing up and spitting out secretions from the respiratory tract.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pector</mark>, think of <mark class="hl-def">bodily anatomy and health</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **pector** forms English terms through classical prefixes, anatomical suffixes, and Romance compounds:
> 
> ### 1. Primary Base Formations (*pector-*)
> - *pectus* + *-ālis* → [[pectoral]] (adjective & noun), `pectorally` (adverb).
> - *pectoralis* (Latin nominative masculine/feminine adjective used as noun) → [[pectoralis]] (chest muscle).
> - *pectus* + Greek *-algia* ("pain") → `pectoralgia` (noun, chest pain).
> 
> ### 2. Prefix Expulsion Compounds (*expector-*)
> - **`ex-` (out of, forth from):**
>   - *ex-* + *pectus* + *-āre* → Latin *expectorāre* → [[expectorate]] (verb: to cough up from chest).
>   - *expectorate* + *-ion* → [[expectoration]] (noun, sputum, discharge).
>   - *expectorate* + *-ant* → [[expectorant]] (noun & adjective, mucus-thinning medicine).
> 
> ### 3. Auscultatory Compound with *loquī* ("to speak")
> - *pectus* + *loquī* + *-y* → [[pectoriloquy]] (noun, acoustic transmission of voice through chest).
> 
> ### 4. Italian Military Compound (*parapetto*)
> - Italian *parare* ("to ward off, shield") + *petto* (Latin *pectus*) → [[parapet]] (noun, breast-height wall).
> 
> ### 5. Classical Medical & Sternal Idioms
> - *angina* ("strangling") + *pectoris* → `angina pectoris` (strangling chest pain).
> - *pectus* + *excavātum* ("hollowed out") → `pectus excavatum` (funnel chest).
> - *pectus* + *carīnātum* ("keel-shaped") → `pectus carinatum` (pigeon chest).
> - Italian idiom *in petto* (from Latin *in pectore*, "kept secret in the heart").

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
> Although the root fundamentally denotes **"the chest and breast"**, its applications branch into distinct specialized spheres:
> - **Musculoskeletal Anatomy & Fitness:** In [[pectoral]] and [[pectoralis]] (the "pecs"), it governs the powerful muscles adducting and flexing the humerus, as well as the pectoral fins of aquatic animals.
> - **Pharmacology & Respiratory Care:** In [[expectorant]], [[expectorate]], and [[expectoration]], it describes mucolytic medications (such as guaifenesin) that liquefy thick tracheobronchial secretions to clear the airway.
> - **Diagnostic Pulmonology & Cardiology:** In [[pectoriloquy]] and `angina pectoris`, it provides vital diagnostic signs for lobar pneumonia lung consolidation and myocardial ischemia.
> - **Fortification & Civil Engineering:** In [[parapet]], it names protective parapet walls along castle battlements, bridges, and building rooftops built to chest-height to prevent falls.
> - **Ecclesiastical History & Papal Curia:** In `in petto` and [[pectoral]] cross, it invokes the secret reservation of cardinals by the Pope and bishops' devotional regalia.

---

## 🔀 4. Prefix & Combining Dynamics on pector

| Prefix / Element | Component Meaning | Derived English Word | Modern Semantic Function |
| :--- | :--- | :--- | :--- |
| `ex-` (out of) | *expectorāre* (out of chest) | [[expectorate]] / [[expectorant]] | To cough up phlegm; a drug that clears the chest. |
| `loquī` (to speak) | *pectoriloquium* | [[pectoriloquy]] | Voice sounds heard through the chest via stethoscope. |
| `parare` (to shield)| Italian *parapetto* | [[parapet]] | Low defensive wall reaching breast height. |
| `angina` (strangling)| *angina pectoris* | `angina pectoris` | Severe cardiac chest pressure and pain. |
| `excavatum` (hollowed)| *pectus excavatum* | `pectus excavatum` | Sternal depression deformity (funnel chest). |
| `carinatum` (keeled)| *pectus carinatum* | `pectus carinatum` | Sternal protrusion deformity (pigeon chest). |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🫀 **Cardiology & Emergency Medicine** | `angina pectoris`, [[pectoral]], `pectoralgia` | Nitroglycerin sublingual therapy for angina; differential diagnosis of acute coronary syndrome |
| 🫁 **Pulmonology & Physical Diagnosis** | [[expectorant]], [[expectorate]], [[pectoriloquy]] | Whispered pectoriloquy over lobar consolidation; mucolytic therapy for chronic bronchitis |
| 🏋️ **Kinesiology & Plastic Surgery** | [[pectoralis]], [[pectoral]] | Pectoralis major myocutaneous flaps; bench press biomechanics; Poland syndrome absence |
| 🏰 **Architecture & Military Defense** | [[parapet]] | Crenellated battlements in medieval castles; safety parapet railings on high bridges |
| ⛪ **Vatican Diplomacy & Church History** | `in petto`, [[pectoral]] | Papal appointment of underground cardinals *in pectore*; gold pectoral crosses |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[expectorant]] | noun | **1.** A medicine promoting expectoration. | *"In academic literature, expectorant designates a medicine promoting expectoration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expectorate]] | verb | **1.** Clear out the chest and lungs.<br>**2.** Discharge (phlegm or sputum) from the lungs and out of the mouth. | *"As Tom wended to school after breakfast, he was the envy of every boy he met because the gap in his upper row of teeth enabled him to expectorate in a new and admirable way."* — Mark Twain, *The Adventures of Tom Sawyer, Complete* |
| [[expectoration]] | noun | **1.** The process of coughing up and spitting out.<br>**2.** The act of spitting (forcefully expelling saliva). | *"It was attended with purulent expectoration, and became so troublesome as to entitle it to be regarded as the leading feature of the case."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[expectorator]] | noun | **1.** A person who spits (ejects saliva or phlegm from the mouth).<br>**2.** A medicine promoting expectoration. | *"In academic literature, expectorator designates a person who spits (ejects saliva or phlegm from the mouth)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pectoral]] | noun | **1.** Either of two large muscles of the chest.<br>**2.** An adornment worn on the chest or breast. | *"At his shoulder-blades the Syrian's pectoral muscles pressed like shallow knobs of steel."* — Donn Byrne, *The Wind Bloweth* |
| [[pectoralis]] | noun | **1.** Either of two large muscles of the chest. | *"In academic literature, pectoralis designates either of two large muscles of the chest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pectoriloquy]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin pector within the domain of Anatomy & Clinical Medicine.<br>**2.** A technical or specialized form exhibiting the properties of pector in systematic terminology. | *"In academic literature, pectoriloquy designates pertaining to, derived from, or characteristic of latin pector within the domain of anatomy & clinical medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · PECTOR
  </div>
</div>
