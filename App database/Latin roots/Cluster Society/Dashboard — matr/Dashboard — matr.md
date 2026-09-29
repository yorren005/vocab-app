---
status: unread
type: root_dashboard
---
# Dashboard — matr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">matr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“mother”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Neighbors working together in a shared neighborhood to help one another.</span>
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

The root **matr** means mother. It refers to a female parent, maternal nurturing, and origin. In English, this root forms words such as *matriculate*, *matron*, and *matrimony*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: mother
> The root **matr** means mother. It refers to a female parent, maternal nurturing, and origin. In English, this root forms words such as *matriculate*, *matron*, and *matrimony*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Mother</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Neighbors working together in a shared neighborhood to help one another.</mark>
> - **Everyday Connection**: Think of familiar words like *matriculate* and *matron*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **matr** comes from a Latin word that means *"mother"*.
  - At its core, it describes mother.

- **The Big Picture Idea**:
  - Picture neighbors working together in a shared neighborhood to help one another.
  - Whenever you see **matr** in an English word, think of **community, society, and shared life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of mother.
  - **Mental & Social**: How people experience, organize, or communicate about mother.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Matriculate**: To record in an official register.
  - **Matron**: An older married woman, especially one with an established social position. 2. A female head nurse or warden.
  - **Matrimony**: The state or ceremony of being married.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">matr</mark>, think of <mark class="hl-def">community, society, and shared life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Base Noun:** *māter* $\to$ *maternal*, *maternally*, *maternity*.
- **Ruler / Dynasty Base (`-arch` < Greek):**
  - *matriarch* (female head of family), *matriarchy*, *matriarchal*.
- **Legal Institution Base (`-mōnium`):**
  - *matrimony* (marriage), *matrimonial*.
- **Womb & Register Base (`matrix`):**
  - *matrix* (foundational grid; mold).
  - *matriculate* (enroll in university), *matriculation*.
- **Honorable Woman Base (`mātrōna`):**
  - *matron* (mature dignified woman), *matronly*.
- **Latin Idiom:**
  - *alma mater* (nurturing university).

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

### 1. Biological Motherhood & Care
- *maternal* (relating to a mother, especially during pregnancy or shortly after childbirth).
- *maternity* (the period during pregnancy and shortly after childbirth; motherhood).
- *maternally* (in a motherly or maternal manner).

### 2. Family Governance & Lineage
- *matriarch* (a woman who is the head of a family or tribe).
- *matriarchy* (a system of society or government ruled by a woman or women).
- *matriarchal* (relating to or denoting a matriarchy).

### 3. Marriage & Civic Status
- *matrimony* (the state or ceremony of being married; wedlock).
- *matrimonial* (relating to marriage or married people).
- *matron* (a woman who is mature, dignified, and established, often with children).
- *matronly* (like or characteristic of a mature woman).

### 4. Academia & Mathematics
- *alma mater* (the school, college, or university that one once attended; a school anthem).
- *matriculate* (to record in an official register; enroll as a student at a college or university).
- *matriculation* (the formal process of entering a university with full student status).
- *matrix* (an environment or material in which something develops; a rectangular array of numbers).

---

## 🔀 4. Prefix & Combining Dynamics on matr

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `matr-` + `-ernal` | Adjectival kinship | Characteristic of motherly care, affection, and gestation | *maternal, maternity* |
| `matr-` + `-i-arch` | Greek compound ruler | Senior matriarch wielding authoritative domestic power | *matriarch, matriarchy* |
| `matr-` + `-i-mony` | Institutional suffix | The formal civic condition enabling legal motherhood | *matrimony, matrimonial* |
| `matrix` $\to$ `-ulate`| Enrolling diminutive | Inscribing one's name into the maternal university roll | *matriculate, matriculation* |
| `al-` + `māter` | Nourishing Latin epithet | The university that intellectually nurses young minds | *alma mater* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Linear Algebra & Quantum Mechanics:** Matrix multiplication, eigenvalues, Pauli matrices, transformation matrices.
- **Family Law & Canon Law:** Matrimonial nullity, holy matrimony, maternal custody rights.
- **Sociology & Cultural Anthropology:** Matrilineal descent systems (Hopi, Minangkabau), matriarchal family structures.
- **Higher Education Administration:** Matriculation ceremonies, matriculation exams, alumni relations.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[matriarch]] | noun | **1.** A female head of a family or tribe.<br>**2.** A feisty older woman with a big bosom (as drawn in cartoons). | *"In academic literature, matriarch designates a female head of a family or tribe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[matriarchal]] | adjective | **1.** Characteristic of a matriarchy. | *"In academic literature, matriarchal designates characteristic of a matriarchy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[matriarchate]] | noun | **1.** A form of social organization in which a female is the family head and title is traced through the female line. | *"In academic literature, matriarchate designates a form of social organization in which a female is the family head and title is traced through the female line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[matriarchic]] | adjective | **1.** (of societies or families) having a female as the family head or having descent traced through the female line. | *"In academic literature, matriarchic designates (of societies or families) having a female as the family head or having descent traced through the female line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[matriarchy]] | noun | **1.** A form of social organization in which a female is the family head and title is traced through the female line. | *"In academic literature, matriarchy designates a form of social organization in which a female is the family head and title is traced through the female line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[matric]] | noun | **1.** Admission to a group (especially a college or university). | *"They were canopied, altar-shaped, and plain; their carvings being defaced and broken; their brasses torn from the matrices, the rivet-holes remaining like martin-holes in a sandcliff."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[matricaria]] | noun | **1.** Chiefly old world strong-smelling weedy herbs; comprises plants sometimes included in other genera: e.g. tanacetum; tripleurospermum. | *"In academic literature, matricaria designates chiefly old world strong-smelling weedy herbs; comprises plants sometimes included in other genera: e.g. tanacetum; tripleurospermum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[matricentric]] | adjective | **1.** Centered upon the mother. | *"In academic literature, matricentric designates centered upon the mother."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[matricide]] | noun | **1.** A person who murders their mother.<br>**2.** The murder of your mother. | *"In academic literature, matricide designates a person who murders their mother."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[matriculate]] | noun | **1.** Someone who has been admitted to a college or university.<br>**2.** Enroll as a student. | *"I do not know that my name is matriculated, as the heralds call it, at all; but I have invented arms for myself, so you know I shall be chief of the name; and, by courtesy of Scotland, will likewise be entitled to supporters."* — Robert Burns, *The Letters of Robert Burns* |
| [[matriculation]] | noun | **1.** Admission to a group (especially a college or university). | *"In academic literature, matriculation designates admission to a group (especially a college or university)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[matrikin]] | noun | **1.** One related on the mother's side. | *"In academic literature, matrikin designates one related on the mother's side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[matrilineage]] | noun | **1.** Line of descent traced through the maternal side of the family. | *"In academic literature, matrilineage designates line of descent traced through the maternal side of the family."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[matrilineal]] | adjective | **1.** Based on or tracing descent through the female line. | *"In academic literature, matrilineal designates based on or tracing descent through the female line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[matrilineally]] | adverb | **1.** By descent through the female line. | *"In academic literature, matrilineally designates by descent through the female line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[matrilinear]] | adjective | **1.** Based on or tracing descent through the female line. | *"In academic literature, matrilinear designates based on or tracing descent through the female line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[matrimonial]] | adjective | **1.** Of or relating to the state of marriage. | *"Quale, with large shining knobs for temples and his hair all brushed to the back of his head, who came in the evening, and told Ada he was a philanthropist, also informed her that he called the matrimonial alliance of Mrs."* — Charles Dickens, *Bleak House* |
| [[matrimony]] | noun | **1.** The state of being a married couple voluntarily joined for life (or until divorce).<br>**2.** The ceremony or sacrament of marriage. | *"But it’s well I never made that evolution of matrimony."* — Charles Dickens, *Bleak House* |
| [[matrisib]] | noun | **1.** One related on the mother's side. | *"In academic literature, matrisib designates one related on the mother's side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[matrix]] | noun | **1.** (mathematics) a rectangular array of quantities or expressions set out by rows and columns; treated as a single element and manipulated according to rules.<br>**2.** (geology) amass of fine-grained rock in which fossils, crystals, or gems are embedded. | *"It is considered unlikely, although not impossible, that the invention of printing passed all at once from xylography to the perfect typography of the punch, matrix, and mold."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[matron]] | noun | **1.** A married woman (usually middle-aged with children) who is staid and dignified.<br>**2.** A wardress in a prison. | *"Please it this matron and this gentle maid To eat with us tonight; the charge and thanking Shall be for me; and, to requite you further, I will bestow some precepts of this virgin, Worthy the note."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[matronly]] | adjective | **1.** Befitting or characteristic of a fully mature woman. | *"Me and Tom was to be sure to remember it.” Charley dried her eyes and entered on her functions, going in her matronly little way about and about the room and folding up everything she could lay her hands upon."* — Charles Dickens, *Bleak House* |
| [[matronymic]] | noun | **1.** A name derived from the name of your mother or a maternal ancestor. | *"In academic literature, matronymic designates a name derived from the name of your mother or a maternal ancestor."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Society]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MATR
  </div>
</div>
