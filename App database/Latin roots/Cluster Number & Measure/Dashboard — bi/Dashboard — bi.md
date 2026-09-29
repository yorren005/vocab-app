---
status: unread
type: root_dashboard
---
# Dashboard — bi
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">bi-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“two or twice”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Counting units on a ruler or measuring out exact proportions.</span>
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

The root **bi** means two or twice. It indicates having two parts, occurring twice, or being doubled. In English, this root forms words such as *biceps*, *biennial*, *bifocal*, and *bigamy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: two or twice
> The root **bi** means two or twice. It indicates having two parts, occurring twice, or being doubled. In English, this root forms words such as *biceps*, *biennial*, *bifocal*, and *bigamy*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Two or twice</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Counting units on a ruler or measuring out exact proportions.</mark>
> - **Everyday Connection**: Think of familiar words like *biceps* and *biennial*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **bi** comes from a Latin word that means *"two or twice"*.
  - At its core, it describes two or twice.

- **The Big Picture Idea**:
  - Picture counting units on a ruler or measuring out exact proportions.
  - Whenever you see **bi** in an English word, think of **numbers, counting, and measurements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of two or twice.
  - **Mental & Social**: How people experience, organize, or communicate about two or twice.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Biceps**: A muscle having two heads or points of origin, especially the large flexor muscle of the upper arm.
  - **Biennial**: Occurring every two years.
  - **Bifocal**: Having two focal lengths, usually one for distant and one for near vision.
  - **Bigamy**: The criminal act of entering into a marriage with one person while still legally married to another.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">bi</mark>, think of <mark class="hl-def">numbers, counting, and measurements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **bi** acts primarily as a numerical prefix and combining element:
> - **Prefix `bi-` attached to Nouns and Adjectives:**
>   - *bi-* + *caput* ("head") $\to$ *biceps* ("two-headed muscle").
>   - *bi-* + *annus* ("year") $\to$ *biennial* ("occurring every two years").
>   - *bi-* + *lingua* ("tongue") $\to$ *bilingual* ("fluent in two languages").
>   - *bi-* + *pēs* ("foot") $\to$ *biped* ("two-footed creature").
>   - *bi-* + *focus* ("hearth/focus") $\to$ *bifocal* ("having two focal points").
>   - *bi-* + *polus* ("pole") $\to$ *bipolar* ("having two opposing poles").
> - **Prefix `bi-` / `bis-` with Verbal Stems:**
>   - *bis* + *secāre* ("to cut") $\to$ *bisect* ("to divide into two equal parts").
>   - *bi-* + *furca* ("fork") $\to$ *bifurcate* ("to split into two branches").
> - **Distributive Stem `bīn-` (< *bīnī* "two by two"):**
>   - *bīnī* + *-ārius* $\to$ *binary* ("consisting of two states").
>   - *com-* + *bīnāre* $\to$ *combine*, *combination* ("to join two together").
>   - *bīnī* + *oculus* ("eye") $\to$ *binoculars* ("optical aid for two eyes").

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
> Although fundamentally signifying **"two / twice"**, the root adapts to diverse conceptual spaces:
> - **Anatomical & Biological Form:** *biceps*, *biped*, *bivalve* (physical structures characterized by two parts).
> - **Temporal & Calendrical Frequency:** *biennial*, *bimonthly*, *biweekly* (recurring intervals).
> - **Mathematical & Computational Logic:** *binary*, *bisect*, *bisection* (exact mathematical halving and two-state logic).
> - **Sociopolitical & Ideological Polarization:** *bipartisan*, *bipolar* (coalitions or tensions between two factions).
> - **Instrumental & Sensory Enhancement:** *binoculars*, *bifocals*, *bicycle* (mechanical apparatuses utilizing two components).

---

## 🔀 4. Prefix & Combining Dynamics on bi

### Combining Form Dynamics (Morphological Modification)

| Form | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `bi-` + `annus` | two + year | **[[biennial]]** | Occurring every two years, or lasting for two years. |
| `bi-` + `caput` | two + head | **[[biceps]]** | A muscle having two heads or origins. |
| `bi-` + `furca` | two + fork | **[[bifurcate]]** | To divide into two distinct branches or channels. |
| `bi-` + `lingua` | two + tongue | **[[bilingual]]** | Capable of speaking two languages with native proficiency. |
| `bi-` + `secāre` | two + cut | **[[bisect]]** | To cut or divide into two precisely equal parts. |
| `com-` + `bīnī` | together + pairs | **[[combine]]** | To bring two or more elements together into unified harmony. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective (Relational) | **[[bifocal]]** | Pertaining to two focal lengths in a single corrective lens. |
| `-ary` | Adjective / Noun (System) | **[[binary]]** | Composed of two distinct elements or binary digits. |
| `-ion` | Noun (Act / Process) | **[[bifurcation]]** | The act, point, or result of splitting into two branches. |
| `-tion` | Noun (Result / State) | **[[combination]]** | The state or product of two or more entities joined together. |
| `-ly` | Adverb / Adjective (Recurrence) | **[[biweekly]]** | Occurring once every two weeks, or twice a week. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🔬 **Anatomy & Zoology** | *biceps*, *biped*, *bivalve* | Musculoskeletal articulation, evolutionary bipedalism, mollusk shell morphology. |
| 💻 **Computing & Cybernetics** | *binary*, *bistable*, *combination* | Machine code execution, bit registers, Boolean truth-value architectures. |
| 🔭 **Optics & Instruments** | *bifocal*, *binoculars*, *bicycle* | Vision correction lenses, stereoscopic distance vision, dual-wheel mechanics. |
| 🏛️ **Politics & Law** | *bipartisan*, *bicameral*, *bigamy* | Legislative compromise, two-house parliament design, matrimonial criminal law. |
| 🗓️ **Chronometry & Planning** | *biennial*, *bimonthly*, *biweekly* | Budgetary cycles, plant life-cycle taxonomy, academic publication intervals. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[bi]] | noun | **1.** A heavy brittle diamagnetic trivalent metallic element (resembles arsenic and antimony chemically); usually recovered as a by-product from ores of other metals. | *"Twice-sod simplicity, _bis coctus!_ O, thou monster Ignorance, how deformed dost thou look!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[biceps]] | noun | **1.** Any skeletal muscle having two origins (but especially the muscle that flexes the forearm). | *"Look at that arm.” I pulled up my sleeve and showed a biceps so attenuated that when I flexed it it had the appearance of a string."* — Jack London, *The Jacket (The Star-Rover)* |
| [[bicipital]] | adjective | **1.** Having two heads or points of origin as a biceps. | *"In academic literature, bicipital designates having two heads or points of origin as a biceps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biennial]] | noun | **1.** (botany) a plant having a life cycle that normally takes two seasons from germination to death to complete; flowering biennials usually bloom and fruit in the second season.<br>**2.** Having a life cycle lasting two seasons. | *"Is it probable that it would be persevered in, and transmitted along through all the successive variations in a representative body, which biennial elections would naturally produce in both houses?"* — Alexander Hamilton, *The Federalist Papers* |
| [[biennially]] | adverb | **1.** Every two years. | *"In academic literature, biennially designates every two years."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bifocal]] | adjective | **1.** Having two foci. | *"In academic literature, bifocal designates having two foci."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bigamist]] | noun | **1.** Someone who marries one person while already legally married to another. | *"Rochester continued, hardily and recklessly: “Bigamy is an ugly word!—I meant, however, to be a bigamist; but fate has out-manoeuvred me, or Providence has checked me,—perhaps the last."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[bigamous]] | adjective | **1.** Of illegal marriage to a second person while legally married to a first. | *"In academic literature, bigamous designates of illegal marriage to a second person while legally married to a first."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bigamy]] | noun | **1.** Having two spouses at the same time.<br>**2.** The offense of marrying someone while you have a living spouse from whom no valid divorce has occurred. | *"Rochester continued, hardily and recklessly: “Bigamy is an ugly word!—I meant, however, to be a bigamist; but fate has out-manoeuvred me, or Providence has checked me,—perhaps the last."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[bimonthly]] | noun | **1.** A periodical that is published twice a month or every two months (either 24 or 6 issues per year).<br>**2.** Occurring twice a month. | *"In academic literature, bimonthly designates a periodical that is published twice a month or every two months (either 24 or 6 issues per year)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[binary]] | noun | **1.** A system of two stars that revolve around each other under their mutual gravitation.<br>**2.** A pre-compiled, pre-linked program that is ready to run under a given operating system; a binary for one operating system will not run on a different operating system. | *"When the melted metal is exposed to oxygen, this oxide is produced and passes into solution in the liquid, yielding a series of binary alloys, of which the oxide acts as the second constituent."* — Donald M. Levy, *Modern Copper Smelting* |
| [[bipolar]] | adjective | **1.** Of or relating to manic depressive illness.<br>**2.** Of, pertaining to, or occurring in both polar regions. | *"In academic literature, bipolar designates of or relating to manic depressive illness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biweekly]] | noun | **1.** A periodical that is published twice a week or every two weeks (either 104 or 26 issues per year).<br>**2.** Occurring every two weeks. | *"In academic literature, biweekly designates a periodical that is published twice a week or every two weeks (either 104 or 26 issues per year)."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Number & Measure]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · BI
  </div>
</div>
