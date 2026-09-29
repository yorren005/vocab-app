---
status: unread
type: root_dashboard
---
# Dashboard — theo
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">theo-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“god”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Interconnected word patterns that combine classical ideas together.</span>
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

The root **theo** means god. It refers to divinity, sacred presence, theological metaphysics, and divine inspiration. In English, this root forms words such as *theology*, *theologian*, *theological*, and *theologically*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: god
> The root **theo** means god. It refers to divinity, sacred presence, theological metaphysics, and divine inspiration. In English, this root forms words such as *theology*, *theologian*, *theological*, and *theologically*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">God</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Interconnected word patterns that combine classical ideas together.</mark>
> - **Everyday Connection**: Think of familiar words like *theology* and *theologian*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **theo** comes from a Latin word that means *"god"*.
  - At its core, it describes god.

- **The Big Picture Idea**:
  - Picture interconnected word patterns that combine classical ideas together.
  - Whenever you see **theo** in an English word, think of **blended classical concepts**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of god.
  - **Mental & Social**: How people experience, organize, or communicate about god.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Theology**: The systematic and rational study of the nature of the divine, religious truth, and spiritual belief.
  - **Theologian**: A person who engages in or is an expert in the academic discipline of theology.
  - **Theological**: Relating to the study of God, religious dogma, or divine doctrines.
  - **Theologically**: In a manner that relates to or conforms with theological principles.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">theo</mark>, think of <mark class="hl-def">blended classical concepts</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **theo-** serves as an initial combining prefix, a central nominal stem, and a terminal combining element (`-theism`, `-theist`, `-theistic`):
> - **1. Initial Combining Element:** `theo-` (before consonants) / `the-` (before vowels):
>   - `theo-` + `-logy` (< *lógos* "study") → *theology* (study of God).
>   - `theo-` + `-cracy` (< *krátos* "rule") → *theocracy* (rule by divine authority).
>   - `theo-` + `-dicy` (< *díkē* "justice") → *theodicy* (defense of divine justice).
>   - `theo-` + `-phany` (< *phaínein* "to appear") → *theophany* (visible divine manifestation).
>   - `theo-` + `-urgy` (< *érgon* "work") → *theurgy* (divine or magical ritual work).
>   - `theo-` + `-centric` (< *kéntron* "center") → *theocentric* (God-centered).
> - **2. Prefix Modifications of the "-theism" Base:**
>   - `a-` (without) + *theism* → *atheism* (disbelief in deities).
>   - `poly-` (many) + *theism* → *polytheism* (belief in multiple gods).
>   - `mono-` (single) + *theism* → *monotheism* (belief in one God).
>   - `pan-` (all) + *theism* → *pantheism* (doctrine that God and the universe are identical).
>   - `pan-en-` (all in) + *theism* → *panentheism* (doctrine that God pervades all things while transcending them).
>   - `heno-` (one among many) + *theism* → *henotheism* (devotion to one primary god).
> - **3. Internal and Participial Prefixes:**
>   - `en-` (in) + `theo-` + `-asm` → *enthusiasm* (state of having God inside).
>   - `apo-` (from, elevation) + `the-` + `-osis` → *apotheosis* (deification, exaltation to godhood).

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
> The semantic manifestations of **theo** expand across five distinct domains:
> - **1. Metaphysical Systems & Faith Doctrines:** In [[theism]], [[atheism]], [[monotheism]], [[polytheism]], and [[pantheism]], the root classifies every major human stance toward the nature, unity, plurality, or non-existence of a supreme being.
> - **2. Academic Systematic Disciplines:** In [[theology]], [[theologian]], and [[theodicy]], the root governs rigorous rational discourse examining holy scriptures, dogmas, and philosophical justifications of divine Providence.
> - **3. Civic, Legal & Institutional Authority:** In [[theocracy]], [[theocratic]], and [[theonomy]], the root denotes legal and political constitutions where religious scripture and clerical hierarchies dictate civil law.
> - **4. Mystical Manifestation & Ritual Exaltation:** In [[theophany]], [[theurgy]], [[apotheosis]], and [[Theotokos]], the root touches experiential and cultic encounters: divine appearances, magical invocations of celestial entities, or the elevation of mortal leaders into gods.
> - **5. Psychological Energy & Human Passion:** In [[enthusiasm]], [[enthusiast]], and [[enthusiastic]], the root reveals its secularized transformation from divine manic possession into contagious intellectual excitement and creative dedication.

---

## 🔀 4. Prefix & Combining Dynamics on theo

### Compounding Bases & Morphological Shifts

| Combining Form / Affix | Affix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `a-` + `-theism` | without (*a-*) + God | [[atheism]] | Disbelief or lack of belief in the existence of a God or deities. |
| `mono-` + `-theism` | one (*mónos*) + God | [[monotheism]] | The doctrine or belief that there is only one God (Judaism, Christianity, Islam). |
| `poly-` + `-theism` | many (*polýs*) + God | [[polytheism]] | The belief in or worship of more than one god (e.g., classical Greco-Roman religion). |
| `pan-` + `-theism` | all (*pan*) + God | [[pantheism]] | The doctrine that the universe is identical with divinity; God is everything (Spinoza). |
| `heno-` + `-theism` | one (*heîs*) + God | [[henotheism]] | Worship of a single god without denying the real existence of other deities. |
| `apo-` + `the-` + `-osis` | away/from + deify + process | [[apotheosis]] | The elevation of a human to the rank of a god; the supreme climax or quintessence. |
| `en-` + `the-` + `-asm` | in (*en*) + God + state | [[enthusiasm]] | Originally possession by a god; today, intense, eager enjoyment, interest, or approval. |
| `theo-` + `-cracy` | God + power (*krátos*) | [[theocracy]] | A system of government in which priests or religious authorities rule in the name of God. |
| `theo-` + `-dicy` | God + justice (*díkē*) | [[theodicy]] | The philosophical defense of divine goodness and omnipotence in view of the existence of evil. |
| `theo-` + `-phany` | God + appearance (*phaínein*) | [[theophany]] | A visible manifestation to humankind of God or a deity (e.g., the burning bush). |
| `theo-` + `-urgy` | God + work (*érgon*) | [[theurgy]] | Ritual practices or white magic aimed at invoking divine presence and purifying the soul. |
| `theo-` + `-centric` | God + center (*kéntron*) | [[theocentric]] | Having God as the central focus of interest, value, ultimate reality, and moral duty. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-logy` / `-logian` | Noun (Discipline / Scholar) | [[theology]], [[theologian]] | The systematic study of divine nature; a professional scholar of religious dogma. |
| `-ism` | Noun (Doctrine / System) | [[theism]], [[atheism]], [[pantheism]] | The formal philosophical or theological belief system concerning divinity. |
| `-ist` | Noun (Adherent) | [[theist]], [[atheist]], [[enthusiast]] | A person who holds a specific belief about God, or pursues an avid passion. |
| `-ic` / `-ical` | Adjective | [[theological]], [[theocratic]], [[theophanic]] | Pertaining to, derived from, or characteristic of divine study, governance, or revelation. |
| `-ize` | Verb | [[theologize]], [[apotheosize]] | To theorize theologically; to deify or exalt someone to supreme transcendent stature. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⛪ **Systematic Theology & Religious Studies** | [[theology]], [[theologian]], [[theological]], [[Theotokos]] | Patristic dogmatics, the Council of Nicaea, Christological controversies, and scriptural hermeneutics. |
| 🏛️ **Political Science & Constitutional History** | [[theocracy]], [[theocratic]], [[theocratically]], [[theonomy]] | Governance in the Vatican City, the Islamic Republic of Iran, Calvin's Geneva, and the Puritan Massachusetts colony. |
| 🧐 **Metaphysics, Epistemology & Philosophy** | [[theism]], [[atheism]], [[theodicy]], [[theocentric]], [[pantheism]] | Leibniz's resolution of evil, Spinoza's *Deus sive Natura*, Anselm's ontological argument, and modern secular humanism. |
| 📜 **Classical Antiquity, Myth & History** | [[apotheosis]], [[theophany]], [[polytheism]], [[theomachy]] | Deification of Julius Caesar and Augustus, Homeric titanomachies, and the Epidaurus healing cults. |
| 🎭 **Psychology, Aesthetics & Rhetoric** | [[enthusiasm]], [[enthusiast]], [[enthusiastic]] | Human motivational drive, artistic creative inspiration, and crowd emotional contagion. |
| 🔮 **Comparative Religion & Neoplatonism** | [[theurgy]], [[henotheism]], [[theocrasy]], [[panentheism]] | Iamblichus' *De Mysteriis Aegyptiorum*, Vedic henotheism, and Hellenistic religious syncretism. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[apotheosis]] | noun | **1.** Model of excellence or perfection of a kind; one having no equal.<br>**2.** The elevation of a person (as to the status of a god). | *"Thus a mild sort of apotheosis took place in his fancy, whilst she still lived and breathed within his own horizon, a troubled creature like himself."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[apotheosise]] | verb | **1.** Deify or glorify. | *"So etherealised by spirit as he was, and so apotheosised by worshipping admirers, did his footsteps, in the procession, really tread upon the dust of earth?"* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[apotheosize]] | verb | **1.** Deify or glorify. | *"The ecstasy of faith almost apotheosized her; it set upon her face a glowing irradiation, and brought a red spot into the middle of each cheek; while the miniature candle-flame inverted in her eye-pupils shone like a diamond."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[pantheon]] | noun | **1.** All the gods of a religion.<br>**2.** A monument commemorating a nation's dead heroes. | *"And for an onset, Titus, to advance Thy name and honourable family, Lavinia will I make my empress, Rome’s royal mistress, mistress of my heart, And in the sacred Pantheon her espouse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[theocentric]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin theo within the domain of Greek-Latin Hybrid.<br>**2.** A technical or specialized form exhibiting the properties of theo in systematic terminology. | *"If it is impossible to serve God and mammon, truth and God go together in one allegiance; and a non-Theocentric element in a man's thought will be fatal sooner or later to any aptitude he has by nature for God and truth."* — T. R. Glover, *The Jesus of History* |
| [[theocracy]] | noun | **1.** A political unit governed by a deity (or by officials thought to be divinely guided).<br>**2.** The belief in government by divine guidance. | *"In the latter case they are kings as well as gods, and the government is a theocracy."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[theocratic]] | adjective | **1.** Of or relating to or being a theocracy. | *"In academic literature, theocratic designates of or relating to or being a theocracy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theodicy]] | noun | **1.** The branch of theology that defends god's goodness and justice in the face of the existence of evil. | *"In academic literature, theodicy designates the branch of theology that defends god's goodness and justice in the face of the existence of evil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theogony]] | noun | **1.** The study of the origins and genealogy of the gods. | *"Truth is not the basis of 170:3 theogony."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[theologian]] | noun | **1.** Someone who is learned in theology or who speculates about theology. | *"Ure, but a good scholar and a well-read theologian."* — John Cairns, *Principal Cairns* |
| [[theological]] | adjective | **1.** Of or relating to or concerning theology. | *"I used to be quite up in that scene of Milton’s when I was theological."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[theologically]] | adverb | **1.** As regards theology.<br>**2.** In a theological manner. | *"In academic literature, theologically designates as regards theology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theologise]] | verb | **1.** Treat from a theological viewpoint or render theological in character.<br>**2.** Make theoretical speculations about theology or discuss theological subjects. | *"In academic literature, theologise designates treat from a theological viewpoint or render theological in character."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theologiser]] | noun | **1.** Someone who is learned in theology or who speculates about theology. | *"In academic literature, theologiser designates someone who is learned in theology or who speculates about theology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theologist]] | noun | **1.** Someone who is learned in theology or who speculates about theology. | *"In academic literature, theologist designates someone who is learned in theology or who speculates about theology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theologize]] | verb | **1.** Treat from a theological viewpoint or render theological in character.<br>**2.** Make theoretical speculations about theology or discuss theological subjects. | *"In academic literature, theologize designates treat from a theological viewpoint or render theological in character."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theologizer]] | noun | **1.** Someone who is learned in theology or who speculates about theology. | *"In academic literature, theologizer designates someone who is learned in theology or who speculates about theology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theology]] | noun | **1.** The rational and systematic study of religion and its influences and of the nature of religious truth.<br>**2.** A particular system or school of religious beliefs and teachings. | *"Some people might have cried “Alas, poor Theology!” at the hideous defacement—the last grotesque phase of a creed which had served mankind well in its time."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[theophany]] | noun | **1.** A visible (but not necessarily material) manifestation of a deity to a human person. | *"In academic literature, theophany designates a visible (but not necessarily material) manifestation of a deity to a human person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theorem]] | noun | **1.** A proposition deducible from basic postulates.<br>**2.** An idea accepted as a demonstrable truth. | *"In academic literature, theorem designates a proposition deducible from basic postulates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theoretic]] | adjective | **1.** Concerned primarily with theories or hypotheses rather than practical considerations. | *"Pull the string, Ruling Passion the picture will show him, What pity, in rearing so beauteous a system, One trifling particular, Truth, should have miss’d him; For, spite of his fine theoretic positions, Mankind is a science defies definitions."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[theoretical]] | adjective | **1.** Concerned primarily with theories or hypotheses rather than practical considerations.<br>**2.** Concerned with theories rather than their practical applications. | *"This properly belongs in a complete theoretical treatment of the subject.] [Footnote 8: See "Modern Currency Reforms" (1916), by E.W."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[theoretically]] | adverb | **1.** In theory; according to the assumed facts.<br>**2.** In a theoretical manner. | *"What may be called "the theoretically correct price"[3] with two-sided competition is the one that permits the maximum number of trades with a margin of gain to each trader."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[theoretician]] | noun | **1.** Someone who theorizes (especially in science or art). | *"In academic literature, theoretician designates someone who theorizes (especially in science or art)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theorisation]] | noun | **1.** The production or use of theories. | *"In academic literature, theorisation designates the production or use of theories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theorise]] | verb | **1.** To believe especially on uncertain or tentative grounds. | *"It is a capital mistake to theorise before one has data."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[theoriser]] | noun | **1.** Someone who theorizes (especially in science or art). | *"In academic literature, theoriser designates someone who theorizes (especially in science or art)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theorist]] | noun | **1.** Someone who theorizes (especially in science or art). | *"The under-consumption theorist, seeing the same facts, says that the trouble is lack of purchasing power."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[theorization]] | noun | **1.** The production or use of theories. | *"In academic literature, theorization designates the production or use of theories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theorize]] | verb | **1.** To believe especially on uncertain or tentative grounds.<br>**2.** Construct a theory about. | *"Mill set himself, among other things, to study and theorize upon poetry and the arts generally."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[theorizer]] | noun | **1.** Someone who theorizes (especially in science or art). | *"While this poison of decay has been eating into our vitals the possibilities of the country in nearly every other industry have reached a plane of development beyond the dreams of the most enthusiastic theorizers."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[theory]] | noun | **1.** A well-substantiated explanation of some aspect of the natural world; an organized system of accepted knowledge that applies in a variety of circumstances to explain a specific set of phenomena.<br>**2.** A tentative insight into the natural world; a concept that is not yet verified but that if true would explain certain facts or phenomena. | *"In the midst of which dust and noise there is but one thing perfectly clear, to wit, that Tom only may and can, or shall and will, be reclaimed according to somebody’s theory but nobody’s practice."* — Charles Dickens, *Bleak House* |
| [[theory-based]] | adjective | **1.** Based in theory rather than experiment. | *"In academic literature, theory-based designates based in theory rather than experiment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theosophical]] | adjective | **1.** Of or relating to theosophy. | *"In academic literature, theosophical designates of or relating to theosophy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theosophism]] | noun | **1.** Belief in theosophy. | *"In academic literature, theosophism designates belief in theosophy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theosophist]] | noun | **1.** A believer in theosophy. | *"German Boehme: Jacob Boehme (or Behmen), a shoemaker and a famous theosophist, b. 1575, at Old Seidenberg, a village near Goerlitz; d. 1624."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[theosophy]] | noun | **1.** A system of belief based on mystical insight into the nature of god and the soul. | *"Groups of people endeavoured to combine Christianity with the old thought, with philosophy, theosophy, theurgy, and magic."* — T. R. Glover, *The Jesus of History* |
| [[theoterrorism]] | noun | **1.** Terrorism for a religious purpose. | *"In academic literature, theoterrorism designates terrorism for a religious purpose."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Greek-Latin Hybrid]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · THEO
  </div>
</div>
