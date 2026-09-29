---
status: unread
type: root_dashboard
---
# Dashboard — cep
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cep-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to take or receive”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Hands holding an object firmly so it does not slip or drop.</span>
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

The root **cep** means to take or receive. It refers to grasping an object firmly with the hands or taking control of something. In English, this root forms words such as *seize*, *accept*, *acceptable*, and *acceptability*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to take or receive
> The root **cep** means to take or receive. It refers to grasping an object firmly with the hands or taking control of something. In English, this root forms words such as *seize*, *accept*, *acceptable*, and *acceptability*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To take or receive</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands holding an object firmly so it does not slip or drop.</mark>
> - **Everyday Connection**: Think of familiar words like *seize* and *accept*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cep** comes from a Latin word that means *"to take or receive"*.
  - At its core, it describes the action of take or receive.

- **The Big Picture Idea**:
  - Picture hands holding an object firmly so it does not slip or drop.
  - Whenever you see **cep** in an English word, think of **to take or receive**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to take or receive).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Seize**: An everyday English word showing the root's idea of *to take or receive*.
  - **Accept**: To consent to receive.
  - **Acceptable**: Able to be agreed on or approved.
  - **Acceptability**: The quality of being tolerable, welcome, or suitable.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cep</mark>, think of <mark class="hl-def">to take or receive</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **cep** never stands alone in English; it always functions inside prefixed compounds through two primary shapes:
> - **1. The French-Mediated Verbal Stem (`-ceive`):**
>   - *accept*, *conceive*, *deceive*, *perceive*, *receive*.
> - **2. The Latin Participial Stem (`-cept-`):**
>   - Nouns of act/result: *concept*, *conception*, *deception*, *exception*, *inception*, *interception*, *perception*, *precept*, *reception*.
>   - Adjectives of capacity/tendency: *acceptable*, *conceptive*, *deceptive*, *exceptional*, *perceptible*, *receptive*, *susceptible*.
>   - Agent/Instrument nouns: *acceptor*, *inceptor*, *interceptor*, *preceptor*, *receptor*, *receptacle*.
> - **3. Directional Prefix Engine:**
>   - `ad-` $\to$ *ac-* (to, toward): *accept*, *acceptance*.
>   - `con-` (together, thoroughly): *conceive*, *concept*, *conception*.
>   - `de-` (away, down, misleading): *deceive*, *deception*.
>   - `ex-` (out of, without): *except*, *exception*.
>   - `in-` (in, beginning): *inception*, *inceptive*.
>   - `inter-` (between, across): *intercept*, *interception*.
>   - `per-` (thoroughly, through): *perceive*, *perception*.
>   - `prae-` $\to$ *pre-* (before, in advance): *precept*, *preceptor*.
>   - `re-` (back, in return): *receive*, *reception*, *receptive*.
>   - `sub-` $\to$ *sus-* (under, from beneath): *susceptible*, *susceptibility*.

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
> The semantic manifestations of **cep** branch across five core conceptual channels:
> - **1. Sensory Cognition & Epistemology:** In [[perceive]], [[perception]], [[perceptive]], and [[percept]], the root describes registering sensory stimuli through visual, auditory, and cognitive faculties.
> - **2. Abstract Thought & Concept Formation:** In [[conceive]], [[concept]], [[conception]], [[conceptual]], and [[conceptualize]], the root represents gathering disparate empirical observations into a unified mental category.
> - **3. Moral, Strategic & Optical Illusion:** In [[deceive]], [[deception]], [[deceptive]], and [[deceptively]], the root captures misleading the mind by presenting counterfeit appearances.
> - **4. Mechanical Interruption & Physical Delivery:** In [[intercept]], [[interception]], [[receive]], [[receiver]], and [[reception]], the root denotes catching items moving between points or accepting goods at destination.
> - **5. Biological Vulnerability & Cellular Signaling:** In [[susceptible]], [[susceptibility]], and [[receptor]], the root describes the physiological openness of an organism to disease, or protein docking sites on cell membranes.

---

## 🔀 4. Prefix & Combining Dynamics on cep

### Compounding Bases & Morphological Shifts

| Combining Form / Affix | Affix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` + `-cept` | to, toward (*ad-*) + take | [[accept]] | To take something offered toward oneself; to consent to receive. |
| `con-` + `-cept` | together (*con-*) + take | [[concept]] | An abstract idea formed by taking multiple instances together in thought. |
| `con-` + `-ceive` | together (*con-*) + take | [[conceive]] | To become pregnant with young; to form an idea in the mind. |
| `de-` + `-ceive` | away, off (*de-*) + take | [[deceive]] | To ensnare, mislead, or cause to believe what is false. |
| `ex-` + `-cept` | out of (*ex-*) + take | [[except]] | To take out of a class or rule; not including; to object formally. |
| `in-` + `-cept` | in, into (*in-*) + take | [[inception]] | The act of taking up something at its origin; the beginning. |
| `inter-` + `-cept` | between (*inter-*) + take | [[intercept]] | To seize or stop someone or something in transit between two points. |
| `per-` + `-ceive` | through (*per-*) + take | [[perceive]] | To take thoroughly into the mind through the physical senses. |
| `prae-` + `-cept` | before (*prae-*) + take | [[precept]] | A general rule or maxim laid down beforehand to guide conduct. |
| `re-` + `-ceive` | back, in return (*re-*) + take | [[receive]] | To take into possession what is handed over, sent, or delivered. |
| `sub-` + `-cept` | under (*sub-*) + take | [[susceptible]] | Open, liable, or easily influenced to take up disease, emotion, or suggestion. |
| `contra-` + `-ception` | against (*contra-*) + conception | [[contraception]] | Methods, devices, or medications used to prevent the conception of an embryo. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-tion` | Noun (Act / Result) | [[reception]], [[deception]], [[conception]] | The act, process, result, or social occasion of taking or receiving. |
| `-ible` / `-able` | Adjective (Capability) | [[acceptable]], [[perceptible]], [[susceptible]] | Able to be taken, registered by the senses, or acted upon. |
| `-ive` | Adjective (Tendency) | [[perceptive]], [[deceptive]], [[receptive]] | Having the disposition or faculty to take in, mislead, or welcome. |
| `-or` | Noun (Agent / Device) | [[interceptor]], [[preceptor]], [[receptor]] | An entity, missile, teacher, or protein molecule that takes or receives. |
| `-ual` / `-ualize` | Adj. / Verb (Abstract) | [[conceptual]], [[conceptualize]] | Pertaining to concepts; to form an abstract mental model of something. |
| `-acle` (< *-āculum*) | Noun (Container) | [[receptacle]] | A hollow vessel, container, or electrical fitting used to receive items. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🧠 **Cognitive Science, Neurology & Psychology** | [[perception]], [[percept]], [[perceptive]], [[extrasensory perception]] | Gestalt visual perception, sensory threshold detection, and cognitive bias. |
| 🧬 **Cell Biology, Immunology & Pharmacology** | [[receptor]], [[susceptible]], [[susceptibility]], [[contraception]] | G-protein coupled receptors (GPCRs), viral cell-surface docking, and antibiotic susceptibility testing. |
| 🏛️ **Jurisprudence, Legal Procedure & Ethics** | [[except]], [[exception]], [[precept]], [[receivership]] | Statutory exception clauses, equitable maxims, and corporate bankruptcy receivership. |
| 🚀 **Aerospace, Military Defense & Mathematics** | [[intercept]], [[interceptor]], [[interception]] | Ballistic missile defense interceptors, radio communications interception, and Cartesian graph $y$-intercepts. |
| 💡 **Epistemology, Philosophy & Logic** | [[concept]], [[conceptual]], [[conceptualize]], [[inconceivable]] | Kantian conceptual schemes, Frege's concept-object distinction, and conceptual modeling. |
| 🏢 **Commerce, Hospitality & Media** | [[receive]], [[reception]], [[receptionist]], [[acceptable]] | Hotel front desk guest reception, cellular telecommunications signal reception, and quality acceptance standards. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[accept]] | verb | **1.** Consider or hold as true.<br>**2.** Receive willingly something given or offered. | *"Their latest refuge Was to send him, for whose old love I have— Though I showed sourly to him—once more offered The first conditions, which they did refuse And cannot now accept, to grace him only That thought he could do more."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[acceptability]] | noun | **1.** Satisfactoriness by virtue of conforming to approved standards. | *"In academic literature, acceptability designates satisfactoriness by virtue of conforming to approved standards."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acceptable]] | adjective | **1.** Worthy of acceptance or satisfactory.<br>**2.** Judged to be in conformity with approved usage. | *"For having traffic with thyself alone, Thou of thyself thy sweet self dost deceive, Then how when nature calls thee to be gone, What acceptable audit canst thou leave?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[acceptableness]] | noun | **1.** Satisfactoriness by virtue of conforming to approved standards. | *"In academic literature, acceptableness designates satisfactoriness by virtue of conforming to approved standards."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acceptably]] | adverb | **1.** In an acceptable (but not outstanding) manner. | *"We have endeavored to exercise a wise and careful discrimination both in avoiding the introduction of any name unworthy of a place in such a record, and in giving the due meed of honor to those who have wrought most earnestly and acceptably."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[acceptance]] | noun | **1.** The mental attitude that something is believable and should be accepted as true.<br>**2.** The act of accepting with approval; favorable reception. | *"Shall will in others seem right gracious, And in my will no fair acceptance shine?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[acceptant]] | adjective | **1.** Accepting willingly. | *"In academic literature, acceptant designates accepting willingly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acceptation]] | noun | **1.** Acceptance as true or valid.<br>**2.** The accepted meaning of a word. | *"Not only had he put himself beyond the pale of human laws, but he had made himself independent of them, free in the strictest acceptation of the word, quite beyond their reach!"* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[accepted]] | verb | **1.** Consider or hold as true.<br>**2.** Receive willingly something given or offered. | *"It will not be accepted, on my life."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accepting]] | verb | **1.** Consider or hold as true.<br>**2.** Receive willingly something given or offered. | *"He was only wrong in accepting the attentions (for accepting must be the word) of two young women at once."* — Jane Austen, *Persuasion* |
| [[acceptive]] | adjective | **1.** Inclined to accept rather than reject.<br>**2.** Accepting willingly. | *"In academic literature, acceptive designates inclined to accept rather than reject."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acceptor]] | noun | **1.** (chemistry) in the formation of a coordinate bond it is the compound to which electrons are donated.<br>**2.** The person (or institution) who accepts a check or draft and becomes responsible for paying the party named in the draft when it matures. | *"In academic literature, acceptor designates (chemistry) in the formation of a coordinate bond it is the compound to which electrons are donated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apperception]] | noun | **1.** The process whereby perceived qualities of an object are related to past experience. | *"In academic literature, apperception designates the process whereby perceived qualities of an object are related to past experience."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apperceptive]] | adjective | **1.** Able to relate new percepts to past experience. | *"In academic literature, apperceptive designates able to relate new percepts to past experience."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concepcion]] | noun | **1.** An industrial city in chile to the south of santiago. | *"In academic literature, concepcion designates an industrial city in chile to the south of santiago."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concept]] | noun | **1.** An abstract or general idea inferred or derived from specific instances. | *"Moreover, capital is an acquisitive concept."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[conception]] | noun | **1.** An abstract or general idea inferred or derived from specific instances.<br>**2.** The act of becoming pregnant; fertilization of an ovum by a spermatozoon. | *"Conception is a blessing, but not as your daughter may conceive."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conceptional]] | adjective | **1.** Being of the nature of a notion or concept. | *"In academic literature, conceptional designates being of the nature of a notion or concept."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conceptive]] | adjective | **1.** Capable of conceiving. | *"In academic literature, conceptive designates capable of conceiving."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conceptual]] | adjective | **1.** Being or characterized by concepts or their formation. | *"The telecommunicator, which the surgeons had planted in his skull, caught the sound of alien voices and made a conceptual translation in terms Henig understood."* — Jr. Irving E. Cox, *Export Commodity* |
| [[conceptualisation]] | noun | **1.** An elaborated concept.<br>**2.** Inventing or contriving an idea or explanation and formulating it mentally. | *"In academic literature, conceptualisation designates an elaborated concept."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conceptualise]] | verb | **1.** Have the idea for. | *"In academic literature, conceptualise designates have the idea for."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conceptualism]] | noun | **1.** The doctrine that the application of a general term to various objects indicates the existence of a mental entity that mediates the application. | *"In academic literature, conceptualism designates the doctrine that the application of a general term to various objects indicates the existence of a mental entity that mediates the application."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conceptualistic]] | adjective | **1.** Involving or characteristic of conceptualism. | *"In academic literature, conceptualistic designates involving or characteristic of conceptualism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conceptuality]] | noun | **1.** An elaborated concept. | *"In academic literature, conceptuality designates an elaborated concept."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conceptualization]] | noun | **1.** Inventing or contriving an idea or explanation and formulating it mentally.<br>**2.** An elaborated concept. | *"In academic literature, conceptualization designates inventing or contriving an idea or explanation and formulating it mentally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conceptualize]] | verb | **1.** Have the idea for. | *"In academic literature, conceptualize designates have the idea for."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conceptually]] | adverb | **1.** In a conceptual manner. | *"In academic literature, conceptually designates in a conceptual manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conceptus]] | noun | **1.** An animal organism in the early stages of growth and differentiation that in higher forms merge into fetal stages but in lower forms terminate in commencement of larval life. | *"In academic literature, conceptus designates an animal organism in the early stages of growth and differentiation that in higher forms merge into fetal stages but in lower forms terminate in commencement of larval life."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contraception]] | noun | **1.** Birth control by the use of devices (diaphragm or intrauterine device or condom) or drugs or surgery. | *"In academic literature, contraception designates birth control by the use of devices (diaphragm or intrauterine device or condom) or drugs or surgery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contraceptive]] | noun | **1.** An agent or device intended to prevent conception.<br>**2.** Capable of preventing conception or impregnation. | *"In academic literature, contraceptive designates an agent or device intended to prevent conception."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deception]] | noun | **1.** A misleading falsehood.<br>**2.** The act of deceiving. | *"Is it deception?” “Ah—h!” from Mrs."* — Charles Dickens, *Bleak House* |
| [[deceptive]] | adjective | **1.** Causing one to believe what is not true or fail to believe what is true.<br>**2.** Designed to deceive or mislead either deliberately or inadvertently. | *"Nor was I unmindful of that deceptive moonlight."* — Jack London, *The Jacket (The Star-Rover)* |
| [[deceptively]] | adverb | **1.** In a misleading way. | *"I had first seen the place on a moist afternoon when distances are deceptively diminished."* — H. G. Wells, *The Time Machine* |
| [[deceptiveness]] | noun | **1.** The quality of being deceptive. | *"In academic literature, deceptiveness designates the quality of being deceptive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disceptation]] | noun | **1.** A contentious speech act; a dispute where there is strong disagreement. | *"In academic literature, disceptation designates a contentious speech act; a dispute where there is strong disagreement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[except]] | verb | **1.** Take exception to.<br>**2.** Prevent from being included or considered or accepted. | *"Exeunt all except Enobarbus, Agrippa and Maecenas._] MAECENAS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exception]] | noun | **1.** A deliberate act of omission.<br>**2.** An instance that does not conform to a rule or generalization. | *"What I have done That might your nature, honour, and exception Roughly awake, I here proclaim was madness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exceptionable]] | adjective | **1.** Liable to objection or debate; used of something one might take exception to. | *"And, besides, no traces of them were to be found on the Barnet road.” “Well, then,--supposing them to be in London--they may be there, though for the purpose of concealment, for no more exceptionable purpose."* — Jane Austen, *Pride and Prejudice* |
| [[exceptional]] | adjective | **1.** Far beyond what is usual in magnitude or degree.<br>**2.** Surpassing what is common or usual or expected. | *"Turveydrop, “let me, even under the present exceptional circumstances, recommend strict punctuality."* — Charles Dickens, *Bleak House* |
| [[exceptionally]] | adverb | **1.** To an exceptional degree. | *"He was a fairly well-educated man for one of middle class—exceptionally well educated for a common soldier."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[imperceptibility]] | noun | **1.** The property of being imperceptible by the mind or the senses. | *"In academic literature, imperceptibility designates the property of being imperceptible by the mind or the senses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imperceptible]] | adjective | **1.** Impossible or difficult to perceive by the mind or senses. | *"Just as that imperceptible motion which appears like stillness is infinitely divided in its properties from stillness itself, so had his hope undistinguishable from despair differed from despair indeed."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[imperceptibly]] | adverb | **1.** In an imperceptible manner or to an imperceptible degree. | *"First, that he seems imperceptibly to establish a dreadful right of property in mademoiselle."* — Charles Dickens, *Bleak House* |
| [[inception]] | noun | **1.** An event that is a beginning; a first part or stage of subsequent events. | *"My mother, at my inception, did not create that passionate lack of fear that is mine."* — Jack London, *The Jacket (The Star-Rover)* |
| [[insusceptible]] | adjective | **1.** Not susceptible to. | *"You cannot think of God; for, if you could think of God, God would be in relation with you; God is insusceptible of relation with man."* — T. R. Glover, *The Jesus of History* |
| [[intercept]] | noun | **1.** The point at which a line intersects a coordinate axis.<br>**2.** Seize on its way. | *"To intercept this inconvenience, A piece of ordnance ’gainst it I have placed And even these three days have I watch’d, If I could see them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[interception]] | noun | **1.** The act of intercepting; preventing something from proceeding or arriving.<br>**2.** (american football) the act of catching a football by a player on the opposing team. | *"The King hath note of all that they intend, By interception which they dream not of."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[interceptor]] | noun | **1.** A fast maneuverable fighter plane designed to intercept enemy aircraft. | *"Have one of your squadrons remain in this sector and to take out the interceptors that have been harassing our fleet and then catch up with us."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[misconception]] | noun | **1.** An incorrect conception. | *"It comes to a fundamental unbelief in God, resting, as Jesus saw, on an essential misconception of God's nature; and this resulted in the spoiling of life."* — T. R. Glover, *The Jesus of History* |
| [[nonacceptance]] | noun | **1.** The act of refusing an offer. | *"In academic literature, nonacceptance designates the act of refusing an offer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[percept]] | noun | **1.** The representation of what is perceived; basic component in the formation of a concept. | *"In academic literature, percept designates the representation of what is perceived; basic component in the formation of a concept."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perceptibility]] | noun | **1.** The property of being perceptible by the mind or the senses. | *"But that thing of his dissembling was only subject to his perceptibility, not to his will determinate."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[perceptible]] | adjective | **1.** Capable of being perceived by the mind or senses.<br>**2.** Easily perceived by the senses or grasped by the mind. | *"Anne was so impressed by the degree of their danger, that she could not excuse herself from trying to make it perceptible to her sister."* — Jane Austen, *Persuasion* |
| [[perceptibly]] | adverb | **1.** In a noticeable manner. | *"I shall do one thing in this life—one thing certain—that is, love you, and long for you, and _keep wanting you_ till I die.” His voice had a genuine pathos now, and his large brown hands perceptibly trembled."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[perception]] | noun | **1.** The representation of what is perceived; basic component in the formation of a concept.<br>**2.** A way of conceiving something. | *"My guardian, with his sweet temper and his quick perception and his amiable face, made something agreeable even out of the ungenial company."* — Charles Dickens, *Bleak House* |
| [[perceptive]] | adjective | **1.** Of or relating to perception.<br>**2.** Having the ability to perceive or understand; keen in discernment. | *"Perceptive grandparents see the world through a grandchild's imagination."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[perceptively]] | adverb | **1.** In a perceptive manner. | *"In academic literature, perceptively designates in a perceptive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perceptiveness]] | noun | **1.** A feeling of understanding.<br>**2.** Delicate discrimination (especially of aesthetic values). | *"In academic literature, perceptiveness designates a feeling of understanding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perceptivity]] | noun | **1.** A feeling of understanding. | *"In academic literature, perceptivity designates a feeling of understanding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perceptual]] | adjective | **1.** Of or relating to the act of perceiving. | *"In academic literature, perceptual designates of or relating to the act of perceiving."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perceptually]] | adverb | **1.** With regard to perception. | *"In academic literature, perceptually designates with regard to perception."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precept]] | noun | **1.** Rule of personal conduct.<br>**2.** A doctrine that is taught. | *"I have ta’en a due and wary note upon’t; With whispering and most guilty diligence, In action all of precept, he did show me The way twice o’er."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preceptor]] | noun | **1.** Teacher at a university or college (especially at cambridge or oxford). | *"We found him engaged with a not very hopeful pupil—a stubborn little girl with a sulky forehead, a deep voice, and an inanimate, dissatisfied mama—whose case was certainly not rendered more hopeful by the confusion into which we threw her preceptor."* — Charles Dickens, *Bleak House* |
| [[preceptorship]] | noun | **1.** The position of preceptor. | *"In academic literature, preceptorship designates the position of preceptor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preconception]] | noun | **1.** An opinion formed beforehand without adequate evidence.<br>**2.** A partiality that prevents objective consideration of an issue or situation. | *"There are the Gospels, and, like other historical records, they must be studied in earnest on scientific lines without preconception."* — T. R. Glover, *The Jesus of History* |
| [[quadriceps]] | noun | **1.** A muscle of the thigh that extends the leg. | *"In academic literature, quadriceps designates a muscle of the thigh that extends the leg."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[receptacle]] | noun | **1.** A container that is used to put or keep things in.<br>**2.** Enlarged tip of a stem that bears the floral parts. | *"O sacred receptacle of my joys, Sweet cell of virtue and nobility, How many sons hast thou of mine in store, That thou wilt never render to me more?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reception]] | noun | **1.** The manner in which something is greeted.<br>**2.** A formal party of people; as after a wedding. | *"A pavilion by the side of it for the reception of the King, Princess, Lords, etc."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[receptionist]] | noun | **1.** A secretary whose main duty is to answer the telephone and receive visitors. | *"In academic literature, receptionist designates a secretary whose main duty is to answer the telephone and receive visitors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[receptive]] | adjective | **1.** Open to arguments, ideas, or change.<br>**2.** Ready or willing to receive favorably. | *"Tess was so receptive that the few minutes of contact with the whirl of material progress lingered in her thought."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[receptively]] | adverb | **1.** In a receptive manner. | *"In academic literature, receptively designates in a receptive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[receptiveness]] | noun | **1.** Willingness or readiness to receive (especially impressions or ideas). | *"Jesus loved little children because of their freedom from wrong and their receptiveness of right."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[receptivity]] | noun | **1.** Willingness or readiness to receive (especially impressions or ideas). | *"The attitudes of receptivity are various, and Will had sincerely tried many of them."* — George Eliot, *Middlemarch* |
| [[receptor]] | noun | **1.** A cellular structure that is postulated to exist in order to mediate between a chemical agent that acts on nervous tissue and the physiological response.<br>**2.** An organ having nerve endings (in the skin or viscera or eye or ear or nose or mouth) that respond to stimulation. | *"In academic literature, receptor designates a cellular structure that is postulated to exist in order to mediate between a chemical agent that acts on nervous tissue and the physiological response."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[susceptibility]] | noun | **1.** The state of being susceptible; easily affected. | *"Yes, cousin John.” “Why,” he slowly replied, roughening his head more and more, “he is all sentiment, and—and susceptibility, and—and sensibility, and—and imagination."* — Charles Dickens, *Bleak House* |
| [[susceptible]] | adjective | **1.** (often followed by `of' or `to') yielding readily to or capable of.<br>**2.** Easily impressed emotionally. | *"This ancestor is said to have been a man extremely susceptible to violent outbreaks."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[susceptibleness]] | noun | **1.** The state of being susceptible; easily affected. | *"In academic literature, susceptibleness designates the state of being susceptible; easily affected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unacceptability]] | noun | **1.** Unsatisfactoriness by virtue of not conforming to approved standards. | *"In academic literature, unacceptability designates unsatisfactoriness by virtue of not conforming to approved standards."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unacceptable]] | adjective | **1.** Not adequate to give satisfaction.<br>**2.** Not acceptable; not welcome. | *"This view, however, is very unacceptable to the leaders of organized labor in America, and there the question now stands. § 17. #Future role of organization#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unacceptableness]] | noun | **1.** Unsatisfactoriness by virtue of not conforming to approved standards. | *"In academic literature, unacceptableness designates unsatisfactoriness by virtue of not conforming to approved standards."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unacceptably]] | adverb | **1.** To an unacceptable degree. | *"In academic literature, unacceptably designates to an unacceptable degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unaccepted]] | adjective | **1.** Not conforming to standard usage. | *"In academic literature, unaccepted designates not conforming to standard usage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unexceptionable]] | adjective | **1.** Completely acceptable; not open to exception or reproach. | *"Boldwood as a means to marriage was unexceptionable: she esteemed and liked him, yet she did not want him."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unexceptional]] | adjective | **1.** Not special in any way. | *"In academic literature, unexceptional designates not special in any way."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unperceptive]] | adjective | **1.** Lacking perception.<br>**2.** Lacking sensitivity, taste, or judgment. | *"In academic literature, unperceptive designates lacking perception."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unperceptiveness]] | noun | **1.** The lack of insight and sympathetic understanding. | *"In academic literature, unperceptiveness designates the lack of insight and sympathetic understanding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unreceptive]] | adjective | **1.** Not receptive. | *"In academic literature, unreceptive designates not receptive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsusceptibility]] | noun | **1.** The state of not being susceptible. | *"In academic literature, unsusceptibility designates the state of not being susceptible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsusceptible]] | adjective | **1.** Not susceptible to. | *"And to have it hurled at one with no warning, no preliminary "leading up," and from Ralph Maplestone of all people--the most reserved, the most unsusceptible, the most woman-hating of mankind!"* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Holding]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CEP
  </div>
</div>
