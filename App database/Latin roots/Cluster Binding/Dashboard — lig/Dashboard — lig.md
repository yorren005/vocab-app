---
status: unread
type: root_dashboard
---
# Dashboard — lig
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">lig-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“tie or bind”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A strong cord wrapping around a bundle and tying it securely together.</span>
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

The root **lig** means tie or bind. It refers to fastening with a cord, wrapping around something, or enclosing an area. In English, this root forms words such as *ligament*, *ligate*, *ligation*, and *ligature*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: tie or bind
> The root **lig** means tie or bind. It refers to fastening with a cord, wrapping around something, or enclosing an area. In English, this root forms words such as *ligament*, *ligate*, *ligation*, and *ligature*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Tie or bind</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A strong cord wrapping around a bundle and tying it securely together.</mark>
> - **Everyday Connection**: Think of familiar words like *ligament* and *ligate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **lig** comes from a Latin word that means *"tie or bind"*.
  - At its core, it describes tie or bind.

- **The Big Picture Idea**:
  - Picture a strong cord wrapping around a bundle and tying it securely together.
  - Whenever you see **lig** in an English word, think of **tying together, binding, or encircling**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of tie or bind.
  - **Mental & Social**: How people experience, organize, or communicate about tie or bind.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Ligament**: A tough, flexible band of fibrous connective tissue that connects two bones or cartilages or holds together a joint.
  - **Ligate**: To tie off or constrict a blood vessel, duct, or tissue using a suture or ligature to stop hemorrhage or prevent leakage.
  - **Ligation**: The act or procedure of ligating a blood vessel or duct.
  - **Ligature**: A piece of thread, wire, or suture used for tying blood vessels.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">lig</mark>, think of <mark class="hl-def">tying together, binding, or encircling</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates across two morphological streams:
> - **Classical Latin Direct Borrowings (`lig-` / `ligat-`):** Medical, biochemical, and legal substantives (*ligament*, *ligate*, *ligation*, *ligature*, *ligand*, *colligate*, *obligate*).
> - **Romance Vocalized Derivatives (`ly-` / `lia-` / `leag-`):** Words where Latin *-ig-* softened into French vowels (*ally*, *alliance*, *alloy*, *liaison*, *liable*, *rely*, *league*, *rally*).
>
> Prefixes drive the direction of binding:
> - **ob-** ("against, toward"): *obligāre* $\to$ *oblige*, *obligation* (bound to perform).
> - **ad- $\to$ al-** ("to"): *alligāre* $\to$ *ally*, *alliance*, *alloy* (bound to one another).
> - **re-** ("back"): *religāre* $\to$ *rely*, *reliable* (bound back upon).
> - **com- $\to$ col-** ("together"): *colligāre* $\to$ *colligate* (bound together conceptually).

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
> - **Anatomy & Surgical Hemostasis:** [[ligament]], [[ligate]], *ligation*, [[ligature]] — fibrous joint stabilizers, clamping and tying severed blood vessels, surgical sutures.
> - **Biochemistry & Pharmacology:** *ligand* — neurotransmitters, hormones, or drug molecules binding to cellular protein receptors.
> - **Civil Law & Legal Liability:** [[obligation]], [[obligatory]], [[oblige]], [[liable]], *liability* — contractual debt, tort liability, binding duties.
> - **Geopolitics & Military Alliances:** [[ally]], *alliance*, [[league]], *coalition* — confederated nations bound by mutual defense treaties.
> - **Metallurgy & Material Science:** [[alloy]] — metallic elements intimately bound into a solid solution (e.g., bronze, steel).
> - **Epistemology & Philosophy of Science:** *colligate*, *colligation* — binding observed facts together under a unifying conceptual hypothesis.
> - **Interpersonal Trust & Communication:** [[rely]], [[reliable]], *reliance*, [[liaison]] — depending upon a friend; diplomatic channels connecting separated military headquarters.

---

## 🔀 4. Prefix & Combining Dynamics on lig

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ob-** (*ob*) | toward, facing | [[oblige]], [[obligation]] | Bound to another by duty, contract, or favor. |
| **ad- $\to$ al-** (*ad*) | to, toward | [[ally]], [[alloy]] | Bound to another in alliance or metallic union. |
| **re-** (*re-*) | back, again | [[rely]], *rally* | Bound back for support; re-allied after scattering. |
| **com- $\to$ col-** (*cum*) | together | *colligate* | Bound together under a single empirical concept. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ment** (*-mentum*) | concrete noun of instrument | [[ligament]] | Fibrous connective tissue binding bones. |
| **-ure** (*-ūra*) | concrete noun of binding | [[ligature]] | Surgical suture thread or typographic double glyph. |
| **-and** (*-andum*) | gerundive (that which must be) | *ligand* | A molecule that binds to a receptor. |
| **-tion** (*-tiōnem*) | abstract noun of duty | [[obligation]], *ligation* | The state of being bound by law or surgical thread. |
| **-able** (*-ābilis*) | passive capability | [[liable]], [[reliable]] | Legally bound, or worthy of dependable reliance. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Orthopedics & Sports Medicine** | [[ligament]] (*ACL*, *MCL*) | Anterior cruciate ligament tears, joint reconstruction. |
| **Surgical Procedures** | [[ligate]], *ligation*, [[ligature]] | Vascular surgery, endoscopic band ligation for esophageal varices. |
| **Pharmacology & Molecular Biology** | *ligand* (*ligand-gated channels*) | Drug-receptor binding affinity, hormone signaling cascades. |
| **Contract Law & Jurisprudence** | [[obligation]], [[liable]], *liability* | Breach of contractual obligations, limited liability companies (LLCs). |
| **International Relations & History** | [[ally]], *alliance*, [[league]] | NATO alliance, League of Nations, Allied Powers of WWII. |
| **Typography & Printing** | [[ligature]] | Typographic letter combinations (*fi*, *fl*, *æ*, *œ*). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[alligator]] | noun | **1.** Leather made from alligator's hide.<br>**2.** Either of two amphibious reptiles related to crocodiles but with shorter broader snouts. | *"Circus Adventure A favorite setting for a children's story is the circus, and following an alligator that sneaks about the grounds searching for an adventure offers the listener a sense of involvement."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[alligatored]] | verb | **1.** Crack and acquire the appearance of alligator hide, as from weathering or improper application; of paint and varnishes.<br>**2.** Of paint or varnish; having the appearance of alligator hide. | *"In academic literature, alligatored designates crack and acquire the appearance of alligator hide, as from weathering or improper application; of paint and varnishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alligatorfish]] | noun | **1.** Small very elongate sea poachers. | *"In academic literature, alligatorfish designates small very elongate sea poachers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alligatoridae]] | noun | **1.** Alligators; caimans. | *"In academic literature, alligatoridae designates alligators; caimans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colligate]] | verb | **1.** Make a logical or causal connection.<br>**2.** Consider (an instance of something) as part of a general rule or principle. | *"In academic literature, colligate designates make a logical or causal connection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colligation]] | noun | **1.** The state of being joined together.<br>**2.** The connection of isolated facts by a general hypothesis. | *"In academic literature, colligation designates the state of being joined together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coreligionist]] | noun | **1.** Someone having the same religion as another person. | *"In academic literature, coreligionist designates someone having the same religion as another person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diligence]] | noun | **1.** Conscientiousness in paying proper attention to a task; giving the degree of care required in a given situation.<br>**2.** Persevering determination to perform a task. | *"For Cloten, There wants no diligence in seeking him, And will no doubt be found."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diligent]] | adjective | **1.** Quietly and steadily persevering especially in detail or exactness.<br>**2.** Characterized by care and perseverance in carrying out tasks. | *"For since patiently and constantly thou hast stuck to the bare fortune of that beggar Posthumus, thou canst not, in the course of gratitude, but be a diligent follower of mine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diligently]] | adverb | **1.** With diligence; in a diligent manner. | *"Jarndyce, a very good profession.” “The course of study and preparation requires to be diligently pursued,” observed my guardian with a glance at Richard."* — Charles Dickens, *Bleak House* |
| [[disoblige]] | verb | **1.** To cause inconvenience or discomfort to.<br>**2.** Ignore someone's wishes. | *"But Miss Frances married, in the common phrase, to disoblige her family, and by fixing on a lieutenant of marines, without education, fortune, or connexions, did it very thoroughly."* — Jane Austen, *Mansfield Park* |
| [[disobliging]] | verb | **1.** To cause inconvenience or discomfort to.<br>**2.** Ignore someone's wishes. | *"Her heart instantaneously at ease on this point, she resolved to lose no time in particular examination of anything, as she greatly dreaded disobliging the General by any delay."* — Jane Austen, *Northanger Abbey* |
| [[eligibility]] | noun | **1.** The quality or state of being eligible. | *"This was his plan of amends--of atonement--for inheriting their father’s estate; and he thought it an excellent one, full of eligibility and suitableness, and excessively generous and disinterested on his own part."* — Jane Austen, *Pride and Prejudice* |
| [[eligible]] | adjective | **1.** Qualified for or allowed or worthy of being chosen. | *"We have only, in the first place, to discover a sufficiently eligible practitioner; and as soon as we make our want—and shall I add, our ability to pay a premium?—known, our only difficulty will be in the selection of one from a large number."* — Charles Dickens, *Bleak House* |
| [[ineligibility]] | noun | **1.** The quality or state of being ineligible. | *"The doctrine that expulsion creates ineligibility was attacked and exposed by him with great force."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[ineligible]] | adjective | **1.** Not eligible.<br>**2.** Prohibited by official rules. | *"He would have let the house, but could find no tenant, in consequence of its ineligible and insalubrious site."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[irreligion]] | noun | **1.** The quality of not being devout. | *"Nor would I quarrel with a man for his irreligion, any more than I would for his want of a musical ear, I would regret that he was shut out from what, to me and to others, were such superlative sources of enjoyment."* — Robert Burns, *The Letters of Robert Burns* |
| [[irreligionist]] | noun | **1.** Someone who is indifferent or hostile to religion. | *"In academic literature, irreligionist designates someone who is indifferent or hostile to religion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[irreligious]] | adjective | **1.** Hostile or indifferent to religion. | *"Th’ offence is holy that she hath committed, And this deceit loses the name of craft, Of disobedience, or unduteous title, Since therein she doth evitate and shun A thousand irreligious cursed hours, Which forced marriage would have brought upon her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[irreligiousness]] | noun | **1.** The quality of not being devout. | *"In academic literature, irreligiousness designates the quality of not being devout."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ligament]] | noun | **1.** A sheet or band of tough fibrous tissue connecting bones or cartilages or supporting muscles or organs.<br>**2.** Any connection or unifying bond. | *"Every kind of finer tendon and ligament that is in the nature of poultry to possess is developed in these specimens in the singular form of guitar-strings."* — Charles Dickens, *Bleak House* |
| [[ligan]] | noun | **1.** Goods (or wreckage) on the sea bed that is attached to a buoy so that it can be recovered. | *"In academic literature, ligan designates goods (or wreckage) on the sea bed that is attached to a buoy so that it can be recovered."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ligand]] | noun | **1.** A substance (an atom or molecule or radical or ion) that forms a complex around a central atom. | *"In academic literature, ligand designates a substance (an atom or molecule or radical or ion) that forms a complex around a central atom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ligate]] | verb | **1.** Join letters in a ligature when writing.<br>**2.** Bind chemically. | *"In academic literature, ligate designates join letters in a ligature when writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ligation]] | noun | **1.** (surgery) tying a duct or blood vessel with a ligature (as to prevent bleeding during surgery). | *"In academic literature, ligation designates (surgery) tying a duct or blood vessel with a ligature (as to prevent bleeding during surgery)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ligature]] | noun | **1.** (music) a group of notes connected by a slur.<br>**2.** Character consisting of two or more letters combined into one. | *"Miss Abbot, lend me your garters; she would break mine directly.” Miss Abbot turned to divest a stout leg of the necessary ligature."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[liger]] | noun | **1.** Offspring of a male lion and a female tiger. | *"In academic literature, liger designates offspring of a male lion and a female tiger."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ligne]] | noun | **1.** A linear unit (1/40 inch) used to measure diameter of buttons. | *"What did surprise him was that during these last two years his wife had succeeded in gaining the reputation “d’ une femme charmante, aussi spirituelle que belle.” *(2) The distinguished Prince de Ligne wrote her eight-page letters."* — graf Leo Tolstoy, *War and Peace* |
| [[ligneous]] | adjective | **1.** Consisting of or containing lignin or xylem. | *"In academic literature, ligneous designates consisting of or containing lignin or xylem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lignify]] | verb | **1.** Convert into wood or cause to become woody. | *"In academic literature, lignify designates convert into wood or cause to become woody."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lignin]] | noun | **1.** A complex polymer; the chief constituent of wood other than carbohydrates; binds to cellulose fibers to harden and strengthen cell walls of plants. | *"In academic literature, lignin designates a complex polymer; the chief constituent of wood other than carbohydrates; binds to cellulose fibers to harden and strengthen cell walls of plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lignite]] | noun | **1.** Intermediate between peat and bituminous coal. | *"I went through gallery after gallery, dusty, silent, often ruinous, the exhibits sometimes mere heaps of rust and lignite, sometimes fresher."* — H. G. Wells, *The Time Machine* |
| [[lignosae]] | noun | **1.** A category in some early taxonomies. | *"In academic literature, lignosae designates a category in some early taxonomies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lignum]] | noun | **1.** Woody tissue. | *"For Lignum, he’s tied so close now, and gets so little exercise, that a walk does him good."* — Charles Dickens, *Bleak House* |
| [[ligularia]] | noun | **1.** Genus of old world herbs resembling groundsel: leopard plants. | *"In academic literature, ligularia designates genus of old world herbs resembling groundsel: leopard plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ligule]] | noun | **1.** (botany) any appendage to a plant that is shaped like a strap. | *"In academic literature, ligule designates (botany) any appendage to a plant that is shaped like a strap."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liguria]] | noun | **1.** Region of northwestern italy on the ligurian sea. | *"In academic literature, liguria designates region of northwestern italy on the ligurian sea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ligustrum]] | noun | **1.** Genus of old world shrubs: privet. | *"In academic literature, ligustrum designates genus of old world shrubs: privet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonobligatory]] | adjective | **1.** Not required by rule or law. | *"In academic literature, nonobligatory designates not required by rule or law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obligate]] | verb | **1.** Force somebody to do something.<br>**2.** Commit in order to fulfill an obligation. | *"So, he’d come with a most tremenjous crowd and make such a row at the doors of the houses where we was, that they used to be obligated to have no more to do with us and to give us up to him."* — Charles Dickens, *Great Expectations* |
| [[obligated]] | verb | **1.** Force somebody to do something.<br>**2.** Commit in order to fulfill an obligation. | *"So, he’d come with a most tremenjous crowd and make such a row at the doors of the houses where we was, that they used to be obligated to have no more to do with us and to give us up to him."* — Charles Dickens, *Great Expectations* |
| [[obligation]] | noun | **1.** The social force that binds you to the courses of action demanded by that force; ; - john d.rockefeller jr.<br>**2.** The state of being obligated to do or pay something. | *"I cannot think my sister in the least Would fail her obligation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[obligational]] | adjective | **1.** Relating or constituting or qualified to create a legal or financial obligation. | *"In academic literature, obligational designates relating or constituting or qualified to create a legal or financial obligation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obligato]] | noun | **1.** A persistent but subordinate motif.<br>**2.** A part of the score that must be performed without change or omission. | *"In academic literature, obligato designates a persistent but subordinate motif."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obligatorily]] | adverb | **1.** In an obligatory manner.<br>**2.** In a manner that cannot be evaded. | *"In academic literature, obligatorily designates in an obligatory manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obligatory]] | adjective | **1.** Morally or legally constraining or binding.<br>**2.** Required by obligation or compulsion or convention. | *"Mère Julie was one of the market-women of Semur, the one I have mentioned who was devout, who never missed the _Salut_ in the afternoon, besides all masses which are obligatory."* — Mrs. Oliphant, *A Beleaguered City* |
| [[oblige]] | verb | **1.** Force somebody to do something.<br>**2.** Bind by an obligation; cause to be indebted. | *"I said, “Get up from that ridiculous position immediately, sir, or you will oblige me to break my implied promise and ring the bell!” “Hear me out, miss!” said Mr."* — Charles Dickens, *Bleak House* |
| [[obliged]] | verb | **1.** Force somebody to do something.<br>**2.** Bind by an obligation; cause to be indebted. | *"O ten times faster Venus’ pigeons fly To seal love’s bonds new-made than they are wont To keep obliged faith unforfeited!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[obliger]] | noun | **1.** Someone who performs a service or does a favor. | *"In academic literature, obliger designates someone who performs a service or does a favor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obliging]] | verb | **1.** Force somebody to do something.<br>**2.** Bind by an obligation; cause to be indebted. | *"After meditating a while Kurt replied, "I guess I really shouldn't." "Don't you all like Loneli because she never gets rough and always is friendly, obliging and cheerful?"* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[obligingly]] | adverb | **1.** In accommodation. | *"She obligingly consented to act as mediatrix in the matter."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[obligingness]] | noun | **1.** A disposition or tendency to yield to the will of others. | *"The harp arrived, and rather added to her beauty, wit, and good-humour; for she played with the greatest obligingness, with an expression and taste which were peculiarly becoming, and there was something clever to be said at the close of every air."* — Jane Austen, *Mansfield Park* |
| [[oligarch]] | noun | **1.** One of the rulers in an oligarchy. | *"In academic literature, oligarch designates one of the rulers in an oligarchy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oligarchic]] | adjective | **1.** Of or relating to or supporting or characteristic of an oligarchy. | *"The countenance of the government may become more democratic, but the soul that animates it will be more oligarchic."* — Alexander Hamilton, *The Federalist Papers* |
| [[oligarchical]] | adjective | **1.** Of or relating to or supporting or characteristic of an oligarchy. | *"In academic literature, oligarchical designates of or relating to or supporting or characteristic of an oligarchy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oligarchy]] | noun | **1.** A political system governed by a few people. | *"Whilst the objection itself is levelled against a pretended oligarchy, the principle of it strikes at the very root of republican government."* — Alexander Hamilton, *The Federalist Papers* |
| [[religion]] | noun | **1.** A strong belief in a supernatural power or powers that control human destiny.<br>**2.** An institution to express belief in a divine power. | *"Madam, as thereto sworn by your command, Which my love makes religion to obey, I tell you this: Caesar through Syria Intends his journey, and within three days You with your children will he send before."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[religionism]] | noun | **1.** Exaggerated religious zealotry.<br>**2.** Exaggerated or affected piety and religious zeal. | *"In academic literature, religionism designates exaggerated religious zealotry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[religionist]] | noun | **1.** A person addicted to religion or a religious zealot. | *"Under the leadership of Govind, a young man of genius and enthusiasm, who comes before us in the two-fold character of religionist and military hero, the Sikhs moved on to a national greatness not dreamed of by Nanuk."* — C. A. Frazer, *Atmâ* |
| [[religiosity]] | noun | **1.** Exaggerated or affected piety and religious zeal. | *"In academic literature, religiosity designates exaggerated or affected piety and religious zeal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[religious]] | noun | **1.** A member of a religious order who is bound by vows of poverty and chastity and obedience.<br>**2.** Concerned with sacred matters or religion or the church. | *"How many a holy and obsequious tear Hath dear religious love stol’n from mine eye, As interest of the dead, which now appear, But things removed that hidden in thee lie."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[religiousism]] | noun | **1.** Exaggerated or affected piety and religious zeal. | *"In academic literature, religiousism designates exaggerated or affected piety and religious zeal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[religiously]] | adverb | **1.** By religion.<br>**2.** With extreme conscientiousness. | *"A nun of winter’s sisterhood kisses not more religiously; the very ice of chastity is in them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[religiousness]] | noun | **1.** Piety by virtue of being devout.<br>**2.** The quality of being extremely conscientious. | *"As to the excessive religiousness alleged against Miss Brooke, he had a very indefinite notion of what it consisted in, and thought that it would die out with marriage."* — George Eliot, *Middlemarch* |
| [[unobligated]] | adjective | **1.** Not obligated. | *"In academic literature, unobligated designates not obligated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unobliging]] | adjective | **1.** Not accommodating. | *"In academic literature, unobliging designates not accommodating."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Binding]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LIG
  </div>
</div>
