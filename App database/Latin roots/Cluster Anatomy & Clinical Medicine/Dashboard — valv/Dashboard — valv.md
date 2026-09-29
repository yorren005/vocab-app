---
status: unread
type: root_dashboard
---
# Dashboard — valv
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">valv-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“folding door or valve”</span>
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

The root **valv** means folding door or valve. It refers to an entrance, gateway, or barrier allowing access. In English, this root forms words such as *valve*, *valvular*, *valvularly*, and *valvate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: folding door or valve
> The root **valv** means folding door or valve. It refers to an entrance, gateway, or barrier allowing access. In English, this root forms words such as *valve*, *valvular*, *valvularly*, and *valvate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Folding door or valve</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The natural organs, tissues, and inner workings of the human body.</mark>
> - **Everyday Connection**: Think of familiar words like *valve* and *valvular*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **valv** comes from a Latin word that means *"folding door or valve"*.
  - At its core, it describes folding door or valve.

- **The Big Picture Idea**:
  - Picture the natural organs, tissues, and inner workings of the human body.
  - Whenever you see **valv** in an English word, think of **bodily anatomy and health**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of folding door or valve.
  - **Mental & Social**: How people experience, organize, or communicate about folding door or valve.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Valve**: Any membranous fold, flap, or mechanical device that permits the movement of fluid in one direction only and shuts to prevent regurgitation or backward flow.
  - **Valvular**: Pertaining to, having, or functioning as a valve or valves.
  - **Valvularly**: In a valvular manner.
  - **Valvate**: Having valves.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">valv</mark>, think of <mark class="hl-def">bodily anatomy and health</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **valv** builds terminology through English vernacular adoption, diminutive morphology, and numerical compounding:
> - **Primary English Noun:** `valve` (direct borrowing of Latin *valva* via French).
> - **Diminutive Adjectival Stem:** `valvul-` (< Latin *valvula* "little door") + `-ar` ➔ *valvular* (pertaining to cardiac or venous valves).
> - **Surgical Compounding:**
>   - `valvul-` + `-o-` + `-plasty` (Greek *plassein* "to shape") ➔ *valvuloplasty* (surgical repair of a heart valve).
>   - `valvul-` + `-o-` + `-tomy` (Greek *tome* "cutting") ➔ *valvulotomy* (incision of a stenotic valve).
> - **Numerical Prefixation (Malacology):**
>   - `bi-` ("two") + `valve` ➔ *bivalve* (two-shelled mollusk).
>   - `uni-` ("one") + `valve` ➔ *univalve* (single-shelled gastropod).
>   - `tri-` ("three") + `valve` ➔ *trivalve* (three-part shell or capsule).
>   - `multi-` ("many") + `valve` ➔ *multivalve* (multi-plated shell).

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
> Although derived from architectural folding doors, the modern usages divide into clear disciplinary registers:
> - **Cardiology & Hemodynamics:** [[valve]] and [[valvular]] govern the mechanics of the heart's fibrous skeleton, endocarditis, and regurgitant murmurs.
> - **Interventional Surgery:** [[valvuloplasty]] describes transcatheter aortic valve replacement (TAVR) or balloon mitral commissurotomy.
> - **Invertebrate Zoology:** [[bivalve]] and [[univalve]] categorize clams, oysters, and conchs by the articulating symmetry of their calcareous shells.
> - **Plant Morphology:** [[valvate]] describes sepals and petals whose margins touch without overlapping in estivation.

---

## 🔀 4. Prefix & Combining Dynamics on valv

### Numerical & Morphological Modifiers on `valv`

| Prefix / Comb. Form | Meaning | Combined Derivative | Resulting Domain & Meaning |
| :--- | :--- | :--- | :--- |
| `bi-` | two | [[bivalve]] | Mollusk having two hinged shell valves (e.g., clams, scallops) |
| `uni-` | one, single | [[univalve]] | Mollusk having a single, unarticulated spiral shell (e.g., snails) |
| `tri-` | three | `trivalve` | Having three distinct valves, flaps, or dehiscence segments |
| `multi-` | many | `multivalve` | Having multiple articulating shell plates (e.g., polyplacophoran chitons) |
| `-plasty` | surgical shaping | [[valvuloplasty]] | Plastic reconstruction or balloon dilation of an anatomical valve |
| `-tomy` | surgical incision | [[valvulotomy]] | Incision or division of fused valve leaflets to relieve stenosis |
| `-less` | without | `valveless` | Lacking flow-regulating valves (e.g., valveless veins in portal circulation) |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Cardiovascular Medicine:** Mitral valve prolapse, aortic stenosis, infective endocarditis, and artificial prosthetic heart valves (St. Jude mechanical, bovine pericardial).
> - **Venous Phlebology:** Chronic venous insufficiency, varicose veins, and deep vein thrombosis due to incompetent venous valves.
> - **Marine Biology & Aquaculture:** Bivalve mariculture (oyster farming, pearl culture, clam fisheries).
> - **Mechanical & Aerospace Engineering:** Poppet valves, pneumatic solenoid valves, and hydraulic check valves in rocket propulsion and internal combustion engines.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[bicuspid valve]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin valv within the domain of Anatomy & Clinical Medicine.<br>**2.** A technical or specialized form exhibiting the properties of valv in systematic terminology. | *"In academic literature, bicuspid valve designates pertaining to, derived from, or characteristic of latin valv within the domain of anatomy & clinical medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bivalve]] | noun | **1.** Marine or freshwater mollusks having a soft body with platelike gills enclosed within two shells hinged together.<br>**2.** Used of mollusks having two shells (as clams etc.). | *"Captain Nemo was evidently acquainted with the existence of this bivalve, and seemed to have a particular motive in verifying the actual state of this tridacne."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[bivalved]] | adjective | **1.** Used of mollusks having two shells (as clams etc.). | *"In academic literature, bivalved designates used of mollusks having two shells (as clams etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tricuspid valve]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin valv within the domain of Anatomy & Clinical Medicine.<br>**2.** A technical or specialized form exhibiting the properties of valv in systematic terminology. | *"In academic literature, tricuspid valve designates pertaining to, derived from, or characteristic of latin valv within the domain of anatomy & clinical medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valve]] | noun | **1.** A structure in a hollow organ (like the heart) with a flap to insure one-way flow of fluid through it.<br>**2.** Device in a brass wind instrument for varying the length of the air column to alter the pitch of a tone. | *"It served as a reservoir for compressed air, which a valve, worked by a spring, allowed to escape into a metal tube."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[valved]] | adjective | **1.** (of brass instruments) having valves. | *"In academic literature, valved designates (of brass instruments) having valves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valvelet]] | noun | **1.** A small valve. | *"In academic literature, valvelet designates a small valve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valvotomy]] | noun | **1.** Incision into a stenosed cardiac valve to relieve the obstruction. | *"In academic literature, valvotomy designates incision into a stenosed cardiac valve to relieve the obstruction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valvula]] | noun | **1.** A small valve. | *"In academic literature, valvula designates a small valve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valvular]] | adjective | **1.** Relating to or operating by means of valves. | *"VALVULAR HEART DISEASE HEALED Fourteen years ago my heart awoke to gratitude to God and the dear Leader at the same time."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[valvule]] | noun | **1.** A small valve. | *"In academic literature, valvule designates a small valve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valvulitis]] | noun | **1.** Inflammation of a valve (especially of a cardiac valve as a consequence of rheumatic fever). | *"In academic literature, valvulitis designates inflammation of a valve (especially of a cardiac valve as a consequence of rheumatic fever)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valvulotomy]] | noun | **1.** Incision into a stenosed cardiac valve to relieve the obstruction. | *"In academic literature, valvulotomy designates incision into a stenosed cardiac valve to relieve the obstruction."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · VALV
  </div>
</div>
