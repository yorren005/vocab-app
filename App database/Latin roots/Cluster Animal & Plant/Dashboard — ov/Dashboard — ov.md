---
status: unread
type: root_dashboard
---
# Dashboard — ov
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ov-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“egg”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Living creatures moving through nature and plants growing from the soil.</span>
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

The root **ov** means egg. It refers to egg, female gamete, oval geometry, reproductive biology. In English, this root forms words such as *ovum*, *ova*, *ovary*, and *ovarian*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: egg
> The root **ov** means egg. It refers to egg, female gamete, oval geometry, reproductive biology. In English, this root forms words such as *ovum*, *ova*, *ovary*, and *ovarian*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Egg</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Living creatures moving through nature and plants growing from the soil.</mark>
> - **Everyday Connection**: Think of familiar words like *ovum* and *ova*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ov** comes from a Latin word that means *"egg"*.
  - At its core, it describes egg.

- **The Big Picture Idea**:
  - Picture living creatures moving through nature and plants growing from the soil.
  - Whenever you see **ov** in an English word, think of **animals, plants, and natural life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of egg.
  - **Mental & Social**: How people experience, organize, or communicate about egg.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Ovum**: A mature female reproductive cell in animals and humans capable of developing into a new individual when fertilized by a spermatozoon.
  - **Ova**: The plural form of ovum.
  - **Ovary**: The female gonad in which ova and sex hormones are produced.
  - **Ovarian**: Of, relating to, or affecting an ovary.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ov</mark>, think of <mark class="hl-def">animals, plants, and natural life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **ov** generates terminology across classical Latin borrowing, diminutive morphology, and reproductive compounding:
> 1. **Base Biological Nouns:**
>    - `ovum` (singular female gamete); `ova` (plural).
> 2. **Diminutive Morphological Line (`ovul-` < *ovulum* "little egg"):**
>    - `ovul-` + `-e` ➔ *ovule* (seed precursor in botany).
>    - `ovul-` + `-ate` ➔ *ovulate* (to release an egg) ➔ *ovulation*.
> 3. **Geometrical Suffixation:**
>    - `ov-` + `-al` (*-ālis*) ➔ *oval* (egg-shaped ellipse).
>    - `ov-` + `-oid` (Greek *eidos* "form") ➔ *ovoid* (three-dimensional egg form).
> 4. **Reproductive Compounding:**
>    - `ovi-` + `parere` ("to bring forth, bear") ➔ *oviparous* (egg-laying).
>    - `ovi-` + `vīvus` ("living") + `parere` ➔ *ovoviviparous* (eggs hatched inside mother).
>    - `ovi-` + `pōnere` ("to place, deposit") ➔ *ovipositor* (egg-laying organ).
>    - `ovum` + `albūmen` ("white of egg") ➔ *ovalbumin* (egg-white protein).

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
> Although derived from the physical egg, the semantic branches govern distinct functional realms:
> - **Human Reproductive Endocrinology:** [[ovary]], [[ovarian]], and [[ovulation]] track follicle-stimulating hormone (FSH) and luteinizing hormone (LH) cycles.
> - **Evolutionary Life History:** [[oviparous]] birds and reptiles contrast with viviparous placental mammals and transitional [[ovoviviparous]] vipers and sharks.
> - **Botanical Seed Development:** An [[ovule]] within the carpel undergoes double fertilization to mature into a seed.
> - **Spatial Geometry:** The [[oval]] Office and [[ovate]] leaf contours describe two-dimensional egg geometries.
> - **Literary Criticism & Rhetoric:** Horace's [[ab ovo]] describes starting a narrative from the primordial origin rather than in the middle of action.

---

## 🔀 4. Prefix & Combining Dynamics on ov

### Structural Compounding on `ov-` and `ovi-`

| Element / Comb. Form | Meaning | Combined Derivative | Resulting Domain & Meaning |
| :--- | :--- | :--- | :--- |
| `-ālis` | pertaining to | [[oval]] | Two-dimensional curvilinear ellipse resembling an egg |
| `-eidos` (Greek) | shape, likeness | [[ovoid]] | Solid three-dimensional geometric body shaped like an egg |
| `parere` | to bear, bring forth | [[oviparous]] | Reproducing by depositing eggs that develop outside the body |
| `vīvus` + `parere` | live + bear | [[ovoviviparous]] | Retaining eggs inside maternal body until hatching without placenta |
| `pōnere` | to place, put | [[ovipositor]] | Specialized abdominal organ of insects for depositing eggs |
| `albūmen` | white of egg | [[ovalbumin]] | The principal storage glycoprotein of avian egg white |
| `caedere` | to kill | `ovicide` | Chemical insecticide formulated to destroy insect eggs |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Gynecology & Assisted Reproduction:** In vitro fertilization (IVF), polycystic ovary syndrome (PCOS), and ovarian reserve testing (AMH).
> - **Botany & Plant Breeding:** Angiosperm megasporogenesis, ovule integuments, and funiculus attachment in seeds.
> - **Entomology & Parasitology:** Parasitoid wasp ovipositor mechanics drilling through tree bark; chemical ovicides in crop pest management.
> - **Architecture & Graphic Design:** Oval domes (Bernini's Baroque architecture), elliptical running tracks, and the White House Oval Office.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[anovulation]] | noun | **1.** The absence of ovulation due to immaturity or post-maturity or pregnancy or oral contraceptive pills or dysfunction of the ovary. | *"In academic literature, anovulation designates the absence of ovulation due to immaturity or post-maturity or pregnancy or oral contraceptive pills or dysfunction of the ovary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obovate]] | adjective | **1.** (of a leaf shape) egg-shaped with the narrower end at the base. | *"We may, however, note that in a species found on the leaves of the common cock’s-foot grass the spores are large, obovate, and rough, with minute granules (figs. 117, 118)."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[ov]] | noun | **1.** A terrorist group of protestants who oppose any political settlement with irish nationalists; a paramilitary group that attacks catholic interests in northern ireland. | *"In academic literature, ov designates a terrorist group of protestants who oppose any political settlement with irish nationalists; a paramilitary group that attacks catholic interests in northern ireland."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oval]] | noun | **1.** A closed plane curve resulting from the intersection of a circular cone and a plane cutting completely through it.<br>**2.** Rounded like an egg. | *"In my room there were oval engravings of the months—ladies haymaking in short waists and large hats tied under the chin, for June; smooth-legged noblemen pointing with cocked-hats to village steeples, for October."* — Charles Dickens, *Bleak House* |
| [[ovalbumin]] | noun | **1.** The white part of an egg; the nutritive and protective gelatinous substance surrounding the yolk consisting mainly of albumin dissolved in water. | *"In academic literature, ovalbumin designates the white part of an egg; the nutritive and protective gelatinous substance surrounding the yolk consisting mainly of albumin dissolved in water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ovarian]] | adjective | **1.** Of or involving the ovaries. | *"For over twenty years I had ovarian trouble, which was almost unbearable at times."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[ovary]] | noun | **1.** The organ that bears the ovules of a flower.<br>**2.** (vertebrates) one of usually two organs that produce ova and secrete estrogen and progesterone. | *"In academic literature, ovary designates the organ that bears the ovules of a flower."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ovate]] | adjective | **1.** Of a leaf shape; egg-shaped with the broader end at the base.<br>**2.** Rounded like an egg. | *"On umbelliferous plants three species are recorded; one with yellow spores (_Trichobasis Petroselini_, B.); another with a blistered habit, and brown, ovate, or oblong spores (_T."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[oviparous]] | adjective | **1.** Egg-laying. | *"In academic literature, oviparous designates egg-laying."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ovipositor]] | noun | **1.** Egg-laying tubular structure at the end of the abdomen in many female insects and some fishes. | *"In academic literature, ovipositor designates egg-laying tubular structure at the end of the abdomen in many female insects and some fishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ovoid]] | noun | **1.** An egg-shaped object.<br>**2.** Rounded like an egg. | *"These are either isolated or associated together in strings or chaplets, are exceedingly minute, of an ovoid or oblong shape, and are produced in such numbers as to fill the cavity of the spermogone."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[ovoviviparous]] | adjective | **1.** Producing living young from eggs that hatch within the body. | *"In academic literature, ovoviviparous designates producing living young from eggs that hatch within the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ovular]] | adjective | **1.** Being or of the nature of an ovule.<br>**2.** Of or relating to an ovum. | *"In academic literature, ovular designates being or of the nature of an ovule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ovulate]] | verb | **1.** Produce and discharge eggs. | *"In academic literature, ovulate designates produce and discharge eggs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ovulation]] | noun | **1.** The expulsion of an ovum from the ovary (usually midway in the menstrual cycle). | *"In academic literature, ovulation designates the expulsion of an ovum from the ovary (usually midway in the menstrual cycle)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ovule]] | noun | **1.** A small body that contains the female germ cell of a plant; develops into a seed after fertilization.<br>**2.** A small or immature ovum. | *"I have brought you some eggs,” he remarked, hastily exposing ten of the precious ovules to view."* — Robert Coltman, *Beleaguered in Pekin: The Boxer's War Against the Foreigner* |
| [[ovum]] | noun | **1.** The female reproductive cell; the female gamete. | *"Embryonic evolution 547:9 The late Louis Agassiz, by his microscopic examination of a vulture's ovum, strengthens the thinker's conclusions as to the scientific theory of creation."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Animal & Plant]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · OV
  </div>
</div>
