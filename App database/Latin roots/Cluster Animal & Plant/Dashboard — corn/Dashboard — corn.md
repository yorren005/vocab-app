---
status: unread
type: root_dashboard
---
# Dashboard — corn
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">corn-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“horn or hard pointed tip”</span>
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

The root **corn** means horn or hard pointed tip. It refers to horn, projecting tip / angle, keratinous tissue, abundance. In English, this root forms words such as *cornea*, *corneal*, *corneous*, and *cornification*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: horn or hard pointed tip
> The root **corn** means horn or hard pointed tip. It refers to horn, projecting tip / angle, keratinous tissue, abundance. In English, this root forms words such as *cornea*, *corneal*, *corneous*, and *cornification*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Horn or hard pointed tip</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Living creatures moving through nature and plants growing from the soil.</mark>
> - **Everyday Connection**: Think of familiar words like *cornea* and *corneal*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **corn** comes from a Latin word that means *"horn or hard pointed tip"*.
  - At its core, it describes horn or hard pointed tip.

- **The Big Picture Idea**:
  - Picture living creatures moving through nature and plants growing from the soil.
  - Whenever you see **corn** in an English word, think of **animals, plants, and natural life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of horn or hard pointed tip.
  - **Mental & Social**: How people experience, organize, or communicate about horn or hard pointed tip.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Cornea**: The transparent, convex anterior part of the external fibrous coat of the eyeball that covers the iris and pupil, admitting and refracting light into the interior.
  - **Corneal**: Of, relating to, or affecting the cornea of the eye.
  - **Corneous**: An everyday English word showing the root's idea of *horn or hard pointed tip*.
  - **Cornification**: The biological process of keratinization by which living epidermal epithelial cells transform into flat, dead, keratin-packed scales forming the stratum corneum.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">corn</mark>, think of <mark class="hl-def">animals, plants, and natural life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **corn** operates through two primary morphological stems:
> 1. **Primary Noun Stem (`corn-` / `cornu-`):**
>    - `corn-` + `-ea` (*cornea tēla*, "horny tissue") ➔ *cornea* (anterior eye layer).
>    - `corn-` + `-er` (from Anglo-Norman *cornere* "projecting angle") ➔ *corner*.
>    - `corn-` + `-et` (diminutive suffix) ➔ *cornet* (small curved horn instrument).
>    - `corn-` + `-i-` + `-ficāre` (from *facere* "to make") ➔ *cornify* ➔ *cornification* (keratinization).
> 2. **Numerical & Descriptive Compounding:**
>    - `ūnus` ("one") + `cornū` ➔ *unicorn* (one-horned creature).
>    - `bi-` ("two") + `cornū` + `-ate` ➔ *bicornuate* (having two horns).
>    - `tri-` ("three") + `cornū` ➔ *tricorn* (three-cornered hat).
>    - `cornū` + `cōpiae` ("of plenty", genitive of *cōpia*) ➔ *cornucopia* (horn of abundance).
>    - `caper` ("goat") + `cornū` ➔ *Capricorn* (goat-horned constellation).

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
> Although unified by the physical animal horn, the semantic registers divide clearly:
> - **Visual Optics & Histology:** [[cornea]] and [[cornification]] highlight keratinous toughness and transparent cellular stratification.
> - **Topography & Spatial Geometry:** [[corner]] shifted from the projecting horn of an altar or building to any angular intersection or sharp turn.
> - **Symbolism & Abundance:** [[cornucopia]] and [[cornucopian]] capture infinite harvest prosperity and overflowing wealth.
> - **Heraldry & Myth:** [[unicorn]] embodies purity and elusive legendary ferocity in medieval European folklore.
> - **Surgical Pathology:** A [[bicornuate]] uterus describes an anatomical duplication anomaly of the uterine horns.

---

## 🔀 4. Prefix & Combining Dynamics on corn

### Numerical & Morphological Modifiers on `corn`

| Prefix / Comb. Form | Meaning | Combined Derivative | Resulting Domain & Shift |
| :--- | :--- | :--- | :--- |
| `ūni-` | one, single | [[unicorn]] | Mythical equine beast with a single spiraled forehead horn |
| `bi-` | two, double | [[bicornuate]] | Divided into two horn-like lateral pouches or projections |
| `tri-` | three | [[tricorn]] | Hat having the brim turned up into three distinct angular points |
| `cōpia` | abundance, wealth | [[cornucopia]] | Curved goat's horn overflowing with harvest produce |
| `-iculum` | diminutive suffix | [[corniculate]] | Possessing small, horn-shaped nodules (laryngeal cartilages) |
| `-ficāre` | to make, convert | [[cornification]] | Conversion of epithelial squames into hard, durable keratin |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Ophthalmology & Refractive Surgery:** Corneal transplantation (keratoplasty), LASIK corneal flap ablation, and corneal dystrophies.
> - **Dermatology & Podiatry:** Corns (*helomas*), calluses, and stratum corneum epidermal barrier function.
> - **Obstetrics & Gynecology:** Congenital Müllerian duct anomalies (bicornuate and unicornuate uteri).
> - **Brass Wind Instruments & Jazz:** Cornet performance in early New Orleans jazz (Louis Armstrong, Bix Beiderbecke).
> - **Urban Design & Road Safety:** Street corner sight distances, pedestrian curb extensions, and street corner economics.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[bicorn]] | noun | **1.** A cocked hat with the brim turned up to form two points.<br>**2.** Having two horns or horn-shaped parts. | *"In academic literature, bicorn designates a cocked hat with the brim turned up to form two points."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bicornate]] | adjective | **1.** Having two horns or horn-shaped parts. | *"In academic literature, bicornate designates having two horns or horn-shaped parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bicorned]] | adjective | **1.** Having two horns or horn-shaped parts. | *"In academic literature, bicorned designates having two horns or horn-shaped parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corn]] | noun | **1.** Tall annual cereal grass bearing kernels on large ears: widely cultivated in america in many varieties; the principal cereal in mexico and central and south america since pre-columbian times.<br>**2.** The dried grains or kernels or corn used as animal feed or ground for meal. | *"Let us kill him, and we’ll have corn at our own price."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corneal]] | adjective | **1.** Of or related to the cornea. | *"In academic literature, corneal designates of or related to the cornea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corned]] | verb | **1.** Feed (cattle) with corn.<br>**2.** Preserve with salt. | *"He corned for us ten minutes behind the town clock, and Mammy Dilsie had phthisic, so I had to fix the two twins, and we're done left."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[corneous]] | adjective | **1.** Made of horn (or of a substance resembling horn). | *"In academic literature, corneous designates made of horn (or of a substance resembling horn)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cornerstone]] | noun | **1.** The fundamental assumptions from which something is begun or developed or calculated or explained.<br>**2.** A stone in the exterior of a large and important building; usually carved with a date and laid with appropriate ceremonies. | *"See you yond coign o’ the Capitol, yond cornerstone?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cornet]] | noun | **1.** A brass musical instrument with a brilliant tone; has a narrow tube and a flared bell and is played by means of valves. | *"The matter was mentioned to the Emperor, an exception made, and Borís transferred into the regiment of Semënov Guards with the rank of cornet."* — graf Leo Tolstoy, *War and Peace* |
| [[cornetist]] | noun | **1.** A musician who plays the trumpet or cornet. | *"In academic literature, cornetist designates a musician who plays the trumpet or cornet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cornucopia]] | noun | **1.** A goat's horn filled with grain and flowers and fruit symbolizing prosperity.<br>**2.** The property of being extremely abundant. | *"The cornucopia was in flow and humankind's first outbound and inbound highways to the greater universe were complete and working."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[corny]] | adjective | **1.** Dull and tiresome but with pretensions of significance or originality. | *"Ilk cowslip cup shall kep a tear: Thou, Simmer, while each corny spear Shoots up its head, Thy gay, green, flow’ry tresses shear, For him that’s dead!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[unicorn]] | noun | **1.** An imaginary creature represented as a white horse with a long horn growing from its forehead. | *"Here’s a unicorn’s head—there’s nothing in that."* — Thomas Hardy, *Far from the Madding Crowd* |

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
    ROOT DASHBOARD · CORN
  </div>
</div>
