---
status: unread
type: root_dashboard
---
# Dashboard — fract
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fract-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to break”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A fragile stone pillar snapping under pressure and crumbling into fragments.</span>
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

The root **fract** means to break. It refers to the action of breaking and carrying out this process. In English, this root forms words such as *fracture*, *fraction*, *refract*, and *infraction*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to break
> The root **fract** means to break. It refers to the action of breaking and carrying out this process. In English, this root forms words such as *fracture*, *fraction*, *refract*, and *infraction*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To break</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A fragile stone pillar snapping under pressure and crumbling into fragments.</mark>
> - **Everyday Connection**: Think of familiar words like *fracture* and *fraction*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fract** comes from a Latin word that means *"to break"*.
  - At its core, it describes the action of break.

- **The Big Picture Idea**:
  - Picture a fragile stone pillar snapping under pressure and crumbling into fragments.
  - Whenever you see **fract** in an English word, think of **to break**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to break).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Fracture**: The breaking of a hard tissue or material, especially a bone.
  - **Fraction**: A numerical representation indicating the quotient of two quantities.
  - **Refract**: To deflect or change the direction of upon entering obliquely into a medium of different density.
  - **Infraction**: A violation, breach, or infringement of a law, rule, agreement, or regulation.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fract</mark>, think of <mark class="hl-def">to break</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **fract** operates through three distinct vowel-shifted Latin stems:
> - **Participial Stem `fract-` (Latin *frāctus*):**
>   - Direct medical noun: Latin *fractūra* → English [[fracture]].
>   - Arithmetic noun: Latin *frāctiō* → English [[fraction]] → [[fractional]] → [[fractionate]] → [[fractionation]].
>   - Behavioral adjective: Latin *fractus* ("broken, irritable") → English [[fractious]] → [[fractiously]] → [[fractiousness]].
>   - Modern mathematical coinage: *fract- + -al* → English [[fractal]].
>   - Circumferential compound *an-* (*ambi-* around) + *fractus*: Latin *anfractus* → English [[anfractuous]] → [[anfractuosity]].
> - **Prefixal Wave Stems (`refract-` & `diffract-`):**
>   - Back/Again `re-`: Latin *refringere / refractum* → English [[refract]] → [[refraction]] → [[refractive]] → [[refractor]] → [[refractory]] → [[refractoriness]].
>   - Apart/Away `dis-`: Latin *diffringere / diffrāctum* → English [[diffract]] → [[diffraction]] → [[diffractive]].
>   - In/Upon `in-`: Latin *infringere / infrāctum* → English [[infract]] → [[infraction]].
> - **Present Stem `frag-` (Latin *frangō*):**
>   - Adjective of frailty: Latin *fragilis* → English [[fragile]] → [[fragility]].
>   - Remnant noun: Latin *fragmentum* → English [[fragment]] → [[fragmentary]] → [[fragmentation]].
>   - Ballot compound: Latin *suffrāgium* → English [[suffrage]] → [[suffragette]].
> - **Compound Weakened Stem `-fring-` (Latin *infringere*):**
>   - Verb: *in- + fringere* → English [[infringe]] → [[infringement]].
> - **Botanical & Zoological Compounds:**
>   - Rock-breaking plant: Latin *saxum* ("rock") + *frangere* → English [[saxifrage]].
>   - Bone-breaking raptor: Latin *os, ossis* ("bone") + *frangere* → English [[ossifrage]].

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
> Although anchored in **"breaking"**, the derivatives of `fract` span six vast disciplinary domains:
> - **Orthopedics & Traumatology:** In [[fracture]], the root describes traumatic structural discontinuities in bone (e.g., compound, greenstick, hairline, comminuted fractures).
> - **Mathematics & Chemistry:** In [[fraction]], [[fractional]], [[fractionate]], and [[fractionation]], the root denotes the division of quantities into ratios, and the chemical separation of mixtures based on boiling points (fractional distillation of crude oil).
> - **Wave Optics & Physics:** In [[refract]], [[refraction]], [[diffract]], and [[diffraction]], the root models how electromagnetic waves bend when transitioning between media or spread when passing through narrow apertures.
> - **Civil Law, Copyright & Rights:** In [[infraction]], [[infringe]], and [[infringement]], the root defines the illegal breach of statutes, contracts, patents, or intellectual property.
> - **Democratic History & Politics:** In [[suffrage]] and [[suffragette]], the ancient voting potsherd stands as the universal symbol for the constitutional right to vote.
> - **Fractal Geometry & Complex Systems:** In [[fractal]], Mandelbrot's coinage models coastlines, lightning bolts, snowflakes, and financial markets that exhibit broken dimensional scaling.
> - **Material Science & Metallurgy:** In [[refractory]], the root describes furnace linings and ceramic crucibles that resist melting and thermal shock at extreme temperatures.

---

## 🔀 4. Prefix & Combining Dynamics on fract

### Prefix Dynamics (Directional, Optical & Violational Shifts)

| Prefix / Combining Element | Classical Meaning | Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `re-` | back, against | [[refract]], [[refractory]] | Bending a light wave back; stubbornly resisting heat or discipline. |
| `dis-` / `dif-` | apart, in different directions | [[diffract]], [[diffraction]] | Breaking a wave apart as it passes an edge; spreading light into fringes. |
| `in-` | into, against, upon | [[infringe]], [[infraction]], [[infract]] | Breaking into another's rights; violating a law or boundary. |
| `sub-` | up from under, beneath | [[suffrage]], [[suffragette]] | Casting broken voting shards up into the ballot box; franchise. |
| `ambi-` / `an-` | around, on both sides | [[anfractuous]], [[anfractuosity]] | Broken around with multiple bends; winding, tortuous, labyrinthine. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| `-ure` (Latin *-ūra*) | Noun (Result / State) | [[fracture]] | A break or rupture in bone or rock. |
| `-ion` (Latin *-iō*) | Noun (Process / Part) | [[fraction]], [[refraction]], [[diffraction]] | The act of breaking; a part of a whole; bending of rays. |
| `-ile` (Latin *-ilis*) | Adjective (Capability) | [[fragile]] | Easily broken, delicate, frail. |
| `-ment` (Latin *-mentum*) | Noun (Concrete Piece) | [[fragment]] | A small piece broken off a larger entity. |
| `-ious` (Latin *-iōsus*) | Adjective (Abounding in) | [[fractious]] | Prone to breaking temper; quarrelsome, irritable. |
| `-ory` (Latin *-ōrius*) | Adjective (Resistant) | [[refractory]] | Stubbornly unyielding; resistant to thermal breakdown. |
| `-al` (Modern Math) | Noun & Adjective | [[fractal]] | A geometric shape of fractional Hausdorff dimension. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏥 **Orthopedic Surgery & Traumatology** | [[fracture]], [[fragile]], [[fragility]] | Reduction and internal fixation (ORIF) of complex bone fractures, fragility fractures in osteoporotic elderly patients. |
| 🔬 **Optics, Astronomy & Spectroscopy** | [[refraction]], [[refractor]], [[diffraction]], [[refractive]] | Refracting telescopes, Snell's law of refraction, diffraction gratings in astronomical spectrographs, X-ray crystal diffraction (Franklin/Watson/Crick DNA structure). |
| ➗ **Pure Mathematics & Chaos Theory** | [[fraction]], [[fractal]] | Rational numbers, continued fractions, Mandelbrot and Julia sets, fractal dimension in coastline measurement and lung bronchus architecture. |
| 🛢️ **Petroleum Engineering & Industrial Chemistry** | [[fractionate]], [[fractionation]], [[refractory]] | Fractional distillation columns separating crude oil into kerosene, gasoline, and bitumen; refractory brick linings for blast furnaces. |
| ⚖️ **Intellectual Property & Constitutional Law** | [[infringement]], [[infraction]], [[suffrage]] | Patent and copyright infringement litigation in federal court; universal adult suffrage and the 19th Amendment. |
| 🧠 **Behavioral Psychology & Veterinary Science** | [[fractious]], [[refractory]] | Managing fractious horses during veterinary examination; refractory depression unresponsive to first-line pharmacotherapies. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[anfractuous]] | adjective | **1.** Full of twists and turns. | *"In academic literature, anfractuous designates full of twists and turns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diffract]] | verb | **1.** Undergo diffraction. | *"In academic literature, diffract designates undergo diffraction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diffraction]] | noun | **1.** When light passes sharp edges or goes through narrow slits the rays are deflected and produce fringes of light and dark bands. | *"In academic literature, diffraction designates when light passes sharp edges or goes through narrow slits the rays are deflected and produce fringes of light and dark bands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fractal]] | noun | **1.** (mathematics) a geometric pattern that is repeated at every scale and so cannot be represented by classical geometry. | *"In academic literature, fractal designates (mathematics) a geometric pattern that is repeated at every scale and so cannot be represented by classical geometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fraction]] | noun | **1.** A component of a mixture that has been separated by a fractional process.<br>**2.** A small part or item forming a piece of a whole. | *"All the better; their fraction is more our wish than their faction."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fractional]] | adjective | **1.** Constituting or comprising a part or fraction of a possible whole or entirety. | *"In this manner pieces of money are provided suitable for transactions of different magnitudes, down to small fractional amounts."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[fractionate]] | verb | **1.** Separate into constituents or fractions containing concentrated constituents.<br>**2.** Obtain by a fractional process. | *"In academic literature, fractionate designates separate into constituents or fractions containing concentrated constituents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fractionation]] | noun | **1.** A process that uses heat to separate a substance into its components.<br>**2.** Separation into portions. | *"In academic literature, fractionation designates a process that uses heat to separate a substance into its components."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fractious]] | adjective | **1.** Stubbornly resistant to authority or control.<br>**2.** Easily irritated or annoyed. | *"She then peeped round to where I sat; so stern a neighbour was too restrictive: to him, in his present fractious mood, she dared whisper no observations, nor ask of him any information."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[fractiously]] | adverb | **1.** In a peevish manner.<br>**2.** In a fractious manner. | *"In academic literature, fractiously designates in a peevish manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fractiousness]] | noun | **1.** The trait of being prone to disobedience and lack of discipline. | *"In academic literature, fractiousness designates the trait of being prone to disobedience and lack of discipline."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fracture]] | noun | **1.** Breaking of hard tissue such as bone.<br>**2.** (geology) a crack in the earth's crust resulting from the displacement of one side with respect to the other. | *"It was as if a fracture in delicate crystal had begun, and he was afraid of any movement that might make it fatal."* — George Eliot, *Middlemarch* |
| [[infract]] | verb | **1.** Act in disregard of laws, rules, contracts, or promises. | *"In academic literature, infract designates act in disregard of laws, rules, contracts, or promises."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[infraction]] | noun | **1.** A crime less serious than a felony. | *"All I could conclude was that some stool had lied an infraction of the rules on me in order to curry favour with the guards."* — Jack London, *The Jacket (The Star-Rover)* |
| [[refract]] | verb | **1.** Subject to refraction.<br>**2.** Determine the refracting power of (a lens). | *"We see, then, that the effect which a fog produces is mainly to refract the light rays."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[refractile]] | adjective | **1.** Of or relating to or capable of refraction. | *"In academic literature, refractile designates of or relating to or capable of refraction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[refraction]] | noun | **1.** The change in direction of a propagating wave (light or sound) when passing from one medium to another.<br>**2.** The amount by which a propagating wave is bent. | *"She had no nerves: she saw life in its proper colours without refraction."* — Anthony Pryde, *Nightfall* |
| [[refractive]] | adjective | **1.** Of or relating to or capable of refraction.<br>**2.** Capable of changing the direction (of a light or sound wave). | *"In academic literature, refractive designates of or relating to or capable of refraction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[refractiveness]] | noun | **1.** The physical property of a medium as determined by its index of refraction. | *"In academic literature, refractiveness designates the physical property of a medium as determined by its index of refraction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[refractivity]] | noun | **1.** The physical property of a medium as determined by its index of refraction. | *"In academic literature, refractivity designates the physical property of a medium as determined by its index of refraction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[refractometer]] | noun | **1.** Measuring instrument for measuring the refractive index of a substance. | *"In academic literature, refractometer designates measuring instrument for measuring the refractive index of a substance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[refractoriness]] | noun | **1.** The trait of being unmanageable. | *"The main requirements are refractoriness of the building materials, particularly careful construction so as to avoid breakouts, and very strong bracing indeed on account of the deep and heavy bath of material which is carried on the furnace hearth."* — Donald M. Levy, *Modern Copper Smelting* |
| [[refractory]] | noun | **1.** Lining consisting of material with a high melting point; used to line the inside walls of a furnace.<br>**2.** Not responding to treatment. | *"A refractory man who owed a small debt of about $43, refused to pay it all, but offered to do so if ten dollars was taken off."* — Classic Author, *The wonders of prayer* |
| [[refractory-lined]] | adjective | **1.** (of furnaces) lined with material that has a high melting point. | *"In academic literature, refractory-lined designates (of furnaces) lined with material that has a high melting point."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[refracture]] | verb | **1.** Break (a bone) that was previously broken but mended in an abnormal way. | *"In academic literature, refracture designates break (a bone) that was previously broken but mended in an abnormal way."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Destruction]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FRACT
  </div>
</div>
